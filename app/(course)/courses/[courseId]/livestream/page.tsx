// import React from "react"; 
// import Chat from "@/components/chatlive";
// import LiveStream from "@/components/livestream";


//  export default function Livestream() {

//   return ( 
//     // <div>
//     //    <LiveStream />
//     //    {/* <Chat /> */}
//     // </div>
//    );
//  }
  
// import React from "react";

// export default function Livestream() {
//   return (
//     <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
//     <a 
//       href="https://classroom.google.com/" 
//       target="_blank" 
//       rel="noopener noreferrer"
//       className="px-6 py-3 text-lg font-semibold text-white bg-blue-500 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
//     >
//       Open Google Classroom
//     </a>
//   </div>
//   );
// }




// "use client";

// import React, { useState } from "react";

// export default function Livestream() {
//   const [progress, setProgress] = useState(91);
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [selectedPlatform, setSelectedPlatform] = useState("");

//   const handlePlatformChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     setSelectedPlatform(event.target.value);
//   };

//   const sections = [
//     { 
//       title: "Program Calendar", 
//       items: [
//         { name: "Upcoming Sessions", file: true }, 
//         { name: "Past Events", file: true }
//       ]
//     },
//     { 
//       title: "Reference Materials", 
//       items: [
//         { name: "PDFs", file: true }, 
//         { name: "Slides", file: true }
//       ]
//     },
//     { 
//       title: "Recordings of Sessions", 
//       items: [
//         { name: "Google Meet Recordings", video: true }, 
//         { name: "Other Video Files", video: true }
//       ]
//     },
//     { 
//       title: "Assignments", 
//       items: [
//         { name: "Homework", doc: true }, 
//         { name: "Classwork", doc: true }
//       ]
//     },
//     { 
//       title: "Projects", 
//       items: [
//         { name: "Group Projects", folder: true }, 
//         { name: "Individual Projects", folder: true }
//       ]
//     },
//   ];

//   const toggleExpandAll = () => setIsExpanded(!isExpanded);

//   // Helper function to get the icon based on item properties
//   const getItemIcon = (item: any) => {
//     if (item.file) return '📁';
//     if (item.video) return '🎥';
//     if (item.doc) return '📄';
//     if (item.folder) return '📂';
//     return '•'; // Default bullet if no specific icon matches
//   };

//   return (
//     <div className="h-screen w-screen flex flex-col items-start justify-start bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900 text-white overflow-y-auto">
//       <div className="w-full max-w-5xl p-4 md:p-10">
//         {/* Meeting Platform Dropdown */}
//         <div className="mb-6 w-full">
//           <select 
//             value={selectedPlatform} 
//             onChange={handlePlatformChange}
//             className="w-full p-4 bg-gray-800 border border-gray-600 rounded-full text-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent"
//           >
//             <option value="">Select Platform</option>
//             <option value="google-meet">Google Meet</option>
//             <option value="zoom">Zoom</option>
//           </select>
//         </div>

//         {/* Buttons */}
//         <div className="flex flex-col md:flex-row gap-4 mb-6 w-full">
//           <button 
//             className="w-full md:w-1/2 p-4 bg-blue-600 hover:bg-blue-700 rounded-full text-center font-semibold transition duration-300 ease-in-out"
//             onClick={() => {
//               if (selectedPlatform === "google-meet") {
//                 window.open("https://meet.google.com/", "_blank");
//               } else if (selectedPlatform === "zoom") {
//                 window.open("https://zoom.us", "_blank");
//               }
//             }}
//           >
//             Meeting Joining Link
//           </button>
//           <a 
//             href="https://classroom.google.com/" 
//             target="_blank" 
//             rel="noopener noreferrer"
//             className="w-full md:w-1/2 p-4 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 rounded-full text-center font-semibold transition duration-300 ease-in-out"
//           >
//             Open Google Classroom
//           </a>
//         </div>

//         {/* Expand All Button */}
//         <button 
//           onClick={toggleExpandAll} 
//           className="w-full p-4 mb-6 bg-gray-800 hover:bg-gray-700 rounded-full text-center font-semibold transition duration-300 ease-in-out"
//         >
//           {isExpanded ? "Collapse All" : "Expand All"}
//         </button>

//         {/* Dropdowns */}
//         <div className="space-y-4 w-full">
//           {sections.map((section, index) => (
//             <details 
//               key={index} 
//               open={isExpanded} 
//               className="p-4 bg-gray-800 rounded-2xl cursor-pointer transition-all duration-300 ease-in-out w-full"
//             >
//               <summary className="flex justify-between items-center mb-4 text-lg font-bold">
//                 {section.title}
//                 <span className="px-3 py-1 rounded-full bg-gradient-to-r from-green-400 to-green-600 text-white text-xs">
//                   Done
//                 </span>
//               </summary>
//               <ul className="pl-4 space-y-2 text-gray-300">
//                 {section.items.map((item, i) => (
//                   <li key={i} className="text-base">
//                     {typeof item === 'object' ? (
//                       <>
//                         <span className="text-blue-300 mr-2">{getItemIcon(item)}</span>
//                         {item.name}
//                       </>
//                     ) : (
//                       <>
//                         <span className="text-blue-300 mr-2">•</span>
//                         {item}
//                       </>
//                     )}
//                   </li>
//                 ))}
//               </ul>
//             </details>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }





// page.tsx
// "use client";
// import React, { useState } from "react";
// import CalendarDisplay from "@/components/CalendarDisplay";
// import AdminCalendar from "@/components/AdminCalendar";

// export default function Livestream() {
//   const [progress, setProgress] = useState(91);
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [selectedPlatform, setSelectedPlatform] = useState("");
//   const [showCalendar, setShowCalendar] = useState(false);
//   const [events, setEvents] = useState([]); // Assume this gets populated from some backend service

//   const handlePlatformChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     setSelectedPlatform(event.target.value);
//   };

//   const sections = [
//     { 
//       title: "Program Calendar", 
//       items: [
//         { name: "Upcoming Sessions", file: true }, 
//         { name: "Past Events", file: true }
//       ]
//     },
//     { 
//       title: "Reference Materials", 
//       items: [
//         { name: "PDFs", file: true }, 
//         { name: "Slides", file: true }
//       ]
//     },
//     { 
//       title: "Recordings of Sessions", 
//       items: [
//         { name: "Google Meet Recordings", video: true }, 
//         { name: "Other Video Files", video: true }
//       ]
//     },
//     { 
//       title: "Assignments", 
//       items: [
//         { name: "Homework", doc: true }, 
//         { name: "Classwork", doc: true }
//       ]
//     },
//     { 
//       title: "Projects", 
//       items: [
//         { name: "Group Projects", folder: true }, 
//         { name: "Individual Projects", folder: true }
//       ]
//     },
//   ];

//   const toggleExpandAll = () => setIsExpanded(!isExpanded);

//   const getItemIcon = (item: any) => {
//     if (item.file) return '📁';
//     if (item.video) return '🎥';
//     if (item.doc) return '📄';
//     if (item.folder) return '📂';
//     return '•';
//   };

//   return (
//     <div className="h-screen w-screen flex flex-col items-start justify-start bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900 text-white overflow-y-auto">
//       <div className="w-full max-w-5xl p-4 md:p-10">
//         {/* Meeting Platform Dropdown */}
//         <div className="mb-6 w-full">
//           <select 
//             value={selectedPlatform} 
//             onChange={handlePlatformChange}
//             className="w-full p-4 bg-gray-800 border border-gray-600 rounded-full text-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent"
//           >
//             <option value="">Select Platform</option>
//             <option value="google-meet">Google Meet</option>
//             <option value="zoom">Zoom</option>
//           </select>
//         </div>

//         {/* Buttons */}
//         <div className="flex flex-col md:flex-row gap-4 mb-6 w-full">
//           <button 
//             className="w-full md:w-1/2 p-4 bg-blue-600 hover:bg-blue-700 rounded-full text-center font-semibold transition duration-300 ease-in-out"
//             onClick={() => {
//               if (selectedPlatform === "google-meet") {
//                 window.open("https://meet.google.com/", "_blank");
//               } else if (selectedPlatform === "zoom") {
//                 window.open("https://zoom.us", "_blank");
//               }
//             }}
//           >
//             Meeting Joining Link
//           </button>
//           <a 
//             href="https://classroom.google.com/" 
//             target="_blank" 
//             rel="noopener noreferrer"
//             className="w-full md:w-1/2 p-4 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 rounded-full text-center font-semibold transition duration-300 ease-in-out"
//           >
//             Open Google Classroom
//           </a>
//         </div>

//         {/* Expand All Button */}
//         <button 
//           onClick={toggleExpandAll} 
//           className="w-full p-4 mb-6 bg-gray-800 hover:bg-gray-700 rounded-full text-center font-semibold transition duration-300 ease-in-out"
//         >
//           {isExpanded ? "Collapse All" : "Expand All"}
//         </button>

//         {/* Dropdowns */}
//         <div className="space-y-4 w-full">
//           {sections.map((section, index) => (
//             <details 
//               key={index} 
//               open={isExpanded} 
//               className="p-4 bg-gray-800 rounded-2xl cursor-pointer transition-all duration-300 ease-in-out w-full"
//             >
//               <summary className="flex justify-between items-center mb-4 text-lg font-bold">
//                 {section.title}
//                 <span className="px-3 py-1 rounded-full bg-gradient-to-r from-green-400 to-green-600 text-white text-xs">
//                   Done
//                 </span>
//               </summary>
//               <ul className="pl-4 space-y-2 text-gray-300">
//                 {section.title === "Program Calendar" ? (
//                   <li key="calendar" className="text-base cursor-pointer" onClick={() => setShowCalendar(!showCalendar)}>
//                     <span className="text-blue-300 mr-2">📅</span>
//                     {showCalendar ? "Hide Calendar" : "Show Calendar"}
//                   </li>
//                 ) : (
//                   section.items.map((item, i) => (
//                     <li key={i} className="text-base">
//                       {typeof item === 'object' ? (
//                         <>
//                           <span className="text-blue-300 mr-2">{getItemIcon(item)}</span>
//                           {item.name}
//                         </>
//                       ) : (
//                         <>
//                           <span className="text-blue-300 mr-2">•</span>
//                           {item}
//                         </>
//                       )}
//                     </li>
//                   ))
//                 )}
//               </ul>
//               {section.title === "Program Calendar" && showCalendar && <CalendarDisplay events={events} />}
//             </details>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }





// page.tsx
// "use client";
// import React, { useState } from "react";
// import CalendarDisplay from "@/components/CalendarDisplay";
// import AdminCalendar, { Event } from "@/components/AdminCalendar";

// export default function Livestream() {
//   const [progress, setProgress] = useState(91);
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [selectedPlatform, setSelectedPlatform] = useState("");
//   const [showCalendar, setShowCalendar] = useState(false);
//   const [showAdminCalendar, setShowAdminCalendar] = useState(false);
//   const [events, setEvents] = useState<Event[]>([]);

//   const handlePlatformChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     setSelectedPlatform(event.target.value);
//   };

//   const handleEventChange = (updatedEvents: Event[]) => {
//     setEvents(updatedEvents);
//   };

//   const sections = [
//     { 
//       title: "Program Calendar", 
//       items: [
//         { name: "Upcoming Sessions", file: true }, 
//         { name: "Past Events", file: true }
//       ]
//     },
//     { 
//       title: "Reference Materials", 
//       items: [
//         { name: "PDFs", file: true }, 
//         { name: "Slides", file: true }
//       ]
//     },
//     { 
//       title: "Recordings of Sessions", 
//       items: [
//         { name: "Google Meet Recordings", video: true }, 
//         { name: "Other Video Files", video: true }
//       ]
//     },
//     { 
//       title: "Assignments", 
//       items: [
//         { name: "Homework", doc: true }, 
//         { name: "Classwork", doc: true }
//       ]
//     },
//     { 
//       title: "Projects", 
//       items: [
//         { name: "Group Projects", folder: true }, 
//         { name: "Individual Projects", folder: true }
//       ]
//     },
//   ];

//   const toggleExpandAll = () => setIsExpanded(!isExpanded);

//   const getItemIcon = (item: any) => {
//     if (item.file) return '📁';
//     if (item.video) return '🎥';
//     if (item.doc) return '📄';
//     if (item.folder) return '📂';
//     return '•';
//   };

//   return (
//     <div className="h-screen w-screen flex flex-col items-start justify-start bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900 text-white overflow-y-auto">
//       <div className="w-full max-w-5xl p-4 md:p-10">
//         {/* Meeting Platform Dropdown */}
//         <div className="mb-6 w-full">
//           <select 
//             value={selectedPlatform} 
//             onChange={handlePlatformChange}
//             className="w-full p-4 bg-gray-800 border border-gray-600 rounded-full text-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent"
//           >
//             <option value="">Select Platform</option>
//             <option value="google-meet">Google Meet</option>
//             <option value="zoom">Zoom</option>
//           </select>
//         </div>

//         {/* Buttons */}
//         <div className="flex flex-col md:flex-row gap-4 mb-6 w-full">
//           <button 
//             className="w-full md:w-1/2 p-4 bg-blue-600 hover:bg-blue-700 rounded-full text-center font-semibold transition duration-300 ease-in-out"
//             onClick={() => {
//               if (selectedPlatform === "google-meet") {
//                 window.open("https://meet.google.com/", "_blank");
//               } else if (selectedPlatform === "zoom") {
//                 window.open("https://zoom.us", "_blank");
//               }
//             }}
//           >
//             Meeting Joining Link
//           </button>
//           <a 
//             href="https://classroom.google.com/" 
//             target="_blank" 
//             rel="noopener noreferrer"
//             className="w-full md:w-1/2 p-4 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 rounded-full text-center font-semibold transition duration-300 ease-in-out"
//           >
//             Open Google Classroom
//           </a>
//         </div>

//         {/* Expand All Button */}
//         <button 
//           onClick={toggleExpandAll} 
//           className="w-full p-4 mb-6 bg-gray-800 hover:bg-gray-700 rounded-full text-center font-semibold transition duration-300 ease-in-out"
//         >
//           {isExpanded ? "Collapse All" : "Expand All"}
//         </button>

//         {/* Dropdowns */}
//         <div className="space-y-4 w-full">
//           {sections.map((section, index) => (
//             <details 
//               key={index} 
//               open={isExpanded} 
//               className="p-4 bg-gray-800 rounded-2xl cursor-pointer transition-all duration-300 ease-in-out w-full"
//             >
//               <summary className="flex justify-between items-center mb-4 text-lg font-bold">
//                 {section.title}
//                 <span className="px-3 py-1 rounded-full bg-gradient-to-r from-green-400 to-green-600 text-white text-xs">
//                   Done
//                 </span>
//               </summary>
//               <ul className="pl-4 space-y-2 text-gray-300">
//                 {section.title === "Program Calendar" ? (
//                   <li key="calendar" className="text-base cursor-pointer" onClick={() => setShowCalendar(!showCalendar)}>
//                     <span className="text-blue-300 mr-2">📅</span>
//                     {showCalendar ? "Hide Calendar" : "Show Calendar"}
//                   </li>
//                 ) : (
//                   section.items.map((item, i) => (
//                     <li key={i} className="text-base">
//                       {getItemIcon(item)} {item.name}
//                     </li>
//                   ))
//                 )}
//               </ul>
//               {section.title === "Program Calendar" && showCalendar && (
//                 <>
//                   <CalendarDisplay events={events} />
//                   <button 
//                     onClick={() => setShowAdminCalendar(true)}
//                     className="mt-2 p-2 bg-blue-500 text-black rounded"
//                   >
//                     Manage Calendar
//                   </button>
//                   {showAdminCalendar && (
//                     <AdminCalendar 
//                       setShowAdminCalendar={setShowAdminCalendar} 
//                       onEventChange={handleEventChange}
//                     />
//                   )}
//                 </>
//               )}
//             </details>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }





// "use client";
// import React, { useState, useEffect } from "react";
// import CalendarDisplay from "@/components/CalendarDisplay";
// import AdminCalendar, { Event } from "@/components/AdminCalendar";
// import { getChapter } from "@/actions/get-chapter";

// type ItemType = {
//   name: string;
//   file?: boolean;
//   video?: boolean;
//   doc?: boolean;
//   folder?: boolean;
//   url?: string;
// };

// interface Section {
//   title: string;
//   items: ItemType[];
// }

// export default function Livestream() {
//   const [progress, setProgress] = useState(91);
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [selectedPlatform, setSelectedPlatform] = useState("");
//   const [showCalendar, setShowCalendar] = useState(false);
//   const [showAdminCalendar, setShowAdminCalendar] = useState(false);
//   const [events, setEvents] = useState<Event[]>([]);
//   const [attachments, setAttachments] = useState<any[]>([]);

//   useEffect(() => {
//     const fetchAttachments = async () => {
//       const data = await getChapter({
//         userId: "user-id", // Replace with actual user ID
//         courseId: "course-id", // Replace with actual course ID
//         chapterId: "chapter-id", // Replace with actual chapter ID
//       });
//       setAttachments(data.attachments || []);
//     };

//     fetchAttachments();
//   }, []);

//   const handlePlatformChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     setSelectedPlatform(event.target.value);
//   };

//   const handleEventChange = (updatedEvents: Event[]) => {
//     setEvents(updatedEvents);
//   };

//   const sections: Section[] = [
//     { 
//       title: "Program Calendar", 
//       items: [
//         { name: "Upcoming Sessions", file: true }, 
//         { name: "Past Events", file: true }
//       ]
//     },
//     { 
//       title: "Reference Materials", 
//       items: attachments.map(attachment => ({
//         name: attachment.name, 
//         file: true, 
//         url: attachment.url 
//       })) as ItemType[]
//     },
//     { 
//       title: "Recordings of Sessions", 
//       items: [
//         { name: "Google Meet Recordings", video: true }, 
//         { name: "Other Video Files", video: true }
//       ]
//     },
//     { 
//       title: "Assignments", 
//       items: [
//         { name: "Homework", doc: true }, 
//         { name: "Classwork", doc: true }
//       ]
//     },
//     { 
//       title: "Projects", 
//       items: [
//         { name: "Group Projects", folder: true }, 
//         { name: "Individual Projects", folder: true }
//       ]
//     },
//   ];

//   const toggleExpandAll = () => setIsExpanded(!isExpanded);

//   const getItemIcon = (item: ItemType) => {
//     if (item.file) return '📁';
//     if (item.video) return '🎥';
//     if (item.doc) return '📄';
//     if (item.folder) return '📂';
//     return '•';
//   };

//   return (
//     <div className="h-screen w-screen flex flex-col items-start justify-start bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900 text-white overflow-y-auto">
//       <div className="w-full max-w-5xl p-4 md:p-10">
//         {/* Meeting Platform Dropdown */}
//         <div className="mb-6 w-full">
//           <select 
//             value={selectedPlatform} 
//             onChange={handlePlatformChange}
//             className="w-full p-4 bg-gray-800 border border-gray-600 rounded-full text-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent"
//           >
//             <option value="">Select Platform</option>
//             <option value="google-meet">Google Meet</option>
//             <option value="zoom">Zoom</option>
//           </select>
//         </div>

//         {/* Buttons */}
//         <div className="flex flex-col md:flex-row gap-4 mb-6 w-full">
//           <button 
//             className="w-full md:w-1/2 p-4 bg-blue-600 hover:bg-blue-700 rounded-full text-center font-semibold transition duration-300 ease-in-out"
//             onClick={() => {
//               if (selectedPlatform === "google-meet") {
//                 window.open("https://meet.google.com/", "_blank");
//               } else if (selectedPlatform === "zoom") {
//                 window.open("https://zoom.us", "_blank");
//               }
//             }}
//           >
//             Meeting Joining Link
//           </button>
//           <a 
//             href="https://classroom.google.com/" 
//             target="_blank" 
//             rel="noopener noreferrer"
//             className="w-full md:w-1/2 p-4 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 rounded-full text-center font-semibold transition duration-300 ease-in-out"
//           >
//             Open Google Classroom
//           </a>
//         </div>

