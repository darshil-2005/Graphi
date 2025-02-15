'use client';

import React, { useState } from 'react'
import { Button } from '@/components/ui/shadcnComponent/button'
import { Plus } from 'lucide-react'
import { handleCreatingProject } from '@/app/server/actions'
import { useRouter } from 'next/navigation';


function CreateProjectButton({ session, className }) {

  const router = useRouter();

  //? UI Use State

  const [creatingProject, setCreatingProject] = useState(false);

  const handleCreatingProjectClient = async () => {

    setCreatingProject(true);
    await handleCreatingProject(session);
    router.refresh();
    setCreatingProject(false);

  }

  return (
    <Button className={`bg-secondary/80 hover:bg-secondary h-full w-full flex justify-center rounded-xl items-center group transition-all duration-100 border-[3px] ${className}`} onClick={handleCreatingProjectClient} disabled={creatingProject}>
      {!creatingProject &&
        <div className='group-hover:bg-vibrant-2 bg-vibrant-2/90 rounded p-[2px] transition-all duration-100'>
          <Plus className='h-5 w-5 text-foreground'/>
        </div>
      }
      <div className='ml-3 group-hover:text-muted-foreground text-muted-foreground/70 tracking-widest text-2xl transition-all duration-100'>
        {creatingProject ? 'Creating Project...' : 'Create Project'}
      </div>
    </Button>
  )
}

export default CreateProjectButton