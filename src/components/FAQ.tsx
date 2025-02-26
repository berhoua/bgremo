import { useState } from 'react';

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = [
        {
            question: "How does the background removal work?",
            answer: "Our AI technology makes background removal effortless! Simply upload your image, and our tool will instantly detect and remove the background - even handling tricky details like hair and transparent objects. Get professional results with just one click."
        },
        {
            question: "What image formats are supported?",
            answer: "We support JPEG, JPG, WEBP, and PNG files up to 40MB in size. For best results, use clear, well-lit images with good contrast between the subject and background."
        },
        {
            question: "Is there a limit to how many images I can process?",
            answer: "No limits! Process as many images as you need - it's completely free with no daily restrictions."
        },
        {
            question: "Can I add a custom background after removal?",
            answer: "Yes! After removal, you can make the background transparent (perfect for logos and products) or choose from our collection of solid colors. Perfect for e-commerce or social media content."
        },
        {
            question: "What's the quality of the output image?",
            answer: "Your processed image will maintain the same high quality as the original! There's no loss in resolution or dimensions, and we ensure precise edge detection - even for tricky areas like hair. The output is perfect for professional use, from e-commerce to print."
        },
        {
            question: "Do I need to create an account to use the tool?",
            answer: "No account needed! Simply upload your image and get your result instantly. No registration, no email, and no personal information required - it's completely free and easy to use."
        }
    ];

    return (
        <div className="relative">
            {/* Background decorations */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute right-0 top-0 size-[600px] rotate-12 rounded-full bg-gradient-to-br from-[#6C5CE7]/5 via-[#FF7170]/5 to-transparent blur-3xl" />
                <div className="absolute bottom-0 left-0 size-[600px] -rotate-12 rounded-full bg-gradient-to-tr from-[#6C5CE7]/5 via-[#FF7170]/5 to-transparent blur-3xl" />
            </div>

            {/* Content */}
            <div className="relative">
                {/* Header */}
                <div className="mx-auto mb-16 max-w-3xl text-center">
                    <div className="mb-4 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#6C5CE7]/10 to-[#FF7170]/10 px-4 py-1.5 text-sm font-medium text-[#6C5CE7]">
                        <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Frequently Asked Questions</span>
                    </div>
                    <h2 className="mb-6 bg-gradient-to-r from-[#6C5CE7] to-[#FF7170] bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
                        Got Questions? We&apos;ve Got Answers
                    </h2>
                    <p className="mx-auto max-w-2xl text-lg text-gray-600 md:text-xl">
                        Find answers to common questions about our background removal tool and discover how it can transform your images
                    </p>
                </div>

                {/* FAQ Grid */}
                <div className="mx-auto grid max-w-4xl gap-8">
                    {faqs.map((faq, index) => (
                        <div 
                            key={index}
                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            className={`group relative cursor-pointer rounded-3xl bg-white transition-all duration-300 ${
                                openIndex === index 
                                    ? 'scale-[1.02] shadow-xl ring-1 ring-black/5' 
                                    : 'hover:scale-[1.01] hover:shadow-lg'
                            }`}
                        >
                            {/* Gradient Border */}
                            <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r from-[#6C5CE7] to-[#FF7170] opacity-0 transition-opacity duration-300 ${
                                openIndex === index ? 'opacity-10' : 'group-hover:opacity-5'
                            }`} />

                            <div className="flex w-full items-center justify-between p-8 text-left">
                                <div className="flex items-center gap-6">
                                    <div className={`flex size-10 items-center justify-center rounded-xl bg-gradient-to-r transition-colors duration-300 ${
                                        openIndex === index
                                            ? 'from-[#6C5CE7] to-[#FF7170] text-white shadow-lg shadow-[#6C5CE7]/25'
                                            : 'from-[#6C5CE7]/10 to-[#FF7170]/10 text-[#6C5CE7]'
                                    }`}>
                                        <span className="text-sm font-semibold">
                                            {index + 1}
                                        </span>
                                    </div>
                                    <span className="text-xl font-semibold text-gray-900">
                                        {faq.question}
                                    </span>
                                </div>
                                <div className={`ml-6 shrink-0 transition-all duration-300 ${
                                    openIndex === index ? 'rotate-180' : ''
                                }`}>
                                    <div className={`rounded-xl p-2 transition-colors duration-300 ${
                                        openIndex === index
                                            ? 'bg-gradient-to-r from-[#6C5CE7] to-[#FF7170] text-white'
                                            : 'bg-gradient-to-r from-[#6C5CE7]/10 to-[#FF7170]/10 text-[#6C5CE7]'
                                    }`}>
                                        <svg
                                            className="size-5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M19 9l-7 7-7-7"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div className={`grid transition-all duration-300 ${
                                openIndex === index ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                            }`}>
                                <div className="overflow-hidden">
                                    <div className="p-8 pt-0">
                                        <div className="mb-6 h-px w-full bg-gradient-to-r from-[#6C5CE7]/10 via-[#FF7170]/10 to-transparent" />
                                        <p className="text-lg leading-relaxed text-gray-600">
                                            {faq.answer}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom Decoration */}
                <div className="absolute bottom-0 left-1/2 h-1 w-48 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#6C5CE7]/20 to-transparent" />
            </div>
        </div>
    );
} 