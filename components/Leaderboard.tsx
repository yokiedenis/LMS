// import { useState, useEffect } from 'react';
// import { ClerkProvider, useUser } from '@clerk/nextjs';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// interface LeaderboardUser {
//   id: string;
//   name: string;
//   level: number;
//   points: number;
// }

// export default function Leaderboard() {
//   const [leaderboardData, setLeaderboardData] = useState<LeaderboardUser[]>([]);
//   const { user } = useUser();

//   useEffect(() => {
//     async function fetchLeaderboard() {
//       try {
//         // Fetch leaderboard data from the backend
//         const response = await fetch('/api/leaderboard');
//         const data: LeaderboardUser[] = await response.json();
//         setLeaderboardData(data);
//       } catch (error) {
//         console.error('Error fetching leaderboard data:', error);
//       }
//     }
//     fetchLeaderboard();
//   }, []);

//   return (
//     <div className="leaderboard">
//       <h2 className="text-2xl font-bold text-center my-6">Leaderboard</h2>
//       <table className="w-full text-left border-collapse">
//         <thead>
//           <tr>
//             <th>Rank</th>
//             <th>User</th>
//             <th>Level</th>
//             <th>Points</th>
//           </tr>
//         </thead>
//         <tbody>
//           {leaderboardData.map((user, index) => (
//             <tr key={user.id}>
//               <td>{index + 1}</td>
//               <td>{user.name}</td>
//               <td>{user.level}</td>
//               <td>{user.points}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }







// components/Leaderboard.tsx
import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { motion, AnimatePresence } from 'framer-motion';

interface LeaderboardUser {
  id: string;
  name: string;
  points: number;
  level: number;
  enrolledCourses: number;
  courseTitles: string[];
}

export default function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardUser[]>([]);
  const [filter, setFilter] = useState<'all' | 'enrolled' | 'notEnrolled'>('all');
  const { user } = useUser();

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        const response = await fetch('/api/leaderboard');
        const data: LeaderboardUser[] = await response.json();
        setLeaderboardData(data);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      }
    }
    fetchLeaderboard();
  }, []);

  const filteredData = leaderboardData.filter(user => {
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
            { label: 'Not Enrolled', value: 'notEnrolled' }
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

        <div className="bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-white/10">
          <div className="grid grid-cols-5 gap-4 p-6 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white font-semibold">
            <div>Rank</div>
            <div>User</div>
            <div>Level</div>
            <div>Points</div>
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
                  <span className={`w-8 h-8 flex items-center justify-center rounded-full ${
                    index < 3 
                      ? ['bg-yellow-400', 'bg-gray-400', 'bg-orange-400'][index] 
                      : 'bg-gray-700'
                  } text-white font-bold`}>
                    {index + 1}
                  </span>
                </div>
                <div className="flex items-center text-white font-medium" title={user.courseTitles.join(', ')}>
                  {user.name}
                </div>
                <div className="flex items-center">
                  <span className="px-2 py-1 bg-blue-500/20 rounded text-blue-300">
                    Lvl {user.level}
                  </span>
                </div>
                <div className="flex items-center text-yellow-400 font-semibold">
                  {user.points.toLocaleString()} pts
                </div>
                <div className="flex items-center">
                  <span className="px-2 py-1 bg-green-500/20 rounded text-green-300">
                    {user.enrolledCourses}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredData.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            No users found matching the current filter
          </div>
        )}
      </div>
    </div>
  );
}