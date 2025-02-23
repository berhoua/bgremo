import { RiGithubLine, RiInstagramLine, RiTwitterXLine, RiLinkedinLine, RiYoutubeLine, RiFacebookLine } from 'react-icons/ri';
import Link from 'next/link';

export const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative mt-6">
            {/* Enhanced Background decorations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-20 w-[500px] h-[500px] bg-gradient-to-br from-[#6C5CE7]/5 via-[#8B80F9]/10 to-[#a8a5f3]/5 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute -bottom-40 -left-20 w-[500px] h-[500px] bg-gradient-to-tr from-[#FF7170]/5 via-[#FF8F7D]/10 to-[#FFB185]/5 rounded-full blur-[120px] animate-pulse" />
            </div>

            {/* Content */}
            <div className="relative border-t border-accent/10 bg-gradient-to-b from-transparent via-white/50 to-white/80 backdrop-blur-sm">
                <div className="mx-auto max-w-7xl px-4 py-10">
                    <div className="flex flex-col items-center justify-center space-y-10">
                        {/* Logo Section with enhanced animation */}
                        <div className="flex flex-col items-center gap-2 group">
                            <div className="flex items-center gap-3 transform transition-all duration-300 group-hover:scale-105">
                                <div className="relative size-10 overflow-hidden rounded-xl bg-gradient-to-br from-[#6C5CE7] to-[#574db2] p-[1px] shadow-lg shadow-[#6C5CE7]/25 hover:shadow-xl hover:shadow-[#6C5CE7]/40 transition-shadow duration-300">
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#6C5CE7] to-[#574db2] opacity-90" />
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    <img
                                        src="/favicon.svg"
                                        alt="BG Mask Logo"
                                        className="relative h-full w-full object-cover transform transition-transform duration-300 group-hover:scale-110"
                                    />
                                </div>
                                <span className="bg-gradient-to-r from-[#6C5CE7] to-[#574db2] bg-clip-text text-2xl font-extrabold text-transparent">
                                    BG MASK
                                </span>
                            </div>
                            <p className="text-center text-base text-gray-600 transition-colors duration-300 group-hover:text-[#6C5CE7]">
                                Remove backgrounds from images instantly with AI
                            </p>
                        </div>

                        {/* Enhanced Stats Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12">
                            {[
                                { value: "100%", label: "Free to Use" },
                                { value: "40MB", label: "Max File Size" },
                                { value: "Instant", label: "Processing" },
                                { value: "HD", label: "Output Quality" }
                            ].map((stat, index) => (
                                <div key={index} className="group text-center transform transition-all duration-300 hover:scale-105 hover:-translate-y-1">
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-gradient-to-r from-[#6C5CE7]/20 to-[#574db2]/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        <div className="relative">
                                            <div className="text-2xl font-bold bg-gradient-to-r from-[#6C5CE7] to-[#574db2] bg-clip-text text-transparent">
                                                {stat.value}
                                            </div>
                                            <div className="text-xs font-medium text-gray-600 mt-0.5 group-hover:text-[#6C5CE7] transition-colors">
                                                {stat.label}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Enhanced Social Links */}
                        <div className="flex flex-wrap items-center justify-center gap-4">
                            {[
                                { Icon: RiTwitterXLine, url: "https://twitter.com" },
                                { Icon: RiInstagramLine, url: "https://instagram.com" },
                                { Icon: RiGithubLine, url: "https://github.com" },
                                { Icon: RiLinkedinLine, url: "https://linkedin.com" },
                                { Icon: RiYoutubeLine, url: "https://youtube.com" },
                                { Icon: RiFacebookLine, url: "https://facebook.com" }
                            ].map((social, index) => (
                                <a
                                    key={index}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative p-1.5 rounded-lg hover:bg-[#6C5CE7]/10 transition-colors duration-300"
                                >
                                    <social.Icon className="size-5 text-gray-600 group-hover:text-[#6C5CE7] transition-colors duration-300" />
                                </a>
                            ))}
                        </div>

                        {/* Enhanced Copyright Section */}
                        <div className="text-center space-y-4">
                            <div className="flex items-center justify-center space-x-2 group">
                                <span className="text-xl group-hover:animate-pulse">©</span>
                                <span className="text-gray-700 text-sm font-medium">{currentYear}</span>
                                <span className="bg-gradient-to-r from-[#6C5CE7] to-[#574db2] bg-clip-text text-transparent text-sm font-semibold">
                                    WEB PROJECT SOLUTIONS LTD
                                </span>
                            </div>
                            <div className="flex flex-wrap items-center justify-center gap-2">
                                {[
                                    { href: "/terms", text: "Terms of Service" },
                                    { href: "/privacy-policy", text: "Privacy Policy" },
                                    { href: "/cookies", text: "Cookie Policy" }
                                ].map((link, index) => (
                                    <Link
                                        key={index}
                                        href={link.href}
                                        className="px-3 py-1.5 text-xs rounded-full bg-gray-50 hover:bg-[#6C5CE7]/10 hover:text-[#6C5CE7] transition-all duration-300 shadow-sm hover:shadow-md"
                                    >
                                        {link.text}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}