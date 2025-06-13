// "use client";

// import React, { useEffect, useState } from 'react';
// import { useSearchParams } from 'next/navigation';
// import { motion } from 'framer-motion';
// import { FaCheckCircle, FaUserGraduate, FaAward, FaCertificate } from 'react-icons/fa';
// import styles from './verify.module.css';

// interface VerificationData {
//   studentName: string;
//   courseTitle: string;
//   score: number;
//   certificateId: string;
//   issueDate: string;
//   verifiedAt: string;
// }

// const VerifyPage = () => {
//   const searchParams = useSearchParams();
//   const [verificationData, setVerificationData] = useState<VerificationData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const verifyCertificate = async () => {
//       try {
//         const certificateId = searchParams.get('certificateId');
//         const userId = searchParams.get('user');
//         const courseTitle = searchParams.get('course');

//         if (!certificateId || !userId || !courseTitle) {
//           throw new Error('Invalid verification link');
//         }

//         // In a real app, you would verify against your database
//         // This is a mock implementation
//         const response = await fetch(`/api/verify-certificate?certificateId=${certificateId}&userId=${userId}`);
        
//         if (!response.ok) {
//           throw new Error('Certificate not found or invalid');
//         }

//         const data = await response.json();

//         setVerificationData({
//           studentName: data.user.fullName,
//           courseTitle: decodeURIComponent(courseTitle),
//           score: data.score || 0,
//           certificateId,
//           issueDate: new Date(data.createdAt).toLocaleDateString('en-US', {
//             year: 'numeric',
//             month: 'long',
//             day: 'numeric'
//           }),
//           verifiedAt: new Date().toLocaleDateString('en-US', {
//             year: 'numeric',
//             month: 'long',
//             day: 'numeric',
//             hour: '2-digit',
//             minute: '2-digit'
//           })
//         });
//       } catch (err) {
//         setError(err instanceof Error ? err.message : 'Verification failed');
//       } finally {
//         setLoading(false);
//       }
//     };

//     verifyCertificate();
//   }, [searchParams]);

//   if (loading) {
//     return (
//       <div className={styles.loadingContainer}>
//         <motion.div
//           animate={{ rotate: 360 }}
//           transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
//           className={styles.loadingSpinner}
//         >
//           <FaCertificate size={40} />
//         </motion.div>
//         <p>Verifying certificate...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className={styles.errorContainer}>
//         <motion.div
//           initial={{ scale: 0 }}
//           animate={{ scale: 1 }}
//           className={styles.errorIcon}
//         >
//           <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
//             <path d="M15 9L9 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
//             <path d="M9 9L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
//           </svg>
//         </motion.div>
//         <h2>Verification Failed</h2>
//         <p>{error}</p>
//         <motion.button
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           className={styles.retryButton}
//           onClick={() => window.location.reload()}
//         >
//           Try Again
//         </motion.button>
//       </div>
//     );
//   }

//   if (!verificationData) {
//     return (
//       <div className={styles.errorContainer}>
//         <h2>No Certificate Data</h2>
//         <p>The certificate information could not be retrieved.</p>
//       </div>
//     );
//   }

//   return (
//     <div className={styles.container}>
//       {/* Animated background elements */}
//       <div className={styles.backgroundElements}>
//         {[...Array(10)].map((_, i) => (
//           <motion.div
//             key={i}
//             className={styles.backgroundCircle}
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ 
//               opacity: [0, 0.3, 0],
//               y: [0, 100],
//               x: Math.random() * 100 - 50
//             }}
//             transition={{
//               duration: 10 + Math.random() * 10,
//               repeat: Infinity,
//               delay: Math.random() * 5
//             }}
//           />
//         ))}
//       </div>

//       <motion.div 
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className={styles.content}
//       >
//         <div className={styles.verificationBadge}>
//           <motion.div
//             initial={{ scale: 0 }}
//             animate={{ scale: 1 }}
//             transition={{ type: 'spring', stiffness: 200, damping: 15 }}
//           >
//             <FaCheckCircle className={styles.verifiedIcon} />
//           </motion.div>
//           <h1>Certificate Verified</h1>
//           <p className={styles.verificationTimestamp}>
//             Verified on {verificationData.verifiedAt}
//           </p>
//         </div>

