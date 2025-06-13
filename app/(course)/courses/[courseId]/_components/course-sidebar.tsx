// import { auth } from "@clerk/nextjs/server";
// import { Chapter, Course, UserProgress } from "@prisma/client";
// import { redirect } from "next/navigation";
// import { db } from "@/lib/db";
// import { CourseProgress } from "@/components/course-progress";
// import { CourseSidebarItem } from "./course-sidebar-item";
// import QuizButton from "./quiz-button";
// import ChapterQuizButton from "./chapter-quiz-button";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import { Logo } from "./logo"


// interface CourseSidebarProps {
//   course: Course & {
//     chapters: (Chapter & {
//       userProgress: UserProgress[] | null;
//     })[];
//   };
//   progressCount: number;
//   quizId: string;
// }

// export const CourseSidebar = async ({
//   course,
//   progressCount,
//   quizId,
// }: CourseSidebarProps) => {
//   const { userId } = auth();

//   if (!userId) {
//     return redirect("/");
//   }

//   const purchase = await db.purchase.findUnique({
//     where: {
//       userId_courseId: {
//         userId,
//         courseId: course.id,
//       },
//     },
//   });

//   // Check if all chapters are completed
//   const allChaptersCompleted = course.chapters.every(
//     (chapter) => !!chapter.userProgress?.[0]?.isCompleted
//   );

//   return (
//     <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
//       <div className="p-6 pb-19 bg-white">
//                     <div className=""> 
//                      <Logo/> 
//                      </div>  
//             </div>
//       <div className="p-8 flex flex-col border-b">
//         <h1
//           className="font-semibold"
//           style={{
//             color: "gold",
//             backgroundColor: "#6A0DAD",
//             padding: "10px 8px",
//             borderRadius: "4px",
//             fontSize: "16px",
//             overflow: "hidden",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           <div>{course.title}</div>
          
//         </h1>
//         {purchase && (
//           <div className="mt-10">
//             <CourseProgress variant="success" value={progressCount} />
//           </div>
//         )}
//       </div>

//       <div className="flex flex-col w-full">
//         {course.chapters.map((chapter) => (
//           <div key={chapter.id}>
//             <CourseSidebarItem
//               id={chapter.id}
//               label={chapter.title}
//               isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
//               courseId={course.id}
//               isLocked={!chapter.isFree && !purchase}
//             />

//             {/* Chapter Quiz Button */}
//             {!!chapter.userProgress?.[0]?.isCompleted && (
//               <div className="p-4">
//                 {/* Ensure quizId is passed with a valid value */}
//                 <ChapterQuizButton
//                   courseId={course.id}
//                   chapterId={chapter.id}
//                 />

//               </div>
//             )}
//           </div>
//         ))}
//       </div>

//       {allChaptersCompleted && (
//         <div className="p-4">
//           <QuizButton courseId={course.id} quizId={quizId} />
//         </div>
//       )}

//       {!allChaptersCompleted && (
//         <div className="p-6 bg-gradient-to-r from-indigo-500 to-purple-600 border-l-4 border-purple-400 text-white rounded-lg shadow-lg animate__animated animate__pulse">
//           <span className="w-full text-center">
//             <h2 className="text-2xl font-extrabold mb-2">🚀 Unlock the Final Quiz!</h2>
         
//           </span>
//         </div>
//       )}
//     </div>
//   );
// };



 


// import { auth } from "@clerk/nextjs/server";
// import { Chapter, Course, UserProgress, ChapterAttachment } from "@prisma/client";
// import { redirect } from "next/navigation";
// import { db } from "@/lib/db";
// import { CourseProgress } from "@/components/course-progress";
// import { CourseSidebarItem } from "./course-sidebar-item";
// import QuizButton from "./quiz-button";
// import ChapterQuizButton from "./chapter-quiz-button";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import { Logo } from "./logo";

// interface CourseSidebarProps {
//   course: Course & {
//     chapters: (Chapter & {
//       userProgress: UserProgress[] | null;
//       chapterattachments: ChapterAttachment[];
//     })[];
//   };
//   progressCount: number;
//   quizId: string;
// }

// export const CourseSidebar = async ({
//   course,
//   progressCount,
//   quizId,
// }: CourseSidebarProps) => {
//   const { userId } = auth();

//   if (!userId) {
//     return redirect("/");
//   }

//   const purchase = await db.purchase.findUnique({
//     where: {
//       userId_courseId: {
//         userId,
//         courseId: course.id,
//       },
//     },
//   });

//   // Check if all chapters are completed
//   const allChaptersCompleted = course.chapters.every(
//     (chapter) => !!chapter.userProgress?.[0]?.isCompleted
//   );

//   return (
//     <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
//       <div className="p-6 pb-19 bg-white">
//         <Logo />
//       </div>
//       <div className="p-8 flex flex-col border-b">
//         <h1
//           className="font-semibold"
//           style={{
//             color: "gold",
//             backgroundColor: "#6A0DAD",
//             padding: "10px 8px",
//             borderRadius: "4px",
//             fontSize: "16px",
//             overflow: "hidden",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           {course.title}
//         </h1>
//         {purchase && (
//           <div className="mt-10">
//             <CourseProgress variant="success" value={progressCount} />
//           </div>
//         )}
//       </div>

//       <div className="flex flex-col w-full">
//         {course.chapters.map((chapter) => (
//           <div key={chapter.id} className="mb-4">
//             <CourseSidebarItem
//               id={chapter.id}
//               label={chapter.title}
//               isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
//               courseId={course.id}
//               isLocked={!chapter.isFree && !purchase}
//             />

//             {/* Chapter Attachments Dropdown */}
//             <div className="ml-4 mt-2">
//               {chapter.chapterattachments?.length > 0 && (
//                 <details>
//                   <summary className="text-sm text-gray-500 cursor-pointer">
//                     Attachments ({chapter.chapterattachments.length})
//                   </summary>
//                   <div className="mt-2">
//                     {chapter.chapterattachments.map((attachment) => (
//                       <div key={attachment.id} className="mb-1">
//                         <a 
//                           href={attachment.url} 
//                           target="_blank" 
//                           rel="noopener noreferrer"
//                           className="text-blue-600 hover:underline text-xs"
//                         >
//                           {attachment.name}
//                         </a>
//                       </div>
//                     ))}
//                   </div>
//                 </details>
//               )}
//             </div>

//             {/* Chapter Quiz Button */}
//             {!!chapter.userProgress?.[0]?.isCompleted && (
//               <div className="p-4">
//                 <ChapterQuizButton
//                   courseId={course.id}
//                   chapterId={chapter.id}
//                 />
//               </div>
//             )}
//           </div>
//         ))}
//       </div>

//       {allChaptersCompleted && (
//         <div className="p-4">
//           <QuizButton courseId={course.id} quizId={quizId} />
//         </div>
//       )}

//       {!allChaptersCompleted && (
//         <div className="p-6 bg-gradient-to-r from-indigo-500 to-purple-600 border-l-4 border-purple-400 text-white rounded-lg shadow-lg animate__animated animate__pulse">
//           <span className="w-full text-center">
//             <h2 className="text-2xl font-extrabold mb-2">🚀 Unlock the Final Quiz!</h2>
//           </span>
//         </div>
//       )}
//     </div>
//   );
// };






// import { auth } from "@clerk/nextjs/server";
// import { Chapter, Course, UserProgress, ChapterAttachment } from "@prisma/client";
// import { redirect } from "next/navigation";
// import { db } from "@/lib/db";
// import { CourseProgress } from "@/components/course-progress";
// import { CourseSidebarItem } from "./course-sidebar-item";
// import QuizButton from "./quiz-button";
// import ChapterQuizButton from "./chapter-quiz-button";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import { Logo } from "./logo";

// interface CourseSidebarProps {
//   course: Course & {
//     chapters: (Chapter & {
//       userProgress: UserProgress[] | null;
//       chapterattachments: ChapterAttachment[];
//     })[];
//   };
//   progressCount: number;
//   quizId: string;
// }

// export const CourseSidebar = async ({
//   course,
//   progressCount,
//   quizId,
// }: CourseSidebarProps) => {
//   const { userId } = auth();

//   if (!userId) {
//     return redirect("/");
//   }

//   const purchase = await db.purchase.findUnique({
//     where: {
//       userId_courseId: {
//         userId,
//         courseId: course.id,
//       },
//     },
//   });

//   // Check if all chapters are completed
//   const allChaptersCompleted = course.chapters.every(
//     (chapter) => !!chapter.userProgress?.[0]?.isCompleted
//   );

//   return (
//     <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
//       <div className="p-6 pb-19 bg-white">
//         <Logo />
//       </div>
//       <div className="p-8 flex flex-col border-b">
//         <h1
//           className="font-semibold"
//           style={{
//             color: "gold",
//             backgroundColor: "#6A0DAD",
//             padding: "10px 8px",
//             borderRadius: "4px",
//             fontSize: "16px",
//             overflow: "hidden",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           {course.title}
//         </h1>
//         {purchase && (
//           <div className="mt-10">
//             <CourseProgress variant="success" value={progressCount} />
//           </div>
//         )}
//       </div>

//       <div className="flex flex-col w-full">
//         {course.chapters.map((chapter) => (
//           <div key={chapter.id} className="mb-4">
//             <CourseSidebarItem
//               id={chapter.id}
//               label={chapter.title}
//               isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
//               courseId={course.id}
//               isLocked={!chapter.isFree && !purchase}
//             />

//             {/* Chapter Attachments Dropdown */}
//             <div className="ml-4 mt-2">
//               {chapter.chapterattachments && chapter.chapterattachments.length > 0 && (
//                 <details>
//                   <summary className="text-sm text-gray-500 cursor-pointer">
//                     Attachments ({chapter.chapterattachments.length})
//                   </summary>
//                   <div className="mt-2">
//                     {chapter.chapterattachments.map((attachment) => (
//                       <div key={attachment.id} className="mb-1">
//                         <a 
//                           href={attachment.url} 
//                           target="_blank" 
//                           rel="noopener noreferrer"
//                           className="text-blue-600 hover:underline text-xs"
//                         >
//                           {attachment.name}
//                         </a>
//                       </div>
//                     ))}
//                   </div>
//                 </details>
//               )}
//             </div>

//             {/* Chapter Quiz Button */}
//             {!!chapter.userProgress?.[0]?.isCompleted && (
//               <div className="p-4">
//                 <ChapterQuizButton
//                   courseId={course.id}
//                   chapterId={chapter.id}
//                 />
//               </div>
//             )}
//           </div>
//         ))}
//       </div>

//       {allChaptersCompleted && (
//         <div className="p-4">
//           <QuizButton courseId={course.id} quizId={quizId} />
//         </div>
//       )}

//       {!allChaptersCompleted && (
//         <div className="p-6 bg-gradient-to-r from-indigo-500 to-purple-600 border-l-4 border-purple-400 text-white rounded-lg shadow-lg animate__animated animate__pulse">
//           <span className="w-full text-center">
//             <h2 className="text-2xl font-extrabold mb-2">🚀 Unlock the Final Quiz!</h2>
//           </span>
//         </div>
//       )}
//     </div>
//   );
// };












// import { auth } from "@clerk/nextjs/server";
// import { Chapter, Course, UserProgress, ChapterAttachment } from "@prisma/client";
// import { redirect } from "next/navigation";
// import { db } from "@/lib/db";
// import { CourseProgress } from "@/components/course-progress";
// import { CourseSidebarItem } from "./course-sidebar-item";
// import QuizButton from "./quiz-button";
// import ChapterQuizButton from "./chapter-quiz-button";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import { Logo } from "./logo";

// interface CourseSidebarProps {
//   course: Course & {
//     chapters: (Chapter & {
//       userProgress: UserProgress[] | null;
//       chapterattachments: ChapterAttachment[];
//     })[];
//   };
//   progressCount: number;
//   quizId: string;
// }

// export const CourseSidebar = async ({
//   course,
//   progressCount,
//   quizId,
// }: CourseSidebarProps) => {
//   const { userId } = auth();

//   if (!userId) {
//     return redirect("/");
//   }

//   const purchase = await db.purchase.findUnique({
//     where: {
//       userId_courseId: {
//         userId,
//         courseId: course.id,
//       },
//     },
//   });

//   // Check if all chapters are completed
//   const allChaptersCompleted = course.chapters.every(
//     (chapter) => !!chapter.userProgress?.[0]?.isCompleted
//   );

//   return (
//     <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
//       <div className="p-6 pb-19 bg-white">
//         <Logo />
//       </div>
//       <div className="p-8 flex flex-col border-b">
//         <h1
//           className="font-semibold"
//           style={{
//             color: "gold",
//             backgroundColor: "#6A0DAD",
//             padding: "10px 8px",
//             borderRadius: "4px",
//             fontSize: "16px",
//             overflow: "hidden",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           {course.title}
//         </h1>
//         {purchase && (
//           <div className="mt-10">
//             <CourseProgress variant="success" value={progressCount} />
//           </div>
//         )}
//       </div>

//       <div className="flex flex-col w-full">
//         {course.chapters.map((chapter) => (
//           <div key={chapter.id} className="mb-4">
//             <CourseSidebarItem
//               id={chapter.id}
//               label={chapter.title}
//               isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
//               courseId={course.id}
//               isLocked={!chapter.isFree && !purchase}
//             />

//             {/* Chapter Attachments Dropdown - Updated Design */}
//             <div className="ml-4 mt-2">
//               {chapter.chapterattachments && chapter.chapterattachments.length > 0 && (
//                 <details className="group">
//                   <summary className="text-base font-medium text-gray-700 cursor-pointer flex items-center p-2 rounded-md hover:bg-gray-100 transition-colors duration-200">
//                     <span className="mr-2 text-[#FF0000]">📎</span> {/* Simple icon for attachments */}
//                     <span className="text-[#3b2f85]">Chapter Attachments ({chapter.chapterattachments.length})</span>
//                   </summary>
//                   <div className="mt-2 pl-4 pr-2">
//                     {chapter.chapterattachments.map((attachment) => (
//                       <div
//                         key={attachment.id}
//                         className="mb-2 p-3 bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
//                       >
//                         <a
//                           href={attachment.url}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="flex items-center text-blue-700 font-medium text-sm hover:text-blue-900 transition-colors duration-200"
//                         >
//                           <span className="mr-2">📄</span> {/* Icon for file */}
//                           <span className="truncate">{attachment.name}</span>
//                         </a>
//                       </div>
//                     ))}
//                   </div>
//                 </details>
//               )}
//             </div>

//             {/* Chapter Quiz Button */}
//             {!!chapter.userProgress?.[0]?.isCompleted && (
//               <div className="p-4">
//                 <ChapterQuizButton
//                   courseId={course.id}
//                   chapterId={chapter.id}
//                 />
//               </div>
//             )}
//           </div>
//         ))}
//       </div>

//       {allChaptersCompleted && (
//         <div className="p-4">
//           <QuizButton courseId={course.id} quizId={quizId} />
//         </div>
//       )}

//       {!allChaptersCompleted && (
//         <div className="p-6 bg-gradient-to-r from-indigo-500 to-purple-600 border-l-4 border-purple-400 text-white rounded-lg shadow-lg animate__animated animate__pulse">
//           <span className="w-full text-center">
//             <h2 className="text-2xl font-extrabold mb-2">🚀 Unlock the Final Quiz!</h2>
//           </span>
//         </div>
//       )}
//     </div>
//   );
// };






// import { auth } from "@clerk/nextjs/server";
// import { Chapter, Course, UserProgress, ChapterAttachment } from "@prisma/client";
// import { redirect } from "next/navigation";
// import { db } from "@/lib/db";
// import { CourseProgress } from "@/components/course-progress";
// import { CourseSidebarItem } from "./course-sidebar-item";
// import QuizButton from "./quiz-button";
// import ChapterQuizButton from "./chapter-quiz-button";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import { Logo } from "./logo";
// import axios from "axios";

// interface CourseSidebarProps {
//   course: Course & {
//     chapters: (Chapter & {
//       userProgress: UserProgress[] | null;
//       chapterattachments: ChapterAttachment[];
//     })[];
//   };
//   progressCount: number;
//   quizId: string;
// }

// export const CourseSidebar = async ({
//   course,
//   progressCount,
//   quizId,
// }: CourseSidebarProps) => {
//   const { userId } = auth();

//   if (!userId) {
//     return redirect("/");
//   }

//   const purchase = await db.purchase.findUnique({
//     where: {
//       userId_courseId: {
//         userId,
//         courseId: course.id,
//       },
//     },
//   });

//   // Fetch quiz pass status for each chapter
//   const chapterQuizStatus = await Promise.all(
//     course.chapters.map(async (chapter) => {
//       const response = await axios.get(`/api/courses/${course.id}/chapters/${chapter.id}/chapterquizzes/results`, {
//         headers: { "user-id": userId },
//       });
//       const scorePercentage = response.data.score / response.data.totalQuestions * 100;
//       return { chapterId: chapter.id, passed: scorePercentage >= 60 };
//     })
//   );

//   const allChaptersCompleted = course.chapters.every(
//     (chapter) => !!chapter.userProgress?.[0]?.isCompleted
//   );