//         {/* Expand All Button */}
//         <button 
//           onClick={toggleExpandAll} 
//           className="w-full p-4 mb-6 bg-gray-800 hover:bg-gray-700 rounded-full text-center font-semibold transition duration-300 ease-in-out"
//         >
//           {isExpanded ? "Collapse All" : "Expand All"}
//         </button>

//         {/* Dropdowns */}
//         <div className="space-y-4 w-full">
//           {sections.map((section, index) => (
//             <details 
//               key={index} 
//               open={isExpanded} 
//               className="p-4 bg-gray-800 rounded-2xl cursor-pointer transition-all duration-300 ease-in-out w-full"
//             >
//               <summary className="flex justify-between items-center mb-4 text-lg font-bold">
//                 {section.title}
//                 <span className="px-3 py-1 rounded-full bg-gradient-to-r from-green-400 to-green-600 text-white text-xs">
//                   Done
//                 </span>
//               </summary>
//               <ul className="pl-4 space-y-2 text-gray-300">
//                 {section.title === "Program Calendar" ? (
//                   <li key="calendar" className="text-base cursor-pointer" onClick={() => setShowCalendar(!showCalendar)}>
//                     <span className="text-blue-300 mr-2">📅</span>
//                     {showCalendar ? "Hide Calendar" : "Show Calendar"}
//                   </li>
//                 ) : (
//                   section.items.map((item, i) => (
//                     <li key={i} className="text-base">
//                       {getItemIcon(item)} 
//                       {item.url ? (
//                         <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:underline">
//                           {item.name}
//                         </a>
//                       ) : (
//                         item.name
//                       )}
//                     </li>
//                   ))
//                 )}
//               </ul>
//               {section.title === "Program Calendar" && showCalendar && (
//                 <>
//                   <CalendarDisplay events={events} />
//                   <button 
//                     onClick={() => setShowAdminCalendar(true)}
//                     className="mt-2 p-2 bg-blue-500 text-black rounded"
//                   >
//                     Manage Calendar
//                   </button>
//                   {showAdminCalendar && (
//                     <AdminCalendar 
//                       setShowAdminCalendar={setShowAdminCalendar} 
//                       onEventChange={handleEventChange}
//                     />
//                   )}
//                 </>
//               )}
//             </details>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }










// "use client";
// import React, { useState, useEffect } from "react";
// import CalendarDisplay from "@/components/CalendarDisplay";
// import AdminCalendar, { Event } from "@/components/AdminCalendar";
// import { getChapter } from "@/actions/get-chapter";

// type ItemType = {
//   name: string;
//   file?: boolean;
//   video?: boolean;
//   doc?: boolean;
//   folder?: boolean;
//   url?: string;
// };

// interface Section {
//   title: string;
//   items: ItemType[];
// }

// export default function Livestream() {
//   const [progress, setProgress] = useState(91);
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [selectedPlatform, setSelectedPlatform] = useState("");
//   const [showCalendar, setShowCalendar] = useState(false);
//   const [showAdminCalendar, setShowAdminCalendar] = useState(false);
//   const [events, setEvents] = useState<Event[]>([]);
//   const [attachments, setAttachments] = useState<ItemType[]>([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchAttachments = async () => {
//       try {
//         const chapterData = await getChapter({
//           userId: "user-id", // Replace with actual user ID
//           courseId: "course-id", // Replace with actual course ID
//           chapterId: "chapter-id", // Replace with actual chapter ID
//         });
        
//         if (chapterData.attachments) {
//           setAttachments(chapterData.attachments.map(attachment => ({
//             name: attachment.name,
//             file: true,
//             url: attachment.url
//           })));
//         } else {
//           setAttachments([]);
//         }
//       } catch (error) {
//         console.error("Error fetching chapter data:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchAttachments();
//   }, []);

//   const handlePlatformChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     setSelectedPlatform(event.target.value);
//   };

//   const handleEventChange = (updatedEvents: Event[]) => {
//     setEvents(updatedEvents);
//   };

//   const sections: Section[] = [
//     { 
//       title: "Program Calendar", 
//       items: [
//         { name: "Upcoming Sessions", file: true }, 
//         { name: "Past Events", file: true }
//       ]
//     },
//     { 
//       title: "Reference Materials", 
//       items: attachments
//     },
//     { 
//       title: "Recordings of Sessions", 
//       items: [
//         { name: "Google Meet Recordings", video: true }, 
//         { name: "Other Video Files", video: true }
//       ]
//     },
//     { 
//       title: "Assignments", 
//       items: [
//         { name: "Homework", doc: true }, 
//         { name: "Classwork", doc: true }
//       ]
//     },
//     { 
//       title: "Projects", 
//       items: [
//         { name: "Group Projects", folder: true }, 
//         { name: "Individual Projects", folder: true }
//       ]
//     },
//   ];

//   const toggleExpandAll = () => setIsExpanded(!isExpanded);

//   const getItemIcon = (item: ItemType) => {
//     if (item.file) return '📁';
//     if (item.video) return '🎥';
//     if (item.doc) return '📄';
//     if (item.folder) return '📂';
//     return '•';
//   };

//   return (
//     <div className="h-screen w-screen flex flex-col items-start justify-start bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900 text-white overflow-y-auto">
//       <div className="w-full max-w-5xl p-4 md:p-10">
//         {isLoading ? (
//           <div className="text-center text-2xl">Loading...</div>
//         ) : (
//           <>
//             {/* Meeting Platform Dropdown */}
//             <div className="mb-6 w-full">
//               <select 
//                 value={selectedPlatform} 
//                 onChange={handlePlatformChange}
//                 className="w-full p-4 bg-gray-800 border border-gray-600 rounded-full text-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent"
//               >
//                 <option value="">Select Platform</option>
//                 <option value="google-meet">Google Meet</option>
//                 <option value="zoom">Zoom</option>
//               </select>
//             </div>

//             {/* Buttons */}
//             <div className="flex flex-col md:flex-row gap-4 mb-6 w-full">
//               <button 
//                 className="w-full md:w-1/2 p-4 bg-blue-600 hover:bg-blue-700 rounded-full text-center font-semibold transition duration-300 ease-in-out"
//                 onClick={() => {
//                   if (selectedPlatform === "google-meet") {
//                     window.open("https://meet.google.com/", "_blank");
//                   } else if (selectedPlatform === "zoom") {
//                     window.open("https://zoom.us", "_blank");
//                   }
//                 }}
//               >
//                 Meeting Joining Link
//               </button>
//               <a 
//                 href="https://classroom.google.com/" 
//                 target="_blank" 
//                 rel="noopener noreferrer"
//                 className="w-full md:w-1/2 p-4 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 rounded-full text-center font-semibold transition duration-300 ease-in-out"
//               >
//                 Open Google Classroom
//               </a>
//             </div>

//             {/* Expand All Button */}
//             <button 
//               onClick={toggleExpandAll} 
//               className="w-full p-4 mb-6 bg-gray-800 hover:bg-gray-700 rounded-full text-center font-semibold transition duration-300 ease-in-out"
//             >
//               {isExpanded ? "Collapse All" : "Expand All"}
//             </button>

//             {/* Dropdowns */}
//             <div className="space-y-4 w-full">
//               {sections.map((section, index) => (
//                 <details 
//                   key={index} 
//                   open={isExpanded} 
//                   className="p-4 bg-gray-800 rounded-2xl cursor-pointer transition-all duration-300 ease-in-out w-full"
//                 >
//                   <summary className="flex justify-between items-center mb-4 text-lg font-bold">
//                     {section.title}
//                     <span className="px-3 py-1 rounded-full bg-gradient-to-r from-green-400 to-green-600 text-white text-xs">
//                       Done
//                     </span>
//                   </summary>
//                   <ul className="pl-4 space-y-2 text-gray-300">
//                     {section.title === "Program Calendar" ? (
//                       <li key="calendar" className="text-base cursor-pointer" onClick={() => setShowCalendar(!showCalendar)}>
//                         <span className="text-blue-300 mr-2">📅</span>
//                         {showCalendar ? "Hide Calendar" : "Show Calendar"}
//                       </li>
//                     ) : (
//                       section.items.map((item, i) => (
//                         <li key={i} className="text-base">
//                           {getItemIcon(item)} 
//                           {item.url ? (
//                             <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:underline">
//                               {item.name}
//                             </a>
//                           ) : (
//                             item.name
//                           )}
//                         </li>
//                       ))
//                     )}
//                   </ul>
//                   {section.title === "Program Calendar" && showCalendar && (
//                     <>
//                       <CalendarDisplay events={events} />
//                       <button 
//                         onClick={() => setShowAdminCalendar(true)}
//                         className="mt-2 p-2 bg-blue-500 text-black rounded"
//                       >
//                         Manage Calendar
//                       </button>
//                       {showAdminCalendar && (
//                         <AdminCalendar 
//                           setShowAdminCalendar={setShowAdminCalendar} 
//                           onEventChange={handleEventChange}
//                         />
//                       )}
//                     </>
//                   )}
//                 </details>
//               ))}
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }








// "use client";
// import React, { useState, useEffect } from "react";
// import { getChapter } from "@/actions/get-chapter";
// import { File } from "lucide-react";

// type ItemType = {
//   id: string;
//   name: string;
//   url?: string;
// };

// export default function Livestream() {
//   const [attachments, setAttachments] = useState<ItemType[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isExpanded, setIsExpanded] = useState(false);

//   useEffect(() => {
//     const fetchAttachments = async () => {
//       try {
//         const chapterData = await getChapter({
//           userId: "user-id", // Replace with actual user ID
//           courseId: "course-id", // Replace with actual course ID
//           chapterId: "chapter-id", // Replace with actual chapter ID
//         });

//         if (chapterData?.attachments) {
//           setAttachments(
//             chapterData.attachments.map((attachment) => ({
//               id: attachment.id || crypto.randomUUID(), // Generate unique ID if missing
//               name: attachment.name,
//               url: attachment.url,
//             }))
//           );
//         }
//       } catch (error) {
//         console.error("Error fetching attachments:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchAttachments();
//   }, []);

//   const toggleExpandAll = () => setIsExpanded(!isExpanded);

