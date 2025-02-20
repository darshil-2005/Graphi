import React from 'react';
import Sidebar from '@/components/ui/sidebar';
import { auth } from '@/auth';
import { Orbitron } from 'next/font/google';
import { Separator } from '@/components/ui/shadcnComponent/separator';

const orbitron = Orbitron({ subsets: ['latin'], weight: ['400', '700'] })

async function CancellationPolicy() {
    const session = await auth();
    
    return (
        <div className="flex h-screen">
            <Sidebar session={session} />
            <div className="p-6 overflow-y-auto">
                <h1 className={`text-4xl font-bold mb-4 ${orbitron.className}`}>Cancellation & Refund Policy</h1>
                <Separator className='mb-6'/>
                <p>Last updated: February 20, 2025</p>
                <h2 className="text-xl font-semibold mt-4">No Cancellations</h2>
                <p>
                    Once a purchase is made, it is final. We do not accept cancellations for any reason.
                    Please review your order carefully before confirming your purchase.
                </p>
                <h2 className="text-xl font-semibold mt-4">No Refunds</h2>
                <p>
                    All purchases are non-refundable. We do not provide refunds, whether in full or partial,
                    under any circumstances. By making a purchase, you agree to this policy.
                </p>
                <h2 className="text-xl font-semibold mt-4">Contact Us</h2>
                <p>
                    If you have any questions regarding this policy, you can contact us at:
                </p>
                <p>Email: <a href="mailto:support@graphi.vercel.app" className="text-blue-500">support@graphi.vercel.app</a></p>
            </div>
        </div>
    );
}

export default CancellationPolicy;