//   return (
//     <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
//       <div className="p-6 pb-19 bg-white">
//         <Logo />
//       </div>
//       <div className="p-8 flex flex-col border-b">
//         <h1
//           className="font-semibold"
//           style={{
//             color: "gold",
//             backgroundColor: "#6A0DAD",
//             padding: "10px 8px",
//             borderRadius: "4px",
//             fontSize: "16px",
//             overflow: "hidden",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           {course.title}
//         </h1>
//         {purchase && (
//           <div className="mt-10">
//             <CourseProgress variant="success" value={progressCount} />
//           </div>
//         )}
//       </div>

//       <div className="flex flex-col w-full">
//         {course.chapters.map((chapter, index) => {
//           const isCurrentChapterPassed = chapterQuizStatus.find(status => status.chapterId === chapter.id)?.passed || false;
//           const isPreviousChapterPassed = index === 0 || chapterQuizStatus[index - 1]?.passed || false;

//           return (
//             <div key={chapter.id} className="mb-4">
//               <CourseSidebarItem
//                 id={chapter.id}
//                 label={chapter.title}
//                 isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
//                 courseId={course.id}
//                 isLocked={!chapter.isFree && !purchase || !isPreviousChapterPassed}
//               />

//               {/* Chapter Attachments Dropdown */}
//               <div className="ml-4 mt-2">
//                 {chapter.chapterattachments && chapter.chapterattachments.length > 0 && (
//                   <details className="group">
//                     <summary className="text-base font-medium text-gray-700 cursor-pointer flex items-center p-2 rounded-md hover:bg-gray-100 transition-colors duration-200">
//                       <span className="mr-2 text-[#FF0000]">📎</span>
//                       <span className="text-[#3b2f85]">Chapter Attachments ({chapter.chapterattachments.length})</span>
//                     </summary>
//                     <div className="mt-2 pl-4 pr-2">
//                       {chapter.chapterattachments.map((attachment) => (
//                         <div
//                           key={attachment.id}
//                           className="mb-2 p-3 bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
//                         >
//                           <a
//                             href={attachment.url}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="flex items-center text-blue-700 font-medium text-sm hover:text-blue-900 transition-colors duration-200"
//                           >
//                             <span className="mr-2">📄</span>
//                             <span className="truncate">{attachment.name}</span>
//                           </a>
//                         </div>
//                       ))}
//                     </div>
//                   </details>
//                 )}
//               </div>

//               {/* Chapter Quiz Button */}
//               {!!chapter.userProgress?.[0]?.isCompleted && isPreviousChapterPassed && (
//                 <div className="p-4">
//                   <ChapterQuizButton
//                     courseId={course.id}
//                     chapterId={chapter.id}
//                   />
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>

//       {allChaptersCompleted && (
//         <div className="p-4">
//           <QuizButton courseId={course.id} quizId={quizId} />
//         </div>
//       )}

//       {!allChaptersCompleted && (
//         <div className="p-6 bg-gradient-to-r from-indigo-500 to-purple-600 border-l-4 border-purple-400 text-white rounded-lg shadow-lg animate__animated animate__pulse">
//           <span className="w-full text-center">
//             <h2 className="text-2xl font-extrabold mb-2">🚀 Unlock the Final Quiz!</h2>
//           </span>
//         </div>
//       )}
//     </div>
//   );
// };





// import { auth, clerkClient } from "@clerk/nextjs/server";
// import { Chapter, Course, UserProgress, ChapterAttachment } from "@prisma/client";
// import { redirect } from "next/navigation";
// import { db } from "@/lib/db";
// import { CourseProgress } from "@/components/course-progress";
// import { CourseSidebarItem } from "./course-sidebar-item";
// import QuizButton from "./quiz-button";
// import ChapterQuizButton from "./chapter-quiz-button";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import { Logo } from "./logo";
// import axios from "axios";

// // Base URL for server-side requests
// const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// interface CourseSidebarProps {
//   course: Course & {
//     chapters: (Chapter & {
//       userProgress: UserProgress[] | null;
//       chapterattachments: ChapterAttachment[];
//     })[];
//   };
//   progressCount: number;
//   quizId: string;
// }

// export const CourseSidebar = async ({
//   course,
//   progressCount,
//   quizId,
// }: CourseSidebarProps) => {
//   const { userId, getToken } = auth();

//   if (!userId) {
//     return redirect("/");
//   }

//   const purchase = await db.purchase.findUnique({
//     where: {
//       userId_courseId: {
//         userId,
//         courseId: course.id,
//       },
//     },
//   });

//   // Get Clerk auth token for server-side API requests
//   const token = await getToken({ template: "default" }); // Adjust template if needed

//   // Fetch quiz pass status for each chapter
//   const chapterQuizStatus = await Promise.all(
//     course.chapters.map(async (chapter) => {
//       try {
//         const response = await axios.get(
//           `${BASE_URL}/api/courses/${course.id}/chapters/${chapter.id}/chapterquizzes/results`,
//           {
//             headers: {
//               "user-id": userId,
//               Authorization: `Bearer ${token}`, // Pass Clerk token
//             },
//           }
//         );
//         const scorePercentage = response.data.score / response.data.totalQuestions * 100;
//         return { chapterId: chapter.id, passed: scorePercentage >= 60 };
//       } catch (error) {
//         console.error(`Failed to fetch quiz results for chapter ${chapter.id}:`, error);
//         return { chapterId: chapter.id, passed: false }; // Default to not passed
//       }
//     })
//   );

//   const allChaptersCompleted = course.chapters.every(
//     (chapter) => !!chapter.userProgress?.[0]?.isCompleted
//   );

//   return (
//     <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
//       <div className="p-6 pb-19 bg-white">
//         <Logo />
//       </div>
//       <div className="p-8 flex flex-col border-b">
//         <h1
//           className="font-semibold"
//           style={{
//             color: "gold",
//             backgroundColor: "#6A0DAD",
//             padding: "10px 8px",
//             borderRadius: "4px",
//             fontSize: "16px",
//             overflow: "hidden",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           {course.title}
//         </h1>
//         {purchase && (
//           <div className="mt-10">
//             <CourseProgress variant="success" value={progressCount} />
//           </div>
//         )}
//       </div>

//       <div className="flex flex-col w-full">
//         {course.chapters.map((chapter, index) => {
//           const isCurrentChapterPassed =
//             chapterQuizStatus.find((status) => status.chapterId === chapter.id)?.passed || false;
//           const isPreviousChapterPassed =
//             index === 0 || chapterQuizStatus[index - 1]?.passed || false;

//           return (
//             <div key={chapter.id} className="mb-4">
//               <CourseSidebarItem
//                 id={chapter.id}
//                 label={chapter.title}
//                 isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
//                 courseId={course.id}
//                 isLocked={!chapter.isFree && !purchase || !isPreviousChapterPassed}
//               />

//               {/* Chapter Attachments Dropdown */}
//               <div className="ml-4 mt-2">
//                 {chapter.chapterattachments && chapter.chapterattachments.length > 0 && (
//                   <details className="group">
//                     <summary className="text-base font-medium text-gray-700 cursor-pointer flex items-center p-2 rounded-md hover:bg-gray-100 transition-colors duration-200">
//                       <span className="mr-2 text-[#FF0000]">📎</span>
//                       <span className="text-[#3b2f85]">
//                         Chapter Attachments ({chapter.chapterattachments.length})
//                       </span>
//                     </summary>
//                     <div className="mt-2 pl-4 pr-2">
//                       {chapter.chapterattachments.map((attachment) => (
//                         <div
//                           key={attachment.id}
//                           className="mb-2 p-3 bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
//                         >
//                           <a
//                             href={attachment.url}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="flex items-center text-blue-700 font-medium text-sm hover:text-blue-900 transition-colors duration-200"
//                           >
//                             <span className="mr-2">📄</span>
//                             <span className="truncate">{attachment.name}</span>
//                           </a>
//                         </div>
//                       ))}
//                     </div>
//                   </details>
//                 )}
//               </div>

//               {/* Chapter Quiz Button */}
//               {!!chapter.userProgress?.[0]?.isCompleted && isPreviousChapterPassed && (
//                 <div className="p-4">
//                   <ChapterQuizButton courseId={course.id} chapterId={chapter.id} />
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>

//       {allChaptersCompleted && (
//         <div className="p-4">
//           <QuizButton courseId={course.id} quizId={quizId} />
//         </div>
//       )}

//       {!allChaptersCompleted && (
//         <div className="p-6 bg-gradient-to-r from-indigo-500 to-purple-600 border-l-4 border-purple-400 text-white rounded-lg shadow-lg animate__animated animate__pulse">
//           <span className="w-full text-center">
//             <h2 className="text-2xl font-extrabold mb-2">🚀 Unlock the Final Quiz!</h2>
//           </span>
//         </div>
//       )}
//     </div>
//   );
// };






// import { auth } from "@clerk/nextjs/server";
// import { Chapter, Course, UserProgress, ChapterAttachment } from "@prisma/client";
// import { redirect } from "next/navigation";
// import { db } from "@/lib/db";
// import { CourseProgress } from "@/components/course-progress";
// import { CourseSidebarItem } from "./course-sidebar-item";
// import QuizButton from "./quiz-button";
// import ChapterQuizButton from "./chapter-quiz-button";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import { Logo } from "./logo";
// import axios from "axios";

// // Base URL for server-side requests
// const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// interface CourseSidebarProps {
//   course: Course & {
//     chapters: (Chapter & {
//       userProgress: UserProgress[] | null;
//       chapterattachments: ChapterAttachment[];
//     })[];
//   };
//   progressCount: number;
//   quizId: string;
// }

// export const CourseSidebar = async ({
//   course,
//   progressCount,
//   quizId,
// }: CourseSidebarProps) => {
//   const { userId, getToken } = auth();

//   if (!userId) {
//     return redirect("/");
//   }

//   const purchase = await db.purchase.findUnique({
//     where: {
//       userId_courseId: {
//         userId,
//         courseId: course.id,
//       },
//     },
//   });

//   // Fetch Clerk auth token for server-side API requests
//   const token = await getToken(); // Default usage, no template specified unless required

//   // Fetch quiz pass status for each chapter
//   const chapterQuizStatus = await Promise.all(
//     course.chapters.map(async (chapter) => {
//       try {
//         const response = await axios.get(
//           `${BASE_URL}/api/courses/${course.id}/chapters/${chapter.id}/chapterquizzes/results`,
//           {
//             headers: {
//               "user-id": userId,
//               Authorization: token ? `Bearer ${token}` : undefined, // Use token if available
//             },
//           }
//         );
//         const scorePercentage = response.data.score / response.data.totalQuestions * 100;
//         return { chapterId: chapter.id, passed: scorePercentage >= 60 };
//       } catch (error) {
//         console.error(`Failed to fetch quiz results for chapter ${chapter.id}:`, error);
//         return { chapterId: chapter.id, passed: false }; // Default to not passed
//       }
//     })
//   );

//   const allChaptersCompleted = course.chapters.every(
//     (chapter) => !!chapter.userProgress?.[0]?.isCompleted
//   );

//   return (
//     <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
//       <div className="p-4 pb-5 bg-white">
//         <Logo />
//       </div>
//       <div className="p-8 flex flex-col border-b">
//         <h1
//           className="font-semibold"
//           style={{
//             color: "gold",
//             backgroundColor: "#6A0DAD",
//             padding: "8px 8px",
//             borderRadius: "2px",
//             fontSize: "16px",
//             overflow: "hidden",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           {course.title}
//         </h1>
//         {purchase && (
//           <div className="mt-5">
//             <CourseProgress variant="success" value={progressCount} />
//           </div>
//         )}
//       </div>

//       <div className="flex flex-col w-full">
//         {course.chapters.map((chapter, index) => {
//           const isCurrentChapterPassed =
//             chapterQuizStatus.find((status) => status.chapterId === chapter.id)?.passed || false;
//           const isPreviousChapterPassed =
//             index === 0 || chapterQuizStatus[index - 1]?.passed || false;

//           return (
//             <div key={chapter.id} className="mb-4">
//               <CourseSidebarItem
//                 id={chapter.id}
//                 label={chapter.title}
//                 isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
//                 courseId={course.id}
//                 isLocked={!chapter.isFree && !purchase || !isPreviousChapterPassed}
//               />

//               {/* Chapter Attachments Dropdown */}
//               <div className="ml-4 mt-2">
//                 {chapter.chapterattachments && chapter.chapterattachments.length > 0 && (
//                   <details className="group">
//                     <summary className="text-base font-medium text-gray-700 cursor-pointer flex items-center p-2 rounded-md hover:bg-gray-100 transition-colors duration-200">
//                       <span className="mr-2 text-[#FF0000]">📎</span>
//                       <span className="text-[#3b2f85]">
//                         Chapter Attachments ({chapter.chapterattachments.length})
//                       </span>
//                     </summary>
//                     <div className="mt-2 pl-4 pr-2">
//                       {chapter.chapterattachments.map((attachment) => (
//                         <div
//                           key={attachment.id}
//                           className="mb-2 p-3 bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
//                         >
//                           <a
//                             href={attachment.url}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="flex items-center text-blue-700 font-medium text-sm hover:text-blue-900 transition-colors duration-200"
//                           >
//                             <span className="mr-2">📄</span>
//                             <span className="truncate">{attachment.name}</span>
//                           </a>
//                         </div>
//                       ))}
//                     </div>
//                   </details>
//                 )}
//               </div>

//               {/* Chapter Quiz Button */}
//               {!!chapter.userProgress?.[0]?.isCompleted && isPreviousChapterPassed && (
//                 <div className="p-4">
//                   <ChapterQuizButton courseId={course.id} chapterId={chapter.id} />
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>

//       {allChaptersCompleted && (
//         <div className="p-4">
//           <QuizButton courseId={course.id} quizId={quizId} />
//         </div>
//       )}

//       {!allChaptersCompleted && (
//         <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-4 rounded-lg shadow-md">
//                     <h2 className="text-lg font-semibold">🎯 Complete All Chapters</h2>
//                     <p className="text-sm mt-1  text-center">Unlock the final quiz to test your mastery!</p>
//               </div>
//       )}
//     </div>
//   );
// };










// import { auth } from "@clerk/nextjs/server";
// import { Chapter, Course, UserProgress, ChapterAttachment } from "@prisma/client";
// import { redirect } from "next/navigation";
// import { db } from "@/lib/db";
// import { CourseProgress } from "@/components/course-progress";
// import { CourseSidebarItem } from "./course-sidebar-item";
// import QuizButton from "./quiz-button";
// import ChapterQuizButton from "./chapter-quiz-button";
// import { Logo } from "./logo";
// import axios from "axios";

// const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// interface CourseSidebarProps {
//   course: Course & {
//     chapters: (Chapter & {
//       userProgress: UserProgress[] | null;
//       chapterattachments: ChapterAttachment[];
//     })[];
//   };
//   progressCount: number;
//   quizId: string;
// }

// export const CourseSidebar = async ({
//   course,
//   progressCount,
//   quizId,
// }: CourseSidebarProps) => {
//   const { userId, getToken } = auth();

//   if (!userId) {
//     return redirect("/");
//   }

//   const purchase = await db.purchase.findUnique({
//     where: {
//       userId_courseId: {
//         userId,
//         courseId: course.id,
//       },
//     },
//   });

//   const token = await getToken();

//   // Fetch quiz pass status for each chapter
//   const chapterQuizStatus = await Promise.all(
//     course.chapters.map(async (chapter) => {
//       try {
//         const response = await axios.get(
//           `${BASE_URL}/api/courses/${course.id}/chapters/${chapter.id}/chapterquizzes/results`,
//           {
//             headers: {
//               "user-id": userId,
//               Authorization: token ? `Bearer ${token}` : undefined,
//             },
//           }
//         );
//         const scorePercentage = (response.data.score / response.data.totalQuestions) * 100;
//         return { chapterId: chapter.id, passed: scorePercentage >= 60 };
//       } catch (error) {
//         console.error(`Failed to fetch quiz results for chapter ${chapter.id}:`, error);
//         return { chapterId: chapter.id, passed: false }; // Default to not passed
//       }
//     })
//   );

//   const allChaptersCompleted = course.chapters.every(
//     (chapter) => !!chapter.userProgress?.[0]?.isCompleted
//   );

//   return (
//     <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
//       <div className="p-4 pb-5 bg-white">
//         <Logo />
//       </div>
//       <div className="p-8 flex flex-col border-b">
//         <h1
//           className="font-semibold"
//           style={{
//             color: "gold",
//             backgroundColor: "#6A0DAD",
//             padding: "8px 8px",
//             borderRadius: "2px",
//             fontSize: "16px",
//             overflow: "hidden",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           {course.title}
//         </h1>
//         {purchase && (
//           <div className="mt-5">
//             <CourseProgress variant="success" value={progressCount} />
//           </div>
//         )}
//       </div>

//       <div className="flex flex-col w-full">
//         {course.chapters.map((chapter, index) => {
//           const isCurrentChapterPassed =
//             chapterQuizStatus.find((status) => status.chapterId === chapter.id)?.passed || false;
//           const isPreviousChapterPassed =
//             index === 0 || (chapterQuizStatus[index - 1]?.passed ?? false);

//           // Lock the next chapter if the current quiz isn't passed
//           const isNextChapterLocked =
//             index < course.chapters.length - 1 && // Check if there's a next chapter
//             !isCurrentChapterPassed; // Lock if current quiz isn't passed

