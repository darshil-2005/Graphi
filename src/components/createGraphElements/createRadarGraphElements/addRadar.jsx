import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import usePlaneElementsStore from '../../../features/store/planeElementsStore';
import { Button } from '@/components/ui/shadcnComponent/button';
import { retrieveGraphObjectIndex, generateId } from '@/utils/manualUtils';
import DropdownInput from '../../formElements/dropdownInput';
import ColorInput from '../../../components/formElements/colorInput';
import NumberInput from '../../../components/formElements/numberInput';
import TextInput from '../../formElements/textInput';
import { retrieveFileIndex } from '@/utils/manualUtils'

const AddRadar = ({ graphId, editGraphObject }) => {
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

        let radarTemp = {
            elementId: editGraphObject ? editGraphObject.elementId : crypto.randomUUID(),
            graphId: editGraphObject ? editGraphObject.graphId : graphId,
            planeId: editGraphObject ? undefined : graphObjects[graphObjIndex].planeId,
            type: 'radar',
            name: data.name,
            dataKey: data.dataKey,
            stroke: data.stroke,
            fill: data.fill,
            fillOpacity: data.fillOpacity,
        }

        if (editGraphObject) {
            radarTemp.elementId = editGraphObject.elementId;
            handleGraphElementsArrayEditing(radarTemp);
        } else {
            const returnObj = { index: graphObjIndex, newGraphElement: radarTemp };
            addGraphObjGraphElementsArray(returnObj);
        }

    }
    return (
        <form onSubmit={handleSubmit(handleLineFormSubmit)}>
            <div className='w-fit grid gap-y-5'>

                <TextInput registerId='name' label='Name' register={register} defaultValue={editGraphObject?.name} />

                {keys &&
                    <DropdownInput
                        register={register}
                        registerId="dataKey"
                        label="Data Key"
                        optionsArray={keys}
                        defaultValue={editGraphObject?.dataKey}
                    />
                }

                <ColorInput registerId='stroke'
                    label='Stroke'
                    register={register}
                    className='w-[8rem]'
                    defaultValue={editGraphObject?.stroke || '#0000ff'} />

                <ColorInput registerId='fill'
                    label='Fill'
                    register={register}
                    className='w-[8rem]'
                    defaultValue={editGraphObject?.fill || '#00ff00'} />
                    
                <NumberInput registerId='fillOpacity' label='Fill Opacity' register={register} suffix='%' step='0.1' min='0' max='1' defaultValue={editGraphObject?.fillOpacity || 0.4} />

                <Button type='submit'>Add Polar Angle Axis!!</Button>
            </div>
        </form>
    )
}

export default AddRadar
