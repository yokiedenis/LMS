// "use client";
// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';

// interface QuizButtonProps {
//   courseId: string; // Receive courseId as a prop
//   chapterId?: string; // Add chapterId as a prop
//   quizId: string | null;
// }

// const QuizButton: React.FC<QuizButtonProps> = ({ courseId, quizId }) => {
//   const router = useRouter();
//   const [isPulsing, setIsPulsing] = useState(false);

//   useEffect(() => {
//     setIsPulsing(true);
//     const timer = setTimeout(() => setIsPulsing(false), 1500); // Stops pulsing after 1.5 seconds
//     return () => clearTimeout(timer);
//   }, []);

//   const handleClick = () => {
//     console.log("Navigating to:", `/courses/${courseId}/quizzes/${quizId}`);
//     router.push(`/courses/${courseId}/quizzes/${quizId}`); // Navigate to the quizzes page of this course
//   };

//   return (
//     <button
//       className={`w-full h-12 bg-gradient-to-r from-blue-500 to-teal-500 text-white font-semibold rounded-lg shadow-md
//                   hover:shadow-lg transition-shadow duration-300 transform hover:scale-105
//                   relative overflow-hidden group ${isPulsing ? 'animate-pulse' : ''}`}
//       onClick={handleClick}
//     >
//       <span className="absolute inset-0 w-full h-full bg-white opacity-0 transition-opacity duration-300 group-hover:opacity-10 rounded-lg" />
//       <span className="relative z-10">TAKE A QUIZ</span>
//     </button>
//   );
// };

// export default QuizButton;


// components/quiz-button.tsx






// // components/quiz-button.tsx
// "use client";
// import React, { useEffect, useState, useCallback } from "react";
// import { useRouter } from "next/navigation";
// import axios from "axios";

// const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// interface QuizButtonProps {
//   courseId: string;
//   chapterId?: string;
//   quizId: string | null;
//   allChaptersCompleted: boolean;
//   allChapterQuizzesPassed: boolean;
// }

// const QuizButton: React.FC<QuizButtonProps> = ({
//   courseId,
//   quizId,
//   allChaptersCompleted,
//   allChapterQuizzesPassed,
// }) => {
//   const router = useRouter();
//   const [isPulsing, setIsPulsing] = useState(false);
//   const [isQuizPassed, setIsQuizPassed] = useState(false);
//   const [showButton, setShowButton] = useState(
//     allChaptersCompleted && allChapterQuizzesPassed
//   );

//   const fetchQuizStatus = useCallback(async () => {
//     if (!quizId) return;

//     try {
//       const response = await axios.get(
//         `${BASE_URL}/api/courses/${courseId}/quizzes/${quizId}/results`,
//         {
//           headers: {
//             "user-id": "current-user-id", // Replace with actual user ID from auth
//           },
//           withCredentials: true, // Include cookies for auth
//         }
//       );
//       const scorePercentage =
//         response.data.totalQuestions > 0
//           ? (response.data.score / response.data.totalQuestions) * 100
//           : 0;
//       setIsQuizPassed(scorePercentage >= 60);
//       console.log(
//         `Final quiz status: score=${response.data.score}, totalQuestions=${response.data.totalQuestions}, passed=${scorePercentage >= 60}`
//       );
//     } catch (error: any) {
//       if (error.response?.status === 404) {
//         setIsQuizPassed(false);
//         console.log("No final quiz results found");
//       } else {
//         console.error("Failed to fetch final quiz status:", error.message);
//       }
//     }
//   }, [courseId, quizId]);

//   useEffect(() => {
//     setIsPulsing(true);
//     const timer = setTimeout(() => setIsPulsing(false), 1500);
//     return () => clearTimeout(timer);
//   }, []);

//   useEffect(() => {
//     fetchQuizStatus();
//     setShowButton(allChaptersCompleted && allChapterQuizzesPassed);
//   }, [fetchQuizStatus, allChaptersCompleted, allChapterQuizzesPassed]);

//   // Listen for quiz submission events (simulated via window event)
//   useEffect(() => {
//     const handleQuizSubmitted = () => {
//       fetchQuizStatus();
//     };

//     window.addEventListener("quizSubmitted", handleQuizSubmitted);
//     return () => {
//       window.removeEventListener("quizSubmitted", handleQuizSubmitted);
//     };
//   }, [fetchQuizStatus]);

//   const handleClick = () => {
//     console.log("Navigating to:", `/courses/${courseId}/quizzes/${quizId}`);
//     router.push(`/courses/${courseId}/quizzes/${quizId}`);
//   };

//   if (!showButton) return null;

