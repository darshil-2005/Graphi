import React from 'react'
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import usePlaneElementsStore from '../../../features/store/planeElementsStore';
import { Button } from '../../ui/button';
import { retrieveGraphObjectIndex } from '../../../utils/manualUtils.jsx';
import DropdownInput from '../../formElements/dropdownInput';
import { getAllColumnsOfSpecificDataType, generateId } from '../../../utils/manualUtils.jsx';

const AddPolarAngleAxis = ({ graphId, editGraphObject }) => {
    const { register, handleSubmit } = useForm();
    const [graphObjIndex, setGraphObjIndex] = useState();
    const graphObjects = usePlaneElementsStore((state) => (state.planeElements));
    const addGraphObjGraphElementsArray = usePlaneElementsStore((state) => state.addGraphObjGraphElementsArray);
    const handleGraphElementsArrayEditing = usePlaneElementsStore((state) => state.handleGraphElementsArrayEditing);

    useEffect(() => {
        setGraphObjIndex(retrieveGraphObjectIndex(graphId, graphObjects));
    });

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
            <div className='grid w-fit gap-y-5'>
                {graphObjects[graphObjIndex]?.data &&
                    <DropdownInput
                        register={register}
                        registerId="dataKey"
                        label="Data Key"
                        optionsArray={graphObjects[graphObjIndex]?.data?.columns}
                    />
                }

                <Button type='submit'>Add Polar Angle Axis!!</Button>
            </div>
        </form>
    )
}

export default AddPolarAngleAxis
