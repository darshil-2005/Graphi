import React from 'react';
import { PieChart, ResponsiveContainer } from 'recharts';
import { createGraphElements } from '@/utils/manualUtils.jsx';
import ContextMenuWrapper from '../ui/contextMenuWrapper';
import AddLegend from '../createGraphElements/createCartesianGraphElements/addLegend';
import AddToolTip from '../createGraphElements/createCartesianGraphElements/addToolTip';
import AddSingleColoredPieChart from '../createGraphElements/createPieElements/addSingleColoredPieELement';
import usePlaneElementsStore from '@/features/store/planeElementsStore';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/shadcnComponent/popover"
import CommonGraphWrapper from '../ui/commonGraphWrapper';
import CreatePieGraph from '../createGraph/createPieGraph.jsx';

function PieGraph({ graphObject, index, setDraggedElement, setFocusedElementIndex, editMode }) {

  const graphObjectElements = usePlaneElementsStore((state) => (state.graphElements));


  return (
    <CommonGraphWrapper graphObject={graphObject} index={index} setDraggedElement={setDraggedElement} setFocusedElementIndex={setFocusedElementIndex} editMode={editMode}>
      <ResponsiveContainer width="100%" height="100%" >
        <PieChart>
          {
            graphObjectElements.filter((d, i) => {
              return d.graphId == graphObject.graphId

            }).filter((d) => d.isdeleted == false).map((d, i) => {
              return createGraphElements(d, i);
            })
          }

        </PieChart>
      </ResponsiveContainer>
    </CommonGraphWrapper>
  );
}

export default PieGraph;
