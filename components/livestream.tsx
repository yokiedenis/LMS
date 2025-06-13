 
// "use client";

// import React, { useState, useEffect, useCallback } from "react";
// import axios, { AxiosError } from "axios";
// import { File, Link as LinkIcon, Check } from "lucide-react";
// import Link from "next/link";
// import { Recording, Attachment } from "@prisma/client";
// import { useAuth } from "@clerk/nextjs";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// interface LivestreamProps {
//   courseId: string;
// }

// const carouselSettings = {
//   dots: true,
//   infinite: true,
//   speed: 500,
//   slidesToShow: 5,
//   slidesToScroll: 1,
//   autoplay: true,
//   autoplaySpeed: 5000,
//   responsive: [
//     {
//       breakpoint: 1024,
//       settings: {
//         slidesToShow: 3,
//         slidesToScroll: 1,
//       },
//     },
//     {
//       breakpoint: 640,
//       settings: {
//         slidesToShow: 2,
//         slidesToScroll: 1,
//       },
//     },
//     {
//       breakpoint: 480,
//       settings: {
//         slidesToShow: 1,
//         slidesToScroll: 1,
//       },
//     },
//   ],
// };

// export default function Livestream({ courseId }: LivestreamProps) {
//   const { userId, getToken } = useAuth();
//   const [projectFile, setProjectFile] = useState<File | null>(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submissionStatus, setSubmissionStatus] = useState<string | null>(null);
//   const [hasPurchased, setHasPurchased] = useState(false);



//   const [recordings, setRecordings] = useState<Recording[]>([]);
//   const [courseAttachments, setCourseAttachments] = useState<Attachment[]>([]);
//   const [chapterAttachments, setChapterAttachments] = useState<Attachment[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [recordingsExpanded, setRecordingsExpanded] = useState(false);



//     // Fetch Recordings
//     const fetchRecordings = useCallback(async () => {
//       try {
//         console.log("Fetching recordings...");
//         const response = await axios.get(`/api/recordings`);
//         console.log("Recordings received:", response.data);
//         setRecordings(response.data || []);
//       } catch (error) {
//         console.error("Error fetching recordings:", error);
//       }
//     }, []);


//       // Fetch Attachments (Reference Materials)
//   const fetchAttachments = useCallback(async () => {
//     try {
//       console.log("Fetching attachments...");
//       const response = await axios.get(`/api/attachments`);
//       console.log("Attachments received:", response.data);

//       // Ensure attachments are categorized properly
//       setCourseAttachments(response.data.courseAttachments || []);
//       setChapterAttachments(response.data.chapterAttachments || []);
//     } catch (error) {
//       console.error("Error fetching attachments:", error);
//     }
//   }, []);


//       // Fetch all data on component mount
//   useEffect(() => {
//     async function fetchData() {
//       await fetchRecordings();
//       await fetchAttachments();
//       setIsLoading(false);
//     }
//     fetchData();
//   }, [fetchRecordings, fetchAttachments]);
  


//   const fetchPurchaseStatus = useCallback(async () => {
//     if (!userId || !courseId) return false;
//     try {
//       const token = await getToken();
//       const response = await axios.get(`/api/purchases/status?userId=${userId}&courseId=${courseId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       console.log("Purchase Status Response:", response.data);
//       return response.data.hasPurchased === true;
//     } catch (error) {
//       console.error("Error fetching purchase status:", error);
//       return false;
//     }
//   }, [userId, courseId, getToken]);

