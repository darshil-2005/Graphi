import React from 'react'
import { Label } from '../ui/label'
import usePlaneElementsStore from '../../features/store/planeElementsStore.jsx';

const DropdownFileInput = ({ registerId, register, defaultValue, onChangeHandler = () => null, formatLabel = false, type }) => {

    const userFileData = usePlaneElementsStore((state) => (state.userDataFiles));
    const optionsArray = userFileData?.map((data) => {
        return { fileName: data.fileName , fileId: data.fileId }
    })

    return (
        <div className='flex flex-col gap-y-3 justify-around'>
            <Label htmlFor={registerId}>Select File: </Label>
            <select id={registerId} name={registerId} defaultValue={defaultValue} className='bg-secondary h-8 p-1 rounded-md' {...register(registerId, { onChange: (e) => { onChangeHandler(e.target.value) } })}>
                {
                    optionsArray &&
                    optionsArray.map((option, index) => (<option key={index} value={option.fileId}>{!formatLabel ? option.fileName : option.fileName.charAt(0).toUpperCase() + option.fileName.slice(1)}</option>))
                }
            </select>
        </div>

    )
}

export default DropdownFileInput