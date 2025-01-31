"use client";

import React, { useState } from 'react'
import Plane from '../plane/plane';
import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import usePlaneElementsStore from '../../features/store/planeElementsStore.jsx';
import AddAreaElement from '../createGraphElements/createCartesianGraphElements/addAreaElement.jsx';
import AddLineElement from '../createGraphElements/createCartesianGraphElements/addLineElement.jsx';
import AddBarElement from '../createGraphElements/createCartesianGraphElements/addBarElement.jsx';
import AddScatterElement from '../createGraphElements/createCartesianGraphElements/addScatterElement.jsx';
import AddXAxisElement from '../createGraphElements/createCartesianGraphElements/addXAxisElement.jsx';
import AddYAxisElement from '../createGraphElements/createCartesianGraphElements/addYAxisElement.jsx';
import AddCartesianElement from '../createGraphElements/createCartesianGraphElements/addCartesianGrid.jsx';
import AddLegend from '../createGraphElements/createCartesianGraphElements/addLegend.jsx';
import AddToolTip from '../createGraphElements/createCartesianGraphElements/addToolTip.jsx';
import AddSingleColoredPieChart from '../createGraphElements/createPieElements/addSingleColoredPieELement.jsx';
import AddPolarAngleAxis from '../createGraphElements/createRadarGraphElements/addPolarAngleAxis.jsx';
import AddPolarRadiusAxis from '../createGraphElements/createRadarGraphElements/addPolarRadiusAxis.jsx';
import AddPolarGrid from '../createGraphElements/createRadarGraphElements/addPolarGrid.jsx';
import AddRadar from '../createGraphElements/createRadarGraphElements/addRadar.jsx';
import AddRadialBarChart from '../createGraphElements/createRadialBarGraphElements/addRadialBarGraphElement.jsx'

function Project( {projectId} ) {

  const elements = usePlaneElementsStore((state) => state.planeElements);
  const deleteElementFromGraphElementsArray = usePlaneElementsStore((state) => state.deleteElementFromGraphElementsArray);
  const [showGraphElements, setShowGraphElements] = useState(false);
  const [editMode, setEditMode] = useState(true);
  const [focusedElementIndex, setFocusedElementIndex] = useState(null);

  const newId = crypto.randomUUID();
  console.log("New Id: ", newId)

  return (
    <div className='px-6'>

      {/* {projectId} */}
     
      <div className='flex mb-4 p-2'>
        <Button className='w-60 m-auto' variant='secondary' onClick={() => { setShowGraphElements(!showGraphElements); }}>Show Graph Elements</Button>
        <Button className='w-60 m-auto' variant='secondary' onClick={() => { setEditMode(!editMode); }}>Edit Mode</Button>
        <Button className='w-60 m-auto bg-blue-600 hover:bg-blue-500 text-primary'>Save Changes</Button>
      </div>

      <Plane planeId={123} projectId={projectId} setFocusedElementIndex={setFocusedElementIndex} editMode={editMode} />
      <Plane planeId={456} projectId={projectId} setFocusedElementIndex={setFocusedElementIndex} editMode={editMode} />



      {(showGraphElements) &&
        <div className='fixed right-0 top-0 bg-background h-screen w-[30rem] shadow-2xl px-4 gap-y-4 flex flex-col items-center overflow-y-auto scrollbar-thin scrollbar-thumb-foreground scrollbar-track-background'>
          <span className='text-4xl my-4 font-bold text-primary block text-center'>Current Components</span>

          {elements[focusedElementIndex]?.graphElementsArray?.map((currItem, index) => (
            <div key={index}>
              <Popover>
                <PopoverTrigger className='text-accent capitalize bg-blue-200 py-2 px-4 rounded-xl text-3xl'>
                  {currItem?.type}
                </PopoverTrigger>
                <PopoverContent className='w-fit flex flex-col justify-center gap-y-4'>
                  {currItem?.type === 'area' &&
                    <AddAreaElement graphId={currItem?.graphId} editGraphObject={currItem} />}
                  {currItem?.type === 'bar' &&
                    <AddBarElement graphId={currItem?.graphId} editGraphObject={currItem} />}
                  {currItem?.type === 'line' &&
                    <AddLineElement graphId={currItem?.graphId} editGraphObject={currItem} />}
                  {currItem?.type === 'scatter' &&
                    <AddScatterElement graphId={currItem?.graphId} editGraphObject={currItem} />}
                  {currItem?.type === 'xAxis' &&
                    <AddXAxisElement graphId={currItem?.graphId} editGraphObject={currItem} />}
                  {currItem?.type === 'yAxis' &&
                    <AddYAxisElement graphId={currItem?.graphId} editGraphObject={currItem} />}
                  {currItem?.type === 'cartesianGrid' &&
                    <AddCartesianElement graphId={currItem?.graphId} editGraphObject={currItem} />}
                  {currItem?.type === 'legend' &&
                    <AddLegend graphId={currItem?.graphId} editGraphObject={currItem} />}
                  {currItem?.type === 'toolTip' &&
                    <AddToolTip graphId={currItem?.graphId} editGraphObject={currItem} />}
                  {currItem?.type === 'singleColoredPie' &&
                    <AddSingleColoredPieChart graphId={currItem?.graphId} editGraphObject={currItem} />}
                  {currItem?.type === 'polarAngleAxis' &&
                    <AddPolarAngleAxis graphId={currItem?.graphId} editGraphObject={currItem} />}
                  {currItem?.type === 'polarGrid' &&
                    <AddPolarGrid graphId={currItem?.graphId} editGraphObject={currItem} />}
                  {currItem?.type === 'polarRadiusAxis' &&
                    <AddPolarRadiusAxis graphId={currItem?.graphId} editGraphObject={currItem} />}
                  {currItem?.type === 'radar' &&
                    <AddRadar graphId={currItem?.graphId} editGraphObject={currItem} />}
                  {currItem?.type === 'radialBarGraph' &&
                    <AddRadialBarChart graphId={currItem?.graphId} editGraphObject={currItem} />}
                  <Button variant={'destructive'} id={currItem?.graphId} onClick={() => deleteElementFromGraphElementsArray(currItem)}>Delete</Button>
                </PopoverContent>
              </Popover>
            </div>
          ))
          }
        </div>
      }

    </div>
  )
}

export default Project