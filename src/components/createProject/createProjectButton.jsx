'use client';

import React from 'react'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

function CreateProjectButton() {

    function handleCreatingProject(){
        alert("Created Project...")
      }

  return (
    <Button className='bg-secondary/80 hover:bg-secondary h-[12%] w-full flex justify-center rounded-xl items-center group transition-all duration-100 border-[3px]' onClick={handleCreatingProject}>
    <div className='group-hover:bg-chart-2 bg-chart-2/80 p-1 transition-all duration-100'>
      <Plus />
    </div>
    <div className='ml-3 group-hover:text-muted-foreground text-muted-foreground/70 tracking-widest text-2xl transition-all duration-100'>
      Create Project
    </div>
  </Button>
  )
}

export default CreateProjectButton