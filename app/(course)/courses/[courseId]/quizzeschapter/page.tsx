import { ChapterQuizForm } from "../chapters/[chapterId]/_components/chapterquizform";

const QuizPage = ({ params }: { params: { courseId: string; chapterId: string; quizId: string } }) => {
  return (
    <div>
      <h1 className="text-xl font-bold">Chapter Quiz</h1>
      <ChapterQuizForm
        courseId={params.courseId}   // Pass courseId
        quizId={params.quizId}       // Pass quizId
        chapterId={params.chapterId} // Pass chapterId
      />
    </div>
  );
};

export default QuizPage;
