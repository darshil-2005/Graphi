import React from 'react';
import { hexToRgbA } from '@/utils/manualUtils';
import usePlaneElementsStore from '../../features/store/planeElementsStore.jsx';
import { retrieveGraphObjectIndex } from '@/utils/manualUtils';

const CommonGraphWrapper = ({ children, graphObject, index, setDraggedElement, setFocusedElementIndex, editMode }) => {

    const elements = usePlaneElementsStore((state) => state.planeElements);
    const handleResize = usePlaneElementsStore((state) => state.handleResize);
    
      function handleDragStart(e) {
        setDraggedElement(e.currentTarget.id);
        const i = retrieveGraphObjectIndex(e.currentTarget.id, elements);
        e.dataTransfer.setData(
          'text/plain',
          JSON.stringify({
            offsetX: e.clientX - elements[i].left,
            offsetY: e.clientY - elements[i].top,
          })
        );
      }
    
      function handleMouseDown(e) {
        setFocusedElementIndex(retrieveGraphObjectIndex(e.currentTarget.id, elements));
      }
    
      function handleMouseUp(e) {
        handleResize({ graphId: e.currentTarget.id, height: (e.currentTarget.style.height), width: String(e.currentTarget.style.width) });
      }

    return (
        <>
        <div id={graphObject.graphId}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            style={{
                height: graphObject.height, width: graphObject.width, position: 'absolute', left: graphObject.left, top: graphObject.top, zIndex: graphObject.zIndex, borderRadius: graphObject.borderRadius,
                backgroundColor: hexToRgbA(graphObject.backgroundColor, graphObject.backgroundColorOpacity), resize: `${editMode ? 'both' : 'none'}`, overflow: 'hidden'
            }}>
            {children}
        </div>
        </>
    )
}

export default CommonGraphWrapper