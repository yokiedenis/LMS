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
//         const response = await axios.get(`/api/courses/${courseId}/quizzes/${quizId}/chapterquiz`);
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
//           score={result.score}
//           totalQuestions={result.totalQuestions}
//           showRevisitMessage={showRevisitMessage}
//           onClose={() => setIsResultPopupVisible(false)}
//         />
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
import { useAuth } from "@clerk/nextjs";
import ResultPopup from "@/components/resultpopup";
import Confetti from "react-confetti";
import { Banner } from "@/components/banner";

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
}

interface ResultPopupProps {
  userName: string;
  courseName: string;
  score: number;
  totalQuestions: number;
  passingPercentage: number;
  completionDate: string; // Changed from Date to string
  showRevisitMessage: boolean;
  onClose: () => void;
}

export const ChapterQuizForm = ({ quizId, courseId, chapterId }: ChapterQuizFormProps) => {
  const [quiz, setQuiz] = useState<QuizQuestion[]>([]);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{ score: number; totalQuestions: number } | null>(null);
  const [isResultPopupVisible, setIsResultPopupVisible] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);
  const [showRevisitMessage, setShowRevisitMessage] = useState(false);
  const [showCongratsBanner, setShowCongratsBanner] = useState(false);
  const [courseName, setCourseName] = useState<string>(""); // New state for course name
  const [userName, setUserName] = useState<string>(""); // New state for user name
  const [completionDate, setCompletionDate] = useState<string>(new Date().toISOString()); // Changed to string

  const { userId } = useAuth();

  useEffect(() => {
    const fetchQuizAndDetails = async () => {
      setIsLoading(true);
      try {
        // Fetch quiz questions
        const response = await axios.get(`/api/courses/${courseId}/quizzes/${quizId}/chapterquiz`);
        if (response.data && response.data.questions) {
          setQuiz(response.data.questions);
        } else {
          toast.error("No questions found for this quiz.");
        }

        // Fetch course name (assuming this endpoint exists)
        const courseResponse = await axios.get(`/api/courses/${courseId}`);
        setCourseName(courseResponse.data.name || "Unknown Course");

        // Fetch user name (assuming this is available via Clerk or another API)
        if (userId) {
          const userResponse = await axios.get(`/api/users/${userId}`);
          setUserName(userResponse.data.name || "User");
        }

      } catch (error) {
        toast.error("Failed to load quiz or details.");
        console.error("Error fetching quiz or details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuizAndDetails();
  }, [quizId, courseId, userId]);

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

      // Update completion date as string
      setCompletionDate(new Date().toISOString());

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

  return (
    <div className="p-6">
      {showCongratsBanner && <Banner variant="success" label="Congratulations! You passed the quiz." />}
      {showFireworks && <Confetti />}
      {isResultPopupVisible && result && userName && courseName && (
        <ResultPopup
          userName={userName}
          courseName={courseName}
          score={result.score}
          totalQuestions={result.totalQuestions}
          passingPercentage={60}
          completionDate={completionDate} // Now a string
          showRevisitMessage={showRevisitMessage}
          onClose={() => setIsResultPopupVisible(false)}
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