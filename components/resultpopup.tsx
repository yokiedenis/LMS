// import React from 'react';

// interface ResultPopupProps {
//   score: number;
//   totalQuestions: number;
//   showRevisitMessage: boolean; // New prop to show the revisit message
//   onClose: () => void; // Function to close the popup
// }

// const ResultPopup: React.FC<ResultPopupProps> = ({ score, totalQuestions, showRevisitMessage, onClose }) => {
//   const percentage = totalQuestions > 0 ? ((score / totalQuestions) * 100).toFixed(2) : '0';

//   return (
//     <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
//       <div className="bg-white rounded-lg shadow-lg p-6 transform transition-transform duration-500 ease-in-out scale-100 hover:scale-105">
//         <h3 className="font-semibold text-lg">Results</h3>
//         <p className="mt-2">
//           You scored {score} out of {totalQuestions} ({percentage}%)
//         </p>
//         {showRevisitMessage && (
//           <p className="mt-2 text-yellow-600 font-semibold">
//             You may revisit the material to improve your score.
//           </p>
//         )}
//         <button 
//           onClick={onClose} 
//           className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition-colors"
//         >
//           Close
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ResultPopup;







// import React from 'react';

// interface ResultPopupProps {
//   score: number;
//   totalQuestions: number;
//   passingPercentage: number;
//   onClose: () => void;
//   onReattempt?: () => void; // Explicitly optional
//   onProceed?: () => void; // Explicitly optional
// }

// const ResultPopup: React.FC<ResultPopupProps> = ({
//   score,
//   totalQuestions,
//   passingPercentage,
//   onClose,
//   onReattempt = () => {}, // Default empty function
//   onProceed = () => {}, // Default empty function
// }) => {
//   const percentage = totalQuestions > 0 ? ((score / totalQuestions) * 100).toFixed(2) : '0';
//   const passed = parseFloat(percentage) >= passingPercentage;

//   return (
//     <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
//       <div className="bg-white rounded-lg shadow-lg p-6 transform transition-transform duration-500 ease-in-out scale-100 hover:scale-105">
//         <h3 className="font-semibold text-lg">Results</h3>
//         <p className="mt-2">
//           You scored {score} out of {totalQuestions} ({percentage}%)
//         </p>
//         {!passed && (
//           <p className="mt-2 text-yellow-600 font-semibold">
//             You may revisit the material to improve your score.
//           </p>
//         )}
//         <div className="mt-4 flex justify-end space-x-4">
//           {!passed && (
//             <button
//               onClick={onReattempt}
//               className="px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors shadow-md"
//             >
//               Reattempt
//             </button>
//           )}
//           {passed && (
//             <button
//               onClick={onProceed}
//               className="px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors shadow-md"
//             >
//               Proceed
//             </button>
//           )}
//           <button
//             onClick={onClose}
//             className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-500 transition-colors shadow-md"
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ResultPopup;







// import React from 'react';

// interface ResultPopupProps {
//   score: number;
//   totalQuestions: number;
//   passingPercentage: number;
//   onClose: () => void;
//   onReattempt?: () => void;
//   onProceed?: () => void;
//   showRevisitMessage?: boolean; // Added as optional
// }

// const ResultPopup: React.FC<ResultPopupProps> = ({
//   score,
//   totalQuestions,
//   passingPercentage,
//   onClose,
//   onReattempt = () => {},
//   onProceed = () => {},
//   showRevisitMessage,
// }) => {
//   const percentage = totalQuestions > 0 ? ((score / totalQuestions) * 100).toFixed(2) : '0';
//   const passed = parseFloat(percentage) >= passingPercentage;
//   const shouldShowRevisit = showRevisitMessage !== undefined ? showRevisitMessage : !passed;

//   return (
//     <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
//       <div className="bg-white rounded-lg shadow-lg p-6 transform transition-transform duration-500 ease-in-out scale-100 hover:scale-105">
//         <h3 className="font-semibold text-lg">Results</h3>
//         <p className="mt-2">
//           You scored {score} out of {totalQuestions} ({percentage}%)
//         </p>
//         {shouldShowRevisit && (
//           <p className="mt-2 text-yellow-600 font-semibold">
//             You may revisit the material to improve your score.
//           </p>
//         )}
//         <div className="mt-4 flex justify-end space-x-4">
//           {!passed && (
//             <button
//               onClick={onReattempt}
//               className="px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors shadow-md"
//             >
//               Reattempt
//             </button>
//           )}
//           {passed && (
//             <button
//               onClick={onProceed}
//               className="px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors shadow-md"
//             >
//               Proceed
//             </button>
//           )}
//           <button
//             onClick={onClose}
//             className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-500 transition-colors shadow-md"
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ResultPopup;




// import React from 'react';

// interface ResultPopupProps {
//   score: number;
//   totalQuestions: number;
//   passingPercentage: number;
//   onClose: () => void;
//   onReattempt?: () => void;
//   onProceed?: () => void;
//   showRevisitMessage?: boolean; // Added as optional
// }

