// import React, { useEffect, useState } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
// import { useUsersStore } from "@/store/users";
// import { getDashboardStats } from "@/utils/api";

// type DashboardStats = {
//   totalUsers: number;
//   maleCount: number;
//   femaleCount: number;
//   topUsers: { name: string; progress: number }[];
// };

// const Dashboard: React.FC = () => {
//   const [stats, setStats] = useState<DashboardStats | null>(null);
//   const { users, fetchUsers } = useUsersStore();

//   useEffect(() => {
//     fetchUsers();
//     getDashboardStats().then((data) => setStats(data));
//   }, [fetchUsers]);

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
//       {/* Total Users */}
//       <Card className="p-4">
//         <h2 className="text-xl font-bold">Total Users</h2>
//         <p className="text-3xl font-semibold">{stats?.totalUsers}</p>
//       </Card>
      
//       {/* Gender Distribution */}
//       <Card className="p-4">
//         <h2 className="text-xl font-bold">Gender Distribution</h2>
//         <p>Male: {stats?.maleCount}</p>
//         <p>Female: {stats?.femaleCount}</p>
//       </Card>
      
//       {/* Best Users by Progress */}
//       <Card className="p-4 col-span-2">
//         <h2 className="text-xl font-bold">Top Users by Progress</h2>
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart data={stats?.topUsers || []}>
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip />
//             <Bar dataKey="progress" fill="#4F46E5" />
//           </BarChart>
//         </ResponsiveContainer>
//       </Card>
//     </div>
//   );
// };

// export default Dashboard;