//           return (
//             <div key={chapter.id} className="mb-4">
//               <CourseSidebarItem
//                 id={chapter.id}
//                 label={chapter.title}
//                 isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
//                 courseId={course.id}
//                 isLocked={
//                   (!chapter.isFree && !purchase) || // Locked if not free and not purchased
//                   (index > 0 && !isPreviousChapterPassed) // Locked if previous chapter quiz not passed
//                 }
//               />

//               {/* Chapter Attachments Dropdown */}
//               <div className="ml-4 mt-2">
//                 {chapter.chapterattachments && chapter.chapterattachments.length > 0 && (
//                   <details className="group">
//                     <summary className="text-base font-medium text-gray-700 cursor-pointer flex items-center p-2 rounded-md hover:bg-gray-100 transition-colors duration-200">
//                       <span className="mr-2 text-[#FF0000]">📎</span>
//                       <span className="text-[#3b2f85]">
//                         Chapter Attachments ({chapter.chapterattachments.length})
//                       </span>
//                     </summary>
//                     <div className="mt-2 pl-4 pr-2">
//                       {chapter.chapterattachments.map((attachment) => (
//                         <div
//                           key={attachment.id}
//                           className="mb-2 p-3 bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
//                         >
//                           <a
//                             href={attachment.url}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="flex items-center text-blue-700 font-medium text-sm hover:text-blue-900 transition-colors duration-200"
//                           >
//                             <span className="mr-2">📄</span>
//                             <span className="truncate">{attachment.name}</span>
//                           </a>
//                         </div>
//                       ))}
//                     </div>
//                   </details>
//                 )}
//               </div>

//               {/* Chapter Quiz Button */}
//               {!!chapter.userProgress?.[0]?.isCompleted && isPreviousChapterPassed && (
//                 <div className="p-4">
//                   <ChapterQuizButton courseId={course.id} chapterId={chapter.id} />
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>

//       {allChaptersCompleted && (
//         <div className="p-4">
//           <QuizButton courseId={course.id} quizId={quizId} />
//         </div>
//       )}

//       {!allChaptersCompleted && (
//         <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-4 rounded-lg shadow-md">
//           <h2 className="text-lg font-semibold">🎯 Complete All Chapters</h2>
//           <p className="text-sm mt-1 text-center">Unlock the final quiz to test your mastery!</p>
//         </div>
//       )}
//     </div>
//   );
// };









// import { auth } from "@clerk/nextjs/server";
// import { Chapter, Course, UserProgress, ChapterAttachment } from "@prisma/client";
// import { redirect } from "next/navigation";
// import { db } from "@/lib/db";
// import { CourseProgress } from "@/components/course-progress";
// import { CourseSidebarItem } from "./course-sidebar-item";
// import QuizButton from "./quiz-button";
// import ChapterQuizButton from "./chapter-quiz-button";
// import { Logo } from "./logo";
// import axios from "axios";

// const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// interface CourseSidebarProps {
//   course: Course & {
//     chapters: (Chapter & {
//       userProgress: UserProgress[] | null;
//       chapterattachments: ChapterAttachment[];
//     })[];
//   };
//   progressCount: number;
//   quizId: string;
// }

// export const CourseSidebar = async ({
//   course,
//   progressCount,
//   quizId,
// }: CourseSidebarProps) => {
//   const { userId, getToken } = auth();

//   if (!userId) {
//     return redirect("/");
//   }

//   const purchase = await db.purchase.findUnique({
//     where: {
//       userId_courseId: {
//         userId,
//         courseId: course.id,
//       },
//     },
//   });

//   const token = await getToken();

//   // Fetch quiz pass status for each chapter
//   const chapterQuizStatus = await Promise.all(
//     course.chapters.map(async (chapter) => {
//       try {
//         const response = await axios.get(
//           `${BASE_URL}/api/courses/${course.id}/chapters/${chapter.id}/chapterquizzes/results`,
//           {
//             headers: {
//               "user-id": userId,
//               Authorization: token ? `Bearer ${token}` : undefined,
//             },
//           }
//         );
//         const scorePercentage = (response.data.score / response.data.totalQuestions) * 100;
//         return { chapterId: chapter.id, passed: scorePercentage >= 60 };
//       } catch (error) {
//         console.error(`Failed to fetch quiz results for chapter ${chapter.id}:`, error);
//         return { chapterId: chapter.id, passed: false }; // Default to not passed
//       }
//     })
//   );

//   const allChaptersCompleted = course.chapters.every(
//     (chapter) => !!chapter.userProgress?.[0]?.isCompleted
//   );

//   return (
//     <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm" style={{ width: '350px', backgroundColor: '#F9FAFB' }}>
//       <div className="p-4 pb-5 bg-white">
//         <Logo />
//       </div>
//       <div className="p-8 flex flex-col border-b" style={{ borderColor: '#E5E7EB' }}>
//         <h1
//           className="font-semibold"
//           style={{
//             color: "gold",
//             backgroundColor: "#6A0DAD",
//             padding: "8px 8px",
//             borderRadius: "2px",
//             fontSize: "14px", // Matched text size from image
//             overflow: "hidden",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           {course.title}
//         </h1>
//         {purchase && (
//           <div className="mt-5">
//             <CourseProgress variant="success" value={progressCount} />
//           </div>
//         )}
//       </div>

//       <div className="flex flex-col w-full">
//         {course.chapters.map((chapter, index) => {
//           const isCurrentChapterPassed =
//             chapterQuizStatus.find((status) => status.chapterId === chapter.id)?.passed || false;
//           const isPreviousChapterPassed =
//             index === 0 || (chapterQuizStatus[index - 1]?.passed ?? false);

//           // Lock the next chapter if the current quiz isn't passed
//           const isNextChapterLocked =
//             index < course.chapters.length - 1 && // Check if there's a next chapter
//             !isCurrentChapterPassed; // Lock if current quiz isn't passed

//           return (
//             <div key={chapter.id} className="mb-4">
//               <CourseSidebarItem
//                 id={chapter.id}
//                 label={chapter.title}
//                 isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
//                 courseId={course.id}
//                 isLocked={
//                   (!chapter.isFree && !purchase) || // Locked if not free and not purchased
//                   (index > 0 && !isPreviousChapterPassed) // Locked if previous chapter quiz not passed
//                 }
//               />

//               {/* Chapter Attachments Dropdown */}
//               <div className="ml-4 mt-2">
//                 {chapter.chapterattachments && chapter.chapterattachments.length > 0 && (
//                   <details className="group">
//                     <summary className="text-base font-medium text-gray-700 cursor-pointer flex items-center p-2 rounded-md hover:bg-gray-100 transition-colors duration-200">
//                       <span className="mr-2 text-[#FF0000]" style={{ fontWeight: 'normal', fontSize: '16px' }}>📎</span> {/* Matched icon size from image */}
//                       <span className="text-[#3b2f85]" style={{ fontSize: '14px' }}> {/* Matched text size from image */}
//                         Chapter Attachments ({chapter.chapterattachments.length})
//                       </span>
//                     </summary>
//                     <div className="mt-2 pl-4 pr-2">
//                       {chapter.chapterattachments.map((attachment) => (
//                         <div
//                           key={attachment.id}
//                           className="mb-2 p-3 bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
//                         >
//                           <a
//                             href={attachment.url}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="flex items-center text-blue-700 font-medium text-sm hover:text-blue-900 transition-colors duration-200"
//                           >
//                             <span className="mr-2" style={{ fontWeight: 'normal', fontSize: '16px' }}>📄</span> {/* Matched icon size from image */}
//                             <span className="truncate" style={{ fontSize: '14px' }}>{attachment.name}</span> {/* Matched text size from image */}
//                           </a>
//                         </div>
//                       ))}
//                     </div>
//                   </details>
//                 )}
//               </div>

//               {/* Chapter Quiz Button */}
//               {!!chapter.userProgress?.[0]?.isCompleted && isPreviousChapterPassed && (
//                 <div className="p-4">
//                   <ChapterQuizButton courseId={course.id} chapterId={chapter.id} />
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>

//       {allChaptersCompleted && (
//         <div className="p-4">
//           <QuizButton courseId={course.id} quizId={quizId} />
//         </div>
//       )}

//       {!allChaptersCompleted && (
//          <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:shadow-xl" style={{ fontSize: '16px' }}>
//                    <h2 
//                  className="text-xl font-bold mb-2 flex items-center justify-center" 
//                 style={{ fontSize: '48px' }}  
//                                               >
//                                                 🎯
//                        </h2>
//          <p className="text-base mt-2 text-left" style={{ fontSize: '16px' }}>Unlock the final quiz to test your mastery!</p>
//        </div>
//       )}
//     </div>
//   );
// };










// import { auth } from "@clerk/nextjs/server";
// import { redirect } from "next/navigation";
// import { db } from "@/lib/db";
// import { CourseProgress } from "@/components/course-progress";
// import { CourseSidebarItem } from "./course-sidebar-item";
// import QuizButton from "./quiz-button";
// import ChapterQuizButton from "./chapter-quiz-button";
// import { Logo } from "./logo";
// import axios from "axios";

// // Import Prisma types explicitly
// import { Prisma } from "@prisma/client";

// // Define the expected type for CourseSidebarProps using Prisma types
// interface CourseSidebarProps {
//   course: Prisma.CourseGetPayload<{
//     include: {
//       chapters: {
//         include: {
//           userProgress: true;
//           chapterattachments?: true;
//         };
//       };
//     };
//   }>;
//   progressCount: number;
//   quizId: string;
// }

// const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// export const CourseSidebar = async ({
//   course,
//   progressCount,
//   quizId,
// }: CourseSidebarProps) => {
//   const { userId, getToken } = auth();

//   if (!userId) {
//     return redirect("/");
//   }

//   const purchase = await db.purchase.findUnique({
//     where: {
//       userId_courseId: {
//         userId,
//         courseId: course.id,
//       },
//     },
//   });

//   const token = await getToken();

//   // Fetch quiz pass status for each chapter
//   const chapterQuizStatus = await Promise.all(
//     course.chapters.map(async (chapter) => {
//       try {
//         const response = await axios.get(
//           `${BASE_URL}/api/courses/${course.id}/chapters/${chapter.id}/chapterquizzes/results`,
//           {
//             headers: {
//               "user-id": userId,
//               Authorization: token ? `Bearer ${token}` : undefined,
//             },
//           }
//         );
//         const scorePercentage = (response.data.score / response.data.totalQuestions) * 100;
//         return { chapterId: chapter.id, passed: scorePercentage >= 60 };
//       } catch (error) {
//         console.error(`Failed to fetch quiz results for chapter ${chapter.id}:`, error);
//         return { chapterId: chapter.id, passed: false }; // Default to not passed
//       }
//     })
//   );

//   const allChaptersCompleted = course.chapters.every(
//     (chapter) => !!chapter.userProgress?.[0]?.isCompleted
//   );

//   return (
//     <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm" style={{ width: '350px', backgroundColor: '#F9FAFB' }}>
//       <div className="p-4 pb-5 bg-white">
//         <Logo />
//       </div>
//       <div className="p-8 flex flex-col border-b" style={{ borderColor: '#E5E7EB' }}>
//         <h1
//           className="font-semibold"
//           style={{
//             color: "gold",
//             backgroundColor: "#6A0DAD",
//             padding: "8px 8px",
//             borderRadius: "2px",
//             fontSize: "14px",
//             overflow: "hidden",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           {course.title}
//         </h1>
//         {purchase && (
//           <div className="mt-5">
//             <CourseProgress variant="success" value={progressCount} />
//           </div>
//         )}
//       </div>

//       <div className="flex flex-col w-full">
//         {course.chapters.map((chapter, index) => {
//           const isCurrentChapterPassed =
//             chapterQuizStatus.find((status) => status.chapterId === chapter.id)?.passed || false;
//           const isPreviousChapterPassed =
//             index === 0 || (chapterQuizStatus[index - 1]?.passed ?? false);

//           // Lock the next chapter if the current quiz isn't passed
//           const isNextChapterLocked =
//             index < course.chapters.length - 1 && !isCurrentChapterPassed;

//           return (
//             <div key={chapter.id} className="mb-4">
//               <CourseSidebarItem
//                 id={chapter.id}
//                 label={chapter.title}
//                 isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
//                 courseId={course.id}
//                 isLocked={
//                   (!chapter.isFree && !purchase) ||
//                   (index > 0 && !isPreviousChapterPassed)
//                 }
//               />

//               {/* Chapter Attachments Dropdown */}
//               <div className="ml-4 mt-2">
//                 {chapter.chapterattachments && chapter.chapterattachments.length > 0 && (
//                   <details className="group">
//                     <summary className="text-base font-medium text-gray-700 cursor-pointer flex items-center p-2 rounded-md hover:bg-gray-100 transition-colors duration-200">
//                       <span className="mr-2 text-[#FF0000]" style={{ fontWeight: 'normal', fontSize: '16px' }}>📎</span>
//                       <span className="text-[#3b2f85]" style={{ fontSize: '14px' }}>
//                         Chapter Attachments ({chapter.chapterattachments.length})
//                       </span>
//                     </summary>
//                     <div className="mt-2 pl-4 pr-2">
//                       {chapter.chapterattachments.map((attachment) => (
//                         <div
//                           key={attachment.id}
//                           className="mb-2 p-3 bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
//                         >
//                           <a
//                             href={attachment.url}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="flex items-center text-blue-700 font-medium text-sm hover:text-blue-900 transition-colors duration-200"
//                           >
//                             <span className="mr-2" style={{ fontWeight: 'normal', fontSize: '16px' }}>📄</span>
//                             <span className="truncate" style={{ fontSize: '14px' }}>{attachment.name}</span>
//                           </a>
//                         </div>
//                       ))}
//                     </div>
//                   </details>
//                 )}
//               </div>

//               {/* Chapter Quiz Button */}
//               {!!chapter.userProgress?.[0]?.isCompleted && isPreviousChapterPassed && (
//                 <div className="p-4">
//                   <ChapterQuizButton courseId={course.id} chapterId={chapter.id} />
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>

//       {allChaptersCompleted && (
//         <div className="p-4">
//           <QuizButton courseId={course.id} quizId={quizId} />
//         </div>
//       )}

//       {!allChaptersCompleted && (
//         <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:shadow-xl" style={{ fontSize: '16px' }}>
//           <h2 
//             className="text-xl font-bold mb-2 flex items-center justify-center" 
//             style={{ fontSize: '48px' }}  
//           >
//             🎯
//           </h2>
//           <p className="text-base mt-2 text-left" style={{ fontSize: '16px' }}>Unlock the final quiz to test your mastery!</p>
//         </div>
//       )}
//     </div>
//   );
// };







// import { auth } from "@clerk/nextjs/server";
// import { redirect } from "next/navigation";
// import { db } from "@/lib/db";
// import { CourseProgress } from "@/components/course-progress";
// import { CourseSidebarItem } from "./course-sidebar-item";
// import QuizButton from "./quiz-button";
// import ChapterQuizButton from "./chapter-quiz-button";
// import { Logo } from "./logo";
// import axios from "axios";

// // Import Prisma types explicitly
// import { Prisma } from "@prisma/client";

// // Define the expected type for CourseSidebarProps using Prisma types
// interface CourseSidebarProps {
//   course: Prisma.CourseGetPayload<{
//     include: {
//       chapters: {
//         include: {
//           userProgress: true; // userProgress is required and can be null
//           chapterattachments?: true; // chapterattachments is optional
//         };
//       };
//     };
//   }>;
//   progressCount: number;
//   quizId: string;
// }

// const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// export const CourseSidebar = async ({
//   course,
//   progressCount,
//   quizId,
// }: CourseSidebarProps) => {
//   const { userId, getToken } = auth();

//   if (!userId) {
//     return redirect("/");
//   }

//   const purchase = await db.purchase.findUnique({
//     where: {
//       userId_courseId: {
//         userId,
//         courseId: course.id,
//       },
//     },
//   });

//   const token = await getToken();

//   // Fetch quiz pass status for each chapter
//   const chapterQuizStatus = await Promise.all(
//     course.chapters.map(async (chapter) => {
//       try {
//         const response = await axios.get(
//           `${BASE_URL}/api/courses/${course.id}/chapters/${chapter.id}/chapterquizzes/results`,
//           {
//             headers: {
//               "user-id": userId,
//               Authorization: token ? `Bearer ${token}` : undefined,
//             },
//           }
//         );
//         const scorePercentage = (response.data.score / response.data.totalQuestions) * 100;
//         return { chapterId: chapter.id, passed: scorePercentage >= 60 };
//       } catch (error) {
//         console.error(`Failed to fetch quiz results for chapter ${chapter.id}:`, error);
//         return { chapterId: chapter.id, passed: false }; // Default to not passed
//       }
//     })
//   );

//   const allChaptersCompleted = course.chapters.every(
//     (chapter) => !!chapter.userProgress?.[0]?.isCompleted
//   );

