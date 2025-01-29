import React from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'

const FileInput = ({registerId, register, label}) => {
    return (
        <div>
            <Label htmlFor={registerId} className="bg-secondary h-[4rem] w-full text-primary-background flex justify-center items-center rounded-lg text-center text-[1.5rem] tracking-widest shadow-inner">
                {label}
            </Label>
            <Input {...register(registerId)} name={registerId} id={registerId} type="file"  />
        </div>
    )
}

export default FileInput