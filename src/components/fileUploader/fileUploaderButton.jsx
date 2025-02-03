'use client';

import React, { useState } from 'react'
import { openDB } from 'idb';
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation';
import { handleAddingFileEntryInDb } from '@/app/server/actions'
import { fileReader } from '@/utils/manualUtils'
import usePlaneElementsStore from '@/features/store/planeElementsStore.jsx';


function FileUploaderInput({ className }) {

  const [isUploading, setIsUploading] = useState(false);
   const setUserFiles = usePlaneElementsStore((state) => (state.setUserFiles));

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

    if (file.type == 'text/csv') {

      const fileData = await file.text();
      const fileData2 = await fileReader(fileData);

      const dbEntryObject = {
        fileName: file.name,
        fileSize: file.size,
        fileId: jsonResponse.response.document.file_id,
        fileKeys: {fileKeys: fileData2['columns']}
      }

      if (jsonResponse.success) {
        const response = await handleAddingFileEntryInDb(dbEntryObject);
        console.log(response);
      }


      const dbPromise = openDB('GraphiDataBase', 1, {
        upgrade(db) {
          const dataStore = db.createObjectStore('Data', { keyPath: 'id' });
          dataStore.createIndex('id', 'id', { unique: true });
        },
      });

      const db = await dbPromise;
      await db.put('Data', { id: jsonResponse.response.document.file_id, userData: fileData2 });
    }


    if (file.type.startsWith('image')) {
      const dbEntryObject = {
        fileName: file.name,
        fileSize: file.size,
        fileId: jsonResponse.response.photo[jsonResponse.response.photo.length - 1].file_id,
        fileKeys: {}
      }

      if (jsonResponse.success) {
        const response = await handleAddingFileEntryInDb(dbEntryObject);
        console.log(response)
      }
    }

    setIsUploading(false)
    setUserFiles();
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
      <Input type='file' id='dashboardFileUploadHandler' required onChange={handleUploadingFile} disabled={isUploading} />
    </>
  )
}

export default FileUploaderInput