//   return (
//     <div className="h-screen w-screen flex flex-col items-start justify-start bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900 text-white overflow-y-auto">
//       <div className="w-full max-w-5xl p-4 md:p-10">
//         {isLoading ? (
//           <div className="text-center text-2xl">Loading...</div>
//         ) : (
//           <>
//             {/* Expand All Button */}
//             <button
//               onClick={toggleExpandAll}
//               className="w-full p-4 mb-6 bg-gray-800 hover:bg-gray-700 rounded-full text-center font-semibold transition duration-300 ease-in-out"
//             >
//               {isExpanded ? "Collapse All" : "Expand All"}
//             </button>

//             {/* Reference Materials Section */}
//             <details
//               open={isExpanded}
//               className="p-4 bg-gray-800 rounded-2xl cursor-pointer transition-all duration-300 ease-in-out w-full"
//             >
//               <summary className="flex justify-between items-center mb-4 text-lg font-bold">
//                 Reference Materials
//               </summary>
//               <ul className="pl-4 space-y-2 text-gray-300">
//                 {attachments.length > 0 ? (
//                   attachments.map((item) => (
//                     <li key={item.id} className="text-base">
//                       {item.url ? (
//                         <a
//                           href={item.url}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="flex items-center p-3 w-full bg-sky-200 dark:bg-sky-800 text-sky-700 dark:text-sky-300 hover:underline rounded-lg"
//                         >
//                           <File className="mr-2" />
//                           <span className="line-clamp-1">{item.name}</span>
//                         </a>
//                       ) : (
//                         <span className="flex items-center">
//                           <File className="mr-2" />
//                           {item.name}
//                         </span>
//                       )}
//                     </li>
//                   ))
//                 ) : (
//                   <li className="text-gray-500 italic">No attachments available</li>
//                 )}
//               </ul>
//             </details>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }






// "use client";

// import React, { useState, useEffect, useCallback } from "react";
// import { getChapter } from "@/actions/get-chapter";
// import { File } from "lucide-react";
// import axios from "axios"; // Import axios for fetching recordings
// import { Recording } from "@prisma/client"; // Import Recording type from Prisma
// import { Link as LinkIcon } from "lucide-react"; // Import LinkIcon for recordings
// import Link from "next/link"; // Import Next.js Link for clickable links
// import { useSearchParams } from "next/navigation"; // Import useSearchParams

// type ItemType = {
//   id: string;
//   name: string;
//   url?: string;
// };

// export default function Livestream() {
//   const searchParams = useSearchParams(); // Get query parameters
//   const courseId = searchParams.get("courseId") || "default-course-id"; // Default if not provided
//   const chapterId = searchParams.get("chapterId") || "default-chapter-id"; // Default if not provided

//   const [attachments, setAttachments] = useState<ItemType[]>([]);
//   const [recordings, setRecordings] = useState<Recording[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [recordingsExpanded, setRecordingsExpanded] = useState(false); // Separate expand state for recordings

//   // Memoize fetchData to prevent unnecessary re-renders
//   const fetchData = useCallback(async () => {
//     try {
//       // Fetch chapter attachments (existing logic)
//       const chapterData = await getChapter({
//         userId: "user-id", // Replace with actual user ID or fetch dynamically
//         courseId: courseId,
//         chapterId: chapterId,
//       });

//       if (chapterData?.attachments) {
//         setAttachments(
//           chapterData.attachments.map((attachment) => ({
//             id: attachment.id || crypto.randomUUID(), // Generate unique ID if missing
//             name: attachment.name,
//             url: attachment.url,
//           }))
//         );
//       }

//       // Fetch recordings from the classroom API
//       const recordingsResponse = await axios.get(`/api/courses/${courseId}/chapters/${chapterId}/recordings`);
//       setRecordings(recordingsResponse.data || []);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   }, [courseId, chapterId]);

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   const toggleExpandAll = () => setIsExpanded(!isExpanded);
//   const toggleRecordingsExpand = () => setRecordingsExpanded(!recordingsExpanded);

//   return (
//     <div className="h-screen w-screen flex flex-col items-start justify-start bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900 text-white overflow-y-auto">
//       <div className="w-full max-w-5xl p-4 md:p-10">
//         {isLoading ? (
//           <div className="text-center text-2xl">Loading...</div>
//         ) : (
//           <>
//             {/* Expand All Button for Attachments */}
//             <button
//               onClick={toggleExpandAll}
//               className="w-full p-4 mb-6 bg-gray-800 hover:bg-gray-700 rounded-full text-center font-semibold transition duration-300 ease-in-out"
//             >
//               {isExpanded ? "Collapse All" : "Expand All"}
//             </button>

//             {/* Reference Materials Section (Existing) */}
//             <details
//               open={isExpanded}
//               className="p-4 bg-gray-800 rounded-2xl cursor-pointer transition-all duration-300 ease-in-out w-full"
//             >
//               <summary className="flex justify-between items-center mb-4 text-lg font-bold">
//                 Reference Materials
//               </summary>
//               <ul className="pl-4 space-y-2 text-gray-300">
//                 {attachments.length > 0 ? (
//                   attachments.map((item) => (
//                     <li key={item.id} className="text-base">
//                       {item.url ? (
//                         <a
//                           href={item.url}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="flex items-center p-3 w-full bg-sky-200 dark:bg-sky-800 text-sky-700 dark:text-sky-300 hover:underline rounded-lg"
//                         >
//                           <File className="mr-2" />
//                           <span className="line-clamp-1">{item.name}</span>
//                         </a>
//                       ) : (
//                         <span className="flex items-center">
//                           <File className="mr-2" />
//                           {item.name}
//                         </span>
//                       )}
//                     </li>
//                   ))
//                 ) : (
//                   <li className="text-gray-500 italic">No attachments available</li>
//                 )}
//               </ul>
//             </details>

//             {/* Recordings Section (New) */}
//             <details
//               open={recordingsExpanded}
//               className="p-4 mt-6 bg-gray-800 rounded-2xl cursor-pointer transition-all duration-300 ease-in-out w-full"
//             >
//               <summary className="flex justify-between items-center mb-4 text-lg font-bold">
//                 Recordings
//                 <button
//                   onClick={toggleRecordingsExpand}
//                   className="text-sm text-gray-400 hover:text-gray-200"
//                 >
//                   {recordingsExpanded ? "Collapse" : "Expand"}
//                 </button>
//               </summary>
//               <ul className="pl-4 space-y-4 text-gray-300">
//                 {recordings.length > 0 ? (
//                   recordings.map((recording) => (
//                     <li key={recording.id} className="text-base">
//                       <div className="p-4 bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
//                         <h4 className="font-semibold text-lg text-indigo-400">{recording.title}</h4>
//                         <p className="text-blue-400 hover:text-blue-300 mt-2">
//                           <Link href={recording.url} target="_blank" rel="noopener noreferrer" className="flex items-center group">
//                             <LinkIcon className="h-5 w-5 mr-2 text-blue-300 group-hover:text-blue-500 transition-colors" />
//                             <span className="underline decoration-dotted decoration-1 underline-offset-4">{recording.url}</span>
//                           </Link>
//                         </p>
//                         {recording.duration && <p className="text-gray-400 mt-1">Duration: {recording.duration} minutes</p>}
//                         <p className="text-gray-500 text-sm mt-1">Uploaded: {new Date(recording.uploadedAt).toLocaleDateString()}</p>
//                       </div>
//                     </li>
//                   ))
//                 ) : (
//                   <li className="text-gray-500 italic">No recordings available</li>
//                 )}
//               </ul>
//             </details>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }





// "use client";

// import React, { useState, useEffect, useCallback } from "react";
// import { getChapter } from "@/actions/get-chapter";
// import { File, Link as LinkIcon } from "lucide-react";
// import axios from "axios";
// import { Recording } from "@prisma/client";
// import Link from "next/link";
// import { useSearchParams } from "next/navigation";

// type ItemType = {
//   id: string;
//   name: string;
//   url?: string;
// };

// export default function Livestream() {
//   const searchParams = useSearchParams();
//   const courseId = searchParams.get("courseId");
//   const chapterId = searchParams.get("chapterId");

//   const [attachments, setAttachments] = useState<ItemType[]>([]);
//   const [recordings, setRecordings] = useState<Recording[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [recordingsExpanded, setRecordingsExpanded] = useState(false);

//   const fetchData = useCallback(async () => {
//     try {
//       if (!courseId || !chapterId) {
//         console.warn("Missing courseId or chapterId in URL params.");
//         setIsLoading(false);
//         return;
//       }

//       const chapterData = await getChapter({
//         userId: "user-id",
//         courseId,
//         chapterId,
//       });

//       if (chapterData?.attachments) {
//         setAttachments(
//           chapterData.attachments.map((attachment) => ({
//             id: attachment.id || crypto.randomUUID(),
//             name: attachment.name,
//             url: attachment.url,
//           }))
//         );
//       }

//       const recordingsResponse = await axios.get(`/api/recordings`);
//       setRecordings(recordingsResponse.data || []);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   }, [courseId, chapterId]);

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   const toggleExpandAll = () => setIsExpanded(!isExpanded);
//   const toggleRecordingsExpand = () => setRecordingsExpanded(!recordingsExpanded);

//   return (
//     <div className="h-screen w-screen flex flex-col items-start justify-start bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900 text-white overflow-y-auto">
//       <div className="w-full max-w-5xl p-4 md:p-10">
//         {isLoading ? (
//           <div className="text-center text-2xl">Loading...</div>
//         ) : (
//           <>
//             <button
//               onClick={toggleExpandAll}
//               className="w-full p-4 mb-6 bg-gray-800 hover:bg-gray-700 rounded-full text-center font-semibold transition duration-300 ease-in-out"
//             >
//               {isExpanded ? "Collapse All" : "Expand All"}
//             </button>

//             <details
//               open={isExpanded}
//               className="p-4 bg-gray-800 rounded-2xl cursor-pointer transition-all duration-300 ease-in-out w-full"
//             >
//               <summary className="flex justify-between items-center mb-4 text-lg font-bold">
//                 Reference Materials
//               </summary>
//               <ul className="pl-4 space-y-2 text-gray-300">
//                 {attachments.length > 0 ? (
//                   attachments.map((item) => (
//                     <li key={item.id} className="text-base">
//                       {item.url ? (
//                         <a
//                           href={item.url}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="flex items-center p-3 w-full bg-sky-200 dark:bg-sky-800 text-sky-700 dark:text-sky-300 hover:underline rounded-lg"
//                         >
//                           <File className="mr-2" />
//                           <span className="line-clamp-1">{item.name}</span>
//                         </a>
//                       ) : (
//                         <span className="flex items-center">
//                           <File className="mr-2" />
//                           {item.name}
//                         </span>
//                       )}
//                     </li>
//                   ))
//                 ) : (
//                   <li className="text-gray-500 italic">No attachments available</li>
//                 )}
//               </ul>
//             </details>

