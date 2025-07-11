import React from 'react';
import { useForm } from 'react-hook-form';
import usePlaneElementsStore from '../../../features/store/planeElementsStore';
import { Button } from '@/components/ui/shadcnComponent/button';
import { useState, useEffect } from 'react';
import ColorInput from '../../formElements/colorInput';
import DropdownInput from '../../formElements/dropdownInput';
import NumberInput from '@/components/formElements/numberInput';
import { CheckBox } from 'src/components/formElements/checkBox.jsx';
import { retrieveGraphObjectIndex } from '@/utils/manualUtils';
import { retrieveFileIndex } from '@/utils/manualUtils';
import { retrieveDataFromIndexedDBWithFileId } from '@/utils/manualUtils'
import FormWrapper from '@/components/ui/formWrapper';
import { Separator } from '@/components/ui/shadcnComponent/separator';


function AddRadialBarChart({ graphId, editGraphObject }) {


  const { register, handleSubmit } = useForm();
  const [graphObjIndex, setGraphObjIndex] = useState();
  const [fileIndex, setFileIndex] = useState();
  const [fileData, setFileData] = useState();
  const graphObjects = usePlaneElementsStore((state) => (state.planeElements));
  const addGraphObjGraphElementsArray = usePlaneElementsStore((state) => state.addGraphObjGraphElementsArray);
  const handleGraphElementsArrayEditing = usePlaneElementsStore((state) => state.handleGraphElementsArrayEditing);
  const userDataFiles = usePlaneElementsStore((state) => state.userDataFiles);
  const keys = userDataFiles[fileIndex]?.fileKeys?.fileKeys;
  useEffect(() => {
      setGraphObjIndex(retrieveGraphObjectIndex(graphId, graphObjects));
      setFileIndex(retrieveFileIndex(userDataFiles, graphObjects[graphObjIndex]?.data));

      async function dataSetter() {
        if (graphObjects && (typeof graphObjIndex == 'number')) {
            const fetchedData = await retrieveDataFromIndexedDBWithFileId(graphObjects[graphObjIndex]?.data);
            if (fetchedData)
                setFileData(fetchedData.userData);
        }
    }

    dataSetter()
  }, [graphObjects, graphId, graphObjIndex, userDataFiles]);


  function handleLineFormSubmit(data) {

    const radialBarGraphTemp = {
      elementId: editGraphObject ? editGraphObject.elementId : crypto.randomUUID(),
      graphId: editGraphObject ? editGraphObject.graphId : graphId,
      planeId: editGraphObject ? editGraphObject?.planeId : graphObjects[graphObjIndex].planeId,
      type: 'radialBarGraph',
      data: fileData,
      dataKey: data.dataKey,
      background: data.background,
      labelFill: data.labelFill,
      labelPosition: data.labelPosition,
      cornerRadius: data.cornerRadius,
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
      <form onSubmit={handleSubmit(handleLineFormSubmit)} >
        <FormWrapper>
          <Separator/>

          {keys &&
            <DropdownInput registerId='dataKey' label='Data Key:' defaultValue={editGraphObject?.dataKey} optionsArray={keys} register={register} />
          }

          <NumberInput register={register} registerId='cornerRadius' label={'Corner Radius'} defaultValue={parseInt(editGraphObject?.cornerRadius) || 0}/>

          <CheckBox registerId='background' register={register} label='Background' defaultChecked={editGraphObject?.background || false} />
          <ColorInput registerId='labelFill' register={register} label={'Label Fill'} className='w-[8rem]' defaultValue={editGraphObject?.labelFill} />
          <DropdownInput registerId='labelPosition' label='Label Position' defaultValue={editGraphObject?.labelPosition} optionsArray={['top', 'insideTopLeft', 'insideTop', 'insideTopRight', 'left', 'insideLeft', 'center', 'insideRight', 'right', 'insideBottomLeft', 'insideBottom', 'insideBottomRight', 'bottom']} register={register} formatLabel={true} />
          <Button type='submit'>Add Radial Bar Graph!!</Button>
          </FormWrapper>

      </form>
    </>
  );
}

export default AddRadialBarChart;


