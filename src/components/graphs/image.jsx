import React from 'react'
import CommonGraphWrapper from '../ui/commonGraphWrapper'
import { ResponsiveContainer } from 'recharts'

const ImageComponent = ({ graphObject, index, setDraggedElement, setFocusedElementIndex, editMode }) => {
  
  return (
    <CommonGraphWrapper graphObject={graphObject} index={index} setDraggedElement={setDraggedElement} setFocusedElementIndex={setFocusedElementIndex} editMode={editMode}>
      <ResponsiveContainer width="100%" height="100%">
        <img src={'/universe.jpg'} className='h-full w-full' alt=""></img>
      </ResponsiveContainer>
    </CommonGraphWrapper>
  )
}

export default ImageComponent