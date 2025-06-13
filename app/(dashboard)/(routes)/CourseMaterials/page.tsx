// "use client";
// import React, { useEffect, useState } from 'react';
// import { useRouter, useParams } from 'next/navigation'; // Updated import for Next.js 13+
// import { Card, CardContent } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { motion } from 'framer-motion';
// import axios from 'axios';

// // Define types for recordings and attachments
// interface Recording {
//   id: string;
//   title: string;
//   url: string;
//   duration: number;
// }

// interface Attachment {
//   id: string;
//   name: string;
//   url: string;
// }

// const CourseRecordings = () => {
//   const [recordings, setRecordings] = useState<Recording[]>([]);
//   const [attachments, setAttachments] = useState<Attachment[]>([]);
//   const [hasPurchased, setHasPurchased] = useState(false);

//   const router = useRouter();
//   const params = useParams();
//   const courseId = params?.courseId as string;

//   useEffect(() => {
//     const fetchCourseData = async () => {
//       try {
//         const purchaseRes = await axios.get(`/api/purchases/${courseId}`);
//         setHasPurchased(purchaseRes.data.hasPurchased);

//         if (purchaseRes.data.hasPurchased) {
//           const recordingsRes = await axios.get(`/api/recordings/${courseId}`);
//           const attachmentsRes = await axios.get(`/api/course/${courseId}/attachments`);

//           setRecordings(recordingsRes.data.recordings);
//           setAttachments(attachmentsRes.data.attachments);
//         }
//       } catch (error) {
//         console.error('Failed to fetch course data:', error);
//       }
//     };

//     if (courseId) fetchCourseData();
//   }, [courseId]);

//   if (!hasPurchased) {
//     return (
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         className="flex flex-col items-center justify-center h-screen"
//       >
//         <h2 className="text-3xl font-bold mb-4">Access Denied</h2>
//         <p className="mb-6">You need to purchase this course to access the recordings and materials.</p>
//         <Button
//           className="bg-gold text-white"
//           onClick={() => router.push(`/courses/${courseId}`)}
//         >
//           Purchase Course
//         </Button>
//       </motion.div>
//     );
//   }

//   return (
//     <div className="p-8">
//       <h1 className="text-4xl font-bold mb-6">Course Content</h1>

//       <section className="mb-12">
//         <h2 className="text-2xl font-semibold mb-4">Recordings</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {recordings.map((recording) => (
//             <motion.div
//               key={recording.id}
//               whileHover={{ scale: 1.05 }}
//               className="cursor-pointer"
//             >
//               <Card>
//                 <CardContent>
//                   <h3 className="text-xl font-semibold">{recording.title}</h3>
//                   <p>Duration: {recording.duration} mins</p>
//                   <Button
//                     className="mt-4 bg-gold text-white"
//                     onClick={() => window.open(recording.url, '_blank')}
//                   >
//                     Watch Recording
//                   </Button>
//                 </CardContent>
//               </Card>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       <section>
//         <h2 className="text-2xl font-semibold mb-4">Attachments</h2>
//         <ul className="list-disc pl-5">
//           {attachments.map((attachment) => (
//             <li key={attachment.id} className="mb-3">
//               <a
//                 href={attachment.url}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-blue-500 hover:underline"
//               >
//                 {attachment.name}
//               </a>
//             </li>
//           ))}
//         </ul>
//       </section>
//     </div>
//   );
// };

// export default CourseRecordings;

// Let me know if you want me to refine anything else! 🚀



// "use client";
// import React, { useEffect, useState } from 'react';
// import { useRouter, useParams } from 'next/navigation';
// import { Card, CardContent } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { motion } from 'framer-motion';
// import axios from 'axios';

// interface Recording {
//   id: string;
//   title: string;
//   url: string;
//   duration: number;
// }

// interface Attachment {
//   id: string;
//   name: string;
//   url: string;
// }

