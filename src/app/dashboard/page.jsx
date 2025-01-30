import React from 'react'
import Navbar from '@/components/ui/navbar.jsx'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import CreateProjectButton from '@/components/createProject/createProjectButton'


function Dashboard() {

 

  return (
    <div className='h-screen flex flex-col'>
      <Navbar />
      <div className='flex-grow flex gap-x-2 px-2'>

        <div className='w-full flex bg-background flex-col p-3 gap-y-4 border'>

          <CreateProjectButton/>

         
            <div className='p-2 bg-background border flex-grow'>
              
            </div>

        </div>
        
      </div>
    </div>
  )
}

export default Dashboard