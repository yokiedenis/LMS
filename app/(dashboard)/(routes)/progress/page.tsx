// "use client";

// import { useEffect, useState } from "react";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { Progress } from "@/components/ui/progress";
// import { Badge } from "@/components/ui/badge";
// import { useUser, useAuth } from "@clerk/nextjs";

// interface LeaderboardUser {
//   id: string;
//   name: string;
//   level: number;
//   points: number;
// }

// interface UserStats {
//   completionPercentage: number;
//   totalCourses: number;
//   coursesCompleted: number;
//   liveClassesAttended: number;
//   hoursSpent: string;
//   quizzesPracticed: number;
// }

// export default function ProgressPage() {
//   const { user } = useUser();
//   const { getToken } = useAuth();
//   const [progressData, setProgressData] = useState<{
//     completionPercentage: number;
//     totalChapters: number;
//     completedChapters: number;
//   } | null>(null);
//   const [leaderboardData, setLeaderboardData] = useState<LeaderboardUser[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [noCoursesAlert, setNoCoursesAlert] = useState(false);
//   const [totalCourses, setTotalCourses] = useState(0);
//   const [coursesCompleted, setCoursesCompleted] = useState(0);
//   const [liveClassesAttended, setLiveClassesAttended] = useState(0);
//   const [hoursSpent, setHoursSpent] = useState(0);
//   const [quizzesPracticed, setQuizzesPracticed] = useState(0);
//   const [assignmentsDone, setAssignmentsDone] = useState(0);
//   const [quizAssignments, setQuizAssignments] = useState<any[]>([]);
//   const [pendingQuizzesData, setPendingQuizzesData] = useState<any[]>([]);
//   const [isEnrolled, setIsEnrolled] = useState(false);
//   const [purchases, setPurchases] = useState<any[]>([]);
//   const [userProgress, setUserProgress] = useState<any[]>([]);
//   const [quizResults, setQuizResults] = useState<any[]>([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       if (!user?.id) return;

//       try {
//         setLoading(true);
//         const token = await getToken();

//         // Single API call for all progress data
//         const statsResponse = await fetch(`/api/progress-stats`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         if (!statsResponse.ok) throw new Error("Failed to fetch progress data");
//         const statsData = await statsResponse.json();
//         console.log("Progress Stats Data:", statsData); // Debug log

//         // Set all state from single response
//         setProgressData({
//           completionPercentage: statsData.completionPercentage,
//           totalChapters: 0, // Not used in display
//           completedChapters: 0, // Not used in display
//         });
        
//         setTotalCourses(statsData.totalCourses);
//         setCoursesCompleted(statsData.coursesCompleted);
//         setLiveClassesAttended(statsData.liveClassesAttended);
//         setHoursSpent(parseFloat(statsData.hoursSpent));
//         setQuizzesPracticed(statsData.quizzesPracticed);
//         setIsEnrolled(statsData.totalCourses > 0);

//         if (statsData.totalCourses === 0) {
//           setNoCoursesAlert(true);
//           setTimeout(() => setNoCoursesAlert(false), 3000);
//         }

//         // Fetch purchases to display course details in the table
//         const purchasesResponse = await fetch(`/api/purchases/coursecheck?userId=${user.id}`, {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (!purchasesResponse.ok) throw new Error("Failed to fetch purchases");
//         const purchasesData = await purchasesResponse.json();
//         setPurchases(purchasesData);

//         // Fetch user progress for course details
//         const progressResponse = await fetch(`/api/user-progress?userId=${user.id}`, {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (!progressResponse.ok) throw new Error("Failed to fetch user progress");
//         const progressData = await progressResponse.json();
//         setUserProgress(progressData);

//         // Fetch quiz results for overall scores in the table
//         const quizResultsResponse = await fetch(`/api/chapter-quiz-results?userId=${user.id}`, {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (!quizResultsResponse.ok) {
//           console.warn("Quiz results not found, skipping...");
//           setQuizResults([]);
//         } else {
//           const quizResultsData = await quizResultsResponse.json();
//           setQuizResults(quizResultsData);
//         }

//         // Fetch leaderboard data
//         const leaderboardResponse = await fetch("/api/leaderboard", {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (!leaderboardResponse.ok) throw new Error("Failed to fetch leaderboard data");
//         const leaderboard = await leaderboardResponse.json();
//         setLeaderboardData(leaderboard);

//       } catch (error) {
//         console.error("[FETCH_PROGRESS]", error);
//         setProgressData({ completionPercentage: 0, totalChapters: 0, completedChapters: 0 });
//         setTotalCourses(0);
//         setCoursesCompleted(0);
//         setLiveClassesAttended(0);
//         setHoursSpent(0);
//         setQuizzesPracticed(0);
//         setAssignmentsDone(0);
//         setQuizAssignments([]);
//         setPendingQuizzesData([]);
//         setIsEnrolled(false);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [user?.id, getToken]);

//   if (loading) return <div className="flex justify-center items-center h-screen text-gray-600">Loading...</div>;

//   if (!progressData || !user?.id) return <div className="text-center text-red-500">Error loading progress</div>;

//   const achievements = ["Top Learner", "Course Master"];

//   const upcomingClasses = [
//     { title: "Data Analytics - Class 5", subject: "Python", date: "15th June, 2025", time: "12:00PM", timeLeft: "4 hr left", instructor: "Mr Anirud" },
//     { title: "Machine Learning And AI", subject: "AI ", date: "16th June, 2025", time: "12:00PM", timeLeft: "4 hr left", instructor: "Mr Ambrose" },
//   ];

//   return (
//     <div className="min-h-screen bg-[#F5F7FA] p-6">
//       {/* Notification Banner */}
//       <div className="bg-[#E6F7E5] text-[#1F2A44] p-4 rounded-xl mb-6 flex justify-between items-center">
//         <p className="text-sm">
//           Great effort so far Hustler! Keep up the hard work, and with a bit more focus on your attendance, you’re sure to reach your full potential! 😊
//         </p>
//         <button className="text-[#6B7280] hover:text-[#1F2A44]">×</button>
//       </div>

//       {/* Alert for No Courses Enrolled */}
//       {noCoursesAlert && (
//         <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded mb-6 animate-fade-out">
//           <p className="text-sm">No courses enrolled yet!</p>
//         </div>
//       )}

//       {/* Stats Section */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
//         {/* Overall Performance */}
//         <Card className="bg-white rounded-xl shadow-sm">
//           <CardHeader className="p-4">
//             <CardTitle className="text-sm font-medium text-[#6B7280] mb-2">Overall performance</CardTitle>
//           </CardHeader>
//           <CardContent className="p-4 flex flex-col items-center">
//             <div className="relative w-32 h-32">
//               <svg className="w-full h-full" viewBox="0 0 100 100">
//                 <circle cx="50" cy="50" r="45" fill="none" stroke="#E5E7EB" strokeWidth="10" />
//                 <circle
//                   cx="50"
//                   cy="50"
//                   r="45"
//                   fill="none"
//                   stroke="#34C759"
//                   strokeWidth="10"
//                   strokeDasharray={`${progressData.completionPercentage * 2.83} 283`}
//                   transform="rotate(-90 50 50)"
//                 />
//               </svg>
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <p className="text-2xl font-bold text-[#1F2A44]">{progressData.completionPercentage}%</p>
//               </div>
//             </div>
//             <p className="text-sm font-semibold text-[#1F2A44] mt-2">Pro learner</p>
//           </CardContent>
//         </Card>

//         {/* Total Enroll Courses */}
//         <Card className="bg-white rounded-xl shadow-sm">
//           <CardHeader className="p-4">
//             <CardTitle className="text-sm font-medium text-[#6B7280] mb-2">Total enroll courses</CardTitle>
//           </CardHeader>
//           <CardContent className="p-4 flex items-center justify-between">
//             <div className="relative w-16 h-16">
//               <svg className="w-full h-full" viewBox="0 0 100 100">
//                 <circle cx="50" cy="50" r="45" fill="none" stroke="#E5E7EB" strokeWidth="10" />
//                 <circle
//                   cx="50"
//                   cy="50"
//                   r="45"
//                   fill="none"
//                   stroke="#34C759"
//                   strokeWidth="10"
//                   strokeDasharray="283 283"
//                   transform="rotate(-90 50 50)"
//                 />
//               </svg>
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <p className="text-xl font-bold text-[#1F2A44]">{totalCourses}</p>
//               </div>
//             </div>
//             <p className="text-sm text-[#6B7280]">Course completed: {coursesCompleted}</p>
//           </CardContent>
//         </Card>

