// "use client";

// import { useRouter } from "next/navigation"; // Updated import
// import { useEffect, useState } from "react";

// interface ChapterQuizButtonProps {
//   courseId: string;
//   chapterId: string;
// }

// const ChapterQuizButton = ({ courseId, chapterId }: ChapterQuizButtonProps) => {
//   const [isClient, setIsClient] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     setIsClient(true); // Set isClient to true once the component is mounted on the client
//   }, []);

//   const handleQuizNavigation = () => {
//     if (isClient) {
//       // Only use the router on the client-side
//       router.push(`/courses/${courseId}/chapters/${chapterId}/quizzeschapter/`);
//     }
//   };

//   if (!isClient) {
//     // Return null if not on the client-side (SSR phase)
//     return null;
//   }

//   return (
//     <button
//       onClick={handleQuizNavigation}
//       className="w-full py-2 px-4 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none"
//     >
//       Start Chapter Quiz
//     </button>
//   );
// };

// export default ChapterQuizButton;





// "use client";

// import { useRouter } from "next/navigation"; // Updated import
// import { useEffect, useState } from "react";

// interface ChapterQuizButtonProps {
//   courseId: string;
//   chapterId: string;
//   isQuizPassed?: boolean; // New prop to indicate if the quiz is passed
//   hideOnPass?: boolean; // New optional prop to control hiding when quiz is passed
// }

// const ChapterQuizButton = ({ courseId, chapterId, isQuizPassed = false, hideOnPass = false }: ChapterQuizButtonProps) => {
//   const [isClient, setIsClient] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     setIsClient(true); // Set isClient to true once the component is mounted on the client
//   }, []);

//   const handleQuizNavigation = () => {
//     if (isClient) {
//       // Only use the router on the client-side
//       router.push(`/courses/${courseId}/chapters/${chapterId}/quizzeschapter/`);
//     }
//   };

//   if (!isClient) {
//     // Return null if not on the client-side (SSR phase)
//     return null;
//   }

//   // Hide the button if hideOnPass is true and the quiz is passed
//   if (hideOnPass && isQuizPassed) {
//     return null;
//   }

//   return (
//     <button
//       onClick={handleQuizNavigation}
//       className="w-full py-2 px-4 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none"
//     >
//       {isQuizPassed ? "Quiz Passed" : "Start Chapter Quiz"}
//     </button>
//   );
// };

// export default ChapterQuizButton;





// "use client";

// import { useRouter } from "next/navigation"; // Updated import
// import { useEffect, useState } from "react";

// interface ChapterQuizButtonProps {
//   courseId: string;
//   chapterId: string;
//   isQuizPassed?: boolean; // New prop to indicate if the quiz is passed
//   hideOnPass?: boolean; // New optional prop to control hiding when quiz is passed
// }

// const ChapterQuizButton = ({ courseId, chapterId, isQuizPassed = false, hideOnPass = false }: ChapterQuizButtonProps) => {
//   const [isClient, setIsClient] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     setIsClient(true); // Set isClient to true once the component is mounted on the client
//   }, []);

//   const handleQuizNavigation = () => {
//     if (isClient) {
//       // Only use the router on the client-side
//       router.push(`/courses/${courseId}/chapters/${chapterId}/quizzeschapter/`);
//     }
//   };

//   if (!isClient) {
//     // Return null if not on the client-side (SSR phase)
//     return null;
//   }

//   // Hide the button if hideOnPass is true and the quiz is passed
//   if (hideOnPass && isQuizPassed) {
//     return null;
//   }

//   return (
//     <button
//       onClick={handleQuizNavigation}
//       className="w-full py-2 px-4 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none"
//       disabled={isQuizPassed} // Disable the button when quiz is passed to prevent navigation
//     >
//       {isQuizPassed ? "Quiz Passed" : "Start Chapter Quiz"}
//     </button>
//   );
// };

// export default ChapterQuizButton;




// "use client";

// import { useRouter } from "next/navigation"; // Updated import
// import { useEffect, useState } from "react";

// interface ChapterQuizButtonProps {
//   courseId: string;
//   chapterId: string;
//   isQuizPassed?: boolean; // New prop to indicate if the quiz is passed
//   hideOnPass?: boolean; // New optional prop to control hiding when quiz is passed
// }

