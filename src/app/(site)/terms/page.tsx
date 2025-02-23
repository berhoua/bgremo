import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Terms of Service | BG Mask',
    description: 'Read our Terms of Service to understand the rules and guidelines for using BG Mask.',
};

export default function TermsOfService() {
    return (
        <div className="relative min-h-screen">
            {/* Background decorations */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -right-20 -top-40 size-[600px] rounded-full bg-gradient-to-br from-[#6C5CE7]/10 to-[#a8a5f3]/10 blur-[100px]" />
                <div className="absolute -bottom-40 -left-20 size-[600px] rounded-full bg-gradient-to-tr from-[#FF7170]/10 to-[#FFB185]/10 blur-[100px]" />
            </div>

            {/* Content */}
            <div className="relative mx-auto max-w-4xl px-4 py-16">
                <h1 className="mb-8 bg-gradient-to-r from-[#6C5CE7] to-[#574db2] bg-clip-text text-center text-4xl font-bold text-transparent">
                    Terms of Service
                </h1>

                <div className="space-y-8 text-gray-600">
                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold text-gray-800">1. Acceptance of Terms</h2>
                        <p>
                            By accessing and using BG Mask (&ldquo;the Service&rdquo;), you accept and agree to be bound by the terms 
                            and conditions of this agreement. If you do not agree to these terms, please do not use our Service.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold text-gray-800">2. Description of Service</h2>
                        <p>
                            BG Mask is an AI-powered background removal service that allows users to remove backgrounds 
                            from images. The Service is provided &ldquo;as is&rdquo; and may be updated or modified at any time 
                            without prior notice.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold text-gray-800">3. User Obligations</h2>
                        <div className="space-y-2">
                            <p>By using our Service, you agree to:</p>
                            <ul className="space-y-2 pl-6 list-disc">
                                <li>Provide accurate and complete information when using the Service</li>
                                <li>Use the Service only for lawful purposes</li>
                                <li>Not upload any content that infringes on intellectual property rights</li>
                                <li>Not attempt to circumvent any technical limitations or security measures</li>
                                <li>Not use the Service to distribute malware or harmful code</li>
                            </ul>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold text-gray-800">4. Intellectual Property Rights</h2>
                        <div className="space-y-2">
                            <p>
                                You retain all rights to your content. By uploading content to our Service, you grant 
                                BG Mask a limited license to process and modify the content solely for the purpose of 
                                providing the background removal service.
                            </p>
                            <p>
                                The Service&apos;s software, design, and technology are protected by copyright, trademark, 
                                and other laws. Our trademarks and trade dress may not be used without our prior 
                                written permission.
                            </p>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold text-gray-800">5. Privacy and Data Protection</h2>
                        <p>
                            Your privacy is important to us. Our use of your personal information is governed by our 
                            Privacy Policy and Cookie Policy. By using the Service, you agree to our collection and 
                            use of information as described in these policies.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold text-gray-800">6. Limitation of Liability</h2>
                        <div className="space-y-2">
                            <p>
                                To the maximum extent permitted by law, BG Mask shall not be liable for any indirect, 
                                incidental, special, consequential, or punitive damages, or any loss of profits or 
                                revenues, whether incurred directly or indirectly.
                            </p>
                            <p>
                                We do not guarantee that:
                            </p>
                            <ul className="space-y-2 pl-6 list-disc">
                                <li>The Service will be error-free or uninterrupted</li>
                                <li>Any specific results will be achieved through the Service</li>
                                <li>Files will be permanently stored or backed up</li>
                            </ul>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold text-gray-800">7. Modifications to Service</h2>
                        <p>
                            We reserve the right to modify or discontinue the Service at any time, temporarily or 
                            permanently, with or without notice. We shall not be liable to you or any third party 
                            for any modification, suspension, or discontinuance of the Service.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold text-gray-800">8. Termination</h2>
                        <p>
                            We may terminate or suspend your access to the Service immediately, without prior notice 
                            or liability, for any reason whatsoever, including without limitation if you breach these Terms.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold text-gray-800">9. Governing Law</h2>
                        <p>
                            These Terms shall be governed by and construed in accordance with the laws of the jurisdiction 
                            in which WEB PROJECT SOLUTIONS LTD operates, without regard to its conflict of law provisions.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold text-gray-800">10. Contact Information</h2>
                        <p>
                            For any questions about these Terms, please contact us at:
                        </p>
                        <div className="rounded-lg bg-gray-50 p-4">
                            <p>Email: legal@bgmask.com</p>
                            <p>Address: 123 Main St, Anytown, USA</p>
                        </div>
                    </section>

                    <div className="pt-8 text-center text-sm text-gray-500">
                        Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </div>
                </div>
            </div>
        </div>
    );
} 