import React from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import ColorInput from '../formElements/colorInput';
import FileInput from '../formElements/fileInput';
import NumberInput from '../formElements/numberInput';
import usePlaneElementsStore from '../../features/store/planeElementsStore.jsx';
import { fileReader } from '../../utils/manualUtils';
import { generateId } from '../../utils/manualUtils';
import FormWrapper from '@/components/ui/formWrapper';

const CreateRadarGraph = ({ planeId, editGraphObject }) => {

    const { register, handleSubmit } = useForm();
    
    const addPlaneElements = usePlaneElementsStore((state) => (state.addPlaneElements));
    const handleEditing = usePlaneElementsStore((state) => (state.handleEditing))

    async function addRadarGraphInThePlaneElementsArray(data) {

        const fileData = await data.fileUploadRadarGraph[0]?.text().then(fileReader);

        if (editGraphObject) {

            let editedFileData;
            if (!fileData) {
                editedFileData = editGraphObject.data;
            } else {
                editedFileData = fileData;
            }

            const temp = {
                graphId: editGraphObject.graphId,
                data: editedFileData,
                height: String(data.height) + 'px',
                width: String(data.width) + 'px',
                zIndex: Number(data.zIndex),
                borderRadius: (data.borderRadius + 'px'),
                backgroundColor: data.bgColor,
                backgroundColorOpacity: Number(data.bgColorOpacity),
                innerRadius: data.innerRadius,
                outerRadius: data.outerRadius,
            }
            handleEditing(temp);

        } else {

            const temp = {
                planeId: planeId,
                graphId: Number(String(planeId) + String(generateId())),
                type: 'radarGraph',
                data: fileData,
                top: Number(0),
                left: Number(0),
                height: String(data.height) + 'px',
                width: String(data.width) + 'px',
                zIndex: Number(data.zIndex),
                borderRadius: (data.borderRadius + 'px'),
                backgroundColor: data.bgColor,
                backgroundColorOpacity: Number(data.bgColorOpacity),
                zIndex: 0,
                graphElementsArray: [],
                innerRadius: data.innerRadius,
                outerRadius: data.outerRadius,
            }

            plusOneNextGraphId();
            addPlaneElements({ graph: temp });

        }

    }

    return (

        <form onSubmit={handleSubmit(addRadarGraphInThePlaneElementsArray)} className='mb-4 flex gap-y-4 flex-col'>
            <FormWrapper className='grid gap-y-4 w-[20rem] bg-primary-foreground p-4 mt-4 rounded-lg shadow-lg mx-auto'>
                <div className='font-bold grid'>Create Radar Graph!!</div>
                <FileInput registerId="fileUploadRadarGraph" label="Choose File" register={register} />
                <div className='grid grid-cols-2'>
                    <NumberInput registerId="height" label="Height" defaultValue={parseInt(editGraphObject?.height) || 200} suffix="px" register={register} />
                    <NumberInput registerId="width" label="Width" defaultValue={parseInt(editGraphObject?.width) || 200} suffix="px" register={register} />
                </div>
                <div className='grid grid-cols-2'>
                    <NumberInput registerId="zIndex" label="Z-Index: " defaultValue={parseInt(editGraphObject?.zIndex) || 0} min={0} register={register} />
                    <NumberInput registerId="borderRadius" label="Border Radius" defaultValue={parseInt(editGraphObject?.borderRadius) || 0} suffix="px" register={register} />
                </div>
                <ColorInput registerId="bgColor" label="Background Color" defaultValue={editGraphObject?.backgroundColor || "#000000"} register={register} showOpacity={true} defaultOpacity={editGraphObject?.backgroundColorOpacity || 1} />
                <div className='grid grid-cols-2'>
                <NumberInput registerId="innerRadius" label="Inner Radius" defaultValue={parseInt(editGraphObject?.innerRadius) || 0} register={register} />
                <NumberInput registerId="outerRadius" label="Outer Radius" defaultValue={parseInt(editGraphObject?.outerRadius) || 250} register={register} />
                </div>

                <div className='flex items-center justify-center'>
                    <Button type="submit" className='w-full'>{editGraphObject ? "Edit Graph" : "Create Radar Graph"}</Button>
                </div>
            </FormWrapper>
        </form >
    )
}

export default CreateRadarGraph
