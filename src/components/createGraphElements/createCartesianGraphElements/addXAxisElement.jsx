//!  FIX THIS 



import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import usePlaneElementsStore from '../../../features/store/planeElementsStore';
import { Button } from '@/components/ui/shadcnComponent/button.jsx';
import { retrieveGraphObjectIndex } from '@/utils/manualUtils';
import DropdownInput from '../../formElements/dropdownInput.jsx';
import NumberInput from '../../formElements/numberInput.jsx';
import TextInput from 'src/components/formElements/textInput.jsx';
import { CheckBox } from '../../formElements/checkBox.jsx';
import { retrieveFileIndex } from '@/utils/manualUtils'
import { Separator } from '@/components/ui/shadcnComponent/separator';
import FormWrapper from '@/components/ui/formWrapper';


function AddXAxisElement({ graphId, editGraphObject }) {

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

            const xAxisTemp = {
                elementId: editGraphObject.elementId,
                graphId: editGraphObject.graphId,
                type: 'xAxis',
                dataKey: data.dataKey,
                domainStart: Number(data.domainStart),
                domainEnd: Number(data.domainEnd),
                paddingLeft: Number(data.paddingLeft),
                paddingRight: Number(data.paddingRight),
                orientation: data.orientation,
                tickAngle: Number(data.tickAngle),
                allowDuplicateCategories: data.allowDuplicateCategories,
                showAxisLine: data.showAxisLine,
                scale: data.scale,
                unit: data.unit,
                labelText: data.labelText,
                labelAngle: data.labelAngle,
                labelPosition: data.labelPosition,
                labelOffset: Number(data.labelOffset),
            }

            handleGraphElementsArrayEditing(xAxisTemp);

        } else {

            const xAxisTemp = {
                planeId: graphObjects[graphObjIndex].planeId,
                graphId: graphId,
                elementId: crypto.randomUUID(),
                type: 'xAxis',
                dataKey: data.dataKey,
                domainStart: Number(data.domainStart),
                domainEnd: Number(data.domainEnd),
                paddingLeft: Number(data.paddingLeft),
                paddingRight: Number(data.paddingRight),
                orientation: data.orientation,
                tickAngle: Number(data.tickAngle),
                allowDuplicateCategories: data.allowDuplicateCategories,
                showAxisLine: data.showAxisLine,
                scale: data.scale,
                unit: data.unit,
                labelText: data.labelText,
                labelAngle: data.labelAngle,
                labelPosition: data.labelPosition,
                labelOffset: Number(data.labelOffset),
            }

            const returnObj = { index: graphObjIndex, newGraphElement: xAxisTemp };
            addGraphObjGraphElementsArray(returnObj);
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit(handleLineFormSubmit)}>

            <FormWrapper>
            <Separator/>

                    <div className='grid grid-cols-2'>
                        <NumberInput registerId='domainStart'
                            label='Domain Start'
                            defaultValue={editGraphObject ? editGraphObject.domainStart : 0}
                            register={register}
                            className='w-[8rem]' />

                        <NumberInput registerId='domainEnd'
                            label='Domain End'
                            defaultValue={editGraphObject ? editGraphObject.domainEnd : 0}
                            register={register}
                            className='w-[8rem]' />
                    </div>

                    <div className='grid grid-cols-2'>
                        <NumberInput registerId='paddingLeft'
                            label='Padding Left'
                            defaultValue={editGraphObject ? editGraphObject.paddingLeft : 0}
                            register={register}
                            className='w-[8rem]' />

                        <NumberInput registerId='paddingRight'
                            label='Padding Right'
                            defaultValue={editGraphObject ? editGraphObject.paddingRight : 0}
                            register={register}
                            className='w-[8rem]' />
                    </div>

                    <div className='grid grid-cols-2'>
                        <TextInput registerId='unit' label='Unit' placeHolder={'px'} defaultValue={editGraphObject ? editGraphObject.unit : ''} register={register} />
                        <NumberInput registerId='tickAngle'
                            label='Tick Angle'
                            defaultValue={editGraphObject ? editGraphObject.tickAngle : 0}
                            register={register}
                            className='w-[8rem]' suffix={'°'} />
                    </div>

                    <DropdownInput registerId="dataKey" label="Axis Datakey" register={register} optionsArray={keys} />
                    <DropdownInput registerId='orientation' label="Orinentation" register={register} optionsArray={['bottom', 'top']} defaultValue={editGraphObject ? editGraphObject.orientation : 'bottom'} formatLabel={true} />

                    <DropdownInput registerId="scale" label="Scale" register={register} optionsArray={[
                        'auto',
                        'linear',
                        'pow',
                        'sqrt',
                        'log',
                        'identity',
                        'time',
                        'band',
                        'point',
                        'ordinal',
                        'quantile',
                        'quantize',
                        'utc',
                        'sequential',
                        'threshold'
                    ]} formatLabel={true} />



                    <div className='grid gap-y-5 mt-2'>
                        <div className='font-semibold text-xl tracking-wider'>Label</div>
                        <TextInput registerId='labelValue' label='Label Text' placeHolder={'Label'} defaultValue={editGraphObject ? editGraphObject.labelValue : ''} register={register} />
                        <DropdownInput registerId="labelposition" label="Label Position" register={register} optionsArray={[
                            "top",
                            "left",
                            "right",
                            "bottom",
                            "inside",
                            "outside",
                            "insideLeft",
                            "insideRight",
                            "insideTop",
                            "insideBottom",
                            "insideTopLeft",
                            "insideBottomLeft",
                            "insideTopRight",
                            "insideBottomRight",
                            "insideStart",
                            "insideEnd",
                            "end",
                            "center"
                        ]} formatLabel={true} />

                        <div className='grid grid-cols-2'>
                            <NumberInput registerId='labelAngle'
                                label='Label Angle'
                                defaultValue={editGraphObject ? editGraphObject.labelAngle : 0}
                                register={register}
                                className='w-[8rem]' suffix={'°'} />

                            <NumberInput registerId='labelOffset'
                                label='Label Offset'
                                defaultValue={editGraphObject ? editGraphObject.labelOffset : 0}
                                register={register}
                                className='w-[8rem]' />
                        </div>
                    </div>

                    <CheckBox label={'Show Axis Line'} defaultChecked={editGraphObject ? editGraphObject.showAxisLine : true} registerId={'showAxisLine'} register={register} />
                    <CheckBox label={'Allow Duplicate Categories'} defaultChecked={editGraphObject ? editGraphObject.allowDuplicateCategories : true} registerId={'allowDuplicateCategories'} register={register} />
                    <Button type='submit'>{editGraphObject ? 'Edit X Axis' : 'Add X Axis'}</Button>

                </FormWrapper>
            </form>
        </>
    )
}

export default AddXAxisElement


