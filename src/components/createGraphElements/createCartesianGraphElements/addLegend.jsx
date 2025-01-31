import React from 'react'
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import usePlaneElementsStore from '../../../features/store/planeElementsStore';
import { Button } from '../../ui/button';
import { retrieveGraphObjectIndex } from '../../../utils/manualUtils.jsx';
import { generateId } from '../../../utils/manualUtils.jsx';

function AddLegend({ graphId, editGraphObject }) {

    const { register, handleSubmit } = useForm();
    const [graphObjIndex, setGraphObjIndex] = useState();
    const graphObjects = usePlaneElementsStore((state) => (state.planeElements));
    const addGraphObjGraphElementsArray = usePlaneElementsStore((state) => state.addGraphObjGraphElementsArray);
    const handleGraphElementsArrayEditing = usePlaneElementsStore((state) => state.handleGraphElementsArrayEditing);

    useEffect(() => {
        setGraphObjIndex(retrieveGraphObjectIndex(graphId, graphObjects));
    }, [graphId, graphObjects])


    function handleLineFormSubmit(data) {

        const legendTemp = editGraphObject ? {
            elementId: editGraphObject.elementId,
            graphId: editGraphObject.graphId,
            planeId: editGraphObject.planeId,
        } : {
            planeId: graphObjects[graphObjIndex].planeId,
            graphId: graphId,
            type: 'legend',
            elementId: crypto.randomUUID(),
        };

        if (editGraphObject) {
            handleGraphElementsArrayEditing(legendTemp);
        } else {
            const returnObj = { index: graphObjIndex, newGraphElement: legendTemp };
            addGraphObjGraphElementsArray(returnObj);
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit(handleLineFormSubmit)}>
                <div className='w-fit grid gap-y-5'>
                    <Button type='submit'>Add Legend!!</Button>
                </div>
            </form>
        </>
    )
}

export default AddLegend

