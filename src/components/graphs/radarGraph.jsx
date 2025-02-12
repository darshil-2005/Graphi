import { useState, useEffect } from 'react';;
import ContextMenuWrapper from '../ui/contextMenuWrapper';
import CommonGraphWrapper from '../ui/commonGraphWrapper';
import AddLegend from '../createGraphElements/createCartesianGraphElements/addLegend';
import AddToolTip from '../createGraphElements/createCartesianGraphElements/addToolTip';
import AddRadar from '../createGraphElements/createRadarGraphElements/addRadar';
import AddPolarGrid from '../createGraphElements/createRadarGraphElements/addPolarGrid';
import AddPolarAngleAxis from '../createGraphElements/createRadarGraphElements/addPolarAngleAxis';
import AddPolarRadiusAxis from '../createGraphElements/createRadarGraphElements/addPolarRadiusAxis';
import CreateRadarGraph from '../createGraph/createRadarGraph.jsx';
import { RadarChart, ResponsiveContainer } from 'recharts';
import { createGraphElements } from '@/utils/manualUtils.jsx';
import { retrieveDataFromIndexedDBWithFileId } from '@/utils/manualUtils'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/shadcnComponent/popover"
import usePlaneElementsStore from '@/features/store/planeElementsStore';

function RadarGraph({ graphObject, index, setDraggedElement, setFocusedElementIndex, editMode }) {

  const [data, setData] = useState();

  useEffect(() => {

    async function retriever() {
      const data = await retrieveDataFromIndexedDBWithFileId(graphObject.data);
      setData(data);
    }

    retriever();

  }, [])

  const graphObjectElements = usePlaneElementsStore((state) => (state.graphElements));

  return (
    <CommonGraphWrapper graphObject={graphObject} index={index} setDraggedElement={setDraggedElement} setFocusedElementIndex={setFocusedElementIndex} editMode={editMode}>

      <ResponsiveContainer width="100%" height="100%">
        <RadarChart innerRadius={graphObject.innerRadius} outerRadius={graphObject.outerRadius} data={data}>
        {
              graphObjectElements.filter((d, i) => {
                return d.graphId == graphObject.graphId

              }).filter((d) => d.isdeleted == false).map((d, i) => {
                return createGraphElements(d, i);
              })
            }
        </RadarChart>
      </ResponsiveContainer>

      {editMode &&
        <ContextMenuWrapper graphObject={graphObject}>

          <Popover>
            <PopoverTrigger>Edit Graph!!</PopoverTrigger>
            <PopoverContent className="w-fit"><CreateRadarGraph graphId={graphObject.graphId} editGraphObject={graphObject} /></PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger>Add Polar Grid</PopoverTrigger>
            <PopoverContent className="w-fit"><AddPolarGrid graphId={graphObject.graphId} /></PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger>Add Polar Angle axis</PopoverTrigger>
            <PopoverContent className="w-fit"><AddPolarAngleAxis graphId={graphObject.graphId} /></PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger>Add Polar Radius axis</PopoverTrigger>
            <PopoverContent className="w-fit"><AddPolarRadiusAxis graphId={graphObject.graphId} /></PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger>Add Radar</PopoverTrigger>
            <PopoverContent className="w-fit"><AddRadar graphId={graphObject.graphId} /></PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger>Add Legend</PopoverTrigger>
            <PopoverContent className="w-fit"><AddLegend graphId={graphObject.graphId} /></PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger>Add Tool Tip</PopoverTrigger>
            <PopoverContent className="w-fit"><AddToolTip graphId={graphObject.graphId} /></PopoverContent>
          </Popover>
        </ContextMenuWrapper>
      }
    </CommonGraphWrapper>
  );
}

export default RadarGraph;