//   return (
//     <button
//       className={`w-full h-12 bg-gradient-to-r from-blue-500 to-teal-500 text-white font-semibold rounded-lg shadow-md
//                   hover:shadow-lg transition-shadow duration-300 transform hover:scale-105
//                   relative overflow-hidden group ${isPulsing ? "animate-pulse" : ""}`}
//       onClick={handleClick}
//     >
//       <span className="absolute inset-0 w-full h-full bg-white opacity-0 transition-opacity duration-300 group-hover:opacity-10 rounded-lg" />
//       <span className="relative z-10">
//         {isQuizPassed ? "NOW I AM CERTIFIED" : "TAKE A QUIZ"}
//       </span>
//     </button>
//   );
// };

// export default QuizButton;




// // components/quiz-button.tsx
// "use client";
// import React, { useEffect, useState, useCallback } from "react";
// import { useRouter } from "next/navigation";
// import axios from "axios";
// import { useAuth } from "@clerk/nextjs";

// const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// interface QuizButtonProps {
//   courseId: string;
//   chapterId?: string;
//   courseName: string;
//   quizId: string | null;
//   allChaptersCompleted: boolean;
//   allChapterQuizzesPassed: boolean;
// }

// const QuizButton: React.FC<QuizButtonProps> = ({
//   courseId,
//   quizId,
//   allChaptersCompleted,
//   allChapterQuizzesPassed,
//   courseName,

// }) => {
//   const router = useRouter();
//   const { userId } = useAuth();
//   const [isPulsing, setIsPulsing] = useState(false);
//   const [isQuizPassed, setIsQuizPassed] = useState(false);
//   const [showButton, setShowButton] = useState(
//     allChaptersCompleted && allChapterQuizzesPassed
//   );

//   const fetchQuizStatus = useCallback(async () => {
//     if (!quizId || !userId) return;

//     try {
//       const response = await axios.get(
//         `${BASE_URL}/api/courses/${courseId}/quizzes/${quizId}/results`,
//         {
//           headers: {
//             "user-id": userId,
//           },
//           withCredentials: true,
//         }
//       );
//       const scorePercentage =
//         response.data.totalQuestions > 0
//           ? (response.data.score / response.data.totalQuestions) * 100
//           : 0;
//       setIsQuizPassed(scorePercentage >= 60);
//       console.log(
//         `Final quiz status: score=${response.data.score}, totalQuestions=${response.data.totalQuestions}, passed=${scorePercentage >= 60}`
//       );
//     } catch (error: any) {
//       if (error.response?.status === 404) {
//         setIsQuizPassed(false);
//         console.log("No final quiz results found");
//       } else {
//         console.error("Failed to fetch final quiz status:", error.message);
//       }
//     }
//   }, [courseId, quizId, userId]);

//   useEffect(() => {
//     setIsPulsing(true);
//     const timer = setTimeout(() => setIsPulsing(false), 1500);
//     return () => clearTimeout(timer);
//   }, []);

//   useEffect(() => {
//     fetchQuizStatus();
//     setShowButton(allChaptersCompleted && allChapterQuizzesPassed);
//   }, [fetchQuizStatus, allChaptersCompleted, allChapterQuizzesPassed]);

//   // Listen for quiz submission events
//   useEffect(() => {
//     const handleQuizSubmitted = () => {
//       fetchQuizStatus();
//     };

//     const handleChapterQuizSubmitted = () => {
//       setShowButton(allChaptersCompleted && allChapterQuizzesPassed);
//       fetchQuizStatus();
//     };

//     window.addEventListener("quizSubmitted", handleQuizSubmitted);
//     window.addEventListener("chapterQuizSubmitted", handleChapterQuizSubmitted);
//     return () => {
//       window.removeEventListener("quizSubmitted", handleQuizSubmitted);
//       window.removeEventListener(
//         "chapterQuizSubmitted",
//         handleChapterQuizSubmitted
//       );
//     };
//   }, [fetchQuizStatus, allChaptersCompleted, allChapterQuizzesPassed]);

//   const handleClick = () => {
//     if (isQuizPassed) {
//       console.log('Navigating to certificate with courseName:', courseName, 'courseId:', courseId);
//       const queryParams = new URLSearchParams();
//       if (courseId) queryParams.set('courseId', courseId);
//       queryParams.set('courseTitle', encodeURIComponent(courseName));
//       router.push(`/Graduation?${queryParams.toString()}`);
//     } else {
//       console.log("Navigating to:", `/courses/${courseId}/quizzes/${quizId}`);
//       router.push(`/courses/${courseId}/quizzes/${quizId}`);
//     }
//   };

//   if (!showButton) return null;