// const ResultPopup: React.FC<ResultPopupProps> = ({
//   score,
//   totalQuestions,
//   passingPercentage,
//   onClose,
//   onReattempt = () => {},
//   onProceed = () => {},
//   showRevisitMessage,
// }) => {
//   const percentage = totalQuestions > 0 ? ((score / totalQuestions) * 100).toFixed(2) : '0';
//   const passed = parseFloat(percentage) >= passingPercentage;
//   const shouldShowRevisit = showRevisitMessage !== undefined ? showRevisitMessage : !passed;

//   return (
//     <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-70 backdrop-blur-sm">
//       <div
//         className={`relative rounded-xl shadow-2xl p-8 transform transition-all duration-700 ease-in-out ${
//           passed ? 'bg-gradient-to-br from-green-50 via-white to-green-100 scale-105' : 'bg-white scale-100'
//         } max-w-md w-full`}
//       >
//         {/* Decorative Elements for Passing */}
//         {passed && (
//           <>
//             <div className="absolute -top-4 -left-4 w-12 h-12 bg-green-400 rounded-full opacity-50 animate-pulse"></div>
//             <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-green-400 rounded-full opacity-50 animate-pulse delay-200"></div>
//             <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
//               <span className="text-4xl animate-bounce">🎉</span>
//             </div>
//           </>
//         )}

//         {/* Header */}
//         <h3
//           className={`text-2xl font-bold text-center mb-4 ${
//             passed ? 'text-green-700' : 'text-gray-800'
//           }`}
//         >
//           {passed ? 'Congratulations!' : 'Quiz Results'}
//         </h3>

//         {/* Score Display */}
//         <div className="text-center">
//           <p className="text-lg font-medium text-gray-700">
//             You scored{' '}
//             <span className={`font-bold ${passed ? 'text-green-600' : 'text-orange-600'}`}>
//               {score}
//             </span>{' '}
//             out of{' '}
//             <span className="font-bold text-gray-800">{totalQuestions}</span>
//           </p>
//           <p className="text-3xl font-extrabold mt-2">
//             <span className={passed ? 'text-green-600' : 'text-orange-600'}>{percentage}%</span>
//           </p>
//           <div className="mt-4 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
//             <div
//               className={`h-full transition-all duration-1000 ease-out ${
//                 passed ? 'bg-green-500' : 'bg-orange-500'
//               }`}
//               style={{ width: `${percentage}%` }}
//             ></div>
//           </div>
//         </div>

//         {/* Messages */}
//         {passed && (
//           <p className="mt-4 text-sm text-center text-green-800 bg-green-100 p-3 rounded-lg shadow-inner">
//             🎓 <strong>Great job!</strong> Please wait for your certificate within the next 24 hours. We will send it to your email!
//           </p>
//         )}
//         {shouldShowRevisit && (
//           <p className="mt-4 text-sm text-center text-yellow-700 bg-yellow-100 p-3 rounded-lg shadow-inner">
//             📚 <strong>Need Improvement?</strong> You may revisit the material to boost your score.
//           </p>
//         )}

//         {/* Buttons */}
//         <div className="mt-6 flex justify-center space-x-4">
//           {!passed && (
//             <button
//               onClick={onReattempt}
//               className="px-6 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
//             >
//               Reattempt
//             </button>
//           )}
//           {passed && (
//             <button
//               onClick={onProceed}
//               className="px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
//             >
//               Proceed
//             </button>
//           )}
//           <button
//             onClick={onClose}
//             className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ResultPopup;










// import React from 'react';
// import  Certificate   from './certificate';

// interface ResultPopupProps {
//   score: number;
//   totalQuestions: number;
//   passingPercentage: number;
//   onClose: () => void;
//   onReattempt?: () => void;
//   onProceed?: () => void;
//   showRevisitMessage?: boolean; // Added as optional
//   userName: string; // New prop for certificate
//   courseName: string; // New prop for certificate
//   completionDate: string; // New prop for certificate
// }

// const ResultPopup: React.FC<ResultPopupProps> = ({
//   score,
//   totalQuestions,
//   passingPercentage,
//   onClose,
//   onReattempt = () => {},
//   onProceed = () => {},
//   showRevisitMessage,
//   userName, // New prop
//   courseName, // New prop
//   completionDate, // New prop
// }) => {
//   const percentage = totalQuestions > 0 ? ((score / totalQuestions) * 100).toFixed(2) : '0';
//   const passed = parseFloat(percentage) >= passingPercentage;
//   const shouldShowRevisit = showRevisitMessage !== undefined ? showRevisitMessage : !passed;

//   // State to control certificate visibility
//   const [showCertificate, setShowCertificate] = React.useState(false);

//   const handleViewCertificate = () => {
//     setShowCertificate(true);
//   };

//   const handleDownloadCertificate = () => {
//     // This would typically call the download functions from Certificate.tsx
//     // For simplicity, we'll assume you have access to downloadCertificate and downloadPdf functions
//     console.log('Downloading certificate as PNG and PDF for', userName);
//     // You would need to integrate with Certificate.tsx's download functions here
//     // Example: If Certificate component is imported, you could call its methods
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-70 backdrop-blur-sm">
//       <div
//         className={`relative rounded-xl shadow-2xl p-8 transform transition-all duration-700 ease-in-out ${
//           passed ? 'bg-gradient-to-br from-green-50 via-white to-green-100 scale-105' : 'bg-white scale-100'
//         } max-w-md w-full`}
//       >
//         {/* Decorative Elements for Passing */}
//         {passed && (
//           <>
//             <div className="absolute -top-4 -left-4 w-12 h-12 bg-green-400 rounded-full opacity-50 animate-pulse"></div>
//             <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-green-400 rounded-full opacity-50 animate-pulse delay-200"></div>
//             <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
//               <span className="text-4xl animate-bounce">🎉</span>
//             </div>
//           </>
//         )}

