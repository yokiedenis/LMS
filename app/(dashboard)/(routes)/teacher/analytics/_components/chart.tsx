// "use client";

// import {
//     PieChart,
//     Pie,
//     Cell,
//     ResponsiveContainer,
//     Tooltip,
//     Legend,
// } from "recharts";

// import { Card } from "@/components/ui/card";

// interface ChartProps {
//     data: {
//         name: string;
//         total: number;
//     }[];
// }

// export const Chart = ({
//     data
// }: ChartProps) => {
//     // Define a color palette for the pie chart
//     const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF4560'];

//     return (
//         <Card>
//             <div className="bg-[#1e293b] p-6 rounded-lg shadow-lg">
//                 <h2 className="text-xl font-semibold text-white mb-4">Course Progress Distributions</h2>
//                 <ResponsiveContainer width="100%" height={350}>
//                     <PieChart>
//                         <Pie
//                             data={data}
//                             cx="50%"
//                             cy="50%"
//                             labelLine={false}
//                             label={({
//                                 name,
//                                 percent
//                             }) => `${name} (${(percent * 100).toFixed(0)}%)`}
//                             outerRadius={120}
//                             innerRadius={60}
//                             fill="#8884d8"
//                             dataKey="total"
//                             animationDuration={1000} // Smooth animation
//                             animationEasing="ease-in-out" // Advanced animation
//                         >
//                             {data.map((entry, index) => (
//                                 <Cell 
//                                     key={`cell-${index}`} 
//                                     fill={COLORS[index % COLORS.length]} 
//                                 />
//                             ))}
//                         </Pie>
//                         <Tooltip 
//                             contentStyle={{
//                                 backgroundColor: '#1e293b',
//                                 border: 'none',
//                                 borderRadius: '8px',
//                                 color: '#ffffff',
//                             }}
//                         />
//                         <Legend 
//                             iconType="circle"
//                             wrapperStyle={{
//                                 paddingTop: '20px',
//                                 color: '#ffffff',
//                             }}
//                         />
//                     </PieChart>
//                 </ResponsiveContainer>
//             </div>
//         </Card>
//     )
// }

















// "use client";

// import {
//     BarChart,
//     Bar,
//     XAxis,
//     YAxis,
//     CartesianGrid,
//     Tooltip,
//     Legend,
//     ResponsiveContainer,
//     Cell,
// } from "recharts";

// import { Card } from "@/components/ui/card";

// interface ChartProps {
//     data: {
//         name: string;
//         total: number;
//     }[];
// }

// export const Chart = ({
//     data
// }: ChartProps) => {
//     // Define a color palette for the bar chart
//     const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF4560'];

//     return (
//         <Card>
//             <div className="bg-[#1e293b] p-6 rounded-lg shadow-lg">
//                 <h2 className="text-xl font-semibold text-white mb-4">Course Progress Distribution</h2>
//                 <ResponsiveContainer width="100%" height={350}>
//                     <BarChart
//                         data={data}
//                         margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
//                     >
//                         <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
//                         <XAxis 
//                             dataKey="name" 
//                             stroke="#ffffff" 
//                             tick={{ fill: '#ffffff' }} 
//                         />
//                         <YAxis 
//                             stroke="#ffffff" 
//                             tick={{ fill: '#ffffff' }} 
//                         />
//                         <Tooltip 
//                             contentStyle={{
//                                 backgroundColor: '#1e293b',
//                                 border: 'none',
//                                 borderRadius: '8px',
//                                 color: '#ffffff',
//                             }}
//                         />
//                         <Legend 
//                             iconType="circle"
//                             wrapperStyle={{
//                                 paddingTop: '20px',
//                                 color: '#ffffff',
//                             }}
//                         />
//                         <Bar 
//                             dataKey="total"
//                             animationDuration={1000} // Smooth animation
//                             animationEasing="ease-in-out" // Advanced animation
//                         >
//                             {data.map((entry, index) => (
//                                 <Cell 
//                                     key={`cell-${index}`} 
//                                     fill={COLORS[index % COLORS.length]} 
//                                 />
//                             ))}
//                         </Bar>
//                     </BarChart>
//                 </ResponsiveContainer>
//             </div>
//         </Card>
//     );
// };

















"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";
import { Card } from "@/components/ui/card";

interface ChartProps {
  data: {
    name: string;
    total: number;
  }[];
  title?: string;
  className?:string;
}

export const Chart = ({ data, title, className }: ChartProps) => {
  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">{title || "Overview"}</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip 
              formatter={(value) => [`$${value}`, "Revenue"]}
              cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
            />
            <Legend />
            <Bar
              dataKey="total"
              name="Revenue"
              fill="#8884d8"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};




















// "use client";

// import {
//     LineChart,
//     Line,
//     XAxis,
//     YAxis,
//     CartesianGrid,
//     Tooltip,
//     Legend,
//     ResponsiveContainer,
//     Area,
//     AreaChart,
// } from "recharts";

// import { Card } from "@/components/ui/card";

// interface ChartProps {
//     data: {
//         name: string;
//         total: number;
//     }[];
// }

// export const Chart = ({
//     data
// }: ChartProps) => {
//     // Define a color palette for the line chart
//     const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF4560'];

//     return (
//         <Card>
//             <div className="bg-[#1e293b] p-6 rounded-lg shadow-lg">
//                 <h2 className="text-xl font-semibold text-white mb-4">Sales Trend Over Time</h2>
//                 <ResponsiveContainer width="100%" height={350}>
//                     <AreaChart
//                         data={data}
//                         margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
//                     >
//                         <defs>
//                             <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
//                                 <stop offset="5%" stopColor={COLORS[0]} stopOpacity={0.8} />
//                                 <stop offset="95%" stopColor={COLORS[0]} stopOpacity={0} />
//                             </linearGradient>
//                         </defs>
//                         <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
//                         <XAxis 
//                             dataKey="name" 
//                             stroke="#ffffff" 
//                             tick={{ fill: '#ffffff' }} 
//                         />
//                         <YAxis 
//                             stroke="#ffffff" 
//                             tick={{ fill: '#ffffff' }} 
//                         />
//                         <Tooltip 
//                             contentStyle={{
//                                 backgroundColor: '#1e293b',
//                                 border: 'none',
//                                 borderRadius: '8px',
//                                 color: '#ffffff',
//                             }}
//                         />
//                         <Legend 
//                             iconType="circle"
//                             wrapperStyle={{
//                                 paddingTop: '20px',
//                                 color: '#ffffff',
//                             }}
//                         />
//                         <Area 
//                             type="monotone" 
//                             dataKey="total" 
//                             stroke={COLORS[0]} 
//                             fillOpacity={1} 
//                             fill="url(#colorTotal)" 
//                             animationDuration={1000} // Smooth animation
//                             animationEasing="ease-in-out" // Advanced animation
//                         />
//                         <Line 
//                             type="monotone" 
//                             dataKey="total" 
//                             stroke={COLORS[0]} 
//                             strokeWidth={2} 
//                             dot={{ stroke: COLORS[0], strokeWidth: 2, r: 4 }} 
//                             activeDot={{ r: 8 }} 
//                             animationDuration={1000} // Smooth animation
//                             animationEasing="ease-in-out" // Advanced animation
//                         />
//                     </AreaChart>
//                 </ResponsiveContainer>
//             </div>
//         </Card>
//     )
// }