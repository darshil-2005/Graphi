import React from 'react';
import { Plus } from 'lucide-react';

export default function PlusUi({size, backgroundColor}) {


    return (
        <div className={`text-white flex justify-center items-center p-1 border`} style={{
            height: `${size}`,
            width: `${size}`,
            backgroundColor: `${backgroundColor}`
        }}>
            <Plus/>
        </div>
    )
}