//         {/* Header */}
//         <h3
//           className={`text-2xl font-bold text-center mb-4 ${
//             passed ? 'text-green-700' : 'text-gray-800'
//           }`}
//         >
//           {passed ? 'Congratulations!' : 'Quiz Results'}
//         </h3>

//         {/* Score Display */}
//         <div className="text-center">
//           <p className="text-lg font-medium text-gray-700">
//             You scored{' '}
//             <span className={`font-bold ${passed ? 'text-green-600' : 'text-orange-600'}`}>
//               {score}
//             </span>{' '}
//             out of{' '}
//             <span className="font-bold text-gray-800">{totalQuestions}</span>
//           </p>
//           <p className="text-3xl font-extrabold mt-2">
//             <span className={passed ? 'text-green-600' : 'text-orange-600'}>{percentage}%</span>
//           </p>
//           <div className="mt-4 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
//             <div
//               className={`h-full transition-all duration-1000 ease-out ${
//                 passed ? 'bg-green-500' : 'bg-orange-500'
//               }`}
//               style={{ width: `${percentage}%` }}
//             ></div>
//           </div>
//         </div>

//         {/* Messages */}
//         {passed && (
//           <p className="mt-4 text-sm text-center text-green-800 bg-green-100 p-3 rounded-lg shadow-inner">
//             🎓 <strong>Great job!</strong> Please wait for your certificate within the next 24 hours. We will send it to your email!
//           </p>
//         )}
//         {shouldShowRevisit && (
//           <p className="mt-4 text-sm text-center text-yellow-700 bg-yellow-100 p-3 rounded-lg shadow-inner">
//             📚 <strong>Need Improvement?</strong> You may revisit the material to boost your score.
//           </p>
//         )}

//         {/* Buttons */}
//         <div className="mt-6 flex justify-center space-x-4">
//           {!passed && (
//             <button
//               onClick={onReattempt}
//               className="px-6 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
//             >
//               Reattempt
//             </button>
//           )}
//           {passed && (
//             <>
//               <button
//                 onClick={onProceed}
//                 className="px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
//               >
//                 Proceed
//               </button>
//               <button
//                 onClick={handleViewCertificate}
//                 className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
//               >
//                 View Certificate
//               </button>
//               <button
//                 onClick={handleDownloadCertificate}
//                 className="px-6 py-2 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
//               >
//                 Download Certificate
//               </button>
//             </>
//           )}
//           <button
//             onClick={onClose}
//             className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
//           >
//             Close
//           </button>
//         </div>

//         {/* Certificate Display (if shown) */}
//         {showCertificate && passed && (
//           <div className="mt-6">
//             <Certificate 
//               userName={userName} 
//               courseName={courseName} 
//               completionDate={completionDate} 
//               score={score} 
//             />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ResultPopup;







// import React from 'react';
// import Certificate from './certificate';


 
// interface ResultPopupProps {
//   score: number;
//   totalQuestions: number;
//   passingPercentage: number;
//   onClose: () => void;
//   onReattempt?: () => void;
//   onProceed?: () => void;
//   showRevisitMessage?: boolean;
//   userName: string;
//   courseName: string;
//   completionDate: string;
// }

// const ResultPopup: React.FC<ResultPopupProps> = ({
//   score,
//   totalQuestions,
//   passingPercentage,
//   onClose,
//   onReattempt = () => {},
//   onProceed = () => {},
//   showRevisitMessage,
//   userName,
//   courseName,
//   completionDate,
// }) => {
//   const percentage = totalQuestions > 0 ? ((score / totalQuestions) * 100).toFixed(2) : '0';
//   const passed = parseFloat(percentage) >= passingPercentage;
//   const shouldShowRevisit = showRevisitMessage !== undefined ? showRevisitMessage : !passed;

//   const [showCertificate, setShowCertificate] = React.useState(false);

//   const handleViewCertificate = () => {
//     setShowCertificate(true);
//   };

//   const handleDownloadCertificate = () => {
//     console.log('Downloading certificate as PNG and PDF for', userName);
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-70 backdrop-blur-sm">
//       <div
//         className={`relative rounded-xl shadow-2xl p-8 transform transition-all duration-700 ease-in-out ${
//           passed ? 'bg-gradient-to-br from-green-50 via-white to-green-100 scale-105' : 'bg-white scale-100'
//         } max-w-md w-full`}
//       >
//         {passed && (
//           <>
//             <div className="absolute -top-4 -left-4 w-12 h-12 bg-green-400 rounded-full opacity-50 animate-pulse"></div>
//             <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-green-400 rounded-full opacity-50 animate-pulse delay-200"></div>
//             <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
//               <span className="text-4xl animate-bounce">🎉</span>
//             </div>
//           </>
//         )}

//         <h3
//           className={`text-2xl font-bold text-center mb-4 ${
//             passed ? 'text-green-700' : 'text-gray-800'
//           }`}
//         >
//           {passed ? 'Congratulations!' : 'Quiz Results'}
//         </h3>

