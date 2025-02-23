import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy | BG Mask',
    description: 'Privacy Policy for BG Mask - Learn how we handle and protect your data.',
};

export default function PrivacyPolicy() {
    return (
        <div className="relative min-h-screen">
            {/* Background decorations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-20 size-[600px] bg-gradient-to-br from-[#6C5CE7]/10 to-[#a8a5f3]/10 rounded-full blur-[100px]" />
                <div className="absolute -bottom-40 -left-20 size-[600px] bg-gradient-to-tr from-[#FF7170]/10 to-[#FFB185]/10 rounded-full blur-[100px]" />
            </div>

            {/* Content */}
            <div className="relative mx-auto max-w-4xl px-4 py-16">
                <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-[#6C5CE7] to-[#574db2] bg-clip-text text-transparent">
                    Privacy Policy
                </h1>

                <div className="space-y-8 text-gray-600">
                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold text-gray-800">Introduction</h2>
                        <p>
                            At BG Mask, we take your privacy seriously. This Privacy Policy explains how we collect, use, 
                            disclose, and safeguard your information when you use our background removal service.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold text-gray-800">Information We Collect</h2>
                        <div className="space-y-2">
                            <h3 className="text-xl font-medium text-gray-700">Images</h3>
                            <p>
                                When you use our service, we temporarily process the images you upload for background removal. 
                                These images are automatically deleted from our servers after processing is complete.
                            </p>
                            
                            <h3 className="text-xl font-medium text-gray-700">Usage Data</h3>
                            <p>
                                We collect anonymous usage data such as browser type, device information, and interaction 
                                with our service to improve user experience and service performance.
                            </p>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold text-gray-800">How We Use Your Information</h2>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>To provide and maintain our Service</li>
                            <li>To detect, prevent, and address technical issues</li>
                            <li>To improve our background removal algorithm</li>
                            <li>To analyze usage patterns and optimize user experience</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold text-gray-800">Data Security</h2>
                        <p>
                            We implement appropriate technical and organizational measures to protect your data. 
                            However, no method of transmission over the Internet is 100% secure, and we cannot 
                            guarantee absolute security.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold text-gray-800">Your Rights</h2>
                        <p>
                            You have the right to:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Access your personal information</li>
                            <li>Request deletion of your data</li>
                            <li>Object to processing of your data</li>
                            <li>Request data portability</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold text-gray-800">Changes to This Privacy Policy</h2>
                        <p>
                            We may update our Privacy Policy from time to time. We will notify you of any changes by 
                            posting the new Privacy Policy on this page and updating the &ldquo;Last Updated&rdquo; date.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold text-gray-800">Contact Us</h2>
                        <p>
                            If you have any questions about this Privacy Policy, please contact us at:
                        </p>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p>Email: privacy@bgmask.com</p>
                            <p>Address: 123 Main St, Anytown, USA</p>
                        </div>
                    </section>

                    <div className="text-sm text-gray-500 text-center pt-8">
                        Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </div>
                </div>
            </div>
        </div>
    );
} 