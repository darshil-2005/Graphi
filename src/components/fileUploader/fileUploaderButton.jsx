'use client';

import React, { useState } from 'react'
import { toast } from "sonner";
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation';
import {handleAddingFileEntryInDb} from '@/app/server/actions'


function FileUploaderInput({ className }) {

  const router = useRouter();

  const [isUploading, setIsUploading] = useState(false);

  async function handleUploadingFile(e) {

    e.preventDefault();
    const file = e.target.files[0];
    const data = new FormData();
    data.set('file', file)

    if (!file) return alert('Please select a file');
    setIsUploading(true);


    const fileUploadResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/fileUploader`, {
      method: 'POST',
      body: data,
    })

    const jsonResponse = await fileUploadResponse.json();

    const dbEntryObject = {
      fileName: file.name,
      fileSize: file.size,
      fileId: jsonResponse.response.document.file_id,    
    }

    if(jsonResponse.success){
      const response = await handleAddingFileEntryInDb(dbEntryObject);
      console.log(response)
    }

    setIsUploading(false)
    router.refresh()
  }

  return (
    <>
      <Label htmlFor='dashboardFileUploadHandler' className={`bg-secondary/80 hover:bg-secondary flex justify-center rounded-xl items-center group transition-all duration-100 border-[3px] ${className}`}>
        {isUploading ? <div className='text-2xl text-muted-foreground/70'>Uploading...</div> : (
          <>
            <div className='group-hover:bg-chart-1 bg-chart-1/80 p-1 transition-all duration-100 grid justify-center items-center '>
              <Plus className='h-4 w-4' />
            </div>
            <div className='ml-4 text-2xl group-hover:text-muted-foreground text-muted-foreground/70 tracking-widest transition-all duration-100'>
              Upload New File
            </div>
          </>
        )}
      </Label>
      <Input type='file' id='dashboardFileUploadHandler' required onChange={handleUploadingFile} disabled={isUploading}/>
    </>
  )
}

export default FileUploaderInput
