import React from 'react'
import { Button } from '@/components/ui/shadcnComponent/button'
import { format } from 'date-fns';
import Link from 'next/link';

function FileDashboardCard({ projectCardObject }) {

  return (
    <div className="w-full h-20 rounded-none bg-background border hover:bg-primary-foreground text-primary grid grid-cols-4 whitespace-nowrap p-4 items-center justify-center">
      <div className='text-start'>
        <div className='text-xl font-bold'>{projectCardObject.projectName}</div>
        <div className='w-60 sm:w-40 text-ellipsis overflow-hidden text-muted-foreground/60'>Project Id: {projectCardObject.projectId}</div>
      </div>
      <div className='text-[9px] text-start text-muted-foreground/70 mx-auto'>
        <div>
          Created At: {format(Date(projectCardObject.projectCreatedAt), 'yyyy/MM/dd, HH:mm')}
        </div>
        <div>
          Last Updated At: {format(Date(projectCardObject.projectUpdatedAt), 'yyyy/MM/dd, HH:mm')}
        </div>
        <div>
          Last Updated By: {projectCardObject.projectLastUpdatedBy}
        </div>
      </div>
      <div className='text-start text-sm mx-auto'>
        Your Access: {projectCardObject.access}
      </div>
      <div className='text-start flex justify-evenly mx-auto gap-x-4'>
        <Button size="md" ><Link href={`/project/${projectCardObject.projectId}`}>Open</Link></Button>
        <Button size="sm" variant="destructive">Delete</Button>
      </div>
      
    </div>
  )
}

export default FileDashboardCard