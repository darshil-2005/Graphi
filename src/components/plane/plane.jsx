"use client";

import React, { useState } from 'react';
import CartesianGraph from '../graphs/cartesianGraph.jsx';
import PieGraph from '../graphs/pieGraph.jsx';
import RadarGraph from '../graphs/radarGraph.jsx';
import RadialBarGraph from '../graphs/radialBarGraph.jsx';
import TextElement from '../graphs/textElement.jsx';
import CreateRadarGraph from '../createGraph/createRadarGraph.jsx';
import CreateCartesianGraph from '../createGraph/createCartesianGraph.jsx';
import CreatePieGraph from '../createGraph/createPieGraph.jsx';
import CreateRadialBarGraph from '../createGraph/createRadialBarGraph.jsx';
import CreateTextComponent from '../createGraph/createTextComponent.jsx';
import CreateImageComponent from '../createGraph/createImageComponent.jsx';
import usePlaneElementsStore from '../../features/store/planeElementsStore.jsx';
import ImageComponent from '../graphs/image.jsx';


function Plane({ planeId, projectId, planeData, setFocusedElementIndex, editMode }) {

  const elements = usePlaneElementsStore((state) => state.planeElements);
  const updatePosition = usePlaneElementsStore((state) => state.updatePosition);
  const [draggedElement, setDraggedElement] = useState(null);


  function createGraph(graphObj, index) {
    if (graphObj.type == 'cartesianGraph') {
      return <CartesianGraph key={index} graphObject={graphObj} setDraggedElement={setDraggedElement} setFocusedElementIndex={setFocusedElementIndex} editMode={editMode} />;
    } else if (graphObj.type === 'pieGraph') {
      return <PieGraph key={index} graphObject={graphObj} setDraggedElement={setDraggedElement} setFocusedElementIndex={setFocusedElementIndex} editMode={editMode} />;
    } else if (graphObj.type === 'radarGraph') {
      return <RadarGraph key={index} graphObject={graphObj} setDraggedElement={setDraggedElement} setFocusedElementIndex={setFocusedElementIndex} editMode={editMode} />;
    } else if (graphObj.type === 'radialBarGraph') {
      return <RadialBarGraph key={index} graphObject={graphObj} setDraggedElement={setDraggedElement} setFocusedElementIndex={setFocusedElementIndex} editMode={editMode} />;
    } else if (graphObj.type === 'textElement') {
      return <TextElement key={index} graphObject={graphObj} setDraggedElement={setDraggedElement} setFocusedElementIndex={setFocusedElementIndex} editMode={editMode} />;
    } else if (graphObj.type === 'image') {
      return <ImageComponent key={index} graphObject={graphObj} setDraggedElement={setDraggedElement} setFocusedElementIndex={setFocusedElementIndex} editMode={editMode} />;
    }
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  const handleDrop = (e) => {
    e.preventDefault();
    const { offsetX, offsetY } = JSON.parse(e.dataTransfer.getData('text/plain'));
    const left = e.clientX - offsetX;
    const top = e.clientY - offsetY;
    updatePosition({ graphId: draggedElement, top: top, left: left });
  };

  return (
    <>
      <div
        className="h-[70vh] w-full m-auto overflow-hidden border shadow-sm "
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="h-full w-full relative bg-foreground-secondary bg-[linear-gradient(to_right,#4f4f4f4e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f4e_1px,transparent_1px)] bg-[size:60px_60px]">
          {elements.filter((item) => item.planeId === planeId).map((currItem, index) => (
            createGraph(currItem, index, { setDraggedElement: setDraggedElement, setFocusedElementIndex: setFocusedElementIndex })
          ))}                  
        </div>
      </div>

      <div className='flex flex-col justify-center mt-8 gap-y-4'>
        <CreateCartesianGraph planeId={planeId} />
        <CreatePieGraph planeId={planeId} />
        <CreateRadialBarGraph planeId={planeId} />
        <CreateRadarGraph planeId={planeId} />
        <CreateTextComponent planeId={planeId} />
        <CreateImageComponent planeId={planeId} />
      </div>

    </>
  );
}

export default Plane;



