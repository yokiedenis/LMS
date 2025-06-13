// "use client";

// import { useEffect, useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { Button } from "@/components/ui/button";
// import { Loader2 } from "lucide-react";
// import { useAuth } from "@clerk/nextjs";
// import ResultPopup from "@/components/resultpopup";
// import Confetti from "react-confetti";
// import { Banner } from "@/components/banner";

// interface QuizOption {
//   id: string;
//   text: string;
// }

// interface QuizQuestion {
//   id: string;
//   questionText: string;
//   options: QuizOption[];
//   correctAnswer: string;
// }

// interface ChapterQuizFormProps {
//   quizId: string;
//   courseId: string;
//   chapterId: string;
// }

// export const ChapterQuizForm = ({ quizId, courseId, chapterId }: ChapterQuizFormProps) => {
//   const [quiz, setQuiz] = useState<QuizQuestion[]>([]);
//   const [answers, setAnswers] = useState<{ [key: string]: string }>({});
//   const [isLoading, setIsLoading] = useState(true);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [result, setResult] = useState<{ score: number; totalQuestions: number } | null>(null);
//   const [isResultPopupVisible, setIsResultPopupVisible] = useState(false);
//   const [showFireworks, setShowFireworks] = useState(false);
//   const [showRevisitMessage, setShowRevisitMessage] = useState(false);
//   const [showCongratsBanner, setShowCongratsBanner] = useState(false);

//   const { userId } = useAuth();

//   useEffect(() => {
//     const fetchQuiz = async () => {
//       setIsLoading(true);
//       try {
//         const response = await axios.get(`/api/courses/${courseId}/quizzes/${quizId}`);
//         if (response.data && response.data.questions) {
//           setQuiz(response.data.questions);
//         } else {
//           toast.error("No questions found for this quiz.");
//         }
//       } catch (error) {
//         toast.error("Failed to load quiz.");
//         console.error("Error fetching quiz:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchQuiz();
//   }, [quizId, courseId]);

//   const fetchResults = async () => {
//     try {
//       if (!userId) {
//         toast.error("User not authenticated.");
//         return;
//       }

//       const response = await axios.get(`/api/courses/${courseId}/quizzes/${quizId}/results`, {
//         headers: {
//           "user-id": userId,
//         },
//       });

//       setResult(response.data);
//       setIsResultPopupVisible(true);

//       const scorePercentage = (response.data.score / response.data.totalQuestions) * 100;

//       if (scorePercentage < 60) {
//         setShowRevisitMessage(true);
//         setShowCongratsBanner(false);
//         setShowFireworks(false);
//       } else {
//         setShowCongratsBanner(true);
//         setShowFireworks(true);
//         setShowRevisitMessage(false);

//         setTimeout(() => {
//           setShowCongratsBanner(false);
//         }, 15000);

//         setTimeout(() => setShowFireworks(false), 120000);
//       }
//     } catch (error) {
//       toast.error("Failed to fetch results.");
//       console.error("Error fetching results:", error);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     try {
//       const answersToSubmit = Object.entries(answers).map(([questionId, answerId]) => {
//         const question = quiz.find((q) => q.id === questionId);
//         const submittedAnswer = question?.options.find((option) => option.id === answerId)?.text;
//         return {
//           questionId,
//           answer: submittedAnswer || "",
//         };
//       });

//       if (!userId) {
//         toast.error("User not authenticated.");
//         return;
//       }

//       const response = await axios.post(
//         `/api/courses/${courseId}/quizzes/${quizId}/submit`,
//         { answers: answersToSubmit },
//         { headers: { "user-id": userId } }
//       );

//       if (response.data) {
//         fetchResults();
//       } else {
//         toast.error("Failed to submit quiz.");
//       }
//     } catch (error) {
//       toast.error("Failed to submit quiz.");
//       console.error("Error submitting quiz:", error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleChange = (questionId: string, optionId: string) => {
//     setAnswers((prev) => ({
//       ...prev,
//       [questionId]: optionId,
//     }));
//   };

//   return (
//     <div className="p-6">
//       {showCongratsBanner && <Banner variant="success" label="Congratulations! You passed the quiz." />}
//       {showFireworks && <Confetti />}
//       {isResultPopupVisible && result && (
//         <ResultPopup
//     score={result.score}
//     totalQuestions={result.totalQuestions}
//     passingPercentage={60} // Add this, matching your logic in fetchResults
//     showRevisitMessage={showRevisitMessage}
//     onClose={() => setIsResultPopupVisible(false)}
    