//   return (
//     <button
//       className={`w-full h-12 bg-gradient-to-r from-blue-500 to-teal-500 text-white font-semibold rounded-lg shadow-md
//                   hover:shadow-lg transition-shadow duration-300 transform hover:scale-105
//                   relative overflow-hidden group ${isPulsing ? "animate-pulse" : ""}`}
//       onClick={handleClick}
//     >
//       <span className="absolute inset-0 w-full h-full bg-white opacity-0 transition-opacity duration-300 group-hover:opacity-10 rounded-lg" />
//       <span className="relative z-10">
//         {isQuizPassed ? "NOW I AM CERTIFIED" : "TAKE A QUIZ"}
//       </span>
//     </button>
//   );
// };

// export default QuizButton;







// // components/quiz-button.tsx
// "use client";
// import React, { useEffect, useState, useCallback } from "react";
// import { useRouter } from "next/navigation";
// import axios from "axios";
// import { useAuth } from "@clerk/nextjs";

// const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// interface QuizButtonProps {
//   courseId: string;
//   chapterId?: string;
//   courseName: string;
//   quizId: string | null;
//   allChaptersCompleted: boolean;
//   allChapterQuizzesPassed: boolean;
// }

// const QuizButton: React.FC<QuizButtonProps> = ({
//   courseId,
//   quizId,
//   allChaptersCompleted,
//   allChapterQuizzesPassed,
//   courseName,
// }) => {
//   const router = useRouter();
//   const { userId } = useAuth();
//   const [isPulsing, setIsPulsing] = useState(false);
//   const [isQuizPassed, setIsQuizPassed] = useState(false);
//   const [showButton, setShowButton] = useState(
//     allChaptersCompleted && allChapterQuizzesPassed
//   );

//   const fetchQuizStatus = useCallback(async () => {
//     if (!quizId || !userId) return;

//     try {
//       const response = await axios.get(
//         `${BASE_URL}/api/courses/${courseId}/quizzes/${quizId}/results`,
//         {
//           headers: {
//             "user-id": userId,
//           },
//           withCredentials: true,
//         }
//       );
//       const scorePercentage =
//         response.data.totalQuestions > 0
//           ? (response.data.score / response.data.totalQuestions) * 100
//           : 0;
//       setIsQuizPassed(scorePercentage >= 60);
//       console.log(
//         `Final quiz status: score=${response.data.score}, totalQuestions=${response.data.totalQuestions}, passed=${scorePercentage >= 60}`
//       );
//     } catch (error: any) {
//       if (error.response?.status === 404) {
//         setIsQuizPassed(false);
//         console.log("No final quiz results found");
//       } else {
//         console.error("Failed to fetch final quiz status:", error.message);
//       }
//     }
//   }, [courseId, quizId, userId]);

//   // New function to check all chapter quiz statuses client-side
//   const checkAllChapterQuizzesPassed = useCallback(async () => {
//     if (!userId || !courseId) return false;

//     try {
//       // Fetch course chapters to get chapter IDs
//       const chaptersResponse = await axios.get(
//         `${BASE_URL}/api/courses/${courseId}/chapters`,
//         {
//           headers: {
//             "user-id": userId,
//           },
//           withCredentials: true,
//         }
//       );
//       const chapters = chaptersResponse.data;

//       // Check quiz status for each chapter
//       const quizStatuses = await Promise.all(
//         chapters.map(async (chapter: { id: string }) => {
//           try {
//             const response = await axios.get(
//               `${BASE_URL}/api/courses/${courseId}/chapters/${chapter.id}/chapterquizzes/results`,
//               {
//                 headers: {
//                   "user-id": userId,
//                 },
//                 withCredentials: true,
//               }
//             );
//             const scorePercentage =
//               response.data.totalQuestions > 0
//                 ? (response.data.score / response.data.totalQuestions) * 100
//                 : 0;
//             return scorePercentage >= 60;
//           } catch (error: any) {
//             if (error.response?.status === 404) {
//               return false; // No quiz results means not passed
//             }
//             console.error(
//               `Failed to fetch quiz status for chapter ${chapter.id}:`,
//               error.message
//             );
//             return false;
//           }
//         })
//       );

//       const allPassed = quizStatuses.every((passed) => passed);
//       console.log(`Client-side allChapterQuizzesPassed: ${allPassed}`);
//       return allPassed;
//     } catch (error) {
//       console.error("Failed to fetch chapters:", error);
//       return false;
//     }
//   }, [courseId, userId]);

//   useEffect(() => {
//     setIsPulsing(true);
//     const timer = setTimeout(() => setIsPulsing(false), 1500);
//     return () => clearTimeout(timer);
//   }, []);

//   useEffect(() => {
//     fetchQuizStatus();
//     setShowButton(allChaptersCompleted && allChapterQuizzesPassed);
//   }, [fetchQuizStatus, allChaptersCompleted, allChapterQuizzesPassed]);

