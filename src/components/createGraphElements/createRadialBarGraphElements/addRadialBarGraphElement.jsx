import React from 'react';
import { useForm } from 'react-hook-form';
import usePlaneElementsStore from '../../../features/store/planeElementsStore';
import { Label } from '../../ui/label';
import { Button } from '../../ui/button';
import { useState, useEffect } from 'react';
import ColorInput from '../../formElements/colorInput';
import DropdownInput from '../../formElements/dropdownInput';
import { CheckBox } from 'src/components/formElements/checkBox.jsx';
import { retrieveGraphObjectIndex } from '../../../utils/manualUtils.jsx';
import { generateId } from '../../../utils/manualUtils.jsx';


function AddRadialBarChart({ graphId, editGraphObject }) {

  const { register, handleSubmit } = useForm();
  const [graphObjIndex, setGraphObjIndex] = useState();
  const graphObjects = usePlaneElementsStore((state) => (state.planeElements));
  const addGraphObjGraphElementsArray = usePlaneElementsStore((state) => state.addGraphObjGraphElementsArray);
  const handleGraphElementsArrayEditing = usePlaneElementsStore((state) => state.handleGraphElementsArrayEditing);

  useEffect(() => {
    setGraphObjIndex(retrieveGraphObjectIndex(graphId, graphObjects));
  });

  function handleLineFormSubmit(data) {
    const radialBarGraphTemp = {
      elementId: editGraphObject ? editGraphObject.elementId : generateId(),
      graphId: editGraphObject ? editGraphObject.graphId : graphId,
      planeId: editGraphObject ? editGraphObject?.planeId : graphObjects[graphObjIndex].planeId,
      type: 'radialBarGraph',
      data: graphObjects[graphObjIndex].data,
      dataKey: data.dataKey,
      background: data.background,
      labelFill: data.labelFill,
      labelPosition: data.labelPosition,
    };

    if (editGraphObject) {
      handleGraphElementsArrayEditing(radialBarGraphTemp);
    } else {
      const returnObj = { index: graphObjIndex, newGraphElement: radialBarGraphTemp };
      addGraphObjGraphElementsArray(returnObj);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(handleLineFormSubmit)}>
        <div className='flex flex-col gap-y-5'>
          <div className='font-bold'>Create Radial Bar Graph!!</div>
          {graphObjects[graphObjIndex]?.data &&
            <DropdownInput registerId='dataKey' label='Data Key:' defaultValue={editGraphObject?.dataKey} optionsArray={graphObjects[graphObjIndex]?.data?.columns} register={register} />
          }

          <CheckBox registerId='background' register={register} label='Background' defaultChecked={editGraphObject?.background || false} />
          <ColorInput registerId='labelFill' register={register} label={'Label Fill'} className='w-[8rem]' defaultValue={editGraphObject?.labelFill} />
          <DropdownInput registerId='labelPosition' label='Label Position' defaultValue={editGraphObject?.labelPosition} optionsArray={['top', 'insideTopLeft', 'insideTop', 'insideTopRight', 'left', 'insideLeft', 'center', 'insideRight', 'right', 'insideBottomLeft', 'insideBottom', 'insideBottomRight', 'bottom']} register={register} formatLabel={true} />
          <Button type='submit'>Add Radial Bar Graph!!</Button>
        </div>

      </form>
    </>
  );
}

export default AddRadialBarChart;