//        />
//       )}

//       {isLoading ? (
//         <div className="flex justify-center items-center">
//           <Loader2 className="animate-spin" />
//         </div>
//       ) : (
//         <form onSubmit={handleSubmit}>
//           {quiz.map((question) => (
//             <div key={question.id} className="mb-4">
//               <p className="font-semibold">{question.questionText}</p>
//               <div>
//                 {question.options.map((option) => (
//                   <div key={option.id} className="mb-2">
//                     <input
//                       type="radio"
//                       name={question.id}
//                       id={option.id}
//                       value={option.id}
//                       checked={answers[question.id] === option.id}
//                       onChange={() => handleChange(question.id, option.id)}
//                     />
//                     <label htmlFor={option.id} className="ml-2">
//                       {option.text}
//                     </label>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))}

//           <Button type="submit" disabled={isSubmitting} className="w-full mt-6" variant="success">
//             {isSubmitting ? "Submitting..." : "Submit Quiz"}
//           </Button>
//         </form>
//       )}
//     </div>
//   );
// };






"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useUser } from "@clerk/nextjs"; // Replace useAuth with useUser
import ResultPopup from "@/components/resultpopup";
import Confetti from "react-confetti";
import { Banner } from "@/components/banner";
import { getCourses } from "@/actions/get-courses";

interface QuizOption {
  id: string;
  text: string;
}

interface QuizQuestion {
  id: string;
  questionText: string;
  options: QuizOption[];
  correctAnswer: string;
}

interface ChapterQuizFormProps {
  quizId: string;
  courseId: string;
  chapterId: string;
  courseTitle?: string; // Optional prop for course title
}