// const CourseRecordings = () => {
//   const [recordings, setRecordings] = useState<Recording[]>([]);
//   const [attachments, setAttachments] = useState<Attachment[]>([]);
//   const [hasPurchased, setHasPurchased] = useState(false);

//   const router = useRouter();
//   const params = useParams();
//   const courseId = params?.courseId as string;

//   useEffect(() => {
//     const fetchCourseData = async () => {
//       try {
//         const purchaseRes = await axios.get(`/api/course/${courseId}/purchstatus`);
//         setHasPurchased(purchaseRes.data.hasPurchased);

//         if (purchaseRes.data.hasPurchased) {
//           const recordingsRes = await axios.get(`/api/course/${courseId}/record`);
//           const attachmentsRes = await axios.get(`/api/course/${courseId}/fetchattch`);

//           setRecordings(recordingsRes.data.recordings);
//           setAttachments(attachmentsRes.data.attachments);
//         }
//       } catch (error) {
//         console.error('Failed to fetch course data:', error);
//       }
//     };

//     if (courseId) fetchCourseData();
//   }, [courseId]);

//   if (!hasPurchased) {
//     return (

//       <motion.div
//       initial={{ opacity: 0, y: -50 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: 50 }}
//       transition={{ duration: 0.6, ease: 'easeInOut' }}
//       className="flex flex-col items-center justify-center h-screen bg-cover bg-center relative"
//       style={{
//         backgroundImage: "url('/bbbckgrd.jpg')",
//       }}
//     >
//       <div className="absolute inset-0 bg-black bg-opacity-50"></div>
    
//       <h2 className="text-4xl font-bold mb-4 text-red-500 drop-shadow-lg">
//         Access Denied
//       </h2>
    
//       <motion.p
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.2, duration: 0.5 }}
//         className="mb-6 text-white text-lg z-10"
//       >
//         You need to purchase this course to access the recordings and materials.
//       </motion.p>
    
//       <motion.div
//         initial={{ scale: 0.9 }}
//         animate={{ scale: 1 }}
//         transition={{ duration: 0.3, ease: 'easeOut' }}
//         className="z-10"
//       >
//         <Button
//           className="bg-blue-500 text-white hover:bg-gold-dark px-6 py-3 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
//           onClick={() => router.push(`/search`)}
//         >
//           Purchase Course
//         </Button>
//       </motion.div>
//     </motion.div>
    

//     );
//   }

//   return (
//     <div className="p-8 bg-gray-100 min-h-screen">
//       <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Course Content</h1>

//       <section className="mb-12">
//         <h2 className="text-2xl font-semibold mb-4 text-gray-700">Recordings</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {recordings.map((recording) => (
//             <motion.div
//               key={recording.id}
//               whileHover={{ scale: 1.05 }}
//               className="cursor-pointer bg-white shadow-lg rounded-lg overflow-hidden"
//             >
//               <Card>
//                 <CardContent className="p-6">
//                   <h3 className="text-xl font-semibold text-gray-800">{recording.title}</h3>
//                   <p className="text-gray-600">Duration: {recording.duration} mins</p>
//                   <Button
//                     className="mt-4 bg-gold text-white hover:bg-gold-dark"
//                     onClick={() => window.open(recording.url, '_blank')}
//                   >
//                     Watch Recording
//                   </Button>
//                 </CardContent>
//               </Card>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       <section>
//         <h2 className="text-2xl font-semibold mb-4 text-gray-700">Attachments</h2>
//         <ul className="list-disc pl-5">
//           {attachments.map((attachment) => (
//             <li key={attachment.id} className="mb-3">
//               <a
//                 href={attachment.url}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-blue-500 hover:underline"
//               >
//                 {attachment.name}
//               </a>
//             </li>
//           ))}
//         </ul>
//       </section>
//     </div>
//   );
// };

// export default CourseRecordings;




