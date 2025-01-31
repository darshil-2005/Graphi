import React from 'react'
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import usePlaneElementsStore from '../../../features/store/planeElementsStore';
import { Button } from '../../ui/button';
import { retrieveGraphObjectIndex } from '../../../utils/manualUtils.jsx';
import { generateId } from '../../../utils/manualUtils.jsx';
import { CustomTooltip } from '@/utils/manualUtils';

function AddToolTip({ graphId, editGraphObject }) {

    const { register, handleSubmit } = useForm();
    const [graphObjIndex, setGraphObjIndex] = useState();
    const graphObjects = usePlaneElementsStore((state) => (state.planeElements));
    const addGraphObjGraphElementsArray = usePlaneElementsStore((state) => state.addGraphObjGraphElementsArray);
    const handleGraphElementsArrayEditing = usePlaneElementsStore((state) => state.handleGraphElementsArrayEditing);

    useEffect(() => {
        setGraphObjIndex(retrieveGraphObjectIndex(graphId, graphObjects));
    }, [graphId, graphObjects])

    function handleLineFormSubmit(data) {

        const cartesianTemp = {
            elementId: editGraphObject ? editGraphObject.elementId : crypto.randomUUID(),
            graphId: editGraphObject ? editGraphObject.graphId : graphId,
            planeId: editGraphObject ? undefined : graphObjects[graphObjIndex].planeId,
            type: 'toolTip',
            toolTipHandler: CustomTooltip,
            borderRadius: data.borderRadius,
            backgroundColor: data.backgroundColor,
            padding: data.padding,
            shadow: data.shadow,
            borderWidth: data.borderWidth,
            borderColor: data.borderColor,
        }

        if (editGraphObject) {
            handleGraphElementsArrayEditing(cartesianTemp);
        } else {
            const returnObj = { index: graphObjIndex, newGraphElement: cartesianTemp };
            addGraphObjGraphElementsArray(returnObj);
        }
    }

    return (
        <>
                <form onSubmit={handleSubmit(handleLineFormSubmit)}>
                    <div className='w-fit grid gap-y-5'>
                        {/* <ColorInput/> */}
                        <Button type='submit'>Add ToolTip!!</Button>
                    </div>
                </form>
        </>
    )
}

export default AddToolTip

