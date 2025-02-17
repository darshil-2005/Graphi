import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/shadcnComponent/input';
import { Label } from '@/components/ui/shadcnComponent/label';
import { Button } from '@/components/ui/shadcnComponent/button';
import { useState, useEffect } from 'react';
import ColorInput from '../../formElements/colorInput';
import DropdownInput from '../../formElements/dropdownInput';
import { retrieveGraphObjectIndex } from '@/utils/manualUtils';
import usePlaneElementsStore from '../../../features/store/planeElementsStore';
import {retrieveFileIndex} from '@/utils/manualUtils'

function AddScatterElement({ graphId, editGraphObject }) {
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

    const onSubmit = (data) => {
        const scatterElement = {
            elementId: editGraphObject ? editGraphObject.elementId : crypto.randomUUID(),
            graphId: editGraphObject ? editGraphObject.graphId : graphId,
            planeId: editGraphObject ? undefined : graphObjects[graphObjIndex].planeId,
            type: 'scatter',
            scatterName: data.scatterName,
            dataKey: data.dataKey,
            legendType: data.legendType,
            shape: data.shape,
            fill: data.fill,
        };

        if (editGraphObject) {
            handleGraphElementsArrayEditing(scatterElement);
        } else {
            const returnObj = { index: graphObjIndex, newGraphElement: scatterElement };
            addGraphObjGraphElementsArray(returnObj);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="w-fit grid gap-y-3 tracking-wider">
                <Label htmlFor="scatterName" >Scatter Name</Label>
                <Input
                    id="scatterName"
                    name="scatterName"
                    {...register('scatterName')}
                    type="text"
                    placeholder={'Name'}
                    className="w-[8rem] bg-secondary border-2 border-foreground/20"
                    defaultValue={editGraphObject?.scatterName}
                />

                <ColorInput
                    label="Fill Color"
                    registerId="fill"
                    defaultValue={editGraphObject?.fill || '#00ff00'}
                    register={register}
                    className="w-[8rem]"
                />

                <DropdownInput
                    registerId="legendType"
                    optionsArray={[
                        'line', 'plainline', 'square', 'rect', 'circle', 
                        'cross', 'diamond', 'star', 'triangle', 'wye', 'none'
                    ]}
                    label="Legend Type"
                    register={register}
                    defaultValue={editGraphObject?.legendType}
                    className="w-[8rem]"
                    formatLabel={true}
                />

                <DropdownInput
                    registerId="shape"
                    optionsArray={[
                        'circle', 'cross', 'diamond', 'square', 
                        'star', 'triangle', 'wye'
                    ]}
                    label="Shape"
                    register={register}
                    defaultValue={editGraphObject?.shape}
                    className="w-[8rem]"
                    formatLabel={true}
                />

                {keys && (
                    <DropdownInput
                        registerId="dataKey"
                        register={register}
                        defaultValue={editGraphObject?.dataKey}
                        optionsArray={keys}
                        label="Choose the Y-Axis Data"
                        formatLabel
                        className="w-[8rem]"
                    />
                )}

                <Button type="submit">Add Scatter Points!</Button>
            </div>
        </form>
    );
}

export default AddScatterElement;