//   return (
//     <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm" style={{ width: '350px', backgroundColor: '#F9FAFB' }}>
//       <div className="p-4 pb-5 bg-white">
//         <Logo />
//       </div>
//       <div className="p-8 flex flex-col border-b" style={{ borderColor: '#E5E7EB' }}>
//         <h1
//           className="font-semibold"
//           style={{
//             color: "gold",
//             backgroundColor: "#6A0DAD",
//             padding: "8px 8px",
//             borderRadius: "2px",
//             fontSize: "14px",
//             overflow: "hidden",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           {course.title}
//         </h1>
//         {purchase && (
//           <div className="mt-5">
//             <CourseProgress variant="success" value={progressCount} />
//           </div>
//         )}
//       </div>

//       <div className="flex flex-col w-full">
//         {course.chapters.map((chapter, index) => {
//           const isCurrentChapterPassed =
//             chapterQuizStatus.find((status) => status.chapterId === chapter.id)?.passed || false;
//           const isPreviousChapterPassed =
//             index === 0 || (chapterQuizStatus[index - 1]?.passed ?? false);

//           // Lock the next chapter if the current quiz isn't passed
//           const isNextChapterLocked =
//             index < course.chapters.length - 1 && !isCurrentChapterPassed;

//           return (
//             <div key={chapter.id} className="mb-4">
//               <CourseSidebarItem
//                 id={chapter.id}
//                 label={chapter.title}
//                 isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
//                 courseId={course.id}
//                 isLocked={
//                   (!chapter.isFree && !purchase) ||
//                   (index > 0 && !isPreviousChapterPassed)
//                 }
//               />

//               {/* Chapter Attachments Dropdown */}
//               <div className="ml-4 mt-2">
//                 {chapter.chapterattachments && chapter.chapterattachments.length > 0 && (
//                   <details className="group">
//                     <summary className="text-base font-medium text-gray-700 cursor-pointer flex items-center p-2 rounded-md hover:bg-gray-100 transition-colors duration-200">
//                       <span className="mr-2 text-[#FF0000]" style={{ fontWeight: 'normal', fontSize: '16px' }}>📎</span>
//                       <span className="text-[#3b2f85]" style={{ fontSize: '14px' }}>
//                         Chapter Attachments ({chapter.chapterattachments.length})
//                       </span>
//                     </summary>
//                     <div className="mt-2 pl-4 pr-2">
//                       {chapter.chapterattachments.map((attachment) => (
//                         <div
//                           key={attachment.id}
//                           className="mb-2 p-3 bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
//                         >
//                           <a
//                             href={attachment.url}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="flex items-center text-blue-700 font-medium text-sm hover:text-blue-900 transition-colors duration-200"
//                           >
//                             <span className="mr-2" style={{ fontWeight: 'normal', fontSize: '16px' }}>📄</span>
//                             <span className="truncate" style={{ fontSize: '14px' }}>{attachment.name}</span>
//                           </a>
//                         </div>
//                       ))}
//                     </div>
//                   </details>
//                 )}
//               </div>

//               {/* Chapter Quiz Button */}
//               {!!chapter.userProgress?.[0]?.isCompleted && isPreviousChapterPassed && (
//                 <div className="p-4">
//                   <ChapterQuizButton courseId={course.id} chapterId={chapter.id} />
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>

//       {allChaptersCompleted && (
//         <div className="p-4">
//           <QuizButton courseId={course.id} quizId={quizId} />
//         </div>
//       )}

//       {!allChaptersCompleted && (
//         <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:shadow-xl" style={{ fontSize: '16px' }}>
//           <h2 
//             className="text-xl font-bold mb-2 flex items-center justify-center" 
//             style={{ fontSize: '48px' }}  
//           >
//             🎯
//           </h2>
//           <p className="text-base mt-2 text-left" style={{ fontSize: '16px' }}>Unlock the final quiz to test your mastery!</p>
//         </div>
//       )}
//     </div>
//   );
// };

































// import { auth } from "@clerk/nextjs/server";
// import { redirect } from "next/navigation";
// import { db } from "@/lib/db";
// import { CourseProgress } from "@/components/course-progress";
// import { CourseSidebarItem } from "./course-sidebar-item";
// import QuizButton from "./quiz-button";
// import ChapterQuizButton from "./chapter-quiz-button";
// import { Logo } from "./logo";
// import axios from "axios";

// // Import Prisma types explicitly
// import { Prisma } from "@prisma/client";

// // Define the expected type for CourseSidebarProps using Prisma types
// interface CourseSidebarProps {
//   course: Prisma.CourseGetPayload<{
//     include: {
//       chapters: {
//         include: {
//           userProgress: true; // userProgress is required and can be null
//           chapterattachments?: true; // chapterattachments is optional
//         };
//       };
//     };
//   }>;
//   progressCount: number;
//   quizId: string;
// }

// const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// export const CourseSidebar = async ({
//   course,
//   progressCount,
//   quizId,
// }: CourseSidebarProps) => {
//   const { userId, getToken } = auth();

//   if (!userId) {
//     return redirect("/");
//   }

//   const purchase = await db.purchase.findUnique({
//     where: {
//       userId_courseId: {
//         userId,
//         courseId: course.id,
//       },
//     },
//   });

//   const token = await getToken();

//   // Fetch quiz pass status for each chapter with better error handling
//   const chapterQuizStatus = await Promise.all(
//     course.chapters.map(async (chapter) => {
//       try {
//         const response = await axios.get(
//           `${BASE_URL}/api/courses/${course.id}/chapters/${chapter.id}/chapterquizzes/results`,
//           {
//             headers: {
//               "user-id": userId,
//               Authorization: token ? `Bearer ${token}` : undefined,
//             },
//           }
//         );
//         const scorePercentage = (response.data.score / response.data.totalQuestions) * 100;
//         return { chapterId: chapter.id, passed: scorePercentage >= 60, error: null };
//       } catch (error: any) {
//         // Handle 404 specifically (no results found) vs. other errors
//         if (error.response?.status === 404) {
//           return { chapterId: chapter.id, passed: false, error: "No quiz results found" };
//         }
//         console.error(`Failed to fetch quiz results for chapter ${chapter.id}:`, error);
//         return { chapterId: chapter.id, passed: false, error: "Failed to load quiz results" };
//       }
//     })
//   );

//   const allChaptersCompleted = course.chapters.every(
//     (chapter) => !!chapter.userProgress?.[0]?.isCompleted
//   );

//   return (
//     <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm" style={{ width: '350px', backgroundColor: '#F9FAFB' }}>
//       <div className="p-4 pb-5 bg-white">
//         <Logo />
//       </div>
//       <div className="p-8 flex flex-col border-b" style={{ borderColor: '#E5E7EB' }}>
//         <h1
//           className="font-semibold"
//           style={{
//             color: "gold",
//             backgroundColor: "#6A0DAD",
//             padding: "8px 8px",
//             borderRadius: "2px",
//             fontSize: "14px",
//             overflow: "hidden",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           {course.title}
//         </h1>
//         {purchase && (
//           <div className="mt-5">
//             <CourseProgress variant="success" value={progressCount} />
//           </div>
//         )}
//       </div>

//       <div className="flex flex-col w-full">
//         {course.chapters.map((chapter, index) => {
//           const quizStatus = chapterQuizStatus.find((status) => status.chapterId === chapter.id);
//           const isCurrentChapterPassed = quizStatus?.passed || false;
//           const isPreviousChapterPassed =
//             index === 0 || (chapterQuizStatus[index - 1]?.passed ?? false);

//           // Lock the next chapter if the current quiz isn't passed
//           const isNextChapterLocked =
//             index < course.chapters.length - 1 && !isCurrentChapterPassed;

//           return (
//             <div key={chapter.id} className="mb-4">
//               <CourseSidebarItem
//                 id={chapter.id}
//                 label={chapter.title}
//                 isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
//                 courseId={course.id}
//                 isLocked={
//                   (!chapter.isFree && !purchase) ||
//                   (index > 0 && !isPreviousChapterPassed)
//                 }
//               />

//               {/* Chapter Attachments Dropdown */}
//               <div className="ml-4 mt-2">
//                 {chapter.chapterattachments && chapter.chapterattachments.length > 0 && (
//                   <details className="group">
//                     <summary className="text-base font-medium text-gray-700 cursor-pointer flex items-center p-2 rounded-md hover:bg-gray-100 transition-colors duration-200">
//                       <span className="mr-2 text-[#FF0000]" style={{ fontWeight: 'normal', fontSize: '16px' }}>📎</span>
//                       <span className="text-[#3b2f85]" style={{ fontSize: '14px' }}>
//                         Chapter Attachments ({chapter.chapterattachments.length})
//                       </span>
//                     </summary>
//                     <div className="mt-2 pl-4 pr-2">
//                       {chapter.chapterattachments.map((attachment) => (
//                         <div
//                           key={attachment.id}
//                           className="mb-2 p-3 bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
//                         >
//                           <a
//                             href={attachment.url}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="flex items-center text-blue-700 font-medium text-sm hover:text-blue-900 transition-colors duration-200"
//                           >
//                             <span className="mr-2" style={{ fontWeight: 'normal', fontSize: '16px' }}>📄</span>
//                             <span className="truncate" style={{ fontSize: '14px' }}>{attachment.name}</span>
//                           </a>
//                         </div>
//                       ))}
//                     </div>
//                   </details>
//                 )}
//               </div>

//               {/* Chapter Quiz Button with Error Handling */}
//               {!!chapter.userProgress?.[0]?.isCompleted && isPreviousChapterPassed && (
//                 <div className="p-4">
//                   {quizStatus?.error ? (
//                     <p className="text-red-500 text-sm">{quizStatus.error}</p>
//                   ) : (
//                     <ChapterQuizButton courseId={course.id} chapterId={chapter.id} />
//                   )}
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>

//       {allChaptersCompleted && (
//         <div className="p-4">
//           <QuizButton courseId={course.id} quizId={quizId} />
//         </div>
//       )}

//       {!allChaptersCompleted && (
//         <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:shadow-xl" style={{ fontSize: '16px' }}>
//           <h2 
//             className="text-xl font-bold mb-2 flex items-center justify-center" 
//             style={{ fontSize: '48px' }}  
//           >
//             🎯
//           </h2>
//           <p className="text-base mt-2 text-left" style={{ fontSize: '16px' }}>Unlock the final quiz to test your mastery!</p>
//         </div>
//       )}
//     </div>
//   );
// };




















// import { auth } from "@clerk/nextjs/server";
// import { Chapter, Course, UserProgress, ChapterAttachment } from "@prisma/client";
// import { redirect } from "next/navigation";
// import { db } from "@/lib/db";
// import { CourseProgress } from "@/components/course-progress";
// import { CourseSidebarItem } from "./course-sidebar-item";
// import QuizButton from "./quiz-button";
// import ChapterQuizButton from "./chapter-quiz-button";
// import { Logo } from "./logo";
// import axios from "axios";

// const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// interface CourseSidebarProps {
//   course: Course & {
//     chapters: (Chapter & {
//       userProgress: UserProgress[] | null;
//       chapterattachments: ChapterAttachment[];
//     })[];
//   };
//   progressCount: number;
//   quizId: string;
// }

// export const CourseSidebar = async ({
//   course,
//   progressCount,
//   quizId,
// }: CourseSidebarProps) => {
//   const { userId, getToken } = auth();

//   if (!userId) {
//     return redirect("/");
//   }

//   const purchase = await db.purchase.findUnique({
//     where: {
//       userId_courseId: {
//         userId,
//         courseId: course.id,
//       },
//     },
//   });

//   const token = await getToken();

//   // Fetch quiz pass status and attempt count for each chapter
//   const chapterQuizStatus = await Promise.all(
//     course.chapters.map(async (chapter) => {
//       try {
//         // Fetch quiz results (pass/fail status)
//         const resultsResponse = await axios.get(
//           `${BASE_URL}/api/courses/${course.id}/chapters/${chapter.id}/chapterquizzes/results`,
//           {
//             headers: {
//               "user-id": userId,
//               Authorization: token ? `Bearer ${token}` : undefined,
//             },
//           }
//         );
//         const scorePercentage = (resultsResponse.data.score / resultsResponse.data.totalQuestions) * 100;
//         const passed = scorePercentage >= 60;

//         // Fetch number of attempts for this chapter
//         const attemptsResponse = await axios.get(
//           `${BASE_URL}/api/courses/${course.id}/chapters/${chapter.id}/chapterquizzes/attempts`,
//           {
//             headers: {
//               "user-id": userId,
//               Authorization: token ? `Bearer ${token}` : undefined,
//             },
//           }
//         );
//         const attempts = attemptsResponse.data.attempts || 0;
//         const maxAttempts = 3; // Match the maxAttempts from chapterquiz.tsx

//         return { 
//           chapterId: chapter.id, 
//           passed, 
//           attempts, 
//           maxAttempts 
//         };
//       } catch (error) {
//         console.error(`Failed to fetch quiz results or attempts for chapter ${chapter.id}:`, error);
//         return { 
//           chapterId: chapter.id, 
//           passed: false, 
//           attempts: 0, 
//           maxAttempts: 3 
//         }; // Default to not passed and no attempts
//       }
//     })
//   );

//   const allChaptersCompleted = course.chapters.every(
//     (chapter) => !!chapter.userProgress?.[0]?.isCompleted
//   );

//   return (
//     <div className="h-full border-r flex flex-col overflow-y-auto shadow-md bg-white">
//       <div className="p-4 pb-5 bg-white border-b border-gray-200">
//         <Logo />
//       </div>
//       <div className="p-4 flex flex-col border-b border-gray-200">
//         <h1
//           className="font-semibold text-lg text-center"
//           style={{
//             color: "#1E90FF", // Blue color for text (matching AccioJob blue)
//             backgroundColor: "white",
//             padding: "8px 16px",
//             borderRadius: "4px",
//             fontSize: "18px",
//             overflow: "hidden",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           {course.title}
//         </h1>
//         {purchase && (
//           <div className="mt-4">
//             <CourseProgress variant="success" value={progressCount} />
//           </div>
//         )}
//       </div>

//       <div className="flex flex-col w-full p-2">
//         {course.chapters.map((chapter, index) => {
//           const chapterStatus = chapterQuizStatus.find((status) => status.chapterId === chapter.id);
//           const isCurrentChapterPassed = chapterStatus?.passed || false;
//           const currentAttempts = chapterStatus?.attempts || 0;
//           const maxAttemptsAllowed = chapterStatus?.maxAttempts || 3;

//           const isPreviousChapterPassed =
//             index === 0 || (chapterQuizStatus[index - 1]?.passed ?? false);

//           // Lock the next chapter if the current quiz isn't passed or attempts are exhausted
//           const isNextChapterLocked =
//             index < course.chapters.length - 1 && // Check if there's a next chapter
//             (!isCurrentChapterPassed || currentAttempts >= maxAttemptsAllowed); // Lock if current quiz isn't passed or attempts are exhausted

//           return (
//             <div key={chapter.id} className="mb-2">
//               <CourseSidebarItem
//                 id={chapter.id}
//                 label={chapter.title}
//                 isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
//                 courseId={course.id}
//                 isLocked={
//                   (!chapter.isFree && !purchase) || // Locked if not free and not purchased
//                   (index > 0 && !isPreviousChapterPassed) // Locked if previous chapter quiz not passed
//                 }
//               />

//               {/* Chapter Attachments Dropdown */}
//               <div className="ml-4 mt-1">
//                 {chapter.chapterattachments && chapter.chapterattachments.length > 0 && (
//                   <details className="group">
//                     <summary className="text-sm font-medium text-gray-600 cursor-pointer flex items-center p-2 rounded-md hover:bg-gray-100 transition-colors duration-200">
//                       <span className="mr-2 text-[#FF0000]">📎</span>
//                       <span className="text-[#1E90FF]">
//                         Chapter Attachments ({chapter.chapterattachments.length})
//                       </span>
//                     </summary>
//                     <div className="mt-1 pl-4 pr-2">
//                       {chapter.chapterattachments.map((attachment) => (
//                         <div
//                           key={attachment.id}
//                           className="mb-1 p-2 bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-md shadow-sm hover:shadow-md transition-all duration-300"
//                         >
//                           <a
//                             href={attachment.url}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="flex items-center text-blue-700 font-medium text-xs hover:text-blue-900 transition-colors duration-200"
//                           >
//                             <span className="mr-1">📄</span>
//                             <span className="truncate">{attachment.name}</span>
//                           </a>
//                         </div>
//                       ))}
//                     </div>
//                   </details>
//                 )}
//               </div>

//               {/* Chapter Quiz Button - Show only if attempts remain or quiz hasn't been attempted yet */}
//               {!!chapter.userProgress?.[0]?.isCompleted && isPreviousChapterPassed && (
//                 <div className="p-2">
//                   {currentAttempts < maxAttemptsAllowed ? (
//                     <ChapterQuizButton courseId={course.id} chapterId={chapter.id} />
//                   ) : (
//                     <div className="text-red-600 text-xs font-medium">
//                       No attempts remaining. Please rewatch the video to unlock.
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>

//       {allChaptersCompleted && (
//         <div className="p-2">
//           <QuizButton courseId={course.id} quizId={quizId} />
//         </div>
//       )}

//       {!allChaptersCompleted && (
//         <div 
//         className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-4 rounded-lg shadow-lg transform transition-all duration-300 hover:shadow-xl hover:scale-[1.02] border border-transparent hover:border-blue-300"
//       >
//         <div className="flex items-center justify-center gap-2 animate-pulse-once">
//           <span className="text-2xl">🎯</span>
//           <h2 className="text-base font-bold tracking-tight">Complete All Chapters</h2>
//         </div>
//         <p className="text-sm mt-2 text-center font-medium opacity-90 leading-relaxed">
//           Unlock the final quiz to test your mastery and elevate your skills!
//         </p>
//       </div>
//       )}
//     </div>
//   );
// };