//         <div className={styles.detailsCard}>
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.2 }}
//             className={styles.detailItem}
//           >
//             <div className={styles.detailIcon}>
//               <FaUserGraduate />
//             </div>
//             <div>
//               <h3>Student</h3>
//               <p>{verificationData.studentName}</p>
//             </div>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.3 }}
//             className={styles.detailItem}
//           >
//             <div className={styles.detailIcon}>
//               <FaAward />
//             </div>
//             <div>
//               <h3>Course</h3>
//               <p>{verificationData.courseTitle}</p>
//             </div>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.4 }}
//             className={styles.detailItem}
//           >
//             <div className={styles.detailIcon}>
//               <FaCertificate />
//             </div>
//             <div>
//               <h3>Certificate ID</h3>
//               <p>{verificationData.certificateId}</p>
//             </div>
//           </motion.div>

//           {verificationData.score > 0 && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.5 }}
//               className={styles.scoreBadge}
//             >
//               <div className={styles.scoreCircle}>
//                 <motion.div
//                   initial={{ strokeDashoffset: 188 }}
//                   animate={{ strokeDashoffset: 188 - (188 * verificationData.score) / 100 }}
//                   transition={{ duration: 1.5, delay: 0.6 }}
//                   className={styles.scoreCircleProgress}
//                 />
//                 <span>{verificationData.score}%</span>
//               </div>
//               <p>Final Score</p>
//             </motion.div>
//           )}
//         </div>

//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.7 }}
//           className={styles.issuerInfo}
//         >
//           <img src="/logon.png" alt="Eduskill Logo" className={styles.issuerLogo} />
//           <p>Issued by EDUSKILL ONLINE LEARNING</p>
//           <p className={styles.issuerTagline}>Skill Today, Lead Tomorrow</p>
//         </motion.div>
//       </motion.div>
//     </div>
//   );
// };

// export default VerifyPage;




// "use client";

// import React, { useEffect, useState } from 'react';
// import { useSearchParams } from 'next/navigation';
// import { motion } from 'framer-motion';
// import { FaCheckCircle, FaUserGraduate, FaAward, FaCertificate } from 'react-icons/fa';
// import styles from './verify.module.css';

// interface VerificationData {
//   studentName: string;
//   courseTitle: string;
//   score: number;
//   certificateId: string;
//   issueDate: string;
//   verifiedAt: string;
// }

// const VerifyPage = () => {
//   const searchParams = useSearchParams();
//   const [verificationData, setVerificationData] = useState<VerificationData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const verifyCertificate = async () => {
//       try {
//         const certificateId = searchParams.get('certificateId');
//         const userId = searchParams.get('user');
//         const courseTitle = searchParams.get('course');

//         if (!certificateId || !userId || !courseTitle) {
//           throw new Error('Invalid verification link');
//         }

//         // In a real app, you would verify against your database
//         // This is a mock implementation
//         const response = await fetch(`/api/verify-certificate?certificateId=${certificateId}&userId=${userId}`);
        
//         if (!response.ok) {
//           throw new Error('Certificate not found or invalid');
//         }

//         const data = await response.json();

//         setVerificationData({
//           studentName: data.user.fullName,
//           courseTitle: decodeURIComponent(courseTitle),
//           score: data.score || 0,
//           certificateId,
//           issueDate: new Date(data.createdAt).toLocaleDateString('en-US', {
//             year: 'numeric',
//             month: 'long',
//             day: 'numeric'
//           }),
//           verifiedAt: new Date().toLocaleDateString('en-US', {
//             year: 'numeric',
//             month: 'long',
//             day: 'numeric',
//             hour: '2-digit',
//             minute: '2-digit'
//           })
//         });
//       } catch (err) {
//         setError(err instanceof Error ? err.message : 'Verification failed');
//       } finally {
//         setLoading(false);
//       }
//     };

//     verifyCertificate();
//   }, [searchParams]);

