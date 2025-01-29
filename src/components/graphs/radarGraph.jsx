import React from 'react';;
import ContextMenuWrapper from '../ui/contextMenuWrapper';
import CommonGraphWrapper from '../ui/commonGraphWrapper';
import AddLegend from '../createGraphElements/createCartesianGraphElements/addLegend';
import AddToolTip from '../createGraphElements/createCartesianGraphElements/addToolTip';
import AddRadar from '../createGraphElements/createRadarGraphElements/addRadar';
import AddPolarGrid from '../createGraphElements/createRadarGraphElements/addPolarGrid';
import AddPolarAngleAxis from '../createGraphElements/createRadarGraphElements/addPolarAngleAxis';
import AddPolarRadiusAxis from '../createGraphElements/createRadarGraphElements/addPolarRadiusAxis';
import CreateRadarGraph from '../createGraph/createRadarGraph.jsx';
import { RadarChart, Radar, PolarAngleAxis, PolarRadiusAxis, Legend, ResponsiveContainer, PolarGrid } from 'recharts';
import { createGraphElements } from '../../utils/manualUtils.jsx';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover"

function RadarGraph({ graphObject, index, setDraggedElement, setFocusedElementIndex, editMode }) {
  return (
    <CommonGraphWrapper graphObject={graphObject} index={index} setDraggedElement={setDraggedElement} setFocusedElementIndex={setFocusedElementIndex} editMode={editMode}>

      <ResponsiveContainer width="100%" height="100%">
        <RadarChart innerRadius={graphObject.innerRadius} outerRadius={graphObject.outerRadius} data={graphObject.data}>
          {
            graphObject.graphElementsArray.map((d, i) => {
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