//   // Listen for quiz submission events
//   useEffect(() => {
//     const handleQuizSubmitted = () => {
//       fetchQuizStatus();
//     };

//     const handleChapterQuizSubmitted = async () => {
//       console.log("Received chapterQuizSubmitted event");
//       // Re-check all chapter quizzes client-side
//       const clientAllChapterQuizzesPassed = await checkAllChapterQuizzesPassed();
//       setShowButton(allChaptersCompleted && clientAllChapterQuizzesPassed);
//       fetchQuizStatus();
//     };

//     window.addEventListener("quizSubmitted", handleQuizSubmitted);
//     window.addEventListener("chapterQuizSubmitted", handleChapterQuizSubmitted);
//     return () => {
//       window.removeEventListener("quizSubmitted", handleQuizSubmitted);
//       window.removeEventListener(
//         "chapterQuizSubmitted",
//         handleChapterQuizSubmitted
//       );
//     };
//   }, [
//     fetchQuizStatus,
//     allChaptersCompleted,
//     allChapterQuizzesPassed,
//     checkAllChapterQuizzesPassed,
//   ]);

//   const handleClick = () => {
//     if (isQuizPassed) {
//       console.log(
//         "Navigating to certificate with courseName:",
//         courseName,
//         "courseId:",
//         courseId
//       );
//       const queryParams = new URLSearchParams();
//       if (courseId) queryParams.set("courseId", courseId);
//       queryParams.set("courseTitle", encodeURIComponent(courseName));
//       router.push(`/Graduation?${queryParams.toString()}`);
//     } else {
//       console.log("Navigating to:", `/courses/${courseId}/quizzes/${quizId}`);
//       router.push(`/courses/${courseId}/quizzes/${quizId}`);
//     }
//   };

//   if (!showButton) return null;

//   return (
//     <button
//       className={`w-full h-12 bg-gradient-to-r from-blue-500 to-teal-500 text-white font-semibold rounded-lg shadow-md
//                   hover:shadow-lg transition-shadow duration-300 transform hover:scale-105
//                   relative overflow-hidden group ${isPulsing ? "animate-pulse" : ""}`}
//       onClick={handleClick}
//     >
//       <span className="absolute inset-0 w-full h-full bg-white opacity-0 transition-opacity duration-300 group-hover:opacity-10 rounded-lg" />
//       <span className="relative z-10">
//         {isQuizPassed ? "NOW I AM CERTIFIED" : "TAKE A QUIZ"}
//       </span>
//     </button>
//   );
// };

// export default QuizButton;





// // components/quiz-button.tsx
// "use client";
// import React, { useEffect, useState, useCallback } from "react";
// import { useRouter } from "next/navigation";
// import axios from "axios";
// import { useAuth } from "@clerk/nextjs";

// const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// interface QuizButtonProps {
//   courseId: string;
//   chapterId?: string;
//   courseName: string;
//   quizId: string | null;
//   allChaptersCompleted: boolean;
//   allChapterQuizzesPassed: boolean;
//   isLastChapterPassed?: boolean;
// }

// const QuizButton: React.FC<QuizButtonProps> = ({
//   courseId,
//   quizId,
//   allChaptersCompleted,
//   allChapterQuizzesPassed,
//   courseName,
//   isLastChapterPassed,
// }) => {
//   const router = useRouter();
//   const { userId } = useAuth();
//   const [isPulsing, setIsPulsing] = useState(false);
//   const [isQuizPassed, setIsQuizPassed] = useState(false);
//   const [showButton, setShowButton] = useState(
//     allChaptersCompleted && allChapterQuizzesPassed
//   );

//   const fetchQuizStatus = useCallback(async () => {
//     if (!quizId || !userId) return;

//     try {
//       const response = await axios.get(
//         `${BASE_URL}/api/courses/${courseId}/quizzes/${quizId}/results`,
//         {
//           headers: {
//             "user-id": userId,
//           },
//           withCredentials: true,
//         }
//       );
//       const scorePercentage =
//         response.data.totalQuestions > 0
//           ? (response.data.score / response.data.totalQuestions) * 100
//           : 0;
//       setIsQuizPassed(scorePercentage >= 60);
//       console.log(
//         `Final quiz status: score=${response.data.score}, totalQuestions=${response.data.totalQuestions}, passed=${scorePercentage >= 60}`
//       );
//     } catch (error: any) {
//       if (error.response?.status === 404) {
//         setIsQuizPassed(false);
//         console.log("No final quiz results found");
//       } else {
//         console.error("Failed to fetch final quiz status:", error.message);
//       }
//     }
//   }, [courseId, quizId, userId]);

