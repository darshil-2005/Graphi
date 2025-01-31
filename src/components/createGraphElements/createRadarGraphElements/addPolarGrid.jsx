import React from 'react'
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import usePlaneElementsStore from '../../../features/store/planeElementsStore';
import { Button } from '../../ui/button';
import { retrieveGraphObjectIndex } from '../../../utils/manualUtils.jsx';
import { isTheElementInGraphElementsArray, retrieveGraphObjectIndexAndElementIndex } from '../../../utils/manualUtils.jsx';
import { generateId } from '../../../utils/manualUtils.jsx';

const AddPolarGrid = ({ graphId, editGraphObject }) => {

    const { register, handleSubmit } = useForm();
    const [graphObjIndex, setGraphObjIndex] = useState();
    const [elementIndex, setElementIndex] = useState();
    const graphObjects = usePlaneElementsStore((state) => (state.planeElements));
    const addGraphObjGraphElementsArray = usePlaneElementsStore((state) => state.addGraphObjGraphElementsArray);
    const handleGraphElementsArrayEditing = usePlaneElementsStore((state) => state.handleGraphElementsArrayEditing);

    useEffect(() => {
           setGraphObjIndex(retrieveGraphObjectIndex(graphId, graphObjects));
       },[graphId, editGraphObject, graphObjects]);

    function handleLineFormSubmit(data) {

        if (editGraphObject) {

            const polarGridTemp = {
                elementId: editGraphObject.elementId,
                graphId: editGraphObject.graphId,
                planeId: editGraphObject.planeId,
                type: 'polarGrid',
            }

            handleGraphElementsArrayEditing(polarGridTemp);

        } else {

            if (!(isTheElementInGraphElementsArray(graphObjects[graphObjIndex].graphElementsArray, 'radar'))) {
                alert('Please add a radar first!');
                return;
            }

            const polarGridTemp = {
                planeId: graphObjects[graphObjIndex].planeId,
                graphId: graphId,
                elementId: crypto.randomUUID(),
                type: 'polarGrid',
            }

            const returnObj = { index: graphObjIndex, newGraphElement: polarGridTemp };
            addGraphObjGraphElementsArray(returnObj);
        }
    }

    return (
        <form onSubmit={handleSubmit(handleLineFormSubmit)}>
            <div className='w-fit grid gap-y-4'>
                <Button type='submit'>Add Polar Grid!!</Button>
            </div>
        </form>
    )
}

export default AddPolarGrid
