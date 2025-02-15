"use client";

import { toPng } from "html-to-image";
import { useRef, useState } from 'react';
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
import ContextMenuWrapper from "../ui/contextMenuWrapper.jsx";
import D3LineChart from "../d3Charts/lineChart.jsx";

import { Button } from "../ui/shadcnComponent/button.jsx";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/shadcnComponent/accordion";


function Plane({ planeId, projectId, planeData, setFocusedElementIndex, editMode, setEditMode }) {

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

  const chartRef = useRef(null);
  const downloadImage = () => {
    setEditMode(false);
    if (!chartRef.current) return;

    toPng(chartRef.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "chart.png";
        link.click();
        setEditMode(true);
      })
      .catch((error) => {
        console.error("Failed to capture the chart:", error);
        setEditMode(true);
      });
  };

  const sampleData = [
    { x: 1, y: 10 },
    { x: 2, y: 20 },
    { x: 3, y: 15 },
    { x: 4, y: 30 },
    { x: 5, y: 25 },
]; 


  return (
    <>
      <div
        ref={chartRef}
        className="h-[70vh] w-full m-auto overflow-hidden border shadow-sm "
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {/* <div className="h-full w-full relative bg-foreground-secondary bg-[linear-gradient(to_right,#4f4f4f4e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f4e_1px,transparent_1px)] bg-[size:60px_60px]"> */}
        <div className="h-full w-full relative bg-foreground-secondary ">
          {/* <D3LineChart data={sampleData}/> */}
          {elements.filter((item) => item.planeId === planeId)
            .filter((item) => item.isdeleted == false)
            .map((currItem, index) => (
              createGraph(currItem, index, { setDraggedElement: setDraggedElement, setFocusedElementIndex: setFocusedElementIndex })
            ))}

          {editMode &&
            <ContextMenuWrapper>
              <Button onClick={downloadImage}>Download</Button>
            </ContextMenuWrapper>
          }
        </div>
      </div>



      <Accordion type="single" collapsible className="w-[30rem] mx-auto my-4 border px-6 rounded-xl">
        <AccordionItem value="Graph Add Menu">
          <AccordionTrigger className='text-lg'><span className='flex gap-x-2 items-center'>Add Graphs</span></AccordionTrigger>
          <AccordionContent>
            <CreateCartesianGraph planeId={planeId} />
            <CreatePieGraph planeId={planeId} />
            <CreateRadialBarGraph planeId={planeId} />
            <CreateRadarGraph planeId={planeId} />
            <CreateTextComponent planeId={planeId} />
            {/* <CreateImageComponent planeId={planeId} /> */}
          </AccordionContent>
        </AccordionItem>
      </Accordion>

    </>
  );
}

export default Plane;



