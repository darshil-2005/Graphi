import React from 'react'
import { Checkbox } from '@/components/ui/shadcnComponent/checkbox'

export function CheckBox({ label, register, registerId, defaultChecked }) {
  return (
    <div className="flex items-center">
      <input type="checkbox" {...register(registerId)} defaultChecked={defaultChecked} className="h-4 w-4 rounded border border-foreground accent-blue-600 dark:accent-sky-400 " />
      <span className="ml-2">{label}</span>
    </div>
  )
}
