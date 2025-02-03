import React from 'react';
import { useForm } from 'react-hook-form';
import { Label } from '../../ui/label';
import { Button } from '../../ui/button';
import { useState, useEffect, useId } from 'react';
import ColorInput from '../../formElements/colorInput';
import NumberInput from '../../formElements/numberInput';
import DropdownInput from '../../formElements/dropdownInput';
import { retrieveGraphObjectIndex, generateId } from '../../../utils/manualUtils.jsx';
import usePlaneElementsStore from '../../../features/store/planeElementsStore';
import { retrieveFileIndex } from '@/utils/manualUtils'


function AddAreaElement({ graphId, editGraphObject }) {

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
            const areaTemp = {
                elementId: editGraphObject.elementId,
                graphId: editGraphObject.graphId,
                areaType: data.areaType,
                dataKey: data.dataKey,
                areaColor: data.areaColor,
                opacity: Number(data.opacity),
                fillColor: data.fillColor,
            }
            handleGraphElementsArrayEditing(areaTemp);
        } else {
            const areaTemp = {
                planeId: graphObjects[graphObjIndex].planeId,
                graphId: graphId,
                elementId: crypto.randomUUID(),
                type: 'area',
                areaType: data.areaType,
                dataKey: data.dataKey,
                areaColor: data.areaColor,
                opacity: Number(data.opacity),
                fillColor: data.fillColor,
            }
            const returnObj = { index: graphObjIndex, newGraphElement: areaTemp };
            addGraphObjGraphElementsArray(returnObj);
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit(handleLineFormSubmit)}>
                <div className='w-fit grid gap-y-5'>

                    <DropdownInput
                        registerId="areaType"
                        register={register}
                        defaultValue={editGraphObject?.areaType}
                        label={'Area Type'}
                        optionsArray={[
                            'basis', 'basisClosed', 'basisOpen', 'bumpX', 'bumpY', 'bump',
                            'linear', 'linearClosed', 'natural', 'monotoneX', 'monotoneY',
                            'monotone', 'step', 'stepBefore', 'stepAfter'
                        ]}
                        formatLabel={true}
                    />

                    <ColorInput registerId='areaColor' label='Area Color' register={register} defaultValue={editGraphObject?.areaColor || '#00ff00'} />
                    <NumberInput registerId='opacity' label='Opacity' register={register} min='0' max='1' step='0.1' defaultValue={editGraphObject?.opacity || 0.4} />
                    <ColorInput registerId='fillColor' label='Fill Color' register={register} defaultValue={editGraphObject?.fillColor || '#ff0000'} />


                    {keys &&
                        <DropdownInput
                            registerId="dataKey"
                            register={register}
                            defaultValue={editGraphObject?.dataKey}
                            label={'Data Key: '}
                            optionsArray={keys}
                            formatLabel={true}
                        />
                    }

                    <Button type='submit'>{editGraphObject ? 'Edit Graph' : 'Add Area!!'}</Button>

                </div>
            </form>

        </>
    )
}

export default AddAreaElement

