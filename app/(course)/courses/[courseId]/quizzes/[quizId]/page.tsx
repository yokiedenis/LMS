import { StudentQuizForm } from "@/components/studentquizform";

const QuizPage = ({ params }: { params: { courseId: string; quizId: string; chapterId?: string; } }) => {
  console.log('Route Params:', params); // Log the params to check if chapterId exists
  
  // Check if chapterId exists in the route params, else set a default value.
  const chapterId = params.chapterId || "default-chapter-id"; // Replace with the actual logic to get chapterId

  return (
    <StudentQuizForm
      courseId={params.courseId}   // Pass courseId
      quizId={params.quizId}       // Pass quizId
      chapterId={chapterId}        // Pass chapterId (either from params or default value)
    />
  );
};

export default QuizPage;
