import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Cookie Policy | BG Mask',
    description: 'Learn about how BG Mask uses cookies and similar technologies to improve your experience.',
};

export default function CookiesPolicy() {
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
                    Cookie Policy
                </h1>

                <div className="space-y-8 text-gray-600">
                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold text-gray-800">Introduction</h2>
                        <p>
                            This Cookie Policy explains how BG Mask uses cookies and similar technologies 
                            to recognize you when you visit our website. It explains what these technologies 
                            are and why we use them, as well as your rights to control our use of them.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold text-gray-800">What are Cookies?</h2>
                        <p>
                            Cookies are small data files that are placed on your computer or mobile device when 
                            you visit a website. They are widely used by website owners to make their websites 
                            work, or work more efficiently, as well as to provide reporting information.
                        </p>
                        <p>
                            Cookies set by the website owner (in this case, BG Mask) are called &ldquo;first-party cookies&rdquo;. 
                            Cookies set by parties other than the website owner are called &ldquo;third-party cookies&rdquo;.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold text-gray-800">Types of Cookies We Use</h2>
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-xl font-medium text-gray-700">Essential Cookies</h3>
                                <p>
                                    These cookies are necessary for the website to function and cannot be switched off. 
                                    They are usually only set in response to actions made by you which amount to a request 
                                    for services, such as setting your privacy preferences or logging in.
                                </p>
                            </div>
                            
                            <div>
                                <h3 className="text-xl font-medium text-gray-700">Performance Cookies</h3>
                                <p>
                                    These cookies allow us to count visits and traffic sources so we can measure and 
                                    improve the performance of our site. They help us to know which pages are the most 
                                    and least popular and see how visitors move around the site.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-medium text-gray-700">Functional Cookies</h3>
                                <p>
                                    These cookies enable the website to provide enhanced functionality and personalization. 
                                    They may be set by us or by third-party providers whose services we have added to our pages.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold text-gray-800">How Can You Control Cookies?</h2>
                        <p>
                            You can set or amend your web browser controls to accept or refuse cookies. If you choose 
                            to reject cookies, you may still use our website though your access to some functionality 
                            and areas of our website may be restricted.
                        </p>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="font-medium mb-2">How to manage cookies in major browsers:</p>
                            <ul className="list-disc pl-6 space-y-1">
                                <li>Chrome: Settings → Privacy and Security → Cookies</li>
                                <li>Firefox: Options → Privacy & Security → Cookies</li>
                                <li>Safari: Preferences → Privacy → Cookies</li>
                                <li>Edge: Settings → Privacy & Security → Cookies</li>
                            </ul>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold text-gray-800">Updates to This Policy</h2>
                        <p>
                            We may update this Cookie Policy from time to time in order to reflect changes to the cookies 
                            we use or for other operational, legal, or regulatory reasons. Please re-visit this Cookie 
                            Policy regularly to stay informed about our use of cookies and related technologies.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold text-gray-800">Contact Us</h2>
                        <p>
                            If you have any questions about our use of cookies or other technologies, please contact us at:
                        </p>
                        <div className="rounded-lg bg-gray-50 p-4">
                            <p>Email: privacy@bgmask.com</p>
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