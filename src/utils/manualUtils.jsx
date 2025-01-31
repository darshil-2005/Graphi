import * as d3 from 'd3';
import { v4 } from 'uuid';
import { Line, Area, Bar, Scatter, Pie, CartesianGrid, Tooltip, Legend, RadialBar, PolarGrid, PolarRadiusAxis, PolarAngleAxis, Radar, XAxis, YAxis } from 'recharts';

export function isTheElementInGraphElementsArray(graphElementsArray, element) {

  for (let j = 0; j < graphElementsArray.length; j++) {
    if (graphElementsArray[j].type == element) {
      return true;
    }
  }
  return false;
}

export function retrieveGraphObjectIndex(graphId, graphObjectsArray) {
  for (let j = 0; j < graphObjectsArray.length; j++) {
    if (String(graphObjectsArray[j].graphId) == String(graphId))
      return j;
  }
}

export function getAllColumnsOfSpecificDataType(data, dataType) {
  let columns = [];
  data.columns.map((column) => {
    if (typeof data[0][column] == dataType) {
      columns.push(column);
    }
  });
  return columns;
}

export function showContextMenu(e) {
  e.preventDefault();
  const contextMenu = e.target.nextElementSibling;
  contextMenu.classList.toggle('hidden');
}

export function generateId() {
  return String(crypto.randomUUID().replace(/-/g, ''))
}

export async function fileReader(text) {

  return d3.csvParse(text, (row) => {
    const convertedRow = {}
    for (const key in row) {
      if (!isNaN(row[key])) {
        convertedRow[key] = +row[key];
      } else if (Date.parse(row[key])) {
        convertedRow[key] = new Date(row[key]);
      } else {
        convertedRow[key] = row[key];
      }
    }
    return convertedRow;
  });

};

export function hexToRgbA(hex, alpha) {
  hex = hex.replace('#', '');

  if (hex.length === 3) {
    hex = hex.split('').map(char => char + char).join('');
  }

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function createGraphElements(elementObject, index) {

  if (elementObject.type == 'singleColoredPie') {
    return <Pie key={index} data={elementObject.data} dataKey={elementObject.dataKey} nameKey={elementObject.nameKey} cx={elementObject.xCoor} cy={elementObject.yCoor} innerRadius={elementObject.innerRadius} outerRadius={elementObject.outerRadius} fill={elementObject.fillColor} startAngle={elementObject.startAngle} endAngle={elementObject.endAngle} label={elementObject.label} paddingAngle={elementObject.paddingAngle} />
  }

  else if (elementObject.type === 'xAxis') {
    return <XAxis key={index} dataKey={elementObject.dataKey} domain={[elementObject.domainStart, elementObject.domainEnd]} padding={{ left: elementObject.paddingLeft, right: elementObject.paddingRight }} orientation={elementObject.orientation} angle={elementObject.tickAngle} allowDuplicatedCategory={elementObject.allowDuplicateCategories} axisLine={elementObject.showAxisLine} scale={elementObject.scale} unit={elementObject.unit} label={{ value: elementObject.labelText, angle: elementObject.labelAngle, position: elementObject.labelPosition, offset: elementObject.labelOffset }} />
  }

  else if (elementObject.type === 'yAxis') {
    return <YAxis key={index} domain={[elementObject.domainStart, elementObject.domainEnd]} padding={{ left: elementObject.paddingLeft, right: elementObject.paddingRight }} orientation={elementObject.orientation} angle={elementObject.tickAngle} allowDuplicatedCategory={elementObject.allowDuplicateCategories} axisLine={elementObject.showAxisLine} scale={elementObject.scale} unit={elementObject.unit} label={{ value: elementObject.labelText, angle: elementObject.labelAngle, position: elementObject.labelPosition, offset: elementObject.labelOffset }} />
  }

  else if (elementObject.type === 'line') {
    return <Line key={index} type={elementObject.lineType} dataKey={elementObject.dataKey} stroke={elementObject.lineColor} strokeWidth={elementObject.strokeWidth} />
  }

  else if (elementObject.type === 'area') {
    return <Area key={index} type={elementObject.areaType} dataKey={elementObject.dataKey} stroke={elementObject.areaColor} fillOpacity={elementObject.opacity} fill={elementObject.fillColor} />
  }

  else if (elementObject.type === 'bar') {
    return <Bar key={index} dataKey={elementObject.dataKey} fill={elementObject.fill} />
  }

  else if (elementObject.type === 'scatter') {
    return <Scatter key={index} name={elementObject.scatterName} dataKey={elementObject.dataKey} fill={elementObject.fill} legendType={elementObject.legendType} shape={elementObject.shape} />
  }

  else if (elementObject.type === 'radialBarGraph') {
    return <RadialBar key={index} data={elementObject.data} label={{ fill: elementObject.fill, position: elementObject.position }} background={elementObject.background} clockWise={elementObject.clockWise} dataKey={elementObject.dataKey} />
  }

  else if (elementObject.type === 'polarGrid') {
    return <PolarGrid key={index} />
  }

  else if (elementObject.type === 'polarAngleAxis') {
    return <PolarAngleAxis key={index} dataKey={elementObject.dataKey} />
  }

  else if (elementObject.type === 'polarRadiusAxis') {
    return <PolarRadiusAxis key={index} angle={elementObject.angle} domain={[elementObject.domainStart, elementObject.domainEnd]} />
  }

  else if (elementObject.type === 'radar') {
    return <Radar key={index} name={elementObject.name} dataKey={elementObject.dataKey} stroke={elementObject.stroke} fill={elementObject.fill} fillOpacity={elementObject.fillOpacity} />
  }

  else if (elementObject.type === 'cartesianGrid') {
    return <CartesianGrid key={index} stroke={elementObject.cartesianGridColor} />
  }

  else if (elementObject.type === 'legend') {
    return <Legend key={index} />
  }

  else if (elementObject.type === 'toolTip') {
    return <Tooltip key={index} content={elementObject.toolTipHandler} />
  }

}

export function handleMouseDown(e) {
  setFocusedElementIndex(retrieveGraphObjectIndex(e.currentTarget.id, elements));
}

export function handleMouseUp(e) {
  handleResize({ graphId: e.currentTarget.id, height: (e.currentTarget.style.height), width: String(e.currentTarget.style.width) });
}

export function handleDragStart(e) {
  setDraggedElement(e.target.id);
  const i = retrieveGraphObjectIndex(e.target.id, elements);
  e.dataTransfer.setData(
    'text/plain',
    JSON.stringify({
      offsetX: e.clientX - elements[i].left,
      offsetY: e.clientY - elements[i].top,
    })
  );
}

export function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip bg-background/70 border-gray-200 p-3 rounded-lg shadow-lg">
        {label &&
          <p className="label font-semibold">{`${label}`}</p>
        }
        {payload.map((entry, index) => (
          <p key={`tooltip-${index}`} style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value}`}
          </p>
        ))}
      </div>
    );
  }

  return null;
};

