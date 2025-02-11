import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/shadcnComponent/button';
import { useState, useEffect } from 'react';
import ColorInput from '../../formElements/colorInput';
import NumberInput from '../../formElements/numberInput';
import DropdownInput from '../../formElements/dropdownInput';
import { retrieveGraphObjectIndex } from '@/utils/manualUtils';
import usePlaneElementsStore from '../../../features/store/planeElementsStore';
import { retrieveFileIndex } from '@/utils/manualUtils'

function AddLineElement({ graphId, editGraphObject }) {

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

        if (editGraphObject) {
            const lineTemp = {
                elementId: editGraphObject.elementId,
                graphId: editGraphObject.graphId,
                lineType: data.interpolationType,
                lineColor: data.lineColor,
                strokeWidth: data.strokeWidth,
                dataKey: data.dataKey,
            }

            handleGraphElementsArrayEditing(lineTemp);

        } else {

            const lineTemp = {
                planeId: graphObjects[graphObjIndex].planeId,
                graphId: graphId,
                type: 'line',
                elementId: crypto.randomUUID(),
                lineType: data.interpolationType,
                lineColor: data.lineColor,
                strokeWidth: data.strokeWidth,
                dataKey: data.dataKey,
            }

            const returnObj = { index: graphObjIndex, newGraphElement: lineTemp };
            addGraphObjGraphElementsArray(returnObj);
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit(handleLineFormSubmit)}>
                <div className='w-fit grid gap-y-5'>
                    <DropdownInput
                        registerId='interpolationType'
                        optionsArray={['basis', 'basisClosed', 'basisOpen', 'bumpX', 'bumpY', 'bump', 'linear', 'linearClosed', 'natural', 'monotoneX', 'monotoneY', 'monotone', 'step', 'stepBefore', 'stepAfter']}
                        label='LineType'
                        register={register}
                        defaultValue={editGraphObject ? editGraphObject.lineType : 'linear'}
                        formatLabel={true}
                        className='w-[8rem]'
                    />
                    <ColorInput
                        registerId='lineColor'
                        label='LineColor'
                        register={register}
                        defaultValue={editGraphObject ? editGraphObject.lineColor : '#000000'}
                        className='w-[8rem]'
                    />
                    <NumberInput
                        registerId='strokeWidth'
                        label='StrokeWidth'
                        defaultValue={editGraphObject ? editGraphObject.strokeWidth : 3}
                        register={register}
                        min='0' className='w-[8rem]'
                    />
                    {keys &&
                        <DropdownInput registerId={'dataKey'} register={register} optionsArray={keys} label={'Choose the Y-Axis Data:'} formatLabel={true} defaultValue={editGraphObject?.dataKey} />
                    }

                    <Button type='submit'>{editGraphObject ? 'Edit Element' : 'Add Line!!'}</Button>

                </div>
            </form>

        </>
    )
}

export default AddLineElement