//             <details
//               open={recordingsExpanded}
//               className="p-4 mt-6 bg-gray-800 rounded-2xl cursor-pointer transition-all duration-300 ease-in-out w-full"
//             >
//               <summary className="flex justify-between items-center mb-4 text-lg font-bold">
//                 Recordings
//                 <button
//                   onClick={toggleRecordingsExpand}
//                   className="text-sm text-gray-400 hover:text-gray-200"
//                 >
//                   {recordingsExpanded ? "Collapse" : "Expand"}
//                 </button>
//               </summary>
//               <ul className="pl-4 space-y-4 text-gray-300">
//                 {recordings.length > 0 ? (
//                   recordings.map((recording) => (
//                     <li key={recording.id} className="text-base">
//                       <div className="p-4 bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
//                         <h4 className="font-semibold text-lg text-indigo-400">{recording.title}</h4>
//                         <p className="text-blue-400 hover:text-blue-300 mt-2">
//                           <Link href={recording.url} target="_blank" rel="noopener noreferrer" className="flex items-center group">
//                             <LinkIcon className="h-5 w-5 mr-2 text-blue-300 group-hover:text-blue-500 transition-colors" />
//                             <span className="underline decoration-dotted decoration-1 underline-offset-4">{recording.url}</span>
//                           </Link>
//                         </p>
//                         {recording.duration && <p className="text-gray-400 mt-1">Duration: {recording.duration} minutes</p>}
//                         <p className="text-gray-500 text-sm mt-1">Uploaded: {new Date(recording.uploadedAt).toLocaleDateString()}</p>
//                       </div>
//                     </li>
//                   ))
//                 ) : (
//                   <li className="text-gray-500 italic">No recordings available</li>
//                 )}
//               </ul>
//             </details>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }







// "use client";

// import React, { useState, useEffect, useCallback } from "react";
// import axios from "axios";
// import { File, Link as LinkIcon } from "lucide-react";
// import Link from "next/link";
// import { Recording } from "@prisma/client";

// export default function Livestream() {
//   const [recordings, setRecordings] = useState<Recording[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [recordingsExpanded, setRecordingsExpanded] = useState(false);

//   const fetchData = useCallback(async () => {
//     try {
//       console.log("Fetching recordings...");
//       const response = await axios.get(`/api/recordings`);
//       console.log("Recordings received:", response.data);

//       setRecordings(response.data || []);
//     } catch (error) {
//       console.error("Error fetching recordings:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   return (
//     <div className="h-screen w-screen flex flex-col items-start justify-start bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900 text-white overflow-y-auto">
//       <div className="w-full max-w-5xl p-4 md:p-10">
//         {isLoading ? (
//           <div className="text-center text-2xl">Loading...</div>
//         ) : (
//           <>
//             <details
//               open={recordingsExpanded}
//               className="p-4 mt-6 bg-gray-800 rounded-2xl cursor-pointer transition-all duration-300 ease-in-out w-full"
//             >
//               <summary
//                 onClick={() => setRecordingsExpanded(!recordingsExpanded)}
//                 className="flex justify-between items-center mb-4 text-lg font-bold cursor-pointer"
//               >
//                 Recordings
//               </summary>
//               <ul className="pl-4 space-y-4 text-gray-300">
//                 {recordings.length > 0 ? (
//                   recordings.map((recording) => (
//                     <li key={recording.id} className="text-base">
//                       <div className="p-4 bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
//                         <h4 className="font-semibold text-lg text-indigo-400">
//                           {recording.title}
//                         </h4>
//                         <p className="text-blue-400 hover:text-blue-300 mt-2">
//                           <Link
//                             href={recording.url}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="flex items-center group"
//                           >
//                             <LinkIcon className="h-5 w-5 mr-2 text-blue-300 group-hover:text-blue-500 transition-colors" />
//                             <span className="underline decoration-dotted decoration-1 underline-offset-4">
//                               {recording.url}
//                             </span>
//                           </Link>
//                         </p>
//                         {recording.duration && (
//                           <p className="text-gray-400 mt-1">
//                             Duration: {recording.duration} minutes
//                           </p>
//                         )}
//                         <p className="text-gray-500 text-sm mt-1">
//                           Uploaded:{" "}
//                           {new Date(recording.uploadedAt).toLocaleDateString()}
//                         </p>
//                       </div>
//                     </li>
//                   ))
//                 ) : (
//                   <li className="text-gray-500 italic">
//                     No recordings available
//                   </li>
//                 )}
//               </ul>
//             </details>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }





// "use client";

// import React, { useState, useEffect, useCallback } from "react";
// import axios from "axios";
// import { File, Link as LinkIcon } from "lucide-react";
// import Link from "next/link";
// import { Recording, Attachment } from "@prisma/client";

// export default function Livestream() {
//   const [recordings, setRecordings] = useState<Recording[]>([]);
//   const [courseAttachments, setCourseAttachments] = useState<Attachment[]>([]);
//   const [chapterAttachments, setChapterAttachments] = useState<Attachment[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [recordingsExpanded, setRecordingsExpanded] = useState(false);

//   // Fetch Recordings
//   const fetchRecordings = useCallback(async () => {
//     try {
//       console.log("Fetching recordings...");
//       const response = await axios.get(`/api/recordings`);
//       console.log("Recordings received:", response.data);
//       setRecordings(response.data || []);
//     } catch (error) {
//       console.error("Error fetching recordings:", error);
//     }
//   }, []);

//   // Fetch Attachments (Reference Materials)
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

//   // Fetch all data on component mount
//   useEffect(() => {
//     async function fetchData() {
//       await fetchRecordings();
//       await fetchAttachments();
//       setIsLoading(false);
//     }
//     fetchData();
//   }, [fetchRecordings, fetchAttachments]);

//   // Expand/Collapse Sections
//   const toggleExpandAll = () => {
//     setIsExpanded(!isExpanded);
//     setRecordingsExpanded(!recordingsExpanded);
//   };

//   return (
//     <div className="h-screen w-screen flex flex-col items-start justify-start bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900 text-white overflow-y-auto">
//       <div className="w-full max-w-5xl p-4 md:p-10">
//         {isLoading ? (
//           <div className="text-center text-2xl">Loading...</div>
//         ) : (
//           <>
//             {/* Expand/Collapse Button */}
//             <button
//               onClick={toggleExpandAll}
//               className="w-full p-4 mb-6 bg-gray-800 hover:bg-gray-700 rounded-full text-center font-semibold transition duration-300 ease-in-out"
//             >
//               {isExpanded ? "Collapse All" : "Expand All"}
//             </button>

//             {/* Reference Materials Section */}
//             <details
//               open={isExpanded}
//               className="p-4 bg-gray-800 rounded-2xl cursor-pointer transition-all duration-300 ease-in-out w-full"
//             >
//               <summary className="flex justify-between items-center mb-4 text-lg font-bold">
//                 Reference Materials
//               </summary>
//               <ul className="pl-4 space-y-2 text-gray-300">
//                 {courseAttachments.length > 0 || chapterAttachments.length > 0 ? (
//                   <>
//                     {/* Course Attachments */}
//                     {courseAttachments.map((item) => (
//                       <li key={item.id} className="text-base">
//                         {item.url ? (
//                           <a
//                             href={item.url}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="flex items-center p-3 w-full bg-sky-200 dark:bg-sky-800 text-sky-700 dark:text-sky-300 hover:underline rounded-lg"
//                           >
//                             <File className="mr-2" />
//                             <span className="line-clamp-1">{item.name}</span>
//                           </a>
//                         ) : (
//                           <span className="flex items-center">
//                             <File className="mr-2" />
//                             {item.name}
//                           </span>
//                         )}
//                       </li>
//                     ))}

//                     {/* Chapter Attachments */}
//                     {chapterAttachments.map((item) => (
//                       <li key={item.id} className="text-base">
//                         {item.url ? (
//                           <a
//                             href={item.url}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="flex items-center p-3 w-full bg-green-200 dark:bg-green-800 text-green-700 dark:text-green-300 hover:underline rounded-lg"
//                           >
//                             <File className="mr-2" />
//                             <span className="line-clamp-1">{item.name}</span>
//                           </a>
//                         ) : (
//                           <span className="flex items-center">
//                             <File className="mr-2" />
//                             {item.name}
//                           </span>
//                         )}
//                       </li>
//                     ))}
//                   </>
//                 ) : (
//                   <li className="text-gray-500 italic">No attachments available</li>
//                 )}
//               </ul>
//             </details>

//             {/* Recordings Section */}
//             <details
//               open={recordingsExpanded}
//               className="p-4 mt-6 bg-gray-800 rounded-2xl cursor-pointer transition-all duration-300 ease-in-out w-full"
//             >
//               <summary
//                 onClick={() => setRecordingsExpanded(!recordingsExpanded)}
//                 className="flex justify-between items-center mb-4 text-lg font-bold cursor-pointer"
//               >
//                 Recordings
//               </summary>
//               <ul className="pl-4 space-y-4 text-gray-300">
//                 {recordings.length > 0 ? (
//                   recordings.map((recording) => (
//                     <li key={recording.id} className="text-base">
//                       <div className="p-4 bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
//                         <h4 className="font-semibold text-lg text-indigo-400">
//                           {recording.title}
//                         </h4>
//                         <p className="text-blue-400 hover:text-blue-300 mt-2">
//                           <Link
//                             href={recording.url}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="flex items-center group"
//                           >
//                             <LinkIcon className="h-5 w-5 mr-2 text-blue-300 group-hover:text-blue-500 transition-colors" />
//                             <span className="underline decoration-dotted decoration-1 underline-offset-4">
//                               {recording.url}
//                             </span>
//                           </Link>
//                         </p>
//                         {recording.duration && (
//                           <p className="text-gray-400 mt-1">
//                             Duration: {recording.duration} minutes
//                           </p>
//                         )}
//                         <p className="text-gray-500 text-sm mt-1">
//                           Uploaded:{" "}
//                           {new Date(recording.uploadedAt).toLocaleDateString()}
//                         </p>
//                       </div>
//                     </li>
//                   ))
//                 ) : (
//                   <li className="text-gray-500 italic">No recordings available</li>
//                 )}
//               </ul>
//             </details>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }



// "use client";

// import React, { useState, useEffect, useCallback } from "react";
// import axios from "axios";
// import { File, Link as LinkIcon, Check } from "lucide-react";
// import Link from "next/link";
// import { Recording, Attachment } from "@prisma/client";

// export default function Livestream() {
//   const [recordings, setRecordings] = useState<Recording[]>([]);
//   const [courseAttachments, setCourseAttachments] = useState<Attachment[]>([]);
//   const [chapterAttachments, setChapterAttachments] = useState<Attachment[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [recordingsExpanded, setRecordingsExpanded] = useState(false);

//   // Project Submission State
//   const [projectFile, setProjectFile] = useState<File | null>(null);
//   const [isSubmitting, setIsSubmitting] = useState(false); // For "Submitting" state
//   const [submissionStatus, setSubmissionStatus] = useState<string | null>(null); // "Done" or error message

//   // Fetch Recordings
//   const fetchRecordings = useCallback(async () => {
//     try {
//       console.log("Fetching recordings...");
//       const response = await axios.get(`/api/recordings`);
//       console.log("Recordings received:", response.data);
//       setRecordings(response.data || []);
//     } catch (error) {
//       console.error("Error fetching recordings:", error);
//     }
//   }, []);

//   // Fetch Attachments (Reference Materials)
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

//   // Fetch all data on component mount
//   useEffect(() => {
//     async function fetchData() {
//       await fetchRecordings();
//       await fetchAttachments();
//       setIsLoading(false);
//     }
//     fetchData();
//   }, [fetchRecordings, fetchAttachments]);

//   // Expand/Collapse Sections
//   const toggleExpandAll = () => {
//     setIsExpanded(!isExpanded);
//     setRecordingsExpanded(!recordingsExpanded);
//   };

//   // Handle Project Submission
//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files.length > 0) {
//       setProjectFile(e.target.files[0]);
//       setSubmissionStatus(null); // Reset status on new file selection
//     }
//   };

//   const handleSubmitProject = async () => {
//     if (!projectFile) {
//       setSubmissionStatus("Please select a file to upload.");
//       return;
//     }

//     setIsSubmitting(true);
//     setSubmissionStatus(null);

//     try {
//       const formData = new FormData();
//       formData.append("file", projectFile);

//       // Simulate API call to submit project (replace with your actual endpoint)
//       await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate network delay
//       setSubmissionStatus("Done");
//       setProjectFile(null); // Clear file after successful submission
//     } catch (error) {
//       console.error("Error submitting project:", error);
//       setSubmissionStatus("Failed to submit project. Please try again.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Google Classroom URL for live classes (replace with your actual link)
//   const googleClassroomUrl = "https://classroom.google.com/c/your-classroom-code";

//   // Dynamic Project Submission Details
//   const getDynamicProjectDetails = () => {
//     const now = new Date();
//     const opened = new Date(now);
//     const due = new Date(now);
//     due.setDate(now.getDate() + 4); // Due date is 4 days after opened
//     due.setHours(20, 0, 0, 0); // Set to 8:00 PM

//     const formatDate = (date: Date) => {
//       return date.toLocaleString("en-US", {
//         weekday: "long",
//         day: "numeric",
//         month: "long",
//         year: "numeric",
//         hour: "numeric",
//         minute: "numeric",
//         hour12: true,
//       });
//     };

//     return {
//       title: "Project Submission",
//       opened: formatDate(opened),
//       due: formatDate(due),
//     };
//   };

//   const projectDetails = getDynamicProjectDetails();

//   return (
//     <div className="min-h-screen w-full bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900 text-white overflow-y-auto p-4 sm:p-6 md:p-8">
//       <div className="w-full">
//         {isLoading ? (
//           <div className="text-center text-xl sm:text-2xl">Loading...</div>
//         ) : (
//           <>
//             {/* Expand/Collapse Button */}
//             <button
//               onClick={toggleExpandAll}
//               className="w-full p-3 sm:p-4 mb-6 bg-gray-800 hover:bg-gray-700 rounded-full text-left font-semibold text-sm sm:text-base transition duration-300 ease-in-out pl-4"
//             >
//               {isExpanded ? "Collapse All" : "Expand All"}
//             </button>

//             {/* Google Classroom for Live Classes Section */}
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

//             {/* Reference Materials Section */}
//             <details
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

//             {/* Project Submission Section */}
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
// import axios from "axios";
// import { File, Link as LinkIcon, Check } from "lucide-react";
// import Link from "next/link";
// import { Recording, Attachment } from "@prisma/client";

// export default function Livestream() {
//   const [recordings, setRecordings] = useState<Recording[]>([]);
//   const [courseAttachments, setCourseAttachments] = useState<Attachment[]>([]);
//   const [chapterAttachments, setChapterAttachments] = useState<Attachment[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [recordingsExpanded, setRecordingsExpanded] = useState(false);

//   // Project Submission State
//   const [projectFile, setProjectFile] = useState<File | null>(null);
//   const [isSubmitting, setIsSubmitting] = useState(false); // For "Submitting" state
//   const [submissionStatus, setSubmissionStatus] = useState<string | null>(null); // "Done" or error message

//   // Fetch Recordings
//   const fetchRecordings = useCallback(async () => {
//     try {
//       console.log("Fetching recordings...");
//       const response = await axios.get(`/api/recordings`);
//       console.log("Recordings received:", response.data);
//       setRecordings(response.data || []);
//     } catch (error) {
//       console.error("Error fetching recordings:", error);
//     }
//   }, []);

//   // Fetch Attachments (Reference Materials)
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

//   // Fetch all data on component mount
//   useEffect(() => {
//     async function fetchData() {
//       await fetchRecordings();
//       await fetchAttachments();
//       setIsLoading(false);
//     }
//     fetchData();
//   }, [fetchRecordings, fetchAttachments]);

//   // Expand/Collapse Sections
//   const toggleExpandAll = () => {
//     setIsExpanded(!isExpanded);
//     setRecordingsExpanded(!recordingsExpanded);
//   };

//   // Handle Project Submission
//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files.length > 0) {
//       setProjectFile(e.target.files[0]);
//       setSubmissionStatus(null); // Reset status on new file selection
//     }
//   };

//   const handleSubmitProject = async () => {
//     if (!projectFile) {
//       setSubmissionStatus("Please select a file to upload.");
//       return;
//     }

//     setIsSubmitting(true);
//     setSubmissionStatus(null);

//     try {
//       const formData = new FormData();
//       formData.append("file", projectFile);

//       // Simulate API call to submit project (replace with your actual endpoint)
//       await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate network delay
//       setSubmissionStatus("Done");
//       setProjectFile(null); // Clear file after successful submission
//     } catch (error) {
//       console.error("Error submitting project:", error);
//       setSubmissionStatus("Failed to submit project. Please try again.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Google Classroom URL for live classes (replace with your actual link)
//   const googleClassroomUrl = "https://classroom.google.com/c/your-classroom-code";

//   // Dynamic Project Submission Details
//   const getDynamicProjectDetails = () => {
//     const now = new Date();
//     const opened = new Date(now);
//     const due = new Date(now);
//     due.setDate(now.getDate() + 4); // Due date is 4 days after opened
//     due.setHours(20, 0, 0, 0); // Set to 8:00 PM

//     const formatDate = (date: Date) => {
//       return date.toLocaleString("en-US", {
//         weekday: "long",
//         day: "numeric",
//         month: "long",
//         year: "numeric",
//         hour: "numeric",
//         minute: "numeric",
//         hour12: true,
//       });
//     };

//     return {
//       title: "Project Submission",
//       opened: formatDate(opened),
//       due: formatDate(due),
//     };
//   };

//   const projectDetails = getDynamicProjectDetails();

//   return (
//     <div className="min-h-screen w-full bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900 text-white overflow-y-auto p-4 sm:p-6 md:p-8">
//       <div className="w-full">
//         {isLoading ? (
//           <div className="text-center text-xl sm:text-2xl">Loading...</div>
//         ) : (
//           <>
//             {/* Top Categories Section */}
//             <div className="mb-6 w-full bg-gray-800 rounded-2xl p-4 sm:p-6">
//               <h2 className="text-lg sm:text-xl font-bold mb-4 text-center">Upcoming Classes</h2>
//               <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
//                 <div className="bg-red-500 p-3 rounded-lg text-center text-white">
//                   <p>Data Analytics</p>
//                   <p className="text-sm text-black">Advanced Analytics</p>
//                 </div>
//                 <div className="bg-green-500 p-3 rounded-lg text-center text-white">
//                   <p>Data Science</p>
//                   <p className="text-sm text-black">Machine learning Modals with AI</p>
//                 </div>
//                 <div className="bg-purple-500 p-3 rounded-lg text-center text-white">
//                   <p>Artificial Intelligence</p>
//                   <p className="text-sm text-black">AI Tools used to run Bussines</p>
//                 </div>
//                 <div className="bg-yellow-500 p-3 rounded-lg text-center text-white">
//                   <p>Machine Learning</p>
//                   <p className="text-sm text-black">From Basic to Advanced</p>
//                 </div>
//                 <div className="bg-blue-500 p-3 rounded-lg text-center text-white">
//                   <p>S/W Development</p>
//                   <p className="text-sm text-black">Both Frontend and Backend Development</p>
//                 </div>
                
//               </div>
//             </div>

//             {/* Expand/Collapse Button */}
//             <button
//               onClick={toggleExpandAll}
//               className="w-full p-3 sm:p-4 mb-6 bg-gray-800 hover:bg-gray-700 rounded-full text-left font-semibold text-sm sm:text-base transition duration-300 ease-in-out pl-4"
//             >
//               {isExpanded ? "Collapse All" : "Expand All"}
//             </button>

