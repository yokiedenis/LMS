// 'use client';

// import React, { useRef } from 'react';
// import { useReactToPrint } from 'react-to-print';
// import  styles  from '@/styles/Certificate.module.css';

// interface CertificateProps {
//   recipientName: string;
//   courseName: string;
//   date: string;
//   issuerName?: string;
//   score?: number;
//   certificateId?: string;
// }

// const Certificate: React.FC<CertificateProps> = ({
//   recipientName,
//   courseName,
//   date,
//   issuerName = "EDUSKILL ONLINE LEARNING",
//   score,
//   certificateId = Math.random().toString(36).substring(2, 10).toUpperCase()
// }) => {
//   const certificateRef = useRef<HTMLDivElement>(null);

//   // const handleDownloadPDF = useReactToPrint({
//   //   content: () => certificateRef.current, // Updated from pageContent to content
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
//   //   documentTitle: `${recipientName}_${courseName}_Certificate`,
//   //   removeAfterPrint: true
//   // });

//   const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     //handleDownloadPDF();
//   };

//   return (
//     <div className={styles.container}>
//       <div className={styles.downloadContainer}>
//         <button onClick={handleButtonClick} className={styles.downloadButton}>
//           Download PDF Certificate
//         </button>
//       </div>
      
//       <div className={styles.certificateContainer} ref={certificateRef}>
//         <div className={styles.certificateBorder}>
//           <div className={styles.cornerDecorationTopLeft}></div>
//           <div className={styles.cornerDecorationTopRight}></div>
//           <div className={styles.cornerDecorationBottomLeft}></div>
//           <div className={styles.cornerDecorationBottomRight}></div>
          
//           <div className={styles.watermark}>EDUSKILL ONLINE LEARNING</div>
          
//           <div className={styles.certificateHeader}>
//                 <div className={styles.seal}>
//                   <div className={styles.sealInner}>
//                     <span>Skill Today, Lead Tomorrow</span>
//                   </div>
//                 </div>
//                 <h2
//                                 className={styles.certificateTitle}
//                                 style={{
//                                   backgroundColor: 'white',
//                                   display: 'inline-block',
//                                   padding: '4rem 2rem',
//                                   borderRadius: '6px',
//                                   fontSize:'40px',
//                                 }}
//                               >
//                                <div> CERTIFICATE OF COMPLETION</div>
//                  </h2>
 
//           </div>


//           <div className={styles.certificateBody}>
//             <p className={styles.presentedTo}>This is to certify that {recipientName}  has successfully completed</p>
//             <h3 className={styles.recipientName}>{recipientName}</h3>
             
//             <div className={styles.courseName}>{courseName}</div>
            
//             {score !== undefined && (
//               <div className={styles.scoreContainer}>
//                 <p>Achieving an outstanding score of</p>
//                 <div className={styles.scoreBadge}>{score}%</div>
//               </div>
//             )}

//             <div className={styles.detailsContainer}>
//               {/* <div className={styles.detailBox}>
//                 <p className={styles.detailLabel}>Certificate ID</p>
//                 <p className={styles.detailValue}>{certificateId}</p>
//               </div> */}
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







// 'use client';

// import React, { useRef } from 'react';
// import { useReactToPrint } from 'react-to-print';
// import { useUser } from '@clerk/clerk-react';
// import styles from '@/styles/Certificate.module.css';
// //import  QRCode  from 'qrcode.react'; // You'll need to install this package: npm install qrcode.react

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
//   date: propDate, // We'll override this with the current date
//   issuerName = "EDUSKILL ONLINE LEARNING",
//   score,
//   certificateId = Math.random().toString(36).substring(2, 10).toUpperCase(),
//   locked = false,
//   onUnlockRequest
// }) => {
//   const { user } = useUser();
//   const certificateRef = useRef<HTMLDivElement>(null);

//   // Get current date for the certificate
//   const currentDate = new Date().toLocaleDateString('en-US', {
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric',
//   });

 
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

//   // QR Code data (you can customize this to link to a verification page)
//   const qrData = `https://example.com/verify?certificateId=${certificateId}&user=${user.id}&course=${courseName}`;

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
//           {/* Logo in the top left */}
//           <img 
//             src="/logon.png" // Replace with the actual path to your logo image
//             alt="Logo"
//             className={styles.logo}
//           />

//           <div className={styles.cornerDecorationTopLeft}></div>
//           <div className={styles.cornerDecorationTopRight}></div>
//           <div className={styles.cornerDecorationBottomLeft}></div>
//           <div className={styles.cornerDecorationBottomRight}></div>
          
//           <div className={styles.watermark}>EDUSKILL ONLINE LEARNING</div>
          
//           <div className={styles.certificateHeader}>
//             <div className={styles.seal}>
            
//               <div className={styles.sealInner}>
//               <span>Eduskill</span>
//               </div>
//             </div>
//             <h2
//               className={styles.certificateTitle}
//               style={{
//                 backgroundColor: 'white',
//                 display: 'inline-block',
//                 padding: '4rem 2rem',
//                 borderRadius: '6px',
//                 fontSize: '40px',
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
//                 <p className={styles.detailValue}>{currentDate}</p> {/* Using current date */}
//               </div>
//             </div>
//           </div>

//           <div className={styles.signatureSection}>
//             <div className={styles.signatureBlock}>
//               <div className={styles.signatureLine}></div>
//               <p className={styles.signatureLabel}>Shivani Jobanputra</p>
//             </div>
//             <div className={styles.signatureBlock}>
//             {currentDate}
//               <div className={styles.signatureLine}></div>
//               <p className={styles.signatureLabel}>Date</p>
//             </div>
//           </div>

//           <div className={styles.issuerSection}>
//             <p className={styles.issuerName}>{issuerName}</p>
//             <p className={styles.issuerTagline}>Skill Today, Lead Tomorrow</p>
//           </div>

//           <div className={styles.verification}>
//             {/* <QRCode value={qrData} size={100} className={styles.qrCode} /> QR Code */}
//             <p>Scan to verify authenticity</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Certificate;








// "use client";

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
//   date: propDate,
//   issuerName = "EDUSKILL ONLINE LEARNING",
//   score,
//   certificateId = Math.random().toString(36).substring(2, 10).toUpperCase(),
//   locked = false,
//   onUnlockRequest
// }) => {
//   const { user } = useUser();
//   const certificateRef = useRef<HTMLDivElement>(null);

//   const currentDate = new Date().toLocaleDateString('en-US', {
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric',
//   });

//   const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     if (locked) {
//       onUnlockRequest?.();
//     }
//   };

//   if (!user) {
//     return <div className={styles.container}>Please sign in to view your certificate.</div>;
//   }

//   const qrData = `https://example.com/verify?certificateId=${certificateId}&user=${user.id}&course=${courseName}`;

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
//           {/* Logo and Seal aligned horizontally using flex */}
//           <div className={styles.headerAlignment}>
//             <img 
//               src="/logon.png" 
//               alt="Logo"
//               className={styles.logoPadding}
//             />
//             <div className={styles.seal}>
//               <div className={styles.sealInner}>
//                 <span>Eduskill</span>
//               </div>
//             </div>
//           </div>

//           <div className={styles.cornerDecorationTopLeft}></div>
//           <div className={styles.cornerDecorationTopRight}></div>
//           <div className={styles.cornerDecorationBottomLeft}></div>
//           <div className={styles.cornerDecorationBottomRight}></div>
          
//           <div className={styles.watermark}>EDUSKILL ONLINE LEARNING</div>
          
//           <div className={styles.certificateHeader}>
//             <h2
//               className={styles.certificateTitle}
//               style={{
//                 backgroundColor: 'white',
//                 display: 'inline-block',
//                 padding: '4rem 2rem',
//                 borderRadius: '6px',
//                 fontSize: '40px',
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
//                 <p className={styles.detailValue}>{currentDate}</p>
//               </div>
//             </div>
//           </div>

//           <div className={styles.signatureSection}>
//             <div className={styles.signatureBlock}>
//               <div className={styles.signatureLine}></div>
//               <p className={styles.signatureLabel}>Shivani Jobanputra</p>
//             </div>
//             <div className={styles.signatureBlock}>
//               {currentDate}
//               <div className={styles.signatureLine}></div>
//               <p className={styles.signatureLabel}>Date</p>
//             </div>
//           </div>

//           <div className={styles.issuerSection}>
//             <p className={styles.issuerName}>{issuerName}</p>
//             <p className={styles.issuerTagline}>Skill Today, Lead Tomorrow</p>
//           </div>

//           <div className={styles.verification}>
//             {/* <QRCode value={qrData} size={100} className={styles.qrCode} /> */}
//             <p>Scan to verify authenticity</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Certificate;







// "use client";

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
//   date: propDate,
//   issuerName = "EDUSKILL ONLINE LEARNING",
//   score,
//   certificateId = Math.random().toString(36).substring(2, 10).toUpperCase(),
//   locked = false,
//   onUnlockRequest
// }) => {
//   const { user } = useUser();
//   const certificateRef = useRef<HTMLDivElement>(null);

//   const currentDate = new Date().toLocaleDateString('en-US', {
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric',
//   });

//   const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     if (locked) {
//       onUnlockRequest?.();
//     }
//   };

//   if (!user) {
//     return <div className={styles.container}>Please sign in to view your certificate.</div>;
//   }

//   const qrData = `https://example.com/verify?certificateId=${certificateId}&user=${user.id}&course=${courseName}`;

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
//           {/* Logo and Seal aligned horizontally using flex */}
//           <div className={styles.headerAlignment}>
//             <img 
//               src="/logon.png" 
//               alt="Logo"
//               className={styles.logoPadding}
//             />
//             <div className={styles.seal}>
//               <div className={styles.sealInner}>
//                 <span>Eduskill</span>
//               </div>
//             </div>
//           </div>

//           <div className={styles.cornerDecorationTopLeft}></div>
//           <div className={styles.cornerDecorationTopRight}></div>
//           <div className={styles.cornerDecorationBottomLeft}></div>
//           <div className={styles.cornerDecorationBottomRight}></div>
          
//           <div className={styles.watermark}>EDUSKILL ONLINE LEARNING</div>
          
//           <div className={styles.certificateHeader}>
//             <h2
//               className={styles.certificateTitle}
//               style={{
//                 backgroundColor: 'white',
//                 display: 'inline-block',
//                 padding: '4rem 2rem',
//                 borderRadius: '6px',
//                 fontSize: '40px',
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
//                 <p className={styles.detailValue}>{currentDate}</p>
//               </div>
//             </div>
//           </div>

//           <div className={styles.signatureSection}>
//             <div className={styles.signatureBlock}>
//               <div className={styles.signatureLine}></div>
//               <p className={styles.signatureLabel}>Shivani Jobanputra</p>
//             </div>
//             <div className={styles.signatureBlock}>
//               {currentDate}
//               <div className={styles.signatureLine}></div>
//               <p className={styles.signatureLabel}>Date</p>
//             </div>
//           </div>

//           <div className={styles.issuerSection}>
//             <p className={styles.issuerName}>{issuerName}</p>
//             <p className={styles.issuerTagline}>Skill Today, Lead Tomorrow</p>
//           </div>

//           <div className={styles.verification}>
//             {/* <QRCode value={qrData} size={100} className={styles.qrCode} /> */}
//             <p>Scan to verify authenticity</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Certificate;








// "use client";

// import React, { useRef, useEffect, useState } from 'react';
// import { useReactToPrint } from 'react-to-print';
// import { useUser } from '@clerk/clerk-react';
// import { useSearchParams } from 'next/navigation';
// import styles from '@/styles/Certificate.module.css';
// import { getCourses } from '@/actions/get-courses';

// interface CertificateProps {
//   courseTitle: string;
//   date: string;
//   issuerName?: string;
//   score?: number;
//   certificateId?: string;
//   locked?: boolean;
//   onUnlockRequest?: () => void;
// }

// const Certificate: React.FC<CertificateProps> = ({
//   courseTitle,
//   date: propDate,
//   issuerName = "EDUSKILL ONLINE LEARNING",
//   score,
//   certificateId = Math.random().toString(36).substring(2, 10).toUpperCase(),
//   locked = false,
//   onUnlockRequest
// }) => {
//   const { user } = useUser();
//   const certificateRef = useRef<HTMLDivElement>(null);

//   const currentDate = new Date().toLocaleDateString('en-US', {
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric',
//   });

//   const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     if (locked) {
//       onUnlockRequest?.();
//     }
//   };

//   if (!user) {
//     return <div className={styles.container}>Please sign in to view your certificate.</div>;
//   }

//   const qrData = `https://example.com/verify?certificateId=${certificateId}&user=${user.id}&course=${courseTitle}`;

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
//           <div className={styles.headerAlignment}>
//             <img 
//               src="/logon.png" 
//               alt="Logo"
//               className={styles.logoPadding}
//             />
//             <div className={styles.seal}>
//               <div className={styles.sealInner}>
//                 <span>Eduskill</span>
//               </div>
//             </div>
//           </div>

//           <div className={styles.cornerDecorationTopLeft}></div>
//           <div className={styles.cornerDecorationTopRight}></div>
//           <div className={styles.cornerDecorationBottomLeft}></div>
//           <div className={styles.cornerDecorationBottomRight}></div>
          
//           <div className={styles.watermark}>EDUSKILL ONLINE LEARNING</div>
          
//           <div className={styles.certificateHeader}>
//             <h2
//               className={styles.certificateTitle}
//               style={{
//                 backgroundColor: 'white',
//                 display: 'inline-block',
//                 padding: '4rem 2rem',
//                 borderRadius: '6px',
//                 fontSize: '40px',
//               }}
//             >
//               <div>CERTIFICATE OF COMPLETION</div>
//             </h2>
//           </div>

//           <div className={styles.certificateBody}>
//             <p className={styles.presentedTo}>This is to certify that</p>
//             <h3 className={styles.recipientName}>{user.fullName}</h3>
//             <p className={styles.presentedTo}>has successfully completed</p>
//             <div className={styles.courseName}>{courseTitle}</div>
            
//             {score !== undefined && (
//               <div className={styles.scoreContainer}>
//                 <p>Achieving an outstanding score of</p>
//                 <div className={styles.scoreBadge}>{score}%</div>
//               </div>
//             )}

//             <div className={styles.detailsContainer}>
//               <div className={styles.detailBox}>
//                 <p className={styles.detailLabel}>Date of Completion</p>
//                 <p className={styles.detailValue}>{currentDate}</p>
//               </div>
//             </div>
//           </div>

//           <div className={styles.signatureSection}>
//             <div className={styles.signatureBlock}>
//               <div className={styles.signatureLine}></div>
//               <p className={styles.signatureLabel}>Shivani Jobanputra</p>
//             </div>
//             <div className={styles.signatureBlock}>
//               {currentDate}
//               <div className={styles.signatureLine}></div>
//               <p className={styles.signatureLabel}>Date</p>
//             </div>
//           </div>

//           <div className={styles.issuerSection}>
//             <p className={styles.issuerName}>{issuerName}</p>
//             <p className={styles.issuerTagline}>Skill Today, Lead Tomorrow</p>
//           </div>

