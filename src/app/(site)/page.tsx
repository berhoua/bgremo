"use client"

import { useStore } from "@/lib/schema";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import HowTo from "@/components/HowTo";
import Reviews from "@/components/Reviews";
import FAQ from "@/components/FAQ";
import { motion } from "framer-motion";
import LogoCarousel from "@/components/LogoCarousel";

export default function HomePage() {
    const router = useRouter();
    const storeReference = useStore();

    const onDrop = useCallback((acceptedFiles: File[]) => {
        storeReference?.transaction(() => {
            acceptedFiles.forEach((file) => {
                const reader = new FileReader();
                reader.readAsDataURL(file)
                reader.onload = () => {
                    const base64String = reader.result as string;
                    const imgElement = new window.Image();
                    imgElement.src = base64String;
                    imgElement.onload = () => {
                        storeReference.addRow('images', {
                            name: file.name,
                            size: file.size,
                            imageUrl: base64String,
                            mediaType: file.type,
                            height: imgElement.height,
                            width: imgElement.width,
                        });
                        // Redirect to images page after successful upload
                        router.push('/images');
                    }
                }
            })
        })
    }, [storeReference, router]);

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject,
    } = useDropzone({
        onDrop,
        accept: {
            "image/*": [".jpeg", ".jpg", ".png"],
        },
    });

    return (
        <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center p-4">
            {/* Header */}
            <div className="mb-8 text-center relative pt-14">
                <div className="relative z-10">
                    {/* Banner Images */}
                    <div className="image_ymZOY absolute w-full h-full top-0 left-0 -z-10">
                        <img 
                            className="banner1_OkOk1 absolute -top-10 -left-40 w-32 h-32 object-contain" 
                            src="//d2z97fth8eo522.cloudfront.net/assets/img/banner1.3b0633665bea2ffff7fa.png" 
                            alt="decorative banner 1" 
                        />
                        <img 
                            className="banner2_vEFCM absolute top-20 -right-16 w-28 h-28 object-contain" 
                            src="//d2z97fth8eo522.cloudfront.net/assets/img/banner2.2e55b205ff9b080f7648.png" 
                            alt="decorative banner 2" 
                        />
                        <img 
                            className="banner3_j1JMk absolute -bottom-8 left-10 w-24 h-20 object-contain" 
                            src="//d2z97fth8eo522.cloudfront.net/assets/img/banner3.71a5315fd8a29378c8c2.png" 
                            alt="decorative banner 3" 
                        />
                    </div>
                    <h1 className="mb-6 text-4xl font-extrabold tracking-tight md:text-5xl lg:text-7xl">
                        <span className="block mb-2">Remove Background</span>
                        <span className="inline-block">
                            with{" "}
                            <span className="relative">
                                <span className="bg-gradient-to-r from-[#FF7170] via-[#FFB185] to-[#FF7170] bg-clip-text text-transparent animate-gradient">
                                    AI Magic
                                </span>
                                <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#FF7170] to-[#FFB185] rounded-full transform scale-x-0 animate-expand"></span>
                            </span>
                        </span>
                    </h1>
                    <p className="mx-auto max-w-[600px] text-xl text-gray-600 leading-relaxed">
                        Transform your images instantly with our{" "}
                        <span className="font-semibold text-[#6C5CE7]">free AI-powered tool</span>.
                        Remove backgrounds and unleash your creativity with perfect results every time.
                    </p>
                    <div className="mt-6 flex gap-2 items-center justify-center text-sm text-gray-500">
                        <span className="flex items-center">
                            <svg className="w-5 h-5 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                            </svg>
                            100% Free
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                        <span className="flex items-center">
                            <svg className="w-5 h-5 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                            </svg>
                            No Sign-up Required
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                        <span className="flex items-center">
                            <svg className="w-5 h-5 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                            </svg>
                            High Quality Results
                        </span>
                    </div>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-[#FF7170]/10 via-[#6C5CE7]/10 to-[#FFB185]/10 rounded-full blur-3xl -z-10"></div>
            </div>
            {/* Hero Section */}
            <div className="flex w-full max-w-[1200px] items-center justify-center">
                {/* Centered Dropzone */}
                <div className="w-full max-w-[700px]">
                    <div
                        {...getRootProps()}
                        className={cn(
                            "relative w-full rounded-2xl border-2 border-dashed p-10 transition-all duration-300 bg-white/60 backdrop-blur-sm overflow-hidden",
                            isDragAccept ? "border-[#6366F1] bg-[#6366F1]/5" :
                                isDragReject ? "border-red-500 bg-red-50" :
                                    isDragActive ? "border-[#6366F1] bg-[#6366F1]/5" : "border-gray-300 hover:border-[#6366F1]/50 hover:bg-gray-50/50"
                        )}
                        style={{
                            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.08)"
                        }}
                    >
                        {/* Decorative elements */}
                        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-[#6366F1]/20 to-[#EC4899]/20 rounded-full blur-2xl"></div>
                            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-tr from-[#EC4899]/20 to-[#6366F1]/20 rounded-full blur-2xl"></div>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[500px] max-h-[500px] bg-gradient-to-r from-[#6366F1]/5 via-[#EC4899]/5 to-[#6366F1]/5 rounded-full blur-3xl opacity-50"></div>
                            
                            {/* Animated dots */}
                            <div className="absolute top-6 left-6 w-2 h-2 bg-[#6366F1] rounded-full animate-pulse"></div>
                            <div className="absolute top-6 right-6 w-2 h-2 bg-[#EC4899] rounded-full animate-pulse" style={{ animationDelay: "0.5s" }}></div>
                            <div className="absolute bottom-6 left-6 w-2 h-2 bg-[#EC4899] rounded-full animate-pulse" style={{ animationDelay: "1s" }}></div>
                            <div className="absolute bottom-6 right-6 w-2 h-2 bg-[#6366F1] rounded-full animate-pulse" style={{ animationDelay: "1.5s" }}></div>
                        </div>

                        <input {...getInputProps()} className="hidden" accept="image/jpeg,image/png" aria-hidden="true" />
                        
                        <div className="flex flex-col items-center justify-center text-center space-y-6 relative z-10">
                            {/* Original Dropzone Image */}
                            <div className="relative group cursor-pointer">
                                <div className="absolute -inset-2 bg-gradient-to-r from-[#6366F1] to-[#EC4899] rounded-full opacity-20 group-hover:opacity-100 blur transition duration-500"></div>
                                <Image
                                    src="/dropzone.png"
                                    alt="Upload illustration"
                                    width={60}
                                    height={60}
                                    className="w-auto h-auto relative"
                                    priority
                                />
                            </div>
                            
                            <div className="space-y-2">
                                <h2 className="text-2xl font-bold text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-[#6366F1] to-[#EC4899]">
                                    Drop your image here
                                </h2>
                                <p className="text-sm text-gray-600">
                                    or click to browse from your device
                                </p>
                            </div>

                            <button
                                type="button"
                                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#6366F1] to-[#EC4899] px-8 py-3 text-base font-medium text-white transition-all duration-200 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:ring-offset-2 shadow-lg shadow-[#6366F1]/20"
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                Select Image
                            </button>

                            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-500 mt-2">
                                <span className="flex items-center">
                                    <svg className="w-4 h-4 mr-1 text-[#6366F1]" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                                    </svg>
                                    JPEG, JPG, PNG
                                </span>
                                <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                <span className="flex items-center">
                                    <svg className="w-4 h-4 mr-1 text-[#6366F1]" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                                    </svg>
                                    Up to 40MB
                                </span>
                                <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                <span className="flex items-center">
                                    <svg className="w-4 h-4 mr-1 text-[#6366F1]" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                                    </svg>
                                    Instant Processing
                                </span>
                            </div>
                        </div>

                        {isDragActive && (
                            <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-gradient-to-r from-[#6366F1]/30 to-[#EC4899]/30 backdrop-blur-md transition-all duration-300 z-20">
                                <div className="flex flex-col items-center text-white">
                                    <div className="w-16 h-16 mb-4 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                                        <svg className="w-8 h-8 animate-bounce text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                                        </svg>
                                    </div>
                                    <span className="text-xl font-bold drop-shadow-md">Drop to upload</span>
                                    <span className="text-sm text-white/80">and remove background instantly</span>
                                </div>
                            </div>
                        )}
                    </div>
                    
                    {/* Feature badges below dropzone */}
                    <div className="flex flex-wrap justify-center gap-3 mt-6">
                        {[
                            { icon: "⚡", label: "Instant AI Processing" },
                            { icon: "🔒", label: "100% Private & Secure" },
                            { icon: "💯", label: "High-Quality Results" },
                            { icon: "🎁", label: "Completely Free" }
                        ].map((feature, index) => (
                            <div 
                                key={index} 
                                className="flex items-center gap-2 bg-white/70 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium text-gray-700 shadow-sm border border-gray-100"
                            >
                                <span>{feature.icon}</span>
                                <span>{feature.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Trusted By Section */}
            <section className="py-4 md:py-6 relative overflow-hidden">
                {/* Decorative separator line */}
                <div className="max-w-6xl mx-auto px-4 mb-8">
                    <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent opacity-70"></div>
                </div>
                <div className="max-w-6xl mx-auto px-2 md:px-4 relative">
                    <div className="text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#6366F1]/10 to-[#EC4899]/10 text-[#6366F1] px-3 md:px-4 py-1 md:py-1.5 rounded-full text-xs md:text-sm font-semibold mb-3 md:mb-4"
                        >
                            <span className="flex h-1.5 md:h-2 w-1.5 md:w-2">
                                <span className="animate-ping absolute inline-flex h-1.5 md:h-2 w-1.5 md:w-2 rounded-full bg-[#6366F1] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-1.5 md:h-2 w-1.5 md:w-2 bg-[#6366F1]"></span>
                            </span>
                            TRUSTED BY INDUSTRY LEADERS
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 via-[#6366F1] to-gray-900 bg-clip-text text-transparent mb-3 md:mb-4"
                        >
                            Empowering Global Brands
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto mb-6 md:mb-8 px-4 md:px-0"
                        >
                            Join thousands of leading companies who trust our AI-powered background removal tool for their creative needs
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="relative mx-2 md:mx-4 bg-gradient-to-b from-transparent via-white/50 to-transparent p-0.5 rounded-xl md:rounded-2xl backdrop-blur-sm"
                        >
                            {/* Enhanced gradient masks with smoother transitions */}
                            <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-white via-white/90 to-transparent z-10 rounded-l-xl md:rounded-l-2xl"></div>
                            <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-white via-white/90 to-transparent z-10 rounded-r-xl md:rounded-r-2xl"></div>

                            <div className="relative overflow-hidden rounded-xl md:rounded-2xl bg-white/30 backdrop-blur-sm shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/20">
                                <LogoCarousel />
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 }}
                            className="mt-6 md:mt-8 flex flex-wrap justify-center gap-4 md:gap-6 text-center"
                        >
                            {[
                                { number: "10K+", label: "Active Users" },
                                { number: "1M+", label: "Images Processed" },
                                { number: "99%", label: "Success Rate" },
                                { number: "24/7", label: "Support" }
                            ].map((stat, index) => (
                                <div key={index} className="flex flex-col items-center px-2 md:px-4">
                                    <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-[#6366F1] to-[#EC4899] bg-clip-text text-transparent">
                                        {stat.number}
                                    </span>
                                    <span className="text-gray-600 text-[10px] md:text-xs mt-0.5 md:mt-1">{stat.label}</span>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* How To Section */}
            <div id="how-to" className="mt-16 w-full max-w-[1200px] mx-auto px-4">
                <HowTo variant="home" />
            </div>

            {/* Reviews Section */}
            <div id="reviews" className="mt-24 w-full max-w-[1200px] mx-auto px-4">
                <Reviews />
            </div>

            {/* FAQ Section */}
            <div id="faqs" className="mt-24 w-full max-w-[1200px] mx-auto px-4 mb-24">
                <FAQ />
            </div>

            {/* CTA Section */}
            <div className="mt-2 w-full max-w-[1200px] mx-auto px-4">
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#6366F1] to-[#EC4899] p-8 md:p-12">
                    <div 
                        className="absolute inset-0 opacity-10"
                        style={{
                            backgroundImage: `
                                linear-gradient(to right, white 1px, transparent 1px),
                                linear-gradient(to bottom, white 1px, transparent 1px)
                            `,
                            backgroundSize: '4rem 4rem',
                            maskImage: 'radial-gradient(ellipse 80% 50% at 50% 0%, black 70%, transparent 110%)',
                            WebkitMaskImage: 'radial-gradient(ellipse 80% 50% at 50% 0%, black 70%, transparent 110%)'
                        }}
                    ></div>
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="text-center md:text-left">
                            <motion.h2 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="text-3xl md:text-4xl font-bold text-white mb-4"
                            >
                                Ready to Remove Backgrounds?
                            </motion.h2>
                            <motion.p 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="text-white/90 text-lg max-w-xl"
                            >
                                Transform your images instantly with our AI-powered tool. No sign-up required, start removing backgrounds for free!
                            </motion.p>
                        </div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="flex-shrink-0"
                        >
                            <button
                                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-lg font-semibold text-[#6366F1] transition-all duration-200 hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#6366F1]"
                            >
                                Start Now
                                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </button>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