//             {/* Google Classroom for Live Classes Section */}
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

//             {/* Reference Materials Section */}
//             <details
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

//             {/* Project Submission Section */}
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
// import axios from "axios";
// import { File, Link as LinkIcon, Check } from "lucide-react";
// import Link from "next/link";
// import { Recording, Attachment } from "@prisma/client";
// import { useAuth } from "@clerk/nextjs"; // Clerk's client-side hook

// interface LivestreamProps {
//   courseId: string; // Added courseId prop
// }

// export default function Livestream({ courseId }: LivestreamProps) {
//   const { userId } = useAuth(); // Get userId from Clerk
//   const [recordings, setRecordings] = useState<Recording[]>([]);
//   const [courseAttachments, setCourseAttachments] = useState<Attachment[]>([]);
//   const [chapterAttachments, setChapterAttachments] = useState<Attachment[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [recordingsExpanded, setRecordingsExpanded] = useState(false);
//   const [hasPurchased, setHasPurchased] = useState<boolean | null>(null); // Track purchase status

//   // Project Submission State
//   const [projectFile, setProjectFile] = useState<File | null>(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submissionStatus, setSubmissionStatus] = useState<string | null>(null);

//   // Fetch Recordings
//   const fetchRecordings = useCallback(async () => {
//     if (!userId || !courseId) return;
//     try {
//       console.log(`Fetching recordings for course ${courseId}...`);
//       const response = await axios.get(`/api/recordings?courseId=${courseId}`);
//       console.log("Recordings received:", response.data);
//       setRecordings(response.data || []);
//       setHasPurchased(true); // If successful, user has purchased
//     } catch (error) {
//       console.error("Error fetching recordings:", error);
//       if (error.response?.status === 403) {
//         setHasPurchased(false); // Course not purchased
//       }
//     }
//   }, [userId, courseId]);

//   // Fetch Attachments (Reference Materials)
//   const fetchAttachments = useCallback(async () => {
//     if (!userId || !courseId) return;
//     try {
//       console.log(`Fetching attachments for course ${courseId}...`);
//       const response = await axios.get(`/api/attachments?courseId=${courseId}`);
//       console.log("Attachments received:", response.data);
//       setCourseAttachments(response.data.courseAttachments || []);
//       setChapterAttachments(response.data.chapterAttachments || []);
//       setHasPurchased(true); // If successful, user has purchased
//     } catch (error) {
//       console.error("Error fetching attachments:", error);
//       if (error.response?.status === 403) {
//         setHasPurchased(false); // Course not purchased
//       }
//     }
//   }, [userId, courseId]);

//   // Fetch all data on component mount
//   useEffect(() => {
//     async function fetchData() {
//       if (!userId) {
//         setIsLoading(false);
//         return;
//       }
//       setIsLoading(true);
//       await Promise.all([fetchRecordings(), fetchAttachments()]);
//       setIsLoading(false);
//     }
//     fetchData();
//   }, [fetchRecordings, fetchAttachments, userId]);

//   // Expand/Collapse Sections
//   const toggleExpandAll = () => {
//     setIsExpanded(!isExpanded);
//     setRecordingsExpanded(!recordingsExpanded);
//   };

//   // Handle Project Submission
//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files.length > 0) {
//       setProjectFile(e.target.files[0]);
//       setSubmissionStatus(null); // Reset status on new file selection
//     }
//   };

//   const handleSubmitProject = async () => {
//     if (!projectFile) {
//       setSubmissionStatus("Please select a file to upload.");
//       return;
//     }

//     setIsSubmitting(true);
//     setSubmissionStatus(null);

//     try {
//       const formData = new FormData();
//       formData.append("file", projectFile);

//       // Simulate API call to submit project (replace with your actual endpoint)
//       await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate network delay
//       setSubmissionStatus("Done");
//       setProjectFile(null); // Clear file after successful submission
//     } catch (error) {
//       console.error("Error submitting project:", error);
//       setSubmissionStatus("Failed to submit project. Please try again.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Google Classroom URL for live classes
//   const googleClassroomUrl = "https://classroom.google.com/c/your-classroom-code";

//   // Dynamic Project Submission Details
//   const getDynamicProjectDetails = () => {
//     const now = new Date();
//     const opened = new Date(now);
//     const due = new Date(now);
//     due.setDate(now.getDate() + 4);
//     due.setHours(20, 0, 0, 0);

//     const formatDate = (date: Date) => {
//       return date.toLocaleString("en-US", {
//         weekday: "long",
//         day: "numeric",
//         month: "long",
//         year: "numeric",
//         hour: "numeric",
//         minute: "numeric",
//         hour12: true,
//       });
//     };

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
//             {/* Top Categories Section */}
//             <div className="mb-6 w-full bg-gray-800 rounded-2xl p-4 sm:p-6">
//               <h2 className="text-lg sm:text-xl font-bold mb-4 text-center">Upcoming Classes</h2>
//               <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
//                 <div className="bg-red-500 p-3 rounded-lg text-center text-white">
//                   <p>Data Analytics</p>
//                   <p className="text-sm text-black">Advanced Analytics</p>
//                 </div>
//                 <div className="bg-green-500 p-3 rounded-lg text-center text-white">
//                   <p>Data Science</p>
//                   <p className="text-sm text-black">Machine learning Modals with AI</p>
//                 </div>
//                 <div className="bg-purple-500 p-3 rounded-lg text-center text-white">
//                   <p>Artificial Intelligence</p>
//                   <p className="text-sm text-black">AI Tools used to run Bussines</p>
//                 </div>
//                 <div className="bg-yellow-500 p-3 rounded-lg text-center text-white">
//                   <p>Machine Learning</p>
//                   <p className="text-sm text-black">From Basic to Advanced</p>
//                 </div>
//                 <div className="bg-blue-500 p-3 rounded-lg text-center text-white">
//                   <p>S/W Development</p>
//                   <p className="text-sm text-black">Both Frontend and Backend Development</p>
//                 </div>
//               </div>
//             </div>

//             {/* Expand/Collapse Button */}
//             <button
//               onClick={toggleExpandAll}
//               className="w-full p-3 sm:p-4 mb-6 bg-gray-800 hover:bg-gray-700 rounded-full text-left font-semibold text-sm sm:text-base transition duration-300 ease-in-out pl-4"
//             >
//               {isExpanded ? "Collapse All" : "Expand All"}
//             </button>

//             {/* Google Classroom for Live Classes Section */}
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

//             {/* Reference Materials Section */}
//             {hasPurchased === false ? (
//               <div className="p-3 sm:p-4 bg-gray-800 rounded-2xl text-gray-400 text-sm sm:text-base mb-4 sm:mb-6">
//                 <p className="pl-4">Purchase the course to access reference materials.</p>
//               </div>
//             ) : (
//               <details
//                 open={isExpanded}
//                 className="p-3 sm:p-4 bg-gray-800 rounded-2xl cursor-pointer transition-all duration-300 ease-in-out w-full mb-4 sm:mb-6"
//               >
//                 <summary className="flex justify-between items-start mb-4 text-base sm:text-lg font-bold pl-4">
//                   Reference Materials
//                 </summary>
//                 <ul className="pl-4 space-y-2 text-gray-300 text-sm sm:text-base">
//                   {courseAttachments.length > 0 || chapterAttachments.length > 0 ? (
//                     <>
//                       {/* Course Attachments */}
//                       {courseAttachments.map((item) => (
//                         <li key={item.id}>
//                           {item.url ? (
//                             <a
//                               href={item.url}
//                               target="_blank"
//                               rel="noopener noreferrer"
//                               className="flex items-start p-2 sm:p-3 w-full bg-sky-200 dark:bg-sky-800 text-sky-700 dark:text-sky-300 hover:underline rounded-lg"
//                             >
//                               <File className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
//                               <span className="line-clamp-1">{item.name}</span>
//                             </a>
//                           ) : (
//                             <span className="flex items-start">
//                               <File className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
//                               {item.name}
//                             </span>
//                           )}
//                         </li>
//                       ))}

//                       {/* Chapter Attachments */}
//                       {chapterAttachments.map((item) => (
//                         <li key={item.id}>
//                           {item.url ? (
//                             <a
//                               href={item.url}
//                               target="_blank"
//                               rel="noopener noreferrer"
//                               className="flex items-start p-2 sm:p-3 w-full bg-green-200 dark:bg-green-800 text-green-700 dark:text-green-300 hover:underline rounded-lg"
//                             >
//                               <File className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
//                               <span className="line-clamp-1">{item.name}</span>
//                             </a>
//                           ) : (
//                             <span className="flex items-start">
//                               <File className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
//                               {item.name}
//                             </span>
//                           )}
//                         </li>
//                       ))}
//                     </>
//                   ) : (
//                     <li className="text-gray-500 italic pl-4">No attachments available</li>
//                   )}
//                 </ul>
//               </details>
//             )}

//             {/* Recordings Section */}
//             {hasPurchased === false ? (
//               <div className="p-3 sm:p-4 bg-gray-800 rounded-2xl text-gray-400 text-sm sm:text-base mb-4 sm:mb-6">
//                 <p className="pl-4">Purchase the course to access recordings.</p>
//               </div>
//             ) : (
//               <details
//                 open={recordingsExpanded}
//                 className="p-3 sm:p-4 bg-gray-800 rounded-2xl cursor-pointer transition-all duration-300 ease-in-out w-full mb-4 sm:mb-6"
//               >
//                 <summary
//                   onClick={() => setRecordingsExpanded(!recordingsExpanded)}
//                   className="flex justify-between items-start mb-4 text-base sm:text-lg font-bold cursor-pointer pl-4"
//                 >
//                   Recordings
//                 </summary>
//                 <ul className="pl-4 space-y-3 sm:space-y-4 text-gray-300 text-sm sm:text-base">
//                   {recordings.length > 0 ? (
//                     recordings.map((recording) => (
//                       <li key={recording.id}>
//                         <div className="p-3 sm:p-4 bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
//                           <h4 className="font-semibold text-base sm:text-lg text-indigo-400 pl-4">
//                             {recording.title}
//                           </h4>
//                           <p className="text-blue-400 hover:text-blue-300 mt-2 pl-4">
//                             <Link
//                               href={recording.url}
//                               target="_blank"
//                               rel="noopener noreferrer"
//                               className="flex items-start group"
//                             >
//                               <LinkIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-blue-300 group-hover:text-blue-500 transition-colors" />
//                               <span className="underline decoration-dotted decoration-1 underline-offset-4">
//                                 {recording.url}
//                               </span>
//                             </Link>
//                           </p>
//                           {recording.duration && (
//                             <p className="text-gray-400 mt-1 pl-4">
//                               Duration: {recording.duration} minutes
//                             </p>
//                           )}
//                           <p className="text-gray-500 text-xs sm:text-sm mt-1 pl-4">
//                             Uploaded: {new Date(recording.uploadedAt).toLocaleDateString()}
//                           </p>
//                         </div>
//                       </li>
//                     ))
//                   ) : (
//                     <li className="text-gray-500 italic pl-4">No recordings available</li>
//                   )}
//                 </ul>
//               </details>
//             )}

