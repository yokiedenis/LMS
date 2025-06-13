// "use client";

// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { useSearchParams } from "next/navigation";

// interface Option {
//   id: string;
//   text: string;
//   isCorrect: boolean;
// }

// interface Question {
//   id: string;
//   question: string;
//   options: Option[];
// }

// const ChapterQuizPage = () => {
//   const searchParams = useSearchParams();
//   const courseId = searchParams.get("courseId");
//   const chapterId = searchParams.get("chapterId");

//   const [questions, setQuestions] = useState<Question[]>([]);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (!courseId || !chapterId) {
//       setError("Course ID or Chapter ID is missing in the query parameters.");
//       setIsLoading(false);
//       return;
//     }

//     const fetchQuestions = async () => {
//       try {
//         setIsLoading(true);
//         const response = await fetch(`/api/courses/${courseId}/chapters/${chapterId}/chapterquizzes/`);
//         if (!response.ok) {
//           throw new Error(`Failed to fetch questions: ${response.statusText}`);
//         }
//         const data = await response.json();
//         setQuestions(data.questions || []);
//         setIsLoading(false);
//       } catch (err) {
//         console.error("Error fetching questions:", err);
//         setError("Failed to load questions. Please try again later.");
//         setIsLoading(false);
//       }
//     };

//     fetchQuestions();
//   }, [courseId, chapterId]);

//   if (error) {
//     return <div>{error}</div>;
//   }

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (isSubmitted) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <motion.div
//           initial={{ opacity: 0, scale: 0.5 }}
//           animate={{ opacity: 1, scale: 1 }}
//           exit={{ opacity: 0, scale: 0.5 }}
//           className="bg-white p-8 rounded-lg shadow-lg text-center"
//         >
//           <h1 className="text-2xl font-bold">Quiz Submitted!</h1>
//           <p className="mt-4">Thank you for completing the quiz.</p>
//         </motion.div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <motion.div
//         initial={{ opacity: 0, y: -50 }}
//         animate={{ opacity: 1, y: 0 }}
//         exit={{ opacity: 0, y: -50 }}
//         transition={{ duration: 0.5 }}
//         className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
//       >
//         <h2 className="text-xl font-bold mb-4">{questions[currentQuestionIndex]?.question}</h2>
//         <div className="space-y-4">
//           {questions[currentQuestionIndex]?.options.map((option) => (
//             <button
//               key={option.id}
//               onClick={() => setSelectedOptionId(option.id)}
//               className={`w-full py-2 px-4 rounded-md transition duration-300 ${
//                 selectedOptionId === option.id
//                   ? "bg-purple-600 text-white"
//                   : "bg-gray-200 text-gray-800 hover:bg-gray-300"
//               }`}
//             >
//               {option.text}
//             </button>
//           ))}
//         </div>
//         <button
//           onClick={() => {
//             if (currentQuestionIndex < questions.length - 1) {
//               setCurrentQuestionIndex(currentQuestionIndex + 1);
//               setSelectedOptionId(null);
//             } else {
//               setIsSubmitted(true);
//             }
//           }}
//           className="mt-4 w-full py-2 px-4 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition duration-300"
//           disabled={!selectedOptionId}
//         >
//           {currentQuestionIndex < questions.length - 1 ? "Next Question" : "Submit Quiz"}
//         </button>
//       </motion.div>
//     </div>
//   );
// };

// export default ChapterQuizPage;

"use client";

import { ChapterQuizPage } from "@/components/chapterQuiz";
import { useParams } from "next/navigation";

const Quizpage = () => {
  const params = useParams();

  console.log("Params:", params); // Debugging log

  const { courseId, chapterId  } = params || {}; // Fallback to avoid destructuring undefined

  if (!courseId || !chapterId  ) {
    return <div>Loading...</div>;
  }

  return (
     
      <ChapterQuizPage
        courseId={courseId as string}
        chapterId={chapterId as string}
      />
    
  );
};

export default Quizpage;
