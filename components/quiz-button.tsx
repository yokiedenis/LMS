// components/QuizButton.tsx
'use client';
import { FC } from 'react';

interface QuizButtonProps {
  onClick: () => void; // This prop is now required
}

export const QuizButton: FC<QuizButtonProps> = ({ onClick }) => {
  return (
    <button
      className="w-full bg-blue-500 text-white p-3 rounded mt-4 hover:bg-blue-600"
      onClick={onClick} // Call the onClick directly
    >
      Take Final Quiz
    </button>
  );
};