// import { auth } from "@clerk/nextjs/server";
// import { Chapter, Course, UserProgress, ChapterAttachment } from "@prisma/client";
// import { redirect } from "next/navigation";
// import { db } from "@/lib/db";
// import { CourseProgress } from "@/components/course-progress";
// import { CourseSidebarItem } from "./course-sidebar-item";
// import QuizButton from "./quiz-button";
// import ChapterQuizButton from "./chapter-quiz-button";
// import { Logo } from "./logo";
// import axios from "axios";

// const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// interface CourseSidebarProps {
//   course: Course & {
//     chapters: (Chapter & {
//       userProgress: UserProgress[] | null;
//       chapterattachments: ChapterAttachment[];
//     })[];
//   };
//   progressCount: number;
//   quizId: string;
// }

// export const CourseSidebar = async ({
//   course,
//   progressCount,
//   quizId,
// }: CourseSidebarProps) => {
//   const { userId, getToken } = auth();

//   if (!userId) {
//     return redirect("/");
//   }

//   const purchase = await db.purchase.findUnique({
//     where: {
//       userId_courseId: {
//         userId,
//         courseId: course.id,
//       },
//     },
//   });

//   const token = await getToken();

//   // Fetch quiz pass status and attempt count for each chapter
//   const chapterQuizStatus = await Promise.all(
//     course.chapters.map(async (chapter) => {
//       try {
//         // Fetch quiz results (pass/fail status)
//         const resultsResponse = await axios.get(
//           `${BASE_URL}/api/courses/${course.id}/chapters/${chapter.id}/chapterquizzes/results`,
//           {
//             headers: {
//               "user-id": userId,
//               Authorization: token ? `Bearer ${token}` : undefined,
//             },
//           }
//         );
//         const scorePercentage = (resultsResponse.data.score / resultsResponse.data.totalQuestions) * 100;
//         const passed = scorePercentage >= 60;

//         // Fetch number of attempts for this chapter
//         const attemptsResponse = await axios.get(
//           `${BASE_URL}/api/courses/${course.id}/chapters/${chapter.id}/chapterquizzes/attempts`,
//           {
//             headers: {
//               "user-id": userId,
//               Authorization: token ? `Bearer ${token}` : undefined,
//             },
//           }
//         );
//         const attempts = attemptsResponse.data.attempts || 0;
//         const maxAttempts = 3; // Match the maxAttempts from chapterquiz.tsx

//         return { 
//           chapterId: chapter.id, 
//           passed, 
//           attempts, 
//           maxAttempts 
//         };
//       } catch (error) {
//         console.error(`Failed to fetch quiz results or attempts for chapter ${chapter.id}:`, error);
//         return { 
//           chapterId: chapter.id, 
//           passed: false, 
//           attempts: 0, 
//           maxAttempts: 3 
//         }; // Default to not passed and no attempts
//       }
//     })
//   );

//   const allChaptersCompleted = course.chapters.every(
//     (chapter) => !!chapter.userProgress?.[0]?.isCompleted
//   );

//   return (
//     <div className="h-full border-r flex flex-col overflow-y-auto shadow-md bg-white">
//       <div className="p-4 pb-5 bg-white border-b border-gray-200">
//         <Logo />
//       </div>
//       <div className="p-4 flex flex-col border-b border-gray-200">
//         <h1
//           className="font-semibold text-lg text-center"
//           style={{
//             color: "#1E90FF", // Blue color for text (matching AccioJob blue)
//             backgroundColor: "white",
//             padding: "8px 16px",
//             borderRadius: "4px",
//             fontSize: "18px",
//             overflow: "hidden",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           {course.title}
//         </h1>
//         {purchase && (
//           <div className="mt-4">
//             <CourseProgress variant="success" value={progressCount} />
//           </div>
//         )}
//       </div>

//       <div className="flex flex-col w-full p-2">
//         {course.chapters.map((chapter, index) => {
//           const chapterStatus = chapterQuizStatus.find((status) => status.chapterId === chapter.id);
//           const isCurrentChapterPassed = chapterStatus?.passed || false;
//           const currentAttempts = chapterStatus?.attempts || 0;
//           const maxAttemptsAllowed = chapterStatus?.maxAttempts || 3;

//           const isPreviousChapterPassed =
//             index === 0 || (chapterQuizStatus[index - 1]?.passed ?? false);

//           // Lock the next chapter if the current quiz isn't passed or attempts are exhausted
//           const isNextChapterLocked =
//             index < course.chapters.length - 1 && // Check if there's a next chapter
//             (!isCurrentChapterPassed || currentAttempts >= maxAttemptsAllowed); // Lock if current quiz isn't passed or attempts are exhausted

//           return (
//             <div key={chapter.id} className="mb-2">
//               <CourseSidebarItem
//                 id={chapter.id}
//                 label={chapter.title}
//                 isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
//                 courseId={course.id}
//                 isLocked={
//                   (!chapter.isFree && !purchase) || // Locked if not free and not purchased
//                   (index > 0 && !isPreviousChapterPassed) // Locked if previous chapter quiz not passed
//                 }
//               />

//               {/* Chapter Attachments Dropdown */}
//               <div className="ml-4 mt-1">
//                 {chapter.chapterattachments && chapter.chapterattachments.length > 0 && (
//                   <details className="group">
//                     <summary className="text-sm font-medium text-gray-600 cursor-pointer flex items-center p-2 rounded-md hover:bg-gray-100 transition-colors duration-200">
//                       <span className="mr-2 text-[#FF0000]">📎</span>
//                       <span className="text-[#1E90FF]">
//                         Chapter Attachments ({chapter.chapterattachments.length})
//                       </span>
//                     </summary>
//                     <div className="mt-1 pl-4 pr-2">
//                       {chapter.chapterattachments.map((attachment) => (
//                         <div
//                           key={attachment.id}
//                           className="mb-1 p-2 bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-md shadow-sm hover:shadow-md transition-all duration-300"
//                         >
//                           <a
//                             href={attachment.url}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="flex items-center text-blue-700 font-medium text-xs hover:text-blue-900 transition-colors duration-200"
//                           >
//                             <span className="mr-1">📄</span>
//                             <span className="truncate">{attachment.name}</span>
//                           </a>
//                         </div>
//                       ))}
//                     </div>
//                   </details>
//                 )}
//               </div>

//               {/* Chapter Quiz Button - Show only if attempts remain or quiz hasn't been attempted yet, with updated text and optional hiding */}
//               {!!chapter.userProgress?.[0]?.isCompleted && isPreviousChapterPassed && (
//                 <div className="p-2">
//                   {currentAttempts < maxAttemptsAllowed ? (
//                     <ChapterQuizButton 
//                       courseId={course.id} 
//                       chapterId={chapter.id} 
//                       isQuizPassed={isCurrentChapterPassed} 
//                       hideOnPass={false} // Default to not hiding; can be toggled to true to hide when quiz is passed
//                     />
//                   ) : (
//                     <div className="text-red-600 text-xs font-medium">
//                       No attempts remaining. Please rewatch the video to unlock.
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>

//       {allChaptersCompleted && (
//         <div className="p-2">
//           <QuizButton courseId={course.id} quizId={quizId} />
//         </div>
//       )}

//       {!allChaptersCompleted && (
//         <div 
//           className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-4 rounded-lg shadow-lg transform transition-all duration-300 hover:shadow-xl hover:scale-[1.02] border border-transparent hover:border-blue-300"
//         >
//           <div className="flex items-center justify-center gap-2 animate-pulse-once">
//             <span className="text-2xl">🎯</span>
//             <h2 className="text-base font-bold tracking-tight">Complete All Chapters</h2>
//           </div>
//           <p className="text-sm mt-2 text-center font-medium opacity-90 leading-relaxed">
//             Unlock the final quiz to test your mastery and elevate your skills!
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };









// import { auth } from "@clerk/nextjs/server";
// import { Chapter, Course, UserProgress, ChapterAttachment } from "@prisma/client";
// import { redirect } from "next/navigation";
// import { db } from "@/lib/db";
// import { CourseProgress } from "@/components/course-progress";
// import { CourseSidebarItem } from "./course-sidebar-item";
// import QuizButton from "./quiz-button";
// import ChapterQuizButton from "./chapter-quiz-button";
// import { Logo } from "./logo";
// import axios from "axios";

// const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// interface CourseSidebarProps {
//   course: Course & {
//     chapters: (Chapter & {
//       userProgress: UserProgress[] | null;
//       chapterattachments: ChapterAttachment[];
//     })[];
//   };
//   progressCount: number;
//   quizId: string;
// }

// export const CourseSidebar = async ({
//   course,
//   progressCount,
//   quizId,
// }: CourseSidebarProps) => {
//   const { userId, getToken } = auth();

//   if (!userId) {
//     return redirect("/");
//   }

//   const purchase = await db.purchase.findUnique({
//     where: {
//       userId_courseId: {
//         userId,
//         courseId: course.id,
//       },
//     },
//   });

//   const token = await getToken();

//   // Fetch quiz pass status and attempt count for each chapter
//   const chapterQuizStatus = await Promise.all(
//     course.chapters.map(async (chapter) => {
//       try {
//         // Fetch quiz results (pass/fail status)
//         const resultsResponse = await axios.get(
//           `${BASE_URL}/api/courses/${course.id}/chapters/${chapter.id}/chapterquizzes/results`,
//           {
//             headers: {
//               "user-id": userId,
//               Authorization: token ? `Bearer ${token}` : undefined,
//             },
//           }
//         );
//         const scorePercentage = (resultsResponse.data.score / resultsResponse.data.totalQuestions) * 100;
//         const passed = scorePercentage >= 60;

//         // Fetch number of attempts for this chapter
//         const attemptsResponse = await axios.get(
//           `${BASE_URL}/api/courses/${course.id}/chapters/${chapter.id}/chapterquizzes/attempts`,
//           {
//             headers: {
//               "user-id": userId,
//               Authorization: token ? `Bearer ${token}` : undefined,
//             },
//           }
//         );
//         const attempts = attemptsResponse.data.attempts || 0;
//         const maxAttempts = 3; // Match the maxAttempts from chapterquiz.tsx

//         return { 
//           chapterId: chapter.id, 
//           passed, 
//           attempts, 
//           maxAttempts 
//         };
//       } catch (error) {
//         console.error(`Failed to fetch quiz results or attempts for chapter ${chapter.id}:`, error);
//         return { 
//           chapterId: chapter.id, 
//           passed: false, 
//           attempts: 0, 
//           maxAttempts: 3 
//         }; // Default to not passed and no attempts
//       }
//     })
//   );

//   const allChaptersCompleted = course.chapters.every(
//     (chapter) => !!chapter.userProgress?.[0]?.isCompleted
//   );

//   return (
//     <div className="h-full border-r flex flex-col overflow-y-auto shadow-md bg-white">
//       <div className="p-4 pb-5 bg-white border-b border-gray-200">
//         <Logo />
//       </div>
//       <div className="p-4 flex flex-col border-b border-gray-200">
//         <h1
//           className="font-semibold text-lg text-center"
//           style={{
//             color: "#1E90FF", // Blue color for text (matching AccioJob blue)
//             backgroundColor: "white",
//             padding: "8px 16px",
//             borderRadius: "4px",
//             fontSize: "18px",
//             overflow: "hidden",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           {course.title}
//         </h1>
//         {purchase && (
//           <div className="mt-4">
//             <CourseProgress variant="success" value={progressCount} />
//           </div>
//         )}
//       </div>

//       <div className="flex flex-col w-full p-2">
//         {course.chapters.map((chapter, index) => {
//           const chapterStatus = chapterQuizStatus.find((status) => status.chapterId === chapter.id);
//           const isCurrentChapterPassed = chapterStatus?.passed || false;
//           const currentAttempts = chapterStatus?.attempts || 0;
//           const maxAttemptsAllowed = chapterStatus?.maxAttempts || 3;

//           const isPreviousChapterPassed =
//             index === 0 || (chapterQuizStatus[index - 1]?.passed ?? false);

//           // Lock the next chapter if the current quiz isn't passed or attempts are exhausted
//           const isNextChapterLocked =
//             index < course.chapters.length - 1 && // Check if there's a next chapter
//             (!isCurrentChapterPassed || currentAttempts >= maxAttemptsAllowed); // Lock if current quiz isn't passed or attempts are exhausted

//           return (
//             <div key={chapter.id} className="mb-2">
//               <CourseSidebarItem
//                 id={chapter.id}
//                 label={chapter.title}
//                 isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
//                 courseId={course.id}
//                 isLocked={
//                   (!chapter.isFree && !purchase) || // Locked if not free and not purchased
//                   (index > 0 && !isPreviousChapterPassed) // Locked if previous chapter quiz not passed
//                 }
//               />

//               {/* Chapter Attachments Dropdown */}
//               <div className="ml-4 mt-1">
//                 {chapter.chapterattachments && chapter.chapterattachments.length > 0 && (
//                   <details className="group">
//                     <summary className="text-sm font-medium text-gray-600 cursor-pointer flex items-center p-2 rounded-md hover:bg-gray-100 transition-colors duration-200">
//                       <span className="mr-2 text-[#FF0000]">📎</span>
//                       <span className="text-[#1E90FF]">
//                         Chapter Attachments ({chapter.chapterattachments.length})
//                       </span>
//                     </summary>
//                     <div className="mt-1 pl-4 pr-2">
//                       {chapter.chapterattachments.map((attachment) => (
//                         <div
//                           key={attachment.id}
//                           className="mb-1 p-2 bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-md shadow-sm hover:shadow-md transition-all duration-300"
//                         >
//                           <a
//                             href={attachment.url}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="flex items-center text-blue-700 font-medium text-xs hover:text-blue-900 transition-colors duration-200"
//                           >
//                             <span className="mr-1">📄</span>
//                             <span className="truncate">{attachment.name}</span>
//                           </a>
//                         </div>
//                       ))}
//                     </div>
//                   </details>
//                 )}
//               </div>

//               {/* Chapter Quiz Button - Show only if attempts remain or quiz hasn't been attempted yet, with updated text and optional hiding */}
//               {!!chapter.userProgress?.[0]?.isCompleted && isPreviousChapterPassed && (
//                 <div className="p-2">
//                   {currentAttempts < maxAttemptsAllowed ? (
//                     <ChapterQuizButton 
//                       key={`${chapter.id}-${isCurrentChapterPassed}`} // Force re-render when quiz status changes
//                       courseId={course.id} 
//                       chapterId={chapter.id} 
//                       isQuizPassed={isCurrentChapterPassed} 
//                       hideOnPass={false} // Default to not hiding; can be toggled to true to hide when quiz is passed
//                     />
//                   ) : (
//                     <div className="text-red-600 text-xs font-medium">
//                       No attempts remaining. Please rewatch the video to unlock.
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>

//       {allChaptersCompleted && (
//         <div className="p-2">
//           <QuizButton courseId={course.id} quizId={quizId} />
//         </div>
//       )}

//       {!allChaptersCompleted && (
//         <div 
//           className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-4 rounded-lg shadow-lg transform transition-all duration-300 hover:shadow-xl hover:scale-[1.02] border border-transparent hover:border-blue-300"
//         >
//           <div className="flex items-center justify-center gap-2 animate-pulse-once">
//             <span className="text-2xl">🎯</span>
//             <h2 className="text-base font-bold tracking-tight">Complete All Chapters</h2>
//           </div>
//           <p className="text-sm mt-2 text-center font-medium opacity-90 leading-relaxed">
//             Unlock the final quiz to test your mastery and elevate your skills!
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };



















// import { auth } from "@clerk/nextjs/server";
// import { Chapter, Course, UserProgress, ChapterAttachment } from "@prisma/client";
// import { redirect } from "next/navigation";
// import { db } from "@/lib/db";
// import { CourseProgress } from "@/components/course-progress";
// import { CourseSidebarItem } from "./course-sidebar-item";
// import QuizButton from "./quiz-button";
// import ChapterQuizButton from "./chapter-quiz-button";
// import { Logo } from "./logo";
// import axios from "axios";

// // Base URL for server-side requests
// const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// interface CourseSidebarProps {
//   course: Course & {
//     chapters: (Chapter & {
//       userProgress: UserProgress[] | null;
//       chapterattachments: ChapterAttachment[];
//     })[];
//   };
//   progressCount: number;
//   quizId: string;
// }

// export const CourseSidebar = async ({
//   course,
//   progressCount,
//   quizId,
// }: CourseSidebarProps) => {
//   const { userId, getToken } = auth();

//   if (!userId) {
//     return redirect("/");
//   }

//   const purchase = await db.purchase.findUnique({
//     where: {
//       userId_courseId: {
//         userId,
//         courseId: course.id,
//       },
//     },
//   });

//   const token = await getToken();

