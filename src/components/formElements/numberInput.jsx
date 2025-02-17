import React from 'react'
import {Label} from '@/components/ui/shadcnComponent/label'
import {Input} from '@/components/ui/shadcnComponent/input'

const NumberInput = ({registerId, label, defaultValue, className, register, suffix, step, min, max}) => {
  return (
    
                        <div className={`flex flex-col gap-y-2 ${className}`}>
                            <Label htmlFor={registerId}>{label}</Label>
                            <div className='flex items-center'>
                            <Input
                                {...register(registerId)}
                                defaultValue={defaultValue}
                                id={registerId}
                                name={registerId}
                                className={`w-20 h-9 bg-secondary border-2 border-foreground/20 text-foreground`}
                                type="number"
                                step={step}
                                min={min}
                                max={max} />
                            <span className='ml-1'>{suffix}</span>
                            </div>
                        </div>
  )
}

export default NumberInput
