import React from 'react'

export function CheckBox({ label, register, registerId, defaultChecked }) {
  return (
    <div className="flex items-center">
      <input type="checkbox" {...register(registerId)} defaultChecked={defaultChecked} className="h-4 w-4 rounded bg-transparent border border-gray-300 focus:ring-2 focus:ring-primary-500" />
      <span className="ml-2">{label}</span>
    </div>
  )
}
