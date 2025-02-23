'use client';

import { ReactNode } from 'react';
import { Footer } from "@/components/Footer";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ShareButton } from "@/components/ShareButton";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";
import { LuHome, LuMenu, LuX } from "react-icons/lu";
import { useState, useEffect } from "react";

export default function SiteLayout({ children }: { children: ReactNode }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Close mobile menu when screen size changes to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsMobileMenuOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMobileMenuOpen]);

    return (
        <main className="relative flex min-h-dvh flex-col">
            <nav className='sticky top-0 z-20 border-b border-accent/10 bg-background/95 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60'>
                <div className="mx-auto max-w-7xl px-4 py-4">
                    <div className="flex items-center gap-6">
                        <div className="flex flex-1 items-center justify-center md:justify-start gap-6">
                            <Link 
                                href='/' 
                                className="group relative flex items-center gap-3 transition-all duration-300 hover:scale-[1.02]"
                            >
                                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#6C5CE7]/10 to-[#FF7170]/10 blur-xl transition-opacity duration-300 group-hover:opacity-100 opacity-0" />
                                <div className="relative size-9 overflow-hidden rounded-xl bg-gradient-to-br from-[#6C5CE7] to-[#574db2] p-[1px] shadow-lg shadow-[#6C5CE7]/25">
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#6C5CE7] to-[#574db2] opacity-80 transition-opacity group-hover:opacity-100" />
                                    <Image 
                                        src="/favicon.svg" 
                                        alt="BG Mask Logo" 
                                        width={36} 
                                        height={36}
                                        className="relative h-full w-full transform object-cover transition-transform duration-300 group-hover:scale-110"
                                    />
                                </div>
                                <span className="relative bg-gradient-to-r from-[#6C5CE7] to-[#FF7170] bg-clip-text text-2xl font-extrabold text-transparent transition-all duration-300 group-hover:from-[#574db2] group-hover:to-[#FF7170]">
                                    BG MASK
                                </span>
                            </Link>
                            <Link href='/' className="hidden sm:block">
                                <Button 
                                    type="button" 
                                    variant="outline" 
                                    className="relative group ml-2 overflow-hidden rounded-xl transition-all duration-300 hover:border-[#6C5CE7] hover:text-[#6C5CE7] hover:shadow-lg hover:shadow-[#6C5CE7]/25"
                                >
                                    <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#6C5CE7]/10 to-[#FF7170]/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                    <div className="relative z-10 flex items-center justify-center">
                                        <LuHome className="size-4 transform transition-transform duration-300 group-hover:scale-110" />
                                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#6C5CE7]/20 to-[#FF7170]/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </div>
                                </Button>
                            </Link>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex flex-1 items-center justify-center gap-8 mr-40">
                            <Link 
                                href="/#how-to"
                                className="font-semibold text-base text-primary hover:text-[#6C5CE7] transition-colors duration-300"
                            >
                                How to
                            </Link>
                            <Link 
                                href="/#faqs"
                                className="font-semibold text-base text-primary hover:text-[#6C5CE7] transition-colors duration-300"
                            >
                                FAQs
                            </Link>
                            <Link 
                                href="/#reviews"
                                className="font-semibold text-base text-primary hover:text-[#6C5CE7] transition-colors duration-300"
                            >
                                Testimonials
                            </Link>
                            <Link 
                                href="/contact"
                                className="font-semibold text-base text-primary hover:text-[#6C5CE7] transition-colors duration-300"
                            >
                                Contact Us
                            </Link>
                        </div>

                        {/* Actions */}
                        <div className="hidden md:flex items-center gap-4">
                            <div className="hidden sm:block">
                                <ShareButton />
                            </div>
                            <div className="hidden sm:block">
                                <ThemeToggle />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation Overlay */}
                {isMobileMenuOpen && (
                    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 md:hidden">
                        <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-background p-6 shadow-lg animate-in slide-in-from-right">
                            <div className="flex flex-col h-full">
                                <div className="flex items-center justify-between mb-8">
                                    <h2 className="text-lg font-semibold">Menu</h2>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="relative group rounded-xl hover:border-[#6C5CE7] hover:text-[#6C5CE7]"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        <LuX className="size-5" />
                                    </Button>
                                </div>
                                <div className="flex flex-col space-y-4">
                                    <Link 
                                        href="/#how-to"
                                        className="px-4 py-2 rounded-lg hover:bg-accent/10 font-semibold text-primary hover:text-[#6C5CE7] transition-all duration-300"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        How to
                                    </Link>
                                    <Link 
                                        href="/#faqs"
                                        className="px-4 py-2 rounded-lg hover:bg-accent/10 font-semibold text-primary hover:text-[#6C5CE7] transition-all duration-300"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        FAQs
                                    </Link>
                                    <Link 
                                        href="/#reviews"
                                        className="px-4 py-2 rounded-lg hover:bg-accent/10 font-semibold text-primary hover:text-[#6C5CE7] transition-all duration-300"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        Testimonials
                                    </Link>
                                    <Link 
                                        href="/contact"
                                        className="px-4 py-2 rounded-lg hover:bg-accent/10 font-semibold text-primary hover:text-[#6C5CE7] transition-all duration-300"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        Contact Us
                                    </Link>
                                </div>
                                <div className="mt-auto pt-8 flex items-center gap-4">
                                    <ShareButton />
                                    <ThemeToggle />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </nav>
            {children}
            <Footer />
        </main>
    );
}