// "use client";
// import React, { useEffect, useState } from 'react';
// import { useRouter, useParams } from 'next/navigation';
// import { Card, CardContent } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { motion } from 'framer-motion';
// import axios from 'axios';

// interface Recording {
//   id: string;
//   title: string;
//   url: string;
//   duration: number;
// }

// interface Attachment {
//   id: string;
//   name: string;
//   url: string;
// }

// const CourseRecordings = () => {
//   const [recordings, setRecordings] = useState<Recording[]>([]);
//   const [attachments, setAttachments] = useState<Attachment[]>([]);
//   const [hasPurchased, setHasPurchased] = useState(false);

//   const router = useRouter();
//   const params = useParams();
//   const courseId = params?.courseId as string;

//   useEffect(() => {
//     const fetchCourseData = async () => {
//       try {
//         console.log('Fetching purchase status for courseId:', courseId);
//         const purchaseRes = await axios.get(`/api/purchase?courseId=${courseId}`);
//         console.log('Purchase Response:', purchaseRes.data);

//         if (purchaseRes.data.hasPurchased) {
//           setHasPurchased(true);

//           // Fetch course recordings and attachments
//           const recordingsRes = await axios.get(`/api/course/${courseId}/record`);
//           const attachmentsRes = await axios.get(`/api/course/${courseId}/fetchattch`);

//           console.log('Recordings:', recordingsRes.data.recordings);
//           console.log('Attachments:', attachmentsRes.data.attachments);

//           setRecordings(recordingsRes.data.recordings);
//           setAttachments(attachmentsRes.data.attachments);
//         } else {
//           setHasPurchased(false);
//         }
//       } catch (error) {
//         console.error('Failed to fetch course data:', error);
//       }
//     };

//     if (courseId) fetchCourseData();
//   }, [courseId]);

//   console.log('Has Purchased State:', hasPurchased);

//   if (!hasPurchased) {
//     return (
//       <motion.div
//         initial={{ opacity: 0, y: -50 }}
//         animate={{ opacity: 1, y: 0 }}
//         exit={{ opacity: 0, y: 50 }}
//         transition={{ duration: 0.6, ease: 'easeInOut' }}
//         className="flex flex-col items-center justify-center h-screen bg-cover bg-center relative"
//         style={{
//           backgroundImage: "url('/bbbckgrd.jpg')",
//         }}
//       >
//         <div className="absolute inset-0 bg-black bg-opacity-50"></div>

//         <h2 className="text-4xl font-bold mb-4 text-red-500 drop-shadow-lg">
//           Access Denied
//         </h2>

//         <motion.p
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.2, duration: 0.5 }}
//           className="mb-6 text-white text-lg z-10"
//         >
//           You need to purchase this course to access the recordings and materials.
//         </motion.p>

//         <motion.div
//           initial={{ scale: 0.9 }}
//           animate={{ scale: 1 }}
//           transition={{ duration: 0.3, ease: 'easeOut' }}
//           className="z-10"
//         >
//           <Button
//             className="bg-blue-500 text-white hover:bg-gold-dark px-6 py-3 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
//             onClick={() => router.push(`/search`)}
//           >
//             Purchase Course
//           </Button>
//         </motion.div>
//       </motion.div>
//     );
//   }

//   return (
//     <div className="p-8 bg-gray-100 min-h-screen">
//       <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Course Content</h1>

