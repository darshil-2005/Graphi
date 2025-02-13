"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Rectangle } from 'recharts';
import { CustomTooltip } from '@/utils/manualUtils';

const data = [
  { name: 'A', Revenue: 4000, Likes: 2400, amt: 2400 },
  { name: 'B', Revenue: 3000, Likes: 1398, amt: 2210 },
  { name: 'C', Revenue: 2000, Likes: 9800, amt: 2290 },
  { name: 'D', Revenue: 2780, Likes: 3908, amt: 2000 },
  { name: 'E', Revenue: 1890, Likes: 4800, amt: 2181 },
  { name: 'F', Revenue: 2390, Likes: 3800, amt: 2500 },
  { name: 'G', Revenue: 3490, Likes: 4300, amt: 2100 },
];

export default function BarChartExample() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        {/* <Tooltip content={<CustomTooltip/>}/> */}
        <Legend />
        <Bar dataKey="Likes" fill="#00CED1" opacity={0.8} activeBar={false}/>
        <Bar dataKey="Revenue" fill="#FF4500" opacity={0.8} activeBar={false}/>
      </BarChart>
    </ResponsiveContainer>
  );
}