//         {/* Live Class Attended */}
//         <Card className="bg-white rounded-xl shadow-sm">
//           <CardHeader className="p-4">
//             <CardTitle className="text-sm font-medium text-[#6B7280] mb-2">Live class attended</CardTitle>
//           </CardHeader>
//           <CardContent className="p-4 flex items-center justify-between">
//             <div className="relative w-16 h-16">
//               <svg className="w-full h-full" viewBox="0 0 100 100">
//                 <circle cx="50" cy="50" r="45" fill="none" stroke="#E5E7EB" strokeWidth="10" />
//                 <circle
//                   cx="50"
//                   cy="50"
//                   r="45"
//                   fill="none"
//                   stroke="#A5B4FC"
//                   strokeWidth="10"
//                   strokeDasharray={`${liveClassesAttended * 2.83} 283`}
//                   transform="rotate(-90 50 50)"
//                 />
//               </svg>
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <p className="text-xl font-bold text-[#1F2A44]">{liveClassesAttended}%</p>
//               </div>
//             </div>
//             <p className="text-sm text-[#6B7280]">Hours spent: {hoursSpent}h</p>
//           </CardContent>
//         </Card>

//         {/* Quizzes Practiced */}
//         <Card className="bg-white rounded-xl shadow-sm">
//           <CardHeader className="p-4">
//             <CardTitle className="text-sm font-medium text-[#6B7280] mb-2">Quiz practiced</CardTitle>
//           </CardHeader>
//           <CardContent className="p-4 flex items-center justify-between">
//             <div className="relative w-16 h-16">
//               <svg className="w-full h-full" viewBox="0 0 100 100">
//                 <circle cx="50" cy="50" r="45" fill="none" stroke="#E5E7EB" strokeWidth="10" />
//                 <circle
//                   cx="50"
//                   cy="50"
//                   r="45"
//                   fill="none"
//                   stroke="#FECACA"
//                   strokeWidth="10"
//                   strokeDasharray={`${(quizzesPracticed / (quizzesPracticed + 5)) * 283} 283`}
//                   transform="rotate(-90 50 50)"
//                 />
//               </svg>
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <p className="text-xl font-bold text-[#1F2A44]">{quizzesPracticed}</p>
//               </div>
//             </div>
//             <p className="text-sm text-[#6B7280]">Assignment done: {assignmentsDone}</p>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Main Content */}
//       <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
//         {/* Left Section: Upcoming Classes and Total Courses */}
//         <div className="lg:col-span-3 space-y-6">
//           {/* Upcoming Classes */}
//           <Card className="bg-white rounded-xl shadow-sm">
//             <CardHeader className="p-4">
//               <CardTitle className="text-lg font-semibold text-[#1F2A44]">Upcoming Live classes</CardTitle>
//             </CardHeader>
//             <CardContent className="p-4 space-y-4">
//               {upcomingClasses.map((classItem, index) => (
//                 <div key={index} className="flex items-center justify-between p-4 bg-[#F9FAFB] rounded-lg">
//                   <div className="flex items-center space-x-4">
//                     <img src="/data science.png" alt="Class" className="w-12 h-12 rounded-lg" />
//                     <div>
//                       <p className="text-sm font-medium text-[#1F2A44]">{classItem.title}</p>
//                       <p className="text-xs text-[#6B7280]">{classItem.subject}</p>
//                       <p className="text-xs text-[#6B7280]">{classItem.instructor}</p>
//                     </div>
//                   </div>
//                   <div className="text-right">
//                     <p className="text-sm text-[#1F2A44]">{classItem.date}, {classItem.time}</p>
//                     <p className="text-xs text-[#EF4444]">{classItem.timeLeft}</p>
//                                                 <a
//                               href="https://app.zoom.us/wc"
//                               target="_blank"
//                               rel="noopener noreferrer"
//                             >
//                                   <button className="mt-2 px-4 py-1 bg-[#34C759] text-white text-sm rounded-lg hover:bg-[#2ea44f] transition-colors">
//                                     Join
//                                   </button>
//                                 </a>

//                   </div>
//                 </div>
//               ))}
//             </CardContent>
//           </Card>

//           {/* Total Courses */}
//           <Card className="bg-white rounded-xl shadow-sm">
//             <CardHeader className="p-4">
//               <CardTitle className="text-lg font-semibold text-[#1F2A44]">Total courses ({totalCourses})</CardTitle>
//             </CardHeader>
//             <CardContent className="p-4">
//               <table className="w-full text-left border-collapse">
//                 <thead>
//                   <tr className="border-b border-[#E5E7EB]">
//                     <th className="p-3 text-sm font-medium text-[#6B7280]">Course name</th>
//                     <th className="p-3 text-sm font-medium text-[#6B7280]">Progress</th>
//                     <th className="p-3 text-sm font-medium text-[#6B7280]">Overall score</th>
//                     <th className="p-3 text-sm font-medium text-[#6B7280]">Status</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {isEnrolled && totalCourses > 0 ? (
//                     purchases.map((purchase, index) => {
//                       const courseProgress = userProgress.filter((p) => p.courseId === purchase.courseId);
//                       const completedChapters = courseProgress.filter((p) => p.isCompleted).length;
//                       const totalChaptersForCourse = progressData?.totalChapters || 0;
//                       const progressPercentage =
//                         totalChaptersForCourse > 0
//                           ? Math.round((completedChapters / totalChaptersForCourse) * 100)
//                           : 0;
//                       const status =
//                         courseProgress.length > 0 && courseProgress.every((p) => p.isCompleted)
//                           ? "Completed"
//                           : "In progress";
//                       const courseQuizResults = quizResults.filter((q) => q.courseId === purchase.courseId);
//                       const overallScore =
//                         courseQuizResults.length > 0
//                           ? Math.round(
//                               courseQuizResults.reduce((sum, q) => sum + (q.score / q.total) * 100, 0) /
//                                 courseQuizResults.length
//                             )
//                           : 0;

//                       return (
//                         <tr key={index} className="border-b border-[#E5E7EB] hover:bg-[#F9FAFB]">
//                           <td className="p-3 flex items-center space-x-2">
//                             <span
//                               className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${
//                                 purchase.course?.title?.startsWith("Physics")
//                                   ? "bg-[#F97316]"
//                                   : purchase.course?.title?.startsWith("Chemistry")
//                                   ? "bg-[#3B82F6]"
//                                   : "bg-[#22C55E]"
//                               }`}
//                             >
//                               {purchase.course?.title?.charAt(0) || "C"}
//                             </span>
//                             <span className="text-sm text-[#1F2A44]">{purchase.course?.title || "Unknown Course"}</span>
//                           </td>
//                           <td className="p-3">
//                             <Progress value={progressPercentage} className="w-[60%]" />
//                             <span className="ml-2 text-sm text-[#6B7280]">{progressPercentage}%</span>
//                           </td>
//                           <td className="p-3 text-sm text-[#1F2A44]">{overallScore}%</td>
//                           <td className="p-3">
//                             <Badge
//                               variant={status === "Completed" ? "default" : "secondary"}
//                               className={
//                                 status === "Completed"
//                                   ? "bg-[#34C759] text-white"
//                                   : "bg-[#E5E7EB] text-[#6B7280]"
//                               }
//                             >
//                               {status}
//                             </Badge>
//                           </td>
//                         </tr>
//                       );
//                     })
//                   ) : (
//                     <tr>
//                       <td colSpan={4} className="p-3 text-center text-[#6B7280]">
//                         No courses enrolled yet.
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Right Section: Leaderboard */}
//         <div className="lg:col-span-1">
//           <Card className="bg-white rounded-xl shadow-sm">
//             <CardHeader className="p-4">
//               <CardTitle className="text-lg font-semibold text-[#1F2A44]">Leaderboard</CardTitle>
//             </CardHeader>
//             <CardContent className="p-4">
//               {leaderboardData.length > 0 ? (
//                 leaderboardData.map((leader, index) => (
//                   <div
//                     key={leader.id}
//                     className="flex items-center justify-between py-2 border-b border-[#E5E7EB] last:border-b-0"
//                   >
//                     <div className="flex items-center space-x-2">
//                       <span className="w-6 h-6 rounded-full bg-[#34C759] flex items-center justify-center text-white text-xs">
//                         {index + 1}
//                       </span>
//                       <span className="text-sm text-[#1F2A44]">{leader.name}</span>
//                     </div>
//                     <span className="text-sm text-[#6B7280]">{leader.points} pts</span>
//                   </div>
//                 ))
//               ) : (
//                 <p className="text-sm text-[#6B7280]">No leaderboard data available.</p>
//               )}
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// }




// 'use client';

// import { useEffect, useState } from "react";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { Progress } from "@/components/ui/progress";
// import { Badge } from "@/components/ui/badge";
// import { useUser, useAuth } from "@clerk/nextjs";

// interface LeaderboardUser {
//   id: string;
//   name: string;
//   level: number;
//   totalScore: number; // Changed from points to totalScore to match API
// }