export const ChapterQuizForm = ({ quizId, courseId, chapterId, courseTitle }: ChapterQuizFormProps) => {
  const [quiz, setQuiz] = useState<QuizQuestion[]>([]);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{ score: number; totalQuestions: number } | null>(null);
  const [isResultPopupVisible, setIsResultPopupVisible] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);
  const [showRevisitMessage, setShowRevisitMessage] = useState(false);
  const [showCongratsBanner, setShowCongratsBanner] = useState(false);
  const [fetchedCourseTitle, setFetchedCourseTitle] = useState<string | null>(null);

  const { user, isLoaded } = useUser(); // Use useUser instead of useAuth
  const userId = user?.id;

  useEffect(() => {
    const fetchQuiz = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`/api/courses/${courseId}/quizzes/${quizId}`);
        if (response.data && response.data.questions) {
          setQuiz(response.data.questions);
        } else {
          toast.error("No questions found for this quiz.");
        }
      } catch (error) {
        toast.error("Failed to load quiz.");
        console.error("Error fetching quiz:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchCourseTitle = async () => {
      if (!userId || courseTitle) {
        setFetchedCourseTitle(courseTitle || null);
        return;
      }
      try {
        const courses = await getCourses({ userId, title: undefined, categoryId: undefined });
        const course = courses.find((c) => c.id === courseId);
        setFetchedCourseTitle(course?.title || "Unknown Course");
      } catch (error) {
        console.error("Error fetching course title:", error);
        setFetchedCourseTitle("Unknown Course");
      }
    };

    fetchQuiz();
    if (isLoaded) {
      fetchCourseTitle();
    }
  }, [quizId, courseId, userId, courseTitle, isLoaded]);

  const fetchResults = async () => {
    try {
      if (!userId) {
        toast.error("User not authenticated.");
        return;
      }

      const response = await axios.get(`/api/courses/${courseId}/quizzes/${quizId}/results`, {
        headers: {
          "user-id": userId,
        },
      });

      setResult(response.data);
      setIsResultPopupVisible(true);

      const scorePercentage = (response.data.score / response.data.totalQuestions) * 100;

      if (scorePercentage < 60) {
        setShowRevisitMessage(true);
        setShowCongratsBanner(false);
        setShowFireworks(false);
      } else {
        setShowCongratsBanner(true);
        setShowFireworks(true);
        setShowRevisitMessage(false);

        setTimeout(() => {
          setShowCongratsBanner(false);
        }, 15000);

        setTimeout(() => setShowFireworks(false), 120000);
      }
    } catch (error) {
      toast.error("Failed to fetch results.");
      console.error("Error fetching results:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const answersToSubmit = Object.entries(answers).map(([questionId, answerId]) => {
        const question = quiz.find((q) => q.id === questionId);
        const submittedAnswer = question?.options.find((option) => option.id === answerId)?.text;
        return {
          questionId,
          answer: submittedAnswer || "",
        };
      });

      if (!userId) {
        toast.error("User not authenticated.");
        return;
      }

      const response = await axios.post(
        `/api/courses/${courseId}/quizzes/${quizId}/submit`,
        { answers: answersToSubmit },
        { headers: { "user-id": userId } }
      );

      if (response.data) {
        fetchResults();
      } else {
        toast.error("Failed to submit quiz.");
      }
    } catch (error) {
      toast.error("Failed to submit quiz.");
      console.error("Error submitting quiz:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (questionId: string, optionId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  if (!isLoaded) {
    return <div>Loading user data...</div>;
  }

  return (
    <div className="p-6">
      {showCongratsBanner && <Banner variant="success" label="Congratulations! You passed the quiz." />}
      {showFireworks && <Confetti />}
      {isResultPopupVisible && result && (
        <ResultPopup
          score={result.score}
          totalQuestions={result.totalQuestions}
          passingPercentage={60}
          showRevisitMessage={showRevisitMessage}
          onClose={() => setIsResultPopupVisible(false)}
          userName={user?.fullName || "Student"}
          courseName={fetchedCourseTitle || courseTitle || "Unknown Course"}
          completionDate={new Date().toISOString().split('T')[0]}
          courseId={courseId}
        />
      )}

      {isLoading ? (
        <div className="flex justify-center items-center">
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {quiz.map((question) => (
            <div key={question.id} className="mb-4">
              <p className="font-semibold">{question.questionText}</p>
              <div>
                {question.options.map((option) => (
                  <div key={option.id} className="mb-2">
                    <input
                      type="radio"
                      name={question.id}
                      id={option.id}
                      value={option.id}
                      checked={answers[question.id] === option.id}
                      onChange={() => handleChange(question.id, option.id)}
                    />
                    <label htmlFor={option.id} className="ml-2">
                      {option.text}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <Button type="submit" disabled={isSubmitting} className="w-full mt-6" variant="success">
            {isSubmitting ? "Submitting..." : "Submit Quiz"}
          </Button>
        </form>
      )}
    </div>
  );
};



// "use client";

// import { useEffect, useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { Button } from "@/components/ui/button";
// import { Loader2 } from "lucide-react";
// import { useAuth } from "@clerk/nextjs";
// import ResultPopup from "@/components/resultpopup";
// import Confetti from "react-confetti";
// import { Banner } from "@/components/banner";

// interface QuizOption {
//   id: string;
//   text: string;
// }

// interface QuizQuestion {
//   id: string;
//   questionText: string;
//   options: QuizOption[];
//   correctAnswer: string;
// }

// interface ChapterQuizFormProps {
//   quizId: string;
//   courseId: string;
//   chapterId: string;
// }

// export const ChapterQuizForm = ({ quizId, courseId, chapterId }: ChapterQuizFormProps) => {
//   const [quiz, setQuiz] = useState<QuizQuestion[]>([]);
//   const [answers, setAnswers] = useState<{ [key: string]: string }>({});
//   const [isLoading, setIsLoading] = useState(true);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [result, setResult] = useState<{ score: number; totalQuestions: number } | null>(null);
//   const [isResultPopupVisible, setIsResultPopupVisible] = useState(false);
//   const [showFireworks, setShowFireworks] = useState(false);
//   const [showRevisitMessage, setShowRevisitMessage] = useState(false);
//   const [showCongratsBanner, setShowCongratsBanner] = useState(false);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [totalQuestions, setTotalQuestions] = useState<number>(0);
//   const [currentDateTime, setCurrentDateTime] = useState<Date | null>(null);
//   const [isMounted, setIsMounted] = useState(false);
//   const [startTime, setStartTime] = useState<Date | null>(null);
//   const [timeTaken, setTimeTaken] = useState<string>("N/A");
//   const [quizCompleted, setQuizCompleted] = useState(false);

//   const { userId } = useAuth();

//   useEffect(() => {
//     setIsMounted(true);
//     setStartTime(new Date());

//     const fetchQuiz = async () => {
//       setIsLoading(true);
//       try {
//         const response = await axios.get(`/api/courses/${courseId}/quizzes/${quizId}`);
//         if (response.data && response.data.questions) {
//           setQuiz(response.data.questions);
//           setTotalQuestions(response.data.questions.length);
//         } else {
//           toast.error("No questions found for this quiz.");
//         }
//       } catch (error) {
//         toast.error("Failed to load quiz.");
//         console.error("Error fetching quiz:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchQuiz();

//     const timer = setInterval(() => {
//       setCurrentDateTime(new Date());
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [quizId, courseId]);

//   const fetchResults = async () => {
//     try {
//       if (!userId) {
//         toast.error("User not authenticated.");
//         return;
//       }

//       const response = await axios.get(`/api/courses/${courseId}/quizzes/${quizId}/results`, {
//         headers: { "user-id": userId },
//       });

//       setResult(response.data);
//       setIsResultPopupVisible(true);

//       const scorePercentage = (response.data.score / response.data.totalQuestions) * 100;

//       if (scorePercentage < 60) {
//         setShowRevisitMessage(true);
//         setShowCongratsBanner(false);
//         setShowFireworks(false);
//       } else {
//         setShowCongratsBanner(true);
//         setShowFireworks(true);
//         setShowRevisitMessage(false);

//         setTimeout(() => setShowCongratsBanner(false), 15000);
//         setTimeout(() => setShowFireworks(false), 120000);
//       }
//     } catch (error) {
//       toast.error("Failed to fetch results.");
//       console.error("Error fetching results:", error);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setQuizCompleted(true);

//     if (startTime && currentDateTime) {
//       const endTime = new Date();
//       const timeDiff = endTime.getTime() - startTime.getTime();
//       const seconds = Math.floor(timeDiff / 1000);
//       const minutes = Math.floor(seconds / 60);
//       const remainingSeconds = seconds % 60;
//       setTimeTaken(`${minutes} min ${remainingSeconds} sec`);
//     }

//     try {
//       const answersToSubmit = Object.entries(answers).map(([questionId, answerId]) => {
//         const question = quiz.find((q) => q.id === questionId);
//         const submittedAnswer = question?.options.find((option) => option.id === answerId)?.text;
//         return {
//           questionId,
//           answer: submittedAnswer || "",
//         };
//       });

//       if (!userId) {
//         toast.error("User not authenticated.");
//         return;
//       }

//       const response = await axios.post(
//         `/api/courses/${courseId}/quizzes/${quizId}/submit`,
//         { answers: answersToSubmit },
//         { headers: { "user-id": userId } }
//       );

//       if (response.data) {
//         fetchResults();
//       } else {
//         toast.error("Failed to submit quiz.");
//       }
//     } catch (error) {
//       toast.error("Failed to submit quiz.");
//       console.error("Error submitting quiz:", error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleChange = (questionId: string, optionId: string) => {
//     setAnswers((prev) => ({
//       ...prev,
//       [questionId]: optionId,
//     }));
//   };

//   const handleNext = () => {
//     if (currentQuestionIndex < quiz.length - 1) {
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//     }
//   };

//   const handlePrevious = () => {
//     if (currentQuestionIndex > 0) {
//       setCurrentQuestionIndex(currentQuestionIndex - 1);
//     }
//   };

//   const handleJumpToQuestion = (index: number) => {
//     setCurrentQuestionIndex(index);
//   };

//   const formatDateTime = (date: Date) => {
//     return date.toLocaleString("en-US", {
//       weekday: "long",
//       day: "numeric",
//       month: "long",
//       year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//       hour12: true,
//     });
//   };

//   return (
//     <div className="flex h-screen">
//       {/* Main Quiz Area */}
//       <div className="flex-1 p-6 bg-white">
//         <div className="bg-blue-600 text-white p-4 rounded-t-lg">
//           <h1 className="text-xl font-bold">Chapter Quiz</h1>
//           <h2 className="text-lg">Believe in yourself. You are braver than you think, and smarter than you know✨</h2>
//         </div>

//         <table className="w-full border-collapse mt-4">
//           <tbody>
//             <tr className="border-b">
//               <td className="p-2 text-sm font-semibold text-gray-600">Started on</td>
//               <td className="p-2 text-sm text-gray-800">
//                 {isMounted && startTime ? formatDateTime(startTime) : "-"}
//               </td>
//             </tr>
//             <tr className="border-b">
//               <td className="p-2 text-sm font-semibold text-gray-600">State</td>
//               <td className="p-2 text-sm text-gray-800">Finished</td>
//             </tr>
//             <tr className="border-b">
//               <td className="p-2 text-sm font-semibold text-gray-600">Completed on</td>
//               <td className="p-2 text-sm text-gray-800">
//                 {isMounted && quizCompleted && currentDateTime
//                   ? `${formatDateTime(currentDateTime)} (Time Taken: ${timeTaken})`
//                   : "-"}
//               </td>
//             </tr>
//             <tr className="border-b">
//               <td className="p-2 text-sm font-semibold text-gray-600">Time taken</td>
//               <td className="p-2 text-sm text-gray-800">{timeTaken}</td>
//             </tr>
//             <tr>
//               <td className="p-2 text-sm font-semibold text-gray-600">Grade</td>
//               <td className="p-2 text-sm text-gray-800">
//                 {result ? `${result.score} / ${result.totalQuestions}` : "N/A"}
//               </td>
//             </tr>
//           </tbody>
//         </table>

//         {isLoading ? (
//           <div className="flex justify-center items-center mt-8">
//             <Loader2 className="animate-spin text-blue-500" />
//           </div>
//         ) : (
//           <div>
//             {quiz.length > 0 && (
//               <div>
//                 <div className="mt-4">
//                   <div className="bg-blue-100 p-4 rounded-lg">
//                     <p className="font-bold text-lg text-blue-900">Question {currentQuestionIndex + 1}</p>
//                     <p className="text-blue-800 mt-2">Complete 0.00 out of 1.00</p>
//                     <p className="text-blue-800 mt-2">⬐ Flag question</p>
//                     <p className="mt-4">{quiz[currentQuestionIndex].questionText}</p>
//                   </div>
//                   <div className="mt-4 pl-4">
//                     {quiz[currentQuestionIndex].options.map((option) => (
//                       <div key={option.id} className="mb-2">
//                         <input
//                           type="radio"
//                           name={quiz[currentQuestionIndex].id}
//                           id={option.id}
//                           value={option.id}
//                           checked={answers[quiz[currentQuestionIndex].id] === option.id}
//                           onChange={() => handleChange(quiz[currentQuestionIndex].id, option.id)}
//                           className="cursor-pointer"
//                         />
//                         <label
//                           htmlFor={option.id}
//                           className="ml-2 cursor-pointer text-blue-700 hover:text-blue-900"
//                         >
//                           {option.text}
//                         </label>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 <div className="mt-6 flex justify-between">
//                   <Button
//                     onClick={handlePrevious}
//                     disabled={currentQuestionIndex === 0}
//                     className="bg-blue-600 hover:bg-blue-700 text-white"
//                   >
//                     Previous
//                   </Button>
//                   <Button
//                     onClick={handleNext}
//                     disabled={currentQuestionIndex === quiz.length - 1}
//                     className="bg-blue-600 hover:bg-blue-700 text-white"
//                   >
//                     Next
//                   </Button>
//                 </div>

//                 <Button
//                   type="submit"
//                   onClick={(e) => handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>)}
//                   disabled={isSubmitting}
//                   className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white"
//                 >
//                   {isSubmitting ? "Submitting..." : "Submit Quiz"}
//                 </Button>
//               </div>
//             )}
//           </div>
//         )}

//         {showCongratsBanner && <Banner variant="success" label="Congratulations! You passed the quiz." />}
//         {showFireworks && <Confetti />}
//         {isResultPopupVisible && result && (
//           <ResultPopup
//             score={result.score}
//             totalQuestions={totalQuestions}
//             passingPercentage={60}
//             showRevisitMessage={showRevisitMessage}
//             onClose={() => setIsResultPopupVisible(false)}
//           />
//         )}
//       </div>

//       {/* Quiz Navigation Panel */}
//       <div className="w-64 bg-gray-200 p-4">
//         <h3 className="text-lg font-semibold text-blue-800 mb-4">Quiz navigation</h3>
//         <div className="grid grid-cols-4 gap-2">
//           {Array.from({ length: totalQuestions }, (_, i) => (
//             <button
//               key={i}
//               onClick={() => handleJumpToQuestion(i)}
//               className={`w-10 h-10 rounded-full text-sm ${
//                 answers[quiz[i]?.id]
//                   ? "bg-green-500 text-white"
//                   : currentQuestionIndex === i
//                   ? "bg-blue-500 text-white"
//                   : "bg-gray-300"
//               }`}
//             >
//               {i + 1}
//             </button>
//           ))}
//         </div>
//         <p className="text-sm text-blue-600 mt-4">Show one page at a time</p>
//         <p className="text-sm text-blue-600 mt-2">Finish review</p>
//       </div>
//     </div>
//   );
// };