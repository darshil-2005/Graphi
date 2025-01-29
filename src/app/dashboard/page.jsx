import React from 'react'
import Navbar from '@/components/ui/navbar.jsx'
import { Plus } from 'lucide-react'



function Dashboard() {
  return (
    <div className='h-screen flex flex-col'>
      <Navbar />
      <div className='flex-grow flex gap-x-2 px-2'>

        {/* <div className='w-[35%] p-4'>
          jbjbrjvbqhjklbvhj

        </div> */}

        <div className='w-full flex bg-background flex-col rounded-2xl p-3 gap-y-4 border'>

            <div className='bg-secondary/80 hover:bg-secondary h-[15%] w-full rounded-2xl flex justify-center items-center group transition-all duration-100 border-[1px]'>
              <div className='group-hover:bg-chart-2 bg-chart-2/80 rounded-full p-1 transition-all duration-100'>
                <Plus className='' />
              </div>
              <div className='ml-3 group-hover:text-muted-foreground text-muted-foreground/70 tracking-widest text-3xl transition-all duration-100'>
                Create Project
              </div>
            </div>
            <div className='p-2 bg-background border flex-grow rounded-lg inset-shadow-sm inset-shadow-indigo-500'>
              bujkldvb
            </div>

        </div>
        
      </div>
    </div>
  )
}

export default Dashboard