import React from 'react'
import { Label } from '@/components/ui/shadcnComponent/label'
import { Input } from '@/components/ui/shadcnComponent/input'

const ColorInput = ({ registerId, label, defaultValue, className, register, showOpacity = false, defaultOpacity }) => {

  console.log("Opa: ", defaultOpacity)
  return (

    <div className={`${ showOpacity ? 'grid grid-cols-2 ' : ''} ${className} w-full`}>

      <div className='flex flex-col gap-y-2'>
      <Label htmlFor={registerId}>{label}</Label>
      <Input
        {...register(registerId)}
        defaultValue={defaultValue}
        id={registerId}
        className={`w-20 h-10 bg-secondary border-2 border-foreground/20 text-foreground focus:border-2 focus:border-primary`}
        type="color"
      />
      </div>

      
      {showOpacity && (
        <div className='flex flex-col gap-y-2 ml-2'>
          <Label htmlFor={registerId + 'Opacity'}>Opacity</Label>
          <Input
            {...register(registerId + 'Opacity')}
            defaultValue={defaultOpacity}
            id={registerId + 'Opacity'}
            name={registerId + 'Opacity'}
            className={`w-20 h-10 bg-secondary border-2 border-foreground/20 text-foreground focus:border-2 focus:border-primary`}
            type="number"
            step={0.01}
            min={0}
            max={1} />
        </div>
      )}
     
    </div>

  )
}

export default ColorInput

