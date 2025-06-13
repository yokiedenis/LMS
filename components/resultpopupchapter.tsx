// import React from "react";
// import { useUser } from "@clerk/nextjs";

// interface ResultPopupProps {
//   score: number;
//   totalQuestions: number;
//   passingPercentage: number;
//   onClose: () => void;
//   onReattempt: () => void;
//   onProceed: () => void;
// }

// const ResultPopup: React.FC<ResultPopupProps> = ({
//   score,
//   totalQuestions,
//   passingPercentage,
//   onClose,
//   onReattempt,
//   onProceed,
// }) => {
//   const { user } = useUser(); // Get the user ID from Clerk
//   const percentage = totalQuestions > 0 ? ((score / totalQuestions) * 100).toFixed(2) : "0";
//   const hasPassed = parseFloat(percentage) >= passingPercentage;

//   // Function to call API and update points
//   const updatePoints = async () => {
//     if (hasPassed && user) {
//       try {
//         const response = await fetch('/api/updatePoints', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             userId: user.id,
//             score,
//             totalQuestions,
//             passingPercentage,
//           }),
//         });

//         const data = await response.json();
//         console.log('Points updated:', data.points);
//       } catch (error) {
//         console.error('Error updating points:', error);
//       }
//     }
//   };

//   // Update points when user proceeds to the next chapter
//   const handleProceed = () => {
//     updatePoints();
//     onProceed();
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
//       <div className="bg-white rounded-lg shadow-lg p-6 transform transition-transform duration-500 ease-in-out scale-100 hover:scale-105">
//         <h3 className="font-semibold text-lg">Chapter Quiz Results</h3>
//         <p className="mt-2">
//           You scored {score} out of {totalQuestions} ({percentage}%)
//         </p>
//         <p
//           className={`mt-2 font-semibold ${hasPassed ? "text-green-600" : "text-red-600"}`}
//         >
//           {hasPassed ? "Congratulations, you passed!" : "You failed. Please try again."}
//         </p>
//         <div className="mt-4 flex space-x-4">
//           {!hasPassed && (
//             <button
//               onClick={onReattempt}
//               className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-500 transition-colors"
//             >
//               Reattempt Chapter Quiz
//             </button>
//           )}
//           {hasPassed && (
//             <button
//               onClick={handleProceed} // Use the modified function
//               className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition-colors"
//             >
//               Proceed to Next Chapter
//             </button>
//           )}
//           <button
//             onClick={onClose}
//             className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500 transition-colors"
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ResultPopup;







// import React, { useState, useEffect } from "react";
// import { useUser } from "@clerk/nextjs";
// import Confetti from "react-confetti";
// import useWindowSize from "react-use/lib/useWindowSize"; // For dynamic window dimensions

// interface ResultPopupProps {
//   score: number;
//   totalQuestions: number;
//   passingPercentage: number;
//   onClose: () => void;
//   onReattempt: () => void;
//   onProceed: () => void;
// }

// const ResultPopup: React.FC<ResultPopupProps> = ({
//   score,
//   totalQuestions,
//   passingPercentage,
//   onClose,
//   onReattempt,
//   onProceed,
// }) => {
//   const { user } = useUser();
//   const percentage = totalQuestions > 0 ? ((score / totalQuestions) * 100).toFixed(2) : "0";
//   const hasPassed = parseFloat(percentage) >= passingPercentage;

//   // State for confetti control
//   const [showConfetti, setShowConfetti] = useState(false);
//   const { width, height } = useWindowSize(); // Get dynamic window dimensions for confetti

//   // Function to call API and update points
//   const updatePoints = async () => {
//     if (hasPassed && user) {
//       try {
//         const response = await fetch('/api/updatePoints', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             userId: user.id,
//             score,
//             totalQuestions,
//             passingPercentage,
//           }),
//         });

//         const data = await response.json();
//         console.log('Points updated:', data.points);
//       } catch (error) {
//         console.error('Error updating points:', error);
//       }
//     }
//   };

//   // Trigger confetti when user passes and popup is shown
//   useEffect(() => {
//     if (hasPassed) {
//       setShowConfetti(true);
//       // Confetti stops after 10 seconds
//       const timer = setTimeout(() => setShowConfetti(false), 10000);
//       return () => clearTimeout(timer);
//     }
//   }, [hasPassed]);

//   // Update points and proceed to next chapter
//   const handleProceed = () => {
//     updatePoints();
//     onProceed();
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
//       <div className="bg-white/90 rounded-2xl shadow-2xl p-8 max-w-md w-full transform transition-all duration-700 ease-out scale-100 hover:scale-105 backdrop-blur-sm border border-white/20">
//         <h3 className="text-2xl font-bold text-gray-900 mb-4 tracking-wide">
//           Chapter Quiz Results
//         </h3>
//         <p className="text-lg text-gray-700 mb-3">
//           You scored <span className="font-semibold text-blue-600">{score}</span> out of{' '}
//           <span className="font-semibold text-blue-600">{totalQuestions}</span> (
//           <span className="font-semibold text-blue-600">{percentage}%</span>)
//         </p>
//         <p
//           className={`text-xl font-semibold mt-2 ${hasPassed ? "text-green-500" : "text-red-500"}`}
//         >
//           {hasPassed ? "Congratulations, you passed!" : "You failed. Please try again."}
//         </p>
//         <div className="mt-6 flex justify-between items-center space-x-4">
//           {!hasPassed && (
//             <button
//               onClick={onReattempt}
//               className="px-6 py-3 bg-yellow-500 text-white rounded-xl font-medium hover:bg-yellow-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
//             >
//               Reattempt Chapter Quiz
//             </button>
//           )}
//           {hasPassed && (
//             <button
//               onClick={handleProceed}
//               className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
//             >
//               Proceed to Next Chapter
//             </button>
//           )}
//           <button
//             onClick={onClose}
//             className="px-6 py-3 bg-gray-500 text-white rounded-xl font-medium hover:bg-gray-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
//           >
//             Close
//         </button>
//         </div>
//       </div>

