import { Ellipsis } from 'lucide-react';
import { Button } from '@/components/ui/shadcnComponent/button';
import { showContextMenu } from '@/utils/manualUtils';
import usePlaneElementsStore from '../../features/store/planeElementsStore.jsx';

const ContextMenuWrapper = ({ children, graphObject }) => {
    const deleteElementFromElementsArray = usePlaneElementsStore((state) => state.deleteElementFromElementsArray);
    return (
        <div>
            <div className="absolute top-0 right-0">
                {/* Context Menu Button */}
                <Button
                    className="bg-transparent hover:bg-transparent"
                    onClick={(e) => showContextMenu(e)}
                >
                    <Ellipsis color="white" />
                </Button>

                {/* Context Menu Content */}
                <div className="absolute hidden right-2 bg-primary-foreground w-40">
                    <div className='flex flex-col m-auto gap-4 p-2 '>
                        {children}
                        {graphObject &&
                            <Button variant={"destructive"} id={graphObject.graphId} onClick={(e) => deleteElementFromElementsArray(e.target.id)}>Delete</Button>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContextMenuWrapper