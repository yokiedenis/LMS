// import React, { useEffect, useState } from 'react';
// import CalendarHeatmap from 'react-calendar-heatmap';
// import 'react-calendar-heatmap/dist/styles.css';

// interface DataEntry {
//   date: string;
//   count: number;
// }

// const Heatmap: React.FC = () => {
//   const [data, setData] = useState<DataEntry[]>([]);

//   useEffect(() => {
//     const fetchHeatmapData = async () => {
//       try {
//         const response = await fetch('/api/heatmap');
//         const { quizAttempts, userProgress } = await response.json();
  
//         // Transform data for heatmap
//         const combinedData = [...quizAttempts, ...userProgress].map((entry) => ({
//           date: new Date(entry.createdAt).toISOString().split('T')[0],
//           count: 1, // Can be adjusted to indicate weight based on criteria
//         }));
  
//         const aggregatedData = combinedData.reduce((acc: Record<string, number>, curr) => {
//           acc[curr.date] = (acc[curr.date] || 0) + curr.count;
//           return acc;
//         }, {} as Record<string, number>);
  
//         const heatmapData = Object.keys(aggregatedData).map((date) => ({
//           date,
//           count: aggregatedData[date],
//         }));
  
//         setData(heatmapData);
//       } catch (error) {
//         console.error('Error fetching heatmap data:', error);
//       }
//     };
  
//     fetchHeatmapData();
//   }, []);
  
//   return (
//     <div>
//       <h2 className="text-center text-xl font-bold mb-4">Student Activity Heatmap</h2>
//       <CalendarHeatmap
//         startDate={new Date(new Date().setFullYear(new Date().getFullYear() - 1))}
//         endDate={new Date()}
//         values={data}
//         classForValue={(value) => {
//           if (!value) {
//             return 'color-empty';
//           }
//           return `color-scale-${Math.min(value.count, 4)}`; // Adjust scale classes
//         }}
//       />
//     </div>
//   );
// };

// export default Heatmap;