// interface UserStats {
//   completionPercentage: number;
//   totalCourses: number;
//   coursesCompleted: number;
//   liveClassesAttended: number;
//   hoursSpent: string;
//   quizzesPracticed: number;
// }

// export default function ProgressPage() {
//   const { user } = useUser();
//   const { getToken } = useAuth();
//   const [progressData, setProgressData] = useState<{
//     completionPercentage: number;
//     totalChapters: number;
//     completedChapters: number;
//   } | null>(null);
//   const [leaderboardData, setLeaderboardData] = useState<LeaderboardUser[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [noCoursesAlert, setNoCoursesAlert] = useState(false);
//   const [totalCourses, setTotalCourses] = useState(0);
//   const [coursesCompleted, setCoursesCompleted] = useState(0);
//   const [liveClassesAttended, setLiveClassesAttended] = useState(0);
//   const [hoursSpent, setHoursSpent] = useState(0);
//   const [quizzesPracticed, setQuizzesPracticed] = useState(0);
//   const [assignmentsDone, setAssignmentsDone] = useState(0);
//   const [quizAssignments, setQuizAssignments] = useState<any[]>([]);
//   const [pendingQuizzesData, setPendingQuizzesData] = useState<any[]>([]);
//   const [isEnrolled, setIsEnrolled] = useState(false);
//   const [purchases, setPurchases] = useState<any[]>([]);
//   const [userProgress, setUserProgress] = useState<any[]>([]);
//   const [quizResults, setQuizResults] = useState<any[]>([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       if (!user?.id) return;

//       try {
//         setLoading(true);
//         const token = await getToken();

//         // Single API call for all progress data
//         const statsResponse = await fetch(`/api/progress-stats`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         if (!statsResponse.ok) throw new Error("Failed to fetch progress data");
//         const statsData = await statsResponse.json();
//         console.log("Progress Stats Data:", statsData); // Debug log

//         // Set all state from single response
//         setProgressData({
//           completionPercentage: statsData.completionPercentage,
//           totalChapters: 0, // Not used in display
//           completedChapters: 0, // Not used in display
//         });
        
//         setTotalCourses(statsData.totalCourses);
//         setCoursesCompleted(statsData.coursesCompleted);
//         setLiveClassesAttended(statsData.liveClassesAttended);
//         setHoursSpent(parseFloat(statsData.hoursSpent));
//         setQuizzesPracticed(statsData.quizzesPracticed);
//         setIsEnrolled(statsData.totalCourses > 0);

//         if (statsData.totalCourses === 0) {
//           setNoCoursesAlert(true);
//           setTimeout(() => setNoCoursesAlert(false), 3000);
//         }

//         // Fetch purchases to display course details in the table
//         const purchasesResponse = await fetch(`/api/purchases/coursecheck?userId=${user.id}`, {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (!purchasesResponse.ok) throw new Error("Failed to fetch purchases");
//         const purchasesData = await purchasesResponse.json();
//         setPurchases(purchasesData);

//         // Fetch user progress for course details
//         const progressResponse = await fetch(`/api/user-progress?userId=${user.id}`, {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (!progressResponse.ok) throw new Error("Failed to fetch user progress");
//         const progressData = await progressResponse.json();
//         setUserProgress(progressData);

//         // Fetch quiz results for overall scores in the table
//         const quizResultsResponse = await fetch(`/api/chapter-quiz-results?userId=${user.id}`, {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (!quizResultsResponse.ok) {
//           console.warn("Quiz results not found, skipping...");
//           setQuizResults([]);
//         } else {
//           const quizResultsData = await quizResultsResponse.json();
//           setQuizResults(quizResultsData);
//         }

//         // Fetch leaderboard data
//         const leaderboardResponse = await fetch("/api/leaderboard", {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (!leaderboardResponse.ok) throw new Error("Failed to fetch leaderboard data");
//         const leaderboard = await leaderboardResponse.json();
//         setLeaderboardData(leaderboard);

//       } catch (error) {
//         console.error("[FETCH_PROGRESS]", error);
//         setProgressData({ completionPercentage: 0, totalChapters: 0, completedChapters: 0 });
//         setTotalCourses(0);
//         setCoursesCompleted(0);
//         setLiveClassesAttended(0);
//         setHoursSpent(0);
//         setQuizzesPracticed(0);
//         setAssignmentsDone(0);
//         setQuizAssignments([]);
//         setPendingQuizzesData([]);
//         setIsEnrolled(false);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [user?.id, getToken]);

//   if (loading) return <div className="flex justify-center items-center h-screen text-gray-600">Loading...</div>;

//   if (!progressData || !user?.id) return <div className="text-center text-red-500">Error loading progress</div>;

//   const achievements = ["Top Learner", "Course Master"];

//   const upcomingClasses = [
//     { title: "No Upcoming Live Classes yet", subject: "Coming Soon...", date: " ", time: " ", timeLeft: " ", instructor: " " },
//     { title: "No Upcoming Live Classes yet", subject: "Coming Soon...", date: " ", time: " ", timeLeft: " ", instructor: " " },
//   ];

//   return (
//     <div className="min-h-screen bg-[#F5F7FA] p-6">
//       {/* Notification Banner */}
//       <div className="bg-[#E6F7E5] text-[#1F2A44] p-4 rounded-xl mb-6 flex justify-between items-center">
//         <p className="text-sm">
//           Great effort so far Hustler! Keep up the hard work, and with a bit more focus on your attendance, you’re sure to reach your full potential! 😊
//         </p>
//         <button className="text-[#6B7280] hover:text-[#1F2A44]">×</button>
//       </div>

//       {/* Alert for No Courses Enrolled */}
//       {noCoursesAlert && (
//         <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded mb-6 animate-fade-out">
//           <p className="text-sm">No courses enrolled yet!</p>
//         </div>
//       )}

//       {/* Stats Section */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
//         {/* Overall Performance */}
//         <Card className="bg-white rounded-xl shadow-sm">
//           <CardHeader className="p-4">
//             <CardTitle className="text-sm font-medium text-[#6B7280] mb-2">Overall performance</CardTitle>
//           </CardHeader>
//           <CardContent className="p-4 flex flex-col items-center">
//             <div className="relative w-32 h-32">
//               <svg className="w-full h-full" viewBox="0 0 100 100">
//                 <circle cx="50" cy="50" r="45" fill="none" stroke="#E5E7EB" strokeWidth="10" />
//                 <circle
//                   cx="50"
//                   cy="50"
//                   r="45"
//                   fill="none"
//                   stroke="#34C759"
//                   strokeWidth="10"
//                   strokeDasharray={`${progressData.completionPercentage * 2.83} 283`}
//                   transform="rotate(-90 50 50)"
//                 />
//               </svg>
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <p className="text-2xl font-bold text-[#1F2A44]">{progressData.completionPercentage}%</p>
//               </div>
//             </div>
//             <p className="text-sm font-semibold text-[#1F2A44] mt-2">Pro learner</p>
//           </CardContent>
//         </Card>

//         {/* Total Enroll Courses */}
//         <Card className="bg-white rounded-xl shadow-sm">
//           <CardHeader className="p-4">
//             <CardTitle className="text-sm font-medium text-[#6B7280] mb-2">Total enroll courses</CardTitle>
//           </CardHeader>
//           <CardContent className="p-4 flex items-center justify-between">
//             <div className="relative w-16 h-16">
//               <svg className="w-full h-full" viewBox="0 0 100 100">
//                 <circle cx="50" cy="50" r="45" fill="none" stroke="#E5E7EB" strokeWidth="10" />
//                 <circle
//                   cx="50"
//                   cy="50"
//                   r="45"
//                   fill="none"
//                   stroke="#34C759"
//                   strokeWidth="10"
//                   strokeDasharray="283 283"
//                   transform="rotate(-90 50 50)"
//                 />
//               </svg>
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <p className="text-xl font-bold text-[#1F2A44]">{totalCourses}</p>
//               </div>
//             </div>
//             <p className="text-sm text-[#6B7280]">Course completed: {coursesCompleted}</p>
//           </CardContent>
//         </Card>

//         {/* Live Class Attended */}
//         <Card className="bg-white rounded-xl shadow-sm">
//           <CardHeader className="p-4">
//             <CardTitle className="text-sm font-medium text-[#6B7280] mb-2">Live class attended</CardTitle>
//           </CardHeader>
//           <CardContent className="p-4 flex items-center justify-between">
//             <div className="relative w-16 h-16">
//               <svg className="w-full h-full" viewBox="0 0 100 100">
//                 <circle cx="50" cy="50" r="45" fill="none" stroke="#E5E7EB" strokeWidth="10" />
//                 <circle
//                   cx="50"
//                   cy="50"
//                   r="45"
//                   fill="none"
//                   stroke="#A5B4FC"
//                   strokeWidth="10"
//                   strokeDasharray={`${liveClassesAttended * 2.83} 283`}
//                   transform="rotate(-90 50 50)"
//                 />
//               </svg>
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <p className="text-xl font-bold text-[#1F2A44]">{liveClassesAttended}%</p>
//               </div>
//             </div>
//             <p className="text-sm text-[#6B7280]">Hours spent: {hoursSpent}h</p>
//           </CardContent>
//         </Card>