//   const chapterQuizStatus = await Promise.all(
//     course.chapters.map(async (chapter) => {
//       try {
//         const response = await axios.get(
//           `${BASE_URL}/api/courses/${course.id}/chapters/${chapter.id}/chapterquizzes/results`,
//           {
//             headers: {
//               "user-id": userId,
//               Authorization: token ? `Bearer ${token}` : undefined,
//             },
//           }
//         );
//         const scorePercentage = (response.data.score / response.data.totalQuestions) * 100;
//         return { chapterId: chapter.id, passed: scorePercentage >= 60 };
//       } catch (error) {
//         console.error(`Failed to fetch quiz results for chapter ${chapter.id}:`, error);
//         return { chapterId: chapter.id, passed: false };
//       }
//     })
//   );

//   const allChaptersCompleted = course.chapters.every(
//     (chapter) => !!chapter.userProgress?.[0]?.isCompleted
//   );

//   return (
//     <div className="h-full border-r flex flex-col overflow-y-auto bg-gray-50 shadow-lg w-80">
//       {/* Header Section */}
//       <div className="p-6 bg-white">
//         <Logo />
//       </div>

//       {/* Course Title and Progress */}
//       <div className="p-6 bg-white border-b border-gray-200">
//         <h1
//           className="font-bold text-lg text-center"
//           style={{
//             color: "#FFD700",
//             background: "linear-gradient(90deg, #6A0DAD, #8A2BE2)",
//             padding: "12px",
//             borderRadius: "8px",
//             boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
//           }}
//         >
//           {course.title}
//         </h1>
//         {purchase && (
//           <div className="mt-6">
//             <CourseProgress variant="success" value={progressCount} size="sm" />
//           </div>
//         )}
//       </div>

//       {/* Chapters List */}
//       <div className="flex-1 px-4 py-6 space-y-4">
//         {course.chapters.map((chapter, index) => {
//           const isCurrentChapterPassed =
//             chapterQuizStatus.find((status) => status.chapterId === chapter.id)?.passed || false;
//           const isPreviousChapterPassed =
//             index === 0 || chapterQuizStatus[index - 1]?.passed || false;

//           return (
//             <div
//               key={chapter.id}
//               className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
//             >
//               <CourseSidebarItem
//                 id={chapter.id}
//                 label={chapter.title}
//                 isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
//                 courseId={course.id}
//                 isLocked={!chapter.isFree && !purchase || !isPreviousChapterPassed}
//               />

//               {/* Chapter Attachments */}
//               {chapter.chapterattachments?.length > 0 && (
//                 <details className="group px-4 py-2">
//                   <summary className="text-sm font-semibold text-gray-700 cursor-pointer flex items-center p-2 rounded-md hover:bg-gray-100 transition-colors duration-200">
//                     <span className="mr-2 text-red-500">📎</span>
//                     <span className="text-purple-800">
//                       Resources ({chapter.chapterattachments.length})
//                     </span>
//                   </summary>
//                   <div className="mt-2 space-y-2">
//                     {chapter.chapterattachments.map((attachment) => (
//                       <a
//                         key={attachment.id}
//                         href={attachment.url}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="flex items-center p-2 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors duration-200 text-sm text-blue-600 hover:text-blue-800"
//                       >
//                         <span className="mr-2">📄</span>
//                         <span className="truncate">{attachment.name}</span>
//                       </a>
//                     ))}
//                   </div>
//                 </details>
//               )}

//               {/* Chapter Quiz Button */}
//               {!!chapter.userProgress?.[0]?.isCompleted && isPreviousChapterPassed && (
//                 <div className="px-4 pb-4">
//                   <ChapterQuizButton courseId={course.id} chapterId={chapter.id} />
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>

//       {/* Footer Section */}
//       <div className="p-6 border-t border-gray-200 bg-white">
//         {allChaptersCompleted ? (
//           <QuizButton courseId={course.id} quizId={quizId} />
//         ) : (
//           <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-4 rounded-lg shadow-md">
//             <h2 className="text-lg font-semibold">🎯 Complete All Chapters</h2>
//             <p className="text-sm mt-1">Unlock the final quiz to test your mastery!</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };


















// import { auth } from "@clerk/nextjs/server";
// import { Chapter, Course, UserProgress, ChapterAttachment } from "@prisma/client";
// import { redirect } from "next/navigation";
// import { db } from "@/lib/db";
// import { CourseProgress } from "@/components/course-progress";
// import { CourseSidebarItem } from "./course-sidebar-item";
// import QuizButton from "./quiz-button";
// import ChapterQuizButton from "./chapter-quiz-button";
// import { Logo } from "./logo";
// import axios from "axios";

// // Base URL for server-side requests
// const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// interface CourseSidebarProps {
//   course: Course & {
//     chapters: (Chapter & {
//       userProgress: UserProgress[] | null;
//       chapterattachments: ChapterAttachment[];
//     })[];
//   };
//   progressCount: number;
//   quizId: string;
// }

// export const CourseSidebar = async ({
//   course,
//   progressCount,
//   quizId,
// }: CourseSidebarProps) => {
//   const { userId, getToken } = auth();

//   if (!userId) {
//     return redirect("/");
//   }

//   const purchase = await db.purchase.findUnique({
//     where: {
//       userId_courseId: {
//         userId,
//         courseId: course.id,
//       },
//     },
//   });

//   const token = await getToken();

//   const chapterQuizStatus = await Promise.all(
//     course.chapters.map(async (chapter) => {
//       try {
//         const response = await axios.get(
//           `${BASE_URL}/api/courses/${course.id}/chapters/${chapter.id}/chapterquizzes/results`,
//           {
//             headers: {
//               "user-id": userId,
//               Authorization: token ? `Bearer ${token}` : undefined,
//             },
//           }
//         );
//         const scorePercentage = (response.data.score / response.data.totalQuestions) * 100;
//         return { chapterId: chapter.id, passed: scorePercentage >= 60 };
//       } catch (error) {
//         console.error(`Failed to fetch quiz results for chapter ${chapter.id}:`, error);
//         return { chapterId: chapter.id, passed: false };
//       }
//     })
//   );

//   const allChaptersCompleted = course.chapters.every(
//     (chapter) => !!chapter.userProgress?.[0]?.isCompleted
//   );

//   return (
//     <div className="h-full border-r flex flex-col overflow-y-auto bg-gray-50 shadow-lg w-80">
//       {/* Header Section */}
//       <div className="p-6 bg-white">
//         <Logo />
//       </div>

//       {/* Course Title and Progress */}
//       <div className="p-6 bg-white border-b border-gray-200">
//         <h1
//           className="font-bold text-lg text-center"
//           style={{
//             color: "#FFD700",
//             background: "linear-gradient(90deg, #6A0DAD, #8A2BE2)",
//             padding: "12px",
//             borderRadius: "8px",
//             boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
//           }}
//         >
//           {course.title}
//         </h1>
//         {purchase && (
//           <div className="mt-6">
//             <CourseProgress variant="success" value={progressCount} size="sm" />
//           </div>
//         )}
//       </div>

//       {/* Chapters List */}
//       <div className="flex-1 px-4 py-6 space-y-4">
//         {course.chapters.map((chapter, index) => {
//           const isCurrentChapterPassed =
//             chapterQuizStatus.find((status) => status.chapterId === chapter.id)?.passed || false;
//           const isPreviousChapterPassed =
//             index === 0 || chapterQuizStatus[index - 1]?.passed || false;
//           const isLocked = !chapter.isFree && !purchase || !isPreviousChapterPassed;

//           return (
//             <div
//               key={chapter.id}
//               className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
//             >
//               <CourseSidebarItem
//                 id={chapter.id}
//                 label={chapter.title}
//                 isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
//                 courseId={course.id}
//                 isLocked={isLocked}
//               />

//               {/* Chapter Attachments - Only show if chapter is unlocked */}
//               {!isLocked && chapter.chapterattachments?.length > 0 && (
//                 <details className="group px-4 py-2">
//                   <summary className="text-sm font-semibold text-gray-700 cursor-pointer flex items-center p-2 rounded-md hover:bg-gray-100 transition-colors duration-200">
//                     <span className="mr-2 text-red-500">📎</span>
//                     <span className="text-purple-800">
//                       Resources ({chapter.chapterattachments.length})
//                     </span>
//                   </summary>
//                   <div className="mt-2 space-y-2">
//                     {chapter.chapterattachments.map((attachment) => (
//                       <a
//                         key={attachment.id}
//                         href={attachment.url}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="flex items-center p-2 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors duration-200 text-sm text-blue-600 hover:text-blue-800"
//                       >
//                         <span className="mr-2">📄</span>
//                         <span className="truncate">{attachment.name}</span>
//                       </a>
//                     ))}
//                   </div>
//                 </details>
//               )}

//               {/* Chapter Quiz Button */}
//               {!!chapter.userProgress?.[0]?.isCompleted && isPreviousChapterPassed && (
//                 <div className="px-4 pb-4">
//                   <ChapterQuizButton courseId={course.id} chapterId={chapter.id} />
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>

//       {/* Footer Section */}
//       <div className="p-6 border-t border-gray-200 bg-white">
//         {allChaptersCompleted ? (
//           <QuizButton courseId={course.id} quizId={quizId} />
//         ) : (
//           <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-4 rounded-lg shadow-md">
//             <h2 className="text-lg font-semibold">🎯 Complete All Chapters</h2>
//             <p className="text-sm mt-1">Unlock the final quiz to test your mastery!</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };







// import { auth } from "@clerk/nextjs/server";
// import { Chapter, Course, UserProgress, ChapterAttachment } from "@prisma/client";
// import { redirect } from "next/navigation";
// import { db } from "@/lib/db";
// import { CourseProgress } from "@/components/course-progress";
// import { CourseSidebarItem } from "./course-sidebar-item";
// import QuizButton from "./quiz-button";
// import ChapterQuizButton from "./chapter-quiz-button";
// import { Logo } from "./logo";
// import axios from "axios";

// // Base URL for server-side requests
// const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// interface CourseSidebarProps {
//   course: Course & {
//     chapters: (Chapter & {
//       userProgress: UserProgress[] | null;
//       chapterattachments: ChapterAttachment[];
//     })[];
//   };
//   progressCount: number;
//   quizId: string;
// }

// export const CourseSidebar = async ({
//   course,
//   progressCount,
//   quizId,
// }: CourseSidebarProps) => {
//   const { userId, getToken } = auth();

//   if (!userId) {
//     return redirect("/");
//   }

//   const purchase = await db.purchase.findUnique({
//     where: {
//       userId_courseId: {
//         userId,
//         courseId: course.id,
//       },
//     },
//   });

//   const token = await getToken();

//   const chapterQuizStatus = await Promise.all(
//     course.chapters.map(async (chapter) => {
//       try {
//         const response = await axios.get(
//           `${BASE_URL}/api/courses/${course.id}/chapters/${chapter.id}/chapterquizzes/results`,
//           {
//             headers: {
//               "user-id": userId,
//               Authorization: token ? `Bearer ${token}` : undefined,
//             },
//           }
//         );
//         const scorePercentage = (response.data.score / response.data.totalQuestions) * 100;
//         return { chapterId: chapter.id, passed: scorePercentage >= 60 };
//       } catch (error: any) {
//         if (error.response?.status === 404) {
//           // 404 means no quiz results exist (quiz not taken), treat as not passed
//           return { chapterId: chapter.id, passed: false };
//         } else {
//           // Log unexpected errors (e.g., 500, network issues)
//           console.error(`Failed to fetch quiz results for chapter ${chapter.id}:`, error);
//           return { chapterId: chapter.id, passed: false };
//         }
//       }
//     })
//   );

//   const allChaptersCompleted = course.chapters.every(
//     (chapter) => !!chapter.userProgress?.[0]?.isCompleted
//   );

//   return (
//     <div className="h-full border-r flex flex-col overflow-y-auto bg-gray-50 shadow-lg w-80">
//       {/* Header Section */}
//       <div className="p-6 bg-white">
//         <Logo />
//       </div>

//       {/* Course Title and Progress */}
//       <div className="p-6 bg-white border-b border-gray-200">
//         <h1
//           className="font-bold text-lg text-center"
//           style={{
//             color: "#FFD700",
//             background: "linear-gradient(90deg, #6A0DAD, #8A2BE2)",
//             padding: "12px",
//             borderRadius: "8px",
//             boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
//           }}
//         >
//           {course.title}
//         </h1>
//         {purchase && (
//           <div className="mt-6">
//             <CourseProgress variant="success" value={progressCount} size="sm" />
//           </div>
//         )}
//       </div>

//       {/* Chapters List */}
//       <div className="flex-1 px-4 py-6 space-y-4">
//         {course.chapters.map((chapter, index) => {
//           const isCurrentChapterPassed =
//             chapterQuizStatus.find((status) => status.chapterId === chapter.id)?.passed || false;
//           const isPreviousChapterPassed =
//             index === 0 || chapterQuizStatus[index - 1]?.passed || false;
//           const isLocked = !chapter.isFree && !purchase || !isPreviousChapterPassed;

//           return (
//             <div
//               key={chapter.id}
//               className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
//             >
//               <CourseSidebarItem
//                 id={chapter.id}
//                 label={chapter.title}
//                 isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
//                 courseId={course.id}
//                 isLocked={isLocked}
//               />

//               {/* Chapter Attachments - Only show if chapter is unlocked */}
//               {!isLocked && chapter.chapterattachments?.length > 0 && (
//                 <details className="group px-4 py-2">
//                   <summary className="text-sm font-semibold text-gray-700 cursor-pointer flex items-center p-2 rounded-md hover:bg-gray-100 transition-colors duration-200">
//                     <span className="mr-2 text-red-500">📎</span>
//                     <span className="text-purple-800">
//                       Resources ({chapter.chapterattachments.length})
//                     </span>
//                   </summary>
//                   <div className="mt-2 space-y-2">
//                     {chapter.chapterattachments.map((attachment) => (
//                       <a
//                         key={attachment.id}
//                         href={attachment.url}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="flex items-center p-2 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors duration-200 text-sm text-blue-600 hover:text-blue-800"
//                       >
//                         <span className="mr-2">📄</span>
//                         <span className="truncate">{attachment.name}</span>
//                       </a>
//                     ))}
//                   </div>
//                 </details>
//               )}

//               {/* Chapter Quiz Button */}
//               {!!chapter.userProgress?.[0]?.isCompleted && isPreviousChapterPassed && (
//                 <div className="px-4 pb-4">
//                   <ChapterQuizButton courseId={course.id} chapterId={chapter.id} />
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>

//       {/* Footer Section */}
//       <div className="p-6 border-t border-gray-200 bg-white">
//         {allChaptersCompleted ? (
//           <QuizButton courseId={course.id} quizId={quizId} />
//         ) : (
//           <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-4 rounded-lg shadow-md">
//             <h2 className="text-lg font-semibold">🎯 Complete All Chapters</h2>
//             <p className="text-sm mt-1">Unlock the final quiz to test your mastery!</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };







// import { auth } from "@clerk/nextjs/server";
// import { Chapter, Course, UserProgress, ChapterAttachment } from "@prisma/client";
// import { redirect } from "next/navigation";
// import { db } from "@/lib/db";
// import { CourseProgress } from "@/components/course-progress";
// import { CourseSidebarItem } from "./course-sidebar-item";
// import QuizButton from "./quiz-button";
// import ChapterQuizButton from "./chapter-quiz-button";
// import { Logo } from "./logo";
// import axios from "axios";

// const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// interface CourseSidebarProps {
//   course: Course & {
//     chapters: (Chapter & {
//       userProgress: UserProgress[] | null;
//       chapterattachments: ChapterAttachment[];
//     })[];
//   };
//   progressCount: number;
//   quizId: string;
// }

// export const CourseSidebar = async ({
//   course,
//   progressCount,
//   quizId,
// }: CourseSidebarProps) => {
//   const { userId, getToken } = auth();

//   if (!userId) {
//     return redirect("/");
//   }

//   const purchase = await db.purchase.findUnique({
//     where: {
//       userId_courseId: {
//         userId,
//         courseId: course.id,
//       },
//     },
//   });

//   const token = await getToken();

//   // Check quiz status for each chapter
//   const chapterQuizStatus = await Promise.all(
//     course.chapters.map(async (chapter) => {
//       try {
//         const response = await axios.get(
//           `${BASE_URL}/api/courses/${course.id}/chapters/${chapter.id}/chapterquizzes/results`,
//           {
//             headers: {
//               "user-id": userId,
//               Authorization: token ? `Bearer ${token}` : undefined,
//             },
//           }
//         );
//         const scorePercentage = (response.data.score / response.data.totalQuestions) * 100;
//         return { 
//           chapterId: chapter.id, 
//           passed: scorePercentage >= 60,
//           completed: !!chapter.userProgress?.[0]?.isCompleted
//         };
//       } catch (error: any) {
//         if (error.response?.status === 404) {
//           return { 
//             chapterId: chapter.id, 
//             passed: false,
//             completed: !!chapter.userProgress?.[0]?.isCompleted
//           };
//         }
//         console.error(`Failed to fetch quiz results for chapter ${chapter.id}:`, error);
//         return { 
//           chapterId: chapter.id, 
//           passed: false,
//           completed: !!chapter.userProgress?.[0]?.isCompleted
//         };
//       }
//     })
//   );

//   // Check if all chapters are completed AND their quizzes are passed
//   const allChaptersCompleted = course.chapters.every(
//     (chapter) => !!chapter.userProgress?.[0]?.isCompleted
//   );