//         <div className="text-center">
//           <p className="text-lg font-medium text-gray-700">
//             You scored{' '}
//             <span className={`font-bold ${passed ? 'text-green-600' : 'text-orange-600'}`}>
//               {score}
//             </span>{' '}
//             out of{' '}
//             <span className="font-bold text-gray-800">{totalQuestions}</span>
//           </p>
//           <p className="text-3xl font-extrabold mt-2">
//             <span className={passed ? 'text-green-600' : 'text-orange-600'}>{percentage}%</span>
//           </p>
//           <div className="mt-4 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
//             <div
//               className={`h-full transition-all duration-1000 ease-out ${
//                 passed ? 'bg-green-500' : 'bg-orange-500'
//               }`}
//               style={{ width: `${percentage}%` }}
//             ></div>
//           </div>
//         </div>

//         {passed && (
//           <p className="mt-4 text-sm text-center text-green-800 bg-green-100 p-3 rounded-lg shadow-inner">
//             🎓 <strong>Great job!</strong> Please wait for your certificate within the next 24 hours. We will send it to your email!
//           </p>
//         )}
//         {shouldShowRevisit && (
//           <p className="mt-4 text-sm text-center text-yellow-700 bg-yellow-100 p-3 rounded-lg shadow-inner">
//             📚 <strong>Need Improvement?</strong> You may revisit the material to boost your score.
//           </p>
//         )}

//         <div className="mt-6 flex justify-center space-x-4">
//           {!passed && (
//             <button
//               onClick={onReattempt}
//               className="px-6 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
//             >
//               Reattempt
//             </button>
//           )}
//           {passed && (
//             <>
//               <button
//                 onClick={onProceed}
//                 className="px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
//               >
//                 Proceed
//               </button>
//               <button
//                 onClick={handleViewCertificate}
//                 className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
//               >
//                 View Certificate
//               </button>
//               <button
//                 onClick={handleDownloadCertificate}
//                 className="px-6 py-2 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
//               >
//                 Download Certificate
//               </button>
//             </>
//           )}
//           <button
//             onClick={onClose}
//             className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
//           >
//             Close
//           </button>
//         </div>

//         {showCertificate && passed && (
//           <div className="mt-6">
//             <Certificate 
//               recipientName={userName} 
//               courseName={courseName} 
//               date={completionDate}
//               score={score}
//             />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ResultPopup;






// import React from 'react';
// import Certificate from './certificate';

// interface ResultPopupProps {
//   score: number;
//   totalQuestions: number;
//   passingPercentage: number;
//   onClose: () => void;
//   onReattempt?: () => void;
//   onProceed?: () => void;
//   showRevisitMessage?: boolean;
//   userName: string;
//   courseName: string;
//   completionDate: string;
// }

// const ResultPopup: React.FC<ResultPopupProps> = ({
//   score,
//   totalQuestions,
//   passingPercentage,
//   onClose,
//   onReattempt = () => {},
//   onProceed = () => {},
//   showRevisitMessage,
//   userName,
//   courseName,
//   completionDate,
// }) => {
//   const percentage = totalQuestions > 0 ? ((score / totalQuestions) * 100).toFixed(2) : '0';
//   const passed = parseFloat(percentage) >= passingPercentage;
//   const shouldShowRevisit = showRevisitMessage !== undefined ? showRevisitMessage : !passed;

//   const [showCertificate, setShowCertificate] = React.useState(false);

//   const handleViewCertificate = () => {
//     setShowCertificate(true);
//   };

//   const handleDownloadCertificate = () => {
//     console.log('Downloading certificate as PNG and PDF for', userName);
//   };

//   const handleUnlockRequest = () => {
//     alert('Please complete the quiz with a passing score to unlock your certificate');
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-70 backdrop-blur-sm">
//       <div
//         className={`relative rounded-xl shadow-2xl p-8 transform transition-all duration-700 ease-in-out ${
//           passed ? 'bg-gradient-to-br from-green-50 via-white to-green-100 scale-105' : 'bg-white scale-100'
//         } max-w-md w-full`}
//       >
//         {passed && (
//           <>
//             <div className="absolute -top-4 -left-4 w-12 h-12 bg-green-400 rounded-full opacity-50 animate-pulse"></div>
//             <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-green-400 rounded-full opacity-50 animate-pulse delay-200"></div>
//             <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
//               <span className="text-4xl animate-bounce">🎉</span>
//             </div>
//           </>
//         )}

//         <h3
//           className={`text-2xl font-bold text-center mb-4 ${
//             passed ? 'text-green-700' : 'text-gray-800'
//           }`}
//         >
//           {passed ? 'Congratulations!' : 'Quiz Results'}
//         </h3>

//         <div className="text-center">
//           <p className="text-lg font-medium text-gray-700">
//             You scored{' '}
//             <span className={`font-bold ${passed ? 'text-green-600' : 'text-orange-600'}`}>
//               {score}
//             </span>{' '}
//             out of{' '}
//             <span className="font-bold text-gray-800">{totalQuestions}</span>
//           </p>
//           <p className="text-3xl font-extrabold mt-2">
//             <span className={passed ? 'text-green-600' : 'text-orange-600'}>{percentage}%</span>
//           </p>
//           <div className="mt-4 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
//             <div
//               className={`h-full transition-all duration-1000 ease-out ${
//                 passed ? 'bg-green-500' : 'bg-orange-500'
//               }`}
//               style={{ width: `${percentage}%` }}
//             ></div>
//           </div>
//         </div>