//         {/* Quizzes Practiced */}
//         <Card className="bg-white rounded-xl shadow-sm">
//           <CardHeader className="p-4">
//             <CardTitle className="text-sm font-medium text-[#6B7280] mb-2">Quiz practiced</CardTitle>
//           </CardHeader>
//           <CardContent className="p-4 flex items-center justify-between">
//             <div className="relative w-16 h-16">
//               <svg className="w-full h-full" viewBox="0 0 100 100">
//                 <circle cx="50" cy="50" r="45" fill="none" stroke="#E5E7EB" strokeWidth="10" />
//                 <circle
//                   cx="50"
//                   cy="50"
//                   r="45"
//                   fill="none"
//                   stroke="#FECACA"
//                   strokeWidth="10"
//                   strokeDasharray={`${(quizzesPracticed / (quizzesPracticed + 5)) * 283} 283`}
//                   transform="rotate(-90 50 50)"
//                 />
//               </svg>
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <p className="text-xl font-bold text-[#1F2A44]">{quizzesPracticed}</p>
//               </div>
//             </div>
//             <p className="text-sm text-[#6B7280]">Assignment done: {assignmentsDone}</p>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Main Content */}
//       <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
//         {/* Left Section: Upcoming Classes and Total Courses */}
//         <div className="lg:col-span-3 space-y-6">
//           {/* Upcoming Classes */}
//           <Card className="bg-white rounded-xl shadow-sm">
//             <CardHeader className="p-4">
//               <CardTitle className="text-lg font-semibold text-[#1F2A44]">Upcoming Live classes</CardTitle>
//             </CardHeader>
//             <CardContent className="p-4 space-y-4">
//               {upcomingClasses.map((classItem, index) => (
//                 <div key={index} className="flex items-center justify-between p-4 bg-[#F9FAFB] rounded-lg">
//                   <div className="flex items-center space-x-4">
//                     <img src="/data science.png" alt="Class" className="w-12 h-12 rounded-lg" />
//                     <div>
//                       <p className="text-sm font-medium text-[#1F2A44]">{classItem.title}</p>
//                       <p className="text-xs text-[#6B7280]">{classItem.subject}</p>
//                       <p className="text-xs text-[#6B7280]">{classItem.instructor}</p>
//                     </div>
//                   </div>
//                   <div className="text-right">
//                     <p className="text-sm text-[#1F2A44]">{classItem.date}, {classItem.time}</p>
//                     <p className="text-xs text-[#EF4444]">{classItem.timeLeft}</p>
//                     <a
//                       href="https://app.zoom.us/wc"
//                       target="_blank"
//                       rel="noopener noreferrer"
//                     >
//                       <button className="mt-2 px-4 py-1 bg-[#34C759] text-white text-sm rounded-lg hover:bg-[#2ea44f] transition-colors">
//                         Join
//                       </button>
//                     </a>
//                   </div>
//                 </div>
//               ))}
//             </CardContent>
//           </Card>

//           {/* Total Courses */}
//           <Card className="bg-white rounded-xl shadow-sm">
//             <CardHeader className="p-4">
//               <CardTitle className="text-lg font-semibold text-[#1F2A44]">Total courses ({totalCourses})</CardTitle>
//             </CardHeader>
//             <CardContent className="p-4">
//               <table className="w-full text-left border-collapse">
//                 <thead>
//                   <tr className="border-b border-[#E5E7EB]">
//                     <th className="p-3 text-sm font-medium text-[#6B7280]">Course name</th>
//                     <th className="p-3 text-sm font-medium text-[#6B7280]">Progress</th>
//                     <th className="p-3 text-sm font-medium text-[#6B7280]">Overall score</th>
//                     <th className="p-3 text-sm font-medium text-[#6B7280]">Status</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {isEnrolled && totalCourses > 0 ? (
//                     purchases.map((purchase, index) => {
//                       const courseProgress = userProgress.filter((p) => p.courseId === purchase.courseId);
//                       const completedChapters = courseProgress.filter((p) => p.isCompleted).length;
//                       const totalChaptersForCourse = progressData?.totalChapters || 0;
//                       const progressPercentage =
//                         totalChaptersForCourse > 0
//                           ? Math.round((completedChapters / totalChaptersForCourse) * 100)
//                           : 0;
//                       const status =
//                         courseProgress.length > 0 && courseProgress.every((p) => p.isCompleted)
//                           ? "Completed"
//                           : "In progress";
//                       const courseQuizResults = quizResults.filter((q) => q.courseId === purchase.courseId);
//                       const overallScore =
//                         courseQuizResults.length > 0
//                           ? Math.round(
//                               courseQuizResults.reduce((sum, q) => sum + (q.score / q.total) * 100, 0) /
//                                 courseQuizResults.length
//                             )
//                           : 0;

//                       return (
//                         <tr key={index} className="border-b border-[#E5E7EB] hover:bg-[#F9FAFB]">
//                           <td className="p-3 flex items-center space-x-2">
//                             <span
//                               className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${
//                                 purchase.course?.title?.startsWith("Physics")
//                                   ? "bg-[#F97316]"
//                                   : purchase.course?.title?.startsWith("Chemistry")
//                                   ? "bg-[#3B82F6]"
//                                   : "bg-[#22C55E]"
//                               }`}
//                             >
//                               {purchase.course?.title?.charAt(0) || "C"}
//                             </span>
//                             <span className="text-sm text-[#1F2A44]">{purchase.course?.title || "Unknown Course"}</span>
//                           </td>
//                           <td className="p-3">
//                             <Progress value={progressPercentage} className="w-[60%]" />
//                             <span className="ml-2 text-sm text-[#6B7280]">{progressPercentage}%</span>
//                           </td>
//                           <td className="p-3 text-sm text-[#1F2A44]">{overallScore}%</td>
//                           <td className="p-3">
//                             <Badge
//                               variant={status === "Completed" ? "default" : "secondary"}
//                               className={
//                                 status === "Completed"
//                                   ? "bg-[#34C759] text-white"
//                                   : "bg-[#E5E7EB] text-[#6B7280]"
//                               }
//                             >
//                               {status}
//                             </Badge>
//                           </td>
//                         </tr>
//                       );
//                     })
//                   ) : (
//                     <tr>
//                       <td colSpan={4} className="p-3 text-center text-[#6B7280]">
//                         No courses enrolled yet.
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Right Section: Leaderboard */}
//         <div className="lg:col-span-1">
//           <Card className="bg-white rounded-xl shadow-sm">
//             <CardHeader className="p-4">
//               <CardTitle className="text-lg font-semibold text-[#1F2A44]">Leaderboard</CardTitle>
//             </CardHeader>
//             <CardContent className="p-4">
//               {leaderboardData.length > 0 ? (
//                 leaderboardData.map((leader, index) => (
//                   <div
//                     key={leader.id}
//                     className="flex items-center justify-between py-2 border-b border-[#E5E7EB] last:border-b-0"
//                   >
//                     <div className="flex items-center space-x-2">
//                       <span className="w-6 h-6 rounded-full bg-[#34C759] flex items-center justify-center text-white text-xs">
//                         {index + 1}
//                       </span>
//                       <span className="text-sm text-[#1F2A44]">{leader.name}</span>
//                     </div>
//                     <span className="text-sm text-[#6B7280]">{leader.totalScore} pts</span> {/* Changed to totalScore */}
//                   </div>
//                 ))
//               ) : (
//                 <p className="text-sm text-[#6B7280]">No leaderboard data available.</p>
//               )}
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// }






// progress/page.tsx
// "use client";

// import { useEffect, useState } from "react";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { Progress } from "@/components/ui/progress";
// import { Badge } from "@/components/ui/badge";
// import { useUser, useAuth } from "@clerk/nextjs";

// interface LeaderboardUser {
//   id: string;
//   name: string;
//   level: number;
//   totalScore: number;
// }

// interface UserStats {
//   completionPercentage: number;
//   totalCourses: number;
//   coursesCompleted: number;
//   liveClassesAttended: number;
//   hoursSpent: string;
//   quizzesPracticed: number;
// }