// const ChapterQuizButton = ({ courseId, chapterId, isQuizPassed = false, hideOnPass = false }: ChapterQuizButtonProps) => {
//   const [isClient, setIsClient] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     setIsClient(true); // Set isClient to true once the component is mounted on the client
//   }, []);

//   const handleQuizNavigation = () => {
//     if (isClient) {
//       // Only use the router on the client-side
//       router.push(`/courses/${courseId}/chapters/${chapterId}/quizzeschapter/`);
//     }
//   };

//   if (!isClient) {
//     // Return null if not on the client-side (SSR phase)
//     return null;
//   }

//   // Hide the button if hideOnPass is true and the quiz is passed
//   if (hideOnPass && isQuizPassed) {
//     return null;
//   }

//   return (
//     <button
//       onClick={handleQuizNavigation}
//       className="w-full py-2 px-4 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none"
//       disabled={isQuizPassed} // Disable the button when quiz is passed to prevent navigation
//     >
//       {isQuizPassed ? "Quiz Passed" : "Start Chapter Quiz"}
//     </button>
//   );
// };

// export default ChapterQuizButton;






// // components/chapter-quiz-button.tsx
// "use client";

// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import { Eye, EyeOff } from "lucide-react";

// interface ChapterQuizButtonProps {
//   courseId: string;
//   chapterId: string;
//   isQuizPassed?: boolean;
//   hideOnPass?: boolean;
// }

// const ChapterQuizButton = ({ courseId, chapterId, isQuizPassed = false, hideOnPass = false }: ChapterQuizButtonProps) => {
//   const [isClient, setIsClient] = useState(false);
//   const [isHidden, setIsHidden] = useState(hideOnPass && isQuizPassed);
//   const router = useRouter();

//   useEffect(() => {
//     setIsClient(true);

//     // Check if returning from quiz submission
//     const checkQuizStatus = async () => {
//       try {
//         const response = await fetch(`/api/courses/${courseId}/chapters/${chapterId}/chapterquizzes/results`, {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });

//         if (response.ok) {
//           const { score, totalQuestions } = await response.json();
//           const scorePercentage = totalQuestions > 0 ? (score / totalQuestions) * 100 : 0;
//           const passed = scorePercentage >= 60;

//           if (passed && !isQuizPassed) {
//             console.log(`Quiz for chapter ${chapterId} passed, refreshing course page`);
//             // Refresh the course page to update showFinalQuizButton
//             router.refresh();
//           }
//         }
//       } catch (error) {
//         console.error(`Failed to check quiz status for chapter ${chapterId}:`, error);
//       }
//     };

//     if (typeof window !== "undefined" && window.location.pathname.includes("/quizzeschapter")) {
//       checkQuizStatus();
//     }
//   }, [courseId, chapterId, isQuizPassed, router]);

//   const handleQuizNavigation = () => {
//     if (isClient) {
//       router.push(`/courses/${courseId}/chapters/${chapterId}/quizzeschapter/`);
//     }
//   };

//   const toggleVisibility = () => {
//     setIsHidden(!isHidden);
//   };

//   if (!isClient) {
//     return null;
//   }

//   return (
//     <div className="flex items-center gap-2">
//       <button
//         onClick={toggleVisibility}
//         className="p-1 text-purple-600 hover:text-purple-800 focus:outline-none"
//         aria-label={isHidden ? "Show quiz button" : "Hide quiz button"}
//       >
//         {isHidden ? <Eye size={20} /> : <EyeOff size={20} />}
//       </button>
//       {!isHidden && (
//         <button
//           onClick={handleQuizNavigation}
//           className="w-full py-2 px-4 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none"
//           disabled={isQuizPassed}
//         >
//           {isQuizPassed ? "Quiz Completed" : "Start Chapter Quiz"}
//         </button>
//       )}
//     </div>
//   );
// };

// export default ChapterQuizButton;




// // components/chapter-quiz-button.tsx
// "use client";

// import { useRouter } from "next/navigation";
// import { useEffect, useState, useCallback } from "react";
// import { Eye, EyeOff } from "lucide-react";
// import { useAuth } from "@clerk/nextjs";
// import axios from "axios";

// const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// interface ChapterQuizButtonProps {
//   courseId: string;
//   chapterId: string;
//   isQuizPassed?: boolean;
//   hideOnPass?: boolean;
//   allChaptersCompleted: boolean;
//   allChapterQuizzesPassed: boolean;
//   isLastChapter?:boolean;
// }