//         {passed && (
//           <p className="mt-4 text-sm text-center text-green-800 bg-green-100 p-3 rounded-lg shadow-inner">
//             🎓 <strong>Great job!</strong> Please wait for your certificate within the next 24 hours. We will send it to your email!
//           </p>
//         )}
//         {shouldShowRevisit && (
//           <p className="mt-4 text-sm text-center text-yellow-700 bg-yellow-100 p-3 rounded-lg shadow-inner">
//             📚 <strong>Need Improvement?</strong> You may revisit the material to boost your score.
//           </p>
//         )}

//         <div className="mt-6 flex justify-center space-x-4">
//           {!passed && (
//             <button
//               onClick={onReattempt}
//               className="px-6 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
//             >
//               Reattempt
//             </button>
//           )}
//           {passed && (
//             <>
//               <button
//                 onClick={onProceed}
//                 className="px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
//               >
//                 Proceed
//               </button>
//               <button
//                 onClick={handleViewCertificate}
//                 className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
//               >
//                 View Certificate
//               </button>
//               <button
//                 onClick={handleDownloadCertificate}
//                 className="px-6 py-2 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
//               >
//                 Download Certificate
//               </button>
//             </>
//           )}
//           <button
//             onClick={onClose}
//             className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
//           >
//             Close
//           </button>
//         </div>

//         {showCertificate && (
//           <div className="mt-7">
//             <Certificate 
//               courseName={courseName} 
//               date={completionDate}
//               score={parseFloat(percentage)}
//               locked={!passed}
//               onUnlockRequest={handleUnlockRequest}
//             />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ResultPopup;








// import React from 'react';
// import Certificate from './certificate';
// import { useRouter } from 'next/navigation'; // Import useRouter for navigation

// interface ResultPopupProps {
//   score: number;
//   totalQuestions: number;
//   passingPercentage: number;
//   onClose: () => void;
//   onReattempt?: () => void;
//   onProceed?: () => void;
//   showRevisitMessage?: boolean;
//   userName: string;
//   courseName: string;
//   completionDate: string;
// }

// const ResultPopup: React.FC<ResultPopupProps> = ({
//   score,
//   totalQuestions,
//   passingPercentage,
//   onClose,
//   onReattempt = () => {},
//   onProceed = () => {},
//   showRevisitMessage,
//   userName,
//   courseName,
//   completionDate,
// }) => {
//   const percentage = totalQuestions > 0 ? ((score / totalQuestions) * 100).toFixed(2) : '0';
//   const passed = parseFloat(percentage) >= passingPercentage;
//   const shouldShowRevisit = showRevisitMessage !== undefined ? showRevisitMessage : !passed;

//   const [showCertificate, setShowCertificate] = React.useState(false);
//   const router = useRouter(); // Initialize router for navigation

//   const handleViewCertificate = () => {
//     if (passed) {
//       // Navigate to Graduation page if passed
//       router.push('/Graduation');
//     } else {
//       // Show alert if failed (locked)
//       handleUnlockRequest();
//     }
//   };

//   const handleDownloadCertificate = () => {
//     console.log('Downloading certificate as PNG and PDF for', userName);
//   };

//   const handleUnlockRequest = () => {
//     alert('Please complete the quiz with a passing score to unlock your certificate');
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-70 backdrop-blur-sm">
//       <div
//         className={`relative rounded-xl shadow-2xl p-8 transform transition-all duration-700 ease-in-out ${
//           passed ? 'bg-gradient-to-br from-green-50 via-white to-green-100 scale-105' : 'bg-white scale-100'
//         } max-w-md w-full`}
//       >
//         {passed && (
//           <>
//             <div className="absolute -top-4 -left-4 w-12 h-12 bg-green-400 rounded-full opacity-50 animate-pulse"></div>
//             <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-green-400 rounded-full opacity-50 animate-pulse delay-200"></div>
//             <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
//               <span className="text-4xl animate-bounce">🎉</span>
//             </div>
//           </>
//         )}

//         <h3
//           className={`text-2xl font-bold text-center mb-4 ${
//             passed ? 'text-green-700' : 'text-gray-800'
//           }`}
//         >
//           {passed ? 'Congratulations!' : 'Quiz Results'}
//         </h3>

//         <div className="text-center">
//           <p className="text-lg font-medium text-gray-700">
//             You scored{' '}
//             <span className={`font-bold ${passed ? 'text-green-600' : 'text-orange-600'}`}>
//               {score}
//             </span>{' '}
//             out of{' '}
//             <span className="font-bold text-gray-800">{totalQuestions}</span>
//           </p>
//           <p className="text-3xl font-extrabold mt-2">
//             <span className={passed ? 'text-green-600' : 'text-orange-600'}>{percentage}%</span>
//           </p>
//           <div className="mt-4 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
//             <div
//               className={`h-full transition-all duration-1000 ease-out ${
//                 passed ? 'bg-green-500' : 'bg-orange-500'
//               }`}
//               style={{ width: `${percentage}%` }}
//             ></div>
//           </div>
//         </div>

