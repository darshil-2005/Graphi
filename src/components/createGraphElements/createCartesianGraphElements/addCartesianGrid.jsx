import React from 'react'
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import usePlaneElementsStore from '../../../features/store/planeElementsStore';
import { Button } from '../../ui/button';
import { retrieveGraphObjectIndex } from '../../../utils/manualUtils.jsx';
import ColorInput from '../../formElements/colorInput';
import { Label } from '../../ui/label';
import { Input } from '../../ui/input';
import { generateId } from '../../../utils/manualUtils.jsx';

function AddCartesianElement({ graphId, editGraphObject }) {

    const { register, handleSubmit } = useForm();
    const [graphObjIndex, setGraphObjIndex] = useState();
    const graphObjects = usePlaneElementsStore((state) => (state.planeElements));
    const addGraphObjGraphElementsArray = usePlaneElementsStore((state) => state.addGraphObjGraphElementsArray);
    const handleGraphElementsArrayEditing = usePlaneElementsStore((state) => state.handleGraphElementsArrayEditing);

    useEffect(() => {
        setGraphObjIndex(retrieveGraphObjectIndex(graphId, graphObjects));
    }, [graphId, graphObjects]);

    function handleLineFormSubmit(data) {
        const cartesianTemp = {
            elementId: editGraphObject ? editGraphObject.elementId : crypto.randomUUID(),
            graphId: editGraphObject ? editGraphObject.graphId : graphId,
            planeId: editGraphObject ? undefined : graphObjects[graphObjIndex].planeId,
            type: 'cartesianGrid',
            cartesianGridColor: data.cartesianGridColor,
        };

        if (editGraphObject) {
            handleGraphElementsArrayEditing(cartesianTemp);
        } else {
            const returnObj = { index: graphObjIndex, newGraphElement: cartesianTemp };
            addGraphObjGraphElementsArray(returnObj);
        }
    }

    return (
        <form onSubmit={handleSubmit(handleLineFormSubmit)}>
            <div className='w-fit grid gap-y-5'>
                <ColorInput
                    registerId='cartesianGridColor'
                    label='Cartesian Grid Color'
                    defaultValue={editGraphObject?.cartesianGridColor || '#000000'}
                    register={register}

                />
                <Button type='submit'>Add Cartesian Grid!!</Button>
            </div>
        </form>
    )
}

export default AddCartesianElement

