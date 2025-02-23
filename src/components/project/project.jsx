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
import AddCartesianGrid from '../createGraphElements/createCartesianGraphElements/addCartesianGrid.jsx';
import AddLegend from '../createGraphElements/createCartesianGraphElements/addLegend.jsx';
import AddToolTip from '../createGraphElements/createCartesianGraphElements/addToolTip.jsx';
import AddSingleColoredPieChart from '../createGraphElements/createPieElements/addSingleColoredPieELement.jsx';
import AddPolarAngleAxis from '../createGraphElements/createRadarGraphElements/addPolarAngleAxis.jsx';
import AddPolarRadiusAxis from '../createGraphElements/createRadarGraphElements/addPolarRadiusAxis.jsx';
import AddPolarGrid from '../createGraphElements/createRadarGraphElements/addPolarGrid.jsx';
import AddRadar from '../createGraphElements/createRadarGraphElements/addRadar.jsx';
import AddRadialBarChart from '../createGraphElements/createRadialBarGraphElements/addRadialBarGraphElement.jsx';
import { Orbitron } from 'next/font/google'


import CreateRadarGraph from '../createGraph/createRadarGraph.jsx';
import CreateCartesianGraph from '../createGraph/createCartesianGraph.jsx';
import CreatePieGraph from '../createGraph/createPieGraph.jsx';
import CreateRadialBarGraph from '../createGraph/createRadialBarGraph.jsx';
import CreateTextComponent from '../createGraph/createTextComponent.jsx';


import Link from 'next/link';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/shadcnComponent/accordion";
import { Pencil, Save, SquareMenu, ChartNoAxesColumnIncreasing, X, SquarePlus } from 'lucide-react';
import { Separator } from '@/components/ui/shadcnComponent/separator';

import CreditsDisplay from '@/components/credits/creditsDisplay';
import { retrieveUserCredits } from '@/app/server/actions';



const orbitron = Orbitron({ subsets: ['latin'], weight: ['400', '700'] })