//         {passed && (
//           <p className="mt-4 text-sm text-center text-green-800 bg-green-100 p-3 rounded-lg shadow-inner">
//             🎓 <strong>Great job!</strong> Please wait for your certificate within the next 24 hours. We will send it to your email!
//           </p>
//         )}
//         {shouldShowRevisit && (
//           <p className="mt-4 text-sm text-center text-yellow-700 bg-yellow-100 p-3 rounded-lg shadow-inner">
//             📚 <strong>Need Improvement?</strong> You may revisit the material to boost your score.
//           </p>
//         )}

//         <div className="mt-6 flex justify-center space-x-4">
//           {!passed && (
//             <button
//               onClick={onReattempt}
//               className="px-6 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
//             >
//               Reattempt
//             </button>
//           )}
//           {passed && (
//             <>
//               <button
//                 onClick={onProceed}
//                 className="px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
//               >
//                 Proceed
//               </button>
//               <button
//                 onClick={handleViewCertificate} // Updated to navigate
//                 className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
//               >
//                 View Certificate
//               </button>
//               <button
//                 onClick={handleDownloadCertificate}
//                 className="px-6 py-2 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
//               >
//                 Download Certificate
//               </button>
//             </>
//           )}
//           <button
//             onClick={onClose}
//             className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
//           >
//             Close
//           </button>
//         </div>

//         {showCertificate && (
//           <div className="mt-7">
//             <Certificate 
//               courseName={courseName} 
//               date={completionDate}
//               score={parseFloat(percentage)}
//               locked={!passed}
//               onUnlockRequest={handleUnlockRequest}
//             />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ResultPopup;
 





// import React from 'react';
// import Certificate from './certificate';
// import { useRouter } from 'next/navigation';

// interface ResultPopupProps {
//   score: number;
//   totalQuestions: number;
//   passingPercentage: number;
//   onClose: () => void;
//   onReattempt?: () => void;
//   onProceed?: () => void;
//   showRevisitMessage?: boolean;
//   userName: string;
//   courseName: string;
//   completionDate: string;
// }

// const ResultPopup: React.FC<ResultPopupProps> = ({
//   score,
//   totalQuestions,
//   passingPercentage,
//   onClose,
//   onReattempt = () => {},
//   onProceed = () => {},
//   showRevisitMessage,
//   userName,
//   courseName,
//   completionDate,
// }) => {
//   const percentage = totalQuestions > 0 ? ((score / totalQuestions) * 100).toFixed(2) : '0';
//   const passed = parseFloat(percentage) >= passingPercentage;
//   const shouldShowRevisit = showRevisitMessage !== undefined ? showRevisitMessage : !passed;

//   const [showCertificate, setShowCertificate] = React.useState(false);
//   const router = useRouter();

//   const handleViewCertificate = () => {
//     if (passed) {
//       router.push('/Graduation');
//     } else {
//       handleUnlockRequest();
//     }
//   };

//   const handleDownloadCertificate = () => {
//     console.log('Downloading certificate as PNG and PDF for', userName);
//   };

//   const handleUnlockRequest = () => {
//     alert('Please complete the quiz with a passing score to unlock your certificate');
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-70 backdrop-blur-sm">
//       <div
//         className={`relative rounded-xl shadow-2xl p-8 transform transition-all duration-700 ease-in-out ${
//           passed ? 'bg-gradient-to-br from-green-50 via-white to-green-100 scale-105' : 'bg-white scale-100'
//         } max-w-md w-full`}
//       >
//         {passed && (
//           <>
//             <div className="absolute -top-4 -left-4 w-12 h-12 bg-green-400 rounded-full opacity-50 animate-pulse"></div>
//             <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-green-400 rounded-full opacity-50 animate-pulse delay-200"></div>
//             <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
//               <span className="text-4xl animate-bounce">🎉</span>
//             </div>
//           </>
//         )}

//         <h3
//           className={`text-2xl font-bold text-center mb-4 ${
//             passed ? 'text-green-700' : 'text-gray-800'
//           }`}
//         >
//           {passed ? 'Congratulations!' : 'Quiz Results'}
//         </h3>

//         <div className="text-center">
//           <p className="text-lg font-medium text-gray-700">
//             You scored{' '}
//             <span className={`font-bold ${passed ? 'text-green-600' : 'text-orange-600'}`}>
//               {score}
//             </span>{' '}
//             out of{' '}
//             <span className="font-bold text-gray-800">{totalQuestions}</span>
//           </p>
//           <p className="text-3xl font-extrabold mt-2">
//             <span className={passed ? 'text-green-600' : 'text-orange-600'}>{percentage}%</span>
//           </p>
//           <div className="mt-4 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
//             <div
//               className={`h-full transition-all duration-1000 ease-out ${
//                 passed ? 'bg-green-500' : 'bg-orange-500'
//               }`}
//               style={{ width: `${percentage}%` }}
//             ></div>
//           </div>
//         </div>

