import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/shadcnComponent/button';
import { useState, useEffect } from 'react';
import ColorInput from '../../formElements/colorInput';
import DropdownInput from '../../formElements/dropdownInput';
import { retrieveGraphObjectIndex } from '@/utils/manualUtils';
import usePlaneElementsStore from '../../../features/store/planeElementsStore';
import { retrieveFileIndex } from '@/utils/manualUtils'

function AddBarElement({ graphId, editGraphObject }) {

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

        const barTemp = editGraphObject ? {
            elementId: editGraphObject.elementId,
            graphId: editGraphObject.graphId,
            fill: data.fill,
            dataKey: data.dataKey,
        } : {
            planeId: graphObjects[graphObjIndex].planeId,
            graphId: graphId,
            elementId: crypto.randomUUID(),
            type: 'bar',
            fill: data.fill,
            dataKey: data.dataKey,
        };

        if (editGraphObject) {
            handleGraphElementsArrayEditing(barTemp);
        } else {
            const returnObj = { index: graphObjIndex, newGraphElement: barTemp };
            addGraphObjGraphElementsArray(returnObj);
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit(handleLineFormSubmit)}>
                <div className='w-fit grid gap-y-5'>
                    <ColorInput
                        label='Fill Color: '
                        registerId='fill'
                        register={register}
                        className='w-[8rem]'
                        defaultValue={editGraphObject?.fill || '#0000ff'}
                    />
                    {keys &&
                        <DropdownInput registerId='dataKey' defaultValue={editGraphObject?.dataKey} register={register} optionsArray={keys} label='Choose the Y-Axis Data:' formatLabel={true} />
                    }
                    <Button type='submit'>{editGraphObject ? 'Edit Bar' : 'Add Bars!!'}</Button>
                </div>
            </form>
        </>
    )
}

export default AddBarElement;