// const ChapterQuizButton = ({
//   courseId,
//   chapterId,
//   isQuizPassed: initialIsQuizPassed = false,
//   hideOnPass = false,
//   allChaptersCompleted,
//   allChapterQuizzesPassed,
//   isLastChapter = false,
// }: ChapterQuizButtonProps) => {
//   const [isClient, setIsClient] = useState(false);
//   const [isHidden, setIsHidden] = useState(hideOnPass && initialIsQuizPassed);
//   const [isQuizPassed, setIsQuizPassed] = useState(initialIsQuizPassed);
//   const router = useRouter();
//   const { userId } = useAuth();

//   const fetchQuizStatus = useCallback(async () => {
//     if (!userId) return;

//     try {
//       const response = await axios.get(
//         `${BASE_URL}/api/courses/${courseId}/chapters/${chapterId}/chapterquizzes/results`,
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
//       const passed = scorePercentage >= 60;
//       setIsQuizPassed(passed);
//       setIsHidden(hideOnPass && passed);
//       console.log(
//         `Chapter ${chapterId} quiz status: score=${response.data.score}, totalQuestions=${response.data.totalQuestions}, passed=${passed}`
//       );

//       if (passed && !initialIsQuizPassed) {
//         console.log(`Quiz for chapter ${chapterId} passed, notifying other components`);
//         window.dispatchEvent(new Event("chapterQuizSubmitted"));
//       }
//     } catch (error: any) {
//       if (error.response?.status === 404) {
//         setIsQuizPassed(false);
//         setIsHidden(hideOnPass && false);
//         console.log(`No quiz results for chapter ${chapterId}`);
//       } else {
//         console.error(
//           `Failed to fetch quiz status for chapter ${chapterId}:`,
//           error.message
//         );
//       }
//     }
//   }, [courseId, chapterId, userId, hideOnPass, initialIsQuizPassed]);

//   useEffect(() => {
//     setIsClient(true);
//     fetchQuizStatus();
//   }, [fetchQuizStatus]);

//   // Listen for quiz submission events
//   useEffect(() => {
//     const handleQuizSubmitted = () => {
//       fetchQuizStatus();
//     };

//     window.addEventListener("quizSubmitted", handleQuizSubmitted);
//     return () => {
//       window.removeEventListener("quizSubmitted", handleQuizSubmitted);
//     };
//   }, [fetchQuizStatus]);

//   const handleQuizNavigation = () => {
//     if (isClient) {
//       console.log(
//         "Navigating to:",
//         `/courses/${courseId}/chapters/${chapterId}/quizzeschapter/`
//       );
//       router.push(`/courses/${courseId}/chapters/${chapterId}/quizzeschapter/`);
//     }
//   };

//   const toggleVisibility = () => {
//     setIsHidden(!isHidden);
//   };

//   if (!isClient) {
//     return null;
//   }

//   return (
//     <div className="flex items-center gap-2">
//       <button
//         onClick={toggleVisibility}
//         className="p-1 text-purple-600 hover:text-purple-800 focus:outline-none"
//         aria-label={isHidden ? "Show quiz button" : "Hide quiz button"}
//       >
//         {isHidden ? <Eye size={20} /> : <EyeOff size={20} />}
//       </button>
//       {!isHidden && (
//         <button
//           onClick={handleQuizNavigation}
//           className="w-full py-2 px-4 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none"
//           disabled={isQuizPassed}
//         >
//           {isQuizPassed ? "Quiz Completed" : "Start Chapter Quiz"}
//         </button>
//       )}
//     </div>
//   );
// };

// export default ChapterQuizButton;






// components/chapter-quiz-button.tsx
// components/chapter-quiz-button.tsx
// components/chapter-quiz-button.tsx
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import ResultPopup from "@/components/resultpopupchapter";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

interface ChapterQuizButtonProps {
  courseId: string;
  chapterId: string;
  isQuizPassed?: boolean;
  hideOnPass?: boolean;
  allChaptersCompleted: boolean;
  allChapterQuizzesPassed: boolean;
  isLastChapter?: boolean;
}

