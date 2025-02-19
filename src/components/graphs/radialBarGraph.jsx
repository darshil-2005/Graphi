import { useEffect, useState } from 'react';
import { RadialBarChart, ResponsiveContainer } from 'recharts';
import ContextMenuWrapper from '../ui/contextMenuWrapper';
import CommonGraphWrapper from '../ui/commonGraphWrapper';
import AddLegend from '../createGraphElements/createCartesianGraphElements/addLegend';
import AddToolTip from '../createGraphElements/createCartesianGraphElements/addToolTip';
import AddRadialBarChart from '../createGraphElements/createRadialBarGraphElements/addRadialBarGraphElement';
import CreateRadialBarGraph from '../createGraph/createRadialBarGraph.jsx';
import { createGraphElements } from '@/utils/manualUtils.jsx';
import { retrieveDataFromIndexedDBWithFileId } from '@/utils/manualUtils'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/shadcnComponent/popover"
import usePlaneElementsStore from '@/features/store/planeElementsStore';



function RadialBarGraph({ graphObject, index, setDraggedElement, setFocusedElementIndex, editMode }) {

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

        <RadialBarChart
          innerRadius={graphObject.innerRadius}
          outerRadius={graphObject.outerRadius}
          data={data}
          startAngle={Number(graphObject.startAngle)}
          endAngle={Number(graphObject.endAngle)}
        >

          {
            graphObjectElements.filter((d, i) => {
              return d.graphId == graphObject.graphId

            }).filter((d) => d.isdeleted == false).map((d, i) => {
              return createGraphElements(d, i);
            })
          }

        </RadialBarChart>

      </ResponsiveContainer>
    </CommonGraphWrapper>

  );
}

export default RadialBarGraph;
