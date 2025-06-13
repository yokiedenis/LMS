// "use client"
// import { useEffect, useState } from 'react';

// interface User {
//   name: string;
//   points: number;
//   level: number; 
// }

// export default function Leaderboard() {
//   const [users, setUsers] = useState<User[]>([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('/api/leaderboard');
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const data = await response.json();
//         // Ensure data is an array before setting state
//         if (Array.isArray(data)) {
//           setUsers(data);
//         } else {
//           console.error('Data is not in expected array format:', data);
//           setUsers([]); // Set to empty array if data is not an array
//         }
//       } catch (error) {
//         console.error('Error fetching leaderboard data:', error);
//         setUsers([]); // Set to empty array on error
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div className="p-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg shadow-lg">
//       <h2 className="text-3xl font-bold text-white mb-6 text-center animate__animated animate__fadeIn">
//         Eduskill Student Leaderboard
//       </h2>
//       <div className="grid grid-cols-4 font-semibold text-yellow-400 border-b-2 pb-3 mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-t-md animate__animated animate__fadeIn animate__delay-1s">
//         <div>Rank</div>
//         <div>User</div>
//         <div>Points</div>
//         <div>Level</div>
//       </div>
//       <div className="overflow-x-auto">
//         {Array.isArray(users) ? (
//           users.map((user, index) => (
//             <div 
//               key={index} 
//               className={`grid grid-cols-4 py-3 px-4 bg-white rounded-lg mb-4 shadow-md transform transition-transform hover:scale-105 duration-300 ease-in-out animate__animated animate__fadeIn animate__delay-${index + 1}s`}
//             >
//               <div className="text-gray-800">#{index + 1}</div>
//               <div className="text-gray-800 font-medium">{user.name}</div>
//               <div className="text-gray-800">{user.points}</div>
//               <div className="text-gray-800">Level {user.level}</div>
//             </div>
//           ))
//         ) : (
//           <p className="text-white text-center">No users data available or error occurred.</p>
//         )}
//       </div>
//     </div>
//   );
// }


// "use client";

// import { useState, useEffect } from 'react';
// import { useUser } from '@clerk/nextjs';
// import { motion, AnimatePresence } from 'framer-motion';

// interface LeaderboardUser {
//   id: string;
//   name: string;
//   points: number;
//   level: number;
//   enrolledCourses: number;
//   courseTitles: string[];
// }

// export default function Leaderboard() {
//   const [leaderboardData, setLeaderboardData] = useState<LeaderboardUser[]>([]);
//   const [filter, setFilter] = useState<'all' | 'enrolled' | 'notEnrolled'>('all');
//   const { user } = useUser();

//   useEffect(() => {
//     async function fetchLeaderboard() {
//       try {
//         const response = await fetch('/api/leaderboard');
//         const data: LeaderboardUser[] = await response.json();
//         setLeaderboardData(data);
//       } catch (error) {
//         console.error('Error fetching leaderboard:', error);
//       }
//     }
//     fetchLeaderboard();
//   }, []);

//   const filteredData = leaderboardData.filter(user => {
//     if (filter === 'enrolled') return user.enrolledCourses > 0;
//     if (filter === 'notEnrolled') return user.enrolledCourses === 0;
//     return true;
//   });

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-5xl mx-auto">
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="text-center mb-12"
//         >
//           <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
//             Global Leaderboard
//           </h2>
//           <p className="mt-2 text-lg text-gray-300">
//             Track your progress and compete with learners worldwide
//           </p>
//         </motion.div>

//         <div className="flex justify-center gap-4 mb-8">
//           {[
//             { label: 'All Users', value: 'all' },
//             { label: 'Enrolled', value: 'enrolled' },
//             { label: 'Not Enrolled', value: 'notEnrolled' }
//           ].map((option) => (
//             <button
//               key={option.value}
//               onClick={() => setFilter(option.value as any)}
//               className={`px-6 py-2 rounded-full font-medium text-sm transition-all duration-300 ${
//                 filter === option.value
//                   ? 'bg-blue-500 text-white shadow-lg'
//                   : 'bg-white/10 text-gray-300 hover:bg-white/20'
//               }`}
//             >
//               {option.label}
//             </button>
//           ))}
//         </div>

//         <div className="bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-white/10">
//           <div className="grid grid-cols-5 gap-4 p-6 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white font-semibold">
//             <div>Rank</div>
//             <div>User</div>
//             <div>Level</div>
//             <div>Points</div>
//             <div>Courses</div>
//           </div>

