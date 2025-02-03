import React, { useEffect, useState } from 'react';
import { RadialBarChart, RadialBar, Legend, Tooltip, Text, ResponsiveContainer } from 'recharts';
import ContextMenuWrapper from '../ui/contextMenuWrapper';
import CommonGraphWrapper from '../ui/commonGraphWrapper';
import AddLegend from '../createGraphElements/createCartesianGraphElements/addLegend';
import AddToolTip from '../createGraphElements/createCartesianGraphElements/addToolTip';
import AddRadialBarChart from '../createGraphElements/createRadialBarGraphElements/addRadialBarGraphElement';
import CreateRadialBarGraph from '../createGraph/createRadialBarGraph.jsx';
import { createGraphElements } from '../../utils/manualUtils.jsx';
import { retrieveDataFromIndexedDBWithFileId } from '@/utils/manualUtils'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover"



function RadialBarGraph({ graphObject, index, setDraggedElement, setFocusedElementIndex, editMode }) {

  const [data, setData] = useState();

  useEffect(() => {

    async function retriever() {
      const data = await retrieveDataFromIndexedDBWithFileId(graphObject.data);
      setData(data);
    }

    retriever();

  }, [])

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
            graphObject.graphElementsArray.map((d, i) => {
              return createGraphElements(d, i);
            })
          }

        </RadialBarChart>

      </ResponsiveContainer>

      {editMode &&
        <ContextMenuWrapper graphObject={graphObject}>

          <Popover>
            <PopoverTrigger>Edit Graph!!</PopoverTrigger>
            <PopoverContent className="w-fit"><CreateRadialBarGraph graphId={graphObject.graphId} editGraphObject={graphObject} /></PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger>Add Radial BarGraph</PopoverTrigger>
            <PopoverContent className="w-fit"><AddRadialBarChart graphId={graphObject.graphId} /></PopoverContent>
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

export default RadialBarGraph;
