import React from 'react'
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import usePlaneElementsStore from '../../../features/store/planeElementsStore';
import { Button } from '@/components/ui/shadcnComponent/button';
import { retrieveGraphObjectIndex } from '@/utils/manualUtils';
import DropdownInput from '../../formElements/dropdownInput';
import { retrieveFileIndex } from '@/utils/manualUtils'

const AddPolarAngleAxis = ({ graphId, editGraphObject }) => {
    const { register, handleSubmit } = useForm();
    const [graphObjIndex, setGraphObjIndex] = useState();
    const [fileIndex, setFileIndex] = useState();
    const graphObjects = usePlaneElementsStore((state) => (state.planeElements));
    const addGraphObjGraphElementsArray = usePlaneElementsStore((state) => state.addGraphObjGraphElementsArray);
    const handleGraphElementsArrayEditing = usePlaneElementsStore((state) => state.handleGraphElementsArrayEditing);
    const userDataFiles = usePlaneElementsStore((state) => state.userDataFiles);
    const keys = userDataFiles[fileIndex]?.fileKeys?.fileKeys;
    useEffect(() => {
        setGraphObjIndex(retrieveGraphObjectIndex(graphId, graphObjects));
        setFileIndex(retrieveFileIndex(userDataFiles, graphObjects[graphObjIndex]?.data))
    }, [graphObjects, graphId, graphObjIndex, userDataFiles]);

    function handleLineFormSubmit(data) {
        const polarAngleAxisTemp = {
            elementId: editGraphObject ? editGraphObject.elementId : crypto.randomUUID(),
            graphId: editGraphObject ? editGraphObject.graphId : graphId,
            planeId: editGraphObject ? editGraphObject.planeId : graphObjects[graphObjIndex].planeId,
            type: 'polarAngleAxis',
            dataKey: data.dataKey,
        };

        if (editGraphObject) {
            handleGraphElementsArrayEditing(polarAngleAxisTemp);
        } else {
            const returnObj = { index: graphObjIndex, newGraphElement: polarAngleAxisTemp };
            addGraphObjGraphElementsArray(returnObj);
        }
    }

    return (
        <form onSubmit={handleSubmit(handleLineFormSubmit)}>
            <div className='grid w-64 gap-y-5'>
                {keys &&
                    <DropdownInput
                        register={register}
                        registerId="dataKey"
                        label="Data Key: "
                        optionsArray={keys}
                    />
                }

                <Button type='submit'>Add Polar Angle Axis!!</Button>
            </div>
        </form>
    )
}

export default AddPolarAngleAxis
