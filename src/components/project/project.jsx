"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
import { toast } from "sonner";
import Plane from '../plane/plane';
import { generateId } from '@/utils/manualUtils'
import { createProjectPlanes, handleFetchingPlanesFromDatabase } from '@/app/server/actions'
import { Button } from '@/components/ui/shadcnComponent/button';
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
import AddRadialBarChart from '../createGraphElements/createRadialBarGraphElements/addRadialBarGraphElement.jsx';
import { Orbitron } from 'next/font/google'
import Link from 'next/link';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/shadcnComponent/accordion";
import { Pencil, Save } from 'lucide-react';

const orbitron = Orbitron({ subsets: ['latin'], weight: ['400', '700'] })

function Project({ projectId }) {

  const router = useRouter();

  const elements = usePlaneElementsStore((state) => state.planeElements);
  const deleteElementFromGraphElementsArray = usePlaneElementsStore((state) => state.deleteElementFromGraphElementsArray);
  const setUserFiles = usePlaneElementsStore((state) => state.setUserFiles);
  const graphElements = usePlaneElementsStore((state) => state.graphElements);
  const syncDeltasInDB = usePlaneElementsStore((state) => state.syncDeltasInDB);
  const elementsFetcherFromDatabaseOnOpeningProject = usePlaneElementsStore((state) => state.elementsFetcherFromDatabaseOnOpeningProject);
  const deltas = usePlaneElementsStore((state) => state.deltas);

  const [showGraphElements, setShowGraphElements] = useState(false);
  const [editMode, setEditMode] = useState(true);
  const [focusedElementIndex, setFocusedElementIndex] = useState(null);
  const [planes, setPlanes] = useState(undefined);
  const [planeNumber, setPlaneNumber] = useState(0);
  const [planeIdArray, setPlaneIdArray] = useState(undefined);
  const [fetched, setFetched] = useState(false);


  //? UI Use States

  const [syncingChanges, setSyncingChanges] = useState(false);
  const [creatingPlane, setCreatingPlane] = useState(false);

  console.log("Plane Elements: ", elements);
  console.log("Graph Elements: ", graphElements);
  console.log("Deltas: ", deltas);

  async function handleSavingChanges() {
    setSyncingChanges(true);
    await syncDeltasInDB(planeIdArray);
    setSyncingChanges(false);

    toast.success('Changes saved successfully!!');
  }

  useEffect(() => {
    async function temp() {
      setUserFiles();
      const fetchedPlanes = await handleFetchingPlanesFromDatabase(projectId);
      setPlanes(fetchedPlanes);
    }
    temp();
  }, [projectId, creatingPlane])

  useEffect(() => {
    if (planes) {
      setPlaneIdArray(planes.map((d) => { return d.planeId }));
    }
  }, [planes]);
  useEffect(() => {

    async function temp() {
      await elementsFetcherFromDatabaseOnOpeningProject(planeIdArray);
    }
    if (!fetched && planeIdArray) {
      temp();
      setFetched(true);
    }
  }, [planeIdArray])


  async function handleCreatingPlanes() {
    setCreatingPlane(true);
    const newPlaneData = {
      planeId: generateId(),
      projectId: projectId,
      planeData: {}
    }
    try {
      await createProjectPlanes(newPlaneData);
      toast.success("Plane created successfully!");
      router.refresh()

    } catch (error) {
      console.error("Failed to create project: ", error.message);
    }
    setCreatingPlane(false);
  }
  ``
  return (
    <div className='mx-auto w-full overflow-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-foreground'>

      <div className=' flex mb-4 justify-between py-4 items-center px-4 shadow-md dark:shadow-slate-200/10'>

        <div className={`${orbitron.className} flex items-center ml-4 text-3xl tracking-[0.6rem] text-primary`}><Link href='/'>GRAPHI</Link></div>

        <div className='flex gap-x-10'>
          <Button className={`h-10 px-4 text-sm ${orbitron.className} ${showGraphElements ? 'border border-blue-800' : 'bg-secondary/40 border'}`} variant='secondary' onClick={() => { setShowGraphElements(!showGraphElements); }}>Edit Graph Elements</Button>
          <Button className={`h-10 w-fit text-sm flex gap-x-3 ${orbitron.className} ${editMode ? 'border border-blue-800' : 'bg-secondary/40 border'}`} variant='secondary' onClick={() => { setEditMode(!editMode); }}>
            {<Pencil />}
            {<span>Edit Mode</span>}
          </Button>
          <Button className={`${orbitron.className} w-32 px-4 py-4 rounded text-white mr-4 bg-blue-600 disabled:opacity-90 disabled:bg-blue-400 hover:bg-blue-600/80 ${syncingChanges ? 'border-2 border-blue-900' : ''}`} onClick={handleSavingChanges} disabled={syncingChanges}>
            {syncingChanges && <span className=''>Saving...</span>}
            {!syncingChanges && <div className={`flex justify-center items-center gap-x-3 text-md h-10 `}> <Save absoluteStrokeWidth /> <span>Save</span></div>}
          </Button>
        </div>
      </div>

      <div className='mx-4 mt-8'>
        {planes?.map((data, index) => {
          return <Plane key={index} planeId={data.planeId} projectId={data.projectId} planeData={data.planeData} setFocusedElementIndex={setFocusedElementIndex} editMode={editMode} setEditMode={setEditMode} />
        })}
      </div>


      <Button className='w-full mb-4' variant='secondary' onClick={handleCreatingPlanes}>Add New Plane</Button>

      {(showGraphElements) &&
        <div className='fixed right-0 top-0 bg-background h-full w-[30rem] shadow-2xl px-4 gap-y-4 flex flex-col items-center overflow-y-auto scrollbar-thin scrollbar-thumb-foreground scrollbar-track-background'>
          <span className='text-4xl my-4 font-bold text-primary block text-center'>Current Components</span>

          {graphElements.filter((d) => {

            return elements[focusedElementIndex]?.graphId == d.graphId

          }).filter((d) => d.isdeleted == false)
            .map((currItem, index) => (
              <div key={index}>
                <Accordion type="single" collapsible className='mx-auto border px-6 py-2 w-80 grid justify-center'>
                  <AccordionItem value="Graph Add Menu">
                    <AccordionTrigger className='capitalize py-2 gap-x-4 rounded-xl text-3xl'>
                      {currItem?.type}
                    </AccordionTrigger>
                    <AccordionContent className='w-fit flex flex-col justify-center gap-y-4'>
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
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            ))
          }
        </div>
      }

    </div>
  )
}

export default Project