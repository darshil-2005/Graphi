import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import usePlaneElementsStore from '../../../features/store/planeElementsStore';
import { Button } from '@/components/ui/shadcnComponent/button';
import { retrieveGraphObjectIndex } from '@/utils/manualUtils';
import DropdownInput from '../../formElements/dropdownInput';
import NumberInput from '../../formElements/numberInput';
import { Separator } from '@/components/ui/shadcnComponent/separator';
import FormWrapper from '@/components/ui/formWrapper';

const AddPolarRadiusAxis = ({ graphId, editGraphObject }) => {
    const { register, handleSubmit } = useForm();
    const [graphObjIndex, setGraphObjIndex] = useState();
    const graphObjects = usePlaneElementsStore((state) => (state.planeElements));
    const addGraphObjGraphElementsArray = usePlaneElementsStore((state) => state.addGraphObjGraphElementsArray);
    const handleGraphElementsArrayEditing = usePlaneElementsStore((state) => state.handleGraphElementsArrayEditing);
    const userDataFiles = usePlaneElementsStore((state) => state.userDataFiles);

    useEffect(() => {
        setGraphObjIndex(retrieveGraphObjectIndex(graphId, graphObjects));
    }, [graphObjects, graphId, graphObjIndex, userDataFiles]);

    function handleLineFormSubmit(data) {
        const polarAngleAxisTemp = {
            elementId: editGraphObject ? editGraphObject.elementId : crypto.randomUUID(),
            graphId: editGraphObject ? editGraphObject.graphId : graphId,
            planeId: editGraphObject ? undefined : graphObjects[graphObjIndex].planeId,
            type: 'polarRadiusAxis',
            angle: Number(data.angle),
            domainStart: Number(data.domainStart),
            domainEnd: Number(data.domainEnd),
        }

        if (editGraphObject) {
            handleGraphElementsArrayEditing(polarAngleAxisTemp);
        } else {
            const returnObj = { index: graphObjIndex, newGraphElement: polarAngleAxisTemp };
            addGraphObjGraphElementsArray(returnObj);
        }
    }

    return (
        <form onSubmit={handleSubmit(handleLineFormSubmit)} className='flex flex-col gap-y-6'>

<FormWrapper>
<Separator/>

                <NumberInput
                    register={register}
                    registerId="angle"
                    label="Angle"
                    min="0"
                    step="1"
                    defaultValue={editGraphObject?.angle || 30}
                    suffix={'°'}
                />

                <div className='grid grid-cols-2 gap-x-6'>
                    <NumberInput
                        register={register}
                        registerId="domainStart"
                        label="DomainStart"
                        min="0"
                        step="1"
                        defaultValue={editGraphObject?.domainStart || 0}
                    />

                    <NumberInput
                        register={register}
                        registerId="domainEnd"
                        label="DomainEnd"
                        min="0"
                        step="1"
                        defaultValue={editGraphObject?.domainEnd || 0}
                    />
                </div>

                <Button type='submit'>Add Polar Radius Axis!!</Button>
            </FormWrapper>
        </form>
    )
}

export default AddPolarRadiusAxis
