import React from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import ColorInput from '../formElements/colorInput';
import FileInput from '../formElements/fileInput';
import NumberInput from '../formElements/numberInput';
import { fileReader } from '../../utils/manualUtils';
import usePlaneElementsStore from '../../features/store/planeElementsStore';
import { generateId } from '../../utils/manualUtils';
import FormWrapper from '@/components/ui/formWrapper'

function CreateCartesianGraph({ planeId, editGraphObject }) {

    const { register, handleSubmit } = useForm();
    const graphId = usePlaneElementsStore((state) => (state.nextGraphId));
    const plusOneNextGraphId = usePlaneElementsStore((state) => (state.plusOneNextGraphId));
    const addPlaneElements = usePlaneElementsStore((state) => (state.addPlaneElements));
    const handleEditing = usePlaneElementsStore((state) => (state.handleEditing));

    async function addCartesianGraphInThePlaneElementsArray(data) {

        console.log(data);

        const fileData = await data[`fileUpload${planeId}`][0]?.text().then(fileReader);
        console.log(fileData);

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
                top: Number(data.top),
                left: Number(data.left),
                zIndex: Number(data.zIndex),
                borderRadius: (data.borderRadius + 'px'),
                backgroundColor: data.bgColor,
                backgroundColorOpacity: Number(data.bgColorOpacity),
                margin: { top: Number(data.marginTop), right: Number(data.marginRight), bottom: Number(data.marginBottom), left: Number(data.marginLeft) },
                cartesianGridColor: data.cartesianGrid,
            }
            handleEditing(temp);

        } else {

            const temp = {
                planeId: planeId,
                graphId: (String(planeId) + String(generateId())),
                type: 'cartesianGraph',
                top: Number(data.top),
                left: Number(data.left),
                zIndex: Number(data.zIndex),
                graphElementsArray: [],
                data: fileData,
                height: String(data.height) + 'px',
                width: String(data.width) + 'px',
                borderRadius: (data.borderRadius + 'px'),
                backgroundColor: data.bgColor,
                backgroundColorOpacity: Number(data.bgColorOpacity),
                margin: { top: Number(data.marginTop), right: Number(data.marginRight), bottom: Number(data.marginBottom), left: Number(data.marginLeft) },
                cartesianGridColor: data.cartesianGrid,
            }

            plusOneNextGraphId();
            addPlaneElements({ graph: temp });

        }
    }

    return (
        <>
            <form onSubmit={handleSubmit(addCartesianGraphInThePlaneElementsArray)}>
                <FormWrapper>
                    <div className='font-bold '>Create Cartesian Graph!!</div>

                    <FileInput registerId={`fileUpload${planeId}`} register={register} label={'Choose File'} />
                    <div className='grid grid-cols-2'>
                        <NumberInput registerId={'height'} label={'Height'} defaultValue={parseInt(editGraphObject?.height) || 200} register={register} suffix={'px'} />
                        <NumberInput registerId={'width'} label={'Width'} defaultValue={parseInt(editGraphObject?.width) || 200} register={register} suffix={'px'} />
                    </div>
                    <div className='grid grid-cols-2'>
                        <NumberInput registerId={'top'} label={'Top'} defaultValue={parseInt(editGraphObject?.top) || 0} min={0} register={register} suffix={'px'}/>
                        <NumberInput registerId={'left'} label={'Left'} defaultValue={parseInt(editGraphObject?.left) || 0} min={0} register={register} suffix={'px'}/>
                    </div>
                    <div className='grid grid-cols-2'>
                    <NumberInput registerId={'borderRadius'} label={'Border Radius: '} defaultValue={parseInt(editGraphObject?.borderRadius) || 12} register={register} suffix={'px'} />
                    <NumberInput registerId={'zIndex'} label={'Z Index'} defaultValue={parseInt(editGraphObject?.zIndex) || 0} min={0} register={register} />
                    </div>
                    <ColorInput registerId={'bgColor'} label={'Background Color'} defaultValue={editGraphObject?.backgroundColor || '#000000'} register={register} showOpacity={true} defaultOpacity={editGraphObject?.backgroundColorOpacity || 1} />

                    <div className='grid gap-y-4 relative'>
                        <div className='font-semibold text-xl tracking-wider'>Margin</div>
                        <div className='grid grid-cols-2'>
                        <NumberInput registerId={'marginTop'} label={'Top'} defaultValue={editGraphObject?.margin.top || 30} register={register} suffix={'px'} />
                        <NumberInput registerId={'marginLeft'} label={'Left'} defaultValue={editGraphObject?.margin.left || 0} register={register} suffix={'px'} />
                        </div>
                        <div className='grid grid-cols-2'>
                        <NumberInput registerId={'marginBottom'} label={'Bottom'} defaultValue={editGraphObject?.margin.bottom || 10} register={register} suffix={'px'} />
                        <NumberInput registerId={'marginRight'} label={'Right'} defaultValue={editGraphObject?.margin.right || 50} register={register} suffix={'px'} />
                        </div>
                    </div>

                    <div className="flex items-center justify-center">
                    <Button type="submit" className='w-full'>{editGraphObject ? "Edit Graph" : "Create Cartesian Graph"}</Button>
                    </div>
                </FormWrapper>
            </form >


        </>
    )
}

export default CreateCartesianGraph;