//           <div className={styles.verification}>
//             <p>Scan to verify authenticity</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const GraduationPage: React.FC = () => {
//   const searchParams = useSearchParams();
//   const { user } = useUser();
//   const [courseTitle, setCourseTitle] = useState<string>('Default Course Title');
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchCourseTitle = async () => {
//       try {
//         const courseId = searchParams.get('courseId');
//         const courseTitleParam = searchParams.get('courseTitle');

//         console.log('Query Params:', {
//           courseId,
//           courseTitleParam,
//           decodedCourseTitle: courseTitleParam ? decodeURIComponent(courseTitleParam) : null,
//         });

//         if (!user?.id) {
//           console.warn('No user ID available, using default course title.');
//           setCourseTitle('Default Course Title');
//           setIsLoading(false);
//           return;
//         }

//         const courses = await getCourses({ userId: user.id });

//         console.log('Fetched courses:', courses);

//         if (courseId) {
//           const course = courses.find((c) => c.id === courseId);
//           if (course) {
//             setCourseTitle(course.title);
//             console.log('Set courseTitle from courseId:', course.title);
//           } else {
//             console.warn('Course not found for courseId:', courseId);
//             if (courseTitleParam) {
//               setCourseTitle(decodeURIComponent(courseTitleParam));
//               console.log('Fallback to courseTitle from query param:', decodeURIComponent(courseTitleParam));
//             }
//           }
//         } else if (courseTitleParam) {
//           setCourseTitle(decodeURIComponent(courseTitleParam));
//           console.log('Set courseTitle from query param:', decodeURIComponent(courseTitleParam));
//         } else {
//           console.warn('No courseId or courseTitle provided in query params.');
//           setCourseTitle('Default Course Title');
//         }
//       } catch (error) {
//         console.error('Error fetching course title:', error);
//         setCourseTitle('Default Course Title');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchCourseTitle();
//   }, [searchParams, user]);

//   if (isLoading) {
//     return <div>Loading certificate...</div>;
//   }

//   return <Certificate courseTitle={courseTitle} date="" issuerName="EDUSKILL ONLINE LEARNING" locked={false} />;
// };

// export default GraduationPage;







// "use client";

// import React, { useRef, useEffect, useState } from 'react';
// import { useUser } from '@clerk/clerk-react';
// import { useSearchParams } from 'next/navigation';
// import styles from '@/styles/Certificate.module.css';
// import { getCourses } from '@/actions/get-courses';
// import html2canvas from 'html2canvas';
// import { jsPDF } from 'jspdf';
// import { FaLinkedin } from 'react-icons/fa';

// interface CertificateProps {
//   courseTitle: string;
//   date: string;
//   issuerName?: string;
//   score?: number;
//   certificateId?: string;
//   locked?: boolean;
//   onUnlockRequest?: () => void;
// }

// const Certificate: React.FC<CertificateProps> = ({
//   courseTitle,
//   date: propDate,
//   issuerName = "EDUSKILL ONLINE LEARNING",
//   score,
//   certificateId = Math.random().toString(36).substring(2, 10).toUpperCase(),
//   locked = false,
//   onUnlockRequest
// }) => {
//   const { user } = useUser();
//   const certificateRef = useRef<HTMLDivElement>(null);
//   const [isGenerating, setIsGenerating] = useState(false);

//   const currentDate = new Date().toLocaleDateString('en-US', {
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric',
//   });

//   const handleDownloadPDF = async () => {
//     if (!certificateRef.current) return;

//     setIsGenerating(true);
//     try {
//       const canvas = await html2canvas(certificateRef.current, {
//         scale: 2,
//         useCORS: true,
//       });

//       const imgData = canvas.toDataURL('image/png');
//       const pdf = new jsPDF({
//         orientation: 'landscape',
//         unit: 'mm',
//         format: 'a4',
//       });

//       const width = pdf.internal.pageSize.getWidth();
//       const height = pdf.internal.pageSize.getHeight();

//       pdf.addImage(imgData, 'PNG', 0, 0, width, height);
//       pdf.save(`${user?.fullName || 'User'}_${courseTitle}_Certificate.pdf`);
//     } catch (error) {
//       console.error('Error generating PDF:', error);
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     if (locked) {
//       onUnlockRequest?.();
//     } else {
//       handleDownloadPDF();
//     }
//   };

//   const addToLinkedIn = () => {
//     const linkedInUrl = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${encodeURIComponent(courseTitle)}&organizationName=${encodeURIComponent(issuerName)}&issueYear=${new Date().getFullYear()}&issueMonth=${new Date().getMonth() + 1}&certUrl=${encodeURIComponent(window.location.href)}&certId=${certificateId}`;
//     window.open(linkedInUrl, '_blank');
//   };

//   if (!user) {
//     return <div className={styles.container}>Please sign in to view your certificate.</div>;
//   }

//   const qrData = `https://example.com/verify?certificateId=${certificateId}&user=${user.id}&course=${courseTitle}`;

//   return (
//     <div className={styles.container}>
//       <div className={styles.downloadContainer}>
//         {!locked && (
//           <>
//             <button 
//               onClick={handleButtonClick} 
//               className={styles.downloadButton}
//               disabled={isGenerating}
//             >
//               {isGenerating ? 'Generating PDF...' : 'Download PDF Certificate'}
//             </button>
//             <button 
//               onClick={addToLinkedIn} 
//               className={styles.linkedinButton}
//             >
//               <FaLinkedin /> Add to LinkedIn
//             </button>
//           </>
//         )}
//         {locked && (
//           <>
//             <button 
//               onClick={handleButtonClick} 
//               className={`${styles.downloadButton} ${styles.lockedButton}`}
//             >
//               Unlock Certificate
//             </button>
//             <p className={styles.lockedMessage}>
//               Complete the quiz with a passing score to unlock your certificate
//             </p>
//           </>
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
//           <div className={styles.headerAlignment}>
//             <img 
//               src="/logon.png" 
//               alt="Logo"
//               className={styles.logoPadding}
//             />
//             <div className={styles.seal}>
//               <div className={styles.sealInner}>
//                 <span>Eduskill</span>
//               </div>
//             </div>
//           </div>

//           <div className={styles.cornerDecorationTopLeft}></div>
//           <div className={styles.cornerDecorationTopRight}></div>
//           <div className={styles.cornerDecorationBottomLeft}></div>
//           <div className={styles.cornerDecorationBottomRight}></div>
          
//           <div className={styles.watermark}>EDUSKILL ONLINE LEARNING</div>
          
//           <div className={styles.certificateHeader}>
//             <h2
//               className={styles.certificateTitle}
//               style={{
//                 backgroundColor: 'white',
//                 display: 'inline-block',
//                 padding: '4rem 2rem',
//                 borderRadius: '6px',
//                 fontSize: '40px',
//               }}
//             >
//               <div>CERTIFICATE OF COMPLETION</div>
//             </h2>
//           </div>

//           <div className={styles.certificateBody}>
//             <p className={styles.presentedTo}>This is to certify that</p>
//             <h3 className={styles.recipientName}>{user.fullName}</h3>
//             <p className={styles.presentedTo}>has successfully completed</p>
//             <div className={styles.courseName}>{courseTitle}</div>
            
//             {score !== undefined && (
//               <div className={styles.scoreContainer}>
//                 <p>Achieving an outstanding score of</p>
//                 <div className={styles.scoreBadge}>{score}%</div>
//               </div>
//             )}

//             <div className={styles.detailsContainer}>
//               <div className={styles.detailBox}>
//                 <p className={styles.detailLabel}>Date of Completion</p>
//                 <p className={styles.detailValue}>{currentDate}</p>
//               </div>
//               <div className={styles.detailBox}>
//                 <p className={styles.detailLabel}>Certificate ID</p>
//                 <p className={styles.detailValue}>{certificateId}</p>
//               </div>
//             </div>
//           </div>

//           <div className={styles.signatureSection}>
//             <div className={styles.signatureBlock}>
//               <div className={styles.signatureLine}></div>
//               <p className={styles.signatureLabel}>Shivani Jobanputra</p>
//             </div>
//             <div className={styles.signatureBlock}>
//               {currentDate}
//               <div className={styles.signatureLine}></div>
//               <p className={styles.signatureLabel}>Date</p>
//             </div>
//           </div>

//           <div className={styles.issuerSection}>
//             <p className={styles.issuerName}>{issuerName}</p>
//             <p className={styles.issuerTagline}>Skill Today, Lead Tomorrow</p>
//           </div>

//           <div className={styles.verification}>
//             <p>Scan to verify authenticity</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const GraduationPage: React.FC = () => {
//   const searchParams = useSearchParams();
//   const { user } = useUser();
//   const [courseTitle, setCourseTitle] = useState<string>('Default Course Title');
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchCourseTitle = async () => {
//       try {
//         const courseId = searchParams.get('courseId');
//         const courseTitleParam = searchParams.get('courseTitle');

//         console.log('Query Params:', {
//           courseId,
//           courseTitleParam,
//           decodedCourseTitle: courseTitleParam ? decodeURIComponent(courseTitleParam) : null,
//         });

//         if (!user?.id) {
//           console.warn('No user ID available, using default course title.');
//           setCourseTitle('Default Course Title');
//           setIsLoading(false);
//           return;
//         }

//         const courses = await getCourses({ userId: user.id });

//         console.log('Fetched courses:', courses);

//         if (courseId) {
//           const course = courses.find((c) => c.id === courseId);
//           if (course) {
//             setCourseTitle(course.title);
//             console.log('Set courseTitle from courseId:', course.title);
//           } else {
//             console.warn('Course not found for courseId:', courseId);
//             if (courseTitleParam) {
//               setCourseTitle(decodeURIComponent(courseTitleParam));
//               console.log('Fallback to courseTitle from query param:', decodeURIComponent(courseTitleParam));
//             }
//           }
//         } else if (courseTitleParam) {
//           setCourseTitle(decodeURIComponent(courseTitleParam));
//           console.log('Set courseTitle from query param:', decodeURIComponent(courseTitleParam));
//         } else {
//           console.warn('No courseId or courseTitle provided in query params.');
//           setCourseTitle('Default Course Title');
//         }
//       } catch (error) {
//         console.error('Error fetching course title:', error);
//         setCourseTitle('Default Course Title');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchCourseTitle();
//   }, [searchParams, user]);

//   if (isLoading) {
//     return <div>Loading certificate...</div>;
//   }

//   return <Certificate courseTitle={courseTitle} date="" issuerName="EDUSKILL ONLINE LEARNING" locked={false} />;
// };

// export default GraduationPage;








// "use client";

// import React, { useRef, useEffect, useState } from 'react';
// import { useUser } from '@clerk/clerk-react';
// import { useSearchParams } from 'next/navigation';
// import styles from '@/styles/Certificate.module.css';
// import { getCourses } from '@/actions/get-courses';
// import html2canvas from 'html2canvas';
// import { jsPDF } from 'jspdf';
// import { FaLinkedin } from 'react-icons/fa';

// interface CertificateProps {
//   courseTitle: string;
//   date: string;
//   issuerName?: string;
//   score?: number;
//   certificateId?: string;
//   locked?: boolean;
//   onUnlockRequest?: () => void;
// }

// const Certificate: React.FC<CertificateProps> = ({
//   courseTitle,
//   date: propDate,
//   issuerName = "EDUSKILL ONLINE LEARNING",
//   score,
//   certificateId = Math.random().toString(36).substring(2, 10).toUpperCase(),
//   locked = false,
//   onUnlockRequest
// }) => {
//   const { user } = useUser();
//   const certificateRef = useRef<HTMLDivElement>(null);
//   const [isGenerating, setIsGenerating] = useState(false);

//   const currentDate = new Date().toLocaleDateString('en-US', {
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric',
//   });

//   const handleDownloadPDF = async () => {
//     if (!certificateRef.current) return;

//     setIsGenerating(true);
//     try {
//       const canvas = await html2canvas(certificateRef.current, {
//         scale: 2,
//         useCORS: true,
//       });

//       const imgData = canvas.toDataURL('image/png');
//       const pdf = new jsPDF({
//         orientation: 'landscape',
//         unit: 'mm',
//         format: 'a4',
//       });

//       const width = pdf.internal.pageSize.getWidth();
//       const height = pdf.internal.pageSize.getHeight();

//       pdf.addImage(imgData, 'PNG', 0, 0, width, height);
//       pdf.save(`${user?.fullName || 'User'}_${courseTitle}_Certificate.pdf`);
//     } catch (error) {
//       console.error('Error generating PDF:', error);
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     if (locked) {
//       onUnlockRequest?.();
//     } else {
//       handleDownloadPDF();
//     }
//   };

//   const addToLinkedIn = () => {
//     const linkedInUrl = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${encodeURIComponent(courseTitle)}&organizationName=${encodeURIComponent(issuerName)}&issueYear=${new Date().getFullYear()}&issueMonth=${new Date().getMonth() + 1}&certUrl=${encodeURIComponent(window.location.href)}&certId=${certificateId}`;
//     window.open(linkedInUrl, '_blank');
//   };

//   if (!user) {
//     return <div className={styles.container}>Please sign in to view your certificate.</div>;
//   }

//   const qrData = `https://example.com/verify?certificateId=${certificateId}&user=${user.id}&course=${courseTitle}`;

//   return (
//     <div className={styles.container}>
//       <div className={styles.downloadContainer}>
//         {!locked && (
//           <>
//             <button 
//               onClick={handleButtonClick} 
//               className={styles.downloadButton}
//               disabled={isGenerating}
//             >
//               {isGenerating ? 'Generating PDF...' : 'Download PDF Certificate'}
//             </button>
//             <button 
//               onClick={addToLinkedIn} 
//               className={styles.linkedinButton}
//             >
//               <FaLinkedin /> Add to LinkedIn
//             </button>
//           </>
//         )}
//         {locked && (
//           <>
//             <button 
//               onClick={handleButtonClick} 
//               className={`${styles.downloadButton} ${styles.lockedButton}`}
//             >
//               Unlock Certificate
//             </button>
//             <p className={styles.lockedMessage}>
//               Complete the quiz with a passing score to unlock your certificate
//             </p>
//           </>
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
//           <div className={styles.headerAlignment}>
//             <img 
//               src="/logon.png" 
//               alt="Logo"
//               className={styles.logoPadding}
//             />
//             <div className={styles.seal}>
//               <div className={styles.sealInner}>
//                 <span>Eduskill</span>
//               </div>
//             </div>
//           </div>

//           <div className={styles.cornerDecorationTopLeft}></div>
//           <div className={styles.cornerDecorationTopRight}></div>
//           <div className={styles.cornerDecorationBottomLeft}></div>
//           <div className={styles.cornerDecorationBottomRight}></div>
          
//           <div className={styles.watermark}>EDUSKILL ONLINE LEARNING</div>
          
//           <div className={styles.certificateHeader}>
//             <h2
//               className={styles.certificateTitle}
//               style={{
//                 backgroundColor: 'white',
//                 display: 'inline-block',
//                 padding: '4rem 2rem',
//                 borderRadius: '6px',
//                 fontSize: '40px',
//               }}
//             >
//               <div>CERTIFICATE OF COMPLETION</div>
//             </h2>
//           </div>

//           <div className={styles.certificateBody}>
//             <p className={styles.presentedTo}>This is to certify that</p>
//             <h3 className={styles.recipientName}>{user.fullName}</h3>
//             <p className={styles.presentedTo}>has successfully completed</p>
//             <div className={styles.courseName}>{courseTitle}</div>
            
//             {score !== undefined && (
//               <div className={styles.scoreContainer}>
//                 <p>Achieving an outstanding score of</p>
//                 <div className={styles.scoreBadge}>{score}%</div>
//               </div>
//             )}

//             <div className={styles.detailsContainer}>
//               <div className={styles.detailBox}>
//                 <p className={styles.detailLabel}>Date of Completion</p>
//                 <p className={styles.detailValue}>{currentDate}</p>
//               </div>
//               <div className={styles.detailBox}>
//                 <p className={styles.detailLabel}>Certificate ID</p>
//                 <p className={styles.detailValue}>{certificateId}</p>
//               </div>
//             </div>
//           </div>

//           <div className={styles.signatureSection}>
//             <div className={styles.signatureBlock}>
//               <div className={styles.signatureLine}></div>
//               <p className={styles.signatureLabel}>Shivani Jobanputra</p>
//             </div>
//             <div className={styles.signatureBlock}>
//               {currentDate}
//               <div className={styles.signatureLine}></div>
//               <p className={styles.signatureLabel}>Date</p>
//             </div>
//           </div>

//           <div className={styles.issuerSection}>
//             <p className={styles.issuerName}>{issuerName}</p>
//             <p className={styles.issuerTagline}>Skill Today, Lead Tomorrow</p>
//           </div>

//           <div className={styles.verification}>
//             <p>Scan to verify authenticity</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const GraduationPage: React.FC = () => {
//   const searchParams = useSearchParams();
//   const { user } = useUser();
//   const [courseTitle, setCourseTitle] = useState<string>('Default Course Title');
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchCourseTitle = async () => {
//       try {
//         const courseId = searchParams.get('courseId');
//         const courseTitleParam = searchParams.get('courseTitle');

//         console.log('Query Params:', {
//           courseId,
//           courseTitleParam,
//           decodedCourseTitle: courseTitleParam ? decodeURIComponent(courseTitleParam) : null,
//         });

//         // Prioritize courseTitle from query params if available
//         if (courseTitleParam) {
//           setCourseTitle(decodeURIComponent(courseTitleParam));
//           console.log('Set courseTitle from query param:', decodeURIComponent(courseTitleParam));
//           setIsLoading(false);
//           return;
//         }

//         if (!user?.id) {
//           console.warn('No user ID available, using default course title.');
//           setCourseTitle('Default Course Title');
//           setIsLoading(false);
//           return;
//         }

//         // Fallback to fetching courses if no courseTitleParam
//         const courses = await getCourses({ userId: user.id });

//         console.log('Fetched courses:', courses);

//         if (courseId) {
//           const course = courses.find((c) => c.id === courseId);
//           if (course) {
//             setCourseTitle(course.title);
//             console.log('Set courseTitle from courseId:', course.title);
//           } else {
//             console.warn('Course not found for courseId:', courseId);
//             setCourseTitle('Default Course Title');
//           }
//         } else {
//           console.warn('No courseId provided in query params.');
//           setCourseTitle('Default Course Title');
//         }
//       } catch (error) {
//         console.error('Error fetching course title:', error);
//         setCourseTitle('Default Course Title');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchCourseTitle();
//   }, [searchParams, user]);

//   if (isLoading) {
//     return <div>Loading certificate...</div>;
//   }

//   return <Certificate courseTitle={courseTitle} date="" issuerName="EDUSKILL ONLINE LEARNING" locked={false} />;
// };

// export default GraduationPage;










// "use client";

// import React, { useRef, useEffect, useState } from 'react';
// import { useUser } from '@clerk/clerk-react';
// import { useSearchParams } from 'next/navigation';
// import styles from '@/styles/Certificate.module.css';
// import { getCourses } from '@/actions/get-courses';
// import html2canvas from 'html2canvas';
// import { jsPDF } from 'jspdf';
// import { FaLinkedin } from 'react-icons/fa';

// interface CertificateProps {
//   courseTitle: string;
//   date: string;
//   issuerName?: string;
//   score?: number;
//   certificateId?: string;
//   locked?: boolean;
//   onUnlockRequest?: () => void;
// }

// const Certificate: React.FC<CertificateProps> = ({
//   courseTitle,
//   date: propDate,
//   issuerName = "EDUSKILL ONLINE LEARNING",
//   score,
//   certificateId = Math.random().toString(36).substring(2, 10).toUpperCase(),
//   locked = false,
//   onUnlockRequest
// }) => {
//   const { user } = useUser();
//   const certificateRef = useRef<HTMLDivElement>(null);
//   const [isGenerating, setIsGenerating] = useState(false);

//   const currentDate = new Date().toLocaleDateString('en-US', {
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric',
//   });

//   const handleDownloadPDF = async () => {
//     if (!certificateRef.current) return;

//     setIsGenerating(true);
//     try {
//       const canvas = await html2canvas(certificateRef.current, {
//         scale: 2,
//         useCORS: true,
//       });

//       const imgData = canvas.toDataURL('image/png');
//       const pdf = new jsPDF({
//         orientation: 'landscape',
//         unit: 'mm',
//         format: 'a4',
//       });

//       const width = pdf.internal.pageSize.getWidth();
//       const height = pdf.internal.pageSize.getHeight();

//       pdf.addImage(imgData, 'PNG', 0, 0, width, height);
//       pdf.save(`${user?.fullName || 'User'}_${courseTitle}_Certificate.pdf`);
//     } catch (error) {
//       console.error('Error generating PDF:', error);
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     if (locked) {
//       onUnlockRequest?.();
//     } else {
//       handleDownloadPDF();
//     }
//   };

//   const addToLinkedIn = () => {
//     const linkedInUrl = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${encodeURIComponent(courseTitle)}&organizationName=${encodeURIComponent(issuerName)}&issueYear=${new Date().getFullYear()}&issueMonth=${new Date().getMonth() + 1}&certUrl=${encodeURIComponent(window.location.href)}&certId=${certificateId}`;
//     window.open(linkedInUrl, '_blank');
//   };

//   if (!user) {
//     return <div className={styles.container}>Please sign in to view your certificate.</div>;
//   }

//   const qrData = `https://example.com/verify?certificateId=${certificateId}&user=${user.id}&course=${courseTitle}`;

//   return (
//     <div className={styles.container}>
//       <div className={styles.downloadContainer}>
//         {!locked && (
//           <>
//             <button 
//               onClick={handleButtonClick} 
//               className={styles.downloadButton}
//               disabled={isGenerating}
//             >
//               {isGenerating ? 'Generating PDF...' : 'Download PDF Certificate'}
//             </button>
//             <button 
//               onClick={addToLinkedIn} 
//               className={styles.linkedinButton}
//             >
//               <FaLinkedin /> Add to LinkedIn
//             </button>
//           </>
//         )}
//         {locked && (
//           <>
//             <button 
//               onClick={handleButtonClick} 
//               className={`${styles.downloadButton} ${styles.lockedButton}`}
//             >
//               Unlock Certificate
//             </button>
//             <p className={styles.lockedMessage}>
//               Complete the quiz with a passing score to unlock your certificate
//             </p>
//           </>
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
//           <div className={styles.headerAlignment}>
//             <img 
//               src="/logon.png" 
//               alt="Logo"
//               className={styles.logoPadding}
//             />
//             <div className={styles.seal}>
//               <div className={styles.sealInner}>
//                 <span>Eduskill</span>
//               </div>
//             </div>
//           </div>

//           <div className={styles.cornerDecorationTopLeft}></div>
//           <div className={styles.cornerDecorationTopRight}></div>
//           <div className={styles.cornerDecorationBottomLeft}></div>
//           <div className={styles.cornerDecorationBottomRight}></div>
          
//           <div className={styles.watermark}>EDUSKILL ONLINE LEARNING</div>
          
//           <div className={styles.certificateHeader}>
//             <h2
//               className={styles.certificateTitle}
//               style={{
//                 backgroundColor: 'white',
//                 display: 'inline-block',
//                 padding: '4rem 2rem',
//                 borderRadius: '6px',
//                 fontSize: '40px',
//               }}
//             >
//               <div>CERTIFICATE OF COMPLETION</div>
//             </h2>
//           </div>

//           <div className={styles.certificateBody}>
//             <p className={styles.presentedTo}>This is to certify that</p>
//             <h3 className={styles.recipientName}>{user.fullName}</h3>
//             <p className={styles.presentedTo}>has successfully completed</p>
//             <div className={styles.courseName}>{courseTitle}</div>
            
//             {score !== undefined && (
//               <div className={styles.scoreContainer}>
//                 <p>Achieving an outstanding score of</p>
//                 <div className={styles.scoreBadge}>{score}%</div>
//               </div>
//             )}

//             <div className={styles.detailsContainer}>
//               <div className={styles.detailBox}>
//                 <p className={styles.detailLabel}>Date of Completion</p>
//                 <p className={styles.detailValue}>{currentDate}</p>
//               </div>
//               <div className={styles.detailBox}>
//                 <p className={styles.detailLabel}>Certificate ID</p>
//                 <p className={styles.detailValue}>{certificateId}</p>
//               </div>
//             </div>
//           </div>

//           <div className={styles.signatureSection}>
//             <div className={styles.signatureBlock}>
//               <div className={styles.signatureLine}></div>
//               <p className={styles.signatureLabel}>Shivani Jobanputra</p>
//             </div>
//             <div className={styles.signatureBlock}>
//               {currentDate}
//               <div className={styles.signatureLine}></div>
//               <p className={styles.signatureLabel}>Date</p>
//             </div>
//           </div>

//           <div className={styles.issuerSection}>
//             <p className={styles.issuerName}>{issuerName}</p>
//             <p className={styles.issuerTagline}>Skill Today, Lead Tomorrow</p>
//           </div>

//           <div className={styles.verification}>
//             <p>Scan to verify authenticity</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const GraduationPage: React.FC = () => {
//   const searchParams = useSearchParams();
//   const { user } = useUser();
//   const [courseTitle, setCourseTitle] = useState<string>('Default Course Title');
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchCourseTitle = async () => {
//       try {
//         const courseId = searchParams.get('courseId');
//         const courseTitleParam = searchParams.get('courseTitle');

//         console.log('Query Params:', {
//           courseId,
//           courseTitleParam,
//           decodedCourseTitle: courseTitleParam ? decodeURIComponent(courseTitleParam) : null,
//         });

//         // Prioritize courseTitle from query params if available
//         if (courseTitleParam) {
//           setCourseTitle(decodeURIComponent(courseTitleParam));
//           console.log('Set courseTitle from query param:', decodeURIComponent(courseTitleParam));
//           setIsLoading(false);
//           return;
//         }

//         if (!user?.id) {
//           console.warn('No user ID available, using default course title.');
//           setCourseTitle('Default Course Title');
//           setIsLoading(false);
//           return;
//         }

//         // Fallback to fetching course directly if courseId is available
//         if (courseId) {
//           try {
//             const courseResponse = await fetch(`/api/courses/${courseId}`);
//             if (courseResponse.ok) {
//               const courseData = await courseResponse.json();
//               if (courseData.title) {
//                 setCourseTitle(courseData.title);
//                 console.log('Set courseTitle from direct API call:', courseData.title);
//                 setIsLoading(false);
//                 return;
//               }
//             }
//             console.warn('Course not found via direct API call for courseId:', courseId);
//           } catch (error) {
//             console.error('Error fetching course directly:', error);
//           }
//         }

//         // Fallback to getCourses
//         const courses = await getCourses({ userId: user.id });

//         console.log('Fetched courses:', courses);

//         if (courseId) {
//           const course = courses.find((c) => c.id === courseId);
//           if (course) {
//             setCourseTitle(course.title);
//             console.log('Set courseTitle from getCourses:', course.title);
//           } else {
//             console.warn('Course not found for courseId:', courseId);
//             setCourseTitle('Default Course Title');
//           }
//         } else {
//           console.warn('No courseId provided in query params.');
//           setCourseTitle('Default Course Title');
//         }
//       } catch (error) {
//         console.error('Error fetching course title:', error);
//         setCourseTitle('Default Course Title');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchCourseTitle();
//   }, [searchParams, user]);

//   if (isLoading) {
//     return <div>Loading certificate...</div>;
//   }

//   return <Certificate courseTitle={courseTitle} date="" issuerName="EDUSKILL ONLINE LEARNING" locked={false} />;
// };

// export default GraduationPage;









// "use client";

// import React, { useRef, useEffect, useState } from 'react';
// import { useUser } from '@clerk/clerk-react';
// import { useSearchParams } from 'next/navigation';
// import styles from '@/styles/Certificate.module.css';
// import { getCourses } from '@/actions/get-courses';
// import html2canvas from 'html2canvas';
// import { jsPDF } from 'jspdf';
// import { FaLinkedin } from 'react-icons/fa';
// import QRCode from 'qrcode';

// // Simple hash function to generate a stable certificate ID
// const generateCertificateId = (userId: string, courseId: string): string => {
//   const combined = `${userId}-${courseId}`;
//   let hash = 0;
//   for (let i = 0; i < combined.length; i++) {
//     const char = combined.charCodeAt(i);
//     hash = ((hash << 5) - hash) + char;
//     hash = hash & hash; // Convert to 32-bit integer
//   }
//   return Math.abs(hash).toString(36).substring(0, 8).toUpperCase();
// };

// interface CertificateProps {
//   courseTitle: string;
//   date: string;
//   issuerName?: string;
//   score?: number;
//   certificateId: string; // Made required
//   locked?: boolean;
//   onUnlockRequest?: () => void;
// }

// const Certificate: React.FC<CertificateProps> = ({
//   courseTitle,
//   date: propDate,
//   issuerName = "EDUSKILL ONLINE LEARNING",
//   score,
//   certificateId,
//   locked = false,
//   onUnlockRequest
// }) => {
//   const { user } = useUser();
//   const certificateRef = useRef<HTMLDivElement>(null);
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [qrCodeUrl, setQrCodeUrl] = useState<string>('');

//   const currentDate = new Date().toLocaleDateString('en-US', {
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric',
//   });

//   // Generate QR code for verification
//   useEffect(() => {
//     if (user) {
//       const qrData = `https://eduskill-mu.vercel.app//verify?certificateId=${certificateId}&user=${user.id}&course=${encodeURIComponent(courseTitle)}`;
//       QRCode.toDataURL(qrData, { width: 100, margin: 1 }, (err, url) => {
//         if (err) {
//           console.error('Error generating QR code:', err);
//           return;
//         }
//         setQrCodeUrl(url);
//       });
//     }
//   }, [user, certificateId, courseTitle]);

//   const handleDownloadPDF = async () => {
//     if (!certificateRef.current) return;

//     setIsGenerating(true);
//     try {
//       const canvas = await html2canvas(certificateRef.current, {
//         scale: 2,
//         useCORS: true,
//       });

//       const imgData = canvas.toDataURL('image/png');
//       const pdf = new jsPDF({
//         orientation: 'landscape',
//         unit: 'mm',
//         format: 'a4',
//       });

//       const width = pdf.internal.pageSize.getWidth();
//       const height = pdf.internal.pageSize.getHeight();

//       pdf.addImage(imgData, 'PNG', 0, 0, width, height);
//       pdf.save(`${user?.fullName || 'User'}_${courseTitle}_Certificate.pdf`);
//     } catch (error) {
//       console.error('Error generating PDF:', error);
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     if (locked) {
//       onUnlockRequest?.();
//     } else {
//       handleDownloadPDF();
//     }
//   };

//   const addToLinkedIn = () => {
//     const linkedInUrl = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${encodeURIComponent(courseTitle)}&organizationName=${encodeURIComponent(issuerName)}&issueYear=${new Date().getFullYear()}&issueMonth=${new Date().getMonth() + 1}&certUrl=${encodeURIComponent(window.location.href)}&certId=${certificateId}`;
//     window.open(linkedInUrl, '_blank');
//   };

//   if (!user) {
//     return <div className={styles.container}>Please sign in to view your certificate.</div>;
//   }

//   return (
//     <div className={styles.container}>
//       <div className={styles.downloadContainer}>
//         {!locked && (
//           <>
//             <button 
//               onClick={handleButtonClick} 
//               className={styles.downloadButton}
//               disabled={isGenerating}
//             >
//               {isGenerating ? 'Generating PDF...' : 'Download PDF Certificate'}
//             </button>
//             <button 
//               onClick={addToLinkedIn} 
//               className={styles.linkedinButton}
//             >
//               <FaLinkedin /> Add to LinkedIn
//             </button>
//           </>
//         )}
//         {locked && (
//           <>
//             <button 
//               onClick={handleButtonClick} 
//               className={`${styles.downloadButton} ${styles.lockedButton}`}
//             >
//               Unlock Certificate
//             </button>
//             <p className={styles.lockedMessage}>
//               Complete the quiz with a passing score to unlock your certificate
//             </p>
//           </>
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
//           <div className={styles.headerAlignment}>
//             <img 
//               src="/logon.png" 
//               alt="Logo"
//               className={styles.logoPadding}
//             />
//             <div className={styles.seal}>
//               <div className={styles.sealInner}>
//                 <span>Eduskill</span>
//               </div>
//             </div>
//           </div>

//           <div className={styles.cornerDecorationTopLeft}></div>
//           <div className={styles.cornerDecorationTopRight}></div>
//           <div className={styles.cornerDecorationBottomLeft}></div>
//           <div className={styles.cornerDecorationBottomRight}></div>
          
//           <div className={styles.watermark}>EDUSKILL ONLINE LEARNING</div>
          
//           <div className={styles.certificateHeader}>
//             <h2
//               className={styles.certificateTitle}
//               style={{
//                 backgroundColor: 'white',
//                 display: 'inline-block',
//                 padding: '4rem 2rem',
//                 borderRadius: '6px',
//                 fontSize: '40px',
//               }}
//             >
//               <div>CERTIFICATE OF COMPLETION</div>
//             </h2>
//           </div>

//           <div className={styles.certificateBody}>
//             <p className={styles.presentedTo}>This is to certify that</p>
//             <h3 className={styles.recipientName}>{user.fullName}</h3>
//             <p className={styles.presentedTo}>has successfully completed</p>
//             <div className={styles.courseName}>{courseTitle}</div>
            
//             {score !== undefined && (
//               <div className={styles.scoreContainer}>
//                 <p>Achieving an outstanding score of</p>
//                 <div className={styles.scoreBadge}>{score}%</div>
//               </div>
//             )}

//             <div className={styles.detailsContainer}>
//               <div className={styles.detailBox}>
//                 <p className={styles.detailLabel}>Date of Completion</p>
//                 <p className={styles.detailValue}>{currentDate}</p>
//               </div>
//               <div className={styles.detailBox}>
//                 <p className={styles.detailLabel}>Certificate ID</p>
//                 <p className={styles.detailValue}>{certificateId}</p>
//               </div>
//             </div>
//           </div>

//           <div className={styles.signatureSection}>
//             <div className={styles.signatureBlock}>
//               <div className={styles.signatureLine}></div>
//               <p className={styles.signatureLabel}>Shivani Jobanputra</p>
//             </div>
//             <div className={styles.signatureBlock}>
//               {currentDate}
//               <div className={styles.signatureLine}></div>
//               <p className={styles.signatureLabel}>Date</p>
//             </div>
//           </div>

//           <div className={styles.issuerSection}>
//             <p className={styles.issuerName}>{issuerName}</p>
//             <p className={styles.issuerTagline}>Skill Today, Lead Tomorrow</p>
//           </div>

//           <div className={styles.verification}>
//             {qrCodeUrl ? (
//               <img
//                 src={qrCodeUrl}
//                 alt="QR Code for Certificate Verification"
//                 className={styles.qrCode}
//                 style={{
//                   width: '100px',
//                   height: '100px',
//                   margin: '10px auto',
//                   display: 'block',
//                 }}
//               />
//             ) : (
//               <p>Generating QR code...</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const GraduationPage: React.FC = () => {
//   const searchParams = useSearchParams();
//   const { user } = useUser();
//   const [courseTitle, setCourseTitle] = useState<string>('Default Course Title');
//   const [certificateId, setCertificateId] = useState<string>('');
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchCourseTitle = async () => {
//       try {
//         const courseId = searchParams.get('courseId');
//         const courseTitleParam = searchParams.get('courseTitle');

//         console.log('Query Params:', {
//           courseId,
//           courseTitleParam,
//           decodedCourseTitle: courseTitleParam ? decodeURIComponent(courseTitleParam) : null,
//         });

//         // Generate certificateId if user and courseId are available
//         if (user?.id && courseId) {
//           const newCertificateId = generateCertificateId(user.id, courseId);
//           setCertificateId(newCertificateId);
//           console.log('Generated certificateId:', newCertificateId);
//         }

//         // Prioritize courseTitle from query params if available
//         if (courseTitleParam) {
//           setCourseTitle(decodeURIComponent(courseTitleParam));
//           console.log('Set courseTitle from query param:', decodeURIComponent(courseTitleParam));
//           setIsLoading(false);
//           return;
//         }

//         if (!user?.id) {
//           console.warn('No user ID available, using default course title.');
//           setCourseTitle('Default Course Title');
//           setIsLoading(false);
//           return;
//         }

//         // Fallback to fetching course directly if courseId is available
//         if (courseId) {
//           try {
//             const courseResponse = await fetch(`/api/courses/${courseId}`);
//             if (courseResponse.ok) {
//               const courseData = await courseResponse.json();
//               if (courseData.title) {
//                 setCourseTitle(courseData.title);
//                 console.log('Set courseTitle from direct API call:', courseData.title);
//                 setIsLoading(false);
//                 return;
//               }
//             }
//             console.warn('Course not found via direct API call for courseId:', courseId);
//           } catch (error) {
//             console.error('Error fetching course directly:', error);
//           }
//         }

//         // Fallback to getCourses
//         const courses = await getCourses({ userId: user.id });

//         console.log('Fetched courses:', courses);

//         if (courseId) {
//           const course = courses.find((c) => c.id === courseId);
//           if (course) {
//             setCourseTitle(course.title);
//             console.log('Set courseTitle from getCourses:', course.title);
//           } else {
//             console.warn('Course not found for courseId:', courseId);
//             setCourseTitle('Default Course Title');
//           }
//         } else {
//           console.warn('No courseId provided in query params.');
//           setCourseTitle('Default Course Title');
//         }
//       } catch (error) {
//         console.error('Error fetching course title:', error);
//         setCourseTitle('Default Course Title');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchCourseTitle();
//   }, [searchParams, user]);

//   if (isLoading || !certificateId) {
//     return <div>Loading certificate...</div>;
//   }

//   return (
//     <Certificate
//       courseTitle={courseTitle}
//       date=""
//       issuerName="EDUSKILL ONLINE LEARNING"
//       certificateId={certificateId}
//       locked={false}
//     />
//   );
// };

// export default GraduationPage;







// "use client";

// import React, { useRef, useEffect, useState } from 'react';
// import { useUser } from '@clerk/clerk-react';
// import { useSearchParams } from 'next/navigation';
// import styles from '@/styles/Certificate.module.css';
// import { getCourses } from '@/actions/get-courses';
// import html2canvas from 'html2canvas';
// import { jsPDF } from 'jspdf';
// import { FaLinkedin } from 'react-icons/fa';
// import QRCode from 'qrcode';

// // Simple hash function to generate a stable certificate ID
// const generateCertificateId = (userId: string, courseId: string): string => {
//   const combined = `${userId}-${courseId}`;
//   let hash = 0;
//   for (let i = 0; i < combined.length; i++) {
//     const char = combined.charCodeAt(i);
//     hash = ((hash << 5) - hash) + char;
//     hash = hash & hash; // Convert to 32-bit integer
//   }
//   return Math.abs(hash).toString(36).substring(0, 8).toUpperCase();
// };

// interface CertificateProps {
//   courseTitle: string;
//   date: string;
//   issuerName?: string;
//   score?: number;
//   certificateId: string;
//   locked?: boolean;
//   onUnlockRequest?: () => void;
// }

// const Certificate: React.FC<CertificateProps> = ({
//   courseTitle,
//   date: propDate,
//   issuerName = "EDUSKILL ONLINE LEARNING",
//   score,
//   certificateId,
//   locked = false,
//   onUnlockRequest
// }) => {
//   const { user } = useUser();
//   const certificateRef = useRef<HTMLDivElement>(null);
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [qrCodeUrl, setQrCodeUrl] = useState<string>('');

//   const currentDate = new Date().toLocaleDateString('en-US', {
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric',
//   });

//   // Generate QR code for verification
//   useEffect(() => {
//     if (user) {
//       const qrData = `https://example.com/verify?certificateId=${certificateId}&user=${user.id}&course=${encodeURIComponent(courseTitle)}`;
//       QRCode.toDataURL(qrData, { width: 100, margin: 1 }, (err, url) => {
//         if (err) {
//           console.error('Error generating QR code:', err);
//           return;
//         }
//         setQrCodeUrl(url);
//       });
//     }
//   }, [user, certificateId, courseTitle]);

//   const handleDownloadPDF = async () => {
//     if (!certificateRef.current) return;

//     setIsGenerating(true);
//     try {
//       const canvas = await html2canvas(certificateRef.current, {
//         scale: 2,
//         useCORS: true,
//       });

//       const imgData = canvas.toDataURL('image/png');
//       const pdf = new jsPDF({
//         orientation: 'landscape',
//         unit: 'mm',
//         format: 'a4',
//       });

//       const width = pdf.internal.pageSize.getWidth();
//       const height = pdf.internal.pageSize.getHeight();

//       pdf.addImage(imgData, 'PNG', 0, 0, width, height);
//       pdf.save(`${user?.fullName || 'User'}_${courseTitle}_Certificate.pdf`);
//     } catch (error) {
//       console.error('Error generating PDF:', error);
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     if (locked) {
//       onUnlockRequest?.();
//     } else {
//       handleDownloadPDF();
//     }
//   };

//   const addToLinkedIn = () => {
//     const linkedInUrl = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${encodeURIComponent(courseTitle)}&organizationName=${encodeURIComponent(issuerName)}&issueYear=${new Date().getFullYear()}&issueMonth=${new Date().getMonth() + 1}&certUrl=${encodeURIComponent(window.location.href)}&certId=${certificateId}`;
//     window.open(linkedInUrl, '_blank');
//   };

//   if (!user) {
//     return <div className={styles.container}>Please sign in to view your certificate.</div>;
//   }

//   return (
//     <div className={styles.container}>
//       <div className={styles.downloadContainer}>
//         {!locked && (
//           <>
//             <button 
//               onClick={handleButtonClick} 
//               className={styles.downloadButton}
//               disabled={isGenerating}
//             >
//               {isGenerating ? 'Generating PDF...' : 'Download PDF Certificate'}
//             </button>
//             <button 
//               onClick={addToLinkedIn} 
//               className={styles.linkedinButton}
//             >
//               <FaLinkedin /> Add to LinkedIn
//             </button>
//           </>
//         )}
//         {locked && (
//           <>
//             <button 
//               onClick={handleButtonClick} 
//               className={`${styles.downloadButton} ${styles.lockedButton}`}
//             >
//               Unlock Certificate
//             </button>
//             <p className={styles.lockedMessage}>
//               Complete the quiz with a passing score to unlock your certificate
//             </p>
//           </>
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
        
//           <div 
//             className={styles.headerAlignment}
//             style={{
//               display: 'flex',
//               justifyContent: 'space-between',
//               alignItems: 'center',
//               width: '100%',
//               padding: '20px',
//             }}
//           >
//             <img 
//               src="/logon.png" 
//               alt="Logo"
//               className={styles.logoPadding}
//             />
//           <div className={styles.seal}>
//               <div className={styles.sealInner}>
//                 <span>Eduskill</span>
//               </div>
//             </div>
//           </div>
          

//           <div className={styles.cornerDecorationTopLeft}></div>
//           <div className={styles.cornerDecorationTopRight}></div>
//           <div className={styles.cornerDecorationBottomLeft}></div>
//           <div className={styles.cornerDecorationBottomRight}></div>
          
//           <div className={styles.watermark}>EDUSKILL ONLINE LEARNING</div>
          
//           <div className={styles.certificateHeader}>
//             <h2
//               className={styles.certificateTitle}
//               style={{
//                 backgroundColor: 'white',
//                 display: 'inline-block',
//                 padding: '4rem 2rem',
//                 borderRadius: '6px',
//                 fontSize: '40px',
//               }}
//             >
//               <div>CERTIFICATE OF COMPLETION</div>
//             </h2>
//           </div>

//           <div className={styles.certificateBody}>
//             <p className={styles.presentedTo}>This is to certify that</p>
//             <h3 className={styles.recipientName}>{user.fullName}</h3>
//             <p className={styles.presentedTo}>has successfully completed</p>
//             <div className={styles.courseName}>{courseTitle}</div>
            
//             {score !== undefined && (
//               <div className={styles.scoreContainer}>
//                 <p>Achieving an outstanding score of</p>
//                 <div className={styles.scoreBadge}>{score}%</div>
//               </div>
//             )}

//             <div className={styles.detailsContainer}>
//               <div className={styles.detailBox}>
//                 <p className={styles.detailLabel}>Date of Completion</p>
//                 <p className={styles.detailValue}>{currentDate}</p>
//               </div>
//               <div className={styles.detailBox}>
//                 <p className={styles.detailLabel}>Certificate ID</p>
//                 <p className={styles.detailValue}>{certificateId}</p>
//               </div>
//             </div>
//           </div>

//           <div 
//             className={styles.signatureSection}
//             style={{
//               display: 'flex',
//               justifyContent: 'space-around',
//               alignItems: 'center',
//               width: '100%',
//               padding: '20px 0',
//             }}
//           >
//             <div className={styles.signatureBlock}>
//               <div className={styles.signatureLine}></div>
//               <p className={styles.signatureLabel}>Shivani Jobanputra</p>
//             </div>
//             <div className={styles.signatureBlock}>
//             <p className={styles.signatureLabel}>{currentDate}</p>
//               <div className={styles.signatureLine}></div>
//               <p className={styles.signatureLabel}>Date</p>
//             </div>
//           </div>

//           <div className={styles.issuerSection}>
//             <p className={styles.issuerName}>{issuerName}</p>
//             <p className={styles.issuerTagline}>Skill Today, Lead Tomorrow</p>
//           </div>

//           <div className={styles.verification}>
//             {qrCodeUrl ? (
//               <img
//                 src={qrCodeUrl}
//                 alt="QR Code for Certificate Verification"
//                 className={styles.qrCode}
//                 style={{
//                   width: '100px',
//                   height: '100px',
//                   margin: '10px auto',
//                   display: 'block',
//                 }}
//               />
//             ) : (
//               <p>Generating QR code...</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const GraduationPage: React.FC = () => {
//   const searchParams = useSearchParams();
//   const { user } = useUser();
//   const [courseTitle, setCourseTitle] = useState<string>('Default Course Title');
//   const [certificateId, setCertificateId] = useState<string>('');
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchCourseTitle = async () => {
//       try {
//         const courseId = searchParams.get('courseId');
//         const courseTitleParam = searchParams.get('courseTitle');

//         console.log('Query Params:', {
//           courseId,
//           courseTitleParam,
//           decodedCourseTitle: courseTitleParam ? decodeURIComponent(courseTitleParam) : null,
//         });

//         // Generate certificateId if user and courseId are available
//         if (user?.id && courseId) {
//           const newCertificateId = generateCertificateId(user.id, courseId);
//           setCertificateId(newCertificateId);
//           console.log('Generated certificateId:', newCertificateId);
//         }

//         // Prioritize courseTitle from query params if available
//         if (courseTitleParam) {
//           setCourseTitle(decodeURIComponent(courseTitleParam));
//           console.log('Set courseTitle from query param:', decodeURIComponent(courseTitleParam));
//           setIsLoading(false);
//           return;
//         }

//         if (!user?.id) {
//           console.warn('No user ID available, using default course title.');
//           setCourseTitle('Default Course Title');
//           setIsLoading(false);
//           return;
//         }

//         // Fallback to fetching course directly if courseId is available
//         if (courseId) {
//           try {
//             const courseResponse = await fetch(`/api/courses/${courseId}`);
//             if (courseResponse.ok) {
//               const courseData = await courseResponse.json();
//               if (courseData.title) {
//                 setCourseTitle(courseData.title);
//                 console.log('Set courseTitle from direct API call:', courseData.title);
//                 setIsLoading(false);
//                 return;
//               }
//             }
//             console.warn('Course not found via direct API call for courseId:', courseId);
//           } catch (error) {
//             console.error('Error fetching course directly:', error);
//           }
//         }

//         // Fallback to getCourses
//         const courses = await getCourses({ userId: user.id });

//         console.log('Fetched courses:', courses);

//         if (courseId) {
//           const course = courses.find((c) => c.id === courseId);
//           if (course) {
//             setCourseTitle(course.title);
//             console.log('Set courseTitle from getCourses:', course.title);
//           } else {
//             console.warn('Course not found for courseId:', courseId);
//             setCourseTitle('Default Course Title');
//           }
//         } else {
//           console.warn('No courseId provided in query params.');
//           setCourseTitle('Default Course Title');
//         }
//       } catch (error) {
//         console.error('Error fetching course title:', error);
//         setCourseTitle('Default Course Title');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchCourseTitle();
//   }, [searchParams, user]);

//   if (isLoading || !certificateId) {
//     return <div>Loading certificate...</div>;
//   }

//   return (
//     <Certificate
//       courseTitle={courseTitle}
//       date=""
//       issuerName="EDUSKILL ONLINE LEARNING"
//       certificateId={certificateId}
//       locked={false}
//     />
//   );
// };

// export default GraduationPage;








// "use client";

// import React, { useRef, useEffect, useState } from 'react';
// import { useUser } from '@clerk/clerk-react';
// import { useSearchParams } from 'next/navigation';
// import styles from '@/styles/Certificate.module.css';
// import { getCourses } from '@/actions/get-courses';
// import html2canvas from 'html2canvas';
// import { jsPDF } from 'jspdf';
// import { FaLinkedin } from 'react-icons/fa';
// import QRCode from 'qrcode';

// // Simple hash function to generate a stable certificate ID
// const generateCertificateId = (userId: string, courseId: string): string => {
//   const combined = `${userId}-${courseId}`;
//   let hash = 0;
//   for (let i = 0; i < combined.length; i++) {
//     const char = combined.charCodeAt(i);
//     hash = ((hash << 5) - hash) + char;
//     hash = hash & hash; // Convert to 32-bit integer
//   }
//   return Math.abs(hash).toString(36).substring(0, 8).toUpperCase();
// };

// interface CertificateProps {
//   courseTitle: string;
//   date: string;
//   issuerName?: string;
//   score?: number;
//   certificateId: string;
//   locked?: boolean;
//   onUnlockRequest?: () => void;
// }

// const Certificate: React.FC<CertificateProps> = ({
//   courseTitle,
//   date: propDate,
//   issuerName = "EDUSKILL ONLINE LEARNING",
//   score,
//   certificateId,
//   locked = false,
//   onUnlockRequest
// }) => {
//   const { user } = useUser();
//   const certificateRef = useRef<HTMLDivElement>(null);
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [qrCodeUrl, setQrCodeUrl] = useState<string>('');

//   const currentDate = new Date().toLocaleDateString('en-US', {
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric',
//   });

//   // Generate QR code for verification
//   // useEffect(() => {
//   //   if (user) {
//   //     const qrData = `https://example.com/verify?certificateId=${certificateId}&user=${user.id}&course=${encodeURIComponent(courseTitle)}`;
//   //     QRCode.toDataURL(qrData, { width: 100, margin: 1 }, (err, url) => {
//   //       if (err) {
//   //         console.error('Error generating QR code:', err);
//   //         return;
//   //       }
//   //       setQrCodeUrl(url);
//   //     });
//   //   }
//   // }, [user, certificateId, courseTitle]);


//   // In your Certificate component, update the QR code generation:
// useEffect(() => {
//   if (user) {
//     const qrData = `${window.location.origin}/verify?certificateId=${certificateId}&user=${user.id}&course=${encodeURIComponent(courseTitle)}`;
//     QRCode.toDataURL(qrData, { width: 100, margin: 1 }, (err, url) => {
//       if (err) {
//         console.error('Error generating QR code:', err);
//         return;
//       }
//       setQrCodeUrl(url);
//     });
//   }
// }, [user, certificateId, courseTitle]);

//   const handleDownloadPDF = async () => {
//     if (!certificateRef.current) return;

//     setIsGenerating(true);
//     try {
//       const canvas = await html2canvas(certificateRef.current, {
//         scale: 2,
//         useCORS: true,
//       });

//       const imgData = canvas.toDataURL('image/png');
//       const pdf = new jsPDF({
//         orientation: 'landscape',
//         unit: 'mm',
//         format: 'a4',
//       });

//       const width = pdf.internal.pageSize.getWidth();
//       const height = pdf.internal.pageSize.getHeight();

//       pdf.addImage(imgData, 'PNG', 0, 0, width, height);
//       pdf.save(`${user?.fullName || 'User'}_${courseTitle}_Certificate.pdf`);
//     } catch (error) {
//       console.error('Error generating PDF:', error);
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     if (locked) {
//       onUnlockRequest?.();
//     } else {
//       handleDownloadPDF();
//     }
//   };

//   const addToLinkedIn = () => {
//     const linkedInUrl = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${encodeURIComponent(courseTitle)}&organizationName=${encodeURIComponent(issuerName)}&issueYear=${new Date().getFullYear()}&issueMonth=${new Date().getMonth() + 1}&certUrl=${encodeURIComponent(window.location.href)}&certId=${certificateId}`;
//     window.open(linkedInUrl, '_blank');
//   };

//   if (!user) {
//     return <div className={styles.container}>Please sign in to view your certificate.</div>;
//   }

//   return (
//     <div className={styles.container}>
//       <div 
//         style={{
//           display: 'flex',
//           flexDirection: 'row',
//           justifyContent: 'center',
//           alignItems: 'center',
//           gap: '20px',
//           marginBottom: '20px',
//         }}
//       >
//         {!locked && (
//           <>
//             <div>
//               <button 
//                 onClick={handleButtonClick} 
//                 className={styles.downloadButton}
//                 disabled={isGenerating}
//               >
//                 {isGenerating ? 'Generating PDF...' : 'Download PDF Certificate'}
//               </button>
//             </div>
//             <div>
//               <button 
//                 onClick={addToLinkedIn} 
//                 className={styles.linkedinButton}
//                 style={{
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: '8px',
//                   backgroundColor: '#0077B5', // LinkedIn blue
//                   color: 'white',
//                   border: 'none',
//                   padding: '10px 20px',
//                   borderRadius: '25px',
//                   fontSize: '16px',
//                   fontWeight: '500',
//                   cursor: 'pointer',
//                   boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
//                   transition: 'background-color 0.3s ease, transform 0.1s ease',
//                 }}
//                 onMouseEnter={(e) => {
//                   e.currentTarget.style.backgroundColor = '#005F91'; // Darker blue on hover
//                   e.currentTarget.style.transform = 'scale(1.05)';
//                 }}
//                 onMouseLeave={(e) => {
//                   e.currentTarget.style.backgroundColor = '#0077B5';
//                   e.currentTarget.style.transform = 'scale(1)';
//                 }}
//               >
//                 <FaLinkedin size={20} />
//                 Share on LinkedIn
//               </button>
//             </div>
//           </>
//         )}
//         {locked && (
//           <>
//             <div>
//               <button 
//                 onClick={handleButtonClick} 
//                 className={`${styles.downloadButton} ${styles.lockedButton}`}
//               >
//                 Unlock Certificate
//               </button>
//             </div>
//             <p className={styles.lockedMessage}>
//               Complete the quiz with a passing score to unlock your certificate
//             </p>
//           </>
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
//           <div 
//             className={styles.headerAlignment}
//             style={{
//               display: 'flex',
//               justifyContent: 'space-between',
//               alignItems: 'center',
//               width: '100%',
//               padding: '20px',
//             }}
//           >
//             <img 
//               src="/eduskill.png" 
//               alt="Logo"
//               className={styles.logoPadding}
//             />
//             <div className={styles.seal}>
//               <div className={styles.sealInner}>
//                 <span>Eduskill</span>
//               </div>
//             </div>
//           </div>

//           <div className={styles.cornerDecorationTopLeft}></div>
//           <div className={styles.cornerDecorationTopRight}></div>
//           <div className={styles.cornerDecorationBottomLeft}></div>
//           <div className={styles.cornerDecorationBottomRight}></div>
          
//           <div className={styles.watermark}>EDUSKILL ONLINE LEARNING</div>
          
//           <div className={styles.certificateHeader}>
//             <h2
//               className={styles.certificateTitle}
//               style={{
//                 backgroundColor: 'white',
//                 display: 'inline-block',
//                 padding: '4rem 2rem',
//                 borderRadius: '6px',
//                 fontSize: '40px',
//               }}
//             >
//               <div>CERTIFICATE OF COMPLETION</div>
//             </h2>
//           </div>

//           <div className={styles.certificateBody}>
//             <p className={styles.presentedTo}>This is to certify that</p>
//             <h3 className={styles.recipientName}>{user.fullName}</h3>
//             <p className={styles.presentedTo}>has successfully completed</p>
//             <div className={styles.courseName}>{courseTitle}</div>
            
//             {score !== undefined && (
//               <div className={styles.scoreContainer}>
//                 <p>Achieving an outstanding score of</p>
//                 <div className={styles.scoreBadge}>{score}%</div>
//               </div>
//             )}

//             <div className={styles.detailsContainer}>
//               <div className={styles.detailBox}>
//                 <p className={styles.detailLabel}>Date of Completion</p>
//                 <p className={styles.detailValue}>{currentDate}</p>
//               </div>
//               <div className={styles.detailBox}>
//                 <p className={styles.detailLabel}>Certificate ID</p>
//                 <p className={styles.detailValue}>{certificateId}</p>
//               </div>
//             </div>
//           </div>

//           <div 
//             className={styles.signatureSection}
//             style={{
//               display: 'flex',
//               justifyContent: 'space-around',
//               alignItems: 'center',
//               width: '100%',
//               padding: '20px 0',
//             }}
//           >
//             <div className={styles.signatureBlock}>
//               <div className={styles.signatureLine}></div>
//               <p className={styles.signatureLabel}>Shivani Jobanputra</p>
//             </div>
//             <div className={styles.signatureBlock}>
//               <p className={styles.signatureLabel}>{currentDate}</p>
//               <div className={styles.signatureLine}></div>
//               <p className={styles.signatureLabel}>Date</p>
//             </div>
//           </div>

//           <div className={styles.issuerSection}>
//             <p className={styles.issuerName}>{issuerName}</p>
//             <p className={styles.issuerTagline}>Skill Today, Lead Tomorrow</p>
//           </div>

//           <div className={styles.verification}>
//             {qrCodeUrl ? (
//               <img
//                 src={qrCodeUrl}
//                 alt="QR Code for Certificate Verification"
//                 className={styles.qrCode}
//                 style={{
//                   width: '100px',
//                   height: '100px',
//                   margin: '10px auto',
//                   display: 'block',
//                 }}
//               />
//             ) : (
//               <p>Generating QR code...</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const GraduationPage: React.FC = () => {
//   const searchParams = useSearchParams();
//   const { user } = useUser();
//   const [courseTitle, setCourseTitle] = useState<string>('Default Course Title');
//   const [certificateId, setCertificateId] = useState<string>('');
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchCourseTitle = async () => {
//       try {
//         const courseId = searchParams.get('courseId');
//         const courseTitleParam = searchParams.get('courseTitle');

//         console.log('Query Params:', {
//           courseId,
//           courseTitleParam,
//           decodedCourseTitle: courseTitleParam ? decodeURIComponent(courseTitleParam) : null,
//         });

//         // Generate certificateId if user and courseId are available
//         if (user?.id && courseId) {
//           const newCertificateId = generateCertificateId(user.id, courseId);
//           setCertificateId(newCertificateId);
//           console.log('Generated certificateId:', newCertificateId);
//         }

//         // Prioritize courseTitle from query params if available
//         if (courseTitleParam) {
//           setCourseTitle(decodeURIComponent(courseTitleParam));
//           console.log('Set courseTitle from query param:', decodeURIComponent(courseTitleParam));
//           setIsLoading(false);
//           return;
//         }

//         if (!user?.id) {
//           console.warn('No user ID available, using default course title.');
//           setCourseTitle('Default Course Title');
//           setIsLoading(false);
//           return;
//         }

//         // Fallback to fetching course directly if courseId is available
//         if (courseId) {
//           try {
//             const courseResponse = await fetch(`/api/courses/${courseId}`);
//             if (courseResponse.ok) {
//               const courseData = await courseResponse.json();
//               if (courseData.title) {
//                 setCourseTitle(courseData.title);
//                 console.log('Set courseTitle from direct API call:', courseData.title);
//                 setIsLoading(false);
//                 return;
//               }
//             }
//             console.warn('Course not found via direct API call for courseId:', courseId);
//           } catch (error) {
//             console.error('Error fetching course directly:', error);
//           }
//         }

//         // Fallback to getCourses
//         const courses = await getCourses({ userId: user.id });

//         console.log('Fetched courses:', courses);

//         if (courseId) {
//           const course = courses.find((c) => c.id === courseId);
//           if (course) {
//             setCourseTitle(course.title);
//             console.log('Set courseTitle from getCourses:', course.title);
//           } else {
//             console.warn('Course not found for courseId:', courseId);
//             setCourseTitle('Default Course Title');
//           }
//         } else {
//           console.warn('No courseId provided in query params.');
//           setCourseTitle('Default Course Title');
//         }
//       } catch (error) {
//         console.error('Error fetching course title:', error);
//         setCourseTitle('Default Course Title');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchCourseTitle();
//   }, [searchParams, user]);

//   if (isLoading || !certificateId) {
//     return <div>Loading certificate...</div>;
//   }

//   return (
//     <Certificate
//       courseTitle={courseTitle}
//       date=""
//       issuerName="EDUSKILL ONLINE LEARNING"
//       certificateId={certificateId}
//       locked={false}
//     />
//   );
// };

// export default GraduationPage;








// "use client";

// import React, { useRef, useEffect, useState } from 'react';
// import { useUser } from '@clerk/clerk-react';
// import { useSearchParams } from 'next/navigation';
// import styles from '@/styles/Certificate.module.css';
// import { getCourses } from '@/actions/get-courses';
// import html2canvas from 'html2canvas';
// import { jsPDF } from 'jspdf';
// import { FaLinkedin } from 'react-icons/fa';
// import QRCode from 'qrcode';

// // Simple hash function to generate a stable certificate ID
// const generateCertificateId = (userId: string, courseId: string): string => {
//   const combined = `${userId}-${courseId}`;
//   let hash = 0;
//   for (let i = 0; i < combined.length; i++) {
//     const char = combined.charCodeAt(i);
//     hash = ((hash << 5) - hash) + char;
//     hash = hash & hash; // Convert to 32-bit integer
//   }
//   return Math.abs(hash).toString(36).substring(0, 8).toUpperCase();
// };

// interface CertificateProps {
//   courseTitle: string;
//   date: string;
//   issuerName?: string;
//   score?: number;
//   certificateId: string;
//   locked?: boolean;
//   onUnlockRequest?: () => void;
// }

// const Certificate: React.FC<CertificateProps> = ({
//   courseTitle,
//   date: propDate,
//   issuerName = "EDUSKILL ONLINE LEARNING",
//   score,
//   certificateId,
//   locked = false,
//   onUnlockRequest
// }) => {
//   const { user } = useUser();
//   const certificateRef = useRef<HTMLDivElement>(null);
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [qrCodeUrl, setQrCodeUrl] = useState<string>('');

//   const currentDate = new Date().toLocaleDateString('en-US', {
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric',
//   });

//   useEffect(() => {
//     if (user) {
//       const qrData = `${window.location.origin}/verify?certificateId=${certificateId}&user=${user.id}&course=${encodeURIComponent(courseTitle)}`;
//       QRCode.toDataURL(qrData, { width: 100, margin: 1 }, (err, url) => {
//         if (err) {
//           console.error('Error generating QR code:', err);
//           return;
//         }
//         setQrCodeUrl(url);
//       });
//     }
//   }, [user, certificateId, courseTitle]);

//   const handleDownloadPDF = async () => {
//     if (!certificateRef.current) return;

//     setIsGenerating(true);
//     try {
//       // Get the certificate dimensions
//       const certificateWidth = certificateRef.current.offsetWidth;
//       const certificateHeight = certificateRef.current.offsetHeight;
      
//       // Calculate the optimal scale for A4 landscape (297mm x 210mm)
//       const pdfWidth = 297; // A4 width in mm (landscape)
//       const pdfHeight = 210; // A4 height in mm (landscape)
      
//       // Convert mm to pixels (1mm ≈ 3.78px at 96dpi)
//       const targetWidth = pdfWidth * 3.78;
//       const targetHeight = pdfHeight * 3.78;
      
//       // Calculate scale to maintain aspect ratio
//       const scale = Math.min(
//         targetWidth / certificateWidth,
//         targetHeight / certificateHeight
//       );

//       const canvas = await html2canvas(certificateRef.current, {
//         scale: scale,
//         useCORS: true,
//         logging: false,
//         backgroundColor: null,
//         removeContainer: true
//       });

//       const imgData = canvas.toDataURL('image/png', 1.0);
//       const pdf = new jsPDF({
//         orientation: 'landscape',
//         unit: 'mm',
//         format: 'a4',
//       });

//       // Calculate dimensions to fit the PDF
//       const imgWidth = pdfWidth;
//       const imgHeight = (canvas.height * pdfWidth) / canvas.width;
      
//       // Center the image vertically
//       const yOffset = (pdfHeight - imgHeight) / 2;

//       pdf.addImage(imgData, 'PNG', 0, yOffset, imgWidth, imgHeight);
//       pdf.save(`${user?.fullName || 'User'}_${courseTitle.replace(/\s+/g, '_')}_Certificate.pdf`);
//     } catch (error) {
//       console.error('Error generating PDF:', error);
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     if (locked) {
//       onUnlockRequest?.();
//     } else {
//       handleDownloadPDF();
//     }
//   };

//   const addToLinkedIn = () => {
//     const linkedInUrl = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${encodeURIComponent(courseTitle)}&organizationName=${encodeURIComponent(issuerName)}&issueYear=${new Date().getFullYear()}&issueMonth=${new Date().getMonth() + 1}&certUrl=${encodeURIComponent(window.location.href)}&certId=${certificateId}`;
//     window.open(linkedInUrl, '_blank');
//   };

//   if (!user) {
//     return <div className={styles.container}>Please sign in to view your certificate.</div>;
//   }

//   return (
//     <div className={styles.container}>
//       <div className={styles.controlsContainer}>
//         {!locked && (
//           <>
//             <div className={styles.buttonWrapper}>
//               <button 
//                 onClick={handleButtonClick} 
//                 className={styles.downloadButton}
//                 disabled={isGenerating}
//               >
//                 {isGenerating ? 'Generating PDF...' : 'Download PDF Certificate'}
//               </button>
//             </div>
//             <div className={styles.buttonWrapper}>
//               <button 
//                 onClick={addToLinkedIn} 
//                 className={styles.linkedinButton}
//               >
//                 <FaLinkedin size={20} />
//                 Share on LinkedIn
//               </button>
//             </div>
//           </>
//         )}
//         {locked && (
//           <>
//             <div className={styles.buttonWrapper}>
//               <button 
//                 onClick={handleButtonClick} 
//                 className={`${styles.downloadButton} ${styles.lockedButton}`}
//               >
//                 Unlock Certificate
//               </button>
//             </div>
//             <p className={styles.lockedMessage}>
//               Complete the quiz with a passing score to unlock your certificate
//             </p>
//           </>
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
//           <div className={styles.headerAlignment}>
//             <img 
//               src="/eduskill.png" 
//               alt="Logo"
//               className={styles.logoPadding}
//             />
//             <div className={styles.seal}>
//               <div className={styles.sealInner}>
//                 <span>Eduskill</span>
//               </div>
//             </div>
//           </div>

//           <div className={styles.cornerDecorationTopLeft}></div>
//           <div className={styles.cornerDecorationTopRight}></div>
//           <div className={styles.cornerDecorationBottomLeft}></div>
//           <div className={styles.cornerDecorationBottomRight}></div>
          
//           <div className={styles.watermark}>EDUSKILL ONLINE LEARNING</div>
          
//           <div className={styles.certificateHeader}>
//             <h2 className={styles.certificateTitle}>
//               <div>CERTIFICATE OF COMPLETION</div>
//             </h2>
//           </div>

//           <div className={styles.certificateBody}>
//             <p className={styles.presentedTo}>This is to certify that</p>
//             <h3 className={styles.recipientName}>{user.fullName}</h3>
//             <p className={styles.presentedTo}>has successfully completed</p>
//             <div className={styles.courseName}>{courseTitle}</div>
            
//             {score !== undefined && (
//               <div className={styles.scoreContainer}>
//                 <p>Achieving an outstanding score of</p>
//                 <div className={styles.scoreBadge}>{score}%</div>
//               </div>
//             )}

//             <div className={styles.detailsContainer}>
//               <div className={styles.detailBox}>
//                 <p className={styles.detailLabel}>Date of Completion</p>
//                 <p className={styles.detailValue}>{currentDate}</p>
//               </div>
//               <div className={styles.detailBox}>
//                 <p className={styles.detailLabel}>Certificate ID</p>
//                 <p className={styles.detailValue}>{certificateId}</p>
//               </div>
//             </div>
//           </div>

//           <div className={styles.signatureSection}>
//             <div className={styles.signatureBlock}>
//               <div className={styles.signatureLine}></div>
//               <p className={styles.signatureLabel}>Shivani Jobanputra</p>
//             </div>
//             <div className={styles.signatureBlock}>
//               <p className={styles.signatureLabel}>{currentDate}</p>
//               <div className={styles.signatureLine}></div>
//               <p className={styles.signatureLabel}>Date</p>
//             </div>
//           </div>

//           <div className={styles.issuerSection}>
//             <p className={styles.issuerName}>{issuerName}</p>
//             <p className={styles.issuerTagline}>Skill Today, Lead Tomorrow</p>
//           </div>

//           <div className={styles.verification}>
//             {qrCodeUrl ? (
//               <img
//                 src={qrCodeUrl}
//                 alt="QR Code for Certificate Verification"
//                 className={styles.qrCode}
//               />
//             ) : (
//               <p>Generating QR code...</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const GraduationPage: React.FC = () => {
//   const searchParams = useSearchParams();
//   const { user } = useUser();
//   const [courseTitle, setCourseTitle] = useState<string>('Default Course Title');
//   const [certificateId, setCertificateId] = useState<string>('');
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchCourseTitle = async () => {
//       try {
//         const courseId = searchParams.get('courseId');
//         const courseTitleParam = searchParams.get('courseTitle');

//         console.log('Query Params:', {
//           courseId,
//           courseTitleParam,
//           decodedCourseTitle: courseTitleParam ? decodeURIComponent(courseTitleParam) : null,
//         });

//         // Generate certificateId if user and courseId are available
//         if (user?.id && courseId) {
//           const newCertificateId = generateCertificateId(user.id, courseId);
//           setCertificateId(newCertificateId);
//           console.log('Generated certificateId:', newCertificateId);
//         }

//         // Prioritize courseTitle from query params if available
//         if (courseTitleParam) {
//           setCourseTitle(decodeURIComponent(courseTitleParam));
//           console.log('Set courseTitle from query param:', decodeURIComponent(courseTitleParam));
//           setIsLoading(false);
//           return;
//         }

//         if (!user?.id) {
//           console.warn('No user ID available, using default course title.');
//           setCourseTitle('Default Course Title');
//           setIsLoading(false);
//           return;
//         }

//         // Fallback to fetching course directly if courseId is available
//         if (courseId) {
//           try {
//             const courseResponse = await fetch(`/api/courses/${courseId}`);
//             if (courseResponse.ok) {
//               const courseData = await courseResponse.json();
//               if (courseData.title) {
//                 setCourseTitle(courseData.title);
//                 console.log('Set courseTitle from direct API call:', courseData.title);
//                 setIsLoading(false);
//                 return;
//               }
//             }
//             console.warn('Course not found via direct API call for courseId:', courseId);
//           } catch (error) {
//             console.error('Error fetching course directly:', error);
//           }
//         }

//         // Fallback to getCourses
//         const courses = await getCourses({ userId: user.id });

//         console.log('Fetched courses:', courses);

//         if (courseId) {
//           const course = courses.find((c) => c.id === courseId);
//           if (course) {
//             setCourseTitle(course.title);
//             console.log('Set courseTitle from getCourses:', course.title);
//           } else {
//             console.warn('Course not found for courseId:', courseId);
//             setCourseTitle('Default Course Title');
//           }
//         } else {
//           console.warn('No courseId provided in query params.');
//           setCourseTitle('Default Course Title');
//         }
//       } catch (error) {
//         console.error('Error fetching course title:', error);
//         setCourseTitle('Default Course Title');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchCourseTitle();
//   }, [searchParams, user]);

//   if (isLoading || !certificateId) {
//     return <div className={styles.loadingContainer}>Loading certificate...</div>;
//   }

//   return (
//     <Certificate
//       courseTitle={courseTitle}
//       date=""
//       issuerName="EDUSKILL ONLINE LEARNING"
//       certificateId={certificateId}
//       locked={false}
//     />
//   );
// };

// export default GraduationPage;




// "use client";

// import React, { useRef, useEffect, useState } from 'react';
// import { useUser } from '@clerk/clerk-react';
// import { useSearchParams } from 'next/navigation';
// import styles from '@/styles/Certificate.module.css';
// import { getCourses } from '@/actions/get-courses';
// import html2canvas from 'html2canvas';
// import { jsPDF } from 'jspdf';
// import { FaLinkedin } from 'react-icons/fa';
// import QRCode from 'qrcode';

// // Simple hash function to generate a stable certificate ID
// const generateCertificateId = (userId: string, courseId: string): string => {
//   const combined = `${userId}-${courseId}`;
//   let hash = 0;
//   for (let i = 0; i < combined.length; i++) {
//     const char = combined.charCodeAt(i);
//     hash = ((hash << 5) - hash) + char;
//     hash = hash & hash; // Convert to 32-bit integer
//   }
//   return Math.abs(hash).toString(36).substring(0, 8).toUpperCase();
// };

// interface CertificateProps {
//   courseTitle: string;
//   date: string;
//   issuerName?: string;
//   score?: number;
//   certificateId: string;
//   locked?: boolean;
//   onUnlockRequest?: () => void;
// }

// const Certificate: React.FC<CertificateProps> = ({
//   courseTitle,
//   date: propDate,
//   issuerName = "EDUSKILL ONLINE LEARNING",
//   score,
//   certificateId,
//   locked = false,
//   onUnlockRequest
// }) => {
//   const { user } = useUser();
//   const certificateRef = useRef<HTMLDivElement>(null);
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [qrCodeUrl, setQrCodeUrl] = useState<string>('');

//   const currentDate = new Date().toLocaleDateString('en-US', {
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric',
//   });

//   useEffect(() => {
//     if (user) {
//       const qrData = `${window.location.origin}/verify?certificateId=${certificateId}&user=${user.id}&course=${encodeURIComponent(courseTitle)}`;
//       QRCode.toDataURL(qrData, { width: 100, margin: 1 }, (err, url) => {
//         if (err) {
//           console.error('Error generating QR code:', err);
//           return;
//         }
//         setQrCodeUrl(url);
//       });
//     }
//   }, [user, certificateId, courseTitle]);

//   const handleDownloadPDF = async () => {
//     if (!certificateRef.current) return;

//     setIsGenerating(true);
//     try {
//       // Set fixed dimensions for A4 landscape in pixels (at 96dpi, 1mm ≈ 3.78px)
//       const pdfWidth = 297 * 3.78; // A4 width in pixels (landscape)
//       const pdfHeight = 210 * 3.78; // A4 height in pixels (landscape)

//       // Temporarily set the certificate container to match A4 landscape dimensions
//       certificateRef.current.style.width = `${pdfWidth}px`;
//       certificateRef.current.style.height = `${pdfHeight}px`;

//       // Ensure the background is applied
//       certificateRef.current.style.backgroundColor = '#fff';

//       const canvas = await html2canvas(certificateRef.current, {
//         scale: 1, // Use scale 1 to match the exact pixel dimensions
//         width: pdfWidth,
//         height: pdfHeight,
//         useCORS: true,
//         logging: false,
//         backgroundColor: '#fff', // Explicitly set background color
//         removeContainer: true,
//       });

//       const imgData = canvas.toDataURL('image/png', 1.0);
//       const pdf = new jsPDF({
//         orientation: 'landscape',
//         unit: 'mm',
//         format: 'a4',
//       });

//       // Add the image to the PDF, fitting the A4 dimensions
//       pdf.addImage(imgData, 'PNG', 0, 0, 297, 210);
//       pdf.save(`${user?.fullName || 'User'}_${courseTitle.replace(/\s+/g, '_')}_Certificate.pdf`);

//       // Reset the dimensions after generating the PDF
//       certificateRef.current.style.width = '';
//       certificateRef.current.style.height = '';
//     } catch (error) {
//       console.error('Error generating PDF:', error);
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     if (locked) {
//       onUnlockRequest?.();
//     } else {
//       handleDownloadPDF();
//     }
//   };

//   const addToLinkedIn = () => {
//     const linkedInUrl = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${encodeURIComponent(courseTitle)}&organizationName=${encodeURIComponent(issuerName)}&issueYear=${new Date().getFullYear()}&issueMonth=${new Date().getMonth() + 1}&certUrl=${encodeURIComponent(window.location.href)}&certId=${certificateId}`;
//     window.open(linkedInUrl, '_blank');
//   };

//   if (!user) {
//     return <div className={styles.container}>Please sign in to view your certificate.</div>;
//   }

//   return (
//     <div className={styles.container}>
//       <div className={styles.controlsContainer}>
//         {!locked && (
//           <>
//             <div className={styles.buttonWrapper}>
//               <button 
//                 onClick={handleButtonClick} 
//                 className={styles.downloadButton}
//                 disabled={isGenerating}
//               >
//                 {isGenerating ? 'Generating PDF...' : 'Download PDF Certificate'}
//               </button>
//             </div>
//             <div className={styles.buttonWrapper}>
//               <button 
//                 onClick={addToLinkedIn} 
//                 className={styles.linkedinButton}
//               >
//                 <FaLinkedin size={20} />
//                 Share on LinkedIn
//               </button>
//             </div>
//           </>
//         )}
//         {locked && (
//           <>
//             <div className={styles.buttonWrapper}>
//               <button 
//                 onClick={handleButtonClick} 
//                 className={`${styles.downloadButton} ${styles.lockedButton}`}
//               >
//                 Unlock Certificate
//               </button>
//             </div>
//             <p className={styles.lockedMessage}>
//               Complete the quiz with a passing score to unlock your certificate
//             </p>
//           </>
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
//           <div className={styles.headerAlignment}>
//             <img 
//               src="/eduskill.png" 
//               alt="Logo"
//               className={styles.logoPadding}
//             />
//             <div className={styles.seal}>
//               <div className={styles.sealInner}>
//                 <span>Eduskill</span>
//               </div>
//             </div>
//           </div>

//           <div className={styles.cornerDecorationTopLeft}></div>
//           <div className={styles.cornerDecorationTopRight}></div>
//           <div className={styles.cornerDecorationBottomLeft}></div>
//           <div className={styles.cornerDecorationBottomRight}></div>
          
//           <div className={styles.watermark}>EDUSKILL ONLINE LEARNING</div>
          
//           <div className={styles.certificateHeader}>
//             <h2 className={styles.certificateTitle}>
//               <div>CERTIFICATE OF COMPLETION</div>
//             </h2>
//           </div>

//           <div className={styles.certificateBody}>
//             <p className={styles.presentedTo}>This is to certify that</p>
//             <h3 className={styles.recipientName}>{user.fullName}</h3>
//             <p className={styles.presentedTo}>has successfully completed</p>
//             <div className={styles.courseName}>{courseTitle}</div>
            
//             {score !== undefined && (
//               <div className={styles.scoreContainer}>
//                 <p>Achieving an outstanding score of</p>
//                 <div className={styles.scoreBadge}>{score}%</div>
//               </div>
//             )}

//             <div className={styles.detailsContainer}>
//               <div className={styles.detailBox}>
//                 <p className={styles.detailLabel}>Date of Completion</p>
//                 <p className={styles.detailValue}>{currentDate}</p>
//               </div>
//               <div className={styles.detailBox}>
//                 <p className={styles.detailLabel}>Certificate ID</p>
//                 <p className={styles.detailValue}>{certificateId}</p>
//               </div>
//             </div>
//           </div>

//           <div className={styles.signatureSection}>
//             <div className={styles.signatureBlock}>
//               <div className={styles.signatureLine}></div>
//               <p className={styles.signatureLabel}>Shivani Jobanputra</p>
//             </div>
//             <div className={styles.signatureBlock}>
//               <p className={styles.signatureLabel}>{currentDate}</p>
//               <div className={styles.signatureLine}></div>
//               <p className={styles.signatureLabel}>Date</p>
//             </div>
//           </div>

//           <div className={styles.issuerSection}>
//             <p className={styles.issuerName}>{issuerName}</p>
//             <p className={styles.issuerTagline}>Skill Today, Lead Tomorrow</p>
//           </div>

//           <div className={styles.verification}>
//             {qrCodeUrl ? (
//               <img
//                 src={qrCodeUrl}
//                 alt="QR Code for Certificate Verification"
//                 className={styles.qrCode}
//               />
//             ) : (
//               <p>Generating QR code...</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const GraduationPage: React.FC = () => {
//   const searchParams = useSearchParams();
//   const { user } = useUser();
//   const [courseTitle, setCourseTitle] = useState<string>('Default Course Title');
//   const [certificateId, setCertificateId] = useState<string>('');
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchCourseTitle = async () => {
//       try {
//         const courseId = searchParams.get('courseId');
//         const courseTitleParam = searchParams.get('courseTitle');

//         console.log('Query Params:', {
//           courseId,
//           courseTitleParam,
//           decodedCourseTitle: courseTitleParam ? decodeURIComponent(courseTitleParam) : null,
//         });

//         // Generate certificateId if user and courseId are available
//         if (user?.id && courseId) {
//           const newCertificateId = generateCertificateId(user.id, courseId);
//           setCertificateId(newCertificateId);
//           console.log('Generated certificateId:', newCertificateId);
//         }

//         // Prioritize courseTitle from query params if available
//         if (courseTitleParam) {
//           setCourseTitle(decodeURIComponent(courseTitleParam));
//           console.log('Set courseTitle from query param:', decodeURIComponent(courseTitleParam));
//           setIsLoading(false);
//           return;
//         }

//         if (!user?.id) {
//           console.warn('No user ID available, using default course title.');
//           setCourseTitle('Default Course Title');
//           setIsLoading(false);
//           return;
//         }

//         // Fallback to fetching course directly if courseId is available
//         if (courseId) {
//           try {
//             const courseResponse = await fetch(`/api/courses/${courseId}`);
//             if (courseResponse.ok) {
//               const courseData = await courseResponse.json();
//               if (courseData.title) {
//                 setCourseTitle(courseData.title);
//                 console.log('Set courseTitle from direct API call:', courseData.title);
//                 setIsLoading(false);
//                 return;
//               }
//             }
//             console.warn('Course not found via direct API call for courseId:', courseId);
//           } catch (error) {
//             console.error('Error fetching course directly:', error);
//           }
//         }

//         // Fallback to getCourses
//         const courses = await getCourses({ userId: user.id });

//         console.log('Fetched courses:', courses);

//         if (courseId) {
//           const course = courses.find((c) => c.id === courseId);
//           if (course) {
//             setCourseTitle(course.title);
//             console.log('Set courseTitle from getCourses:', course.title);
//           } else {
//             console.warn('Course not found for courseId:', courseId);
//             setCourseTitle('Default Course Title');
//           }
//         } else {
//           console.warn('No courseId provided in query params.');
//           setCourseTitle('Default Course Title');
//         }
//       } catch (error) {
//         console.error('Error fetching course title:', error);
//         setCourseTitle('Default Course Title');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchCourseTitle();
//   }, [searchParams, user]);

//   if (isLoading || !certificateId) {
//     return <div className={styles.loadingContainer}>Loading certificate...</div>;
//   }

//   return (
//     <Certificate
//       courseTitle={courseTitle}
//       date=""
//       issuerName="EDUSKILL ONLINE LEARNING"
//       certificateId={certificateId}
//       locked={false}
//     />
//   );
// };

// export default GraduationPage;








// "use client";

// import React, { useRef, useEffect, useState } from 'react';
// import { useUser } from '@clerk/clerk-react';
// import { useSearchParams } from 'next/navigation';
// import styles from '@/styles/Certificate.module.css';
// import { getCourses } from '@/actions/get-courses';
// import html2canvas from 'html2canvas';
// import { jsPDF } from 'jspdf';
// import { FaLinkedin } from 'react-icons/fa';
// import QRCode from 'qrcode';

// // Simple hash function to generate a stable certificate ID
// const generateCertificateId = (userId: string, courseId: string): string => {
//   const combined = `${userId}-${courseId}`;
//   let hash = 0;
//   for (let i = 0; i < combined.length; i++) {
//     const char = combined.charCodeAt(i);
//     hash = ((hash << 5) - hash) + char;
//     hash = hash & hash; // Convert to 32-bit integer
//   }
//   return Math.abs(hash).toString(36).substring(0, 8).toUpperCase();
// };

// interface CertificateProps {
//   courseTitle: string;
//   date: string;
//   issuerName?: string;
//   score?: number;
//   certificateId: string;
//   locked?: boolean;
//   onUnlockRequest?: () => void;
// }

// const Certificate: React.FC<CertificateProps> = ({
//   courseTitle,
//   date: propDate,
//   issuerName = "EDUSKILL ONLINE LEARNING",
//   score,
//   certificateId,
//   locked = false,
//   onUnlockRequest
// }) => {
//   const { user } = useUser();
//   const certificateRef = useRef<HTMLDivElement>(null);
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [qrCodeUrl, setQrCodeUrl] = useState<string>('');

//   const currentDate = new Date().toLocaleDateString('en-US', {
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric',
//   });

//   useEffect(() => {
//     if (user) {
//       const qrData = `${window.location.origin}/verify?certificateId=${certificateId}&user=${user.id}&course=${encodeURIComponent(courseTitle)}`;
//       QRCode.toDataURL(qrData, { width: 100, margin: 1 }, (err, url) => {
//         if (err) {
//           console.error('Error generating QR code:', err);
//           return;
//         }
//         setQrCodeUrl(url);
//       });
//     }
//   }, [user, certificateId, courseTitle]);

//   const handleDownloadPDF = async () => {
//     if (!certificateRef.current) return;

//     setIsGenerating(true);
//     try {
//       // Set fixed dimensions for A4 landscape in pixels (at 96dpi, 1mm ≈ 3.78px)
//       const pdfWidth = 297 * 3.78; // A4 width in pixels (landscape)
//       const pdfHeight = 210 * 3.78; // A4 height in pixels (landscape)

//       // Temporarily set the certificate container to match A4 landscape dimensions
//       certificateRef.current.style.width = `${pdfWidth}px`;
//       certificateRef.current.style.height = `${pdfHeight}px`;

//       // Ensure the background is applied
//       certificateRef.current.style.backgroundColor = '#0A1E3C'; // Match the dark blue background

//       const canvas = await html2canvas(certificateRef.current, {
//         scale: 1, // Use scale 1 to match the exact pixel dimensions
//         width: pdfWidth,
//         height: pdfHeight,
//         useCORS: true,
//         logging: false,
//         backgroundColor: '#0A1E3C', // Match the dark blue background
//         removeContainer: true,
//       });

//       const imgData = canvas.toDataURL('image/png', 1.0);
//       const pdf = new jsPDF({
//         orientation: 'landscape',
//         unit: 'mm',
//         format: 'a4',
//       });

//       // Add the image to the PDF, fitting the A4 dimensions
//       pdf.addImage(imgData, 'PNG', 0, 0, 297, 210);
//       pdf.save(`${user?.fullName || 'User'}_${courseTitle.replace(/\s+/g, '_')}_Certificate.pdf`);

//       // Reset the dimensions after generating the PDF
//       certificateRef.current.style.width = '';
//       certificateRef.current.style.height = '';
//     } catch (error) {
//       console.error('Error generating PDF:', error);
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     if (locked) {
//       onUnlockRequest?.();
//     } else {
//       handleDownloadPDF();
//     }
//   };

//   const addToLinkedIn = () => {
//     const linkedInUrl = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${encodeURIComponent(courseTitle)}&organizationName=${encodeURIComponent(issuerName)}&issueYear=${new Date().getFullYear()}&issueMonth=${new Date().getMonth() + 1}&certUrl=${encodeURIComponent(window.location.href)}&certId=${certificateId}`;
//     window.open(linkedInUrl, '_blank');
//   };

//   if (!user) {
//     return <div className={styles.container}>Please sign in to view your certificate.</div>;
//   }

//   return (
//     <div className={styles.container}>
//       <div className={styles.controlsContainer}>
//         {!locked && (
//           <>
//             <div className={styles.buttonWrapper}>
//               <button 
//                 onClick={handleButtonClick} 
//                 className={styles.downloadButton}
//                 disabled={isGenerating}
//               >
//                 {isGenerating ? 'Generating PDF...' : 'Download PDF Certificate'}
//               </button>
//             </div>
//             <div className={styles.buttonWrapper}>
//               <button 
//                 onClick={addToLinkedIn} 
//                 className={styles.linkedinButton}
//               >
//                 <FaLinkedin size={20} />
//                 Share on LinkedIn
//               </button>
//             </div>
//           </>
//         )}
//         {locked && (
//           <>
//             <div className={styles.buttonWrapper}>
//               <button 
//                 onClick={handleButtonClick} 
//                 className={`${styles.downloadButton} ${styles.lockedButton}`}
//               >
//                 Unlock Certificate
//               </button>
//             </div>
//             <p className={styles.lockedMessage}>
//               Complete the quiz with a passing score to unlock your certificate
//             </p>
//           </>
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
//           <div className={styles.headerAlignment}>
//             <img 
//               src="/eduskill.png" 
//               alt="Logo"
//               className={styles.logoPadding}
//             />
//             <div className={styles.seal}>
//               <div className={styles.sealInner}>
//                 <span>Eduskill</span>
//               </div>
//             </div>
//           </div>

//           <div className={styles.cornerDecorationTopLeft}></div>
//           <div className={styles.cornerDecorationTopRight}></div>
//           <div className={styles.cornerDecorationBottomLeft}></div>
//           <div className={styles.cornerDecorationBottomRight}></div>
          
//           <div className={styles.watermark}>EDUSKILL ONLINE LEARNING</div>
          
//           <div className={styles.certificateHeader}>
//             <h2 className={styles.certificateTitle}>
//               <div>CERTIFICATE OF COMPLETION</div>
//             </h2>
//           </div>

//           <div className={styles.certificateBody}>
//             <p className={styles.presentedTo}>This is to certify that</p>
//             <h3 className={styles.recipientName}>{user.fullName}</h3>
//             <p className={styles.presentedTo}>has successfully completed</p>
//             <div className={styles.courseName}>{courseTitle}</div>
            
//             {score !== undefined && (
//               <div className={styles.scoreContainer}>
//                 <p>Achieving an outstanding score of</p>
//                 <div className={styles.scoreBadge}>{score}%</div>
//               </div>
//             )}

//             <div className={styles.detailsContainer}>
//               <div className={styles.detailBox}>
//                 <p className={styles.detailLabel}>Date of Completion</p>
//                 <p className={styles.detailValue}>{currentDate}</p>
//               </div>
//               <div className={styles.detailBox}>
//                 <p className={styles.detailLabel}>Certificate ID</p>
//                 <p className={styles.detailValue}>{certificateId}</p>
//               </div>
//             </div>
//           </div>

//           <div className={styles.signatureSection}>
//             <div className={styles.signatureBlock}>
//               <div className={styles.signatureLine}></div>
//               <p className={styles.signatureLabel}>Shivani Jobanputra</p>
//             </div>
//             <div className={styles.signatureBlock}>
//               <p className={styles.signatureLabel}>{currentDate}</p>
//               <div className={styles.signatureLine}></div>
//               <p className={styles.signatureLabel}>Date</p>
//             </div>
//           </div>

//           <div className={styles.issuerSection}>
//             <p className={styles.issuerName}>{issuerName}</p>
//             <p className={styles.issuerTagline}>Skill Today, Lead Tomorrow</p>
//           </div>

//           <div className={styles.verification}>
//             {qrCodeUrl ? (
//               <img
//                 src={qrCodeUrl}
//                 alt="QR Code for Certificate Verification"
//                 className={styles.qrCode}
//               />
//             ) : (
//               <p>Generating QR code...</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const GraduationPage: React.FC = () => {
//   const searchParams = useSearchParams();
//   const { user } = useUser();
//   const [courseTitle, setCourseTitle] = useState<string>('Default Course Title');
//   const [certificateId, setCertificateId] = useState<string>('');
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchCourseTitle = async () => {
//       try {
//         const courseId = searchParams.get('courseId');
//         const courseTitleParam = searchParams.get('courseTitle');

//         console.log('Query Params:', {
//           courseId,
//           courseTitleParam,
//           decodedCourseTitle: courseTitleParam ? decodeURIComponent(courseTitleParam) : null,
//         });

//         // Generate certificateId if user and courseId are available
//         if (user?.id && courseId) {
//           const newCertificateId = generateCertificateId(user.id, courseId);
//           setCertificateId(newCertificateId);
//           console.log('Generated certificateId:', newCertificateId);
//         }

//         // Prioritize courseTitle from query params if available
//         if (courseTitleParam) {
//           setCourseTitle(decodeURIComponent(courseTitleParam));
//           console.log('Set courseTitle from query param:', decodeURIComponent(courseTitleParam));
//           setIsLoading(false);
//           return;
//         }

//         if (!user?.id) {
//           console.warn('No user ID available, using default course title.');
//           setCourseTitle('Default Course Title');
//           setIsLoading(false);
//           return;
//         }

//         // Fallback to fetching course directly if courseId is available
//         if (courseId) {
//           try {
//             const courseResponse = await fetch(`/api/courses/${courseId}`);
//             if (courseResponse.ok) {
//               const courseData = await courseResponse.json();
//               if (courseData.title) {
//                 setCourseTitle(courseData.title);
//                 console.log('Set courseTitle from direct API call:', courseData.title);
//                 setIsLoading(false);
//                 return;
//               }
//             }
//             console.warn('Course not found via direct API call for courseId:', courseId);
//           } catch (error) {
//             console.error('Error fetching course directly:', error);
//           }
//         }

//         // Fallback to getCourses
//         const courses = await getCourses({ userId: user.id });

//         console.log('Fetched courses:', courses);

//         if (courseId) {
//           const course = courses.find((c) => c.id === courseId);
//           if (course) {
//             setCourseTitle(course.title);
//             console.log('Set courseTitle from getCourses:', course.title);
//           } else {
//             console.warn('Course not found for courseId:', courseId);
//             setCourseTitle('Default Course Title');
//           }
//         } else {
//           console.warn('No courseId provided in query params.');
//           setCourseTitle('Default Course Title');
//         }
//       } catch (error) {
//         console.error('Error fetching course title:', error);
//         setCourseTitle('Default Course Title');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchCourseTitle();
//   }, [searchParams, user]);

//   if (isLoading || !certificateId) {
//     return <div className={styles.loadingContainer}>Loading certificate...</div>;
//   }

//   return (
//     <Certificate
//       courseTitle={courseTitle}
//       date=""
//       issuerName="EDUSKILL ONLINE LEARNING"
//       certificateId={certificateId}
//       locked={false}
//     />
//   );
// };

// export default GraduationPage;



// "use client";

// import React, { useRef, useEffect, useState } from 'react';
// import { useUser } from '@clerk/clerk-react';
// import { useSearchParams } from 'next/navigation';
// import styles from '@/styles/Certificate.module.css';
// import { getCourses } from '@/actions/get-courses';
// import html2canvas from 'html2canvas';
// import { jsPDF } from 'jspdf';
// import { FaLinkedin } from 'react-icons/fa';
// import QRCode from 'qrcode';

// // Simple hash function to generate a stable certificate ID
// const generateCertificateId = (userId: string, courseId: string): string => {
//   const combined = `${userId}-${courseId}`;
//   let hash = 0;
//   for (let i = 0; i < combined.length; i++) {
//     const char = combined.charCodeAt(i);
//     hash = ((hash << 5) - hash) + char;
//     hash = hash & hash; // Convert to 32-bit integer
//   }
//   return Math.abs(hash).toString(36).substring(0, 8).toUpperCase();
// };

// interface CertificateProps {
//   courseTitle: string;
//   date: string;
//   issuerName?: string;
//   score?: number;
//   certificateId: string;
//   locked?: boolean;
//   onUnlockRequest?: () => void;
// }

// const Certificate: React.FC<CertificateProps> = ({
//   courseTitle,
//   date: propDate,
//   issuerName = "EDUSKILL ONLINE LEARNING",
//   score,
//   certificateId,
//   locked = false,
//   onUnlockRequest
// }) => {
//   const { user } = useUser();
//   const certificateRef = useRef<HTMLDivElement>(null);
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [qrCodeUrl, setQrCodeUrl] = useState<string>('');

//   const currentDate = new Date().toLocaleDateString('en-US', {
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric',
//   });

//   useEffect(() => {
//     if (user) {
//       const qrData = `${window.location.origin}/verify?certificateId=${certificateId}&user=${user.id}&course=${encodeURIComponent(courseTitle)}`;
//       QRCode.toDataURL(qrData, { width: 100, margin: 1 }, (err, url) => {
//         if (err) {
//           console.error('Error generating QR code:', err);
//           return;
//         }
//         setQrCodeUrl(url);
//       });
//     }
//   }, [user, certificateId, courseTitle]);

//   const handleDownloadPDF = async () => {
//     if (!certificateRef.current) return;

//     setIsGenerating(true);
//     try {
//       // Set fixed dimensions for A4 landscape in pixels (at 96dpi, 1mm ≈ 3.78px)
//       const pdfWidth = 297 * 3.78; // A4 width in pixels (landscape)
//       const pdfHeight = 210 * 3.78; // A4 height in pixels (landscape)

//       // Temporarily set the certificate container to match A4 landscape dimensions
//       certificateRef.current.style.width = `${pdfWidth}px`;
//       certificateRef.current.style.height = `${pdfHeight}px`;

//       // Ensure the background is applied
//       certificateRef.current.style.backgroundColor = '#0A1E3C'; // Match the dark blue background

//       const canvas = await html2canvas(certificateRef.current, {
//         scale: 1, // Use scale 1 to match the exact pixel dimensions
//         width: pdfWidth,
//         height: pdfHeight,
//         useCORS: true,
//         logging: false,
//         backgroundColor: '#0A1E3C', // Match the dark blue background
//         removeContainer: true,
//       });

//       const imgData = canvas.toDataURL('image/png', 1.0);
//       const pdf = new jsPDF({
//         orientation: 'landscape',
//         unit: 'mm',
//         format: 'a4',
//       });

//       // Add the image to the PDF, fitting the A4 dimensions
//       pdf.addImage(imgData, 'PNG', 0, 0, 297, 210);
//       pdf.save(`${user?.fullName || 'User'}_${courseTitle.replace(/\s+/g, '_')}_Certificate.pdf`);

//       // Reset the dimensions after generating the PDF
//       certificateRef.current.style.width = '';
//       certificateRef.current.style.height = '';
//     } catch (error) {
//       console.error('Error generating PDF:', error);
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     if (locked) {
//       onUnlockRequest?.();
//     } else {
//       handleDownloadPDF();
//     }
//   };

//   const addToLinkedIn = () => {
//     const linkedInUrl = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${encodeURIComponent(courseTitle)}&organizationName=${encodeURIComponent(issuerName)}&issueYear=${new Date().getFullYear()}&issueMonth=${new Date().getMonth() + 1}&certUrl=${encodeURIComponent(window.location.href)}&certId=${certificateId}`;
//     window.open(linkedInUrl, '_blank');
//   };

//   if (!user) {
//     return <div className={styles.container}>Please sign in to view your certificate.</div>;
//   }

//   return (
//     <div className={styles.container}>
//       <div className={styles.controlsContainer}>
//         {!locked && (
//           <>
//             <div className={styles.buttonWrapper}>
//               <button 
//                 onClick={handleButtonClick} 
//                 className={styles.downloadButton}
//                 disabled={isGenerating}
//               >
//                 {isGenerating ? 'Generating PDF...' : 'Download PDF Certificate'}
//               </button>
//             </div>
//             <div className={styles.buttonWrapper}>
//               <button 
//                 onClick={addToLinkedIn} 
//                 className={styles.linkedinButton}
//               >
//                 <FaLinkedin size={20} />
//                 Share on LinkedIn
//               </button>
//             </div>
//           </>
//         )}
//         {locked && (
//           <>
//             <div className={styles.buttonWrapper}>
//               <button 
//                 onClick={handleButtonClick} 
//                 className={`${styles.downloadButton} ${styles.lockedButton}`}
//               >
//                 Unlock Certificate
//               </button>
//             </div>
//             <p className={styles.lockedMessage}>
//               Complete the quiz with a passing score to unlock your certificate
//             </p>
//           </>
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
//           <div className={styles.headerAlignment}>
//             {/* Shape image remains on the right */}
//             <img 
//               src="/new-shape.png" 
//               alt="Shape"
//               className={styles.shape}
//             />
//             {/* Logo moved to the right with white color via CSS */}
//             <img 
//               src="/eduskill.png" 
//               alt="Logo"
//               className={styles.logoPadding}
//             />
//           </div>

//           <div className={styles.cornerDecorationTopLeft}></div>
//           <div className={styles.cornerDecorationTopRight}></div>
//           <div className={styles.cornerDecorationBottomLeft}></div>
//           <div className={styles.cornerDecorationBottomRight}></div>
          
//           <div className={styles.watermark}>EDUSKILL ONLINE LEARNING</div>
          
//           <div className={styles.certificateHeader}>
//             <h2 className={styles.certificateTitle}>
//               <div>CERTIFICATE OF COMPLETION</div>
//             </h2>
//           </div>

//           <div className={styles.certificateBody}>
//             <p className={styles.presentedTo}>This is to certify that</p>
//             <h3 className={styles.recipientName}>{user.fullName}</h3>
//             <p className={styles.presentedTo}>has successfully completed</p>
//             <div className={styles.courseName}>{courseTitle}</div>
            
//             {score !== undefined && (
//               <div className={styles.scoreContainer}>
//                 <p>Achieving an outstanding score of</p>
//                 <div className={styles.scoreBadge}>{score}%</div>
//               </div>
//             )}

//             <div className={styles.detailsContainer}>
//               <div className={styles.detailBox}>
//                 <p className={styles.detailLabel}>Date of Completion</p>
//                 <p className={styles.detailValue}>{currentDate}</p>
//               </div>
//               <div className={styles.detailBox}>
//                 <p className={styles.detailLabel}>Certificate ID</p>
//                 <p className={styles.detailValue}>{certificateId}</p>
//               </div>
//             </div>
//           </div>

//           <div className={styles.signatureSection}>
//             <div className={styles.signatureBlock}>
//               <div className={styles.signatureLine}></div>
//               <p className={styles.signatureLabel}>Shivani Jobanputra</p>
//             </div>
//             <div className={styles.signatureBlock}>
//               <p className={styles.signatureLabel}>{currentDate}</p>
//               <div className={styles.signatureLine}></div>
//               <p className={styles.signatureLabel}>Date</p>
//             </div>
//           </div>

//           <div className={styles.issuerSection}>
//             <p className={styles.issuerName}>{issuerName}</p>
//             <p className={styles.issuerTagline}>Skill Today, Lead Tomorrow</p>
//           </div>

//           <div className={styles.verification}>
//             {qrCodeUrl ? (
//               <img
//                 src={qrCodeUrl}
//                 alt="QR Code for Certificate Verification"
//                 className={styles.qrCode}
//               />
//             ) : (
//               <p>Generating QR code...</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const GraduationPage: React.FC = () => {
//   const searchParams = useSearchParams();
//   const { user } = useUser();
//   const [courseTitle, setCourseTitle] = useState<string>('Default Course Title');
//   const [certificateId, setCertificateId] = useState<string>('');
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchCourseTitle = async () => {
//       try {
//         const courseId = searchParams.get('courseId');
//         const courseTitleParam = searchParams.get('courseTitle');

//         console.log('Query Params:', {
//           courseId,
//           courseTitleParam,
//           decodedCourseTitle: courseTitleParam ? decodeURIComponent(courseTitleParam) : null,
//         });

//         // Generate certificateId if user and courseId are available
//         if (user?.id && courseId) {
//           const newCertificateId = generateCertificateId(user.id, courseId);
//           setCertificateId(newCertificateId);
//           console.log('Generated certificateId:', newCertificateId);
//         }

//         // Prioritize courseTitle from query params if available
//         if (courseTitleParam) {
//           setCourseTitle(decodeURIComponent(courseTitleParam));
//           console.log('Set courseTitle from query param:', decodeURIComponent(courseTitleParam));
//           setIsLoading(false);
//           return;
//         }

//         if (!user?.id) {
//           console.warn('No user ID available, using default course title.');
//           setCourseTitle('Default Course Title');
//           setIsLoading(false);
//           return;
//         }

//         // Fallback to fetching course directly if courseId is available
//         if (courseId) {
//           try {
//             const courseResponse = await fetch(`/api/courses/${courseId}`);
//             if (courseResponse.ok) {
//               const courseData = await courseResponse.json();
//               if (courseData.title) {
//                 setCourseTitle(courseData.title);
//                 console.log('Set courseTitle from direct API call:', courseData.title);
//                 setIsLoading(false);
//                 return;
//               }
//             }
//             console.warn('Course not found via direct API call for courseId:', courseId);
//           } catch (error) {
//             console.error('Error fetching course directly:', error);
//           }
//         }

//         // Fallback to getCourses
//         const courses = await getCourses({ userId: user.id });

//         console.log('Fetched courses:', courses);

//         if (courseId) {
//           const course = courses.find((c) => c.id === courseId);
//           if (course) {
//             setCourseTitle(course.title);
//             console.log('Set courseTitle from getCourses:', course.title);
//           } else {
//             console.warn('Course not found for courseId:', courseId);
//             setCourseTitle('Default Course Title');
//           }
//         } else {
//           console.warn('No courseId provided in query params.');
//           setCourseTitle('Default Course Title');
//         }
//       } catch (error) {
//         console.error('Error fetching course title:', error);
//         setCourseTitle('Default Course Title');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchCourseTitle();
//   }, [searchParams, user]);

//   if (isLoading || !certificateId) {
//     return <div className={styles.loadingContainer}>Loading certificate...</div>;
//   }

//   return (
//     <Certificate
//       courseTitle={courseTitle}
//       date=""
//       issuerName="EDUSKILL ONLINE LEARNING"
//       certificateId={certificateId}
//       locked={false}
//     />
//   );
// };
  
// export default GraduationPage;







"use client";

import React, { useRef, useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useSearchParams } from 'next/navigation';
import styles from '@/styles/Certificate.module.css';
import { getCourses } from '@/actions/get-courses';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { FaLinkedin } from 'react-icons/fa';
import QRCode from 'qrcode';

// Simple hash function to generate a stable certificate ID
const generateCertificateId = (userId: string, courseId: string): string => {
  const combined = `${userId}-${courseId}`;
  let hash = 0;
  for (let i = 0; i < combined.length; i++) {
    const char = combined.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash).toString(36).substring(0, 8).toUpperCase();
};

interface CertificateProps {
  courseTitle: string;
  date: string;
  issuerName?: string;
  score?: number;
  certificateId: string;
  locked?: boolean;
  onUnlockRequest?: () => void;
}

const Certificate: React.FC<CertificateProps> = ({
  courseTitle,
  date: propDate,
  issuerName = "EDUSKILL ONLINE LEARNING",
  score,
  certificateId,
  locked = false,
  onUnlockRequest
}) => {
  const { user } = useUser();
  const certificateRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');

  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  useEffect(() => {
    if (user) {
      const qrData = `${window.location.origin}/verify?certificateId=${certificateId}&user=${user.id}&course=${encodeURIComponent(courseTitle)}`;
      QRCode.toDataURL(qrData, { width: 100, margin: 1 }, (err, url) => {
        if (err) {
          console.error('Error generating QR code:', err);
          return;
        }
        setQrCodeUrl(url);
      });
    }
  }, [user, certificateId, courseTitle]);

  const handleDownloadPDF = async () => {
    if (!certificateRef.current) return;

    setIsGenerating(true);
    try {
      // Set fixed dimensions for A4 landscape in pixels (at 96dpi, 1mm ≈ 3.78px)
      const pdfWidth = 297 * 3.78; // A4 width in pixels (landscape)
      const pdfHeight = 210 * 3.78; // A4 height in pixels (landscape)

      // Temporarily set the certificate container to match A4 landscape dimensions
      certificateRef.current.style.width = `${pdfWidth}px`;
      certificateRef.current.style.height = `${pdfHeight}px`;

      // Ensure the background is applied
      certificateRef.current.style.backgroundColor = '#0A1E3C'; // Match the dark blue background

      const canvas = await html2canvas(certificateRef.current, {
        scale: 1, // Use scale 1 to match the exact pixel dimensions
        width: pdfWidth,
        height: pdfHeight,
        useCORS: true,
        logging: false,
        backgroundColor: '#0A1E3C', // Match the dark blue background
        removeContainer: true,
      });

      const imgData = canvas.toDataURL('image/png', 1.0);
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4',
      });

      // Add the image to the PDF, fitting the A4 dimensions
      pdf.addImage(imgData, 'PNG', 0, 0, 297, 210);
      pdf.save(`${user?.fullName || 'User'}_${courseTitle.replace(/\s+/g, '_')}_Certificate.pdf`);

      // Reset the dimensions after generating the PDF
      certificateRef.current.style.width = '';
      certificateRef.current.style.height = '';
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (locked) {
      onUnlockRequest?.();
    } else {
      handleDownloadPDF();
    }
  };

  const addToLinkedIn = () => {
    const linkedInUrl = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${encodeURIComponent(courseTitle)}&organizationName=${encodeURIComponent(issuerName)}&issueYear=${new Date().getFullYear()}&issueMonth=${new Date().getMonth() + 1}&certUrl=${encodeURIComponent(window.location.href)}&certId=${certificateId}`;
    window.open(linkedInUrl, '_blank');
  };

  if (!user) {
    return <div className={styles.container}>Please sign in to view your certificate.</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.controlsContainer}>
        {!locked && (
          <>
            <div className={styles.buttonWrapper}>
              <button 
                onClick={handleButtonClick} 
                className={styles.downloadButton}
                disabled={isGenerating}
              >
                {isGenerating ? 'Generating PDF...' : 'Download PDF Certificate'}
              </button>
            </div>
            <div className={styles.buttonWrapper}>
              <button 
                onClick={addToLinkedIn} 
                className={styles.linkedinButton}
              >
                <FaLinkedin size={20} />
                Share on LinkedIn
              </button>
            </div>
          </>
        )}
        {locked && (
          <>
            <div className={styles.buttonWrapper}>
              <button 
                onClick={handleButtonClick} 
                className={`${styles.downloadButton} ${styles.lockedButton}`}
              >
                Unlock Certificate
              </button>
            </div>
            <p className={styles.lockedMessage}>
              Complete the quiz with a passing score to unlock your certificate
            </p>
          </>
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
          <div className={styles.headerAlignment}>
            {/* Shape image remains on the right */}
            {/* <img 
              src="/shape.png" 
              alt="Shape"
              className={styles.shape}
            /> */}
            {/* Logo moved to the right with white color via CSS */}
            <img 
              src="/logo1.png" 
              alt="Logo"
              className={styles.logoPadding}
            />
          </div>

          <div className={styles.cornerDecorationTopLeft}></div>
          <div className={styles.cornerDecorationTopRight}></div>
          <div className={styles.cornerDecorationBottomLeft}></div>
          <div className={styles.cornerDecorationBottomRight}></div>
          
          {/* <div className={styles.watermark}>EDUSKILL ONLINE LEARNING</div> */}
          
          
          <div className={styles.certificateHeader}>
             
            


            <h2 className={styles.certificateTitle}>
              <div>CERTIFICATE OF COMPLETION</div>
            </h2>
          </div>

          <div className={styles.certificateBody}>
            <p className={styles.presentedTo}>This is to certify that</p>
            <h3 className={styles.recipientName}>{user.fullName}</h3>
            <p className={styles.presentedTo}>has successfully completed</p>
            <div className={styles.courseName}>{courseTitle}</div>
            
            {score !== undefined && (
              <div className={styles.scoreContainer}>
                <p>Achieving an outstanding score of</p>
                <div className={styles.scoreBadge}>{score}%</div>
              </div>
            )}

            <div className={styles.detailsContainer}>
              <div className={styles.detailBox}>
                <p className={styles.detailLabel}>Date of Completion</p>
                <p className={styles.detailValue}>{currentDate}</p>
              </div>
              <div className={styles.detailBox}>
                <p className={styles.detailLabel}>Certificate ID</p>
                <p className={styles.detailValue}>{certificateId}</p>
              </div>
            </div>
          </div>

          {/* <div className={styles.signatureSection}>
            <div className={styles.signatureBlock}>
              <div className={styles.signatureLine}></div>
              <p className={styles.signatureLabel}>Shivani Jobanputra</p>
            </div>
            <div className={styles.signatureBlock}>
              <p className={styles.signatureLabel}>{currentDate}</p>
              <div className={styles.signatureLine}></div>
              <p className={styles.signatureLabel}>Date</p>
            </div>
          </div> */}


                    <div className={styles.signatureSection}>
            <div className={styles.signatureBlock}>
              <div className={styles.signatureLine}></div>
              <p className={styles.signatureLabel}>Shivani Jobanputra</p>
            </div>
            <div className={styles.signatureBlock}>
              <p className={styles.signatureLabel}>{currentDate}</p>
              <div className={styles.signatureLine}></div>
               <p className={styles.signatureLabel}>Date</p>
              
            </div>
          </div>

          <div className={styles.issuerSection}>
            <p className={styles.issuerName}>{issuerName}</p>
            <p className={styles.issuerTagline}>Skill Today, Lead Tomorrow</p>
          </div>

          <div className={styles.verification}>
            {qrCodeUrl ? (
              <img
                src={qrCodeUrl}
                alt="QR Code for Certificate Verification"
                className={styles.qrCode}
              />
            ) : (
              <p>Generating QR code...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const GraduationPage: React.FC = () => {
  const searchParams = useSearchParams();
  const { user } = useUser();
  const [courseTitle, setCourseTitle] = useState<string>('Default Course Title');
  const [certificateId, setCertificateId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCourseTitle = async () => {
      try {
        const courseId = searchParams.get('courseId');
        const courseTitleParam = searchParams.get('courseTitle');

        console.log('Query Params:', {
          courseId,
          courseTitleParam,
          decodedCourseTitle: courseTitleParam ? decodeURIComponent(courseTitleParam) : null,
        });

        // Generate certificateId if user and courseId are available
        if (user?.id && courseId) {
          const newCertificateId = generateCertificateId(user.id, courseId);
          setCertificateId(newCertificateId);
          console.log('Generated certificateId:', newCertificateId);
        }

        // Prioritize courseTitle from query params if available
        if (courseTitleParam) {
          setCourseTitle(decodeURIComponent(courseTitleParam));
          console.log('Set courseTitle from query param:', decodeURIComponent(courseTitleParam));
          setIsLoading(false);
          return;
        }

        if (!user?.id) {
          console.warn('No user ID available, using default course title.');
          setCourseTitle('Default Course Title');
          setIsLoading(false);
          return;
        }

        // Fallback to fetching course directly if courseId is available
        if (courseId) {
          try {
            const courseResponse = await fetch(`/api/courses/${courseId}`);
            if (courseResponse.ok) {
              const courseData = await courseResponse.json();
              if (courseData.title) {
                setCourseTitle(courseData.title);
                console.log('Set courseTitle from direct API call:', courseData.title);
                setIsLoading(false);
                return;
              }
            }
            console.warn('Course not found via direct API call for courseId:', courseId);
          } catch (error) {
            console.error('Error fetching course directly:', error);
          }
        }

        // Fallback to getCourses
        const courses = await getCourses({ userId: user.id });

        console.log('Fetched courses:', courses);

        if (courseId) {
          const course = courses.find((c) => c.id === courseId);
          if (course) {
            setCourseTitle(course.title);
            console.log('Set courseTitle from getCourses:', course.title);
          } else {
            console.warn('Course not found for courseId:', courseId);
            setCourseTitle('Default Course Title');
          }
        } else {
          console.warn('No courseId provided in query params.');
          setCourseTitle('Default Course Title');
        }
      } catch (error) {
        console.error('Error fetching course title:', error);
        setCourseTitle('Default Course Title');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourseTitle();
  }, [searchParams, user]);

  if (isLoading || !certificateId) {
    return <div className={styles.loadingContainer}>Loading certificate...</div>;
  }

  return (
    <Certificate
      courseTitle={courseTitle}
      date=""
      issuerName="EDUSKILL ONLINE LEARNING"
      certificateId={certificateId}
      locked={false}
    />
  );
};
  
export default GraduationPage;