//   // New function to check all chapter quiz statuses client-side
//   const checkAllChapterQuizzesPassed = useCallback(async () => {
//     if (!userId || !courseId) return false;

//     try {
//       // Fetch course chapters to get chapter IDs
//       const chaptersResponse = await axios.get(
//         `${BASE_URL}/api/courses/${courseId}/chapters`,
//         {
//           headers: {
//             "user-id": userId,
//           },
//           withCredentials: true,
//         }
//       );
//       const chapters = chaptersResponse.data;

//       // Check quiz status for each chapter
//       const quizStatuses = await Promise.all(
//         chapters.map(async (chapter: { id: string }) => {
//           try {
//             const response = await axios.get(
//               `${BASE_URL}/api/courses/${courseId}/chapters/${chapter.id}/chapterquizzes/results`,
//               {
//                 headers: {
//                   "user-id": userId,
//                 },
//                 withCredentials: true,
//               }
//             );
//             const scorePercentage =
//               response.data.totalQuestions > 0
//                 ? (response.data.score / response.data.totalQuestions) * 100
//                 : 0;
//             return scorePercentage >= 60;
//           } catch (error: any) {
//             if (error.response?.status === 404) {
//               return false; // No quiz results means not passed
//             }
//             console.error(
//               `Failed to fetch quiz status for chapter ${chapter.id}:`,
//               error.message
//             );
//             return false;
//           }
//         })
//       );

//       const allPassed = quizStatuses.every((passed) => passed);
//       console.log(`Client-side allChapterQuizzesPassed: ${allPassed}`);
//       return allPassed;
//     } catch (error) {
//       console.error("Failed to fetch chapters:", error);
//       return false;
//     }
//   }, [courseId, userId]);

//   useEffect(() => {
//     setIsPulsing(true);
//     const timer = setTimeout(() => setIsPulsing(false), 1500);
//     return () => clearTimeout(timer);
//   }, []);

//   useEffect(() => {
//     fetchQuizStatus();
//     setShowButton(allChaptersCompleted && allChapterQuizzesPassed);
//   }, [fetchQuizStatus, allChaptersCompleted, allChapterQuizzesPassed]);

//   // Listen for quiz submission events
//   useEffect(() => {
//     const handleQuizSubmitted = () => {
//       fetchQuizStatus();
//     };

//     const handleChapterQuizSubmitted = async () => {
//       console.log("Received chapterQuizSubmitted event");
//       // Re-check all chapter quizzes client-side
//       const clientAllChapterQuizzesPassed = await checkAllChapterQuizzesPassed();
//       setShowButton(allChaptersCompleted && clientAllChapterQuizzesPassed);
//       fetchQuizStatus();
//     };

//     const handleLastChapterPassed = () => {
//       console.log("Received lastChapterQuizPassed event");
//       setShowButton(true);
//     };

//     window.addEventListener("quizSubmitted", handleQuizSubmitted);
//     window.addEventListener("chapterQuizSubmitted", handleChapterQuizSubmitted);
//     window.addEventListener("lastChapterQuizPassed", handleLastChapterPassed);
    
//     return () => {
//       window.removeEventListener("quizSubmitted", handleQuizSubmitted);
//       window.removeEventListener(
//         "chapterQuizSubmitted",
//         handleChapterQuizSubmitted
//       );
//       window.removeEventListener("lastChapterQuizPassed", handleLastChapterPassed);
//     };
//   }, [
//     fetchQuizStatus,
//     allChaptersCompleted,
//     allChapterQuizzesPassed,
//     checkAllChapterQuizzesPassed,
//   ]);

//   const handleClick = () => {
//     if (isQuizPassed) {
//       console.log(
//         "Navigating to certificate with courseName:",
//         courseName,
//         "courseId:",
//         courseId
//       );
//       const queryParams = new URLSearchParams();
//       if (courseId) queryParams.set("courseId", courseId);
//       queryParams.set("courseTitle", encodeURIComponent(courseName));
//       router.push(`/Graduation?${queryParams.toString()}`);
//     } else {
//       console.log("Navigating to:", `/courses/${courseId}/quizzes/${quizId}`);
//       router.push(`/courses/${courseId}/quizzes/${quizId}`);
//     }
//   };

//   if (!showButton) return null;

//   return (
//     <button
//       className={`w-full h-12 bg-gradient-to-r from-blue-500 to-teal-500 text-white font-semibold rounded-lg shadow-md
//                   hover:shadow-lg transition-shadow duration-300 transform hover:scale-105
//                   relative overflow-hidden group ${isPulsing ? "animate-pulse" : ""}`}
//       onClick={handleClick}
//     >
//       <span className="absolute inset-0 w-full h-full bg-white opacity-0 transition-opacity duration-300 group-hover:opacity-10 rounded-lg" />
//       <span className="relative z-10">
//         {isQuizPassed ? "NOW I AM CERTIFIED" : "TAKE A QUIZ"}
//       </span>
//     </button>
//   );
// };

