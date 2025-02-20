import React from 'react';
import Sidebar from '@/components/ui/sidebar';
import { auth } from '@/auth';
import { Orbitron } from 'next/font/google';
import { Separator } from '@/components/ui/shadcnComponent/separator';

const orbitron = Orbitron({ subsets: ['latin'], weight: ['400', '700'] })


async function ShippingAndDelivery() {
    const session = await auth();
    
    return (
        <div className="flex h-screen">
            <Sidebar session={session} />
            <div className="p-6 overflow-y-auto">
                <h1 className={`text-4xl font-bold mb-4 ${orbitron.className}`}>Shipping & Delivery Policy</h1>
                <Separator className='mb-6'/>
                <p>
                    Graphi is a Software-as-a-Service (SaaS) product, and no physical goods are shipped or delivered.
                </p>
                <p>
                    Upon successful purchase, users gain immediate access to our services online. If you encounter any issues with access, please contact our support team at <a href="mailto:developers.graphi@gmail.com" className="text-blue-500">developers.graphi@gmail.com</a>.
                </p>
            </div>
        </div>
    );
}

export default ShippingAndDelivery;