//       {/* Massive Confetti Animation (only on pass) */}
//       {showConfetti && hasPassed && (
//         <Confetti
//           width={width}
//           height={height}
//           numberOfPieces={1000} // Larger, more impressive confetti
//           recycle={false} // Stops after animation ends
//           gravity={0.1} // Slower fall for dramatic effect
//           wind={0.01} // Slight horizontal drift
//           colors={['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD', '#D4A5A5']}
//           confettiSource={{ x: width / 2, y: 0, w: width, h: 0 }} // Confetti rains from top
         
//           className="z-60" // Ensure confetti is above other elements
//         />
//       )}
//     </div>
//   );
// };

// export default ResultPopup;







// components/resultpopupchapter.tsx
import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";

interface ResultPopupProps {
  score: number;
  totalQuestions: number;
  passingPercentage: number;
  onClose: () => void;
  onReattempt: () => void;
  onProceed: () => void;
  isLastChapter?: boolean;
  courseId?: string;
}

const ResultPopup: React.FC<ResultPopupProps> = ({
  score,
  totalQuestions,
  passingPercentage,
  onClose,
  onReattempt,
  onProceed,
  isLastChapter = false,
  courseId,
}) => {
  const { user } = useUser();
  const percentage = totalQuestions > 0 ? ((score / totalQuestions) * 100).toFixed(2) : "0";
  const hasPassed = parseFloat(percentage) >= passingPercentage;

  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();

  // Debugging log to check props and conditions
  console.log("ResultPopup props:", {
    score,
    totalQuestions,
    percentage,
    passingPercentage,
    hasPassed,
    isLastChapter,
    courseId,
  });

  const updatePoints = async () => {
    if (hasPassed && user) {
      try {
        const response = await fetch('/api/updatePoints', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: user.id,
            score,
            totalQuestions,
            passingPercentage,
          }),
        });

        const data = await response.json();
        console.log('Points updated:', data.points);
      } catch (error) {
        console.error('Error updating points:', error);
      }
    }
  };

  useEffect(() => {
    if (hasPassed) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 10000);
      return () => clearTimeout(timer);
    }
  }, [hasPassed]);

  const handleProceed = () => {
    if (hasPassed) {
      updatePoints();
      console.log("Dispatching chapterQuizSubmitted from ResultPopup");
      window.dispatchEvent(new Event("chapterQuizSubmitted"));
      if (isLastChapter && courseId) {
        console.log("Dispatching lastChapterQuizPassed for course:", courseId);
        window.dispatchEvent(
          new CustomEvent("lastChapterQuizPassed", {
            detail: { courseId },
          })
        );
      }
    }
    onProceed();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white/90 rounded-2xl shadow-2xl p-8 max-w-md w-full transform transition-all duration-700 ease-out scale-100 hover:scale-105 backdrop-blur-sm border border-white/20">
        <h3 className="text-2xl font-bold text-gray-900 mb-4 tracking-wide">
          Chapter Quiz Results
        </h3>
        <p className="text-lg text-gray-700 mb-3">
          You scored <span className="font-semibold text-blue-600">{score}</span> out of{' '}
          <span className="font-semibold text-blue-600">{totalQuestions}</span> (
          <span className="font-semibold text-blue-600">{percentage}%</span>)
        </p>
        <p
          className={`text-xl font-semibold mt-2 ${hasPassed ? "text-green-500" : "text-red-500"}`}
        >
          {hasPassed ? "Congratulations, you passed!" : "You failed. Please try again."}
        </p>
        <div className="mt-6 flex justify-between items-center space-x-4">
          {!hasPassed && (
            <button
              onClick={onReattempt}
              className="px-6 py-3 bg-yellow-500 text-white rounded-xl font-medium hover:bg-yellow-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
            >
              Reattempt Chapter Quiz
            </button>
          )}
          {hasPassed && !isLastChapter && (
            <button
              onClick={handleProceed}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
            >
              Proceed to Next Chapter
            </button>
          )}
          {hasPassed && isLastChapter && (
            <button
              onClick={handleProceed}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
            >
              Unlock Final Quiz
            </button>
          )}
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gray-500 text-white rounded-xl font-medium hover:bg-gray-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
          >
            Close
          </button>
        </div>
      </div>

      {showConfetti && hasPassed && (
        <Confetti
          width={width}
          height={height}
          numberOfPieces={1000}
          recycle={false}
          gravity={0.1}
          wind={0.01}
          colors={['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD', '#D4A5A5']}
          confettiSource={{ x: width / 2, y: 0, w: width, h: 0 }}
          className="z-60"
        />
      )}
    </div>
  );
};

export default ResultPopup;