//   const allChapterQuizzesPassed = chapterQuizStatus.every(
//     (status) => status.passed
//   );

//   // Final condition to show the quiz button
//   const showFinalQuizButton = allChaptersCompleted && allChapterQuizzesPassed;

//   return (
//     <div className="h-full border-r flex flex-col overflow-y-auto bg-gray-50 shadow-lg w-80">
//       {/* Header Section */}
//       <div className="p-6 bg-white">
//         <Logo />
//       </div>

//       {/* Course Title and Progress */}
//       <div className="p-6 bg-white border-b border-gray-200">
//         <h1
//           className="font-bold text-lg text-center"
//           style={{
//             color: "#FFD700",
//             background: "linear-gradient(90deg, #6A0DAD, #8A2BE2)",
//             padding: "12px",
//             borderRadius: "8px",
//             boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
//           }}
//         >
//           {course.title}
//         </h1>
//         {purchase && (
//           <div className="mt-6">
//             <CourseProgress variant="success" value={progressCount} size="sm" />
//           </div>
//         )}
//       </div>

//       {/* Chapters List */}
//       <div className="flex-1 px-4 py-6 space-y-4">
//         {course.chapters.map((chapter, index) => {
//           const chapterStatus = chapterQuizStatus.find(
//             (status) => status.chapterId === chapter.id
//           );
          
//           const isCurrentChapterPassed = chapterStatus?.passed || false;
//           const isPreviousChapterPassed = 
//             index === 0 || chapterQuizStatus[index - 1]?.passed || false;
          
//           const isLocked = (!chapter.isFree && !purchase) || 
//                          (index > 0 && !chapterQuizStatus[index - 1]?.passed);

//           return (
//             <div
//               key={chapter.id}
//               className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
//             >
//               <CourseSidebarItem
//                 id={chapter.id}
//                 label={chapter.title}
//                 isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
//                 courseId={course.id}
//                 isLocked={isLocked}
//               />

//               {!isLocked && chapter.chapterattachments?.length > 0 && (
//                 <details className="group px-4 py-2">
//                   <summary className="text-sm font-semibold text-gray-700 cursor-pointer flex items-center p-2 rounded-md hover:bg-gray-100 transition-colors duration-200">
//                     <span className="mr-2 text-red-500">📎</span>
//                     <span className="text-purple-800">
//                       Resources ({chapter.chapterattachments.length})
//                     </span>
//                   </summary>
//                   <div className="mt-2 space-y-2">
//                     {chapter.chapterattachments.map((attachment) => (
//                       <a
//                         key={attachment.id}
//                         href={attachment.url}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="flex items-center p-2 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors duration-200 text-sm text-blue-600 hover:text-blue-800"
//                       >
//                         <span className="mr-2">📄</span>
//                         <span className="truncate">{attachment.name}</span>
//                       </a>
//                     ))}
//                   </div>
//                 </details>
//               )}

//               {!!chapter.userProgress?.[0]?.isCompleted && isPreviousChapterPassed && (
//                 <div className="px-4 pb-4">
//                   <ChapterQuizButton courseId={course.id} chapterId={chapter.id} />
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>

//       {/* Footer Section */}
//       <div className="p-6 border-t border-gray-200 bg-white">
//         {showFinalQuizButton ? (
//           <QuizButton courseId={course.id} quizId={quizId} />
//         ) : (
//           <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-4 rounded-lg shadow-md">
//             <h2 className="text-lg font-semibold">
//               {allChaptersCompleted && !allChapterQuizzesPassed
//                 ? "🎯 Pass All Chapter Quizzes"
//                 : "🎯 Complete All Chapters"}
//             </h2>
//             <p className="text-sm mt-1">
//               {allChaptersCompleted && !allChapterQuizzesPassed
//                 ? "Complete all chapter quizzes to unlock the final quiz!"
//                 : "Complete all chapters to unlock chapter quizzes!"}
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };






// import { auth } from "@clerk/nextjs/server";
// import { Chapter, Course, UserProgress, ChapterAttachment } from "@prisma/client";
// import { redirect } from "next/navigation";
// import { db } from "@/lib/db";
// import { CourseProgress } from "@/components/course-progress";
// import { CourseSidebarItem } from "./course-sidebar-item";
// import QuizButton from "./quiz-button";
// import ChapterQuizButton from "./chapter-quiz-button";
// import { Logo } from "./logo";
// import axios from "axios";

// const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// interface CourseSidebarProps {
//   course: Course & {
//     chapters: (Chapter & {
//       userProgress: UserProgress[] | null;
//       chapterattachments: ChapterAttachment[];
//     })[];
//   };
//   progressCount: number;
//   quizId: string;
// }

// export const CourseSidebar = async ({
//   course,
//   progressCount,
//   quizId,
// }: CourseSidebarProps) => {
//   const { userId, getToken } = auth();

//   if (!userId) {
//     return redirect("/");
//   }

//   const purchase = await db.purchase.findUnique({
//     where: {
//       userId_courseId: {
//         userId,
//         courseId: course.id,
//       },
//     },
//   });

//   const token = await getToken();

//   // Check quiz status for each chapter
//   const chapterQuizStatus = await Promise.all(
//     course.chapters.map(async (chapter) => {
//       try {
//         const response = await axios.get(
//           `${BASE_URL}/api/courses/${course.id}/chapters/${chapter.id}/chapterquizzes/results`,
//           {
//             headers: {
//               "user-id": userId,
//               Authorization: token ? `Bearer ${token}` : undefined,
//             },
//           }
//         );
//         const scorePercentage = response.data.totalQuestions > 0
//           ? (response.data.score / response.data.totalQuestions) * 100
//           : 0;
//         console.log(`Chapter ${chapter.id} quiz results: score=${response.data.score}, totalQuestions=${response.data.totalQuestions}, passed=${scorePercentage >= 60}`);
//         return { 
//           chapterId: chapter.id, 
//           passed: scorePercentage >= 60 || response.data.totalQuestions === 0, // Pass if no questions or score ≥ 60%
//           completed: !!chapter.userProgress?.[0]?.isCompleted
//         };
//       } catch (error: any) {
//         if (error.response?.status === 404) {
//           console.log(`No quiz found for chapter ${chapter.id}, treating as passed`);
//           return { 
//             chapterId: chapter.id, 
//             passed: true, // No quiz means passed for this purpose
//             completed: !!chapter.userProgress?.[0]?.isCompleted
//           };
//         }
//         console.error(`Failed to fetch quiz results for chapter ${chapter.id}:`, error);
//         return { 
//           chapterId: chapter.id, 
//           passed: false,
//           completed: !!chapter.userProgress?.[0]?.isCompleted
//         };
//       }
//     })
//   );

//   // Check if all chapters are completed AND their quizzes are passed
//   const allChaptersCompleted = course.chapters.every(
//     (chapter) => !!chapter.userProgress?.[0]?.isCompleted
//   );

//   const allChapterQuizzesPassed = chapterQuizStatus.every(
//     (status) => status.passed
//   );

//   // Log for debugging
//   console.log(`allChaptersCompleted: ${allChaptersCompleted}, allChapterQuizzesPassed: ${allChapterQuizzesPassed}`);

//   // Final condition to show the quiz button
//   const showFinalQuizButton = allChaptersCompleted && allChapterQuizzesPassed;

//   return (
//     <div className="h-full border-r flex flex-col overflow-y-auto bg-gray-50 shadow-lg w-80">
//       {/* Header Section */}
//       <div className="p-6 bg-white">
//         <Logo />
//       </div>

//       {/* Course Title and Progress */}
//       <div className="p-6 bg-white border-b border-gray-200">
//         <h1
//           className="font-bold text-lg text-center"
//           style={{
//             color: "#FFD700",
//             background: "linear-gradient(90deg, #6A0DAD, #8A2BE2)",
//             padding: "12px",
//             borderRadius: "8px",
//             boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
//           }}
//         >
//           {course.title}
//         </h1>
//         {purchase && (
//           <div className="mt-6">
//             <CourseProgress variant="success" value={progressCount} size="sm" />
//           </div>
//         )}
//       </div>

//       {/* Chapters List */}
//       <div className="flex-1 px-4 py-6 space-y-4">
//         {course.chapters.map((chapter, index) => {
//           const chapterStatus = chapterQuizStatus.find(
//             (status) => status.chapterId === chapter.id
//           );
          
//           const isCurrentChapterPassed = chapterStatus?.passed || false;
//           const isPreviousChapterPassed = 
//             index === 0 || chapterQuizStatus[index - 1]?.passed || false;
          
//           const isLocked = (!chapter.isFree && !purchase) || 
//                          (index > 0 && !chapterQuizStatus[index - 1]?.passed);

//           return (
//             <div
//               key={chapter.id}
//               className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
//             >
//               <CourseSidebarItem
//                 id={chapter.id}
//                 label={chapter.title}
//                 isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
//                 courseId={course.id}
//                 isLocked={isLocked}
//               />

//               {!isLocked && chapter.chapterattachments?.length > 0 && (
//                 <details className="group px-4 py-2">
//                   <summary className="text-sm font-semibold text-gray-700 cursor-pointer flex items-center p-2 rounded-md hover:bg-gray-100 transition-colors duration-200">
//                     <span className="mr-2 text-red-500">📎</span>
//                     <span className="text-purple-800">
//                       Resources ({chapter.chapterattachments.length})
//                     </span>
//                   </summary>
//                   <div className="mt-2 space-y-2">
//                     {chapter.chapterattachments.map((attachment) => (
//                       <a
//                         key={attachment.id}
//                         href={attachment.url}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="flex items-center p-2 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors duration-200 text-sm text-blue-600 hover:text-blue-800"
//                       >
//                         <span className="mr-2">📄</span>
//                         <span className="truncate">{attachment.name}</span>
//                       </a>
//                     ))}
//                   </div>
//                 </details>
//               )}

//               {!!chapter.userProgress?.[0]?.isCompleted && isPreviousChapterPassed && (
//                 <div className="px-4 pb-4">
//                   <ChapterQuizButton courseId={course.id} chapterId={chapter.id} />
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>

//       {/* Footer Section */}
//       <div className="p-6 border-t border-gray-200 bg-white">
//         {showFinalQuizButton ? (
//           <QuizButton courseId={course.id} quizId={quizId} />
//         ) : (
//           <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-4 rounded-lg shadow-md">
//             <h2 className="text-lg font-semibold">
//               {allChaptersCompleted && !allChapterQuizzesPassed
//                 ? "🎯 Pass All Chapter Quizzes"
//                 : "🎯 Complete All Chapters"}
//             </h2>
//             <p className="text-sm mt-1">
//               {allChaptersCompleted && !allChapterQuizzesPassed
//                 ? "Complete all chapter quizzes to unlock the final quiz!"
//                 : "Complete all chapters to unlock chapter quizzes!"}
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };





// // components/course-sidebar.tsx
// import { auth } from "@clerk/nextjs/server";
// import { Chapter, Course, UserProgress, ChapterAttachment } from "@prisma/client";
// import { redirect } from "next/navigation";
// import { db } from "@/lib/db";
// import { CourseProgress } from "@/components/course-progress";
// import { CourseSidebarItem } from "./course-sidebar-item";
// import QuizButton from "./quiz-button";
// import ChapterQuizButton from "./chapter-quiz-button";
// import { Logo } from "./logo";
// import axios from "axios";

// const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// interface CourseSidebarProps {
//   course: Course & {
//     chapters: (Chapter & {
//       userProgress: UserProgress[] | null;
//       chapterattachments: ChapterAttachment[];
//     })[];
//   };
//   progressCount: number;
//   quizId: string;
// }

// export const CourseSidebar = async ({
//   course,
//   progressCount,
//   quizId,
// }: CourseSidebarProps) => {
//   const { userId, getToken } = auth();

//   if (!userId) {
//     return redirect("/");
//   }

//   const purchase = await db.purchase.findUnique({
//     where: {
//       userId_courseId: {
//         userId,
//         courseId: course.id,
//       },
//     },
//   });

//   const token = await getToken();

//   // Check quiz status for each chapter
//   const chapterQuizStatus = await Promise.all(
//     course.chapters.map(async (chapter) => {
//       try {
//         const response = await axios.get(
//           `${BASE_URL}/api/courses/${course.id}/chapters/${chapter.id}/chapterquizzes/results`,
//           {
//             headers: {
//               "user-id": userId,
//               Authorization: token ? `Bearer ${token}` : undefined,
//             },
//           }
//         );
//         const scorePercentage = response.data.totalQuestions > 0
//           ? (response.data.score / response.data.totalQuestions) * 100
//           : 0;
//         console.log(`Chapter ${chapter.id} quiz results: score=${response.data.score}, totalQuestions=${response.data.totalQuestions}, scorePercentage=${scorePercentage}, passed=${scorePercentage >= 60}, hasAttempted=true`);
//         return { 
//           chapterId: chapter.id, 
//           hasAttempted: true, // Quiz results exist, so it was attempted
//           passed: scorePercentage >= 60, // Pass only if score ≥ 60%
//           completed: !!chapter.userProgress?.[0]?.isCompleted
//         };
//       } catch (error: any) {
//         if (error.response?.status === 404) {
//           console.log(`No quiz results found for chapter ${chapter.id}, treating as not attempted`);
//           return { 
//             chapterId: chapter.id, 
//             hasAttempted: false, // No results means not attempted
//             passed: false, // Not passed since not attempted
//             completed: !!chapter.userProgress?.[0]?.isCompleted
//           };
//         }
//         console.error(`Failed to fetch quiz results for chapter ${chapter.id}:`, error.message);
//         return { 
//           chapterId: chapter.id, 
//           hasAttempted: false, // Treat errors as not attempted
//           passed: false, // Not passed due to error
//           completed: !!chapter.userProgress?.[0]?.isCompleted
//         };
//       }
//     })
//   );

//   // Check if all chapters are completed AND their quizzes are passed
//   const allChaptersCompleted = course.chapters.every(
//     (chapter) => !!chapter.userProgress?.[0]?.isCompleted
//   );

//   const allChapterQuizzesPassed = chapterQuizStatus.every(
//     (status) => status.passed || !status.hasAttempted // Pass if not attempted or passed
//   );

//   // Define showFinalQuizButton
//   const showFinalQuizButton = allChaptersCompleted && allChapterQuizzesPassed;

//   // Log for debugging
//   console.log(`allChaptersCompleted: ${allChaptersCompleted}, allChapterQuizzesPassed: ${allChapterQuizzesPassed}, showFinalQuizButton: ${showFinalQuizButton}`);
//   console.log(`chapterQuizStatus:`, JSON.stringify(chapterQuizStatus, null, 2));

//   return (
//     <div className="h-full border-r flex flex-col overflow-y-auto bg-gray-50 shadow-lg w-80">
//       {/* Header Section */}
//       <div className="p-6 bg-white">
//         <Logo />
//       </div>

//       {/* Course Title and Progress */}
//       <div className="p-6 bg-white border-b border-gray-200">
//         <h1
//           className="font-bold text-lg text-center"
//           style={{
//             color: "#FFD700",
//             background: "linear-gradient(90deg, #6A0DAD, #8A2BE2)",
//             padding: "12px",
//             borderRadius: "8px",
//             boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
//           }}
//         >
//           {course.title}
//         </h1>
//         {purchase && (
//           <div className="mt-6">
//             <CourseProgress variant="success" value={progressCount} size="sm" />
//           </div>
//         )}
//       </div>

//       {/* Chapters List */}
//       <div className="flex-1 px-4 py-6 space-y-4">
//         {course.chapters.map((chapter, index) => {
//           const chapterStatus = chapterQuizStatus.find(
//             (status) => status.chapterId === chapter.id
//           );
          
//           const isCurrentChapterPassed = chapterStatus?.passed || false;
//           const isPreviousChapterPassed = 
//             index === 0 || (chapterQuizStatus[index - 1]?.passed || !chapterQuizStatus[index - 1]?.hasAttempted);
          
//           const isLocked = (!chapter.isFree && !purchase) || 
//                          (index > 0 && !(chapterQuizStatus[index - 1]?.passed || !chapterQuizStatus[index - 1]?.hasAttempted));

//           // Debugging logs
//           console.log(`Chapter ${chapter.id}: isCompleted=${!!chapter.userProgress?.[0]?.isCompleted}, isPreviousChapterPassed=${isPreviousChapterPassed}, isLocked=${isLocked}, isQuizPassed=${isCurrentChapterPassed}, hasAttempted=${chapterStatus?.hasAttempted}`);

//           return (
//             <div
//               key={chapter.id}
//               className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
//             >
//               <CourseSidebarItem
//                 id={chapter.id}
//                 label={chapter.title}
//                 isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
//                 courseId={course.id}
//                 isLocked={isLocked}
//               />

//               {!isLocked && chapter.chapterattachments?.length > 0 && (
//                 <details className="group px-4 py-2">
//                   <summary className="text-sm font-semibold text-gray-700 cursor-pointer flex items-center p-2 rounded-md hover:bg-gray-100 transition-colors duration-200">
//                     <span className="mr-2 text-red-500">📎</span>
//                     <span className="text-purple-800">
//                       Resources ({chapter.chapterattachments.length})
//                     </span>
//                   </summary>
//                   <div className="mt-2 space-y-2">
//                     {chapter.chapterattachments.map((attachment) => (
//                       <a
//                         key={attachment.id}
//                         href={attachment.url}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="flex items-center p-2 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors duration-200 text-sm text-blue-600 hover:text-blue-800"
//                       >
//                         <span className="mr-2">📄</span>
//                         <span className="truncate">{attachment.name}</span>
//                       </a>
//                     ))}
//                   </div>
//                 </details>
//               )}

