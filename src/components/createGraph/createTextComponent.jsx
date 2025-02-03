import React from 'react';
import { useForm } from 'react-hook-form';
import { Label } from '../ui/label.jsx';
import { Button } from '../ui/button.jsx';
import { Input } from '../ui/input.jsx';
import ColorInput from '../formElements/colorInput.jsx';
import NumberInput from '../formElements/numberInput.jsx';
import DropdownInput from '../formElements/dropdownInput.jsx';
import { generateId } from '../../utils/manualUtils.jsx';
import usePlaneElementsStore from '../../features/store/planeElementsStore.jsx';
import { Textarea } from '../ui/textarea.jsx';
import FormWrapper from '@/components/ui/formWrapper';

function CreateTextComponent({ planeId, editGraphObject }) {

  const { register, handleSubmit } = useForm();
  const graphId = usePlaneElementsStore((state) => (state.nextGraphId));
  
  const addPlaneElements = usePlaneElementsStore((state) => (state.addPlaneElements));
  const handleEditing = usePlaneElementsStore((state) => (state.handleEditing))


  function handleTextFormSubmit(data) {

    console.log("Text component dta: ", data)

    if (editGraphObject) {

      const textTemp = {
        elementId: editGraphObject.elementId,
        graphId: editGraphObject.graphId,
        text: data.text,
        zIndex: data.zIndex,
        fontSize: data.fontSize,
        fontFamily: data.fontFamily,
        fontWeight: data.fontWeight,
        fontStyle: data.fontStyle,
        color: data.color,
        colorOpacity: data.colorOpacity,
        backgroundColor: data.backgroundColor,
        backgroundColorOpacity: data.backgroundColorOpacity,
        textDecoration: data.textDecoration,
        textTransform: data.textTransform,
        letterSpacing: data.letterSpacing,
        top: Number(data.top),
        left: Number(data.left),
        padding: data.padding,
        width: data.width,
        height: data.height,
        whiteSpace: data.whiteSpace,
        wordWrap: data.wordWrap,
        textOverflow: data.textOverflow,
      };
      handleEditing(textTemp);

    } else {

      const textTemp = {
        planeId: planeId,
        graphId: String(String(planeId) + String(crypto.randomUUID())),
        type: 'textElement',
        text: data.text,
        zIndex: data.zIndex,
        fontSize: data.fontSize,
        fontFamily: data.fontFamily,
        fontWeight: data.fontWeight,
        fontStyle: data.fontStyle,
        color: data.color,
        colorOpacity: data.colorOpacity,
        backgroundColor: data.backgroundColor,
        backgroundColorOpacity: data.backgroundColorOpacity,
        textDecoration: data.textDecoration,
        textTransform: data.textTransform,
        letterSpacing: data.letterSpacing,
        width: `${data.width}px`,
        height: `${data.height}px`,
        padding: `${data.padding}px`,
        top: Number(data.top),
        left: Number(data.left),
        whiteSpace: data.whiteSpace,
        wordWrap: data.wordWrap,
        textOverflow: data.textOverflow,
      };

      
      addPlaneElements({ graph: textTemp });

    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(handleTextFormSubmit)}>

        <FormWrapper className='grid gap-y-4 w-[20rem] bg-primary-foreground p-4 mt-4 rounded-lg shadow-lg mx-auto'>
          <div className='font-bold'>Create Text Component!!</div>
          <div className='flex flex-col gap-y-2'>
            <Textarea
              id="text"
              {...register('text', { required: true })}
              className="bg-secondary text-foreground p-2 rounded-lg overflow-hidden"
              defaultValue={editGraphObject?.text || ''}
              placeholder="Enter text here"
            />
          </div>

          <div className='grid grid-cols-2'>
            <NumberInput
              registerId='height'
              label='Height'
              register={register}
              step={1}
              defaultValue={parseInt(editGraphObject?.height) || 100}
            />
            <NumberInput
              registerId='width'
              label='Width'
              register={register}
              step={1}
              defaultValue={parseInt(editGraphObject?.width) || 100}
            />
          </div>

          <div className='grid grid-cols-2'>
            <NumberInput
              registerId='top'
              label='Top'
              register={register}
              step={1}
              defaultValue={editGraphObject?.top || 0}
            />

            <NumberInput
              registerId='left'
              label='Left'
              register={register}
              step={1}
              defaultValue={editGraphObject?.left || 0}
            />
          </div>

          <div className='grid grid-cols-2'>
            <NumberInput
              registerId='fontSize'
              label='Font Size'
              register={register}
              min={1}
              step={1}
              className='w-[8rem]'
              defaultValue={editGraphObject?.fontSize || 12}
            />
            <NumberInput
              registerId='zIndex'
              label='Z-Index'
              register={register}
              defaultValue={editGraphObject?.zIndex || 0}
            />
          </div>

          <div className='grid grid-cols-2'>
            <NumberInput
              registerId='letterSpacing'
              label='Letter Spacing'
              register={register}
              step={0.1}
              defaultValue={editGraphObject?.letterSpacing || 0}
            />

            <NumberInput
              registerId='padding'
              label='Padding'
              register={register}
              defaultValue={parseInt(editGraphObject?.padding) || 8}
            />
          </div>

          <ColorInput
            registerId='color'
            label='Text Color'
            register={register}
            defaultValue={editGraphObject?.color || '#00ffff'}
            showOpacity={true}
            defaultOpacity={editGraphObject?.colorOpacity || 1}
          />

          <ColorInput
            registerId='backgroundColor'
            label='Background Color'
            register={register}
            defaultValue={editGraphObject?.backgroundColor || '#000000'}
            showOpacity={true}
            defaultOpacity={editGraphObject?.backgroundColorOpacity || 1}
          />


          <DropdownInput
            registerId="fontFamily"
            register={register}
            label={'Font Family'}
            defaultValue={editGraphObject?.fontFamily || 'sans-serif'}
            optionsArray={[
              'sans-serif',
              'serif',
              'monospace',
              'Arial',
              'Verdana',
              'Times New Roman',
              'Courier New'
            ]}
            formatLabel={true}
          />

          <DropdownInput
            registerId="fontWeight"
            register={register}
            label={'Font Weight'}
            defaultValue={editGraphObject?.fontWeight || 'normal'}
            optionsArray={[
              'normal',
              'bold',
              'lighter',
              'bolder',
              '100',
              '200',
              '300',
              '400',
              '500',
              '600',
              '700',
              '800',
              '900'
            ]}
            formatLabel={true}
          />

          <DropdownInput
            registerId="fontStyle"
            register={register}
            label={'Font Style'}
            defaultValue={editGraphObject?.fontStyle || 'normal'}
            optionsArray={[
              'normal',
              'italic',
              'oblique'
            ]}
            formatLabel={true}
          />

          <DropdownInput
            registerId="textDecoration"
            register={register}
            label={'Text Decoration'}
            defaultValue={editGraphObject?.textDecoration || 'none'}
            optionsArray={[
              'none',
              'underline',
              'line-through',
              'overline'
            ]}
            formatLabel={true}
          />

          <DropdownInput
            registerId="textTransform"
            register={register}
            label={'Text Transform'}
            defaultValue={editGraphObject?.textTransform || 'none'}
            optionsArray={[
              'none',
              'uppercase',
              'lowercase',
              'capitalize'
            ]}
            formatLabel={true}
          />

          <DropdownInput
            registerId="whiteSpace"
            register={register}
            label={'White Space'}
            defaultValue={editGraphObject?.whiteSpace || 'normal'}
            optionsArray={[
              'normal',
              'nowrap',
              'pre',
              'pre-wrap',
              'pre-line'
            ]}
            formatLabel={true}
          />

          <DropdownInput
            registerId="wordWrap"
            register={register}
            label={'Word Wrap'}
            defaultValue={editGraphObject?.wordWrap || 'normal'}
            optionsArray={[
              'normal',
              'break-word'
            ]}
            formatLabel={true}
          />

          <DropdownInput
            registerId="textOverflow"
            register={register}
            label={'Text Overflow'}
            defaultValue={editGraphObject?.textOverflow || 'clip'}
            optionsArray={[
              'clip',
              'ellipsis'
            ]}
            formatLabel={true}
          />

          <Button type="submit" className='w-full'>{editGraphObject ? "Edit Graph" : "Add Text"}</Button>
        </FormWrapper>
      </form >
    </>
  );
}

export default CreateTextComponent;