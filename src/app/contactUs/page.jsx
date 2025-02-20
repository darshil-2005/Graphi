import React from 'react';
import Sidebar from '@/components/ui/sidebar';
import { auth } from '@/auth';
import { Separator } from '@/components/ui/shadcnComponent/separator';
import { Orbitron } from 'next/font/google';

const orbitron = Orbitron({ subsets: ['latin'], weight: ['400', '700'] })

async function ContactUs() {
    const session = await auth();
    
    return (
        <div className="flex h-screen">
            <Sidebar session={session} />
            <div className="p-6 overflow-y-auto">
                <h1 className={`text-4xl font-bold mb-4 ${orbitron.className}`}>Contact Us</h1>
                <Separator className='mb-6'/>
                <p>
                    If you have any questions, concerns, or feedback, feel free to reach out to us.
                </p>
                <h2 className="text-xl font-semibold mt-4">Email</h2>
                <p>You can email us at: <a href="mailto:support@graphi.vercel.app" className="text-blue-500">support@graphi.vercel.app</a></p>
                <h2 className="text-xl font-semibold mt-4">Location</h2>
                <p>Gujarat, India</p>
            </div>
        </div>
    );
}

export default ContactUs;