//       <section className="mb-12">
//         <h2 className="text-2xl font-semibold mb-4 text-gray-700">Recordings</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {recordings.map((recording) => (
//             <motion.div
//               key={recording.id}
//               whileHover={{ scale: 1.05 }}
//               className="cursor-pointer bg-white shadow-lg rounded-lg overflow-hidden"
//             >
//               <Card>
//                 <CardContent className="p-6">
//                   <h3 className="text-xl font-semibold text-gray-800">{recording.title}</h3>
//                   <p className="text-gray-600">Duration: {recording.duration} mins</p>
//                   <Button
//                     className="mt-4 bg-gold text-white hover:bg-gold-dark"
//                     onClick={() => window.open(recording.url, '_blank')}
//                   >
//                     Watch Recording
//                   </Button>
//                 </CardContent>
//               </Card>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       <section>
//         <h2 className="text-2xl font-semibold mb-4 text-gray-700">Attachments</h2>
//         <ul className="list-disc pl-5">
//           {attachments.map((attachment) => (
//             <li key={attachment.id} className="mb-3">
//               <a
//                 href={attachment.url}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-blue-500 hover:underline"
//               >
//                 {attachment.name}
//               </a>
//             </li>
//           ))}
//         </ul>
//       </section>
//     </div>
//   );
// };

// export default CourseRecordings;







"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import axios from 'axios';

interface Recording {
  id: string;
  title: string;
  url: string;
  duration: number;
}

interface Attachment {
  id: string;
  name: string;
  url: string;
}