//             {/* Project Submission Section */}
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

// interface LivestreamProps {
//   courseId: string;
// }

// export default function Livestream({ courseId }: LivestreamProps) {
//   const { userId } = useAuth();
//   const [recordings, setRecordings] = useState<Recording[]>([]);
//   const [courseAttachments, setCourseAttachments] = useState<Attachment[]>([]);
//   const [chapterAttachments, setChapterAttachments] = useState<Attachment[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [recordingsExpanded, setRecordingsExpanded] = useState(false);
//   const [hasPurchased, setHasPurchased] = useState<boolean | null>(null);
//   const [projectFile, setProjectFile] = useState<File | null>(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submissionStatus, setSubmissionStatus] = useState<string | null>(null);

//   const fetchRecordings = useCallback(async () => {
//     if (!userId || !courseId) return;
//     try {
//       console.log(`Fetching recordings for course ${courseId}...`);
//       const response = await axios.get<{ data: Recording[] }>(`/api/recordings?courseId=${courseId}`);
//       console.log("Recordings received:", response.data);
//       setRecordings(response.data.data || []);
//       setHasPurchased(true);
//     } catch (error) {
//       const axiosError = error as AxiosError;
//       console.error("Error fetching recordings:", axiosError);
//       if (axiosError.response?.status === 403) {
//         setHasPurchased(false);
//       }
//     }
//   }, [userId, courseId]);

//   const fetchAttachments = useCallback(async () => {
//     if (!userId || !courseId) return;
//     try {
//       console.log(`Fetching attachments for course ${courseId}...`);
//       const response = await axios.get<{
//         courseAttachments: Attachment[];
//         chapterAttachments: Attachment[];
//       }>(`/api/attachments?courseId=${courseId}`);
//       console.log("Attachments received:", response.data);
//       setCourseAttachments(response.data.courseAttachments || []);
//       setChapterAttachments(response.data.chapterAttachments || []);
//       setHasPurchased(true);
//     } catch (error) {
//       const axiosError = error as AxiosError;
//       console.error("Error fetching attachments:", axiosError);
//       if (axiosError.response?.status === 403) {
//         setHasPurchased(false);
//       }
//     }
//   }, [userId, courseId]);

//   useEffect(() => {
//     async function fetchData() {
//       if (!userId) {
//         setIsLoading(false);
//         return;
//       }
//       setIsLoading(true);
//       await Promise.all([fetchRecordings(), fetchAttachments()]);
//       setIsLoading(false);
//     }
//     fetchData();
//   }, [fetchRecordings, fetchAttachments, userId]);

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
//     if (!projectFile) {
//       setSubmissionStatus("Please select a file to upload.");
//       return;
//     }

//     setIsSubmitting(true);
//     setSubmissionStatus(null);

//     try {
//       const formData = new FormData();
//       formData.append("file", projectFile);
//       await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulated API call
//       setSubmissionStatus("Done");
//       setProjectFile(null);
//     } catch (error) {
//       console.error("Error submitting project:", error);
//       setSubmissionStatus("Failed to submit project. Please try again.");
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
//               <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
//                 <div className="bg-red-500 p-3 rounded-lg text-center text-white">
//                   <p>Data Analytics</p>
//                   <p className="text-sm text-black">Advanced Analytics</p>
//                 </div>
//                 <div className="bg-green-500 p-3 rounded-lg text-center text-white">
//                   <p>Data Science</p>
//                   <p className="text-sm text-black">Machine learning Modals with AI</p>
//                 </div>
//                 <div className="bg-purple-500 p-3 rounded-lg text-center text-white">
//                   <p>Artificial Intelligence</p>
//                   <p className="text-sm text-black">AI Tools used to run Bussines</p>
//                 </div>
//                 <div className="bg-yellow-500 p-3 rounded-lg text-center text-white">
//                   <p>Machine Learning</p>
//                   <p className="text-sm text-black">From Basic to Advanced</p>
//                 </div>
//                 <div className="bg-blue-500 p-3 rounded-lg text-center text-white">
//                   <p>S/W Development</p>
//                   <p className="text-sm text-black">Both Frontend and Backend Development</p>
//                 </div>
//               </div>
//             </div>

//             <button
//               onClick={toggleExpandAll}
//               className="w-full p-3 sm:p-4 mb-6 bg-gray-800 hover:bg-gray-700 rounded-full text-left font-semibold text-sm sm:text-base transition duration-300 ease-in-out pl-4"
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

//             {hasPurchased === false ? (
//               <div className="p-3 sm:p-4 bg-gray-800 rounded-2xl text-gray-400 text-sm sm:text-base mb-4 sm:mb-6">
//                 <p className="pl-4">Purchase the course to access reference materials.</p>
//               </div>
//             ) : (
//               <details
//                 open={isExpanded}
//                 className="p-3 sm:p-4 bg-gray-800 rounded-2xl cursor-pointer transition-all duration-300 ease-in-out w-full mb-4 sm:mb-6"
//               >
//                 <summary className="flex justify-between items-start mb-4 text-base sm:text-lg font-bold pl-4">
//                   Reference Materials
//                 </summary>
//                 <ul className="pl-4 space-y-2 text-gray-300 text-sm sm:text-base">
//                   {courseAttachments.length > 0 || chapterAttachments.length > 0 ? (
//                     <>
//                       {courseAttachments.map((item) => (
//                         <li key={item.id}>
//                           {item.url ? (
//                             <a
//                               href={item.url}
//                               target="_blank"
//                               rel="noopener noreferrer"
//                               className="flex items-start p-2 sm:p-3 w-full bg-sky-200 dark:bg-sky-800 text-sky-700 dark:text-sky-300 hover:underline rounded-lg"
//                             >
//                               <File className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
//                               <span className="line-clamp-1">{item.name}</span>
//                             </a>
//                           ) : (
//                             <span className="flex items-start">
//                               <File className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
//                               {item.name}
//                             </span>
//                           )}
//                         </li>
//                       ))}
//                       {chapterAttachments.map((item) => (
//                         <li key={item.id}>
//                           {item.url ? (
//                             <a
//                               href={item.url}
//                               target="_blank"
//                               rel="noopener noreferrer"
//                               className="flex items-start p-2 sm:p-3 w-full bg-green-200 dark:bg-green-800 text-green-700 dark:text-green-300 hover:underline rounded-lg"
//                             >
//                               <File className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
//                               <span className="line-clamp-1">{item.name}</span>
//                             </a>
//                           ) : (
//                             <span className="flex items-start">
//                               <File className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
//                               {item.name}
//                             </span>
//                           )}
//                         </li>
//                       ))}
//                     </>
//                   ) : (
//                     <li className="text-gray-500 italic pl-4">No attachments available</li>
//                   )}
//                 </ul>
//               </details>
//             )}

//             {hasPurchased === false ? (
//               <div className="p-3 sm:p-4 bg-gray-800 rounded-2xl text-gray-400 text-sm sm:text-base mb-4 sm:mb-6">
//                 <p className="pl-4">Purchase the course to access recordings.</p>
//               </div>
//             ) : (
//               <details
//                 open={recordingsExpanded}
//                 className="p-3 sm:p-4 bg-gray-800 rounded-2xl cursor-pointer transition-all duration-300 ease-in-out w-full mb-4 sm:mb-6"
//               >
//                 <summary
//                   onClick={() => setRecordingsExpanded(!recordingsExpanded)}
//                   className="flex justify-between items-start mb-4 text-base sm:text-lg font-bold cursor-pointer pl-4"
//                 >
//                   Recordings
//                 </summary>
//                 <ul className="pl-4 space-y-3 sm:space-y-4 text-gray-300 text-sm sm:text-base">
//                   {recordings.length > 0 ? (
//                     recordings.map((recording) => (
//                       <li key={recording.id}>
//                         <div className="p-3 sm:p-4 bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
//                           <h4 className="font-semibold text-base sm:text-lg text-indigo-400 pl-4">
//                             {recording.title}
//                           </h4>
//                           <p className="text-blue-400 hover:text-blue-300 mt-2 pl-4">
//                             <Link
//                               href={recording.url}
//                               target="_blank"
//                               rel="noopener noreferrer"
//                               className="flex items-start group"
//                             >
//                               <LinkIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-blue-300 group-hover:text-blue-500 transition-colors" />
//                               <span className="underline decoration-dotted decoration-1 underline-offset-4">
//                                 {recording.url}
//                               </span>
//                             </Link>
//                           </p>
//                           {recording.duration && (
//                             <p className="text-gray-400 mt-1 pl-4">
//                               Duration: {recording.duration} minutes
//                             </p>
//                           )}
//                           <p className="text-gray-500 text-xs sm:text-sm mt-1 pl-4">
//                             Uploaded: {new Date(recording.uploadedAt).toLocaleDateString()}
//                           </p>
//                         </div>
//                       </li>
//                     ))
//                   ) : (
//                     <li className="text-gray-500 italic pl-4">No recordings available</li>
//                   )}
//                 </ul>
//               </details>
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





import Livestream from "@/components/livestream"; // Adjust path as needed

interface LivestreamPageProps {
  params: {
    courseId: string;
  };
}

export default function LivestreamPage({ params }: LivestreamPageProps) {
  return <Livestream courseId={params.courseId} />;
}