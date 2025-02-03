'use client'

import React, { useEffect } from 'react'
import DataDashboardCard from "@/components/ui/dataDashboardCard"
import usePlaneElementsStore from '@/features/store/planeElementsStore.jsx';


export default function DashboardFileDisplayer() {

    const setUserFiles = usePlaneElementsStore((state) => (state.setUserFiles));

    useEffect(() => {
        setUserFiles();
    }, [])
    
    const userDataFiles =  usePlaneElementsStore((state) => (state.userDataFiles));
     
    return (
        <div className='flex-1 p-2 bg-background border flex flex-col gap-y-[8px] overflow-y-auto scrollbar-thin scrollbar-thumb-foreground scrollbar-track-background '>
            {userDataFiles.map((fileDisplayObject, index) => {
                return <DataDashboardCard key={index} fileDisplayObject={fileDisplayObject} />
            })}
        </div>
    )
}
