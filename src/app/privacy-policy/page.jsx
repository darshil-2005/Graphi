import React from 'react';
import Sidebar from '@/components/ui/sidebar';
import { auth } from '@/auth';
import { Orbitron } from 'next/font/google'
import { Separator } from '@/components/ui/shadcnComponent/separator';

const orbitron = Orbitron({ subsets: ['latin'], weight: ['400', '700'] })

async function PrivacyPolicy() {
    const session = await auth();

    
    return (
        <div className="flex h-screen">
            <Sidebar session={session} />
            <div className="p-6 overflow-y-auto">
                <h1 className={`text-4xl font-bold mb-4 ${orbitron.className}`}>Privacy Policy</h1>
                <Separator className='mb-6'/>
                <p>Last updated: February 15, 2023</p>
                <p>
                    This Privacy Policy describes Our policies and procedures on the collection, use, and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.
                </p>
                <p>
                    We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy.
                </p>
                <h2 className="text-xl font-semibold mt-4">Interpretation and Definitions</h2>
                <h3 className="text-lg font-medium mt-2">Interpretation</h3>
                <p>
                    The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.
                </p>
                <h3 className="text-lg font-medium mt-2">Definitions</h3>
                <p>
                    For the purposes of this Privacy Policy:
                </p>
                <ul className="list-disc pl-6">
                    <li><strong>Account</strong> means a unique account created for You to access our Service or parts of our Service.</li>
                    <li><strong>Company</strong> (referred to as either "the Company", "We", "Us" or "Our" in this Agreement) refers to Graphi, located in Gujarat, India.</li>
                    <li><strong>Cookies</strong> are small files that are placed on Your computer, mobile device, or any other device by a website, containing the details of Your browsing history on that website among its many uses.</li>
                    <li><strong>Country</strong> refers to: Gujarat, India</li>
                    <li><strong>Personal Data</strong> is any information that relates to an identified or identifiable individual.</li>
                    <li><strong>Service</strong> refers to the Website.</li>
                    <li><strong>Website</strong> refers to Graphi, accessible from <a href="https://www.graphi.vercel.app" className="text-blue-500">www.graphi.vercel.app</a></li>
                    <li><strong>You</strong> means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.</li>
                </ul>
                <h2 className="text-xl font-semibold mt-4">Collecting and Using Your Personal Data</h2>
                <p>
                    We collect and use your personal data to provide and improve our service. By using our service, you consent to this collection and usage in accordance with this Privacy Policy.
                </p>
                <h2 className="text-xl font-semibold mt-4">Payment Information</h2>
                <p>
                    We use Razorpay to process payments. Your payment details may be shared with Razorpay for transaction processing. We operate globally and comply with international payment regulations.
                </p>
                <h2 className="text-xl font-semibold mt-4">User-Generated Content</h2>
                <p>
                    Our service allows users to generate and share content. By using our service, you agree that we may store, display, and distribute user-generated content as part of providing our services.
                </p>
                <h2 className="text-xl font-semibold mt-4">Contact Us</h2>
                <p>
                    If you have any questions about this Privacy Policy, you can contact us at:
                </p>
                <p>Email: support@graphi.vercel.app</p>
            </div>
        </div>
    );
}

export default PrivacyPolicy;