const CourseRecordings = () => {
  const [recordings, setRecordings] = useState<Recording[]>([]);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [showRecordings, setShowRecordings] = useState(false); // State to toggle recordings visibility

  const params = useParams();
  const courseId = params?.courseId as string;

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        // Fetch course recordings
        const recordingsRes = await axios.get(`/api/course/${courseId}/record`);
        console.log('Recordings:', recordingsRes.data.recordings);
        setRecordings(recordingsRes.data.recordings);

        // Fetch course attachments
        const attachmentsRes = await axios.get(`/api/course/${courseId}/fetchattch`);
        console.log('Attachments:', attachmentsRes.data.attachments);
        setAttachments(attachmentsRes.data.attachments);
      } catch (error) {
        console.error('Failed to fetch course data:', error);
      }
    };

    if (courseId) fetchCourseData();
  }, [courseId]);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Course Content</h1>

      {/* Button to toggle recordings visibility */}
      <div className="flex justify-center mb-8">
        <Button
          className="bg-blue-500 text-white hover:bg-gold-dark px-6 py-3 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
          onClick={() => setShowRecordings(!showRecordings)}
        >
          {showRecordings ? "Hide Recordings" : "Open Recordings"}
        </Button>
      </div>

      {/* Recordings Section */}
      {showRecordings && (
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Recordings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recordings.map((recording) => (
              <motion.div
                key={recording.id}
                whileHover={{ scale: 1.05 }}
                className="cursor-pointer bg-white shadow-lg rounded-lg overflow-hidden"
              >
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800">{recording.title}</h3>
                    <p className="text-gray-600">Duration: {recording.duration} mins</p>
                    <Button
                      className="mt-4 bg-gold text-white hover:bg-gold-dark"
                      onClick={() => window.open(recording.url, '_blank')}
                    >
                      Watch Recording
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Attachments Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Attachments</h2>
        <ul className="list-disc pl-5">
          {attachments.map((attachment) => (
            <li key={attachment.id} className="mb-3">
              <a
                href={attachment.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {attachment.name}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default CourseRecordings;














// "use client";
// import React, { useEffect, useState } from 'react';
// import { useRouter, useParams } from 'next/navigation';
// import { Card, CardContent } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { motion } from 'framer-motion';
// import axios from 'axios';

// interface Recording {
//   id: string;
//   title: string;
//   url: string;
//   duration: number;
// }

// interface Attachment {
//   id: string;
//   name: string;
//   url: string;
// }

// const CourseRecordings = () => {
//   const [recordings, setRecordings] = useState<Recording[]>([]);
//   const [attachments, setAttachments] = useState<Attachment[]>([]);
//   const [hasPurchased, setHasPurchased] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);

//   const router = useRouter();
//   const params = useParams();
//   const courseId = params?.courseId as string;

//   useEffect(() => {
//     const fetchCourseData = async () => {
//       try {
//         console.log('Fetching purchase status for courseId:', courseId);
//         const purchaseRes = await axios.get(`/api/purchases?courseId=${courseId}`);
//         console.log('Purchase Response:', purchaseRes.data);
    
//         if (purchaseRes.data.hasPurchased) {
//           setHasPurchased(true);
    
//           // Fetch course recordings and attachments
//           const recordingsRes = await axios.get(`/api/course/${courseId}/record`);
//           const attachmentsRes = await axios.get(`/api/course/${courseId}/fetchattch`);
    
//           console.log('Recordings:', recordingsRes.data.recordings);
//           console.log('Attachments:', attachmentsRes.data.attachments);
    
//           setRecordings(recordingsRes.data.recordings);
//           setAttachments(attachmentsRes.data.attachments);
//         } else {
//           setHasPurchased(false);
//         }
//       } catch (error) {
//         console.error('Failed to fetch course data:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     if (courseId) fetchCourseData();
//   }, [courseId]);

//   console.log('Has Purchased State:', hasPurchased);

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center h-screen bg-gray-100">
//         <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
//       </div>
//     );
//   }

//   if (!hasPurchased) {
//     return (
//       <motion.div
//         initial={{ opacity: 0, y: -50 }}
//         animate={{ opacity: 1, y: 0 }}
//         exit={{ opacity: 0, y: 50 }}
//         transition={{ duration: 0.6, ease: 'easeInOut' }}
//         className="flex flex-col items-center justify-center h-screen bg-cover bg-center relative"
//         style={{
//           backgroundImage: "url('/bbbckgrd.jpg')",
//         }}
//       >
//         <div className="absolute inset-0 bg-black bg-opacity-50"></div>

//         <h2 className="text-4xl font-bold mb-4 text-red-500 drop-shadow-lg">
//           Access Denied
//         </h2>

//         <motion.p
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.2, duration: 0.5 }}
//           className="mb-6 text-white text-lg z-10"
//         >
//           You need to purchase this course to access the recordings and materials.
//         </motion.p>

//         <motion.div
//           initial={{ scale: 0.9 }}
//           animate={{ scale: 1 }}
//           transition={{ duration: 0.3, ease: 'easeOut' }}
//           className="z-10"
//         >
//           <Button
//             className="bg-blue-500 text-white hover:bg-gold-dark px-6 py-3 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
//             onClick={() => router.push(`/search`)}
//           >
//             Purchase Course
//           </Button>
//         </motion.div>
//       </motion.div>
//     );
//   }

//   return (
//     <div className="p-8 bg-gray-100 min-h-screen">
//       <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Course Content</h1>

//       <section className="mb-12">
//         <h2 className="text-2xl font-semibold mb-4 text-gray-700">Recordings</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {recordings.map((recording) => (
//             <motion.div
//               key={recording.id}
//               whileHover={{ scale: 1.05 }}
//               className="cursor-pointer bg-white shadow-lg rounded-lg overflow-hidden"
//             >
//               <Card>
//                 <CardContent className="p-6">
//                   <h3 className="text-xl font-semibold text-gray-800">{recording.title}</h3>
//                   <p className="text-gray-600">Duration: {recording.duration} mins</p>
//                   <Button
//                     className="mt-4 bg-gold text-white hover:bg-gold-dark"
//                     onClick={() => window.open(recording.url, '_blank')}
//                   >
//                     Watch Recording
//                   </Button>
//                 </CardContent>
//               </Card>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       <section>
//         <h2 className="text-2xl font-semibold mb-4 text-gray-700">Attachments</h2>
//         <ul className="list-disc pl-5">
//           {attachments.map((attachment) => (
//             <li key={attachment.id} className="mb-3">
//               <a
//                 href={attachment.url}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-blue-500 hover:underline"
//               >
//                 {attachment.name}
//               </a>
//             </li>
//           ))}
//         </ul>
//       </section>
//     </div>
//   );
// };

// export default CourseRecordings;

  
//  ;