function Project({ projectId }) {

    const [credits, setCredits] = useState(undefined);
  
      useEffect(() => {
  
          async function temp() {
              const res = await retrieveUserCredits();
              setCredits(res);
          }
          temp();
      }, [credits])

  const router = useRouter();

  const elements = usePlaneElementsStore((state) => state.planeElements);
  const deleteElementFromGraphElementsArray = usePlaneElementsStore((state) => state.deleteElementFromGraphElementsArray);
  const setUserFiles = usePlaneElementsStore((state) => state.setUserFiles);
  const graphElements = usePlaneElementsStore((state) => state.graphElements);
  const elementsFetcherFromDatabaseOnOpeningProject = usePlaneElementsStore((state) => state.elementsFetcherFromDatabaseOnOpeningProject);
  const deleteElementFromElementsArray = usePlaneElementsStore((state) => state.deleteElementFromElementsArray);
  const saveElements = usePlaneElementsStore((state) => state.saveElements);

  const [showGraphElements, setShowGraphElements] = useState(false);
  const [showAddGraphList, setShowAddGraphList] = useState(false);
  const [editMode, setEditMode] = useState(true);
  const [focusedElementIndex, setFocusedElementIndex] = useState(undefined);
  const [focusedPlaneId, setFocusedPlaneId] = useState(null);
  const [planes, setPlanes] = useState(undefined);
  const [planeIdArray, setPlaneIdArray] = useState(undefined);
  const [fetched, setFetched] = useState(false);

  //? UI Use States

  const [syncingChanges, setSyncingChanges] = useState(false);
  const [creatingPlane, setCreatingPlane] = useState(false);

  const [accordionIsOpen, setAccordionIsOpen] = useState("");
  const [contextMenuMode, setContextMenuMode] = useState("Edit");



  useEffect(() => {
    async function temp() {
      setUserFiles();
      const fetchedPlanes = await handleFetchingPlanesFromDatabase(projectId);
      setPlanes(fetchedPlanes);
    }
    temp();
  }, [projectId, creatingPlane]);


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


  const handleSavingChanges = async () => {

    setSyncingChanges(true);
    
    await saveElements(planeIdArray);
    
    setSyncingChanges(false);

    toast.success("Saved Changes");

  }

  return (
    <div className=' mx-auto w-full overflow-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-foreground'>

      <div className='sticky top-0 z-[10] flex mb-10 justify-between py-4 items-center px-4 shadow-md bg-background dark:shadow-slate-200/10'>

        <CreditsDisplay credits={credits} width={28}/>
        <div className='flex gap-x-10'>
          <Button className={`h-10 px-4 text-sm ${orbitron.className}`} variant='secondary' onClick={handleCreatingPlanes}>{<SquarePlus strokeWidth={1.5} />}Add New Plane</Button>
          <Button className={`h-10 px-4 text-sm ${orbitron.className} ${showAddGraphList ? 'border border-blue-800' : 'bg-secondary/40 border'}`} disabled={!focusedPlaneId} variant='secondary' onClick={() => { setShowAddGraphList(!showAddGraphList); }}>{<ChartNoAxesColumnIncreasing absoluteStrokeWidth />}Add Graph</Button>
          <Button className={`h-10 px-4 text-sm ${orbitron.className} ${showGraphElements ? 'border border-blue-800' : 'bg-secondary/40 border'}`} disabled={!(typeof focusedElementIndex == 'number')} variant='secondary' onClick={() => { setShowGraphElements(!showGraphElements); }}>{<SquareMenu absoluteStrokeWidth />}Context Menu</Button>
          <Button className={`h-10 w-fit text-sm flex gap-x-3 ${orbitron.className} ${editMode ? 'border border-blue-800' : 'bg-secondary/40 border'}`} variant='secondary' onClick={() => { setEditMode(!editMode); }}>
            {<Pencil />}
            {<span>Edit Mode</span>}
          </Button>
          <Button className={`${orbitron.className} w-32 px-4 py-4 rounded text-white mr-4 bg-blue-800 disabled:opacity-90 disabled:bg-blue-600 hover:bg-blue-800/80 ${syncingChanges ? 'border-2 border-blue-900' : ''}`} onClick={handleSavingChanges} disabled={syncingChanges}>
            {syncingChanges && <span className=''>Saving...</span>}
            {!syncingChanges && <div className={`flex justify-center items-center gap-x-3 text-md h-10 `}> <Save absoluteStrokeWidth /> <span>Save</span></div>}
          </Button>
        </div>
      </div>

      <div className='mx-4 mt-8' onMouseDown={() => { setShowAddGraphList(false); setShowGraphElements(false); setAccordionIsOpen("") }}>
        {planes?.map((data, index) => {
          return <Plane key={index} planeId={data.planeId} projectId={data.projectId} planeData={data.planeData} focusedPlaneId={focusedPlaneId} setFocusedElementIndex={setFocusedElementIndex} setFocusedPlaneId={setFocusedPlaneId} editMode={editMode} setEditMode={setEditMode} />
        })}
      </div>




      {/* {(showGraphElements) && */}
      <div className={`fixed top-0 z-50 h-full w-[32rem] shadow-2xl px-4 gap-y-4 flex flex-col items-center overflow-y-auto scrollbar-thin scrollbar-thumb-foreground scrollbar-track-background ${showGraphElements ? 'right-0' : '-right-[42rem]'} transition-all duration-300 ease-in-out 
        bg-[#f2f2f2] dark:bg-popover shadow-2xl shadow-chart-5`}>

        <div className='flex items-center mt-6 mb-0.5 justify-between w-full'>

          <button className={`w-fit p-0 bg-transparent ml-2 `} onClick={() => { setShowGraphElements(!showGraphElements); }}>
            <X size={36} className='absolute -translate-y-1/2 bg-red-900 text-white rounded-lg shadow-[0_0_10px_#ff0000]' />
          </button>

          <span className={`m-auto text-4xl font-bold text-primary block text-center tracking-widest ${orbitron.className}`}>Context Menu</span>
        </div>

        <Separator className='mt-1' />

        <div className='w-[80%] text-xl flex px-4 gap-x-6'>
          <Button onClick={() => { setContextMenuMode("Create") }} variant='secondary' className={`flex-1 ${contextMenuMode == 'Create' ? 'border border-blue-400' : ''}`}>Create</Button>
          <Separator orientation="vertical" className='h-8' />
          <Button onClick={() => { setContextMenuMode("Edit") }} variant='secondary' className={`flex-1 ${contextMenuMode == 'Edit' ? 'border border-blue-400' : ''}`}>Edit</Button>
        </div>


        {
          contextMenuMode == 'Create' &&

          <>
            {elements[focusedElementIndex]?.type == 'cartesianGraph' &&
              <Accordion type="single" collapsible className="w-full grid gap-y-4 px-10">
                <AccordionItem value="x-axis" className='border rounded-lg'>
                  <AccordionTrigger className={`hover:bg-gray-100 dark:hover:bg-gray-800 px-4 py-4 rounded-lg transition-colors ${orbitron.className}`}><span className="text-lg font-semibold capitalize">Add X Axis</span>  </AccordionTrigger>
                  <AccordionContent className="px-4"><AddXAxisElement graphId={elements[focusedElementIndex]?.graphId} /></AccordionContent>
                </AccordionItem>

                <AccordionItem value="y-axis" className='border rounded-lg'>
                  <AccordionTrigger className={`hover:bg-gray-100 dark:hover:bg-gray-800 px-4 py-4 rounded-lg transition-colors ${orbitron.className}`}><span className="text-lg font-semibold capitalize">Add Y Axis</span>  </AccordionTrigger>
                  <AccordionContent className="px-4"><AddYAxisElement graphId={elements[focusedElementIndex]?.graphId} /></AccordionContent>
                </AccordionItem>

                <AccordionItem value="line" className='border rounded-lg'>
                  <AccordionTrigger className={`hover:bg-gray-100 dark:hover:bg-gray-800 px-4 py-4 rounded-lg transition-colors ${orbitron.className}`}><span className="text-lg font-semibold capitalize">Add Line</span>  </AccordionTrigger>
                  <AccordionContent className="px-4"><AddLineElement graphId={elements[focusedElementIndex]?.graphId} /></AccordionContent>
                </AccordionItem>

                <AccordionItem value="area" className='border rounded-lg'>
                  <AccordionTrigger className={`hover:bg-gray-100 dark:hover:bg-gray-800 px-4 py-4 rounded-lg transition-colors ${orbitron.className}`}><span className="text-lg font-semibold capitalize">Add Area</span>  </AccordionTrigger>
                  <AccordionContent className="px-4"><AddAreaElement graphId={elements[focusedElementIndex]?.graphId} /></AccordionContent>
                </AccordionItem>

                <AccordionItem value="bar" className='border rounded-lg'>
                  <AccordionTrigger className={`hover:bg-gray-100 dark:hover:bg-gray-800 px-4 py-4 rounded-lg transition-colors ${orbitron.className}`}><span className="text-lg font-semibold capitalize">Add Bar</span> </AccordionTrigger>
                  <AccordionContent className="px-4"><AddBarElement graphId={elements[focusedElementIndex]?.graphId} /></AccordionContent>
                </AccordionItem>

                <AccordionItem value="scatter" className='border rounded-lg'>
                  <AccordionTrigger className={`hover:bg-gray-100 dark:hover:bg-gray-800 px-4 py-4 rounded-lg transition-colors ${orbitron.className}`}><span className="text-lg font-semibold capitalize">Add Scatter</span> </AccordionTrigger>
                  <AccordionContent className="px-4"><AddScatterElement graphId={elements[focusedElementIndex]?.graphId} /></AccordionContent>
                </AccordionItem>

                <AccordionItem value="cartesian-grid" className='border rounded-lg'>
                  <AccordionTrigger className={`hover:bg-gray-100 dark:hover:bg-gray-800 px-4 py-4 rounded-lg transition-colors ${orbitron.className}`}><span className="text-lg font-semibold capitalize">Add Cartesian Grid</span>  </AccordionTrigger>
                  <AccordionContent className="px-4"><AddCartesianGrid graphId={elements[focusedElementIndex]?.graphId} /></AccordionContent>
                </AccordionItem>

                <AccordionItem value="legend" className='border rounded-lg'>
                  <AccordionTrigger className={`hover:bg-gray-100 dark:hover:bg-gray-800 px-4 py-4 rounded-lg transition-colors ${orbitron.className}`}><span className="text-lg font-semibold capitalize">Add Legend</span>  </AccordionTrigger>
                  <AccordionContent className="px-4"><AddLegend graphId={elements[focusedElementIndex]?.graphId} /></AccordionContent>
                </AccordionItem>

                <AccordionItem value="tooltip" className='border rounded-lg'>
                  <AccordionTrigger className={`hover:bg-gray-100 dark:hover:bg-gray-800 px-4 py-4 rounded-lg transition-colors ${orbitron.className}`}><span className="text-lg font-semibold capitalize">Add Tool Tip</span>  </AccordionTrigger>
                  <AccordionContent className="px-4"><AddToolTip graphId={elements[focusedElementIndex]?.graphId} /></AccordionContent>
                </AccordionItem>
              </Accordion>
            }

            {
              elements[focusedElementIndex]?.type == 'pieGraph' &&
              <Accordion type="single" collapsible className="w-full grid gap-y-4 px-10">
              <AccordionItem value="single-colored-pie" className='border rounded-lg'>
                <AccordionTrigger className={`hover:bg-gray-100 dark:hover:bg-gray-800 px-4 py-4 rounded-lg transition-colors ${orbitron.className}`}><span className="text-lg font-semibold capitalize">Add Single Colored Pie</span>  </AccordionTrigger>
                <AccordionContent className="px-4"><AddSingleColoredPieChart graphId={elements[focusedElementIndex]?.graphId} /></AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="legend" className='border rounded-lg'>
                <AccordionTrigger className={`hover:bg-gray-100 dark:hover:bg-gray-800 px-4 py-4 rounded-lg transition-colors ${orbitron.className}`}><span className="text-lg font-semibold capitalize">Add Legend</span>  </AccordionTrigger>
                <AccordionContent className="px-4"><AddLegend graphId={elements[focusedElementIndex]?.graphId} /></AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="tooltip" className='border rounded-lg'>
                <AccordionTrigger className={`hover:bg-gray-100 dark:hover:bg-gray-800 px-4 py-4 rounded-lg transition-colors ${orbitron.className}`}><span className="text-lg font-semibold capitalize">Add Tool Tip</span>  </AccordionTrigger>
                <AccordionContent className="px-4"><AddToolTip graphId={elements[focusedElementIndex]?.graphId} /></AccordionContent>
              </AccordionItem>
            </Accordion>
            }

            {
              elements[focusedElementIndex]?.type == 'radialBarGraph' &&

              <Accordion type="single" collapsible className="w-full grid gap-y-4 px-10">
                <AccordionItem value="radial-bar" className='border rounded-lg'>
                  <AccordionTrigger  className={`hover:bg-gray-100 dark:hover:bg-gray-800 px-4 py-4 rounded-lg transition-colors ${orbitron.className}`}><span className="text-lg font-semibold capitalize">Add Radial BarGraph</span>  </AccordionTrigger>
                  <AccordionContent className="px-4"><AddRadialBarChart graphId={elements[focusedElementIndex]?.graphId} /></AccordionContent>
                </AccordionItem>

                <AccordionItem value="legend" className='border rounded-lg'>
                  <AccordionTrigger  className={`hover:bg-gray-100 dark:hover:bg-gray-800 px-4 py-4 rounded-lg transition-colors ${orbitron.className}`}><span className="text-lg font-semibold capitalize">Add Legend</span> </AccordionTrigger>
                  <AccordionContent className="px-4"><AddLegend graphId={elements[focusedElementIndex]?.graphId} /></AccordionContent>
                </AccordionItem>

                <AccordionItem value="tooltip" className='border rounded-lg'>
                  <AccordionTrigger  className={`hover:bg-gray-100 dark:hover:bg-gray-800 px-4 py-4 rounded-lg transition-colors ${orbitron.className}`}><span className="text-lg font-semibold capitalize">Add Tool Tip</span> </AccordionTrigger>
                  <AccordionContent className="px-4"><AddToolTip graphId={elements[focusedElementIndex]?.graphId} /></AccordionContent>
                </AccordionItem>
              </Accordion>
            }

            {
              elements[focusedElementIndex]?.type == 'radarGraph' &&

              <Accordion type="single" collapsible className="w-full grid gap-y-4 px-10">

                <AccordionItem value="polar-grid" className='border rounded-lg'>
                  <AccordionTrigger  className={`hover:bg-gray-100 dark:hover:bg-gray-800 px-4 py-4 rounded-lg transition-colors ${orbitron.className}`}><span className="text-lg font-semibold capitalize">Add Polar Grid</span> </AccordionTrigger>
                  <AccordionContent className="px-4"><AddPolarGrid graphId={elements[focusedElementIndex]?.graphId} /></AccordionContent>
                </AccordionItem>

                <AccordionItem value="polar-angle-axis" className='border rounded-lg'>
                  <AccordionTrigger  className={`hover:bg-gray-100 dark:hover:bg-gray-800 px-4 py-4 rounded-lg transition-colors ${orbitron.className}`}><span className="text-lg font-semibold capitalize">Add Polar Angle Axis</span> </AccordionTrigger>
                  <AccordionContent className="px-4"><AddPolarAngleAxis graphId={elements[focusedElementIndex]?.graphId} /></AccordionContent>
                </AccordionItem>

                <AccordionItem value="polar-radius-axis" className='border rounded-lg'>
                  <AccordionTrigger  className={`hover:bg-gray-100 dark:hover:bg-gray-800 px-4 py-4 rounded-lg transition-colors ${orbitron.className}`}><span className="text-lg font-semibold capitalize">Add Polar Radius Axis</span>  </AccordionTrigger>
                  <AccordionContent className="px-4"><AddPolarRadiusAxis graphId={elements[focusedElementIndex]?.graphId} /></AccordionContent>
                </AccordionItem>

                <AccordionItem value="radar" className='border rounded-lg'>
                  <AccordionTrigger  className={`hover:bg-gray-100 dark:hover:bg-gray-800 px-4 py-4 rounded-lg transition-colors ${orbitron.className}`}><span className="text-lg font-semibold capitalize">Add Radar</span>  </AccordionTrigger>
                  <AccordionContent className="px-4"><AddRadar graphId={elements[focusedElementIndex]?.graphId} /></AccordionContent>
                </AccordionItem>

                <AccordionItem value="legend" className='border rounded-lg'>
                  <AccordionTrigger  className={`hover:bg-gray-100 dark:hover:bg-gray-800 px-4 py-4 rounded-lg transition-colors ${orbitron.className}`}><span className="text-lg font-semibold capitalize">Add Legend</span> </AccordionTrigger>
                  <AccordionContent className="px-4"><AddLegend graphId={elements[focusedElementIndex]?.graphId} /></AccordionContent>
                </AccordionItem>

                <AccordionItem value="tooltip" className='border rounded-lg'>
                  <AccordionTrigger  className={`hover:bg-gray-100 dark:hover:bg-gray-800 px-4 py-4 rounded-lg transition-colors ${orbitron.className}`}><span className="text-lg font-semibold capitalize">Add Tool Tip</span> </AccordionTrigger>
                  <AccordionContent className="px-4"><AddToolTip graphId={elements[focusedElementIndex]?.graphId} /></AccordionContent>
                </AccordionItem>
              </Accordion>

            }

          </>
        }

        {
          contextMenuMode == 'Edit' &&

          <>
            <Accordion type="single" value={accordionIsOpen} collapsible className="w-full grid gap-y-4 px-10">
              <AccordionItem value="Graph Add Menu" className='border rounded-lg'>

                <AccordionTrigger onClick={() => {
                  if (accordionIsOpen == "") {
                    setAccordionIsOpen("Graph Add Menu")
                  } else if (accordionIsOpen == "Graph Add Menu") {
                    setAccordionIsOpen("")
                  }
                }} className={`hover:bg-gray-100 dark:hover:bg-gray-800 px-4 py-4 rounded-lg transition-colors ${orbitron.className}`}>
                  <span className="text-lg font-semibold capitalize">{elements[focusedElementIndex]?.type}</span>
                </AccordionTrigger>

                <AccordionContent className="px-4">
                  {elements[focusedElementIndex]?.type == 'cartesianGraph' &&
                    <CreateCartesianGraph planeId={focusedPlaneId} editGraphObject={elements[focusedElementIndex]} />
                  }
                  {elements[focusedElementIndex]?.type == 'pieGraph' &&
                    <CreatePieGraph planeId={focusedPlaneId} editGraphObject={elements[focusedElementIndex]} />
                  }
                  {elements[focusedElementIndex]?.type == 'radarGraph' &&
                    <CreateRadarGraph planeId={focusedPlaneId} editGraphObject={elements[focusedElementIndex]} />
                  }
                  {elements[focusedElementIndex]?.type == 'radialBarGraph' &&
                    <CreateRadialBarGraph planeId={focusedPlaneId} editGraphObject={elements[focusedElementIndex]} />
                  }
                  {elements[focusedElementIndex]?.type == 'textElement' &&
                    <CreateTextComponent planeId={focusedPlaneId} editGraphObject={elements[focusedElementIndex]} />
                  }
                  <Button className='w-full mt-3' variant={"destructive"} id={elements[focusedElementIndex]?.graphId} onClick={(e) => {deleteElementFromElementsArray(e.target.id); setFocusedElementIndex(null); setShowGraphElements(false)}}>Delete</Button>
                </AccordionContent>
              </AccordionItem>
            </Accordion>


            {graphElements.filter((d) => {

              return elements[focusedElementIndex]?.graphId == d.graphId

            }).filter((d) => d.isdeleted == false)
              .map((currItem, index) => (
                
                  <Accordion key={index} type="single" collapsible  className="w-full grid gap-y-4 px-10">
                    <AccordionItem value="Graph Add Menu" className='border rounded-lg'>
                      <AccordionTrigger className={` hover:bg-gray-100 dark:hover:bg-gray-800 px-4 py-4 rounded-lg transition-colors ${orbitron.className}`}>
                        <span className="text-lg font-semibold capitalize">{currItem?.type}</span>
                      </AccordionTrigger>
                      <AccordionContent className="px-4">
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
                          <AddCartesianGrid graphId={currItem?.graphId} editGraphObject={currItem} />}
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
                        <Button variant={'destructive'} id={currItem?.graphId} className='w-full mt-3' onClick={() => deleteElementFromGraphElementsArray(currItem)}>Delete</Button>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
              
              ))

            }
          </>
        }




      </div>



      <div
        className={`fixed top-0 z-50 h-full w-[32rem] shadow-2xl px-4 gap-y-4 flex flex-col items-center overflow-y-auto scrollbar-thin scrollbar-thumb-foreground scrollbar-track-background ${showAddGraphList ? 'right-0' : '-right-[42rem]'
          } transition-all duration-300 ease-in-out bg-[#f2f2f2] dark:bg-popover shadow-2xl shadow-chart-3`}
      >
        {/* Header */}
        <div className="flex items-center mt-8 mb-0.5 justify-between w-full">
          <button
            className="w-fit p-0 bg-transparent ml-2"
            onClick={() => setShowAddGraphList(!showAddGraphList)}
          >
            <X size={36} className="absolute -translate-y-1/2 bg-red-900 text-white rounded-lg shadow-[0_0_10px_#ff0000]" />
          </button>
          <span className={`m-auto  text-4xl font-bold text-primary block text-center tracking-widest ${orbitron.className}`}>
            Create Graphs
          </span>
        </div>

        <Separator className="h-0.5 mb-2" />



        {/* Accordion for Forms */}
        <Accordion type="multiple" className="w-full grid gap-y-4 px-10">
          {/* Cartesian Graph */}
          <AccordionItem value="cartesian" className='border rounded-lg'>
            <AccordionTrigger className="rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 px-4 py-4  transition-colors">
              <div className={`flex items-center gap-2 ${orbitron.className}`}>
                <span className="text-lg font-semibold">Cartesian Graph</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4">
              <CreateCartesianGraph planeId={focusedPlaneId} />
            </AccordionContent>
          </AccordionItem>

          {/* Pie Graph */}
          <AccordionItem value="pie" className='border rounded-lg'>
            <AccordionTrigger className="hover:bg-gray-100 dark:hover:bg-gray-800 px-4 py-4 rounded-lg transition-colors ">
              <div className={`flex items-center gap-2 ${orbitron.className}`}>
                <span className="text-lg font-semibold">Pie Graph</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4">
              <CreatePieGraph planeId={focusedPlaneId} />
            </AccordionContent>
          </AccordionItem>

          {/* Radial Bar Graph */}
          <AccordionItem value="radialBar" className='border rounded-lg'>
            <AccordionTrigger className="hover:bg-gray-100 dark:hover:bg-gray-800 px-4 py-4 rounded-lg transition-colors">
              <div className={`flex items-center gap-2 ${orbitron.className}`}>
                <span className="text-lg font-semibold">Radial Bar Graph</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4">
              <CreateRadialBarGraph planeId={focusedPlaneId} />
            </AccordionContent>
          </AccordionItem>

          {/* Radar Graph */}
          <AccordionItem value="radar" className='border rounded-lg'>
            <AccordionTrigger className="hover:bg-gray-100 dark:hover:bg-gray-800 px-4 py-4 rounded-lg transition-colors ">
              <div className={`flex items-center gap-2 ${orbitron.className}`}>
                <span className="text-lg font-semibold">Radar Graph</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4">
              <CreateRadarGraph planeId={focusedPlaneId} />
            </AccordionContent>
          </AccordionItem>

          {/* Text Component */}
          <AccordionItem value="text" className='border rounded-lg'>
            <AccordionTrigger className="hover:bg-gray-100 dark:hover:bg-gray-800 px-4 py-4 rounded-lg transition-colors">
              <div className={`flex items-center gap-2 ${orbitron.className}`}>
                <span className="text-lg font-semibold">Text Component</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4">
              <CreateTextComponent planeId={focusedPlaneId} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>





    </div >
  )
}

export default Project