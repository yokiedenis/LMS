"use client";

import { useRouter } from 'next/router';
import QuizUpdate from '@/components/quizupdate';

const QuizUpdatePage = () => {
  const router = useRouter();
  const { courseId, quizId } = router.query;

  // Ensure courseId and quizId are strings
  if (!courseId || !quizId || Array.isArray(courseId) || Array.isArray(quizId)) {
    return <div>Loading...</div>;
  }

  return <QuizUpdate courseId={courseId} quizId={quizId} />;
};

export default QuizUpdatePage;
