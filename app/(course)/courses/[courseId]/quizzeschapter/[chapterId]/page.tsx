"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface ChapterOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface ChapterQuestion {
  id: string;
  questionText: string;
  chapterOptions: ChapterOption[];
}

interface ChapterQuiz {
  title: string;
  questions: ChapterQuestion[];
}

const ChapterQuizForm: React.FC = () => {
  const { courseId, chapId } = useParams();
  console.log("Params:", { courseId, chapId }); // Debugging route parameters

  const [quiz, setQuiz] = useState<ChapterQuiz | null>(null);
  const [answers, setAnswers] = useState<{ [questionId: string]: string }>({});

  useEffect(() => {
    if (!courseId || !chapId) return;

    const fetchQuiz = async () => {
      console.log(`Fetching quiz for courseId=${courseId} and chapterId=${chapId}`);
      try {
        const response = await fetch(
          `/api/courses/${courseId}/chapterquizzes/${chapId}`
        );
        const data = await response.json();

        if (response.ok) {
          setQuiz(data);
        } else {
          console.error("Error fetching quiz:", data.message);
        }
      } catch (error) {
        console.error("Network error:", error);
      }
    };

    fetchQuiz();
  }, [courseId, chapId]);

  const handleAnswerChange = (questionId: string, optionId: string) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: optionId,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseId || !chapId) return;

    const quizAnswers = Object.entries(answers).map(([questionId, optionId]) => ({
      questionId,
      optionId,
    }));

    try {
      const response = await fetch("/api/submitQuiz", {
        method: "POST",
        body: JSON.stringify({
          courseId,
          chapId,
          answers: quizAnswers,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      if (response.ok) {
        console.log("Quiz submitted successfully:", result);
      } else {
        console.error("Error submitting quiz:", result.message);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  if (!courseId || !chapId) {
    return <div>Missing route parameters. Please check your URL.</div>;
  }

  if (!quiz) {
    return <div>Loading quiz...</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>{quiz.title}</h1>

      {quiz.questions.map((question) => (
        <div key={question.id}>
          <h3>{question.questionText}</h3>
          <div>
            {question.chapterOptions.map((option) => (
              <label key={option.id}>
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={option.id}
                  checked={answers[question.id] === option.id}
                  onChange={() => handleAnswerChange(question.id, option.id)}
                />
                {option.text}
              </label>
            ))}
          </div>
        </div>
      ))}

      <button type="submit">Submit Quiz</button>
    </form>
  );
};

export default ChapterQuizForm;
