"use client"

import { useRowIds, useStore } from '@/lib/schema';
import { cn } from '@/lib/utils';
import { AutoModel, AutoProcessor, PreTrainedModel, Processor, RawImage, env } from '@huggingface/transformers';
import { saveAs } from "file-saver";
import JSZip from "jszip";
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDropzone } from "react-dropzone";
import { LuCrop, LuDownload, LuLoader2, LuPlay } from 'react-icons/lu';
import { toast } from 'sonner';
import { Button } from './ui/Button';
import ReactCrop, { Crop, PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { Dialog, Modal, ModalOverlay } from 'react-aria-components';

const BACKGROUND_COLORS = [
    { id: 'transparent', color: 'transparent' },
    { id: 'white', color: '#FFFFFF' },
    { id: 'black', color: '#000000' },
    { id: 'purple', color: '#800080' },
    { id: 'pink', color: '#FFC0CB' },
    { id: 'yellow', color: '#FFFF00' },
];

export default function DropZone() {
    const [isLoadingModel, setIsLoadingModel] = useState(true);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [selectedColor, setSelectedColor] = useState<string>('transparent');
    const [showProcessed, setShowProcessed] = useState(false);
    const [isProcessingComplete, setIsProcessingComplete] = useState(false);
    const [customColor, setCustomColor] = useState('#6C5CE7');
    const [isCustomColorActive, setIsCustomColorActive] = useState(false);
    const [isCropModalOpen, setIsCropModalOpen] = useState(false);
    const [crop, setCrop] = useState<Crop>();
    const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
    const customColorRef = useRef<HTMLInputElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const storeReference = useStore();
    const rowIds = useRowIds("images")

    const modelRef = useRef<PreTrainedModel | null>(null);
    const processorRef = useRef<Processor | null>(null);
    const autoProcessRef = useRef<boolean>(true);

    const handleModelError = (error: any) => {
        console.error('Error loading model:', error);
        setError(error instanceof Error ? error : new Error('Failed to load model'));
        setIsLoadingModel(false);
    };

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject,
    } = useDropzone({
        onDrop: useCallback((acceptedFiles: File[]) => {
            // Reset states when new files are dropped
            setIsProcessingComplete(false);
            setShowProcessed(false);
            
            const processFile = async (file: File) => {
                return new Promise<void>((resolve, reject) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    
                    reader.onload = () => {
                        const base64String = reader.result as string;
                        const img = new Image();
                        img.src = base64String;
                        
                        img.onload = () => {
                            storeReference?.transaction(() => {
                                storeReference.addRow('images', {
                                    name: file.name,
                                    size: file.size,
                                    imageUrl: base64String,
                                    mediaType: file.type,
                                    height: img.height,
                                    width: img.width,
                                });
                            });
                            resolve();
                        };
                        
                        img.onerror = () => {
                            reject(new Error('Failed to load image'));
                        };
                    };
                    
                    reader.onerror = (error) => {
                        reject(error);
                        toast.error(`Error converting file to base64:${error}`);
                    };
                });
            };

            // Process files sequentially
            (async () => {
                try {
                    for (const file of acceptedFiles) {
                        await processFile(file);
                    }
                } catch (error) {
                    console.error('Error processing files:', error);
                }
            })();
        }, [storeReference]),
        accept: {
            "image/*": [".jpeg", ".jpg", ".png"],
        },
    });

    const processImages = async () => {
        try {
            const model = modelRef.current;
            const processor = processorRef.current;
            if (!model || !processor || !storeReference?.hasTable("images") || rowIds.length === 0) {
                return;
            }

            for (let i = 0; i < rowIds.length; i++) {
                if (storeReference?.getCell("images", `${rowIds[i]}`, "transformedImageUrl")) {
                    continue;
                }
                try {
                    // Load image
                    const img = await RawImage.fromURL(storeReference?.getCell("images", `${rowIds[i]}`, "imageUrl") as string);
                    // Pre-process image
                    const { pixel_values } = await processor(img);
                    // Predict alpha matte
                    const { output } = await model({ input: pixel_values });
                    const maskData = (
                        await RawImage.fromTensor(output[0].mul(255).to("uint8")).resize(
                            img.width,
                            img.height,
                        )
                    ).data;

                    // Create new canvas
                    const canvas = document.createElement("canvas");
                    canvas.width = img.width;
                    canvas.height = img.height;
                    const ctx = canvas.getContext("2d");
                    if (ctx) {
                        // Draw original image output to canvas
                        ctx.drawImage(img.toCanvas(), 0, 0);

                        // Update alpha channel
                        const pixelData = ctx.getImageData(0, 0, img.width, img.height);
                        for (let i = 0; i < maskData.length; ++i) {
                            pixelData.data[4 * i + 3] = maskData[i];
                        }
                        ctx.putImageData(pixelData, 0, 0);

                        if (selectedColor !== 'transparent') {
                            // Add colored background
                            const tempCanvas = document.createElement("canvas");
                            tempCanvas.width = canvas.width;
                            tempCanvas.height = canvas.height;
                            const tempCtx = tempCanvas.getContext("2d");
                            if (tempCtx) {
                                tempCtx.fillStyle = selectedColor;
                                tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
                                tempCtx.drawImage(canvas, 0, 0);
                                ctx.clearRect(0, 0, canvas.width, canvas.height);
                                ctx.drawImage(tempCanvas, 0, 0);
                            }
                        }

                        const transformedImageUrl = canvas.toDataURL("image/png");
                        await new Promise<void>((resolve) => {
                            storeReference?.transaction(() => {
                                storeReference?.setCell("images", `${rowIds[i]}`, "transformedImageUrl", transformedImageUrl);
                                storeReference?.setCell("images", `${rowIds[i]}`, "width", canvas.width);
                                storeReference?.setCell("images", `${rowIds[i]}`, "height", canvas.height);
                                storeReference?.setCell("images", `${rowIds[i]}`, "mediaType", "image/png");
                                resolve();
                            });
                        });
                    }

                    // Clean up WebGPU resources - only dispose tensors
                    output[0].dispose();
                    pixel_values.dispose();
                } catch (error) {
                    console.error("Error processing image:", error);
                    continue;
                }
            }
            setIsProcessingComplete(true);
            setShowProcessed(true);
            return true;
        } catch (error) {
            console.error("Error in processImages:", error);
            return false;
        } finally {
            setIsProcessing(false);
        }
    };

    // Effect to load the model
    useEffect(() => {
        const loadModel = async () => {
            try {
                // Store original console methods
                const originalConsole = {
                    log: console.log,
                    warn: console.warn,
                    error: console.error,
                    info: console.info
                };

                // Override all console methods to filter sensitive information
                const sensitivePatterns = [
                    /github\.com/i,
                    /huggingface/i,
                    /transformers/i,
                    /model/i,
                    /RMBG/i,
                    /briaai/i,
                    /pretrained/i,
                    /loading/i,
                    /http/i,
                    /processor/i
                ];

                const filterConsoleOutput = (method: 'log' | 'warn' | 'error' | 'info') => 
                    (...args: any[]) => {
                        const shouldLog = !args.some(arg => 
                            sensitivePatterns.some(pattern => 
                                String(arg).match(pattern)
                            )
                        );
                        if (shouldLog) {
                            originalConsole[method].apply(console, args);
                        }
                    };

                // Apply filters to all console methods
                console.log = filterConsoleOutput('log');
                console.warn = filterConsoleOutput('warn');
                console.error = filterConsoleOutput('error');
                console.info = filterConsoleOutput('info');

                const modelId = process.env.NEXT_PUBLIC_MODEL_ID!;
                
                try {
                    modelRef.current = await AutoModel.from_pretrained(modelId, {
                        device: typeof window !== 'undefined' && 'gpu' in navigator ? 'webgpu' : 'cpu'
                    }).catch((e) => {
                        handleModelError(e);
                        return null;
                    });
                    
                    if (!modelRef.current) return;

                    processorRef.current = await AutoProcessor.from_pretrained(modelId, {
                        device: typeof window !== 'undefined' && 'gpu' in navigator ? 'webgpu' : 'cpu'
                    }).catch((e) => {
                        handleModelError(e);
                        return null;
                    });
                    
                    if (!processorRef.current) return;

                    // Restore original console methods
                    console.log = originalConsole.log;
                    console.warn = originalConsole.warn;
                    console.error = originalConsole.error;
                    console.info = originalConsole.info;

                    setIsLoadingModel(false);
                } catch (e) {
                    handleModelError(e);
                    return;
                }
            } catch (error) {
                handleModelError(error);
            }
        };

        loadModel();

        return () => {
            // Cleanup
            if (modelRef.current) {
                modelRef.current = null;
            }
            if (processorRef.current) {
                processorRef.current = null;
            }
        };
    }, []);

    // Effect to handle image processing
    useEffect(() => {
        const processIfNeeded = async () => {
            if (isLoadingModel || !storeReference?.hasTable("images") || rowIds.length === 0 || isProcessingComplete || isProcessing) {
                return;
            }

            // Check if we need to process (no transformed URL exists)
            const needsProcessing = !storeReference.getCell("images", rowIds[0], "transformedImageUrl");
            if (!needsProcessing) {
                return;
            }

            setIsProcessing(true);
            try {
                const success = await processImages();
                if (success) {
                    setIsProcessingComplete(true);
                    setShowProcessed(true);
                }
            } catch (error) {
                console.error('Error during processing:', error);
            } finally {
                setIsProcessing(false);
            }
        };

        processIfNeeded();
    }, [isLoadingModel, storeReference, rowIds, isProcessingComplete, isProcessing]);

    // Cleanup effect when component unmounts
    useEffect(() => {
        return () => {
            // Reset all states
            setIsProcessing(false);
            setIsProcessingComplete(false);
            setShowProcessed(false);
            setSelectedColor('transparent');
            setIsCustomColorActive(false);
            setIsCropModalOpen(false);
            setCrop(undefined);
            setCompletedCrop(undefined);
            
            // Clear the stored image data
            if (storeReference?.hasTable("images")) {
                storeReference.transaction(() => {
                    storeReference.delTable("images");
                });
            }
            
            // Clean up WebGPU resources if they exist
            if (modelRef.current) {
                // The model might have internal tensors or resources to clean up
                modelRef.current = null;
            }
            if (processorRef.current) {
                processorRef.current = null;
            }
        };
    }, [storeReference]);

    const downloadImage = async () => {
        const rowId = rowIds[0];
        const name = storeReference?.getCell("images", rowId, "name") as string;
        const transformedImageUrl = storeReference?.getCell("images", rowId, "transformedImageUrl") as string;
        
        // Create a temporary canvas
        const canvas = document.createElement('canvas');
        const img = new Image();
        
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            
            if (ctx) {
                // Fill background with selected color if not transparent
                if (selectedColor !== 'transparent') {
                    ctx.fillStyle = selectedColor;
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                }
                
                // Draw the image with transparency
                ctx.drawImage(img, 0, 0);
                
                // Convert to blob and download
                canvas.toBlob((blob) => {
                    if (blob) {
                        saveAs(blob, name);
                    }
                }, 'image/png');
            }
        };
        
        img.src = transformedImageUrl;
    };

    const handleNewUpload = () => {
        storeReference?.transaction(() => {
            storeReference?.delTable("images");
        });
        setShowProcessed(false);
        setSelectedColor('transparent');
        setIsProcessingComplete(false);
    };

    const downloadCroppedImage = useCallback(() => {
        if (!completedCrop || !imageRef.current) return;

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const image = imageRef.current;
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;

        canvas.width = completedCrop.width;
        canvas.height = completedCrop.height;

        // Fill the canvas with the selected background color first
        if (selectedColor !== 'transparent') {
            ctx.fillStyle = selectedColor;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        ctx.drawImage(
            image,
            completedCrop.x * scaleX,
            completedCrop.y * scaleY,
            completedCrop.width * scaleX,
            completedCrop.height * scaleY,
            0,
            0,
            completedCrop.width,
            completedCrop.height
        );

        canvas.toBlob((blob) => {
            if (!blob) return;
            const name = storeReference?.getCell("images", rowIds[0], "name") as string;
            const filename = name.replace(/\.(png|jpg|jpeg|gif)$/i, '');
            saveAs(blob, `${filename}_cropped.png`);
            setIsCropModalOpen(false);
        });
    }, [completedCrop, storeReference, rowIds, selectedColor]);

    if (error) {
        return (
            <div className='space-y-3'>
                <h2 className="mb-2 text-lg text-danger">Unable to Load Resources</h2>
                <div className="rounded-xl border border-danger/20 bg-dangerForeground px-4 py-3">
                    <p className='text-danger'>Please refresh the page and try again. If the problem persists, contact support.</p>
                </div>
            </div>
        );
    }
    return (
        <div className='space-y-4'>
            <div className="flex flex-col items-center gap-6">
                <div className="w-full max-w-[640px] flex flex-col items-center">
                    <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0 mb-4">
                        {storeReference?.hasTable("images") && rowIds.length > 0 && isProcessingComplete && (
                            <>
                                <div className="flex flex-wrap justify-center sm:justify-start items-center gap-1.5">
                                    {BACKGROUND_COLORS.map(({ id, color }) => (
                                        <button
                                            key={id}
                                            onClick={() => {
                                                setSelectedColor(color);
                                                setIsCustomColorActive(false);
                                            }}
                                            className={cn(
                                                "group relative size-8 rounded-2xl border-2 transition-all hover:scale-105 hover:shadow-lg",
                                                selectedColor === color && !isCustomColorActive
                                                    ? "border-[#6C5CE7] ring-4 ring-[#6C5CE7]/20 shadow-lg scale-105" 
                                                    : "border-gray-200 hover:border-[#6C5CE7]/50",
                                                id === 'transparent' && "bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAGElEQVQYlWNgYGCQwoKxgqGgcJA5h3yFAAs8BRWVSwooAAAAAElFTkSuQmCC')] bg-repeat"
                                            )}
                                            style={{
                                                backgroundColor: color === 'transparent' ? 'transparent' : color,
                                            }}
                                            aria-label={`Select ${id} background`}
                                        >
                                            {selectedColor === color && !isCustomColorActive && (
                                                <div className="absolute -right-1 -top-1 size-3 rounded-full bg-[#6C5CE7] ring-2 ring-white shadow-md">
                                                    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-full p-0.5">
                                                        <polyline points="20 6 9 17 4 12"></polyline>
                                                    </svg>
                                                </div>
                                            )}
                                        </button>
                                    ))}
                                    <div className="relative flex items-center">
                                        <button
                                            onClick={() => {
                                                setIsCustomColorActive(true);
                                                setSelectedColor(customColor);
                                                customColorRef.current?.click();
                                            }}
                                            className={cn(
                                                "group relative size-8 rounded-2xl border-2 transition-all hover:scale-105 hover:shadow-lg",
                                                isCustomColorActive
                                                    ? "border-[#6C5CE7] ring-4 ring-[#6C5CE7]/20 shadow-lg scale-105" 
                                                    : "border-gray-200 hover:border-[#6C5CE7]/50"
                                            )}
                                            style={{ backgroundColor: customColor }}
                                            aria-label="Select custom color"
                                        >
                                            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-1/2 top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 opacity-50 transition-opacity group-hover:opacity-100">
                                                <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 4-9 4-13 0-1.5-1.5-3-4-3s-4 1.5-4 3m0 12c-1.5 0-2.75 1.06-4 1.06-3 0-4-9-4-13 0-1.5 1.5-3 4-3s4 1.5 4 3"/>
                                            </svg>
                                            {isCustomColorActive && (
                                                <div className="absolute -right-1 -top-1 size-3 rounded-full bg-[#6C5CE7] ring-2 ring-white shadow-md">
                                                    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-full p-0.5">
                                                        <polyline points="20 6 9 17 4 12"></polyline>
                                                    </svg>
                                                </div>
                                            )}
                                        </button>
                                        <input
                                            ref={customColorRef}
                                            type="color"
                                            value={customColor}
                                            onChange={(e) => {
                                                setCustomColor(e.target.value);
                                                setSelectedColor(e.target.value);
                                                setIsCustomColorActive(true);
                                            }}
                                            className="absolute size-0 opacity-0"
                                            aria-label="Choose custom color"
                                        />
                                    </div>
                                </div>

                                <div className="w-full sm:w-auto mt-4 sm:mt-0">
                                    <div className="relative inline-flex rounded-full bg-gradient-to-r from-[#6C5CE7]/10 via-[#6C5CE7]/5 to-[#6C5CE7]/10 p-1 shadow-sm">
                                        <div
                                            className="absolute inset-y-1 w-1/2 rounded-full bg-white shadow-md transition-transform duration-300 ease-in-out"
                                            style={{ transform: `translateX(${showProcessed ? '100%' : '0'})` }}
                                        />
                                        <button
                                            onClick={() => setShowProcessed(false)}
                                            className={cn(
                                                "relative px-4 py-1.5 text-xs font-medium transition-colors duration-200",
                                                !showProcessed ? "text-[#6C5CE7]" : "text-secondary hover:text-primary"
                                            )}
                                        >
                                            <div className="flex items-center gap-1.5">
                                                <svg viewBox="0 0 24 24" fill="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-3">
                                                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
                                                    <path d="M12 18v-2"/>
                                                    <path d="M12 8V6"/>
                                                </svg>
                                                Before
                                            </div>
                                        </button>
                                        <button
                                            onClick={() => setShowProcessed(true)}
                                            className={cn(
                                                "relative px-4 py-1.5 text-xs font-medium transition-colors duration-200",
                                                showProcessed ? "text-[#6C5CE7]" : "text-secondary hover:text-primary"
                                            )}
                                        >
                                            <div className="flex items-center gap-1.5">
                                                <svg viewBox="0 0 24 24" fill="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-3">
                                                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
                                                    <path d="m9 12 2 2 4-4"/>
                                                </svg>
                                                After
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>

                    <div
                        {...getRootProps()}
                        className={cn(
                            "relative aspect-[3/2] w-full",
                            isDragActive && "pointer-events-none",
                            isProcessingComplete && "pointer-events-none"
                        )}
                    >
                        {(isLoadingModel || isProcessing) && (
                            <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm">
                                <div className="flex items-center gap-3 text-[#6C5CE7]">
                                    <LuLoader2 className="size-5 animate-spin" />
                                    <span className="font-medium">Wait, we&apos;re working on it.</span>
                                </div>
                                <div className="mt-2 text-sm text-[#6C5CE7]/70">
                                    Loading our AI model for the best results...
                                </div>
                            </div>
                        )}
                        <div className={cn(
                            "flex size-full flex-col items-center justify-center rounded-lg border-2 border-white bg-white shadow-lg transition-all duration-300",
                            isDragAccept ? "border-success bg-success/5" :
                                isDragReject ? "border-danger bg-danger/5" :
                                    isDragActive ? "border-[#6C5CE7] bg-[#6C5CE7]/5" :
                                        "bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAGElEQVQYlWNgYGCQwoKxgqGgcJA5h3yFAAs8BRWVSwooAAAAAElFTkSuQmCC')] bg-repeat",
                            storeReference?.hasTable("images") && rowIds.length > 0 && "bg-none",
                            (isLoadingModel || isProcessing) && "filter blur-[2px] transition-all duration-300"
                        )}
                        style={
                            storeReference?.hasTable("images") && rowIds.length > 0
                                ? {
                                    backgroundImage: `${selectedColor === 'transparent' ? 
                                        `url(${showProcessed 
                                        ? storeReference?.getCell("images", rowIds[0], "transformedImageUrl") 
                                        : storeReference?.getCell("images", rowIds[0], "imageUrl")}), url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAGElEQVQYlWNgYGCQwoKxgqGgcJA5h3yFAAs8BRWVSwooAAAAAElFTkSuQmCC')` : 
                                        `url(${showProcessed 
                                        ? storeReference?.getCell("images", rowIds[0], "transformedImageUrl") 
                                        : storeReference?.getCell("images", rowIds[0], "imageUrl")})`}`,
                                    backgroundSize: selectedColor === 'transparent' ? 'contain, 10px 10px' : 'contain',
                                    backgroundPosition: 'center',
                                    backgroundRepeat: selectedColor === 'transparent' ? 'no-repeat, repeat' : 'no-repeat',
                                    backgroundColor: selectedColor === 'transparent' ? 'transparent' : selectedColor
                                }
                                : {}
                        }
                        >
                            <input {...getInputProps()} className="hidden" accept="image/jpeg,image/png,image/webp" aria-hidden="true" />
                            {(!storeReference?.hasTable("images") || rowIds.length === 0) && (
                                <>
                                    <div className="py-6">
                                        <button
                                            type="button"
                                            disabled={isLoadingModel}
                                            className={cn(
                                                "inline-flex w-fit items-center justify-center overflow-hidden rounded-lg bg-[#6C5CE7] px-6 py-3 text-white transition-all duration-200 hover:bg-[#5a4bd4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6C5CE7] focus-visible:ring-offset-2",
                                                isLoadingModel && "opacity-70 cursor-not-allowed"
                                            )}
                                        >
                                            <div className="flex items-center justify-center gap-2">
                                                {isLoadingModel ? (
                                                    <LuLoader2 className="size-6 animate-spin" />
                                                ) : (
                                                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-6">
                                                        <g clipPath="url(#clip0_8829_13883)">
                                                            <circle cx="12" cy="12" r="12" fillOpacity="0.15"></circle>
                                                            <path d="M18 11H13V6C13 5.73478 12.8946 5.48043 12.7071 5.29289C12.5196 5.10536 12.2652 5 12 5C11.7348 5 11.4804 5.10536 11.2929 5.29289C11.1054 5.48043 11 5.73478 11 6V11H6C5.73478 11 5.48043 11.1054 5.29289 11.2929C5.10536 11.4804 5 11.7348 5 12C5 12.2652 5.10536 12.5196 5.29289 12.7071C5.48043 12.8946 5.73478 13 6 13H11V18C11 18.2652 11.1054 18.5196 11.2929 18.7071C11.4804 18.8946 11.7348 19 12 19C12.2652 19 12.5196 18.8946 12.7071 18.7071C12.8946 18.5196 13 18.2652 13 18V13H18C18.2652 13 18.5196 12.8946 18.7071 12.7071C18.8946 12.5196 19 12.2652 19 12C19 11.7348 18.8946 11.4804 18.7071 11.2929C18.5196 11.1054 18.2652 11 18 11Z"></path>
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0_8829_13883">
                                                                <rect width="24" height="24"></rect>
                                                            </clipPath>
                                                        </defs>
                                                    </svg>
                                                )}
                                                <span className="font-semibold">
                                                    {isLoadingModel ? 'Wait, we&apos;re working on it.' : 'Start from a photo'}
                                                </span>
                                            </div>
                                        </button>
                                    </div>
                                    <div className="font-semibold text-gray-900">
                                        {isLoadingModel ? '' : 'Or drop an image here'}
                                    </div>
                                </>
                            )}
                        </div>
                        {isDragActive && (
                            <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center rounded-lg bg-white/30 backdrop-blur-sm transition-all duration-300">
                                <div className="text-lg font-semibold text-[#6C5CE7]">
                                    Drop your image here
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {storeReference?.hasTable("images") && rowIds.length > 0 &&
                    <div className="flex flex-wrap justify-center gap-3 px-4 sm:px-0">
                        {!isProcessingComplete ? (
                            <Button
                                type='button'
                                onClick={processImages}
                                disabled={isProcessing || isLoadingModel}
                                className={cn(
                                    "w-full sm:w-auto group relative overflow-hidden bg-[#6C5CE7] text-white shadow-lg transition-all hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] px-6 rounded-full",
                                    (isProcessing || isLoadingModel) && "pl-10"
                                )}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"/>
                                {(isProcessing || isLoadingModel) && (
                                    <div className="absolute inset-y-0 left-3 flex items-center">
                                        <LuLoader2 className='size-4 animate-spin' />
                                    </div>
                                )}
                                <div className="relative flex items-center">
                                    {!isProcessing && !isLoadingModel && <LuPlay className='mr-2 size-4 transition-transform duration-200 group-hover:scale-110' />}
                                    <span className="font-medium">{(isProcessing || isLoadingModel) ? 'Processing...' : 'Process Image'}</span>
                                </div>
                            </Button>
                        ) : (
                            <>
                                <Button
                                    type='button'
                                    onClick={downloadImage}
                                    className="w-full sm:w-auto group relative overflow-hidden bg-[#6C5CE7] text-white shadow-lg transition-all hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] px-6 rounded-full"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"/>
                                    <div className="relative flex items-center">
                                        <LuDownload className='mr-2 size-4 transition-transform duration-200 group-hover:scale-110' />
                                        <span className="font-medium">Download</span>
                                    </div>
                                </Button>
                                <Button
                                    type='button'
                                    onClick={() => setIsCropModalOpen(true)}
                                    className="w-full sm:w-auto group relative overflow-hidden bg-[#6C5CE7] text-white shadow-lg transition-all hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] px-6 rounded-full"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"/>
                                    <div className="relative flex items-center">
                                        <LuCrop className='mr-2 size-4 transition-transform duration-200 group-hover:scale-110' />
                                        <span className="font-medium">Crop</span>
                                    </div>
                                </Button>
                            </>
                        )}
                        <Button
                            type='button'
                            onClick={handleNewUpload}
                            variant="outline"
                            className="w-full sm:w-auto group relative overflow-hidden border-2 border-[#6C5CE7]/20 hover:border-[#6C5CE7]/30 bg-white shadow-sm transition-all hover:shadow-md hover:scale-[1.02] active:scale-[0.98] px-6"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-[#6C5CE7]/0 via-[#6C5CE7]/5 to-[#6C5CE7]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"/>
                            <div className="relative flex items-center">
                                <span className="mr-2 text-lg text-[#6C5CE7] transition-transform duration-200 group-hover:scale-110">+</span>
                                <span className="font-medium text-[#6C5CE7]">Upload New</span>
                            </div>
                        </Button>
                    </div>
                }
            </div>

            {/* Crop Modal */}
            <ModalOverlay
                isOpen={isCropModalOpen}
                onOpenChange={setIsCropModalOpen}
                isDismissable
                className={({ isEntering, isExiting }) => `
                fixed inset-0 z-50 overflow-y-auto bg-background/25 flex min-h-full items-center justify-center p-2 sm:p-4 text-center backdrop-blur
                ${isEntering ? 'animate-in fade-in duration-300 ease-out' : ''}
                ${isExiting ? 'animate-out fade-out duration-200 ease-in' : ''}
                `}
            >
                <Modal
                    className={({ isEntering, isExiting }) => `
                    w-full max-w-[calc(100vw-1rem)] sm:max-w-4xl overflow-hidden rounded-2xl bg-foreground p-4 sm:p-6 text-left align-middle shadow-xl
                    ${isEntering ? 'animate-in zoom-in-95 ease-out duration-300' : ''}
                    ${isExiting ? 'animate-out zoom-out-95 ease-in duration-200' : ''}
                    `}
                >
                    <Dialog role="dialog" className="relative outline-none">
                        {({ close }) => (
                            <>
                                <div className="mb-4">
                                    <h3 className="text-lg font-medium text-primary">Crop Image</h3>
                                    <p className="text-sm text-secondary">Drag to create a crop area, then click Download to save the cropped image.</p>
                                </div>
                                <div className="relative" style={{ backgroundColor: selectedColor }}>
                                    <ReactCrop
                                        crop={crop}
                                        onChange={(c) => setCrop(c)}
                                        onComplete={(c) => setCompletedCrop(c)}
                                        aspect={undefined}
                                    >
                                        <img
                                            ref={imageRef}
                                            src={storeReference?.getCell("images", rowIds[0], "transformedImageUrl") as string}
                                            alt="Crop"
                                            className="max-h-[60vh] w-full object-contain"
                                        />
                                    </ReactCrop>
                                </div>
                                <div className="mt-4 flex justify-end gap-3">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => close()}
                                        className="px-4"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="button"
                                        onClick={downloadCroppedImage}
                                        disabled={!completedCrop}
                                        className="group relative overflow-hidden bg-[#6C5CE7] text-white shadow-lg transition-all hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] px-6 rounded-full disabled:opacity-50 disabled:hover:scale-100 disabled:hover:shadow-lg"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"/>
                                        <div className="relative flex items-center">
                                            <LuDownload className="mr-2 size-4 transition-transform duration-200 group-hover:scale-110" />
                                            <span className="font-medium">Download Cropped</span>
                                        </div>
                                    </Button>
                                </div>
                                <button
                                    onClick={() => close()}
                                    className="absolute right-2 top-2 flex size-6 items-center justify-center rounded-full bg-background/50 text-primary hover:bg-background/70"
                                >
                                    &#x2715;
                                </button>
                            </>
                        )}
                    </Dialog>
                </Modal>
            </ModalOverlay>
        </div>
    )
}
