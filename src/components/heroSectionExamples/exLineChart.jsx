"use client"; 

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CustomTooltip } from '../../utils/manualUtils';

const data = [
  { name: 'Jan', Sold: 4000, Left: 2400, amt: 2400 },
  { name: 'Feb', Sold: 3000, Left: 1398, amt: 2210 },
  { name: 'Mar', Sold: 2000, Left: 9800, amt: 2290 },
  { name: 'Apr', Sold: 2780, Left: 3908, amt: 2000 },
  { name: 'May', Sold: 1890, Left: 4800, amt: 2181 },
  { name: 'Jun', Sold: 2390, Left: 3800, amt: 2500 },
  { name: 'Jul', Sold: 3490, Left: 4300, amt: 2100 },
];


export default function LineChartExample() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip content={<CustomTooltip/>}/>
        <Legend />
        <Line type="monotone" dataKey="Left" stroke="#39FF14" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="Sold" stroke="#F08080" />
      </LineChart>
    </ResponsiveContainer>
  );
}