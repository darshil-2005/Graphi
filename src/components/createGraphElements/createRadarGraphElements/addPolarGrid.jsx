import React from 'react'
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import usePlaneElementsStore from '../../../features/store/planeElementsStore';
import { Button } from '@/components/ui/shadcnComponent/button';
import { retrieveGraphObjectIndex } from '@/utils/manualUtils';
import { isTheElementInGraphElementsArray } from '@/utils/manualUtils';
import { toast } from "sonner";
import { Separator } from '@/components/ui/shadcnComponent/separator';
import FormWrapper from '@/components/ui/formWrapper';

const AddPolarGrid = ({ graphId, editGraphObject }) => {

    const { register, handleSubmit } = useForm();
    const [graphObjIndex, setGraphObjIndex] = useState();
    const [elementIndex, setElementIndex] = useState();
    const graphObjects = usePlaneElementsStore((state) => (state.planeElements));
    const addGraphObjGraphElementsArray = usePlaneElementsStore((state) => state.addGraphObjGraphElementsArray);
    const handleGraphElementsArrayEditing = usePlaneElementsStore((state) => state.handleGraphElementsArrayEditing);
    const graphElements = usePlaneElementsStore((state) => state.graphElements)

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

            const res = isTheElementInGraphElementsArray(graphElements, graphId, 'radar');

            if (!(res)) {
                toast.warning('Please add a radar first!');
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
            <FormWrapper>
            <Separator/>
                <Button type='submit'>Add Polar Grid!!</Button>
            </FormWrapper>
        </form>
    )
}

export default AddPolarGrid
