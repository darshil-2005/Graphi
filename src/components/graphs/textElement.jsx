import { hexToRgbA } from '@/utils/manualUtils'
import CommonGraphWrapper from '../ui/commonGraphWrapper'

const TextElement = ({ graphObject, index, setDraggedElement, setFocusedElementIndex, editMode }) => {
    return (
        <CommonGraphWrapper graphObject={graphObject} index={index} setDraggedElement={setDraggedElement} setFocusedElementIndex={setFocusedElementIndex} editMode={editMode}>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: `${hexToRgbA(graphObject.color, graphObject.colorOpacity)}`,
                fontFamily: `${graphObject.fontFamily}`,
                fontSize: `${graphObject.fontSize}px`,
                fontStyle: `${graphObject.fontStyle}`,
                fontWeight: `${graphObject.fontWeight}`,
                letterSpacing: `${graphObject.letterSpacing}px`,
                padding: `${graphObject.padding}`,
                textAlign: `${graphObject.textAlign}`,
                textDecoration: `${graphObject.textDecoration}`,
                textOverflow: `${graphObject.textOverflow}`,
                textTransform: `${graphObject.textTransform}`,
                whiteSpace: `${graphObject.whiteSpace}`,
                wordWrap: `${graphObject.wordWrap}`,
                width: '100%',
                height: '100%'
            }} >{graphObject.text}</div>

        </CommonGraphWrapper>

    )
}

export default TextElement