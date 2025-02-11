import React from 'react'
import { Label } from '@/components/ui/shadcnComponent/label'
import { Input } from '@/components/ui/shadcnComponent/input'

const TextInput = ({ registerId, label, className, register, defaultValue }) => {
  return (

    <div className={`flex flex-col gap-y-2 ${className}`}>
      <Label htmlFor={registerId}>{label}</Label>
      <div className='flex items-center'>
        <Input
          {...register(registerId)}
          defaultValue={defaultValue}
          id={registerId}
          name={registerId}
          className={`w-20 h-9 bg-background focus:border-2 focus:border-primary`}
          type="text"
        />
      </div>
    </div>
  )
}

export default TextInput