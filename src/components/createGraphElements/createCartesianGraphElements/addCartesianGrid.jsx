import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import usePlaneElementsStore from '../../../features/store/planeElementsStore';
import { Button } from '@/components/ui/shadcnComponent/button';
import { retrieveGraphObjectIndex } from '@/utils/manualUtils';
import ColorInput from '../../formElements/colorInput';

function AddCartesianElement({ graphId, editGraphObject }) {

    const { register, handleSubmit } = useForm();
    const [graphObjIndex, setGraphObjIndex] = useState();
    const graphObjects = usePlaneElementsStore((state) => (state.planeElements));
    const addGraphObjGraphElementsArray = usePlaneElementsStore((state) => state.addGraphObjGraphElementsArray);
    const handleGraphElementsArrayEditing = usePlaneElementsStore((state) => state.handleGraphElementsArrayEditing);

    useEffect(() => {
        setGraphObjIndex(retrieveGraphObjectIndex(graphId, graphObjects));
    }, [graphId, graphObjects]);

    function handleLineFormSubmit(data) {
        const cartesianTemp = {
            elementId: editGraphObject ? editGraphObject.elementId : crypto.randomUUID(),
            graphId: editGraphObject ? editGraphObject.graphId : graphId,
            planeId: editGraphObject ? undefined : graphObjects[graphObjIndex].planeId,
            type: 'cartesianGrid',
            cartesianGridColor: data.cartesianGridColor,
            cartesianGridColorOpacity: Number(data.cartesianGridColorOpacity),
        };

        if (editGraphObject) {
            handleGraphElementsArrayEditing(cartesianTemp);
        } else {
            const returnObj = { index: graphObjIndex, newGraphElement: cartesianTemp };
            addGraphObjGraphElementsArray(returnObj);
        }
    }

    return (
        <form onSubmit={handleSubmit(handleLineFormSubmit)}>
            <div className='w-64 grid gap-y-5'>
                <ColorInput
                    registerId='cartesianGridColor'
                    label='Color'
                    defaultValue={editGraphObject?.cartesianGridColor || '#ffffff'}
                    defaultOpacity={editGraphObject ? editGraphObject.cartesianGridColorOpacity : 1}
                    register={register}
                    showOpacity

                />
                <Button type='submit'>Add Cartesian Grid!!</Button>
            </div>
        </form>
    )
}

export default AddCartesianElement