//   if (loading) {
//     return (
//       <div className={styles.loadingContainer}>
//         <motion.div
//           animate={{ rotate: 360 }}
//           transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
//           className={styles.loadingSpinner}
//         >
//           <FaCertificate size={40} />
//         </motion.div>
//         <p>Verifying certificate...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className={styles.errorContainer}>
//         <motion.div
//           initial={{ scale: 0 }}
//           animate={{ scale: 1 }}
//           className={styles.errorIcon}
//         >
//           <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
//             <path d="M15 9L9 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
//             <path d="M9 9L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
//           </svg>
//         </motion.div>
//         <h2>Verification Failed</h2>
//         <p>{error}</p>
//         <motion.button
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           className={styles.retryButton}
//           onClick={() => window.location.reload()}
//         >
//           Try Again
//         </motion.button>
//       </div>
//     );
//   }

//   if (!verificationData) {
//     return (
//       <div className={styles.errorContainer}>
//         <h2>No Certificate Data</h2>
//         <p>The certificate information could not be retrieved.</p>
//       </div>
//     );
//   }

//   return (
//     <div className={styles.container}>
//       {/* Animated background elements */}
//       <div className={styles.backgroundElements}>
//         {[...Array(10)].map((_, i) => (
//           <motion.div
//             key={i}
//             className={styles.backgroundCircle}
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ 
//               opacity: [0, 0.3, 0],
//               y: [0, 100],
//               x: Math.random() * 100 - 50
//             }}
//             transition={{
//               duration: 10 + Math.random() * 10,
//               repeat: Infinity,
//               delay: Math.random() * 5
//             }}
//           />
//         ))}
//       </div>

//       <motion.div 
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className={styles.content}
//       >
//         <div className={styles.verificationBadge} style={{ background: '#1f2937', padding: '1rem', borderRadius: '10px' }}>
//           <motion.div
//             initial={{ scale: 0 }}
//             animate={{ scale: 1 }}
//             transition={{ type: 'spring', stiffness: 200, damping: 15 }}
//           >
//             <FaCheckCircle className={styles.verifiedIcon} />
//           </motion.div>
//           <h1 style={{ color: 'white' }}>Certificate Verified</h1>
//           <p className={styles.verificationTimestamp}>
//             Verified on {verificationData.verifiedAt}
//           </p>
//         </div>

//         <div className={styles.detailsCard}>
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.2 }}
//             className={styles.detailItem}
//           >
//             <div className={styles.detailIcon}>
//               <FaUserGraduate />
//             </div>
//             <div>
//               <h3>Student</h3>
//               <p>{verificationData.studentName}</p>
//             </div>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.3 }}
//             className={styles.detailItem}
//           >
//             <div className={styles.detailIcon}>
//               <FaAward />
//             </div>
//             <div>
//               <h3>Course</h3>
//               <p>{verificationData.courseTitle}</p>
//             </div>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.4 }}
//             className={styles.detailItem}
//           >
//             <div className={styles.detailIcon}>
//               <FaCertificate />
//             </div>
//             <div>
//               <h3>Certificate ID</h3>
//               <p>{verificationData.certificateId}</p>
//             </div>
//           </motion.div>

//           {verificationData.score > 0 && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.5 }}
//               className={styles.scoreBadge}
//             >
//               <div className={styles.scoreCircle}>
//                 <motion.div
//                   initial={{ strokeDashoffset: 188 }}
//                   animate={{ strokeDashoffset: 188 - (188 * verificationData.score) / 100 }}
//                   transition={{ duration: 1.5, delay: 0.6 }}
//                   className={styles.scoreCircleProgress}
//                 />
//                 <span>{verificationData.score}%</span>
//               </div>
//               <p>Final Score</p>
//             </motion.div>
//           )}
//         </div>

//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.7 }}
//           className={styles.issuerInfo}
//         >
//           <img src="/eduskill.png" alt="Eduskill Logo" className={styles.issuerLogo} />
//           <p>Issued by EDUSKILL ONLINE LEARNING</p>
//           <p className={styles.issuerTagline}>Skill Today, Lead Tomorrow</p>
//         </motion.div>
//       </motion.div>
//     </div>
//   );
// };

// export default VerifyPage;



"use client";

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaUserGraduate, FaAward, FaCertificate } from 'react-icons/fa';
import styles from './verify.module.css';