//   const toggleExpandAll = () => {
//     setIsExpanded(!isExpanded);
//     setRecordingsExpanded(!recordingsExpanded);
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files.length > 0) {
//       setProjectFile(e.target.files[0]);
//       setSubmissionStatus(null);
//     }
//   };

//   const handleSubmitProject = async () => {
//     console.log("Submitting project - userId:", userId, "courseId:", courseId, "file:", projectFile?.name);
//     if (!projectFile) {
//       setSubmissionStatus("Please select a file to upload.");
//       return;
//     }
//     if (!userId) {
//       setSubmissionStatus("Authentication error: Please log in again.");
//       return;
//     }
//     if (!courseId) {
//       setSubmissionStatus("Course information missing: Please reload the page.");
//       return;
//     }

//     setIsSubmitting(true);
//     setSubmissionStatus(null);

//     try {
//       const token = await getToken();
//       const formData = new FormData();
//       formData.append("file", projectFile);
//       formData.append("userId", userId);
//       formData.append("courseId", courseId);

//       console.log("Sending file to /api/projects/upload:", projectFile.name);
//       const response = await axios.post("/api/projects/upload", formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       console.log("API Response:", response.data);
//       if (response.status === 201) {
//         setSubmissionStatus("Done");
//         setProjectFile(null);
//       } else {
//         setSubmissionStatus("Failed to submit project. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error submitting project:", error);
//       if (error instanceof AxiosError && error.response) {
//         setSubmissionStatus(error.response.data.error || "Failed to submit project. Please try again.");
//       } else {
//         setSubmissionStatus("Failed to submit project. Please try again.");
//       }
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const googleClassroomUrl = "https://classroom.google.com/c/your-classroom-code";

//   const getDynamicProjectDetails = () => {
//     const now = new Date();
//     const opened = new Date(now);
//     const due = new Date(now);
//     due.setDate(now.getDate() + 4);
//     due.setHours(20, 0, 0, 0);
//     const formatDate = (date: Date) =>
//       date.toLocaleString("en-US", {
//         weekday: "long",
//         day: "numeric",
//         month: "long",
//         year: "numeric",
//         hour: "numeric",
//         minute: "numeric",
//         hour12: true,
//       });
//     return {
//       title: "Project Submission",
//       opened: formatDate(opened),
//       due: formatDate(due),
//     };
//   };

//   const projectDetails = getDynamicProjectDetails();

//   if (!userId) {
//     return <div className="text-center text-white p-8">Please log in to view this content.</div>;
//   }

//   return (
//     <div className="min-h-screen w-full bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900 text-white overflow-y-auto p-4 sm:p-6 md:p-8">
//       <div className="w-full">
//         {isLoading ? (
//           <div className="text-center text-xl sm:text-2xl">Loading...</div>
//         ) : (
//           <>
//             <div className="mb-6 w-full bg-gray-800 rounded-2xl p-4 sm:p-6">
//               <h2 className="text-lg sm:text-xl font-bold mb-4 text-center">Upcoming Classes</h2>
//               <div className="relative">
//                 <Slider {...carouselSettings}>
//                   <div className="p-2">
//                     <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300 h-full flex flex-col">
//                       <img src="/Ai.webp" alt="Paper Portfolio" className="w-full h-40 object-cover" />
//                       <div className="p-4 text-center flex-grow">
//                         <p className="text-lg font-semibold" style={{ color: "#0A2540" }}>
//                           Mastering AI with Python and Data science
//                         </p>
//                         <p className="text-sm text-gray-600">Deep Learning / MACHINE LEARNING</p>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="p-2">
//                     <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300 h-full flex flex-col">
//                       <img src="/blockchain.webp" alt="Perfect Section Structure" className="w-full h-40 object-cover" />
//                       <div className="p-4 text-center flex-grow">
//                         <p className="text-lg font-semibold" style={{ color: "#0A2540" }}>
//                           Web 3.0 and Blockchain Development
//                         </p>
//                         <p className="text-sm text-gray-600">Crypto / DECENTRALIZED APPS</p>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="p-2">
//                     <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300 h-full flex flex-col">
//                       <img src="/cyber.webp" alt="Building the Desigflow Community" className="w-full h-40 object-cover" />
//                       <div className="p-4 text-center flex-grow">
//                         <p className="text-lg font-semibold" style={{ color: "#0A2540" }}>
//                           Cybersecurity and Ethical Hacking and Penetration
//                         </p>
//                         <p className="text-sm text-gray-600">Network Security / PENETRATION TESTING</p>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="p-2">
//                     <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300 h-full flex flex-col">
//                       <img src="/cloud.jpg" alt="Build an Animated App" className="w-full h-40 object-cover" />
//                       <div className="p-4 text-center flex-grow">
//                         <p className="text-lg font-semibold" style={{ color: "#0A2540" }}>
//                           Cloud Computing with AWS and Azure
//                         </p>
//                         <p className="text-sm text-gray-600">DevOps / CLOUD INFRASTRUCTURE</p>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="p-2">
//                     <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300 h-full flex flex-col">
//                       <img src="/data.jpg" alt="Learn design & code" className="w-full h-40 object-cover" />
//                       <div className="p-4 text-center flex-grow">
//                         <p className="text-lg font-semibold" style={{ color: "#0A2540" }}>
//                           Data Analytics with Python and Power BI
//                         </p>
//                         <p className="text-sm text-gray-600">Data Science / BUSINESS INTELLIGENCE</p>
//                       </div>
//                     </div>
//                   </div>
//                 </Slider>
//               </div>
//             </div>

//             <button
//               onClick={toggleExpandAll}
//               className="w-full max-w-xs p-2 sm:p-3 mb-6 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold text-xs sm:text-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out flex items-center justify-start transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300"
//             >
//               {isExpanded ? "Collapse All" : "Expand All"}
//             </button>

//             <details
//               open={isExpanded}
//               className="p-3 sm:p-4 bg-gray-800 rounded-2xl cursor-pointer transition-all duration-300 ease-in-out w-full mb-4 sm:mb-6"
//             >
//               <summary className="flex justify-between items-start mb-4 text-base sm:text-lg font-bold pl-4">
//                 Live Classes (Google Classroom)
//               </summary>
//               <div className="pl-4 text-gray-300 text-sm sm:text-base">
//                 <p className="text-gray-400 mb-4">
//                   Join our live classes on Google Classroom for real-time learning and interaction.
//                 </p>
//                 <Link
//                   href={googleClassroomUrl}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="inline-flex items-center p-3 sm:p-4 bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 text-blue-400 hover:text-blue-300 text-sm sm:text-base"
//                 >
//                   <LinkIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-blue-300 group-hover:text-blue-500 transition-colors" />
//                   <span className="font-semibold">Join Live Classes</span>
//                 </Link>
//               </div>
//             </details>


//              {/* Reference Materials Section */}
//              <details
//               open={isExpanded}
//               className="p-3 sm:p-4 bg-gray-800 rounded-2xl cursor-pointer transition-all duration-300 ease-in-out w-full mb-4 sm:mb-6"
//             >
//               <summary className="flex justify-between items-start mb-4 text-base sm:text-lg font-bold pl-4">
//                 Reference Materials
//               </summary>
//               <ul className="pl-4 space-y-2 text-gray-300 text-sm sm:text-base">
//                 {courseAttachments.length > 0 || chapterAttachments.length > 0 ? (
//                   <>
//                     {/* Course Attachments */}
//                     {courseAttachments.map((item) => (
//                       <li key={item.id}>
//                         {item.url ? (
//                           <a
//                             href={item.url}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="flex items-start p-2 sm:p-3 w-full bg-sky-200 dark:bg-sky-800 text-sky-700 dark:text-sky-300 hover:underline rounded-lg"
//                           >
//                             <File className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
//                             <span className="line-clamp-1">{item.name}</span>
//                           </a>
//                         ) : (
//                           <span className="flex items-start">
//                             <File className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
//                             {item.name}
//                           </span>
//                         )}
//                       </li>
//                     ))}

//                     {/* Chapter Attachments */}
//                     {chapterAttachments.map((item) => (
//                       <li key={item.id}>
//                         {item.url ? (
//                           <a
//                             href={item.url}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="flex items-start p-2 sm:p-3 w-full bg-green-200 dark:bg-green-800 text-green-700 dark:text-green-300 hover:underline rounded-lg"
//                           >
//                             <File className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
//                             <span className="line-clamp-1">{item.name}</span>
//                           </a>
//                         ) : (
//                           <span className="flex items-start">
//                             <File className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
//                             {item.name}
//                           </span>
//                         )}
//                       </li>
//                     ))}
//                   </>
//                 ) : (
//                   <li className="text-gray-500 italic pl-4">No attachments available</li>
//                 )}
//               </ul>
//             </details>




//             {/* Recordings Section */}
//             <details
//               open={recordingsExpanded}
//               className="p-3 sm:p-4 bg-gray-800 rounded-2xl cursor-pointer transition-all duration-300 ease-in-out w-full mb-4 sm:mb-6"
//             >
//               <summary
//                 onClick={() => setRecordingsExpanded(!recordingsExpanded)}
//                 className="flex justify-between items-start mb-4 text-base sm:text-lg font-bold cursor-pointer pl-4"
//               >
//                 Recordings
//               </summary>
//               <ul className="pl-4 space-y-3 sm:space-y-4 text-gray-300 text-sm sm:text-base">
//                 {recordings.length > 0 ? (
//                   recordings.map((recording) => (
//                     <li key={recording.id}>
//                       <div className="p-3 sm:p-4 bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
//                         <h4 className="font-semibold text-base sm:text-lg text-indigo-400 pl-4">
//                           {recording.title}
//                         </h4>
//                         <p className="text-blue-400 hover:text-blue-300 mt-2 pl-4">
//                           <Link
//                             href={recording.url}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="flex items-start group"
//                           >
//                             <LinkIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-blue-300 group-hover:text-blue-500 transition-colors" />
//                             <span className="underline decoration-dotted decoration-1 underline-offset-4">
//                               {recording.url}
//                             </span>
//                           </Link>
//                         </p>
//                         {recording.duration && (
//                           <p className="text-gray-400 mt-1 pl-4">
//                             Duration: {recording.duration} minutes
//                           </p>
//                         )}
//                         <p className="text-gray-500 text-xs sm:text-sm mt-1 pl-4">
//                           Uploaded:{" "}
//                           {new Date(recording.uploadedAt).toLocaleDateString()}
//                         </p>
//                       </div>
//                     </li>
//                   ))
//                 ) : (
//                   <li className="text-gray-500 italic pl-4">No recordings available</li>
//                 )}
//               </ul>
//             </details>









//             <details
//               open={isExpanded}
//               className="p-3 sm:p-4 bg-gray-800 rounded-2xl cursor-pointer transition-all duration-300 ease-in-out w-full"
//             >
//               <summary className="flex justify-between items-start mb-4 text-base sm:text-lg font-bold pl-4">
//                 Project
//               </summary>
//               <div className="pl-4 text-gray-300 text-sm sm:text-base">
//                 <div className="flex items-start mb-2">
//                   <File className="h-6 w-6 sm:h-8 sm:w-8 text-pink-400 mr-2" />
//                   <div>
//                     <p className="text-gray-400 text-xs sm:text-sm">Assignment</p>
//                     <h3 className="font-semibold text-base sm:text-lg">{projectDetails.title}</h3>
//                   </div>
//                 </div>
//                 <div className="bg-white text-black p-3 sm:p-4 rounded-lg border border-gray-300 mb-4">
//                   <p className="text-sm sm:text-base">Opened: {projectDetails.opened}</p>
//                   <p className="text-sm sm:text-base">Due: {projectDetails.due}</p>
//                 </div>
//                 <input
//                   type="file"
//                   onChange={handleFileChange}
//                   className="block w-full text-sm sm:text-base text-gray-300 bg-gray-700 rounded-lg border border-gray-600 p-2 sm:p-3 mb-4"
//                   accept=".pdf,.doc,.docx,.jpg,.png"
//                 />
//                 {isSubmitting ? (
//                   <p className="text-yellow-400">Submitting...</p>
//                 ) : submissionStatus === "Done" ? (
//                   <button
//                     disabled
//                     className="flex items-center mt-4 px-4 py-2 sm:px-5 sm:py-3 bg-green-600 rounded-lg text-white text-sm sm:text-base font-semibold opacity-100 cursor-default"
//                   >
//                     <Check className="h-5 w-5 sm:h-6 sm:w-6 mr-2" />
//                     Done
//                   </button>
//                 ) : submissionStatus ? (
//                   <p className="text-red-400 text-sm sm:text-base">{submissionStatus}</p>
//                 ) : null}
//                 <button
//                   onClick={handleSubmitProject}
//                   disabled={isSubmitting || !projectFile}
//                   className={`mt-4 px-4 py-2 sm:px-5 sm:py-3 bg-green-600 hover:bg-green-700 rounded-lg text-white text-sm sm:text-base font-semibold transition duration-300 ${
//                     isSubmitting || !projectFile ? "opacity-50 cursor-not-allowed" : ""
//                   }`}
//                 >
//                   {isSubmitting ? "Submitting..." : "Submit"}
//                 </button>
//               </div>
//             </details>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }







// "use client";

// import React, { useState, useEffect, useCallback } from "react";
// import axios, { AxiosError } from "axios";
// import { File, Link as LinkIcon, Check } from "lucide-react";
// import Link from "next/link";
// import { Recording, Attachment } from "@prisma/client";
// import { useAuth } from "@clerk/nextjs";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// interface LivestreamProps {
//   courseId: string;
// }

// const carouselSettings = {
//   dots: true,
//   infinite: true,
//   speed: 500,
//   slidesToShow: 5,
//   slidesToScroll: 1,
//   autoplay: true,
//   autoplaySpeed: 5000,
//   responsive: [
//     {
//       breakpoint: 1024,
//       settings: {
//         slidesToShow: 3,
//         slidesToScroll: 1,
//       },
//     },
//     {
//       breakpoint: 640,
//       settings: {
//         slidesToShow: 2,
//         slidesToScroll: 1,
//       },
//     },
//     {
//       breakpoint: 480,
//       settings: {
//         slidesToShow: 1,
//         slidesToScroll: 1,
//       },
//     },
//   ],
// };

// export default function Livestream({ courseId }: LivestreamProps) {
//   const { userId, getToken, isLoaded } = useAuth(); // Added isLoaded to check auth status
//   const [projectFile, setProjectFile] = useState<File | null>(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submissionStatus, setSubmissionStatus] = useState<string | null>(null);
//   const [hasPurchased, setHasPurchased] = useState(false);
//   const [recordings, setRecordings] = useState<Recording[]>([]);
//   const [courseAttachments, setCourseAttachments] = useState<Attachment[]>([]);
//   const [chapterAttachments, setChapterAttachments] = useState<Attachment[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [recordingsExpanded, setRecordingsExpanded] = useState(false);
//   const [debugInfo, setDebugInfo] = useState<string[]>([]);


  

//   // Fetch Purchase Status
//   const fetchPurchaseStatus = useCallback(async () => {
//     if (!userId || !courseId) {
//       setDebugInfo(prev => [
//         ...prev,
//         `Missing: ${!userId ? "userId" : ""}${!userId && !courseId ? " and " : ""}${!courseId ? "courseId" : ""}`,
//         `userId: ${userId}, courseId: ${courseId}`,
//       ]);
//       setHasPurchased(false);
//       return false;
//     }
//     try {
//       const token = await getToken();
//       setDebugInfo(prev => [...prev, `Fetching purchase status for user ${userId}, course ${courseId}`]);
//       const response = await axios.get(`/api/purchases/status?userId=${userId}&courseId=${courseId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setDebugInfo(prev => [...prev, `Purchase status response: ${JSON.stringify(response.data)}`]);
//       return response.data.hasPurchased === true;
//     } catch (error) {
//       const err = error as Error;
//       console.error("Error fetching purchase status:", err);
//       setDebugInfo(prev => [...prev, `Purchase status fetch error: ${err.message}`]);
//       return false;
//     }
//   }, [userId, courseId, getToken]);

//   // Fetch Recordings
//   const fetchRecordings = useCallback(async () => {
//     try {
//       setDebugInfo(prev => [...prev, "Fetching recordings..."]);
//       const response = await axios.get(`/api/recordings?courseId=${courseId}`);
//       setDebugInfo(prev => [...prev, `Recordings received: ${JSON.stringify(response.data)}`]);
//       setRecordings(response.data || []);
//     } catch (error) {
//       const err = error as Error;
//       console.error("Error fetching recordings:", err);
//       setDebugInfo(prev => [...prev, `Recordings fetch error: ${err.message}`]);
//       setRecordings([]);
//     }
//   }, [courseId]);

//   // Fetch Attachments
//   const fetchAttachments = useCallback(async () => {
//     try {
//       setDebugInfo(prev => [...prev, "Fetching attachments..."]);
//       const response = await axios.get(`/api/attachments?courseId=${courseId}`);
//       setDebugInfo(prev => [...prev, `Attachments received: ${JSON.stringify(response.data)}`]);
//       setCourseAttachments(response.data.courseAttachments || []);
//       setChapterAttachments(response.data.chapterAttachments || []);
//     } catch (error) {
//       const err = error as Error;
//       console.error("Error fetching attachments:", err);
//       setDebugInfo(prev => [...prev, `Attachments fetch error: ${err.message}`]);
//       setCourseAttachments([]);
//       setChapterAttachments([]);
//     }
//   }, [courseId]);

//   // Fetch all data on component mount
//   useEffect(() => {
//     async function fetchData() {
//       setIsLoading(true);
//       setDebugInfo(prev => [...prev, "Starting data fetch..."]);
      
//       // Wait for Clerk auth to load
//       if (!isLoaded) {
//         setDebugInfo(prev => [...prev, "Waiting for authentication to load..."]);
//         return;
//       }

//       if (!userId || !courseId) {
//         setDebugInfo(prev => [
//           ...prev,
//           `Cannot fetch: userId: ${userId}, courseId: ${courseId}`,
//         ]);
//         setIsLoading(false);
//         return;
//       }

//       const purchased = await fetchPurchaseStatus();
//       setHasPurchased(purchased);
//       setDebugInfo(prev => [...prev, `Has purchased: ${purchased}`]);
      
//       if (purchased) {
//         await Promise.all([fetchRecordings(), fetchAttachments()]);
//       }
      
//       setIsLoading(false);
//       setDebugInfo(prev => [...prev, "Data fetch complete"]);
//     }
//     fetchData();
//   }, [fetchPurchaseStatus, fetchRecordings, fetchAttachments, isLoaded, userId, courseId]);

//   const toggleExpandAll = () => {
//     setIsExpanded(!isExpanded);
//     setRecordingsExpanded(!recordingsExpanded);
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files.length > 0) {
//       setProjectFile(e.target.files[0]);
//       setSubmissionStatus(null);
//     }
//   };

//   const handleSubmitProject = async () => {
//     console.log("Submitting project - userId:", userId, "courseId:", courseId, "file:", projectFile?.name);
//     if (!projectFile) {
//       setSubmissionStatus("Please select a file to upload.");
//       return;
//     }
//     if (!userId) {
//       setSubmissionStatus("Authentication error: Please log in again.");
//       return;
//     }
//     if (!courseId) {
//       setSubmissionStatus("Course information missing: Please reload the page.");
//       return;
//     }

//     setIsSubmitting(true);
//     setSubmissionStatus(null);

//     try {
//       const token = await getToken();
//       const formData = new FormData();
//       formData.append("file", projectFile);
//       formData.append("userId", userId);
//       formData.append("courseId", courseId);

//       console.log("Sending file to /api/projects/upload:", projectFile.name);
//       const response = await axios.post("/api/projects/upload", formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       console.log("API Response:", response.data);
//       if (response.status === 201) {
//         setSubmissionStatus("Done");
//         setProjectFile(null);
//       } else {
//         setSubmissionStatus("Failed to submit project. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error submitting project:", error);
//       if (error instanceof AxiosError && error.response) {
//         setSubmissionStatus(error.response.data.error || "Failed to submit project. Please try again.");
//       } else {
//         setSubmissionStatus("Failed to submit project. Please try again.");
//       }
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const googleClassroomUrl = "https://classroom.google.com/c/your-classroom-code";

//   const getDynamicProjectDetails = () => {
//     const now = new Date();
//     const opened = new Date(now);
//     const due = new Date(now);
//     due.setDate(now.getDate() + 4);
//     due.setHours(20, 0, 0, 0);
//     const formatDate = (date: Date) =>
//       date.toLocaleString("en-US", {
//         weekday: "long",
//         day: "numeric",
//         month: "long",
//         year: "numeric",
//         hour: "numeric",
//         minute: "numeric",
//         hour12: true,
//       });
//     return {
//       title: "Project Submission",
//       opened: formatDate(opened),
//       due: formatDate(due),
//     };
//   };

//   const projectDetails = getDynamicProjectDetails();

//   if (!isLoaded) {
//     return <div className="text-center text-white p-8">Loading authentication...</div>;
//   }

//   if (!userId) {
//     return <div className="text-center text-white p-8">Please log in to view this content.</div>;
//   }

//   return (
//     <div className="min-h-screen w-full bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900 text-white overflow-y-auto p-4 sm:p-6 md:p-8">
//       <div className="w-full">
//         {isLoading ? (
//           <div className="text-center text-xl sm:text-2xl">Loading...</div>
//         ) : (
//           <>
//             {/* Debug Information */}
//             <div className="mb-4 p-4 bg-gray-800 rounded-2xl">
//               <h3 className="text-lg font-bold">Debug Info</h3>
//               {debugInfo.map((info, index) => (
//                 <p key={index} className="text-sm text-gray-400">{info}</p>
//               ))}
//             </div>

//             <div className="mb-6 w-full bg-gray-800 rounded-2xl p-4 sm:p-6">
//               <h2 className="text-lg sm:text-xl font-bold mb-4 text-center">Upcoming Classes</h2>
//               <div className="relative">
//                 <Slider {...carouselSettings}>
//                   <div className="p-2">
//                     <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300 h-full flex flex-col">
//                       <img src="/Ai.webp" alt="Paper Portfolio" className="w-full h-40 object-cover" />
//                       <div className="p-4 text-center flex-grow">
//                         <p className="text-lg font-semibold" style={{ color: "#0A2540" }}>
//                           Mastering AI with Python and Data science
//                         </p>
//                         <p className="text-sm text-gray-600">Deep Learning / MACHINE LEARNING</p>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="p-2">
//                     <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300 h-full flex flex-col">
//                       <img src="/blockchain.webp" alt="Perfect Section Structure" className="w-full h-40 object-cover" />
//                       <div className="p-4 text-center flex-grow">
//                         <p className="text-lg font-semibold" style={{ color: "#0A2540" }}>
//                           Web 3.0 and Blockchain Development
//                         </p>
//                         <p className="text-sm text-gray-600">Crypto / DECENTRALIZED APPS</p>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="p-2">
//                     <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300 h-full flex flex-col">
//                       <img src="/cyber.webp" alt="Building the Desigflow Community" className="w-full h-40 object-cover" />
//                       <div className="p-4 text-center flex-grow">
//                         <p className="text-lg font-semibold" style={{ color: "#0A2540" }}>
//                           Cybersecurity and Ethical Hacking and Penetration
//                         </p>
//                         <p className="text-sm text-gray-600">Network Security / PENETRATION TESTING</p>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="p-2">
//                     <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300 h-full flex flex-col">
//                       <img src="/cloud.jpg" alt="Build an Animated App" className="w-full h-40 object-cover" />
//                       <div className="p-4 text-center flex-grow">
//                         <p className="text-lg font-semibold" style={{ color: "#0A2540" }}>
//                           Cloud Computing with AWS and Azure
//                         </p>
//                         <p className="text-sm text-gray-600">DevOps / CLOUD INFRASTRUCTURE</p>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="p-2">
//                     <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300 h-full flex flex-col">
//                       <img src="/data.jpg" alt="Learn design & code" className="w-full h-40 object-cover" />
//                       <div className="p-4 text-center flex-grow">
//                         <p className="text-lg font-semibold" style={{ color: "#0A2540" }}>
//                           Data Analytics with Python and Power BI
//                         </p>
//                         <p className="text-sm text-gray-600">Data Science / BUSINESS INTELLIGENCE</p>
//                       </div>
//                     </div>
//                   </div>
//                 </Slider>
//               </div>
//             </div>

//             <button
//               onClick={toggleExpandAll}
//               className="w-full max-w-xs p-2 sm:p-3 mb-6 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold text-xs sm:text-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out flex items-center justify-start transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300"
//             >
//               {isExpanded ? "Collapse All" : "Expand All"}
//             </button>

//             <details
//               open={isExpanded}
//               className="p-3 sm:p-4 bg-gray-800 rounded-2xl cursor-pointer transition-all duration-300 ease-in-out w-full mb-4 sm:mb-6"
//             >
//               <summary className="flex justify-between items-start mb-4 text-base sm:text-lg font-bold pl-4">
//                 Live Classes (Google Classroom)
//               </summary>
//               <div className="pl-4 text-gray-300 text-sm sm:text-base">
//                 <p className="text-gray-400 mb-4">
//                   Join our live classes on Google Classroom for real-time learning and interaction.
//                 </p>
//                 <Link
//                   href={googleClassroomUrl}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="inline-flex items-center p-3 sm:p-4 bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 text-blue-400 hover:text-blue-300 text-sm sm:text-base"
//                 >
//                   <LinkIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-blue-300 group-hover:text-blue-500 transition-colors" />
//                   <span className="font-semibold">Join Live Classes</span>
//                 </Link>
//               </div>
//             </details>

//             {hasPurchased ? (
//               <>
//                 {/* Reference Materials Section */}
//                 <details
//                   open={isExpanded}
//                   className="p-3 sm:p-4 bg-gray-800 rounded-2xl cursor-pointer transition-all duration-300 ease-in-out w-full mb-4 sm:mb-6"
//                 >
//                   <summary className="flex justify-between items-start mb-4 text-base sm:text-lg font-bold pl-4">
//                     Reference Materials
//                   </summary>
//                   <ul className="pl-4 space-y-2 text-gray-300 text-sm sm:text-base">
//                     {courseAttachments.length > 0 || chapterAttachments.length > 0 ? (
//                       <>
//                         {courseAttachments.map((item) => (
//                           <li key={item.id}>
//                             {item.url ? (
//                               <a
//                                 href={item.url}
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 className="flex items-start p-2 sm:p-3 w-full bg-sky-200 dark:bg-sky-800 text-sky-700 dark:text-sky-300 hover:underline rounded-lg"
//                               >
//                                 <File className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
//                                 <span className="line-clamp-1">{item.name}</span>
//                               </a>
//                             ) : (
//                               <span className="flex items-start">
//                                 <File className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
//                                 {item.name}
//                               </span>
//                             )}
//                           </li>
//                         ))}
//                         {chapterAttachments.map((item) => (
//                           <li key={item.id}>
//                             {item.url ? (
//                               <a
//                                 href={item.url}
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 className="flex items-start p-2 sm:p-3 w-full bg-green-200 dark:bg-green-800 text-green-700 dark:text-green-300 hover:underline rounded-lg"
//                               >
//                                 <File className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
//                                 <span className="line-clamp-1">{item.name}</span>
//                               </a>
//                             ) : (
//                               <span className="flex items-start">
//                                 <File className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
//                                 {item.name}
//                               </span>
//                             )}
//                           </li>
//                         ))}
//                       </>
//                     ) : (
//                       <li className="text-gray-500 italic pl-4">No attachments available</li>
//                     )}
//                   </ul>
//                 </details>

//                 {/* Recordings Section */}
//                 <details
//                   open={recordingsExpanded}
//                   className="p-3 sm:p-4 bg-gray-800 rounded-2xl cursor-pointer transition-all duration-300 ease-in-out w-full mb-4 sm:mb-6"
//                 >
//                   <summary
//                     onClick={() => setRecordingsExpanded(!recordingsExpanded)}
//                     className="flex justify-between items-start mb-4 text-base sm:text-lg font-bold cursor-pointer pl-4"
//                   >
//                     Recordings
//                   </summary>
//                   <ul className="pl-4 space-y-3 sm:space-y-4 text-gray-300 text-sm sm:text-base">
//                     {recordings.length > 0 ? (
//                       recordings.map((recording) => (
//                         <li key={recording.id}>
//                           <div className="p-3 sm:p-4 bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
//                             <h4 className="font-semibold text-base sm:text-lg text-indigo-400 pl-4">
//                               {recording.title}
//                             </h4>
//                             <p className="text-blue-400 hover:text-blue-300 mt-2 pl-4">
//                               <Link
//                                 href={recording.url}
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 className="flex items-start group"
//                               >
//                                 <LinkIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-blue-300 group-hover:text-blue-500 transition-colors" />
//                                 <span className="underline decoration-dotted decoration-1 underline-offset-4">
//                                   {recording.url}
//                                 </span>
//                               </Link>
//                             </p>
//                             {recording.duration && (
//                               <p className="text-gray-400 mt-1 pl-4">
//                                 Duration: {recording.duration} minutes
//                               </p>
//                             )}
//                             <p className="text-gray-500 text-xs sm:text-sm mt-1 pl-4">
//                               Uploaded: {new Date(recording.uploadedAt).toLocaleDateString()}
//                             </p>
//                           </div>
//                         </li>
//                       ))
//                     ) : (
//                       <li className="text-gray-500 italic pl-4">No recordings available</li>
//                     )}
//                   </ul>
//                 </details>
//               </>
//             ) : (
//               <div className="p-4 bg-gray-800 rounded-2xl text-center mb-4 sm:mb-6">
//                 <p className="text-lg text-gray-300">
//                   Please purchase the course to access recordings and reference materials.
//                 </p>
//               </div>
//             )}

//             <details
//               open={isExpanded}
//               className="p-3 sm:p-4 bg-gray-800 rounded-2xl cursor-pointer transition-all duration-300 ease-in-out w-full"
//             >
//               <summary className="flex justify-between items-start mb-4 text-base sm:text-lg font-bold pl-4">
//                 Project
//               </summary>
//               <div className="pl-4 text-gray-300 text-sm sm:text-base">
//                 <div className="flex items-start mb-2">
//                   <File className="h-6 w-6 sm:h-8 sm:w-8 text-pink-400 mr-2" />
//                   <div>
//                     <p className="text-gray-400 text-xs sm:text-sm">Assignment</p>
//                     <h3 className="font-semibold text-base sm:text-lg">{projectDetails.title}</h3>
//                   </div>
//                 </div>
//                 <div className="bg-white text-black p-3 sm:p-4 rounded-lg border border-gray-300 mb-4">
//                   <p className="text-sm sm:text-base">Opened: {projectDetails.opened}</p>
//                   <p className="text-sm sm:text-base">Due: {projectDetails.due}</p>
//                 </div>
//                 <input
//                   type="file"
//                   onChange={handleFileChange}
//                   className="block w-full text-sm sm:text-base text-gray-300 bg-gray-700 rounded-lg border border-gray-600 p-2 sm:p-3 mb-4"
//                   accept=".pdf,.doc,.docx,.jpg,.png"
//                 />
//                 {isSubmitting ? (
//                   <p className="text-yellow-400">Submitting...</p>
//                 ) : submissionStatus === "Done" ? (
//                   <button
//                     disabled
//                     className="flex items-center mt-4 px-4 py-2 sm:px-5 sm:py-3 bg-green-600 rounded-lg text-white text-sm sm:text-base font-semibold opacity-100 cursor-default"
//                   >
//                     <Check className="h-5 w-5 sm:h-6 sm:w-6 mr-2" />
//                     Done
//                   </button>
//                 ) : submissionStatus ? (
//                   <p className="text-red-400 text-sm sm:text-base">{submissionStatus}</p>
//                 ) : null}
//                 <button
//                   onClick={handleSubmitProject}
//                   disabled={isSubmitting || !projectFile}
//                   className={`mt-4 px-4 py-2 sm:px-5 sm:py-3 bg-green-600 hover:bg-green-700 rounded-lg text-white text-sm sm:text-base font-semibold transition duration-300 ${
//                     isSubmitting || !projectFile ? "opacity-50 cursor-not-allowed" : ""
//                   }`}
//                 >
//                   {isSubmitting ? "Submitting..." : "Submit"}
//                 </button>
//               </div>
//             </details>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }















 




// "use client";

// import React, { useState, useEffect, useCallback } from "react";
// import axios, { AxiosError } from "axios";
// import { File, Link as LinkIcon, Check } from "lucide-react";
// import Link from "next/link";
// import { Recording, Attachment } from "@prisma/client";
// import { useAuth } from "@clerk/nextjs";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// interface LivestreamProps {
//   courseId: string;
// }

// const carouselSettings = {
//   dots: true,
//   infinite: true,
//   speed: 500,
//   slidesToShow: 5,
//   slidesToScroll: 1,
//   autoplay: true,
//   autoplaySpeed: 5000,
//   responsive: [
//     {
//       breakpoint: 1024,
//       settings: {
//         slidesToShow: 3,
//         slidesToScroll: 1,
//       },
//     },
//     {
//       breakpoint: 640,
//       settings: {
//         slidesToShow: 2,
//         slidesToScroll: 1,
//       },
//     },
//     {
//       breakpoint: 480,
//       settings: {
//         slidesToShow: 1,
//         slidesToScroll: 1,
//       },
//     },
//   ],
// };

// export default function Livestream({ courseId }: LivestreamProps) {
//   const { userId, getToken, isLoaded } = useAuth();
//   const [projectFile, setProjectFile] = useState<File | null>(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submissionStatus, setSubmissionStatus] = useState<string | null>(null);
//   const [hasPurchased, setHasPurchased] = useState(false);
//   const [recordings, setRecordings] = useState<Recording[]>([]);
//   const [courseAttachments, setCourseAttachments] = useState<Attachment[]>([]);
//   const [chapterAttachments, setChapterAttachments] = useState<Attachment[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [recordingsExpanded, setRecordingsExpanded] = useState(false);
//   const [debugInfo, setDebugInfo] = useState<string[]>([]);
//   const [submissionId, setSubmissionId] = useState<string | null>(null);
//   const [marks, setMarks] = useState<number | null>(null);
//   const [isMarked, setIsMarked] = useState(false);

//   // Fetch Purchase Status
//   const fetchPurchaseStatus = useCallback(async () => {
//     if (!userId || !courseId) {
//       // setDebugInfo(prev => [
//       //   ...prev,
//       //   `Missing: ${!userId ? "userId" : ""}${!userId && !courseId ? " and " : ""}${!courseId ? "courseId" : ""}`,
//       //   `userId: ${userId}, courseId: ${courseId}`,
//       // ]);
//       setHasPurchased(false);
//       return false;
//     }
//     try {
//       const token = await getToken();
//     //  setDebugInfo(prev => [...prev, `Fetching purchase status for user ${userId}, course ${courseId}`]);
//       const response = await axios.get(`/api/purchases/status?userId=${userId}&courseId=${courseId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//     //  setDebugInfo(prev => [...prev, `Purchase status response: ${JSON.stringify(response.data)}`]);
//       return response.data.hasPurchased === true;
//     } catch (error) {
//       const err = error as Error;
//       console.error("Error fetching purchase status:", err);
//      // setDebugInfo(prev => [...prev, `Purchase status fetch error: ${err.message}`]);
//       return false;
//     }
//   }, [userId, courseId, getToken]);

//   // Fetch Recordings
//   const fetchRecordings = useCallback(async () => {
//     try {
//      // setDebugInfo(prev => [...prev, "Fetching recordings..."]);
//       const response = await axios.get(`/api/recordings?courseId=${courseId}`);
//     ///  setDebugInfo(prev => [...prev, `Recordings received: ${JSON.stringify(response.data)}`]);
//      // setRecordings(response.data || []);
//     } catch (error) {
//       const err = error as Error;
//       console.error("Error fetching recordings:", err);
//      // setDebugInfo(prev => [...prev, `Recordings fetch error: ${err.message}`]);
//      // setRecordings([]);
//     }
//   }, [courseId]);

//   // Fetch Attachments
//   const fetchAttachments = useCallback(async () => {
//     try {
//      // setDebugInfo(prev => [...prev, "Fetching attachments..."]);
//       const response = await axios.get(`/api/attachments?courseId=${courseId}`);
//     //  setDebugInfo(prev => [...prev, `Attachments received: ${JSON.stringify(response.data)}`]);
//       setCourseAttachments(response.data.courseAttachments || []);
//       setChapterAttachments(response.data.chapterAttachments || []);
//     } catch (error) {
//       const err = error as Error;
//       console.error("Error fetching attachments:", err);
//      // setDebugInfo(prev => [...prev, `Attachments fetch error: ${err.message}`]);
//       setCourseAttachments([]);
//       setChapterAttachments([]);
//     }
//   }, [courseId]);

//   // Fetch Submission Status
//   const fetchSubmissionStatus = useCallback(async () => {
//     if (!userId || !courseId) return;
    
//     try {
//       const token = await getToken();
//       const response = await axios.get(`/api/projects/status?userId=${userId}&courseId=${courseId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
      
//       if (response.data.submission) {
//         setSubmissionId(response.data.submission.id);
//         setMarks(response.data.submission.marks);
//         setIsMarked(response.data.submission.isMarked);
//         setSubmissionStatus(response.data.submission.isMarked ? "Marked" : "Done");
//       }
//     } catch (error) {
//       console.error("Error fetching submission status:", error);
//     }
//   }, [userId, courseId, getToken]);

//   // Fetch all data on component mount
//   useEffect(() => {
//     async function fetchData() {
//       setIsLoading(true);
//     //  setDebugInfo(prev => [...prev, "Starting data fetch..."]);
      
//       if (!isLoaded) {
//      //   setDebugInfo(prev => [...prev, "Waiting for authentication to load..."]);
//         return;
//       }

//       if (!userId || !courseId) {
//         // setDebugInfo(prev => [
//         //   ...prev,
//         //   `Cannot fetch: userId: ${userId}, courseId: ${courseId}`,
//         // ]);
//         setIsLoading(false);
//         return;
//       }

//       const purchased = await fetchPurchaseStatus();
//       setHasPurchased(purchased);
//      // setDebugInfo(prev => [...prev, `Has purchased: ${purchased}`]);
      
//       if (purchased) {
//         await Promise.all([fetchRecordings(), fetchAttachments(), fetchSubmissionStatus()]);
//       }
      
//       setIsLoading(false);
//     //  setDebugInfo(prev => [...prev, "Data fetch complete"]);
//     }
//     fetchData();
//   }, [fetchPurchaseStatus, fetchRecordings, fetchAttachments, fetchSubmissionStatus, isLoaded, userId, courseId]);

//   const toggleExpandAll = () => {
//     setIsExpanded(!isExpanded);
//     setRecordingsExpanded(!recordingsExpanded);
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files.length > 0) {
//       setProjectFile(e.target.files[0]);
//       setSubmissionStatus(null);
//     }
//   };

//   const handleSubmitProject = async () => {
//     if (!projectFile || !userId || !courseId) {
//       setSubmissionStatus(
//         !projectFile ? "Please select a file to upload." :
//         !userId ? "Authentication error: Please log in again." :
//         "Course information missing: Please reload the page."
//       );
//       return;
//     }

//     setIsSubmitting(true);
//     setSubmissionStatus(null);

//     try {
//       const token = await getToken();
//       const formData = new FormData();
//       formData.append("file", projectFile);
//       formData.append("userId", userId);
//       formData.append("courseId", courseId);

//       console.log("Sending file to /api/projects/upload:", projectFile.name);
//       const response = await axios.post("/api/projects/upload", formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       if (response.status === 201) {
//         setSubmissionId(response.data.submissionId);
//         setSubmissionStatus("Done");
//         setProjectFile(null);
//         await fetchSubmissionStatus();
//       } else {
//         setSubmissionStatus("Failed to submit project. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error submitting project:", error);
//       if (error instanceof AxiosError && error.response) {
//         setSubmissionStatus(error.response.data.error || "Failed to submit project. Please try again.");
//       } else {
//         setSubmissionStatus("Failed to submit project. Please try again.");
//       }
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const googleClassroomUrl = "https://classroom.google.com/c/your-classroom-code";

//   const getDynamicProjectDetails = () => {
//     const now = new Date();
//     const opened = new Date(now);
//     const due = new Date(now);
//     due.setDate(now.getDate() + 4);
//     due.setHours(20, 0, 0, 0);
//     const formatDate = (date: Date) =>
//       date.toLocaleString("en-US", {
//         weekday: "long",
//         day: "numeric",
//         month: "long",
//         year: "numeric",
//         hour: "numeric",
//         minute: "numeric",
//         hour12: true,
//       });
//     return {
//       title: "Project Submission",
//       opened: formatDate(opened),
//       due: formatDate(due),
//     };
//   };

//   const projectDetails = getDynamicProjectDetails();

//   if (!isLoaded) {
//     return <div className="text-center text-white p-8">Loading authentication...</div>;
//   }

//   if (!userId) {
//     return <div className="text-center text-white p-8">Please log in to view this content.</div>;
//   }

//   return (
//     <div className="min-h-screen w-full bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900 text-white overflow-y-auto p-4 sm:p-6 md:p-8">
//       <div className="w-full">
//         {isLoading ? (
//           <div className="text-center text-xl sm:text-2xl">Loading...</div>
//         ) : (
//           <>
//             {/* Debug Information */}
             

//             <div className="mb-6 w-full bg-gray-800 rounded-2xl p-4 sm:p-6">
//               <h2 className="text-lg sm:text-xl font-bold mb-4 text-center">Upcoming Classes</h2>
//               <div className="relative">
//                 <Slider {...carouselSettings}>
//                   <div className="p-2">
//                     <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300 h-full flex flex-col">
//                       <img src="/Ai.webp" alt="Paper Portfolio" className="w-full h-40 object-cover" />
//                       <div className="p-4 text-center flex-grow">
//                         <p className="text-lg font-semibold" style={{ color: "#0A2540" }}>
//                           Mastering AI with Python and Data science
//                         </p>
//                         <p className="text-sm text-gray-600">Deep Learning / MACHINE LEARNING</p>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="p-2">
//                     <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300 h-full flex flex-col">
//                       <img src="/blockchain.webp" alt="Perfect Section Structure" className="w-full h-40 object-cover" />
//                       <div className="p-4 text-center flex-grow">
//                         <p className="text-lg font-semibold" style={{ color: "#0A2540" }}>
//                           Web 3.0 and Blockchain Development
//                         </p>
//                         <p className="text-sm text-gray-600">Crypto / DECENTRALIZED APPS</p>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="p-2">
//                     <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300 h-full flex flex-col">
//                       <img src="/cyber.webp" alt="Building the Desigflow Community" className="w-full h-40 object-cover" />
//                       <div className="p-4 text-center flex-grow">
//                         <p className="text-lg font-semibold" style={{ color: "#0A2540" }}>
//                           Cybersecurity and Ethical Hacking and Penetration
//                         </p>
//                         <p className="text-sm text-gray-600">Network Security / PENETRATION TESTING</p>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="p-2">
//                     <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300 h-full flex flex-col">
//                       <img src="/cloud.jpg" alt="Build an Animated App" className="w-full h-40 object-cover" />
//                       <div className="p-4 text-center flex-grow">
//                         <p className="text-lg font-semibold" style={{ color: "#0A2540" }}>
//                           Cloud Computing with AWS and Azure
//                         </p>
//                         <p className="text-sm text-gray-600">DevOps / CLOUD INFRASTRUCTURE</p>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="p-2">
//                     <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300 h-full flex flex-col">
//                       <img src="/data.jpg" alt="Learn design & code" className="w-full h-40 object-cover" />
//                       <div className="p-4 text-center flex-grow">
//                         <p className="text-lg font-semibold" style={{ color: "#0A2540" }}>
//                           Data Analytics with Python and Power BI
//                         </p>
//                         <p className="text-sm text-gray-600">Data Science / BUSINESS INTELLIGENCE</p>
//                       </div>
//                     </div>
//                   </div>
//                 </Slider>
//               </div>
//             </div>

//             <button
//               onClick={toggleExpandAll}
//               className="w-full max-w-xs p-2 sm:p-3 mb-6 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold text-xs sm:text-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out flex items-center justify-start transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300"
//             >
//               {isExpanded ? "Collapse All" : "Expand All"}
//             </button>

//             <details
//               open={isExpanded}
//               className="p-3 sm:p-4 bg-gray-800 rounded-2xl cursor-pointer transition-all duration-300 ease-in-out w-full mb-4 sm:mb-6"
//             >
//               <summary className="flex justify-between items-start mb-4 text-base sm:text-lg font-bold pl-4">
//                 Live Classes (Google Classroom)
//               </summary>
//               <div className="pl-4 text-gray-300 text-sm sm:text-base">
//                 <p className="text-gray-400 mb-4">
//                   Join our live classes on Google Classroom for real-time learning and interaction.
//                 </p>
//                 <Link
//                   href={googleClassroomUrl}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="inline-flex items-center p-3 sm:p-4 bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 text-blue-400 hover:text-blue-300 text-sm sm:text-base"
//                 >
//                   <LinkIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-blue-300 group-hover:text-blue-500 transition-colors" />
//                   <span className="font-semibold">Join Live Classes</span>
//                 </Link>
//               </div>
//             </details>

//             {hasPurchased ? (
//               <>
//                 <details
//                   open={isExpanded}
//                   className="p-3 sm:p-4 bg-gray-800 rounded-2xl cursor-pointer transition-all duration-300 ease-in-out w-full mb-4 sm:mb-6"
//                 >
//                   <summary className="flex justify-between items-start mb-4 text-base sm:text-lg font-bold pl-4">
//                     Reference Materials
//                   </summary>
//                   <ul className="pl-4 space-y-2 text-gray-300 text-sm sm:text-base">
//                     {courseAttachments.length > 0 || chapterAttachments.length > 0 ? (
//                       <>
//                         {courseAttachments.map((item) => (
//                           <li key={item.id}>
//                             {item.url ? (
//                               <a
//                                 href={item.url}
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 className="flex items-start p-2 sm:p-3 w-full bg-sky-200 dark:bg-sky-800 text-sky-700 dark:text-sky-300 hover:underline rounded-lg"
//                               >
//                                 <File className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
//                                 <span className="line-clamp-1">{item.name}</span>
//                               </a>
//                             ) : (
//                               <span className="flex items-start">
//                                 <File className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
//                                 {item.name}
//                               </span>
//                             )}
//                           </li>
//                         ))}
//                         {chapterAttachments.map((item) => (
//                           <li key={item.id}>
//                             {item.url ? (
//                               <a
//                                 href={item.url}
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 className="flex items-start p-2 sm:p-3 w-full bg-green-200 dark:bg-green-800 text-green-700 dark:text-green-300 hover:underline rounded-lg"
//                               >
//                                 <File className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
//                                 <span className="line-clamp-1">{item.name}</span>
//                               </a>
//                             ) : (
//                               <span className="flex items-start">
//                                 <File className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
//                                 {item.name}
//                               </span>
//                             )}
//                           </li>
//                         ))}
//                       </>
//                     ) : (
//                       <li className="text-gray-500 italic pl-4">No attachments available</li>
//                     )}
//                   </ul>
//                 </details>

//                 <details
//                   open={recordingsExpanded}
//                   className="p-3 sm:p-4 bg-gray-800 rounded-2xl cursor-pointer transition-all duration-300 ease-in-out w-full mb-4 sm:mb-6"
//                 >
//                   <summary
//                     onClick={() => setRecordingsExpanded(!recordingsExpanded)}
//                     className="flex justify-between items-start mb-4 text-base sm:text-lg font-bold cursor-pointer pl-4"
//                   >
//                     Recordings
//                   </summary>
//                   <ul className="pl-4 space-y-3 sm:space-y-4 text-gray-300 text-sm sm:text-base">
//                     {recordings.length > 0 ? (
//                       recordings.map((recording) => (
//                         <li key={recording.id}>
//                           <div className="p-3 sm:p-4 bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
//                             <h4 className="font-semibold text-base sm:text-lg text-indigo-400 pl-4">
//                               {recording.title}
//                             </h4>
//                             <p className="text-blue-400 hover:text-blue-300 mt-2 pl-4">
//                               <Link
//                                 href={recording.url}
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 className="flex items-start group"
//                               >
//                                 <LinkIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-blue-300 group-hover:text-blue-500 transition-colors" />
//                                 <span className="underline decoration-dotted decoration-1 underline-offset-4">
//                                   {recording.url}
//                                 </span>
//                               </Link>
//                             </p>
//                             {recording.duration && (
//                               <p className="text-gray-400 mt-1 pl-4">
//                                 Duration: {recording.duration} minutes
//                               </p>
//                             )}
//                             <p className="text-gray-500 text-xs sm:text-sm mt-1 pl-4">
//                               Uploaded: {new Date(recording.uploadedAt).toLocaleDateString()}
//                             </p>
//                           </div>
//                         </li>
//                       ))
//                     ) : (
//                       <li className="text-gray-500 italic pl-4">No recordings available</li>
//                     )}
//                   </ul>
//                 </details>
//               </>
//             ) : (
//               <div className="p-4 bg-gray-800 rounded-2xl text-center mb-4 sm:mb-6">
//                 {/* <p className="text-lg text-gray-300">
//                   Please purchase the course to access recordings and reference materials.
//                 </p> */}
//               </div>
//             )}

//             <details
//               open={isExpanded}
//               className="p-3 sm:p-4 bg-gray-800 rounded-2xl cursor-pointer transition-all duration-300 ease-in-out w-full"
//             >
//               <summary className="flex justify-between items-start mb-4 text-base sm:text-lg font-bold pl-4">
//                 Project
//               </summary>
//               <div className="pl-4 text-gray-300 text-sm sm:text-base">
//                 <div className="flex items-start mb-2">
//                   <File className="h-6 w-6 sm:h-8 sm:w-8 text-pink-400 mr-2" />
//                   <div>
//                     <p className="text-gray-400 text-xs sm:text-sm">Assignment</p>
//                     <h3 className="font-semibold text-base sm:text-lg">{projectDetails.title}</h3>
//                   </div>
//                 </div>
//                 <div className="bg-white text-black p-3 sm:p-4 rounded-lg border border-gray-300 mb-4">
//                   <p className="text-sm sm:text-base">Opened: {projectDetails.opened}</p>
//                   <p className="text-sm sm:text-base">Due: {projectDetails.due}</p>
//                 </div>
                
//                 {!submissionId ? (
//                   <>
//                     <input
//                       type="file"
//                       onChange={handleFileChange}
//                       className="block w-full text-sm sm:text-base text-gray-300 bg-gray-700 rounded-lg border border-gray-600 p-2 sm:p-3 mb-4"
//                       accept=".pdf,.doc,.docx,.jpg,.png"
//                     />
//                     <button
//                       onClick={handleSubmitProject}
//                       disabled={isSubmitting || !projectFile}
//                       className={`mt-4 px-4 py-2 sm:px-5 sm:py-3 bg-green-600 hover:bg-green-700 rounded-lg text-white text-sm sm:text-base font-semibold transition duration-300 ${
//                         isSubmitting || !projectFile ? "opacity-50 cursor-not-allowed" : ""
//                       }`}
//                     >
//                       {isSubmitting ? "Submitting..." : "Submit"}
//                     </button>
//                   </>
//                 ) : (
//                   <div className="mt-4">
//                     <button
//                       disabled
//                       className="flex items-center px-4 py-2 sm:px-5 sm:py-3 bg-green-600 rounded-lg text-white text-sm sm:text-base font-semibold opacity-100 cursor-default"
//                     >
//                       <Check className="h-5 w-5 sm:h-6 sm:w-6 mr-2" />
//                       {isMarked ? "Marked" : "Submitted"}
//                     </button>
//                     {isMarked && marks !== null && (
//                       <p className="mt-2 text-green-400">
//                         Marks: {marks}/100
//                       </p>
//                     )}
//                   </div>
//                 )}
                
//                 {isSubmitting && <p className="text-yellow-400 mt-2">Submitting...</p>}
//                 {submissionStatus && !isSubmitting && !submissionId && (
//                   <p className="text-red-400 text-sm sm:text-base mt-2">{submissionStatus}</p>
//                 )}
//               </div>
//             </details>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }










// app/components/Livestream.tsx
"use client";

import React, { useState, useEffect, useCallback } from "react";
import axios, { AxiosError } from "axios";
import { File, Link as LinkIcon, Check } from "lucide-react";
import Link from "next/link";
import { Recording, Attachment } from "@prisma/client";
import { useAuth } from "@clerk/nextjs";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface LivestreamProps {
  courseId: string;
}

const carouselSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 5000,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 640,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

export default function Livestream({ courseId }: LivestreamProps) {
  console.log("Received courseId:", courseId); // Debug courseId prop
  const { userId, getToken, isLoaded } = useAuth();
  const [projectFile, setProjectFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<string | null>(null);
  const [hasPurchased, setHasPurchased] = useState(false);
  const [recordings, setRecordings] = useState<Recording[]>([]);
  const [courseAttachments, setCourseAttachments] = useState<Attachment[]>([]);
  const [chapterAttachments, setChapterAttachments] = useState<Attachment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [recordingsExpanded, setRecordingsExpanded] = useState(false);
  const [submissionId, setSubmissionId] = useState<string | null>(null);
  const [marks, setMarks] = useState<number | null>(null);
  const [isMarked, setIsMarked] = useState(false);
  const [comments, setComments] = useState<string | null>(null);

  // Fetch Purchase Status
  const fetchPurchaseStatus = useCallback(async () => {
    if (!userId || !courseId) {
      setHasPurchased(false);
      return false;
    }
    try {
      const token = await getToken();
      const response = await axios.get(
        `/api/purchases/status?userId=${userId}&courseId=${courseId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data.hasPurchased === true;
    } catch (error) {
      console.error("Error fetching purchase status:", error);
      return false;
    }
  }, [userId, courseId, getToken]);

  // Fetch Recordings
  const fetchRecordings = useCallback(async () => {
    try {
      const response = await axios.get(`/api/recordings?courseId=${courseId}`);
      setRecordings(response.data || []);
    } catch (error) {
      console.error("Error fetching recordings:", error);
      setRecordings([]);
    }
  }, [courseId]);

  // Fetch Attachments
  const fetchAttachments = useCallback(async () => {
    try {
      const response = await axios.get(`/api/attachments?courseId=${courseId}`);
      setCourseAttachments(response.data.courseAttachments || []);
      setChapterAttachments(response.data.chapterAttachments || []);
    } catch (error) {
      console.error("Error fetching attachments:", error);
      setCourseAttachments([]);
      setChapterAttachments([]);
    }
  }, [courseId]);

  // Fetch Submission Status
  const fetchSubmissionStatus = useCallback(async () => {
    if (!userId || !courseId) return;

    try {
      const token = await getToken();
      const response = await axios.get(
        `/api/projects/status?userId=${userId}&courseId=${courseId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.submission) {
        setSubmissionId(response.data.submission.id);
        setMarks(response.data.submission.marks);
        setIsMarked(response.data.submission.isMarked);
        setComments(response.data.submission.comments);
        setSubmissionStatus(response.data.submission.isMarked ? "Marked" : "Done");
      }
    } catch (error) {
      console.error("Error fetching submission status:", error);
    }
  }, [userId, courseId, getToken]);

  // Fetch all data on component mount
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);

      if (!isLoaded) {
        return;
      }

      if (!userId || !courseId) {
        setIsLoading(false);
        return;
      }

      const purchased = await fetchPurchaseStatus();
      setHasPurchased(purchased);

      if (purchased) {
        await Promise.all([
          fetchRecordings(),
          fetchAttachments(),
          fetchSubmissionStatus(),
        ]);
      }

      setIsLoading(false);
    }
    fetchData();
  }, [
    fetchPurchaseStatus,
    fetchRecordings,
    fetchAttachments,
    fetchSubmissionStatus,
    isLoaded,
    userId,
    courseId,
  ]);

  const toggleExpandAll = () => {
    setIsExpanded(!isExpanded);
    setRecordingsExpanded(!recordingsExpanded);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setProjectFile(e.target.files[0]);
      setSubmissionStatus(null);
    }
  };

  const handleSubmitProject = async () => {
    console.log("handleSubmitProject called with:", { projectFile, userId, courseId });

    if (!projectFile || !userId || !courseId) {
      setSubmissionStatus(
        !projectFile
          ? "Please select a file to upload."
          : !userId
          ? "Authentication error: Please log in again."
          : "Course information missing: Please reload the page."
      );
      console.log("Submission blocked due to:", {
        projectFile: !!projectFile,
        userId: !!userId,
        courseId: !!courseId,
      });
      return;
    }

    setIsSubmitting(true);
    setSubmissionStatus(null);

    try {
      const token = await getToken();
      const formData = new FormData();
      formData.append("file", projectFile);
      formData.append("userId", userId);
      formData.append("courseId", courseId);

      console.log("Sending file to /api/projects/upload:", projectFile.name);
      const response = await axios.post("/api/projects/upload", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        setSubmissionId(response.data.submissionId);
        setSubmissionStatus("Done");
        setProjectFile(null);
        await fetchSubmissionStatus();
      } else {
        setSubmissionStatus("Failed to submit project. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting project:", error);
      if (error instanceof AxiosError && error.response) {
        setSubmissionStatus(
          error.response.data.error || "Failed to submit project. Please try again."
        );
      } else {
        setSubmissionStatus("Failed to submit project. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const googleClassroomUrl = "https://classroom.google.com/c/your-classroom-code";

  const getDynamicProjectDetails = () => {
    const now = new Date();
    const opened = new Date(now);
    const due = new Date(now);
    due.setDate(now.getDate() + 4);
    due.setHours(20, 0, 0, 0);
    const formatDate = (date: Date) =>
      date.toLocaleString("en-US", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
    return {
      title: "Project Submission",
      opened: formatDate(opened),
      due: formatDate(due),
    };
  };

  const projectDetails = getDynamicProjectDetails();

  if (!isLoaded) {
    return <div className="text-center text-white p-8">Loading authentication...</div>;
  }

  if (!userId) {
    return <div className="text-center text-white p-8">Please log in to view this content.</div>;
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900 text-white overflow-y-auto p-4 sm:p-6 md:p-8">
      <div className="w-full">
        {isLoading ? (
          <div className="text-center text-xl sm:text-2xl">Loading...</div>
        ) : (
          <>
            <div className="mb-6 w-full bg-gray-800 rounded-2xl p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-bold mb-4 text-center">
                Upcoming Classes
              </h2>
              <div className="relative">
                <Slider {...carouselSettings}>
                  <div className="p-2">
                    <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300 h-full flex flex-col">
                      <img
                        src="/Ai.webp"
                        alt="Paper Portfolio"
                        className="w-full h-40 object-cover"
                      />
                      <div className="p-4 text-center flex-grow">
                        <p className="text-lg font-semibold" style={{ color: "#0A2540" }}>
                          Mastering AI with Python and Data science
                        </p>
                        <p className="text-sm text-gray-600">
                          Deep Learning / MACHINE LEARNING
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-2">
                    <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300 h-full flex flex-col">
                      <img
                        src="/blockchain.webp"
                        alt="Perfect Section Structure"
                        className="w-full h-40 object-cover"
                      />
                      <div className="p-4 text-center flex-grow">
                        <p className="text-lg font-semibold" style={{ color: "#0A2540" }}>
                          Web 3.0 and Blockchain Development
                        </p>
                        <p className="text-sm text-gray-600">
                          Crypto / DECENTRALIZED APPS
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-2">
                    <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300 h-full flex flex-col">
                      <img
                        src="/cyber.webp"
                        alt="Building the Desigflow Community"
                        className="w-full h-40 object-cover"
                      />
                      <div className="p-4 text-center flex-grow">
                        <p className="text-lg font-semibold" style={{ color: "#0A2540" }}>
                          Cybersecurity and Ethical Hacking and Penetration
                        </p>
                        <p className="text-sm text-gray-600">
                          Network Security / PENETRATION TESTING
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-2">
                    <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300 h-full flex flex-col">
                      <img
                        src="/cloud.jpg"
                        alt="Build an Animated App"
                        className="w-full h-40 object-cover"
                      />
                      <div className="p-4 text-center flex-grow">
                        <p className="text-lg font-semibold" style={{ color: "#0A2540" }}>
                          Cloud Computing with AWS and Azure
                        </p>
                        <p className="text-sm text-gray-600">
                          DevOps / CLOUD INFRASTRUCTURE
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-2">
                    <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300 h-full flex flex-col">
                      <img
                        src="/data.jpg"
                        alt="Learn design & code"
                        className="w-full h-40 object-cover"
                      />
                      <div className="p-4 text-center flex-grow">
                        <p className="text-lg font-semibold" style={{ color: "#0A2540" }}>
                          Data Analytics with Python and Power BI
                        </p>
                        <p className="text-sm text-gray-600">
                          Data Science / BUSINESS INTELLIGENCE
                        </p>
                      </div>
                    </div>
                  </div>
                </Slider>
              </div>
            </div>

            <button
              onClick={toggleExpandAll}
              className="w-full max-w-xs p-2 sm:p-3 mb-6 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold text-xs sm:text-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out flex items-center justify-start transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              {isExpanded ? "Collapse All" : "Expand All"}
            </button>

            <details
              open={isExpanded}
              className="p-3 sm:p-4 bg-gray-800 rounded-2xl cursor-pointer transition-all duration-300 ease-in-out w-full mb-4 sm:mb-6"
            >
              <summary className="flex justify-between items-start mb-4 text-base sm:text-lg font-bold pl-4">
                Live Classes (Google Classroom)
              </summary>
              <div className="pl-4 text-gray-300 text-sm sm:text-base">
                <p className="text-gray-400 mb-4">
                  Join our live classes on Google Classroom for real-time learning and
                  interaction.
                </p>
                <Link
                  href={googleClassroomUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center p-3 sm:p-4 bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 text-blue-400 hover:text-blue-300 text-sm sm:text-base"
                >
                  <LinkIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-blue-300 group-hover:text-blue-500 transition-colors" />
                  <span className="font-semibold">Join Live Classes</span>
                </Link>
              </div>
            </details>

            {hasPurchased ? (
              <>
                <details
                  open={isExpanded}
                  className="p-3 sm:p-4 bg-gray-800 rounded-2xl cursor-pointer transition-all duration-300 ease-in-out w-full mb-4 sm:mb-6"
                >
                  <summary className="flex justify-between items-start mb-4 text-base sm:text-lg font-bold pl-4">
                    Reference Materials
                  </summary>
                  <ul className="pl-4 space-y-2 text-gray-300 text-sm sm:text-base">
                    {courseAttachments.length > 0 || chapterAttachments.length > 0 ? (
                      <>
                        {courseAttachments.map((item) => (
                          <li key={item.id}>
                            {item.url ? (
                              <a
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-start p-2 sm:p-3 w-full bg-sky-200 dark:bg-sky-800 text-sky-700 dark:text-sky-300 hover:underline rounded-lg"
                              >
                                <File className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                                <span className="line-clamp-1">{item.name}</span>
                              </a>
                            ) : (
                              <span className="flex items-start">
                                <File className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                                {item.name}
                              </span>
                            )}
                          </li>
                        ))}
                        {chapterAttachments.map((item) => (
                          <li key={item.id}>
                            {item.url ? (
                              <a
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-start p-2 sm:p-3 w-full bg-green-200 dark:bg-green-800 text-green-700 dark:text-green-300 hover:underline rounded-lg"
                              >
                                <File className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                                <span className="line-clamp-1">{item.name}</span>
                              </a>
                            ) : (
                              <span className="flex items-start">
                                <File className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                                {item.name}
                              </span>
                            )}
                          </li>
                        ))}
                      </>
                    ) : (
                      <li className="text-gray-500 italic pl-4">
                        No attachments available
                      </li>
                    )}
                  </ul>
                </details>

                <details
                  open={recordingsExpanded}
                  className="p-3 sm:p-4 bg-gray-800 rounded-2xl cursor-pointer transition-all duration-300 ease-in-out w-full mb-4 sm:mb-6"
                >
                  <summary
                    onClick={() => setRecordingsExpanded(!recordingsExpanded)}
                    className="flex justify-between items-start mb-4 text-base sm:text-lg font-bold cursor-pointer pl-4"
                  >
                    Recordings
                  </summary>
                  <ul className="pl-4 space-y-3 sm:space-y-4 text-gray-300 text-sm sm:text-base">
                    {recordings.length > 0 ? (
                      recordings.map((recording) => (
                        <li key={recording.id}>
                          <div className="p-3 sm:p-4 bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                            <h4 className="font-semibold text-base sm:text-lg text-indigo-400 pl-4">
                              {recording.title}
                            </h4>
                            <p className="text-blue-400 hover:text-blue-300 mt-2 pl-4">
                              <Link
                                href={recording.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-start group"
                              >
                                <LinkIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-blue-300 group-hover:text-blue-500 transition-colors" />
                                <span className="underline decoration-dotted decoration-1 underline-offset-4">
                                  {recording.url}
                                </span>
                              </Link>
                            </p>
                            {recording.duration && (
                              <p className="text-gray-400 mt-1 pl-4">
                                Duration: {recording.duration} minutes
                              </p>
                            )}
                            <p className="text-gray-500 text-xs sm:text-sm mt-1 pl-4">
                              Uploaded:{" "}
                              {new Date(recording.uploadedAt).toLocaleDateString()}
                            </p>
                          </div>
                        </li>
                      ))
                    ) : (
                      <li className="text-gray-500 italic pl-4">
                        No recordings available
                      </li>
                    )}
                  </ul>
                </details>
              </>
            ) : (
              <div className="p-4 bg-gray-800 rounded-2xl text-center mb-4 sm:mb-6">
                {/* <p className="text-lg text-gray-300">
                  Please purchase the course to access recordings and reference materials.
                </p> */}
              </div>
            )}

            <details
              open={isExpanded}
              className="p-3 sm:p-4 bg-gray-800 rounded-2xl cursor-pointer transition-all duration-300 ease-in-out w-full"
            >
              <summary className="flex justify-between items-start mb-4 text-base sm:text-lg font-bold pl-4">
                Project
              </summary>
              <div className="pl-4 text-gray-300 text-sm sm:text-base">
                <div className="flex items-start mb-2">
                  <File className="h-6 w-6 sm:h-8 sm:w-8 text-pink-400 mr-2" />
                  <div>
                    <p className="text-gray-400 text-xs sm:text-sm">Assignment</p>
                    <h3 className="font-semibold text-base sm:text-lg">
                      {projectDetails.title}
                    </h3>
                  </div>
                </div>
                <div className="bg-white text-black p-3 sm:p-4 rounded-lg border border-gray-300 mb-4">
                  <p className="text-sm sm:text-base">
                    Opened: {projectDetails.opened}
                  </p>
                  <p className="text-sm sm:text-base">Due: {projectDetails.due}</p>
                </div>

                {!submissionId ? (
                  <>
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="block w-full text-sm sm:text-base text-gray-300 bg-gray-700 rounded-lg border border-gray-600 p-2 sm:p-3 mb-4"
                      accept=".pdf,.doc,.docx,.jpg,.png"
                    />
                    <button
                      onClick={handleSubmitProject}
                      disabled={isSubmitting || !projectFile}
                      className={`mt-4 px-4 py-2 sm:px-5 sm:py-3 bg-green-600 hover:bg-green-700 rounded-lg text-white text-sm sm:text-base font-semibold transition duration-300 ${
                        isSubmitting || !projectFile
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                    >
                      {isSubmitting ? "Submitting..." : "Submit"}
                    </button>
                  </>
                ) : (
                  <div className="mt-4">
                    <button
                      disabled
                      className="flex items-center px-4 py-2 sm:px-5 sm:py-3 bg-green-600 rounded-lg text-white text-sm sm:text-base font-semibold opacity-100 cursor-default"
                    >
                      <Check className="h-5 w-5 sm:h-6 sm:w-6 mr-2" />
                      {isMarked ? "Marked" : "Submitted"}
                    </button>
                    {isMarked && marks !== null && (
                      <div className="mt-2">
                        <p className="text-green-400">Marks: {marks}/100</p>
                        {comments && (
                          <p className="text-gray-300 mt-1">Comments: {comments}</p>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {isSubmitting && (
                  <p className="text-yellow-400 mt-2">Submitting...</p>
                )}
                {submissionStatus && !isSubmitting && !submissionId && (
                  <p className="text-red-400 text-sm sm:text-base mt-2">
                    {submissionStatus}
                  </p>
                )}
              </div>
            </details>
          </>
        )}
      </div>
    </div>
  );
}