// export default function ProgressPage() {
//   const { user } = useUser();
//   const { getToken } = useAuth();
//   const [progressData, setProgressData] = useState<{
//     completionPercentage: number;
//     totalChapters: number;
//     completedChapters: number;
//   } | null>(null);
//   const [leaderboardData, setLeaderboardData] = useState<LeaderboardUser[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [noCoursesAlert, setNoCoursesAlert] = useState(false);
//   const [totalCourses, setTotalCourses] = useState(0);
//   const [coursesCompleted, setCoursesCompleted] = useState(0);
//   const [liveClassesAttended, setLiveClassesAttended] = useState(0);
//   const [hoursSpent, setHoursSpent] = useState("0h 0m"); // Now a string in "Xh Ym" format
//   const [quizzesPracticed, setQuizzesPracticed] = useState(0);
//   const [assignmentsDone, setAssignmentsDone] = useState(0);
//   const [quizAssignments, setQuizAssignments] = useState<any[]>([]);
//   const [pendingQuizzesData, setPendingQuizzesData] = useState<any[]>([]);
//   const [isEnrolled, setIsEnrolled] = useState(false);
//   const [purchases, setPurchases] = useState<any[]>([]);
//   const [userProgress, setUserProgress] = useState<any[]>([]);
//   const [quizResults, setQuizResults] = useState<any[]>([]);

//   // Function to calculate total time spent and update hoursSpent
//   const updateHoursSpent = () => {
//     if (!user?.id) {
//       setHoursSpent("0h 0m");
//       return;
//     }

//     const now = new Date().getTime();

//     // Get the current session start time (or set it if this is a new session)
//     const sessionStartKey = `sessionStart_${user.id}`;
//     let sessionStart = localStorage.getItem(sessionStartKey);
//     if (!sessionStart) {
//       sessionStart = now.toString();
//       localStorage.setItem(sessionStartKey, sessionStart);
//     }
//     const sessionStartTime = parseInt(sessionStart, 10);
//     const currentSessionDuration = now - sessionStartTime;

//     // Get total time from previous sessions
//     const totalTimeKey = `totalTimeSpent_${user.id}`;
//     const previousTotalTime = parseInt(localStorage.getItem(totalTimeKey) || "0", 10);

//     // Calculate total time (previous + current session)
//     const totalTime = previousTotalTime + currentSessionDuration;

//     // Convert total time (in milliseconds) to hours and minutes
//     const totalMinutes = Math.floor(totalTime / 1000 / 60);
//     const hours = Math.floor(totalMinutes / 60);
//     const minutes = totalMinutes % 60;

//     // Update state with formatted string
//     setHoursSpent(`${hours}h ${minutes}m`);

//     // Update total time in localStorage (excluding the current session, which will be added on next load)
//     localStorage.setItem(totalTimeKey, (previousTotalTime + currentSessionDuration).toString());
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       if (!user?.id) return;

//       try {
//         setLoading(true);
//         const token = await getToken();

//         // Single API call for all progress data
//         const statsResponse = await fetch(`/api/progress-stats`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         if (!statsResponse.ok) throw new Error("Failed to fetch progress data");
//         const statsData = await statsResponse.json();
//         console.log("Progress Stats Data:", statsData);

//         // Set all state from single response
//         setProgressData({
//           completionPercentage: statsData.completionPercentage,
//           totalChapters: 0,
//           completedChapters: 0,
//         });
        
//         setTotalCourses(statsData.totalCourses);
//         setCoursesCompleted(statsData.coursesCompleted);
//         setLiveClassesAttended(statsData.liveClassesAttended);
//         setQuizzesPracticed(statsData.quizzesPracticed);
//         setIsEnrolled(statsData.totalCourses > 0);

//         if (statsData.totalCourses === 0) {
//           setNoCoursesAlert(true);
//           setTimeout(() => setNoCoursesAlert(false), 3000);
//         }

//         // Fetch purchases to display course details in the table
//         const purchasesResponse = await fetch(`/api/purchases/coursecheck?userId=${user.id}`, {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (!purchasesResponse.ok) throw new Error("Failed to fetch purchases");
//         const purchasesData = await purchasesResponse.json();
//         setPurchases(purchasesData);

//         // Fetch user progress for course details
//         const progressResponse = await fetch(`/api/user-progress?userId=${user.id}`, {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (!progressResponse.ok) throw new Error("Failed to fetch user progress");
//         const progressData = await progressResponse.json();
//         setUserProgress(progressData);

//         // Fetch quiz results for overall scores in the table
//         const quizResultsResponse = await fetch(`/api/chapter-quiz-results?userId=${user.id}`, {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (!quizResultsResponse.ok) {
//           console.warn("Quiz results not found, skipping...");
//           setQuizResults([]);
//         } else {
//           const quizResultsData = await quizResultsResponse.json();
//           setQuizResults(quizResultsData);
//         }

//         // Fetch leaderboard data
//         const leaderboardResponse = await fetch("/api/leaderboard", {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (!leaderboardResponse.ok) throw new Error("Failed to fetch leaderboard data");
//         const leaderboard = await leaderboardResponse.json();
//         setLeaderboardData(leaderboard);

//       } catch (error) {
//         console.error("[FETCH_PROGRESS]", error);
//         setProgressData({ completionPercentage: 0, totalChapters: 0, completedChapters: 0 });
//         setTotalCourses(0);
//         setCoursesCompleted(0);
//         setLiveClassesAttended(0);
//         setHoursSpent("0h 0m");
//         setQuizzesPracticed(0);
//         setAssignmentsDone(0);
//         setQuizAssignments([]);
//         setPendingQuizzesData([]);
//         setIsEnrolled(false);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [user?.id, getToken]);

//   // Effect to calculate and update hours spent when user signs in
//   useEffect(() => {
//     if (!user?.id) return;

//     // Initial calculation
//     updateHoursSpent();

//     // Set up a timer to update every minute while the user is signed in
//     const timer = setInterval(() => {
//       updateHoursSpent();
//     }, 60 * 1000); // Update every minute

//     return () => clearInterval(timer);
//   }, [user?.id]);

//   // Effect to reset session start time when user signs out
//   useEffect(() => {
//     if (!user?.id) {
//       // When user signs out, reset the session start time
//       const sessionStartKey = `sessionStart_${user?.id}`;
//       localStorage.removeItem(sessionStartKey);
//       setHoursSpent("0h 0m");
//     }
//   }, [user?.id]);

//   if (loading) return <div className="flex justify-center items-center h-screen text-gray-600">Loading...</div>;

//   if (!progressData || !user?.id) return <div className="text-center text-red-500">Error loading progress</div>;

//   const achievements = ["Top Learner", "Course Master"];

//   const upcomingClasses = [
//     { title: "No Upcoming Live Classes yet", subject: "Coming Soon...", date: " ", time: " ", timeLeft: " ", instructor: " " },
//     { title: "No Upcoming Live Classes yet", subject: "Coming Soon...", date: " ", time: " ", timeLeft: " ", instructor: " " },
//   ];

//   return (
//     <div className="min-h-screen bg-[#F5F7FA] p-6">
//       {/* Notification Banner */}
//       <div className="bg-[#E6F7E5] text-[#1F2A44] p-4 rounded-xl mb-6 flex justify-between items-center">
//         <p className="text-sm">
//           Great effort so far Hustler! Keep up the hard work, and with a bit more focus on your attendance, you’re sure to reach your full potential! 😊
//         </p>
//         <button className="text-[#6B7280] hover:text-[#1F2A44]">×</button>
//       </div>

//       {/* Alert for No Courses Enrolled */}
//       {noCoursesAlert && (
//         <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded mb-6 animate-fade-out">
//           <p className="text-sm">No courses enrolled yet!</p>
//         </div>
//       )}

//       {/* Stats Section */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
//         {/* Overall Performance */}
//         <Card className="bg-white rounded-xl shadow-sm">
//           <CardHeader className="p-4">
//             <CardTitle className="text-sm font-medium text-[#6B7280] mb-2">Overall performance</CardTitle>
//           </CardHeader>
//           <CardContent className="p-4 flex flex-col items-center">
//             <div className="relative w-32 h-32">
//               <svg className="w-full h-full" viewBox="0 0 100 100">
//                 <circle cx="50" cy="50" r="45" fill="none" stroke="#E5E7EB" strokeWidth="10" />
//                 <circle
//                   cx="50"
//                   cy="50"
//                   r="45"
//                   fill="none"
//                   stroke="#34C759"
//                   strokeWidth="10"
//                   strokeDasharray={`${progressData.completionPercentage * 2.83} 283`}
//                   transform="rotate(-90 50 50)"
//                 />
//               </svg>
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <p className="text-2xl font-bold text-[#1F2A44]">{progressData.completionPercentage}%</p>
//               </div>
//             </div>
//             <p className="text-sm font-semibold text-[#1F2A44] mt-2">Pro learner</p>
//           </CardContent>
//         </Card>