//               {!!chapter.userProgress?.[0]?.isCompleted && isPreviousChapterPassed && (
//                 <div className="px-4 pb-4">
//                   <ChapterQuizButton 
//                     courseId={course.id} 
//                     chapterId={chapter.id} 
//                     isQuizPassed={isCurrentChapterPassed}
//                     hideOnPass={true} // Hide when quiz is passed
//                   />
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>

//       {/* Footer Section */}
//       <div className="p-6 border-t border-gray-200 bg-white">
//         {showFinalQuizButton ? (
//           <QuizButton courseId={course.id} quizId={quizId} />
//         ) : (
//           <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-4 rounded-lg shadow-md">
//             <h2 className="text-lg font-semibold">
//               {allChaptersCompleted && !allChapterQuizzesPassed
//                 ? "🎯 Pass All Chapter Quizzes"
//                 : "🎯 Complete All Chapters"}
//             </h2>
//             <p className="text-sm mt-1">
//               {allChaptersCompleted && !allChapterQuizzesPassed
//                 ? "Complete all chapter quizzes to unlock the final quiz!"
//                 : "Complete all chapters to unlock chapter quizzes!"}
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };







// components/course-sidebar.tsx
// import { auth } from "@clerk/nextjs/server";
// import { Chapter, Course, UserProgress, ChapterAttachment } from "@prisma/client";
// import { redirect } from "next/navigation";
// import { db } from "@/lib/db";
// import { CourseProgress } from "@/components/course-progress";
// import { CourseSidebarItem } from "./course-sidebar-item";
// import QuizButton from "./quiz-button";
// import ChapterQuizButton from "./chapter-quiz-button";
// import { Logo } from "./logo";
// import axios from "axios";

// const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// interface CourseSidebarProps {
//   course: Course & {
//     chapters: (Chapter & {
//       userProgress: UserProgress[] | null;
//       chapterattachments: ChapterAttachment[];
//     })[];
//   };
//   progressCount: number;
//   quizId: string;
// }

// export const CourseSidebar = async ({
//   course,
//   progressCount,
//   quizId,
// }: CourseSidebarProps) => {
//   const { userId, getToken } = auth();

//   if (!userId) {
//     return redirect("/");
//   }

//   const purchase = await db.purchase.findUnique({
//     where: {
//       userId_courseId: {
//         userId,
//         courseId: course.id,
//       },
//     },
//   });

//   const token = await getToken();

//   // Check quiz status for each chapter
//   const chapterQuizStatus = await Promise.all(
//     course.chapters.map(async (chapter) => {
//       try {
//         const response = await axios.get(
//           `${BASE_URL}/api/courses/${course.id}/chapters/${chapter.id}/chapterquizzes/results`,
//           {
//             headers: {
//               "user-id": userId,
//               Authorization: token ? `Bearer ${token}` : undefined,
//             },
//           }
//         );
//         const scorePercentage =
//           response.data.totalQuestions > 0
//             ? (response.data.score / response.data.totalQuestions) * 100
//             : 0;
//         console.log(
//           `Chapter ${chapter.id} quiz results: score=${response.data.score}, totalQuestions=${response.data.totalQuestions}, scorePercentage=${scorePercentage}, passed=${scorePercentage >= 60}, hasAttempted=true`
//         );
//         return {
//           chapterId: chapter.id,
//           hasAttempted: true,
//           passed: scorePercentage >= 60,
//           completed: !!chapter.userProgress?.[0]?.isCompleted,
//         };
//       } catch (error: any) {
//         if (error.response?.status === 404) {
//           console.log(
//             `No quiz results found for chapter ${chapter.id}, treating as not attempted`
//           );
//           return {
//             chapterId: chapter.id,
//             hasAttempted: false,
//             passed: false,
//             completed: !!chapter.userProgress?.[0]?.isCompleted,
//           };
//         }
//         console.error(
//           `Failed to fetch quiz results for chapter ${chapter.id}:`,
//           error.message
//         );
//         return {
//           chapterId: chapter.id,
//           hasAttempted: false,
//           passed: false,
//           completed: !!chapter.userProgress?.[0]?.isCompleted,
//         };
//       }
//     })
//   );

//   // Check if all chapters are completed AND their quizzes are passed
//   const allChaptersCompleted = course.chapters.every(
//     (chapter) => !!chapter.userProgress?.[0]?.isCompleted
//   );

//   const allChapterQuizzesPassed = chapterQuizStatus.every(
//     (status) => status.passed || !status.hasAttempted
//   );

//   // Define showFinalQuizButton
//   const showFinalQuizButton = allChaptersCompleted && allChapterQuizzesPassed;

//   // Log for debugging
//   console.log(
//     `allChaptersCompleted: ${allChaptersCompleted}, allChapterQuizzesPassed: ${allChapterQuizzesPassed}, showFinalQuizButton: ${showFinalQuizButton}`
//   );
//   console.log(
//     `chapterQuizStatus:`,
//     JSON.stringify(chapterQuizStatus, null, 2)
//   );

//   return (
//     <div className="h-full border-r flex flex-col overflow-y-auto bg-gray-50 shadow-lg w-80">
//       {/* Header Section */}
//       <div className="p-6 bg-white">
//         <Logo />
//       </div>

//       {/* Course Title and Progress */}
//       <div className="p-6 bg-white border-b border-gray-200">
//         <h1
//           className="font-bold text-lg text-center"
//           style={{
//             color: "#FFD700",
//             background: "linear-gradient(90deg, #6A0DAD, #8A2BE2)",
//             padding: "12px",
//             borderRadius: "8px",
//             boxShadow: "0 2px 4px rgba misc-0,0,0,0.1)",
//           }}
//         >
//           {course.title}
//         </h1>
//         {purchase && (
//           <div className="mt-6">
//             <CourseProgress
//               variant="success"
//               value={progressCount}
//               size="sm"
//             />
//           </div>
//         )}
//       </div>

//       {/* Chapters List */}
//       <div className="flex-1 px-4 py-6 space-y-4">
//         {course.chapters.map((chapter, index) => {
//           const chapterStatus = chapterQuizStatus.find(
//             (status) => status.chapterId === chapter.id
//           );

//           const isCurrentChapterPassed = chapterStatus?.passed || false;
//           const isPreviousChapterPassed =
//             index === 0 ||
//             (chapterQuizStatus[index - 1]?.passed ||
//               !chapterQuizStatus[index - 1]?.hasAttempted);

//           const isLocked =
//             (!chapter.isFree && !purchase) ||
//             (index > 0 &&
//               !(
//                 chapterQuizStatus[index - 1]?.passed ||
//                 !chapterQuizStatus[index - 1]?.hasAttempted
//               ));

//           // Debugging logs
//           console.log(
//             `Chapter ${chapter.id}: isCompleted=${!!chapter.userProgress?.[0]?.isCompleted}, isPreviousChapterPassed=${isPreviousChapterPassed}, isLocked=${isLocked}, isQuizPassed=${isCurrentChapterPassed}, hasAttempted=${chapterStatus?.hasAttempted}`
//           );

//           return (
//             <div
//               key={chapter.id}
//               className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
//             >
//               <CourseSidebarItem
//                 id={chapter.id}
//                 label={chapter.title}
//                 isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
//                 courseId={course.id}
//                 isLocked={isLocked}
//               />

//               {!isLocked && chapter.chapterattachments?.length > 0 && (
//                 <details className="group px-4 py-2">
//                   <summary className="text-sm font-semibold text-gray-700 cursor-pointer flex items-center p-2 rounded-md hover:bg-gray-100 transition-colors duration-200">
//                     <span className="mr-2 text-red-500">📎</span>
//                     <span className="text-purple-800">
//                       Resources ({chapter.chapterattachments.length})
//                     </span>
//                   </summary>
//                   <div className="mt-2 space-y-2">
//                     {chapter.chapterattachments.map((attachment) => (
//                       <a
//                         key={attachment.id}
//                         href={attachment.url}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="flex items-center p-2 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors duration-200 text-sm text-blue-600 hover:text-blue-800"
//                       >
//                         <span className="mr-2">📄</span>
//                         <span className="truncate">{attachment.name}</span>
//                       </a>
//                     ))}
//                   </div>
//                 </details>
//               )}

//               {!!chapter.userProgress?.[0]?.isCompleted &&
//                 isPreviousChapterPassed && (
//                   <div className="px-4 pb-4">
//                     <ChapterQuizButton
//                       courseId={course.id}
//                       chapterId={chapter.id}
//                       isQuizPassed={isCurrentChapterPassed}
//                       hideOnPass={true}
//                       allChaptersCompleted={allChaptersCompleted}
//                       allChapterQuizzesPassed={allChapterQuizzesPassed}
//                       isLastChapter={index === course.chapters.length - 1}
//                     />
//                   </div>
//                 )}
//             </div>
//           );
//         })}
//       </div>

//       {/* Footer Section */}
//       <div className="p-6 border-t border-gray-200 bg-white">
//         {showFinalQuizButton ? (
//           <QuizButton
//             courseId={course.id}
//             courseName={course.title} // A courseName prop
//             quizId={quizId}
//             allChaptersCompleted={allChaptersCompleted}
//             allChapterQuizzesPassed={allChapterQuizzesPassed}
//           />
//         ) : (
//           <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-4 rounded-lg shadow-md">
//             <h2 className="text-lg font-semibold">
//               {allChaptersCompleted && !allChapterQuizzesPassed
//                 ? "🎯 Pass All Chapter Quizzes"
//                 : "🎯 Complete All Chapters"}
//             </h2>
//             <p className="text-sm mt-1">
//               {allChaptersCompleted && !allChapterQuizzesPassed
//                 ? "Complete all chapter quizzes to unlock the final quiz!"
//                 : "Complete all chapters to unlock chapter quizzes!"}
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };










// components/course-sidebar.tsx
import { auth } from "@clerk/nextjs/server";
import { Chapter, Course, UserProgress, ChapterAttachment } from "@prisma/client";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { CourseProgress } from "@/components/course-progress";
import { CourseSidebarItem } from "./course-sidebar-item";
import QuizButton from "./quiz-button";
import ChapterQuizButton from "./chapter-quiz-button";
import { Logo } from "./logo";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

interface CourseSidebarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
      chapterattachments: ChapterAttachment[];
    })[];
  };
  progressCount: number;
  quizId: string;
}

export const CourseSidebar = async ({
  course,
  progressCount,
  quizId,
}: CourseSidebarProps) => {
  const { userId, getToken } = auth();

  if (!userId) {
    return redirect("/");
  }

  const purchase = await db.purchase.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId: course.id,
      },
    },
  });

  const token = await getToken();

  const chapterQuizStatus = await Promise.all(
    course.chapters.map(async (chapter) => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/courses/${course.id}/chapters/${chapter.id}/chapterquizzes/results`,
          {
            headers: {
              "user-id": userId,
              Authorization: token ? `Bearer ${token}` : undefined,
            },
          }
        );
        const scorePercentage =
          response.data.totalQuestions > 0
            ? (response.data.score / response.data.totalQuestions) * 100
            : 0;
        console.log(
          `Chapter ${chapter.id} quiz results: score=${response.data.score}, totalQuestions=${response.data.totalQuestions}, scorePercentage=${scorePercentage}, passed=${scorePercentage >= 60}, hasAttempted=true`
        );
        return {
          chapterId: chapter.id,
          hasAttempted: true,
          passed: scorePercentage >= 60,
          completed: !!chapter.userProgress?.[0]?.isCompleted,
        };
      } catch (error: any) {
        if (error.response?.status === 404) {
          console.log(
            `No quiz results found for chapter ${chapter.id}, treating as not attempted`
          );
          return {
            chapterId: chapter.id,
            hasAttempted: false,
            passed: false,
            completed: !!chapter.userProgress?.[0]?.isCompleted,
          };
        }
        console.error(
          `Failed to fetch quiz results for chapter ${chapter.id}:`,
          error.message
        );
        return {
          chapterId: chapter.id,
          hasAttempted: false,
          passed: false,
          completed: !!chapter.userProgress?.[0]?.isCompleted,
        };
      }
    })
  );

  const allChaptersCompleted = course.chapters.every(
    (chapter) => !!chapter.userProgress?.[0]?.isCompleted
  );

  const allChapterQuizzesPassed = chapterQuizStatus.every(
    (status) => status.passed || !status.hasAttempted
  );

  const showFinalQuizButton = allChaptersCompleted && allChapterQuizzesPassed;

  console.log(
    `allChaptersCompleted: ${allChaptersCompleted}, allChapterQuizzesPassed: ${allChapterQuizzesPassed}, showFinalQuizButton: ${showFinalQuizButton}`
  );
  console.log(
    `chapterQuizStatus:`,
    JSON.stringify(chapterQuizStatus, null, 2)
  );

  return (
    <div className="h-full border-r flex flex-col overflow-y-auto bg-gray-50 shadow-lg w-80">
      <div className="p-6 bg-white">
        <Logo />
      </div>

      <div className="p-6 bg-white border-b border-gray-200">
        <h1
          className="font-bold text-lg text-center"
          style={{
            color: "#FFD700",
            background: "linear-gradient(90deg, #6A0DAD, #8A2BE2)",
            padding: "12px",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          {course.title}
        </h1>
        {purchase && (
          <div className="mt-6">
            <CourseProgress
              variant="success"
              value={progressCount}
              size="sm"
            />
          </div>
        )}
      </div>

      <div className="flex-1 px-4 py-6 space-y-4">
        {course.chapters.map((chapter, index) => {
          const chapterStatus = chapterQuizStatus.find(
            (status) => status.chapterId === chapter.id
          );

          const isCurrentChapterPassed = chapterStatus?.passed || false;
          const isPreviousChapterPassed =
            index === 0 ||
            (chapterQuizStatus[index - 1]?.passed ||
              !chapterQuizStatus[index - 1]?.hasAttempted);

          const isLocked =
            (!chapter.isFree && !purchase) ||
            (index > 0 &&
              !(
                chapterQuizStatus[index - 1]?.passed ||
                !chapterQuizStatus[index - 1]?.hasAttempted
              ));

          console.log(
            `Chapter ${chapter.id}: isCompleted=${!!chapter.userProgress?.[0]?.isCompleted}, isPreviousChapterPassed=${isPreviousChapterPassed}, isLocked=${isLocked}, isQuizPassed=${isCurrentChapterPassed}, hasAttempted=${chapterStatus?.hasAttempted}, isLastChapter=${index === course.chapters.length - 1}`
          );

          return (
            <div
              key={chapter.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <CourseSidebarItem
                id={chapter.id}
                label={chapter.title}
                isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
                courseId={course.id}
                isLocked={isLocked}
              />

              {!isLocked && chapter.chapterattachments?.length > 0 && (
                <details className="group px-4 py-2">
                  <summary className="text-sm font-semibold text-gray-700 cursor-pointer flex items-center p-2 rounded-md hover:bg-gray-100 transition-colors duration-200">
                    <span className="mr-2 text-red-500">📎</span>
                    <span className="text-purple-800">
                      Resources ({chapter.chapterattachments.length})
                    </span>
                  </summary>
                  <div className="mt-2 space-y-2">
                    {chapter.chapterattachments.map((attachment) => (
                      <a
                        key={attachment.id}
                        href={attachment.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center p-2 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors duration-200 text-sm text-blue-600 hover:text-blue-800"
                      >
                        <span className="mr-2">📄</span>
                        <span className="truncate">{attachment.name}</span>
                      </a>
                    ))}
                  </div>
                </details>
              )}

              {!!chapter.userProgress?.[0]?.isCompleted &&
                isPreviousChapterPassed && (
                  <div className="px-4 pb-4">
                    <ChapterQuizButton
                      courseId={course.id}
                      chapterId={chapter.id}
                      isQuizPassed={isCurrentChapterPassed}
                      hideOnPass={true}
                      allChaptersCompleted={allChaptersCompleted}
                      allChapterQuizzesPassed={allChapterQuizzesPassed}
                      isLastChapter={index === course.chapters.length - 1}
                    />
                  </div>
                )}
            </div>
          );
        })}
      </div>

      <div className="p-6 border-t border-gray-200 bg-white">
        {showFinalQuizButton ? (
          <QuizButton
            courseId={course.id}
            quizId={quizId}
            courseName={course.title}
            allChaptersCompleted={allChaptersCompleted}
            allChapterQuizzesPassed={allChapterQuizzesPassed}
          />
        ) : (
          <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">
              {allChaptersCompleted && !allChapterQuizzesPassed
                ? "🎯 Pass All Chapter Quizzes"
                : "🎯 Complete All Chapters"}
            </h2>
            <p className="text-sm mt-1">
              {allChaptersCompleted && !allChapterQuizzesPassed
                ? "Complete all chapter quizzes to unlock the final quiz!"
                : "Complete all chapters to unlock chapter quizzes!"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};