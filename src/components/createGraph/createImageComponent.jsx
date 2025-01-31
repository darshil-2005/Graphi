import React from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import ColorInput from '../formElements/colorInput';
import NumberInput from '../formElements/numberInput';
import usePlaneElementsStore from '../../features/store/planeElementsStore.jsx';
import FileInput from '../formElements/fileInput';
import { generateId } from '../../utils/manualUtils';
import FormWrapper from '@/components/ui/formWrapper';

const CreateImageComponent = ( {planeId, editGraphObject}) => {

    const { register, handleSubmit } = useForm();
    const graphId = usePlaneElementsStore((state) => (state.nextGraphId));
    
    const addPlaneElements = usePlaneElementsStore((state) => (state.addPlaneElements));
    const handleEditing = usePlaneElementsStore((state) => (state.handleEditing));

    async function addImageInThePlaneElementsArray(data) {

      // const fileData = await data.fileUpload[0]?.text().then(fileReader);

      if (editGraphObject) {

          // let editedFileData;
          // if (!fileData) {
          //     editedFileData = editGraphObject.data;
          // } else {
          //     editedFileData = fileData;
          // }

          const temp = {
              graphId: editGraphObject.graphId,
              height: String(data.height) + 'px',
              width: String(data.width) + 'px',
              top: Number(data.top),
              left: Number(data.left),
              zIndex: Number(data.zIndex),
              borderRadius: (data.borderRadius + 'px'),
              backgroundColor: data.bgColor,
              backgroundColorOpacity: Number(data.bgColorOpacity),
              margin: { top: Number(data.marginTop), right: Number(data.marginRight), bottom: Number(data.marginBottom), left: Number(data.marginLeft) },
          }
          handleEditing(temp);

      } else {

          const temp = {
              planeId: planeId,
              graphId: Number(String(planeId) + String(generateId())),
              type: 'image',
              top: Number(data.top),
              left: Number(data.left),
              zIndex: Number(data.zIndex),
              height: String(data.height) + 'px',
              width: String(data.width) + 'px',
              borderRadius: (data.borderRadius + 'px'),
              backgroundColor: data.bgColor,
              backgroundColorOpacity: Number(data.bgColorOpacity),
              margin: { top: Number(data.marginTop), right: Number(data.marginRight), bottom: Number(data.marginBottom), left: Number(data.marginLeft) },
          }

          
          addPlaneElements({ graph: temp });

      }
  }

  return (
    <form onSubmit={handleSubmit(addImageInThePlaneElementsArray)} className='mb-4'>

    <FormWrapper className='grid gap-y-4 w-[20rem] bg-primary-foreground p-4 mt-4 rounded-lg shadow-lg mx-auto'>
        <div className='font-bold'>Create Image Component!!</div>

        <FileInput registerId={'fileUpload'} register={register} label={'Choose File'} />
        <div className='grid grid-cols-2'>
        <NumberInput registerId={'height'} label={'Height'} defaultValue={parseInt(editGraphObject?.height) || 200} register={register} suffix={'px'} />
        <NumberInput registerId={'width'} label={'Width'} defaultValue={parseInt(editGraphObject?.width) || 200} register={register} suffix={'px'} />
        </div>

        <div className='grid grid-cols-2'>
        <NumberInput registerId={'top'} label={'Top'} defaultValue={parseInt(editGraphObject?.top) || 0} min={0} register={register} />
        <NumberInput registerId={'left'} label={'Left'} defaultValue={parseInt(editGraphObject?.left) || 0} min={0} register={register} />
        </div>

        <div className='grid grid-cols-2'>
        <NumberInput registerId={'borderRadius'} label={'Border Radius'} defaultValue={parseInt(editGraphObject?.borderRadius) || 12} register={register} suffix={'px'} />
        <NumberInput registerId={'zIndex'} label={'Z Index'} defaultValue={parseInt(editGraphObject?.zIndex) || 0} min={0} register={register} />
        </div>

        <ColorInput registerId={'bgColor'} label={'Background Color'} defaultValue={editGraphObject?.backgroundColor || '#000000'} register={register} showOpacity={true} defaultOpacity={editGraphObject?.backgroundColorOpacity || 1} />

        <div className='grid gap-y-4 relative'>
            <div className='font-semibold text-lg tracking-wider'>Margin</div>
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
           <Button type="submit" className='w-full'>{editGraphObject ? "Edit Graph" : "Add Image"}</Button>
        </div>
    </FormWrapper>
</form >
  )
}

export default CreateImageComponent