//         {/* Total Enroll Courses */}
//         <Card className="bg-white rounded-xl shadow-sm">
//           <CardHeader className="p-4">
//             <CardTitle className="text-sm font-medium text-[#6B7280] mb-2">Total enroll courses</CardTitle>
//           </CardHeader>
//           <CardContent className="p-4 flex items-center justify-between">
//             <div className="relative w-16 h-16">
//               <svg className="w-full h-full" viewBox="0 0 100 100">
//                 <circle cx="50" cy="50" r="45" fill="none" stroke="#E5E7EB" strokeWidth="10" />
//                 <circle
//                   cx="50"
//                   cy="50"
//                   r="45"
//                   fill="none"
//                   stroke="#34C759"
//                   strokeWidth="10"
//                   strokeDasharray="283 283"
//                   transform="rotate(-90 50 50)"
//                 />
//               </svg>
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <p className="text-xl font-bold text-[#1F2A44]">{totalCourses}</p>
//               </div>
//             </div>
//             <p className="text-sm text-[#6B7280]">Course completed: {coursesCompleted}</p>
//           </CardContent>
//         </Card>

//         {/* Live Class Attended */}
//         <Card className="bg-white rounded-xl shadow-sm">
//           <CardHeader className="p-4">
//             <CardTitle className="text-sm font-medium text-[#6B7280] mb-2">Live class attended</CardTitle>
//           </CardHeader>
//           <CardContent className="p-4 flex items-center justify-between">
//             <div className="relative w-16 h-16">
//               <svg className="w-full h-full" viewBox="0 0 100 100">
//                 <circle cx="50" cy="50" r="45" fill="none" stroke="#E5E7EB" strokeWidth="10" />
//                 <circle
//                   cx="50"
//                   cy="50"
//                   r="45"
//                   fill="none"
//                   stroke="#A5B4FC"
//                   strokeWidth="10"
//                   strokeDasharray={`${liveClassesAttended * 2.83} 283`}
//                   transform="rotate(-90 50 50)"
//                 />
//               </svg>
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <p className="text-xl font-bold text-[#1F2A44]">{liveClassesAttended}%</p>
//               </div>
//             </div>
//             <p className="text-sm text-[#6B7280]">Hours spent: {hoursSpent}</p>
//           </CardContent>
//         </Card>

//         {/* Quizzes Practiced */}
//         <Card className="bg-white rounded-xl shadow-sm">
//           <CardHeader className="p-4">
//             <CardTitle className="text-sm font-medium text-[#6B7280] mb-2">Quiz practiced</CardTitle>
//           </CardHeader>
//           <CardContent className="p-4 flex items-center justify-between">
//             <div className="relative w-16 h-16">
//               <svg className="w-full h-full" viewBox="0 0 100 100">
//                 <circle cx="50" cy="50" r="45" fill="none" stroke="#E5E7EB" strokeWidth="10" />
//                 <circle
//                   cx="50"
//                   cy="50"
//                   r="45"
//                   fill="none"
//                   stroke="#FECACA"
//                   strokeWidth="10"
//                   strokeDasharray={`${(quizzesPracticed / (quizzesPracticed + 5)) * 283} 283`}
//                   transform="rotate(-90 50 50)"
//                 />
//               </svg>
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <p className="text-xl font-bold text-[#1F2A44]">{quizzesPracticed}</p>
//               </div>
//             </div>
//             <p className="text-sm text-[#6B7280]">Assignment done: {assignmentsDone}</p>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Main Content */}
//       <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
//         {/* Left Section: Upcoming Classes and Total Courses */}
//         <div className="lg:col-span-3 space-y-6">
//           {/* Upcoming Classes */}
//           <Card className="bg-white rounded-xl shadow-sm">
//             <CardHeader className="p-4">
//               <CardTitle className="text-lg font-semibold text-[#1F2A44]">Upcoming Live classes</CardTitle>
//             </CardHeader>
//             <CardContent className="p-4 space-y-4">
//               {upcomingClasses.map((classItem, index) => (
//                 <div key={index} className="flex items-center justify-between p-4 bg-[#F9FAFB] rounded-lg">
//                   <div className="flex items-center space-x-4">
//                     <img src="/data science.png" alt="Class" className="w-12 h-12 rounded-lg" />
//                     <div>
//                       <p className="text-sm font-medium text-[#1F2A44]">{classItem.title}</p>
//                       <p className="text-xs text-[#6B7280]">{classItem.subject}</p>
//                       <p className="text-xs text-[#6B7280]">{classItem.instructor}</p>
//                     </div>
//                   </div>
//                   <div className="text-right">
//                     <p className="text-sm text-[#1F2A44]">{classItem.date}, {classItem.time}</p>
//                     <p className="text-xs text-[#EF4444]">{classItem.timeLeft}</p>
//                     <a
//                       href="https://app.zoom.us/wc"
//                       target="_blank"
//                       rel="noopener noreferrer"
//                     >
//                       <button className="mt-2 px-4 py-1 bg-[#34C759] text-white text-sm rounded-lg hover:bg-[#2ea44f] transition-colors">
//                         Join
//                       </button>
//                     </a>
//                   </div>
//                 </div>
//               ))}
//             </CardContent>
//           </Card>

//           {/* Total Courses */}
//           <Card className="bg-white rounded-xl shadow-sm">
//             <CardHeader className="p-4">
//               <CardTitle className="text-lg font-semibold text-[#1F2A44]">Total courses ({totalCourses})</CardTitle>
//             </CardHeader>
//             <CardContent className="p-4">
//               <table className="w-full text-left border-collapse">
//                 <thead>
//                   <tr className="border-b border-[#E5E7EB]">
//                     <th className="p-3 text-sm font-medium text-[#6B7280]">Course name</th>
//                     <th className="p-3 text-sm font-medium text-[#6B7280]">Progress</th>
//                     <th className="p-3 text-sm font-medium text-[#6B7280]">Overall score</th>
//                     <th className="p-3 text-sm font-medium text-[#6B7280]">Status</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {isEnrolled && totalCourses > 0 ? (
//                     purchases.map((purchase, index) => {
//                       const courseProgress = userProgress.filter((p) => p.courseId === purchase.courseId);
//                       const completedChapters = courseProgress.filter((p) => p.isCompleted).length;
//                       const totalChaptersForCourse = progressData?.totalChapters || 0;
//                       const progressPercentage =
//                         totalChaptersForCourse > 0
//                           ? Math.round((completedChapters / totalChaptersForCourse) * 100)
//                           : 0;
//                       const status =
//                         courseProgress.length > 0 && courseProgress.every((p) => p.isCompleted)
//                           ? "Completed"
//                           : "In progress";
//                       const courseQuizResults = quizResults.filter((q) => q.courseId === purchase.courseId);
//                       const overallScore =
//                         courseQuizResults.length > 0
//                           ? Math.round(
//                               courseQuizResults.reduce((sum, q) => sum + (q.score / q.total) * 100, 0) /
//                                 courseQuizResults.length
//                             )
//                           : 0;

//                       return (
//                         <tr key={index} className="border-b border-[#E5E7EB] hover:bg-[#F9FAFB]">
//                           <td className="p-3 flex items-center space-x-2">
//                             <span
//                               className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${
//                                 purchase.course?.title?.startsWith("Physics")
//                                   ? "bg-[#F97316]"
//                                   : purchase.course?.title?.startsWith("Chemistry")
//                                   ? "bg-[#3B82F6]"
//                                   : "bg-[#22C55E]"
//                               }`}
//                             >
//                               {purchase.course?.title?.charAt(0) || "C"}
//                             </span>
//                             <span className="text-sm text-[#1F2A44]">{purchase.course?.title || "Unknown Course"}</span>
//                           </td>
//                           <td className="p-3">
//                             <Progress value={progressPercentage} className="w-[60%]" />
//                             <span className="ml-2 text-sm text-[#6B7280]">{progressPercentage}%</span>
//                           </td>
//                           <td className="p-3 text-sm text-[#1F2A44]">{overallScore}%</td>
//                           <td className="p-3">
//                             <Badge
//                               variant={status === "Completed" ? "default" : "secondary"}
//                               className={
//                                 status === "Completed"
//                                   ? "bg-[#34C759] text-white"
//                                   : "bg-[#E5E7EB] text-[#6B7280]"
//                               }
//                             >
//                               {status}
//                             </Badge>
//                           </td>
//                         </tr>
//                       );
//                     })
//                   ) : (
//                     <tr>
//                       <td colSpan={4} className="p-3 text-center text-[#6B7280]">
//                         No courses enrolled yet.
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Right Section: Leaderboard */}
//         <div className="lg:col-span-1">
//           <Card className="bg-white rounded-xl shadow-sm">
//             <CardHeader className="p-4">
//               <CardTitle className="text-lg font-semibold text-[#1F2A44]">Leaderboard</CardTitle>
//             </CardHeader>
//             <CardContent className="p-4">
//               {leaderboardData.length > 0 ? (
//                 leaderboardData.map((leader, index) => (
//                   <div
//                     key={leader.id}
//                     className="flex items-center justify-between py-2 border-b border-[#E5E7EB] last:border-b-0"
//                   >
//                     <div className="flex items-center space-x-2">
//                       <span className="w-6 h-6 rounded-full bg-[#34C759] flex items-center justify-center text-white text-xs">
//                         {index + 1}
//                       </span>
//                       <span className="text-sm text-[#1F2A44]">{leader.name}</span>
//                     </div>
//                     <span className="text-sm text-[#6B7280]">{leader.totalScore} pts</span>
//                   </div>
//                 ))
//               ) : (
//                 <p className="text-sm text-[#6B7280]">No leaderboard data available.</p>
//               )}
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// }






