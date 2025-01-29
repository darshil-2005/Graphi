import React from 'react';
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import { createGraphElements } from '../../utils/manualUtils.jsx';
import ContextMenuWrapper from '../ui/contextMenuWrapper';
import AddLegend from '../createGraphElements/createCartesianGraphElements/addLegend';
import AddToolTip from '../createGraphElements/createCartesianGraphElements/addToolTip';
import AddSingleColoredPieChart from '../createGraphElements/createPieElements/addSingleColoredPieELement';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover"
import CommonGraphWrapper from '../ui/commonGraphWrapper';
import CreatePieGraph from '../createGraph/createPieGraph.jsx';

function PieGraph({ graphObject, index, setDraggedElement, setFocusedElementIndex, editMode }) {

  return (
    <CommonGraphWrapper graphObject={graphObject} index={index} setDraggedElement={setDraggedElement} setFocusedElementIndex={setFocusedElementIndex} editMode={editMode}>
      <ResponsiveContainer width="100%" height="100%" >
        <PieChart>
          {
            graphObject.graphElementsArray.map((d, i) => {
              return createGraphElements(d, i);
            })
          }

        </PieChart>
      </ResponsiveContainer>

      {editMode &&
        <ContextMenuWrapper graphObject={graphObject}>

          <Popover>
            <PopoverTrigger>Edit Graph!!</PopoverTrigger>
            <PopoverContent className="w-fit"><CreatePieGraph graphId={graphObject.graphId} editGraphObject={graphObject} /></PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger>Add single colored Pie</PopoverTrigger>
            <PopoverContent className="w-fit"><AddSingleColoredPieChart graphId={graphObject.graphId} /></PopoverContent>
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

export default PieGraph;
