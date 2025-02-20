import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/shadcnComponent/button';
import ColorInput from '../formElements/colorInput';
import NumberInput from '../formElements/numberInput';
import usePlaneElementsStore from '../../features/store/planeElementsStore.jsx';
import FormWrapper from '@/components/ui/formWrapper'
import DropdownFileInput from '@/components/formElements/dropdownFileInput'
import { Separator } from '@/components/ui/shadcnComponent/separator';

function CreateCartesianGraph({ planeId, editGraphObject }) {

    const { register, handleSubmit } = useForm(); 
    const addPlaneElements = usePlaneElementsStore((state) => (state.addPlaneElements));
    const handleEditing = usePlaneElementsStore((state) => (state.handleEditing));

    console.log("Edit: ", editGraphObject)


    async function addCartesianGraphInThePlaneElementsArray(data) {

        console.log("Data: ", data)

        if (editGraphObject) {

            const temp = {
                graphId: editGraphObject.graphId,
                data: data[`fileUpload${planeId}`],
                height: String(data.height) + 'px',
                width: String(data.width) + 'px',
                top: Number(data.top),
                left: Number(data.left),
                zIndex: Number(data.zIndex),
                borderRadius: (data.borderRadius + 'px'),
                backgroundColor: data.bgColor,
                backgroundColorOpacity: Number(data.bgColorOpacity),
                margin: { top: Number(data.marginTop), right: Number(data.marginRight), bottom: Number(data.marginBottom), left: Number(data.marginLeft) },
                cartesianGridColor: data.cartesianGrid,
            }
            handleEditing(temp);

        } else {

            const temp = {
                planeId: planeId,
                graphId: (String(planeId) + String(crypto.randomUUID())),
                type: 'cartesianGraph',
                top: Number(data.top),
                left: Number(data.left),
                zIndex: Number(data.zIndex),
                graphElementsArray: [],
                data: data[`fileUpload${planeId}`],
                height: String(data.height) + 'px',
                width: String(data.width) + 'px',
                borderRadius: (data.borderRadius + 'px'),
                backgroundColor: data.bgColor,
                backgroundColorOpacity: Number(data.bgColorOpacity),
                margin: { top: Number(data.marginTop), right: Number(data.marginRight), bottom: Number(data.marginBottom), left: Number(data.marginLeft) },
                cartesianGridColor: data.cartesianGrid,
            }

            addPlaneElements({ graph: temp });

        }
    }

    return (
        <>
            <form onSubmit={handleSubmit(addCartesianGraphInThePlaneElementsArray)}>
                <FormWrapper>
                    {/* <div className='font-bold '>Create Cartesian Graph!!</div> */}
                    <Separator/>
                    
                    <DropdownFileInput registerId={`fileUpload${planeId}`} register={register} defaultValue={editGraphObject?.data} />

                    <div className='grid grid-cols-2'>
                        <NumberInput registerId={'height'} label={'Height'} defaultValue={editGraphObject ? parseInt(editGraphObject.height) : 200} register={register} suffix={'px'} />
                        <NumberInput registerId={'width'} label={'Width'} defaultValue={editGraphObject ? parseInt(editGraphObject.width) : 200} register={register} suffix={'px'} />
                    </div>
                    <div className='grid grid-cols-2'>
                        <NumberInput registerId={'top'} label={'Top'} defaultValue={parseInt(editGraphObject?.top) || 0} min={0} register={register} suffix={'px'}/>
                        <NumberInput registerId={'left'} label={'Left'} defaultValue={parseInt(editGraphObject?.left) || 0} min={0} register={register} suffix={'px'}/>
                    </div>
                    <div className='grid grid-cols-2'>
                    <NumberInput registerId={'borderRadius'} label={'Border Radius: '} defaultValue={parseInt(editGraphObject?.borderRadius) || 12} register={register} suffix={'px'} />
                    <NumberInput registerId={'zIndex'} label={'Z Index'} defaultValue={parseInt(editGraphObject?.zIndex) || 0} min={0} register={register} />
                    </div>
                    <ColorInput registerId={'bgColor'} label={'Background Color'} defaultValue={editGraphObject?.backgroundColor || '#000000'} register={register} showOpacity={true} defaultOpacity={editGraphObject ? editGraphObject.backgroundColorOpacity : 1} />

                    <div className='grid gap-y-4 relative'>
                        <div className='font-semibold text-xl tracking-wider'>Margin</div>
                        <div className='grid grid-cols-2'>
                        <NumberInput registerId={'marginTop'} label={'Top'} defaultValue={editGraphObject ? editGraphObject.margin.top : 0} register={register} suffix={'px'} />
                        <NumberInput registerId={'marginLeft'} label={'Left'} defaultValue={editGraphObject ? editGraphObject.margin.left : 0} register={register} suffix={'px'} />
                        </div>
                        <div className='grid grid-cols-2'>
                        <NumberInput registerId={'marginBottom'} label={'Bottom'} defaultValue={editGraphObject ? editGraphObject.margin.bottom : 0} register={register} suffix={'px'} />
                        <NumberInput registerId={'marginRight'} label={'Right'} defaultValue={editGraphObject ? editGraphObject.margin.right : 0} register={register} suffix={'px'} />
                        </div>
                    </div>

                    <div className="flex items-center justify-center">
                    <Button type="submit" className='w-full'>{editGraphObject ? "Edit Graph" : "Create Cartesian Graph"}</Button>
                    </div>
                </FormWrapper>
            </form >


        </>
    )
}

export default CreateCartesianGraph;