const ChapterQuizButton = ({
  courseId,
  chapterId,
  isQuizPassed: initialIsQuizPassed = false,
  hideOnPass = false,
  allChaptersCompleted,
  allChapterQuizzesPassed,
  isLastChapter = false,
}: ChapterQuizButtonProps) => {
  const [isClient, setIsClient] = useState(false);
  const [isHidden, setIsHidden] = useState(hideOnPass && initialIsQuizPassed);
  const [isQuizPassed, setIsQuizPassed] = useState(initialIsQuizPassed);
  const [showPopup, setShowPopup] = useState(false);
  const [quizResult, setQuizResult] = useState<{
    score: number;
    totalQuestions: number;
  } | null>(null);
  const router = useRouter();
  const { userId } = useAuth();

  // Debugging log for props
  console.log("ChapterQuizButton props:", {
    courseId,
    chapterId,
    initialIsQuizPassed,
    isLastChapter,
  });

  const fetchQuizStatus = useCallback(async () => {
    if (!userId) return;

    try {
      const response = await axios.get(
        `${BASE_URL}/api/courses/${courseId}/chapters/${chapterId}/chapterquizzes/results`,
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
      const passed = scorePercentage >= 60;
      setIsQuizPassed(passed);
      setIsHidden(hideOnPass && passed);
      setQuizResult({
        score: response.data.score,
        totalQuestions: response.data.totalQuestions,
      });
      console.log(
        `Chapter ${chapterId} quiz status: score=${response.data.score}, totalQuestions=${response.data.totalQuestions}, passed=${passed}`
      );

      if (passed && !initialIsQuizPassed) {
        console.log(`Quiz for chapter ${chapterId} passed, notifying other components`);
        window.dispatchEvent(new Event("chapterQuizSubmitted"));
        setShowPopup(true);
      }
    } catch (error: any) {
      if (error.response?.status === 404) {
        setIsQuizPassed(false);
        setIsHidden(hideOnPass && false);
        setQuizResult(null);
        console.log(`No quiz results for chapter ${chapterId}`);
      } else {
        console.error(
          `Failed to fetch quiz status for chapter ${chapterId}:`,
          error.message
        );
      }
    }
  }, [courseId, chapterId, userId, hideOnPass, initialIsQuizPassed]);

  useEffect(() => {
    setIsClient(true);
    fetchQuizStatus();
  }, [fetchQuizStatus]);

  useEffect(() => {
    const handleQuizSubmitted = () => {
      fetchQuizStatus();
    };

    window.addEventListener("quizSubmitted", handleQuizSubmitted);
    return () => {
      window.removeEventListener("quizSubmitted", handleQuizSubmitted);
    };
  }, [fetchQuizStatus]);

  const handleQuizNavigation = () => {
    if (isClient) {
      console.log(
        "Navigating to:",
        `/courses/${courseId}/chapters/${chapterId}/quizzeschapter/`
      );
      router.push(`/courses/${courseId}/chapters/${chapterId}/quizzeschapter/`);
    }
  };

  const toggleVisibility = () => {
    setIsHidden(!isHidden);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleProceed = () => {
    handleClosePopup();
  };

  if (!isClient) {
    return null;
  }

  // Debugging log before rendering ResultPopup
  console.log("Rendering ResultPopup:", { showPopup, quizResult });

  return (
    <>
      <div className="flex items-center gap-2">
        <button
          onClick={toggleVisibility}
          className="p-1 text-purple-600 hover:text-purple-800 focus:outline-none"
          aria-label={isHidden ? "Show quiz button" : "Hide quiz button"}
        >
          {isHidden ? <Eye size={20} /> : <EyeOff size={20} />}
        </button>
        {!isHidden && (
          <button
            onClick={handleQuizNavigation}
            className="w-full py-2 px-4 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none"
            disabled={isQuizPassed}
          >
            {isQuizPassed ? "Quiz Completed" : "Start Chapter Quiz"}
          </button>
        )}
      </div>

      {showPopup && quizResult && (
        <ResultPopup
          score={quizResult.score}
          totalQuestions={quizResult.totalQuestions}
          passingPercentage={60}
          onClose={handleClosePopup}
          onReattempt={handleQuizNavigation}
          onProceed={handleProceed}
          isLastChapter={isLastChapter}
          courseId={courseId}
        />
      )}
    </>
  );
};

export default ChapterQuizButton;