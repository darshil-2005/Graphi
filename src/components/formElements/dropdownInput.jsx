import React from 'react'
import { Label } from '../ui/label'

const DropdownInput = ({ registerId, register, optionsArray, label, defaultValue, onChangeHandler = () => null, formatLabel = false }) => {

    // console.log('Keys: ', optionsArray, typeof optionsArray);    


    return (
        <div className='flex flex-col gap-y-3 justify-around'>
            <Label htmlFor={registerId}>{label}</Label>
            <select required id={registerId} name={registerId} defaultValue={defaultValue} className='bg-secondary h-8 p-1 rounded-md' {...register(registerId, { onChange: (e) => { onChangeHandler(e.target.value) } })}>
                {
                    optionsArray &&
                    optionsArray.map((option, index) => (<option key={index} value={option}>{!formatLabel ? option : option.charAt(0).toUpperCase() + option.slice(1)}</option>))
                }
            </select>
        </div>

    )
}

export default DropdownInput