import React from 'react';
import Sidebar from '@/components/ui/sidebar';
import { auth } from '@/auth';
import { Orbitron } from 'next/font/google'
import { Separator } from '@/components/ui/shadcnComponent/separator';


const orbitron = Orbitron({ subsets: ['latin'], weight: ['400', '700'] })

async function TermsAndConditions() {
    const session = await auth();
    
    return (
        <div className="flex h-screen">
            <Sidebar session={session} />
            <div className="p-6 overflow-y-auto">
                <h1 className={`text-4xl font-bold mb-4 ${orbitron.className}`}>Terms and Conditions</h1>
                <Separator className='mb-6'/>
                <p>Last updated: February 15, 2023</p>
                <p>
                    These Terms and Conditions outline the rules and regulations for the use of Our Service.
                </p>
                <h2 className="text-xl font-semibold mt-4">Interpretation and Definitions</h2>
                <h3 className="text-lg font-medium mt-2">Interpretation</h3>
                <p>
                    The words with capitalized initials have meanings defined under the following conditions. These definitions apply regardless of whether they appear in singular or plural form.
                </p>
                <h3 className="text-lg font-medium mt-2">Definitions</h3>
                <p>
                    For the purposes of these Terms and Conditions:
                </p>
                <ul className="list-disc pl-6">
                    <li><strong>Company</strong> (referred to as either "the Company", "We", "Us" or "Our" in this Agreement) refers to Graphi, located in Gujarat, India.</li>
                    <li><strong>Country</strong> refers to: Gujarat, India</li>
                    <li><strong>Service</strong> refers to the Website.</li>
                    <li><strong>Website</strong> refers to Graphi, accessible from <a href="https://www.graphi.vercel.app" className="text-blue-500">www.graphi.vercel.app</a></li>
                    <li><strong>You</strong> means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.</li>
                </ul>
                <h2 className="text-xl font-semibold mt-4">Acknowledgment</h2>
                <p>
                    These Terms and Conditions govern the use of this Service and constitute the agreement between You and the Company. Your access to and use of the Service is conditioned on Your acceptance of and compliance with these Terms.
                </p>
                <h2 className="text-xl font-semibold mt-4">Termination</h2>
                <p>
                    We may terminate or suspend Your access immediately, without prior notice or liability, for any reason, including if You breach these Terms and Conditions.
                </p>
                <h2 className="text-xl font-semibold mt-4">Limitation of Liability</h2>
                <p>
                    To the maximum extent permitted by applicable law, the Company shall not be liable for any indirect, incidental, or consequential damages arising from the use of the Service.
                </p>
                <h2 className="text-xl font-semibold mt-4">Governing Law</h2>
                <p>
                    These Terms shall be governed by the laws of Gujarat, India, without regard to its conflict of law provisions.
                </p>
                <h2 className="text-xl font-semibold mt-4">Changes to These Terms</h2>
                <p>
                    We reserve the right to modify or replace these Terms at any time. If a revision is material, We will provide notice prior to any new terms taking effect.
                </p>
                <h2 className="text-xl font-semibold mt-4">Contact Us</h2>
                <p>
                    If you have any questions about these Terms and Conditions, you can contact us at:
                </p>
                <p>Email: support@graphi.vercel.app</p>
            </div>
        </div>
    );
}

export default TermsAndConditions;
