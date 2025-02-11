import React from 'react';
import { useForm } from 'react-hook-form';
import usePlaneElementsStore from '../../../features/store/planeElementsStore';
import { Button } from '@/components/ui/shadcnComponent/button';
import { useState, useEffect } from 'react';
import ColorInput from '../../formElements/colorInput';
import NumberInput from '../../formElements/numberInput';
import DropdownInput from '../../formElements/dropdownInput';
import { CheckBox } from 'src/components/formElements/checkBox';
import { retrieveGraphObjectIndex } from '@/utils/manualUtils';
import { retrieveFileIndex } from '@/utils/manualUtils';
import { retrieveDataFromIndexedDBWithFileId } from '@/utils/manualUtils'

function AddSingleColoredPieChart({ graphId, editGraphObject }) {

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
                    setFileData(fetchedData);
            }
        }

        dataSetter()

    }, [graphObjects, graphId, graphObjIndex, userDataFiles]);



    async function handleLineFormSubmit(data) {

        if (editGraphObject) {
            const pieTemp = {
                elementId: editGraphObject.elementId,
                graphId: editGraphObject.graphId,
                dataKey: data.dataKey,
                nameKey: data.nameKey,
                label: data.label,
                startAngle: Number(data.startAngle),
                endAngle: Number(data.endAngle),
                xCoor: String(String(data.xCoor) + '%'),
                yCoor: String(String(data.yCoor) + '%'),
                outerRadius: Number(data.outerRadius),
                innerRadius: Number(data.innerRadius),
                paddingAngle: Number(data.paddingAngle),
                fillColor: data.fillColor,
            }
            handleGraphElementsArrayEditing(pieTemp);

        } else {
            const pieTemp = {
                planeId: graphObjects[graphObjIndex].planeId,
                graphId: graphId,
                elementId: crypto.randomUUID(),
                type: 'singleColoredPie',
                data: fileData,
                dataKey: data.dataKey,
                nameKey: data.nameKey,
                label: data.label,
                startAngle: Number(data.startAngle),
                endAngle: Number(data.endAngle),
                xCoor: String(String(data.xCoor) + '%'),
                yCoor: String(String(data.yCoor) + '%'),
                outerRadius: Number(data.outerRadius),
                innerRadius: Number(data.innerRadius),
                paddingAngle: Number(data.paddingAngle),
                fillColor: data.fillColor,
            }
            const returnObj = { index: graphObjIndex, newGraphElement: pieTemp };
            addGraphObjGraphElementsArray(returnObj);
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit(handleLineFormSubmit)}>

                <div className='grid w-fit gap-y-5'>
                    <div className='font-bold grid'>Create Pie Graph!!</div>

                    {keys &&
                        <DropdownInput
                            register={register}
                            registerId="dataKey"
                            label="Data Key"
                            defaultValue={editGraphObject?.dataKey}
                            optionsArray={keys}
                        />
                    }

                    {keys &&
                        <DropdownInput
                            register={register}
                            registerId="nameKey"
                            label="Name Key"
                            defaultValue={editGraphObject?.nameKey}
                            optionsArray={keys}
                        />}

                    <CheckBox label={'Label'} defaultChecked={editGraphObject ? editGraphObject.label : true} registerId={'label'} register={register} />

                    <div className='grid grid-cols-2 gap-x-8'>
                        <NumberInput
                            register={register}
                            registerId="xCoor"
                            label="X-Coordinate"
                            min="0"
                            step="1"
                            defaultValue={parseInt(editGraphObject?.xCoor) || 50}
                            suffix={'%'}
                        />
                        <NumberInput
                            register={register}
                            registerId="yCoor"
                            label="Y-Coordinate"
                            min="0"
                            step="1"
                            defaultValue={parseInt(editGraphObject?.yCoor) || 50}
                            suffix={'%'}
                        />
                    </div>

                    <div className='grid grid-cols-2 gap-x-8'>
                        <NumberInput
                            register={register}
                            registerId="startAngle"
                            label="Start Angle: "
                            min="0"
                            step="1"
                            defaultValue={editGraphObject?.startAngle || 0}
                            suffix={'°'}
                        />
                        <NumberInput
                            register={register}
                            registerId="endAngle"
                            label="End Angle: "
                            min="0"
                            step="1"
                            defaultValue={editGraphObject?.endAngle || 360}
                            suffix={'°'}
                        />
                    </div>

                    <div className='grid grid-cols-2 gap-x-8'>
                        <NumberInput
                            register={register}
                            registerId="innerRadius"
                            label="Inner Radius: "
                            min="0"
                            step="1"
                            defaultValue={editGraphObject?.innerRadius || 0}
                        />
                        <NumberInput
                            register={register}
                            registerId="outerRadius"
                            label="Outer Radius: "
                            min="0"
                            step="1"
                            defaultValue={editGraphObject?.outerRadius || 200}
                        />
                    </div>
                    <ColorInput
                        register={register}
                        registerId="fillColor"
                        defaultValue={editGraphObject?.fillColor || '#ff0000'}
                        label="Fill Color: "
                    />
                    <NumberInput
                        register={register}
                        registerId="paddingAngle"
                        label="Padding Angle: "
                        min="0"
                        step="1"
                        defaultValue={editGraphObject?.paddingAngle || 0}
                        suffix={'°'}
                    />
                    <Button type='submit'>{editGraphObject ? 'Edit Graph' : 'Add PieChart!!'}</Button>

                </div>
            </form>

        </>
    )
}

export default AddSingleColoredPieChart;