//         {passed && (
//           <p className="mt-4 text-sm text-center text-green-800 bg-green-100 p-3 rounded-lg shadow-inner">
//             🎓 <strong>Great job!</strong> Please wait for your certificate within the next 24 hours. We will send it to your email!
//           </p>
//         )}
//         {shouldShowRevisit && (
//           <p className="mt-4 text-sm text-center text-yellow-700 bg-yellow-100 p-3 rounded-lg shadow-inner">
//             📚 <strong>Need Improvement?</strong> You may revisit the material to boost your score.
//           </p>
//         )}

//         <div className="mt-6 flex justify-center space-x-4">
//           {!passed && (
//             <button
//               onClick={onReattempt}
//               className="px-6 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
//             >
//               Reattempt
//             </button>
//           )}
//           {passed && (
//             <>
//               <button
//                 onClick={onProceed}
//                 className="px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
//               >
//                 Proceed
//               </button>
//               <button
//                 onClick={handleViewCertificate}
//                 className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
//               >
//                 View Certificate
//               </button>
//               <button
//                 onClick={handleDownloadCertificate}
//                 className="px-6 py-2 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
//               >
//                 Download Certificate
//               </button>
//             </>
//           )}
//           <button
//             onClick={onClose}
//             className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
//           >
//             Close
//           </button>
//         </div>

//         {showCertificate && (
//           <div className="mt-7">
//             <Certificate 
//               courseName={courseName} 
//               date={completionDate}
//               score={parseFloat(percentage)}
//               locked={!passed}
//               onUnlockRequest={handleUnlockRequest}
//             />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ResultPopup;






// "use client";

// import React from 'react';
// import { useRouter } from 'next/navigation';

// interface ResultPopupProps {
//   score: number;
//   totalQuestions: number;
//   passingPercentage: number;
//   onClose: () => void;
//   onReattempt?: () => void;
//   onProceed?: () => void;
//   showRevisitMessage?: boolean;
//   userName: string;
//   courseName: string;
//   completionDate: string;
//   courseId?: string;
// }

// const ResultPopup: React.FC<ResultPopupProps> = ({
//   score,
//   totalQuestions,
//   passingPercentage,
//   onClose,
//   onReattempt = () => {},
//   onProceed = () => {},
//   showRevisitMessage,
//   userName,
//   courseName,
//   completionDate,
//   courseId,
// }) => {
//   const percentage = totalQuestions > 0 ? ((score / totalQuestions) * 100).toFixed(2) : '0';
//   const passed = parseFloat(percentage) >= passingPercentage;
//   const shouldShowRevisit = showRevisitMessage !== undefined ? showRevisitMessage : !passed;

//   const router = useRouter();

//   const handleViewCertificate = () => {
//     if (passed) {
//       console.log('Navigating to certificate with courseName:', courseName, 'courseId:', courseId);
//       const queryParams = new URLSearchParams();
//       if (courseId) queryParams.set('courseId', courseId);
//       queryParams.set('courseTitle', encodeURIComponent(courseName));
//       router.push(`/Graduation?${queryParams.toString()}`);
//     } else {
//       handleUnlockRequest();
//     }
//   };

//   const handleDownloadCertificate = () => {
//     console.log('Downloading certificate as PNG and PDF for', userName);
//   };

//   const handleUnlockRequest = () => {
//     alert('Please complete the quiz with a passing score to unlock your certificate');
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-70 backdrop-blur-sm">
//       <div
//         className={`relative rounded-xl shadow-2xl p-8 transform transition-all duration-700 ease-in-out ${
//           passed ? 'bg-gradient-to-br from-green-50 via-white to-green-100 scale-105' : 'bg-white scale-100'
//         } max-w-md w-full`}
//       >
//         {passed && (
//           <>
//             <div className="absolute -top-4 -left-4 w-12 h-12 bg-green-400 rounded-full opacity-50 animate-pulse"></div>
//             <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-green-400 rounded-full opacity-50 animate-pulse delay-200"></div>
//             <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
//               <span className="text-4xl animate-bounce">🎉</span>
//             </div>
//           </>
//         )}

//         <h3
//           className={`text-2xl font-bold text-center mb-4 ${
//             passed ? 'text-green-700' : 'text-gray-800'
//           }`}
//         >
//           {passed ? 'Congratulations!' : 'Quiz Results'}
//         </h3>

//         <div className="text-center">
//           <p className="text-lg font-medium text-gray-700">
//             You scored{' '}
//             <span className={`font-bold ${passed ? 'text-green-600' : 'text-orange-600'}`}>
//               {score}
//             </span>{' '}
//             out of{' '}
//             <span className="font-bold text-gray-800">{totalQuestions}</span>
//           </p>
//           <p className="text-3xl font-extrabold mt-2">
//             <span className={passed ? 'text-green-600' : 'text-orange-600'}>{percentage}%</span>
//           </p>
//           <div className="mt-4 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
//             <div
//               className={`h-full transition-all duration-1000 ease-out ${
//                 passed ? 'bg-green-500' : 'bg-orange-500'
//               }`}
//               style={{ width: `${percentage}%` }}
//             ></div>
//           </div>
//         </div>

//         {passed && (
//           <p className="mt-4 text-sm text-center text-green-800 bg-green-100 p-3 rounded-lg shadow-inner">
//             🎓 <strong>Great job!</strong> Please wait for your certificate within the next 24 hours. We will send it to your email!
//           </p>
//         )}
//         {shouldShowRevisit && (
//           <p className="mt-4 text-sm text-center text-yellow-700 bg-yellow-100 p-3 rounded-lg shadow-inner">
//             📚 <strong>Need Improvement?</strong> You may revisit the material to boost your score.
//           </p>
//         )}