//           <AnimatePresence>
//             {filteredData.map((user, index) => (
//               <motion.div
//                 key={user.id}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -20 }}
//                 transition={{ delay: index * 0.05 }}
//                 className={`grid grid-cols-5 gap-4 p-6 border-t border-white/10 ${
//                   user.id === user?.id ? 'bg-blue-500/10' : 'hover:bg-white/5'
//                 }`}
//               >
//                 <div className="flex items-center">
//                   <span className={`w-8 h-8 flex items-center justify-center rounded-full ${
//                     index < 3 
//                       ? ['bg-yellow-400', 'bg-gray-400', 'bg-orange-400'][index] 
//                       : 'bg-gray-700'
//                   } text-white font-bold`}>
//                     {index + 1}
//                   </span>
//                 </div>
//                 <div className="flex items-center text-white font-medium" title={user.courseTitles.join(', ')}>
//                   {user.name}
//                 </div>
//                 <div className="flex items-center">
//                   <span className="px-2 py-1 bg-blue-500/20 rounded text-blue-300">
//                     Lvl {user.level}
//                   </span>
//                 </div>
//                 <div className="flex items-center text-yellow-400 font-semibold">
//                   {user.points.toLocaleString()} pts
//                 </div>
//                 <div className="flex items-center">
//                   <span className="px-2 py-1 bg-green-500/20 rounded text-green-300">
//                     {user.enrolledCourses}
//                   </span>
//                 </div>
//               </motion.div>
//             ))}
//           </AnimatePresence>
//         </div>

//         {filteredData.length === 0 && (
//           <div className="text-center py-12 text-gray-400">
//             No users found matching the current filter
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }





// app/components/Leaderboard.tsx
// 'use client';

// import { useState, useEffect } from 'react';
// import { useUser } from '@clerk/nextjs';
// import { motion, AnimatePresence } from 'framer-motion';

// interface LeaderboardUser {
//   id: string;
//   name: string;
//   points: number;
//   level: number;
//   enrolledCourses: number;
//   courseTitles: string[];
// }

// export default function Leaderboard() {
//   const [leaderboardData, setLeaderboardData] = useState<LeaderboardUser[]>([]);
//   const [filter, setFilter] = useState<'all' | 'enrolled' | 'notEnrolled'>('all');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const { user } = useUser();

//   useEffect(() => {
//     async function fetchLeaderboard() {
//       try {
//         setLoading(true);
//         const response = await fetch('/api/leaderboard');
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data: LeaderboardUser[] = await response.json();
//         console.log('Leaderboard data:', data); // Debugging log
//         setLeaderboardData(data);
//         setError(null);
//       } catch (error) {
//         console.error('Error fetching leaderboard:', error);
//         setError('Failed to load leaderboard data');
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchLeaderboard();
//   }, []);

//   const filteredData = leaderboardData.filter((user) => {
//     if (filter === 'enrolled') return user.enrolledCourses > 0;
//     if (filter === 'notEnrolled') return user.enrolledCourses === 0;
//     return true;
//   });

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-5xl mx-auto">
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="text-center mb-12"
//         >
//           <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
//             Global Leaderboard
//           </h2>
//           <p className="mt-2 text-lg text-gray-300">
//             Track your progress and compete with learners worldwide
//           </p>
//         </motion.div>

//         <div className="flex justify-center gap-4 mb-8">
//           {[
//             { label: 'All Users', value: 'all' },
//             { label: 'Enrolled', value: 'enrolled' },
//             { label: 'Not Enrolled', value: 'notEnrolled' },
//           ].map((option) => (
//             <button
//               key={option.value}
//               onClick={() => setFilter(option.value as any)}
//               className={`px-6 py-2 rounded-full font-medium text-sm transition-all duration-300 ${
//                 filter === option.value
//                   ? 'bg-blue-500 text-white shadow-lg'
//                   : 'bg-white/10 text-gray-300 hover:bg-white/20'
//               }`}
//             >
//               {option.label}
//             </button>
//           ))}
//         </div>

//         {loading ? (
//           <div className="text-center text-white py-12">
//             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
//             <p className="mt-4">Loading leaderboard...</p>
//           </div>
//         ) : error ? (
//           <div className="text-center text-red-400 py-12">{error}</div>
//         ) : (
//           <div className="bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-white/10">
//             <div className="grid grid-cols-5 gap-4 p-6 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white font-semibold">
//               <div>Rank</div>
//               <div>User</div>
//               <div>Level</div>
//               <div>Points</div>
//               <div>Courses</div>
//             </div>

