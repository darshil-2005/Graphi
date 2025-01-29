import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../../ui/button';
import { useState, useEffect } from 'react';
import ColorInput from '../../formElements/colorInput';
import DropdownInput from '../../formElements/dropdownInput';
import { retrieveGraphObjectIndex, generateId } from '../../../utils/manualUtils.jsx';
import usePlaneElementsStore from '../../../features/store/planeElementsStore';

function AddBarElement({ graphId, editGraphObject }) {

    const { register, handleSubmit } = useForm();
    const [graphObjIndex, setGraphObjIndex] = useState();
    const graphObjects = usePlaneElementsStore((state) => (state.planeElements));
    const addGraphObjGraphElementsArray = usePlaneElementsStore((state) => state.addGraphObjGraphElementsArray);
    const handleGraphElementsArrayEditing = usePlaneElementsStore((state) => state.handleGraphElementsArrayEditing);

    useEffect(() => {
        setGraphObjIndex(retrieveGraphObjectIndex(graphId, graphObjects));
    });

    function handleLineFormSubmit(data) {

        const barTemp = editGraphObject ? {
            elementId: editGraphObject.elementId,
            graphId: editGraphObject.graphId,
            fill: data.fill,
            dataKey: data.yAxisData,
        } : {
            planeId: graphObjects[graphObjIndex].planeId,
            graphId: graphId,
            elementId: generateId(),
            type: 'bar',
            fill: data.fill,
            dataKey: data.yAxisData,
        };

        if (editGraphObject) {
            handleGraphElementsArrayEditing(barTemp);
        } else {
            const returnObj = { index: graphObjIndex, newGraphElement: barTemp };
            addGraphObjGraphElementsArray(returnObj);
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit(handleLineFormSubmit)}>
                <div className='w-fit grid gap-y-5'>
                    <ColorInput
                        label='Fill Color: '
                        registerId='fill'
                        register={register}
                        className='w-[8rem]'
                        defaultValue={editGraphObject?.fill || '#0000ff'}
                    />
                    {graphObjects[graphObjIndex]?.data &&
                        <DropdownInput registerId='yAxisData' defaultValue={editGraphObject?.dataKey} register={register} optionsArray={graphObjects[graphObjIndex]?.data?.columns} label='Choose the Y-Axis Data:' formatLabel={true} />
                    }
                    <Button type='submit'>{editGraphObject ? 'Edit Bar' : 'Add Bars!!'}</Button>
                </div>
            </form>
        </>
    )
}

export default AddBarElement;

