import React from 'react'
import { format } from 'date-fns';
import {Button} from '@/components/ui/shadcnComponent/button'

export default function DataDashboardCard({fileDisplayObject}) {
      
  return (
    <div className="w-full h-20 rounded-none bg-background border hover:bg-primary-foreground text-primary whitespace-nowrap p-4 flex justify-between items-center">
      <div className='text-ellipsis text-foreground text-md w-60 overflow-hidden'>
        {fileDisplayObject.fileName}
      </div>
      <div className='text-[12px] text-muted-foreground'>
        Size: {(Number(fileDisplayObject.fileSize)/1024).toFixed(3)}Kb
      </div>
      <Button variant="destructive" size='sm'>Delete</Button>
    </div>
  )
}