interface VerificationData {
  studentName: string;
  courseTitle: string;
  score: number;
  certificateId: string;
  issueDate: string;
  verifiedAt: string;
}

const VerifyPage = () => {
  const searchParams = useSearchParams();
  const [verificationData, setVerificationData] = useState<VerificationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const verifyCertificate = async () => {
      try {
        const certificateId = searchParams.get('certificateId');
        const userId = searchParams.get('user');
        const courseTitle = searchParams.get('course');

        if (!certificateId || !userId || !courseTitle) {
          throw new Error('Invalid verification link');
        }

        // In a real app, you would verify against your database
        // This is a mock implementation
        const response = await fetch(`/api/verify-certificate?certificateId=${certificateId}&userId=${userId}`);
        
        if (!response.ok) {
          throw new Error('Certificate not found or invalid');
        }

        const data = await response.json();

        setVerificationData({
          studentName: data.user.fullName,
          courseTitle: decodeURIComponent(courseTitle),
          score: data.score || 0,
          certificateId,
          issueDate: new Date(data.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }),
          verifiedAt: new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Verification failed');
      } finally {
        setLoading(false);
      }
    };

    verifyCertificate();
  }, [searchParams]);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className={styles.loadingSpinner}
        >
          <FaCertificate size={40} />
        </motion.div>
        <p>Verifying certificate...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className={styles.errorIcon}
        >
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
            <path d="M15 9L9 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M9 9L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </motion.div>
        <h2>Verification Failed</h2>
        <p>{error}</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={styles.retryButton}
          onClick={() => window.location.reload()}
        >
          Try Again
        </motion.button>
      </div>
    );
  }

  if (!verificationData) {
    return (
      <div className={styles.errorContainer}>
        <h2>No Certificate Data</h2>
        <p>The certificate information could not be retrieved.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Animated background elements */}
      <div className={styles.backgroundElements}>
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className={styles.backgroundCircle}
            initial={{ opacity: 0, y: -20 }}
            animate={{ 
              opacity: [0, 0.3, 0],
              y: [0, 100],
              x: Math.random() * 100 - 50
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={styles.content}
      >
        <div className={styles.verificationBadge}>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          >
            <FaCheckCircle className={styles.verifiedIcon} />
          </motion.div>
          <h1>Certificate Verified</h1>
          <p className={styles.verificationTimestamp}>
            Verified on {verificationData.verifiedAt}
          </p>
        </div>

        <div className={styles.detailsGrid}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className={styles.detailCard}
          >
            <div className={styles.detailIcon}>
              <FaUserGraduate />
            </div>
            <div className={styles.detailContent}>
              <h3>Student</h3>
              <p>{verificationData.studentName}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className={styles.detailCard}
          >
            <div className={styles.detailIcon}>
              <FaAward />
            </div>
            <div className={styles.detailContent}>
              <h3>Course</h3>
              <p>{verificationData.courseTitle}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className={styles.detailCard}
          >
            <div className={styles.detailIcon}>
              <FaCertificate />
            </div>
            <div className={styles.detailContent}>
              <h3>Certificate ID</h3>
              <p>{verificationData.certificateId}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className={styles.detailCard}
          >
            <div className={styles.detailIcon}>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
                <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <div className={styles.detailContent}>
              <h3>Issue Date</h3>
              <p>{verificationData.issueDate}</p>
            </div>
          </motion.div>

          {verificationData.score > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className={styles.scoreCard}
            >
              <div className={styles.scoreCircle}>
                <motion.div
                  initial={{ strokeDashoffset: 188 }}
                  animate={{ strokeDashoffset: 188 - (188 * verificationData.score) / 100 }}
                  transition={{ duration: 1.5, delay: 0.7 }}
                  className={styles.scoreCircleProgress}
                />
                <span>{verificationData.score}%</span>
              </div>
              <p className={styles.scoreLabel}>Final Score</p>
            </motion.div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className={styles.issuerInfo}
        >
          <img src="/eduskill.png" alt="Eduskill Logo" className={styles.issuerLogo} />
          <p>Issued by EDUSKILL ONLINE LEARNING</p>
          <p className={styles.issuerTagline}>Skill Today, Lead Tomorrow</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default VerifyPage;