// progress/page.tsx

// progress/page.tsx
"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useUser, useAuth } from "@clerk/nextjs";

interface LeaderboardUser {
  id: string;
  name: string;
  level: number;
  totalScore: number;
}

interface UserStats {
  completionPercentage: number;
  totalCourses: number;
  coursesCompleted: number;
  liveClassesAttended: number;
  hoursSpent: string;
  quizzesPracticed: number;
  assignmentsDone: number;
}

export default function ProgressPage() {
  const { user } = useUser();
  const { getToken } = useAuth();
  const [progressData, setProgressData] = useState<{
    completionPercentage: number;
    totalChapters: number;
    completedChapters: number;
  } | null>(null);
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [noCoursesAlert, setNoCoursesAlert] = useState(false);
  const [totalCourses, setTotalCourses] = useState(0);
  const [coursesCompleted, setCoursesCompleted] = useState(0);
  const [liveClassesAttended, setLiveClassesAttended] = useState(0);
  const [hoursSpent, setHoursSpent] = useState("0h 0m");
  const [quizzesPracticed, setQuizzesPracticed] = useState(0);
  const [assignmentsDone, setAssignmentsDone] = useState(0);
  const [quizAssignments, setQuizAssignments] = useState<any[]>([]);
  const [pendingQuizzesData, setPendingQuizzesData] = useState<any[]>([]);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [purchases, setPurchases] = useState<any[]>([]);
  const [userProgress, setUserProgress] = useState<any[]>([]);
  const [quizResults, setQuizResults] = useState<any[]>([]);
  const [quizAttempts, setQuizAttempts] = useState<any[]>([]);

  // Function to calculate total time spent and update hoursSpent
  const updateHoursSpent = () => {
    if (!user?.id) {
      setHoursSpent("0h 0m");
      return;
    }

    const now = new Date().getTime();
    const sessionStartKey = `sessionStart_${user.id}`;
    let sessionStart = localStorage.getItem(sessionStartKey);
    if (!sessionStart) {
      sessionStart = now.toString();
      localStorage.setItem(sessionStartKey, sessionStart);
    }
    const sessionStartTime = parseInt(sessionStart, 10);
    const currentSessionDuration = now - sessionStartTime;

    const totalTimeKey = `totalTimeSpent_${user.id}`;
    const previousTotalTime = parseInt(localStorage.getItem(totalTimeKey) || "0", 10);
    const totalTime = previousTotalTime + currentSessionDuration;

    const totalMinutes = Math.floor(totalTime / 1000 / 60);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    setHoursSpent(`${hours}h ${minutes}m`);
    localStorage.setItem(totalTimeKey, (previousTotalTime + currentSessionDuration).toString());
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.id) return;

      try {
        setLoading(true);
        const token = await getToken();

        // Fetch progress stats
        const statsResponse = await fetch(`/api/progress-stats`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!statsResponse.ok) throw new Error("Failed to fetch progress data");
        const statsData = await statsResponse.json();
        console.log("Progress Stats Data:", statsData);

        // Set progress data
        setProgressData({
          completionPercentage: statsData.completionPercentage,
          totalChapters: 0,
          completedChapters: 0,
        });

        // Set stats from statsData
        setCoursesCompleted(statsData.coursesCompleted);
        setLiveClassesAttended(statsData.liveClassesAttended);
        setQuizzesPracticed(statsData.quizzesPracticed);
        setAssignmentsDone(statsData.assignmentsDone);

        // Fetch purchases to display course details
        const purchasesResponse = await fetch(`/api/purchases/coursecheck?userId=${user.id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!purchasesResponse.ok) throw new Error("Failed to fetch purchases");
        const purchasesData = await purchasesResponse.json();
        console.log("Purchases Data:", purchasesData);
        setPurchases(purchasesData);

        // Set totalCourses and isEnrolled
        setTotalCourses(purchasesData.length);
        setIsEnrolled(purchasesData.length > 0);

        if (purchasesData.length === 0) {
          setNoCoursesAlert(true);
          setTimeout(() => setNoCoursesAlert(false), 3000);
        }

        // Fetch user progress
        const progressResponse = await fetch(`/api/user-progress?userId=${user.id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!progressResponse.ok) throw new Error("Failed to fetch user progress");
        const progressData = await progressResponse.json();
        console.log("User Progress Data:", progressData);
        setUserProgress(progressData);

        // Fetch quiz results
        const quizResultsResponse = await fetch(`/api/chapter-quiz-results?userId=${user.id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!quizResultsResponse.ok) {
          console.warn("Quiz results not found, skipping...");
          setQuizResults([]);
        } else {
          const quizResultsData = await quizResultsResponse.json();
          console.log("Quiz Results Data:", quizResultsData);
          setQuizResults(quizResultsData);
        }

        // Fetch quiz attempts
        const quizAttemptsResponse = await fetch(`/api/quiz-attempts?userId=${user.id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!quizAttemptsResponse.ok) {
          console.warn("Quiz attempts not found, skipping...");
          setQuizAttempts([]);
        } else {
          const quizAttemptsData = await quizAttemptsResponse.json();
          console.log("Quiz Attempts Data:", quizAttemptsData);
          setQuizAttempts(quizAttemptsData);
        }

        // Fetch leaderboard data
        const leaderboardResponse = await fetch("/api/leaderboard", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!leaderboardResponse.ok) throw new Error("Failed to fetch leaderboard data");
        const leaderboard = await leaderboardResponse.json();
        console.log("Leaderboard Data:", leaderboard);
        setLeaderboardData(leaderboard);
      } catch (error) {
        console.error("[FETCH_PROGRESS]", error);
        setProgressData({ completionPercentage: 0, totalChapters: 0, completedChapters: 0 });
        setTotalCourses(0);
        setCoursesCompleted(0);
        setLiveClassesAttended(0);
        setHoursSpent("0h 0m");
        setQuizzesPracticed(0);
        setAssignmentsDone(0);
        setQuizAssignments([]);
        setPendingQuizzesData([]);
        setIsEnrolled(false);
        setQuizAttempts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user?.id, getToken]);

  useEffect(() => {
    if (!user?.id) return;

    updateHoursSpent();
    const timer = setInterval(() => {
      updateHoursSpent();
    }, 60 * 1000);

    return () => clearInterval(timer);
  }, [user?.id]);

  useEffect(() => {
    if (!user?.id) {
      const sessionStartKey = `sessionStart_${user?.id}`;
      localStorage.removeItem(sessionStartKey);
      setHoursSpent("0h 0m");
    }
  }, [user?.id]);

  if (loading) return <div className="flex justify-center items-center h-screen text-gray-600">Loading...</div>;

  if (!progressData || !user?.id) return <div className="text-center text-red-500">Error loading progress</div>;

  const achievements = ["Top Learner", "Course Master"];
  const upcomingClasses = [
    { title: "No Upcoming Live Classes yet", subject: "Coming Soon...", date: " ", time: " ", timeLeft: " ", instructor: " " },
    { title: "No Upcoming Live Classes yet", subject: "Coming Soon...", date: " ", time: " ", timeLeft: " ", instructor: " " },
  ];

  return (
    <div className="min-h-screen bg-[#F5F7FA] p-6">
      {/* Notification Banner */}
      <div className="bg-[#E6F7E5] text-[#1F2A44] p-4 rounded-xl mb-6 flex justify-between items-center">
        <p className="text-sm">
          Great effort so far Hustler! Keep up the hard work, and with a bit more focus on your attendance, you’re sure to reach your full potential! 😊
        </p>
        <button className="text-[#6B7280] hover:text-[#1F2A44]">×</button>
      </div>

      {/* Alert for No Courses Enrolled */}
      {noCoursesAlert && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded mb-6 animate-fade-out">
          <p className="text-sm">No courses enrolled yet!</p>
        </div>
      )}

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        {/* Overall Performance */}
        <Card className="bg-white rounded-xl shadow-sm">
          <CardHeader className="p-4">
            <CardTitle className="text-sm font-medium text-[#6B7280] mb-2">Overall performance</CardTitle>
          </CardHeader>
          <CardContent className="p-4 flex flex-col items-center">
            <div className="relative w-32 h-32">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#E5E7EB" strokeWidth="10" />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#34C759"
                  strokeWidth="10"
                  strokeDasharray={`${progressData.completionPercentage * 2.83} 283`}
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-2xl font-bold text-[#1F2A44]">{progressData.completionPercentage}%</p>
              </div>
            </div>
            <p className="text-sm font-semibold text-[#1F2A44] mt-2">Pro learner</p>
          </CardContent>
        </Card>

        {/* Total Enroll Courses */}
        <Card className="bg-white rounded-xl shadow-sm">
          <CardHeader className="p-4">
            <CardTitle className="text-sm font-medium text-[#6B7280] mb-2">Total enroll courses</CardTitle>
          </CardHeader>
          <CardContent className="p-4 flex items-center justify-between">
            <div className="relative w-16 h-16">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#E5E7EB" strokeWidth="10" />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#34C759"
                  strokeWidth="10"
                  strokeDasharray="283 283"
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-xl font-bold text-[#1F2A44]">{totalCourses}</p>
              </div>
            </div>
            <p className="text-sm text-[#6B7280]">Course completed: {coursesCompleted}</p>
          </CardContent>
        </Card>

        {/* Live Class Attended */}
        <Card className="bg-white rounded-xl shadow-sm">
          <CardHeader className="p-4">
            <CardTitle className="text-sm font-medium text-[#6B7280] mb-2">Live class attended</CardTitle>
          </CardHeader>
          <CardContent className="p-4 flex items-center justify-between">
            <div className="relative w-16 h-16">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#E5E7EB" strokeWidth="10" />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#A5B4FC"
                  strokeWidth="10"
                  strokeDasharray={`${liveClassesAttended * 2.83} 283`}
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-xl font-bold text-[#1F2A44]">{liveClassesAttended}%</p>
              </div>
            </div>
            <p className="text-sm text-[#6B7280]">Hours spent: {hoursSpent}</p>
          </CardContent>
        </Card>

        {/* Quizzes Practiced */}
        <Card className="bg-white rounded-xl shadow-sm">
          <CardHeader className="p-4">
            <CardTitle className="text-sm font-medium text-[#6B7280] mb-2">Quiz practiced</CardTitle>
          </CardHeader>
          <CardContent className="p-4 flex items-center justify-between">
            <div className="relative w-16 h-16">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#E5E7EB" strokeWidth="10" />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#FECACA"
                  strokeWidth="10"
                  strokeDasharray={`${(quizzesPracticed / (quizzesPracticed + 5)) * 283} 283`}
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-xl font-bold text-[#1F2A44]">{quizzesPracticed}</p>
              </div>
            </div>
            <p className="text-sm text-[#6B7280]">Assignment done: {assignmentsDone}</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Section: Upcoming Classes and Total Courses */}
        <div className="lg:col-span-3 space-y-6">
          {/* Upcoming Classes */}
          <Card className="bg-white rounded-xl shadow-sm">
            <CardHeader className="p-4">
              <CardTitle className="text-lg font-semibold text-[#1F2A44]">Upcoming Live classes</CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              {upcomingClasses.map((classItem, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-[#F9FAFB] rounded-lg">
                  <div className="flex items-center space-x-4">
                    <img src="/data science.png" alt="Class" className="w-12 h-12 rounded-lg" />
                    <div>
                      <p className="text-sm font-medium text-[#1F2A44]">{classItem.title}</p>
                      <p className="text-xs text-[#6B7280]">{classItem.subject}</p>
                      <p className="text-xs text-[#6B7280]">{classItem.instructor}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-[#1F2A44]">{classItem.date}, {classItem.time}</p>
                    <p className="text-xs text-[#EF4444]">{classItem.timeLeft}</p>
                    <a href="https://app.zoom.us/wc" target="_blank" rel="noopener noreferrer">
                      <button className="mt-2 px-4 py-1 bg-[#34C759] text-white text-sm rounded-lg hover:bg-[#2ea44f] transition-colors">
                        Join
                      </button>
                    </a>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Total Courses */}
          {/* <Card className="bg-white rounded-xl shadow-sm">
            <CardHeader className="p-4">
              <CardTitle className="text-lg font-semibold text-[#1F2A44]">Total courses ({totalCourses})</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#E5E7EB]">
                    <th className="p-3 text-sm font-medium text-[#6B7280]">Course name</th>
                    <th className="p-3 text-sm font-medium text-[#6B7280]">Progress</th>
                    <th className="p-3 text-sm font-medium text-[#6B7280]">Overall score</th>
                    <th className="p-3 text-sm font-medium text-[#6B7280]">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {isEnrolled && totalCourses > 0 ? (
                    purchases.map((purchase, index) => {
                      // Course Name: Use purchase.course.title
                      const courseTitle = purchase.course?.title || "Unknown Course";

                      // Progress: Calculate based on completed chapters
                      const courseProgress = userProgress.filter((p) => p.courseId === purchase.courseId);
                      const completedChapters = courseProgress.filter((p) => p.isCompleted).length;
                      const totalChaptersForCourse = purchase.course?.chapters?.length || 0;
                      const progressPercentage =
                        totalChaptersForCourse > 0
                          ? Math.round((completedChapters / totalChaptersForCourse) * 100)
                          : 0;

                      // Overall Score: Aggregate from ChapterQuizAttempt
                      const courseQuizAttempts = quizAttempts.filter((attempt) =>
                        purchase.course?.chapterQuizzes?.some((quiz: any) => quiz.id === attempt.chapterQuizId)
                      );
                      const overallScore =
                        courseQuizAttempts.length > 0
                          ? Math.round(
                              courseQuizAttempts.reduce(
                                (sum: number, attempt: any) =>
                                  sum + (attempt.score / attempt.totalQuestions) * 100,
                                0
                              ) / courseQuizAttempts.length
                            )
                          : 0;

                      // Status: Check if all chapters are completed and final quiz passed
                      const chapters = purchase.course?.chapters || [];
                      const isCourseCompleted =
                        completedChapters === totalChaptersForCourse &&
                        totalChaptersForCourse > 0 &&
                        courseQuizAttempts.some((attempt: any) => attempt.score / attempt.totalQuestions >= 0.7); // Assuming 70% is passing
                      const status = isCourseCompleted ? "Completed" : "In progress";

                      return (
                        <tr key={index} className="border-b border-[#E5E7EB] hover:bg-[#F9FAFB]">
                          <td className="p-3 flex items-center space-x-2">
                            <span
                              className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${
                                courseTitle.startsWith("Physics")
                                  ? "bg-[#F97316]"
                                  : courseTitle.startsWith("Chemistry")
                                  ? "bg-[#3B82F6]"
                                  : "bg-[#22C55E]"
                              }`}
                            >
                              {courseTitle.charAt(0) || "C"}
                            </span>
                            <span className="text-sm text-[#1F2A44]">{courseTitle}</span>
                          </td>
                          <td className="p-3">
                            <Progress value={progressPercentage} className="w-[60%]" />
                            <span className="ml-2 text-sm text-[#6B7280]">{progressPercentage}%</span>
                          </td>
                          <td className="p-3 text-sm text-[#1F2A44]">{overallScore}%</td>
                          <td className="p-3">
                            <Badge
                            
                              variant={status === "Completed" ? "default" : "secondary"}
                              className={
                                status === "Completed"
                                  ? "bg-[#34C759] text-white"
                                  : "bg-[#E5E7EB] text-[#6B7280]"
                              }
                            >
                              {status}
                            </Badge>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={4} className="p-3 text-center text-[#6B7280]">
                        No courses enrolled yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </CardContent>
          </Card> */}
        </div>

        {/* Right Section: Leaderboard */}
        <div className="lg:col-span-1">
          <Card className="bg-white rounded-xl shadow-sm">
            <CardHeader className="p-4">
              <CardTitle className="text-lg font-semibold text-[#1F2A44]">Leaderboard</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              {leaderboardData.length > 0 ? (
                leaderboardData.map((leader, index) => (
                  <div
                    key={leader.id}
                    className="flex items-center justify-between py-2 border-b border-[#E5E7EB] last:border-b-0"
                  >
                    <div className="flex items-center space-x-2">
                      <span className="w-6 h-6 rounded-full bg-[#34C759] flex items-center justify-center text-white text-xs">
                        {index + 1}
                      </span>
                      <span className="text-sm text-[#1F2A44]">{leader.name}</span>
                    </div>
                    <span className="text-sm text-[#6B7280]">{leader.totalScore} pts</span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-[#6B7280]">No leaderboard data available.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}