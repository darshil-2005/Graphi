import React, { useEffect, useState } from 'react';
import { ComposedChart, ResponsiveContainer } from 'recharts';
import AddLineElement from '../createGraphElements/createCartesianGraphElements/addLineElement';
import AddXAxisElement from '../createGraphElements/createCartesianGraphElements/addXAxisElement';
import AddYAxisElement from '../createGraphElements/createCartesianGraphElements/addYAxisElement';
import AddAreaElement from '../createGraphElements/createCartesianGraphElements/addAreaElement';
import AddBarElement from '../createGraphElements/createCartesianGraphElements/addBarElement';
import AddScatterElement from '../createGraphElements/createCartesianGraphElements/addScatterElement';
import AddCartesianGrid from '../createGraphElements/createCartesianGraphElements/addCartesianGrid';
import AddLegend from '../createGraphElements/createCartesianGraphElements/addLegend';
import AddToolTip from '../createGraphElements/createCartesianGraphElements/addToolTip';
import ContextMenuWrapper from '../ui/contextMenuWrapper';
import CommonGraphWrapper from '../ui/commonGraphWrapper';
import { createGraphElements } from '@/utils/manualUtils';
import { retrieveDataFromIndexedDBWithFileId } from '@/utils/manualUtils'
import CreateCartesianGraph from '../createGraph/createCartesianGraph';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/shadcnComponent/popover"
import usePlaneElementsStore from '@/features/store/planeElementsStore';

import { ReferenceLine, Brush } from 'recharts';


function CartesianGraph({ graphObject, index, setDraggedElement, setFocusedElementIndex, editMode }) {

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
    <>
      <CommonGraphWrapper graphObject={graphObject} index={index} setDraggedElement={setDraggedElement} setFocusedElementIndex={setFocusedElementIndex} editMode={editMode}>

        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={data || {}}
            margin={graphObject.margin}
          >
            {
              graphObjectElements.filter((d, i) => {
                return d.graphId == graphObject.graphId

              }).filter((d) => d.isdeleted == false).map((d, i) => {
                return createGraphElements(d, i);
              })
            } 
          </ComposedChart>
        </ResponsiveContainer>
      </CommonGraphWrapper>
    </>
  );
};

export default CartesianGraph;
