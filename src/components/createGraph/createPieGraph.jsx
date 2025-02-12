




import { useForm } from 'react-hook-form';
import ColorInput from '../formElements/colorInput';
import NumberInput from '../formElements/numberInput';
import { Button } from '@/components/ui/shadcnComponent/button';
import usePlaneElementsStore from '../../features/store/planeElementsStore.jsx';
import FormWrapper from '@/components/ui/formWrapper';
import DropdownFileInput from '@/components/formElements/dropdownFileInput'

const CreatePieGraph = ({ planeId, editGraphObject }) => {

    const { register, handleSubmit } = useForm();
    const graphId = usePlaneElementsStore((state) => (state.nextGraphId));
    
    const addPlaneElements = usePlaneElementsStore((state) => (state.addPlaneElements));
    const handleEditing = usePlaneElementsStore((state) => (state.handleEditing));

    async function addPieGraphInThePlaneElementsArray(data) {


        if (editGraphObject) {

            const temp = {
                graphId: editGraphObject.graphId,
                data: data[`fileUpload${planeId}`],
                height: String(data.height) + 'px',
                width: String(data.width) + 'px',
                zIndex: Number(data.zIndex),
                // top: Number(data.top),
                // left: Number(data.left),
                borderRadius: (data.borderRadius + 'px'),
                backgroundColor: data.bgColor,
                backgroundColorOpacity: Number(data.bgColorOpacity),
            }
            handleEditing(temp);

        } else {

            const temp = {
                planeId: planeId,
                graphId: (String(planeId) + String(crypto.randomUUID())),
                type: 'pieGraph',
                data: data[`fileUpload${planeId}`],
                top: Number(0),
                left: Number(0),
                height: String(data.height) + 'px',
                width: String(data.width) + 'px',
                zIndex: Number(data.zIndex),
                borderRadius: (data.borderRadius + 'px'),
                backgroundColor: data.bgColor,
                backgroundColorOpacity: Number(data.bgColorOpacity),
                graphElementsArray: [],
            }

            
            addPlaneElements({ graph: temp });

        }

    }


    return (

            <form onSubmit={handleSubmit(addPieGraphInThePlaneElementsArray)}>
                <FormWrapper className='grid gap-y-4 w-[20rem] bg-primary-foreground p-4 mt-4 rounded-lg shadow-lg mx-auto'>
                    <div className='font-bold grid'>Create Pie Graph!!</div>
                    {/* <FileInput registerId="fileUploadPie" label="Choose File" register={register} defaultValue={editGraphObject?.data} /> */}
                    <DropdownFileInput registerId={`fileUpload${planeId}`} register={register} defaultValue={editGraphObject?.data} />
                    <div className='grid grid-cols-2'>
                        <NumberInput registerId="height" label="Height" defaultValue={parseInt(editGraphObject?.height) || 200} suffix="px" register={register} />
                        <NumberInput registerId="width" label="Width" defaultValue={parseInt(editGraphObject?.width) || 200} suffix="px" register={register} />
                    </div>
                    <div className='grid grid-cols-2'>
                        <NumberInput registerId="zIndex" label="Z-Index" defaultValue={parseInt(editGraphObject?.zIndex) || 0} min={0} register={register} />
                        <NumberInput registerId="borderRadius" label="Border Radius" defaultValue={parseInt(editGraphObject?.borderRadius) || 0} suffix="px" register={register} />
                    </div>
                    <ColorInput registerId="bgColor" label="Background Color" defaultValue={editGraphObject?.backgroundColor || "#000000"} register={register} showOpacity={true} defaultOpacity={editGraphObject?.backgroundColorOpacity || 1} />

                    <div className='flex items-center justify-center'>
                        <Button type="submit" className='w-full'>{editGraphObject ? "Edit Graph" : "Create Pie Graph"}</Button>
                    </div>
                </FormWrapper>
            </form >
    )
}

export default CreatePieGraph


