"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

interface ChapterQuizButtonProps {
  courseId: string; // Receive courseId as a prop
  chapterId: string; // Receive chapterId as a prop
}

const ChapterQuizButton: React.FC<ChapterQuizButtonProps> = ({ courseId, chapterId }) => {
  const router = useRouter();
  const [quizId, setQuizId] = useState<string | null>(null); // State to store fetched quizId
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [isPulsing, setIsPulsing] = useState(false);

  useEffect(() => {
    // Fetch quizId from the database
    const fetchQuizId = async () => {
      try {
        const response = await axios.get(`/api/courses/${courseId}/quizzes`);
        if (response.data && response.data.quizId) {
          setQuizId(response.data.quizId); // Set fetched quizId
        } else {
          console.error("No quiz found for this course");
        }
      } catch (error) {
        console.error("Error fetching quiz ID:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuizId();
  }, [courseId]);

  useEffect(() => {
    setIsPulsing(true);
    const timer = setTimeout(() => setIsPulsing(false), 1500); // Stops pulsing after 1.5 seconds
    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    if (quizId) {
      console.log("Navigating to:", `/courses/${courseId}/chapters/${chapterId}/quizzeschapter`);
      router.push(`/courses/${courseId}/chapters/${chapterId}/quizzeschapter`); // Navigate to the quizzes page
    } else {
      console.error("Quiz ID is not available");
    }
  };

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <button
      className={`w-full h-12 bg-gradient-to-r from-blue-500 to-teal-500 text-white font-semibold rounded-lg shadow-md
                  hover:shadow-lg transition-shadow duration-300 transform hover:scale-105
                  relative overflow-hidden group ${isPulsing ? "animate-pulse" : ""}`}
      onClick={handleClick}
      disabled={!quizId}
    >
      <span className="absolute inset-0 w-full h-full bg-white opacity-0 transition-opacity duration-300 group-hover:opacity-10 rounded-lg" />
      <span className="relative z-10">
        {quizId ? "TAKE A QUIZ" : "Quiz Unavailable"}
      </span>
    </button>
  );
};

export default ChapterQuizButton;