//             <AnimatePresence>
//               {filteredData.map((user, index) => (
//                 <motion.div
//                   key={user.id}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -20 }}
//                   transition={{ delay: index * 0.05 }}
//                   className={`grid grid-cols-5 gap-4 p-6 border-t border-white/10 ${
//                     user.id === user?.id ? 'bg-blue-500/10' : 'hover:bg-white/5'
//                   }`}
//                 >
//                   <div className="flex items-center">
//                     <span
//                       className={`w-8 h-8 flex items-center justify-center rounded-full ${
//                         index < 3
//                           ? ['bg-yellow-400', 'bg-gray-400', 'bg-orange-400'][
//                               index
//                             ]
//                           : 'bg-gray-700'
//                       } text-white font-bold`}
//                     >
//                       {index + 1}
//                     </span>
//                   </div>
//                   <div
//                     className="flex items-center text-white font-medium"
//                     title={user.courseTitles.join(', ')}
//                   >
//                     {user.name}
//                   </div>
//                   <div className="flex items-center">
//                     <span className="px-2 py-1 bg-blue-500/20 rounded text-blue-300">
//                       Lvl {user.level}
//                     </span>
//                   </div>
//                   <div className="flex items-center text-yellow-400 font-semibold">
//                     {user.points.toLocaleString()} pts
//                   </div>
//                   <div className="flex items-center">
//                     <span className="px-2 py-1 bg-green-500/20 rounded text-green-300">
//                       {user.enrolledCourses}
//                     </span>
//                   </div>
//                 </motion.div>
//               ))}
//             </AnimatePresence>

//             {filteredData.length === 0 && (
//               <div className="text-center py-12 text-gray-400">
//                 No users found matching the current filter
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }







'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { motion, AnimatePresence } from 'framer-motion';

interface LeaderboardUser {
  id: string;
  name: string;
  totalScore: number; // Changed from points to totalScore to match API
  level: number;
  enrolledCourses: number;
  courseTitles: string[];
}

export default function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardUser[]>([]);
  const [filter, setFilter] = useState<'all' | 'enrolled' | 'notEnrolled'>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        setLoading(true);
        const response = await fetch('/api/leaderboard');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: LeaderboardUser[] = await response.json();
        console.log('Leaderboard data:', data); // Debugging log
        setLeaderboardData(data);
        setError(null);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
        setError('Failed to load leaderboard data');
      } finally {
        setLoading(false);
      }
    }
    fetchLeaderboard();
  }, []);

  const filteredData = leaderboardData.filter((user) => {
    if (filter === 'enrolled') return user.enrolledCourses > 0;
    if (filter === 'notEnrolled') return user.enrolledCourses === 0;
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Global Leaderboard
          </h2>
          <p className="mt-2 text-lg text-gray-300">
            Track your progress and compete with learners worldwide
          </p>
        </motion.div>

        <div className="flex justify-center gap-4 mb-8">
          {[
            { label: 'All Users', value: 'all' },
            { label: 'Enrolled', value: 'enrolled' },
            { label: 'Not Enrolled', value: 'notEnrolled' },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => setFilter(option.value as any)}
              className={`px-6 py-2 rounded-full font-medium text-sm transition-all duration-300 ${
                filter === option.value
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center text-white py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4">Loading leaderboard...</p>
          </div>
        ) : error ? (
          <div className="text-center text-red-400 py-12">{error}</div>
        ) : (
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-white/10">
            <div className="grid grid-cols-5 gap-4 p-6 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white font-semibold">
              <div>Rank</div>
              <div>User</div>
              <div>Level</div>
              <div>Score</div> {/* Updated label from Points to Score */}
              <div>Courses</div>
            </div>

            <AnimatePresence>
              {filteredData.map((user, index) => (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05 }}
                  className={`grid grid-cols-5 gap-4 p-6 border-t border-white/10 ${
                    user.id === user?.id ? 'bg-blue-500/10' : 'hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center">
                    <span
                      className={`w-8 h-8 flex items-center justify-center rounded-full ${
                        index < 3
                          ? ['bg-yellow-400', 'bg-gray-400', 'bg-orange-400'][index]
                          : 'bg-gray-700'
                      } text-white font-bold`}
                    >
                      {index + 1}
                    </span>
                  </div>
                  <div
                    className="flex items-center text-white font-medium"
                    title={user.courseTitles.join(', ')}
                  >
                    {user.name}
                  </div>
                  <div className="flex items-center">
                    <span className="px-2 py-1 bg-blue-500/20 rounded text-blue-300">
                      Lvl {user.level}
                    </span>
                  </div>
                  <div className="flex items-center text-yellow-400 font-semibold">
                    {user.totalScore.toLocaleString()} pts {/* Changed from points to totalScore */}
                  </div>
                  <div className="flex items-center">
                    <span className="px-2 py-1 bg-green-500/20 rounded text-green-300">
                      {user.enrolledCourses}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {filteredData.length === 0 && (
              <div className="text-center py-12 text-gray-400">
                No users found matching the current filter
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}