// export default QuizButton;





// components/quiz-button.tsx
// "use client";
// import React, { useEffect, useState, useCallback } from "react";
// import { useRouter } from "next/navigation";
// import axios from "axios";
// import { useAuth } from "@clerk/nextjs";

// const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// interface QuizButtonProps {
//   courseId: string;
//   chapterId?: string;
//   courseName: string;
//   quizId: string | null;
//   allChaptersCompleted: boolean;
//   allChapterQuizzesPassed: boolean;
// }

// const QuizButton: React.FC<QuizButtonProps> = ({
//   courseId,
//   quizId,
//   allChaptersCompleted,
//   allChapterQuizzesPassed,
//   courseName,
// }) => {
//   const router = useRouter();
//   const { userId } = useAuth();
//   const [isPulsing, setIsPulsing] = useState(false);
//   const [isQuizPassed, setIsQuizPassed] = useState(false);
//   const [showButton, setShowButton] = useState(
//     allChaptersCompleted && allChapterQuizzesPassed
//   );

//   const fetchQuizStatus = useCallback(async () => {
//     if (!quizId || !userId) return;

//     try {
//       const response = await axios.get(
//         `${BASE_URL}/api/courses/${courseId}/quizzes/${quizId}/results`,
//         {
//           headers: {
//             "user-id": userId,
//           },
//           withCredentials: true,
//         }
//       );
//       const scorePercentage =
//         response.data.totalQuestions > 0
//           ? (response.data.score / response.data.totalQuestions) * 100
//           : 0;
//       setIsQuizPassed(scorePercentage >= 60);
//       console.log(
//         `Final quiz status: score=${response.data.score}, totalQuestions=${response.data.totalQuestions}, passed=${scorePercentage >= 60}`
//       );
//     } catch (error: any) {
//       if (error.response?.status === 404) {
//         setIsQuizPassed(false);
//         console.log("No final quiz results found");
//       } else {
//         console.error("Failed to fetch final quiz status:", error.message);
//       }
//     }
//   }, [courseId, quizId, userId]);

//   const checkAllChapterQuizzesPassed = useCallback(async () => {
//     if (!userId || !courseId) return false;

//     try {
//       const chaptersResponse = await axios.get(
//         `${BASE_URL}/api/courses/${courseId}/chapters`,
//         {
//           headers: {
//             "user-id": userId,
//           },
//           withCredentials: true,
//         }
//       );
//       const chapters = chaptersResponse.data;

//       const quizStatuses = await Promise.all(
//         chapters.map(async (chapter: { id: string }) => {
//           try {
//             const response = await axios.get(
//               `${BASE_URL}/api/courses/${courseId}/chapters/${chapter.id}/chapterquizzes/results`,
//               {
//                 headers: {
//                   "user-id": userId,
//                 },
//                 withCredentials: true,
//               }
//             );
//             const scorePercentage =
//               response.data.totalQuestions > 0
//                 ? (response.data.score / response.data.totalQuestions) * 100
//                 : 0;
//             return scorePercentage >= 60;
//           } catch (error: any) {
//             if (error.response?.status === 404) {
//               return false;
//             }
//             console.error(
//               `Failed to fetch quiz status for chapter ${chapter.id}:`,
//               error.message
//             );
//             return false;
//           }
//         })
//       );

//       const allPassed = quizStatuses.every((passed) => passed);
//       console.log(`Client-side allChapterQuizzesPassed: ${allPassed}`);
//       return allPassed;
//     } catch (error) {
//       console.error("Failed to fetch chapters:", error);
//       return false;
//     }
//   }, [courseId, userId]);

//   useEffect(() => {
//     setIsPulsing(true);
//     const timer = setTimeout(() => setIsPulsing(false), 1500);
//     return () => clearTimeout(timer);
//   }, []);

//   useEffect(() => {
//     fetchQuizStatus();
//     setShowButton(allChaptersCompleted && allChapterQuizzesPassed);
//   }, [fetchQuizStatus, allChaptersCompleted, allChapterQuizzesPassed]);

//   useEffect(() => {
//     const handleLastChapterPassed = (event: CustomEvent) => {
//       console.log("Received lastChapterQuizPassed event:", event.detail);
//       if (event.detail.courseId === courseId) {
//         console.log("Last chapter quiz passed, showing quiz button");
//         setShowButton(true);
//       }
//     };

