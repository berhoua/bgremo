import Image from 'next/image';

export default function Reviews() {
    return (
        <div className="relative">
            {/* Background decorations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-20 size-[400px] bg-gradient-to-br from-[#6C5CE7]/5 to-[#a8a5f3]/5 rounded-full blur-3xl" />
                <div className="absolute -bottom-40 -left-20 size-[400px] bg-gradient-to-tr from-[#FF7170]/5 to-[#FFB185]/5 rounded-full blur-3xl" />
            </div>

            {/* Content */}
            <div className="relative space-y-16">
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto">
                    <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-[#6C5CE7]/5 text-[#6C5CE7] font-medium text-sm mb-4">
                        <svg className="size-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
                        </svg>
                        <span>Customer Reviews</span>
                    </div>
                    <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#6C5CE7] to-[#FF7170] mb-4">
                        See what people are saying
                    </h2>
                    <p className="text-gray-600 text-lg">
                        Join thousands of satisfied users who have transformed their images with our tool
                    </p>
                </div>

                {/* Reviews Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Review 1 */}
                    <div className="group relative">
                        <div className="absolute inset-0.5 bg-gradient-to-br from-[#6C5CE7] to-[#FF7170] rounded-2xl blur opacity-5 group-hover:opacity-20 transition duration-500"></div>
                        <div className="relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition duration-500">
                            {/* Quote Icon */}
                            <div className="absolute -top-4 right-8">
                                <div className="bg-gradient-to-br from-[#6C5CE7] to-[#FF7170] rounded-full p-2 shadow-lg shadow-[#6C5CE7]/10">
                                    <svg className="size-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M11.625 16.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75v-3.375A3.375 3.375 0 0110.125 9.75H10.5a1.125 1.125 0 100-2.25h-.375a5.625 5.625 0 00-5.625 5.625V16.5a3 3 0 003 3h3.375a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v3zm8.25 0a.75.75 0 01-.75.75H15.75a.75.75 0 01-.75-.75v-3.375a3.375 3.375 0 013.375-3.375h.375a1.125 1.125 0 100-2.25h-.375A5.625 5.625 0 0013.125 13.5v3a3 3 0 003 3h3.375a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v3z" />
                                    </svg>
                                </div>
                            </div>

                            {/* Review Content */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-2">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} className="size-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
                                        </svg>
                                    ))}
                                </div>

                                <p className="text-gray-700 leading-relaxed">
                                    I enjoy using the remove background feature during my product launches! In just a few steps, I&apos;m able to quickly remove the original background and add a fun one with my product.
                                </p>

                                <div className="flex items-center gap-4">
                                    <div className="relative size-12 rounded-full ring-2 ring-[#6C5CE7]/10">
                                        <Image
                                            src="/reviewer1.webp"
                                            alt="Shelly Kim"
                                            fill
                                            className="object-cover rounded-full"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">Shelly Kim</h3>
                                        <p className="text-sm text-[#6C5CE7]">Owner @ Letters by Shells</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Review 2 */}
                    <div className="group relative mt-8 md:mt-12">
                        <div className="absolute inset-0.5 bg-gradient-to-br from-[#6C5CE7] to-[#FF7170] rounded-2xl blur opacity-5 group-hover:opacity-20 transition duration-500"></div>
                        <div className="relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition duration-500">
                            {/* Quote Icon */}
                            <div className="absolute -top-4 right-8">
                                <div className="bg-gradient-to-br from-[#6C5CE7] to-[#FF7170] rounded-full p-2 shadow-lg shadow-[#6C5CE7]/10">
                                    <svg className="size-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M11.625 16.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75v-3.375A3.375 3.375 0 0110.125 9.75H10.5a1.125 1.125 0 100-2.25h-.375a5.625 5.625 0 00-5.625 5.625V16.5a3 3 0 003 3h3.375a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v3zm8.25 0a.75.75 0 01-.75.75H15.75a.75.75 0 01-.75-.75v-3.375a3.375 3.375 0 013.375-3.375h.375a1.125 1.125 0 100-2.25h-.375A5.625 5.625 0 0013.125 13.5v3a3 3 0 003 3h3.375a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v3z" />
                                    </svg>
                                </div>
                            </div>

                            {/* Review Content */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-2">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} className="size-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
                                        </svg>
                                    ))}
                                </div>

                                <p className="text-gray-700 leading-relaxed">
                                    As a marketer who is always on the move, this tool helps me to create fast, high quality content. Absolute endless features to enhance my creativity!
                                </p>

                                <div className="flex items-center gap-4">
                                    <div className="relative size-12 rounded-full ring-2 ring-[#6C5CE7]/10">
                                        <Image
                                            src="/reviewer2.webp"
                                            alt="Abs Ahlijah"
                                            fill
                                            className="object-cover rounded-full"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">Abs Ahlijah</h3>
                                        <p className="text-sm text-[#6C5CE7]">Marketing @ Soul Session</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Review 3 */}
                    <div className="group relative">
                        <div className="absolute inset-0.5 bg-gradient-to-br from-[#6C5CE7] to-[#FF7170] rounded-2xl blur opacity-5 group-hover:opacity-20 transition duration-500"></div>
                        <div className="relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition duration-500">
                            {/* Quote Icon */}
                            <div className="absolute -top-4 right-8">
                                <div className="bg-gradient-to-br from-[#6C5CE7] to-[#FF7170] rounded-full p-2 shadow-lg shadow-[#6C5CE7]/10">
                                    <svg className="size-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M11.625 16.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75v-3.375A3.375 3.375 0 0110.125 9.75H10.5a1.125 1.125 0 100-2.25h-.375a5.625 5.625 0 00-5.625 5.625V16.5a3 3 0 003 3h3.375a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v3zm8.25 0a.75.75 0 01-.75.75H15.75a.75.75 0 01-.75-.75v-3.375a3.375 3.375 0 013.375-3.375h.375a1.125 1.125 0 100-2.25h-.375A5.625 5.625 0 0013.125 13.5v3a3 3 0 003 3h3.375a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v3z" />
                                    </svg>
                                </div>
                            </div>

                            {/* Review Content */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-2">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} className="size-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
                                        </svg>
                                    ))}
                                </div>

                                <p className="text-gray-700 leading-relaxed">
                                    The remove background image tool saved me hours of tedious editing, effortlessly removing backgrounds and refining my images with just a few clicks.
                                </p>

                                <div className="flex items-center gap-4">
                                    <div className="relative size-12 rounded-full ring-2 ring-[#6C5CE7]/10">
                                        <Image
                                            src="/reviewer3.webp"
                                            alt="Penuel Stanley-Zebulon"
                                            fill
                                            className="object-cover rounded-full"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">Penuel Stanley-Zebulon</h3>
                                        <p className="text-sm text-[#6C5CE7]">Student @ PSU</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 