import Image from 'next/image';
import { motion } from 'framer-motion';

type HowToProps = {
    variant?: 'home' | 'images';
};

export default function HowTo({ variant = 'images' }: HowToProps) {
    return (
        <div className="space-y-8">
            {variant === 'home' ? (
                <div className="relative space-y-6 text-center">
                    {/* Decorative elements */}
                    <div className="absolute left-1/2 top-0 h-1 w-24 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#6C5CE7] to-transparent" />
                    
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="space-y-4"
                    >
                        <div className="inline-block rounded-full bg-[#6C5CE7]/10 px-4 py-1 text-sm font-semibold text-[#6C5CE7]">
                            SIMPLE STEPS
                        </div>
                        <h2 className="text-3xl font-extrabold md:text-4xl">
                            Transform Your Images with
                            <span className="mt-2 block bg-gradient-to-r from-[#6C5CE7] to-[#574db2] bg-clip-text text-transparent">
                                Three Easy Steps
                            </span>
                        </h2>
                        <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-600">
                            Experience the magic of instant background removal with our AI-powered tool. 
                            <span className="font-medium text-[#6C5CE7]">No technical skills required</span>.
                        </p>
                    </motion.div>
                </div>
            ) : (
                <div className="space-y-4 text-center">
                    <h2 className="text-2xl font-bold text-primary">How to remove the background from images</h2>
                    <p className="text-lg text-secondary">With Background Remover, it is as easy as one-two-three.</p>
                </div>
            )}
            
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                {/* Step 1 */}
                <div className="space-y-4">
                    <div className="relative aspect-[4/3] w-full rounded-2xl bg-[#FFF0F7] p-4">
                        <Image
                            src="/1.webp"
                            alt="Upload your image"
                            fill
                            className="object-contain"
                        />
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <div className="flex size-8 items-center justify-center rounded-full bg-[#6C5CE7]/10 text-lg font-semibold text-[#6C5CE7]">
                                1
                            </div>
                            <h3 className="text-lg font-semibold text-primary">Upload your image</h3>
                        </div>
                        <p className="text-secondary">Once uploaded, the tool will automatically remove the background. This may take a few seconds, depending on the file size.</p>
                    </div>
                </div>

                {/* Step 2 */}
                <div className="space-y-4">
                    <div className="relative aspect-[4/3] w-full rounded-2xl bg-[#F0F7FF] p-4">
                        <Image
                            src="/2.webp"
                            alt="Choose background"
                            fill
                            className="object-contain"
                        />
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <div className="flex size-8 items-center justify-center rounded-full bg-[#6C5CE7]/10 text-lg font-semibold text-[#6C5CE7]">
                                2
                            </div>
                            <h3 className="text-lg font-semibold text-primary">Optionally, add a new background</h3>
                        </div>
                        <p className="text-secondary">Choose solid-color or photo backgrounds from our gallery or any image of yours to use as a new background for your picture.</p>
                    </div>
                </div>

                {/* Step 3 */}
                <div className="space-y-4">
                    <div className="relative aspect-[4/3] w-full rounded-2xl bg-[#F7F0FF] p-4">
                        <Image
                            src="/3.webp"
                            alt="Download result"
                            fill
                            className="object-contain"
                        />
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <div className="flex size-8 items-center justify-center rounded-full bg-[#6C5CE7]/10 text-lg font-semibold text-[#6C5CE7]">
                                3
                            </div>
                            <h3 className="text-lg font-semibold text-primary">Download the final image</h3>
                        </div>
                        <p className="text-secondary">Once you&apos;re happy with the result, save it.</p>
                    </div>
                </div>
            </div>
        </div>
    );
} 