//     window.addEventListener("lastChapterQuizPassed", handleLastChapterPassed as EventListener);
//     return () => {
//       window.removeEventListener("lastChapterQuizPassed", handleLastChapterPassed as EventListener);
//     };
//   }, [courseId]);

//   useEffect(() => {
//     const handleQuizSubmitted = () => {
//       fetchQuizStatus();
//     };

//     const handleChapterQuizSubmitted = async () => {
//       console.log("Received chapterQuizSubmitted event");
//       const clientAllChapterQuizzesPassed = await checkAllChapterQuizzesPassed();
//       setShowButton(allChaptersCompleted && clientAllChapterQuizzesPassed);
//       fetchQuizStatus();
//     };

//     window.addEventListener("quizSubmitted", handleQuizSubmitted);
//     window.addEventListener("chapterQuizSubmitted", handleChapterQuizSubmitted);
//     return () => {
//       window.removeEventListener("quizSubmitted", handleQuizSubmitted);
//       window.removeEventListener(
//         "chapterQuizSubmitted",
//         handleChapterQuizSubmitted
//       );
//     };
//   }, [
//     fetchQuizStatus,
//     allChaptersCompleted,
//     allChapterQuizzesPassed,
//     checkAllChapterQuizzesPassed,
//   ]);

//   const handleClick = () => {
//     if (isQuizPassed) {
//       console.log(
//         "Navigating to certificate with courseName:",
//         courseName,
//         "courseId:",
//         courseId
//       );
//       const queryParams = new URLSearchParams();
//       if (courseId) queryParams.set("courseId", courseId);
//       queryParams.set("courseTitle", encodeURIComponent(courseName));
//       router.push(`/Graduation?${queryParams.toString()}`);
//     } else {
//       console.log("Navigating to:", `/courses/${courseId}/quizzes/${quizId}`);
//       router.push(`/courses/${courseId}/quizzes/${quizId}`);
//     }
//   };

//   if (!showButton) return null;

//   return (
//     <button
//       className={`w-full h-12 bg-gradient-to-r from-blue-500 to-teal-500 text-white font-semibold rounded-lg shadow-md
//                   hover:shadow-lg transition-shadow duration-300 transform hover:scale-105
//                   relative overflow-hidden group ${isPulsing ? "animate-pulse" : ""}`}
//       onClick={handleClick}
//     >
//       <span className="absolute inset-0 w-full h-full bg-white opacity-0 transition-opacity duration-300 group-hover:opacity-10 rounded-lg" />
//       <span className="relative z-10">
//         {isQuizPassed ? "NOW I AM CERTIFIED" : "TAKE A QUIZ"}
//       </span>
//     </button>
//   );
// };

// export default QuizButton;






// components/quiz-button.tsx
"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

interface QuizButtonProps {
  courseId: string;
  chapterId?: string;
  courseName: string;
  quizId: string | null;
  allChaptersCompleted: boolean;
  allChapterQuizzesPassed: boolean;
}