//         <div className="mt-6 flex justify-center space-x-4">
//           {!passed && (
//             <button
//               onClick={onReattempt}
//               className="px-6 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
//             >
//               Reattempt
//             </button>
//           )}
//           {passed && (
//             <>
//               <button
//                 onClick={onProceed}
//                 className="px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
//               >
//                 Proceed
//               </button>
//               <button
//                 onClick={handleViewCertificate}
//                 className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
//               >
//                 View Certificate
//               </button>
//               <button
//                 onClick={handleDownloadCertificate}
//                 className="px-6 py-2 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
//               >
//                 Download Certificate
//               </button>
//             </>
//           )}
//           <button
//             onClick={onClose}
//             className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ResultPopup;





"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

interface ResultPopupProps {
  score: number;
  totalQuestions: number;
  passingPercentage: number;
  onClose: () => void;
  onReattempt?: () => void;
  onProceed?: () => void;
  showRevisitMessage?: boolean;
  userName: string;
  courseName: string;
  completionDate: string; // Ensure this is a string
  courseId?: string;
}

const ResultPopup: React.FC<ResultPopupProps> = ({
  score,
  totalQuestions,
  passingPercentage,
  onClose,
  onReattempt = () => {},
  onProceed = () => {},
  showRevisitMessage,
  userName,
  courseName,
  completionDate,
  courseId,
}) => {
  const percentage = totalQuestions > 0 ? ((score / totalQuestions) * 100).toFixed(2) : '0';
  const passed = parseFloat(percentage) >= passingPercentage;
  const shouldShowRevisit = showRevisitMessage !== undefined ? showRevisitMessage : !passed;

  const router = useRouter();

  const handleViewCertificate = () => {
    if (passed) {
      console.log('Navigating to certificate with courseName:', courseName, 'courseId:', courseId);
      const queryParams = new URLSearchParams();
      if (courseId) queryParams.set('courseId', courseId);
      queryParams.set('courseTitle', encodeURIComponent(courseName));
      router.push(`/Graduation?${queryParams.toString()}`);
    } else {
      handleUnlockRequest();
    }
  };

  const handleDownloadCertificate = () => {
    console.log('Downloading certificate as PNG and PDF for', userName);
  };

  const handleUnlockRequest = () => {
    alert('Please complete the quiz with a passing score to unlock your certificate');
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-70 backdrop-blur-sm">
      <div
        className={`relative rounded-xl shadow-2xl p-8 transform transition-all duration-700 ease-in-out ${
          passed ? 'bg-gradient-to-br from-green-50 via-white to-green-100 scale-105' : 'bg-white scale-100'
        } max-w-md w-full`}
      >
        {passed && (
          <>
            <div className="absolute -top-4 -left-4 w-12 h-12 bg-green-400 rounded-full opacity-50 animate-pulse"></div>
            <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-green-400 rounded-full opacity-50 animate-pulse delay-200"></div>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <span className="text-4xl animate-bounce">🎉</span>
            </div>
          </>
        )}

        <h3
          className={`text-2xl font-bold text-center mb-4 ${
            passed ? 'text-green-700' : 'text-gray-800'
          }`}
        >
          {passed ? 'Congratulations!' : 'Quiz Results'}
        </h3>

        <div className="text-center">
          <p className="text-lg font-medium text-gray-700">
            You scored{' '}
            <span className={`font-bold ${passed ? 'text-green-600' : 'text-orange-600'}`}>
              {score}
            </span>{' '}
            out of{' '}
            <span className="font-bold text-gray-800">{totalQuestions}</span>
          </p>
          <p className="text-3xl font-extrabold mt-2">
            <span className={passed ? 'text-green-600' : 'text-orange-600'}>{percentage}%</span>
          </p>
          <div className="mt-4 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-1000 ease-out ${
                passed ? 'bg-green-500' : 'bg-orange-500'
              }`}
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
        </div>

        {passed && (
          <p className="mt-4 text-sm text-center text-green-800 bg-green-100 p-3 rounded-lg shadow-inner">
            🎓 <strong>Great job!</strong> Please wait for your certificate within the next 24 hours. We will send it to your email!
          </p>
        )}
        {shouldShowRevisit && (
          <p className="mt-4 text-sm text-center text-yellow-700 bg-yellow-100 p-3 rounded-lg shadow-inner">
            📚 <strong>Need Improvement?</strong> You may revisit the material to boost your score.
          </p>
        )}

        <div className="mt-6 flex justify-center space-x-4">
          {!passed && (
            <button
              onClick={onReattempt}
              className="px-6 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
            >
              Reattempt
            </button>
          )}
          {passed && (
            <>
              <button
                onClick={onProceed}
                className="px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
              >
                Proceed
              </button>
              <button
                onClick={handleViewCertificate}
                className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
              >
                View Certificate
              </button>
              <button
                onClick={handleDownloadCertificate}
                className="px-6 py-2 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
              >
                Download Certificate
              </button>
            </>
          )}
          <button
            onClick={onClose}
            className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultPopup;