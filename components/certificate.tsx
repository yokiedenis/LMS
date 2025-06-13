// import React from 'react';
// import * as htmlToImage from 'html-to-image';
// import toPdf from 'react-to-pdf';
// import { useUser } from "@clerk/clerk-react";

// interface CertificateProps {
//   courseName: string;
//   completionDate: string;
//   score?: number;
// }

// const Certificate: React.FC<CertificateProps> = ({ 
//   courseName, 
//   completionDate, 
//   score 
// }) => {
//   const { user } = useUser();
//   const certificateRef = React.useRef<HTMLDivElement>(null);

//   const downloadCertificate = async () => {
//     if (certificateRef.current) {
//       try {
//         const dataUrl = await htmlToImage.toPng(certificateRef.current);
//         const link = document.createElement('a');
//         link.download = `${user?.fullName}_${courseName}_certificate.png`;
//         link.href = dataUrl;
//         link.click();
//       } catch (error) {
//         console.error('Error generating certificate:', error);
//       }
//     }
//   };

//   const downloadPdf = () => {
//     toPdf(() => certificateRef.current, {
//       filename: `${user?.fullName}_${courseName}_certificate.pdf`,
//       page: {
//         format: 'A4',
//         orientation: 'landscape'
//       }
//     });
//   };

//   return (
//     <div className="certificate-container flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
//       {/* Certificate design - Compact landscape format */}
//       <div 
//         ref={certificateRef} 
//         className="relative w-[800px] h-[520px] bg-white shadow-xl overflow-hidden"
//         style={{
//           fontFamily: "'Cormorant Garamond', serif",
//           background: `
//             linear-gradient(rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.95)),
//             url('/premium-paper-texture.jpg')`,
//           backgroundSize: 'cover',
//           border: '10px solid transparent',
//           borderImage: 'linear-gradient(45deg, #0c4a6e, #1e40af) 1',
//           boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
//         }}
//       >
//         {/* Gold decorative elements */}
//         <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-transparent via-yellow-600 to-transparent"></div>
//         <div className="absolute bottom-0 left-0 w-full h-3 bg-gradient-to-r from-transparent via-yellow-600 to-transparent"></div>
        
//         {/* Main content container */}
//         <div className="relative h-full flex flex-col p-10">
//           {/* Header with logo and seal */}
//           <div className="flex justify-between items-start mb-6">
//             <div className="flex items-center">
//               <img
//                 src="/logog.png"
//                 alt="EduSkills Logo"
//                 className="w-26 h-14 object-contain"
//               />
               
//             </div>
            
//             {/* Official seal */}
//             <div className="w-16 h-16 rounded-full border-2 border-yellow-600 flex items-center justify-center">
//               <div className="w-14 h-14 rounded-full border border-yellow-600 flex items-center justify-center">
//                 <span className="text-[10px] font-bold text-yellow-600 text-center">SEAL OF<br/>COMPLETION</span>
//               </div>
//             </div>
//           </div>

//           {/* Certificate title */}
//           <div className="text-center mb-6">
//             <h1 className="text-4xl font-bold text-gray-800">CERTIFICATE OF COMPLETION</h1>
//             <div className="w-28 h-1 bg-gradient-to-r from-yellow-600 to-yellow-400 mx-auto mt-2"></div>
//           </div>

//           {/* Main content */}
//           <div className="flex-grow flex flex-col justify-center items-center text-center px-8">
//             <p className="text-lg text-gray-600 mb-4">This is to certify that</p>
            
//             <h2 className="text-3xl font-bold text-gray-800 mb-4 px-6 py-2 border-b border-t border-yellow-400">
//               {user?.fullName || "Student Name"}
//             </h2>
            
//             <p className="text-lg text-gray-600 mb-4">has successfully completed the course</p>
            
//             <h3 className="text-2xl font-semibold text-gray-800 mb-6 leading-tight px-4">
//               "{courseName}"
//             </h3>
            
//             {score && (
//               <p className="text-lg text-gray-700 mb-4">
//                 with a final score of <span className="font-bold text-yellow-600">{score}%</span>
//               </p>
//             )}
            
//             <p className="text-sm text-gray-600 mt-2">
//               Awarded on {completionDate}
//             </p>
//           </div>

//           {/* Footer with signatures */}
//           <div className="flex justify-between mt-6">
//             <div className="w-1/3">
//               <div className="border-t border-gray-300 w-28 pt-2">
//                 <p className="text-xs font-bold text-gray-700">SHIVAN JOBANPUTRA</p>
//                 <p className="text-[10px] text-gray-500">Managing Director/CEO</p>
//               </div>
//             </div>
            
//             <div className="w-1/3 flex justify-center">
//               <div className="bg-white p-1 rounded shadow-xs">
//                 <div className="w-14 h-14 bg-gray-200 flex items-center justify-center text-[10px] text-gray-500">
//                   QR CODE
//                 </div>
//               </div>
//             </div>
            
//             <div className="w-1/3 flex justify-end">
//               <div className="border-t border-gray-300 w-28 pt-2 text-right">
//                 <p className="text-xs font-bold text-gray-700">DR. ELIZABETH KANE</p>
//                 <p className="text-[10px] text-gray-500">Academic Dean</p>
//               </div>
//             </div>
//           </div>

//           {/* Certificate number */}
//           <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 text-[10px] text-gray-500">
//             Certificate ID: {Math.random().toString(36).substring(2, 10).toUpperCase()}
//           </div>
//         </div>
//       </div>

//       {/* Download buttons */}
//       <div className="flex flex-wrap justify-center gap-3 mt-6">
//         <button 
//           onClick={downloadCertificate}
//           className="px-5 py-1.5 bg-gray-800 text-white text-xs font-medium rounded shadow hover:shadow-md transition-all flex items-center"
//         >
//           <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
//           </svg>
//           Download PNG
//         </button>
        
//         <button 
//           onClick={downloadPdf}
//           className="px-5 py-1.5 bg-yellow-600 text-white text-xs font-medium rounded shadow hover:shadow-md transition-all flex items-center"
//         >
//           <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//           </svg>
//           Download PDF
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Certificate;









// import React from 'react';
// import '../styles/Certificate.module.css';

// interface CertificateProps {
//   recipientName: string;
//   courseName: string;
//   date: string;
//   issuerName?: string;
//   score?: number;
// }

// const Certificate: React.FC<CertificateProps> = ({
//   recipientName,
//   courseName,
//   date,
//   issuerName = "Learning Platform",
//   score
// }) => {
//   return (
//     <div className="certificate-container">
//       <div className="certificate-border">
//         <div className="certificate-header">
//           <h1>CERTIFICATE</h1>
//           <h2>OF COMPLETION</h2>
//         </div>
        
//         <div className="certificate-body">
//           <p className="presented-to">This is to certify that</p>
//           <h3 className="recipient-name">{recipientName}</h3>
//           <p className="has-completed">has successfully completed the</p>
//           <div className="course-name">{courseName}</div> {/* Styled course name */}
          
//           <div className="signature-section">
//             <div className="signature-line"></div>
//             <p className="date">Date: {date}</p>
//           </div>
          
//           <div className="issuer-section">
//             <div className="signature-line"></div>
//             <p className="issuer-name">{issuerName}</p>
//           </div>
//         </div>
        
//         <div className="certificate-footer">
//           <p>Certificate ID: {Math.random().toString(36).substring(2, 10).toUpperCase()}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Certificate;






// 'use client';

// import React from 'react';
// import styles from '../styles/Certificate.module.css';

// interface CertificateProps {
//   recipientName: string;
//   courseName: string;
//   date: string;
//   issuerName?: string;
//   score?: number;
// }

// const Certificate: React.FC<CertificateProps> = ({
//   recipientName,
//   courseName,
//   date,
//   issuerName = "Learning Platform",
//   score
// }) => {
//   return (
//     <div className={styles['certificate-container']}>
//       <div className={styles['certificate-border']}>
//         <div className={styles['certificate-header']}>
//           <h1>CERTIFICATE</h1>
//           <h2>OF COMPLETION</h2>
//         </div>

//         <div className={styles['certificate-body']}>
//           <p className={styles['presented-to']}>This is to certify that</p>
//           <h3 className={styles['recipient-name']}>{recipientName}</h3>
//           <p className={styles['has-completed']}>has successfully completed the</p>
//           <div className={styles['course-name']}>{courseName}</div>

//           {score !== undefined && (
//             <p style={{ fontSize: '16px', marginTop: '10px', color: '#444' }}>
//               with a final score of <strong>{score}%</strong>
//             </p>
//           )}

//           <div className={styles['signature-section']}>
//             <div className={styles['signature-line']}></div>
//             <p className={styles['date']}>Date: {date}</p>
//           </div>

//           <div className={styles['issuer-section']}>
//             <div className={styles['signature-line']}></div>
//             <p className={styles['issuer-name']}>{issuerName}</p>
//           </div>
//         </div>

//         <div className={styles['certificate-footer']}>
//           <p>Certificate ID: {Math.random().toString(36).substring(2, 10).toUpperCase()}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Certificate;





// 'use client';

// import React, { useRef } from 'react';
// import { useReactToPrint } from 'react-to-print';
// import { useUser } from '@clerk/clerk-react';
// import styles from '@/styles/Certificate.module.css';

// interface CertificateProps {
//   courseName: string;
//   date: string;
//   issuerName?: string;
//   score?: number;
//   certificateId?: string;
//   locked?: boolean;
//   onUnlockRequest?: () => void;
// }

// const Certificate: React.FC<CertificateProps> = ({
//   courseName,
//   date,
//   issuerName = "EDUSKILL ONLINE LEARNING",
//   score,
//   certificateId = Math.random().toString(36).substring(2, 10).toUpperCase(),
//   locked = false,
//   onUnlockRequest
// }) => {
//   const { user } = useUser();
//   const certificateRef = useRef<HTMLDivElement>(null);

//   // const handleDownloadPDF = useReactToPrint({
//   //   content: () => certificateRef.current,
//   //   pageStyle: `
//   //     @page {
//   //       size: A4 landscape;
//   //       margin: 0;
//   //     }
//   //     @media print {
//   //       body, html {
//   //         width: 297mm;
//   //         height: 210mm;
//   //       }
//   //     }
//   //   `,
//   //   documentTitle: `${user?.fullName}_${courseName}_Certificate`,
//   //   removeAfterPrint: true
//   // });

//   const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     if (locked) {
//       onUnlockRequest?.();
//     } else {
//      // handleDownloadPDF();
//     }
//   };

//   if (!user) {
//     return <div className={styles.container}>Please sign in to view your certificate.</div>;
//   }

//   return (
//     <div className={styles.container}>
//       <div className={styles.downloadContainer}>
//         <button 
//           onClick={handleButtonClick} 
//           className={`${styles.downloadButton} ${locked ? styles.lockedButton : ''}`}
//         >
//           {locked ? 'Unlock Certificate' : 'Download PDF Certificate'}
//         </button>
//         {locked && (
//           <p className={styles.lockedMessage}>
//             Complete the quiz with a passing score to unlock your certificate
//           </p>
//         )}
//       </div>
      
//       <div 
//         className={`${styles.certificateContainer} ${locked ? styles.lockedCertificate : ''}`} 
//         ref={certificateRef}
//       >
//         {locked && (
//           <div className={styles.lockOverlay}>
//             <div className={styles.lockIcon}>🔒</div>
//             <p>Certificate Locked</p>
//             <p>Complete the quiz to unlock</p>
//           </div>
//         )}
        
//         <div className={styles.certificateBorder}>
//           <div className={styles.cornerDecorationTopLeft}></div>
//           <div className={styles.cornerDecorationTopRight}></div>
//           <div className={styles.cornerDecorationBottomLeft}></div>
//           <div className={styles.cornerDecorationBottomRight}></div>
          
//           <div className={styles.watermark}>EDUSKILL ONLINE LEARNING</div>
          
//           <div className={styles.certificateHeader}>
//             <div className={styles.seal}>
//               <div className={styles.sealInner}>
//                 <span>Skill Today, Lead Tomorrow</span>
//               </div>
//             </div>
//             <h2
//               className={styles.certificateTitle}
//               style={{
//                 backgroundColor: 'white',
//                 display: 'inline-block',
//                 padding: '4rem 2rem',
//                 borderRadius: '6px',
//                 fontSize:'40px',
//               }}
//             >
//               <div>CERTIFICATE OF COMPLETION</div>
//             </h2>
//           </div>

//           <div className={styles.certificateBody}>
//             <p className={styles.presentedTo}>This is to certify that</p>
//             <h3 className={styles.recipientName}>{user.fullName}</h3>
//             <p className={styles.presentedTo}>has successfully completed</p>
//             <div className={styles.courseName}>{courseName}</div>
            
//             {score !== undefined && (
//               <div className={styles.scoreContainer}>
//                 <p>Achieving an outstanding score of</p>
//                 <div className={styles.scoreBadge}>{score}%</div>
//               </div>
//             )}

//             <div className={styles.detailsContainer}>
//               <div className={styles.detailBox}>
//                 <p className={styles.detailLabel}>Date of Completion</p>
//                 <p className={styles.detailValue}>{date}</p>
//               </div>
//             </div>
//           </div>

//           <div className={styles.signatureSection}>
//             <div className={styles.signatureBlock}>
//               <div className={styles.signatureLine}></div>
//               <p className={styles.signatureLabel}>Authorized Signature</p>
//             </div>
//             <div className={styles.signatureBlock}>
//               <div className={styles.signatureLine}></div>
//               <p className={styles.signatureLabel}>Date</p>
//             </div>
//           </div>

//           <div className={styles.issuerSection}>
//             <p className={styles.issuerName}>{issuerName}</p>
//             <p className={styles.issuerTagline}>Skill Today, Lead Tomorrow</p>
//           </div>

//           <div className={styles.verification}>
//             <div className={styles.qrPlaceholder}></div>
//             <p>Scan to verify authenticity</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Certificate;







"use client";

import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { useUser } from '@clerk/clerk-react';
import styles from '@/styles/Certificate.module.css';

interface CertificateProps {
  recipientName: string; // Add this prop
  courseName: string;
  date: string;
  issuerName?: string;
  score?: number;
  certificateId?: string;
  locked?: boolean;
  onUnlockRequest?: () => void;
}

const Certificate: React.FC<CertificateProps> = ({
  recipientName, // Use this instead of user.fullName
  courseName,
  date,
  issuerName = "EDUSKILL ONLINE LEARNING",
  score,
  certificateId = Math.random().toString(36).substring(2, 10).toUpperCase(),
  locked = false,
  onUnlockRequest
}) => {
  const { user } = useUser();
  const certificateRef = useRef<HTMLDivElement>(null);

  // const handleDownloadPDF = useReactToPrint({
  //   content: () => certificateRef.current,
  //   pageStyle: `
  //     @page {
  //       size: A4 landscape;
  //       margin: 0;
  //     }
  //     @media print {
  //       body, html {
  //         width: 297mm;
  //         height: 210mm;
  //       }
  //     }
  //   `,
  //   documentTitle: `${recipientName}_${courseName}_Certificate`, // Use recipientName here
  //   removeAfterPrint: true
  // });

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (locked) {
      onUnlockRequest?.();
    } else {
    //  handleDownloadPDF();
    }
  };

  if (!user) {
    return <div className={styles.container}>Please sign in to view your certificate.</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.downloadContainer}>
        <button 
          onClick={handleButtonClick} 
          className={`${styles.downloadButton} ${locked ? styles.lockedButton : ''}`}
        >
          {locked ? 'Unlock Certificate' : 'Download PDF Certificate'}
        </button>
        {locked && (
          <p className={styles.lockedMessage}>
            Complete the quiz with a passing score to unlock your certificate
          </p>
        )}
      </div>
      
      <div 
        className={`${styles.certificateContainer} ${locked ? styles.lockedCertificate : ''}`} 
        ref={certificateRef}
      >
        {locked && (
          <div className={styles.lockOverlay}>
            <div className={styles.lockIcon}>🔒</div>
            <p>Certificate Locked</p>
            <p>Complete the quiz to unlock</p>
          </div>
        )}
        
        <div className={styles.certificateBorder}>
          <div className={styles.cornerDecorationTopLeft}></div>
          <div className={styles.cornerDecorationTopRight}></div>
          <div className={styles.cornerDecorationBottomLeft}></div>
          <div className={styles.cornerDecorationBottomRight}></div>
          
          <div className={styles.watermark}>EDUSKILL ONLINE LEARNING</div>
          
          <div className={styles.certificateHeader}>
            <div className={styles.seal}>
              <div className={styles.sealInner}>
                <span>Skill Today, Lead Tomorrow</span>
              </div>
            </div>
            <h2
              className={styles.certificateTitle}
              style={{
                backgroundColor: 'white',
                display: 'inline-block',
                padding: '4rem 2rem',
                borderRadius: '6px',
                fontSize:'40px',
              }}
            >
              <div>CERTIFICATE OF COMPLETION</div>
            </h2>
          </div>

          <div className={styles.certificateBody}>
            <p className={styles.presentedTo}>This is to certify that</p>
            <h3 className={styles.recipientName}>{recipientName}</h3> {/* Use recipientName here */}
            <p className={styles.presentedTo}>has successfully completed</p>
            <div className={styles.courseName}>{courseName}</div>
            
            {score !== undefined && (
              <div className={styles.scoreContainer}>
                <p>Achieving an outstanding score of</p>
                <div className={styles.scoreBadge}>{score}%</div>
              </div>
            )}

            <div className={styles.detailsContainer}>
              <div className={styles.detailBox}>
                <p className={styles.detailLabel}>Date of Completion</p>
                <p className={styles.detailValue}>{date}</p>
              </div>
            </div>
          </div>

          <div className={styles.signatureSection}>
            <div className={styles.signatureBlock}>
              <div className={styles.signatureLine}></div>
              <p className={styles.signatureLabel}>Authorized Signature</p>
            </div>
            <div className={styles.signatureBlock}>
              <div className={styles.signatureLine}></div>
              <p className={styles.signatureLabel}>Date</p>
            </div>
          </div>

          <div className={styles.issuerSection}>
            <p className={styles.issuerName}>{issuerName}</p>
            <p className={styles.issuerTagline}>Skill Today, Lead Tomorrow</p>
          </div>

          <div className={styles.verification}>
            <div className={styles.qrPlaceholder}></div>
            <p>Scan to verify authenticity</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certificate;