const QuizButton: React.FC<QuizButtonProps> = ({
  courseId,
  quizId,
  allChaptersCompleted,
  allChapterQuizzesPassed,
  courseName,
}) => {
  const router = useRouter();
  const { userId } = useAuth();
  const [isPulsing, setIsPulsing] = useState(false);
  const [isQuizPassed, setIsQuizPassed] = useState(false);
  const [showButton, setShowButton] = useState(
    allChaptersCompleted && allChapterQuizzesPassed
  );

  const fetchQuizStatus = useCallback(async () => {
    if (!quizId || !userId) return;

    try {
      const response = await axios.get(
        `${BASE_URL}/api/courses/${courseId}/quizzes/${quizId}/results`,
        {
          headers: {
            "user-id": userId,
          },
          withCredentials: true,
        }
      );
      const scorePercentage =
        response.data.totalQuestions > 0
          ? (response.data.score / response.data.totalQuestions) * 100
          : 0;
      setIsQuizPassed(scorePercentage >= 60);
      console.log(
        `Final quiz status: score=${response.data.score}, totalQuestions=${response.data.totalQuestions}, passed=${scorePercentage >= 60}`
      );
    } catch (error: any) {
      if (error.response?.status === 404) {
        setIsQuizPassed(false);
        console.log("No final quiz results found");
      } else {
        console.error("Failed to fetch final quiz status:", error.message);
      }
    }
  }, [courseId, quizId, userId]);

  const checkAllChapterQuizzesPassed = useCallback(async () => {
    if (!userId || !courseId) return false;

    try {
      const chaptersResponse = await axios.get(
        `${BASE_URL}/api/courses/${courseId}/chapters`,
        {
          headers: {
            "user-id": userId,
          },
          withCredentials: true,
        }
      );
      const chapters = chaptersResponse.data;

      const quizStatuses = await Promise.all(
        chapters.map(async (chapter: { id: string }) => {
          try {
            const response = await axios.get(
              `${BASE_URL}/api/courses/${courseId}/chapters/${chapter.id}/chapterquizzes/results`,
              {
                headers: {
                  "user-id": userId,
                },
                withCredentials: true,
              }
            );
            const scorePercentage =
              response.data.totalQuestions > 0
                ? (response.data.score / response.data.totalQuestions) * 100
                : 0;
            return scorePercentage >= 60;
          } catch (error: any) {
            if (error.response?.status === 404) {
              return false;
            }
            console.error(
              `Failed to fetch quiz status for chapter ${chapter.id}:`,
              error.message
            );
            return false;
          }
        })
      );

      const allPassed = quizStatuses.every((passed) => passed);
      console.log(`Client-side allChapterQuizzesPassed: ${allPassed}`);
      return allPassed;
    } catch (error) {
      console.error("Failed to fetch chapters:", error);
      return false;
    }
  }, [courseId, userId]);

  useEffect(() => {
    setIsPulsing(true);
    const timer = setTimeout(() => setIsPulsing(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    fetchQuizStatus();
    setShowButton(allChaptersCompleted && allChapterQuizzesPassed);
    console.log("Initial QuizButton state:", {
      allChaptersCompleted,
      allChapterQuizzesPassed,
      showButton: allChaptersCompleted && allChapterQuizzesPassed,
    });
  }, [fetchQuizStatus, allChaptersCompleted, allChapterQuizzesPassed]);

  useEffect(() => {
    const handleLastChapterPassed = (event: CustomEvent) => {
      console.log("Received lastChapterQuizPassed event:", event.detail);
      if (event.detail.courseId === courseId) {
        console.log("Last chapter quiz passed, showing quiz button");
        setShowButton(true);
      }
    };

    window.addEventListener("lastChapterQuizPassed", handleLastChapterPassed as EventListener);
    return () => {
      window.removeEventListener("lastChapterQuizPassed", handleLastChapterPassed as EventListener);
    };
  }, [courseId]);

  useEffect(() => {
    const handleQuizSubmitted = () => {
      fetchQuizStatus();
    };

    const handleChapterQuizSubmitted = async () => {
      console.log("Received chapterQuizSubmitted event");
      const clientAllChapterQuizzesPassed = await checkAllChapterQuizzesPassed();
      setShowButton(allChaptersCompleted && clientAllChapterQuizzesPassed);
      fetchQuizStatus();
      console.log("Updated QuizButton state after chapterQuizSubmitted:", {
        allChaptersCompleted,
        clientAllChapterQuizzesPassed,
        showButton: allChaptersCompleted && clientAllChapterQuizzesPassed,
      });
    };

    window.addEventListener("quizSubmitted", handleQuizSubmitted);
    window.addEventListener("chapterQuizSubmitted", handleChapterQuizSubmitted);
    return () => {
      window.removeEventListener("quizSubmitted", handleQuizSubmitted);
      window.removeEventListener(
        "chapterQuizSubmitted",
        handleChapterQuizSubmitted
      );
    };
  }, [
    fetchQuizStatus,
    allChaptersCompleted,
    allChapterQuizzesPassed,
    checkAllChapterQuizzesPassed,
  ]);

  const handleClick = () => {
    if (isQuizPassed) {
      console.log(
        "Navigating to certificate with courseName:",
        courseName,
        "courseId:",
        courseId
      );
      const queryParams = new URLSearchParams();
      if (courseId) queryParams.set("courseId", courseId);
      queryParams.set("courseTitle", encodeURIComponent(courseName));
      router.push(`/Graduation?${queryParams.toString()}`);
    } else {
      console.log("Navigating to:", `/courses/${courseId}/quizzes/${quizId}`);
      router.push(`/courses/${courseId}/quizzes/${quizId}`);
    }
  };

  if (!showButton) {
    console.log("QuizButton not shown:", { showButton });
    return null;
  }

  return (
    <button
      className={`w-full h-12 bg-gradient-to-r from-blue-500 to-teal-500 text-white font-semibold rounded-lg shadow-md
                  hover:shadow-lg transition-shadow duration-300 transform hover:scale-105
                  relative overflow-hidden group ${isPulsing ? "animate-pulse" : ""}`}
      onClick={handleClick}
    >
      <span className="absolute inset-0 w-full h-full bg-white opacity-0 transition-opacity duration-300 group-hover:opacity-10 rounded-lg" />
      <span className="relative z-10">
        {isQuizPassed ? "NOW I AM CERTIFIED" : "TAKE A QUIZ"}
      </span>
    </button>
  );
};

export default QuizButton;