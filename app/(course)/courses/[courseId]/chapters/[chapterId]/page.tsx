// import { auth } from "@clerk/nextjs/server";
// import { redirect } from "next/navigation";
// import { File } from "lucide-react";

// import { getChapter } from "@/actions/get-chapter";
// import { Banner } from "@/components/banner";
// import { Separator } from "@/components/ui/separator";
// import { Preview } from "@/components/preview";

// import { VideoPlayer } from "./_components/video-player";
// import { CourseEnrollButton } from "./_components/course-enroll-button";
// import { CourseProgressButton } from "./_components/course-progress-button";

// const ChapterIdPage = async ({
//   params
// }: {
//   params: { courseId: string; chapterId: string }
// }) => {
//   const { userId } = auth();
  
//   if (!userId) {
//     return redirect("/");
//   } 

//   const {
//     chapter,
//     course,
//     muxData,
//     attachments,
//     nextChapter,
//     userProgress,
//     purchase,
//   } = await getChapter({
//     userId,
//     chapterId: params.chapterId,
//     courseId: params.courseId,
//   });

//   if (!chapter || !course) {
//     return redirect("/")
//   }

//   const isLocked = !chapter.isFree && !purchase;
//   const completeOnEnd = !!purchase && !userProgress?.isCompleted;

//   // Define serviceType based on your business logic or configuration
//   const serviceType = 3854; // Example: Assuming this is the correct service type for this course

//   return ( 
//     <div>
//       {userProgress?.isCompleted && (
//         <Banner
//           variant="success"
//           label="You already completed this chapter."
//         />
//       )}
//       {isLocked && (
//         <Banner
//           variant="warning"
//           label="You need to purchase this course to watch this chapter."
//         />
//       )}
//       <div className="flex flex-col max-w-4xl mx-auto pb-20" style={{ paddingTop: '20px' }}>
//         <div className="p-4 ">
//           <VideoPlayer
//             chapterId={params.chapterId}
//             title={chapter.title}
//             courseId={params.courseId}
//             nextChapterId={nextChapter?.id}
//             playbackId={muxData?.playbackId!}
//             isLocked={isLocked}
//             completeOnEnd={completeOnEnd}
//           />
//         </div>
//         <div>
//           <div className="p-4 flex flex-col md:flex-row items-center justify-between">
//             <h2
//               className="text-2xl font-semibold mb-2"
//               style={{
//                 color: '#FFFF', // Gold light color
//                 backgroundColor: '#6b4fbb', // Soft off-white background for navy blue
//                 padding: '10px', // Add some padding for better readability
//                 borderRadius: '5px' // Optional: rounded corners for a softer look
//               }}
//             >
//               {chapter.title}
//             </h2>
//             {purchase ? (
//               <CourseProgressButton
//                 chapterId={params.chapterId}
//                 courseId={params.courseId}
//                 nextChapterId={nextChapter?.id}
//                 isCompleted={!!userProgress?.isCompleted}
//               />
//             ) : (
//               <CourseEnrollButton
//                 courseId={params.courseId}
//                 price={course.price!}
//                 serviceType={serviceType} // Here we pass the serviceType
//               />
//             )}
//           </div>
//           <Separator />
//           {/* <div
//             style={{
//               color: 'green', // Gold light color for text
//               backgroundColor: '#6b4fbb', // Soft off-white background for navy blue
//               padding: '10px', // Add some padding for better readability
//               borderRadius: '5px' // Optional: rounded corners for a softer look
//             }}
//           >
//             <Preview value={chapter.description!} />
//           </div> */}
//           {!!attachments.length && (
//             <>
//               <Separator />
//               <div className="p-4">
//                 {/* {attachments.map((attachment) => (
//                   <a 
//                     href={attachment.url}
//                     target="_blank"
//                     key={attachment.id}
//                     className='flex items-center p-3 w-full bg-sky-200 dark:bg-sky-800 text-sky-700 dark:text-sky-300 hover:underline'
//                   >
//                     <File />
//                     <p className="line-clamp-1">
//                       {attachment.name}
//                     </p>
//                   </a>
//                 ))} */}
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
 
// export default ChapterIdPage;




// import { auth } from "@clerk/nextjs/server";
// import { redirect } from "next/navigation";
// import { File } from "lucide-react";
// import axios from "axios";

// import { getChapter } from "@/actions/get-chapter";
// import { Banner } from "@/components/banner";
// import { Separator } from "@/components/ui/separator";
// import { Preview } from "@/components/preview";

// import { VideoPlayer } from "./_components/video-player";
// import { CourseEnrollButton } from "./_components/course-enroll-button";
// import { CourseProgressButton } from "./_components/course-progress-button";

// const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// const ChapterIdPage = async ({
//   params
// }: {
//   params: { courseId: string; chapterId: string }
// }) => {
//   const { userId, getToken } = auth();
  
//   if (!userId) {
//     return redirect("/");
//   } 

//   const {
//     chapter,
//     course,
//     muxData,
//     attachments,
//     nextChapter,
//     userProgress,
//     purchase,
//   } = await getChapter({
//     userId,
//     chapterId: params.chapterId,
//     courseId: params.courseId,
//   });

//   if (!chapter || !course) {
//     return redirect("/");
//   }

//   const isLocked = !chapter.isFree && !purchase;
//   const completeOnEnd = !!purchase && !userProgress?.isCompleted;

//   // Fetch quiz pass status for the current chapter
//   const token = await getToken();
//   let isQuizPassed = false;
//   try {
//     const resultsResponse = await axios.get(
//       `${BASE_URL}/api/courses/${params.courseId}/chapters/${params.chapterId}/chapterquizzes/results`,
//       {
//         headers: {
//           "user-id": userId,
//           Authorization: token ? `Bearer ${token}` : undefined,
//         },
//       }
//     );
//     const scorePercentage = (resultsResponse.data.score / resultsResponse.data.totalQuestions) * 100;
//     isQuizPassed = scorePercentage >= 60; // Pass threshold matches CourseSidebar
//   } catch (error) {
//     console.error(`Failed to fetch quiz results for chapter ${params.chapterId}:`, error);
//     isQuizPassed = false; // Default to not passed if fetch fails
//   }

//   // Define serviceType based on your business logic or configuration
//   const serviceType = 3854; // Example: Assuming this is the correct service type for this course

//   return ( 
//     <div>
//       {userProgress?.isCompleted && (
//         <Banner
//           variant="success"
//           label="You already completed this chapter."
//         />
//       )}
//       {isLocked && (
//         <Banner
//           variant="warning"
//           label="You need to purchase this course to watch this chapter."
//         />
//       )}
//       <div className="flex flex-col max-w-4xl mx-auto pb-20" style={{ paddingTop: '20px' }}>
//         <div className="p-2 ">
//           <VideoPlayer
//             chapterId={params.chapterId}
//             title={chapter.title}
//             courseId={params.courseId}
//             nextChapterId={nextChapter?.id}
//             playbackId={muxData?.playbackId!}
//             isLocked={isLocked}
//             completeOnEnd={completeOnEnd}
//           />
//         </div>
//         <div>
//         <div className="px-6 py-2 flex flex-col md:flex-row items-center justify-end bg-white dark:bg-gray-800 rounded-lg shadow-md">

//             {/* <h2
//               className="text-2xl font-semibold mb-2"
//               style={{
//                 color: '#FFFF', // Gold light color
//                 backgroundColor: '#6b4fbb', // Soft off-white background for navy blue
//                 padding: '10px', // Add some padding for better readability
//                 borderRadius: '5px' // Optional: rounded corners for a softer look
//               }}
//             >
//               {chapter.title}
//             </h2> */}
//             {purchase ? (
//               <CourseProgressButton
//                 chapterId={params.chapterId}
//                 courseId={params.courseId}
//                 nextChapterId={nextChapter?.id}
//                 isCompleted={!!userProgress?.isCompleted}
//                 isQuizPassed={isQuizPassed} // Pass quiz status to potentially update logic in CourseProgressButton
//               />
//             ) : (
//               <CourseEnrollButton
//                 courseId={params.courseId}
//                 price={course.price!}
//                 serviceType={serviceType} // Here we pass the serviceType
//               />
//             )}
//           </div>
//           <Separator />
//           {/* Uncomment and style chapter description if needed */}
//           {/* <div
//             style={{
//               color: 'green', // Gold light color for text
//               backgroundColor: '#6b4fbb', // Soft off-white background for navy blue
//               padding: '10px', // Add some padding for better readability
//               borderRadius: '5px' // Optional: rounded corners for a softer look
//             }}
//           >
//             <Preview value={chapter.description!} />
//           </div> */}
//           {!!attachments.length && (
//             <>
//               <Separator />
//               <div className="p-4">
//                 {/* Uncomment if attachments rendering is needed */}
//                 {/* {attachments.map((attachment) => (
//                   <a 
//                     href={attachment.url}
//                     target="_blank"
//                     key={attachment.id}
//                     className='flex items-center p-3 w-full bg-sky-200 dark:bg-sky-800 text-sky-700 dark:text-sky-300 hover:underline'
//                   >
//                     <File />
//                     <p className="line-clamp-1">
//                       {attachment.name}
//                     </p>
//                   </a>
//                 ))} */}
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
 
// export default ChapterIdPage;






// import { auth } from "@clerk/nextjs/server";
// import { redirect } from "next/navigation";
// import { File } from "lucide-react";
// import axios from "axios";

// import { getChapter } from "@/actions/get-chapter";
// import { Banner } from "@/components/banner";
// import { Separator } from "@/components/ui/separator";
// import { Preview } from "@/components/preview";

// import { VideoPlayer } from "./_components/video-player";
// import { CourseEnrollButton } from "./_components/course-enroll-button";
// import { CourseProgressButton } from "./_components/course-progress-button";

// const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// const ChapterIdPage = async ({
//   params,
// }: {
//   params: { courseId: string; chapterId: string };
// }) => {
//   const { userId, getToken } = auth();

//   // Redirect if user is not authenticated
//   if (!userId) {
//     return redirect("/");
//   }

//   // Fetch chapter data
//   const {
//     chapter,
//     course,
//     muxData,
//     attachments,
//     nextChapter,
//     userProgress,
//     purchase,
//   } = await getChapter({
//     userId,
//     chapterId: params.chapterId,
//     courseId: params.courseId,
//   });

//   // Redirect if chapter or course is not found
//   if (!chapter || !course) {
//     return redirect("/");
//   }

//   const isLocked = !chapter.isFree && !purchase;
//   const completeOnEnd = !!purchase && !userProgress?.isCompleted;

//   // Fetch quiz pass status for the current chapter
//   const token = await getToken();
//   let isQuizPassed = false;
//   try {
//     const resultsResponse = await axios.get(
//       `${BASE_URL}/api/courses/${params.courseId}/chapters/${params.chapterId}/chapterquizzes/results`,
//       {
//         headers: {
//           "user-id": userId,
//           Authorization: token ? `Bearer ${token}` : undefined,
//         },
//       }
//     );
//     const { score, totalQuestions } = resultsResponse.data;
//     const scorePercentage = (score / totalQuestions) * 100;
//     isQuizPassed = scorePercentage >= 60; // Pass threshold matches CourseSidebar
//   } catch (error: any) {
//     if (error.response?.status === 404) {
//       // 404 means no quiz results exist (quiz not taken), treat as not passed
//       isQuizPassed = false; // No need to log this as an error
//     } else {
//       // Log unexpected errors (e.g., 500, network issues)
//       console.error(`Failed to fetch quiz results for chapter ${params.chapterId}:`, error);
//       isQuizPassed = false;
//     }
//   }

//   // Define serviceType based on your business logic or configuration
//   const serviceType = 3854; // Example: Assuming this is the correct service type for this course

//   return (
//     <div>
//       {userProgress?.isCompleted && (
//         <Banner variant="success" label="You already completed this chapter." />
//       )}
//       {isLocked && (
//         <Banner
//           variant="warning"
//           label="You need to purchase this course to watch this chapter."
//         />
//       )}
//       <div
//         className="flex flex-col max-w-4xl mx-auto pb-20"
//         style={{ paddingTop: "20px" }}
//       >
//         <div className="p-2">
//           <VideoPlayer
//             chapterId={params.chapterId}
//             title={chapter.title}
//             courseId={params.courseId}
//             nextChapterId={nextChapter?.id}
//             playbackId={muxData?.playbackId!}
//             isLocked={isLocked}
//             completeOnEnd={completeOnEnd}
//           />
//         </div>
//         <div>
//           <div className="px-6 py-2 flex flex-col md:flex-row items-center justify-end bg-white dark:bg-gray-800 rounded-lg shadow-md">
//             {/* Uncomment if you want to display chapter title */}
//             {/* <h2
//               className="text-2xl font-semibold mb-2"
//               style={{
//                 color: "#FFFF", // Gold light color
//                 backgroundColor: "#6b4fbb", // Soft off-white background for navy blue
//                 padding: "10px", // Add some padding for better readability
//                 borderRadius: "5px", // Optional: rounded corners for a softer look
//               }}
//             >
//               {chapter.title}
//             </h2> */}
//             {purchase ? (
//               <CourseProgressButton
//                 chapterId={params.chapterId}
//                 courseId={params.courseId}
//                 nextChapterId={nextChapter?.id}
//                 isCompleted={!!userProgress?.isCompleted}
//                 isQuizPassed={isQuizPassed} // Pass quiz status to CourseProgressButton
//               />
//             ) : (
//               <CourseEnrollButton
//                 courseId={params.courseId}
//                 price={course.price!}
//                 serviceType={serviceType} // Pass serviceType to CourseEnrollButton
//               />
//             )}
//           </div>
//           <Separator />
//           {/* Uncomment and style chapter description if needed */}
//           {/* <div
//             style={{
//               color: "green", // Gold light color for text
//               backgroundColor: "#6b4fbb", // Soft off-white background for navy blue
//               padding: "10px", // Add some padding for better readability
//               borderRadius: "5px", // Optional: rounded corners for a softer look
//             }}
//           >
//             <Preview value={chapter.description!} />
//           </div> */}
//           {!!attachments.length && (
//             <>
//               <Separator />
//               <div className="p-4">
//                 {/* Uncomment if attachments rendering is needed */}
//                 {/* {attachments.map((attachment) => (
//                   <a
//                     href={attachment.url}
//                     target="_blank"
//                     key={attachment.id}
//                     className="flex items-center p-3 w-full bg-sky-200 dark:bg-sky-800 text-sky-700 dark:text-sky-300 hover:underline"
//                   >
//                     <File />
//                     <p className="line-clamp-1">{attachment.name}</p>
//                   </a>
//                 ))} */}
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChapterIdPage;




// import { auth } from "@clerk/nextjs/server";
// import { redirect } from "next/navigation";
// import { File } from "lucide-react";
// import axios from "axios";

// import { getChapter } from "@/actions/get-chapter";
// import { Banner } from "@/components/banner";
// import { Separator } from "@/components/ui/separator";
// import { Preview } from "@/components/preview";

// import { VideoPlayer } from "./_components/video-player";
// import { CourseEnrollButton } from "./_components/course-enroll-button";
// import { CourseProgressButton } from "./_components/course-progress-button";

// const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// const ChapterIdPage = async ({
//   params,
// }: {
//   params: { courseId: string; chapterId: string };
// }) => {
//   const { userId, getToken } = auth();

//   // Redirect if user is not authenticated
//   if (!userId) {
//     return redirect("/");
//   }

//   // Fetch chapter data
//   const {
//     chapter,
//     course,
//     muxData,
//     attachments,
//     nextChapter,
//     userProgress,
//     purchase,
//   } = await getChapter({
//     userId,
//     chapterId: params.chapterId,
//     courseId: params.courseId,
//   });

//   // Redirect if chapter or course is not found
//   if (!chapter || !course) {
//     return redirect("/");
//   }

//   const isLocked = !chapter.isFree && !purchase;
//   const completeOnEnd = !!purchase && !userProgress?.isCompleted;

//   // Fetch quiz pass status for the current chapter
//   const token = await getToken();
//   let isQuizPassed = false;
//   try {
//     const resultsResponse = await axios.get(
//       `${BASE_URL}/api/courses/${params.courseId}/chapters/${params.chapterId}/chapterquizzes/results`,
//       {
//         headers: {
//           "user-id": userId,
//           Authorization: token ? `Bearer ${token}` : undefined,
//         },
//       }
//     );
//     const { score, totalQuestions } = resultsResponse.data;
//     const scorePercentage = (score / totalQuestions) * 100;
//     isQuizPassed = scorePercentage >= 60; // Pass threshold matches CourseSidebar
//   } catch (error: any) {
//     if (error.response?.status === 404) {
//       // 404 means no quiz results exist (quiz not taken), treat as not passed
//       isQuizPassed = false; // No need to log this as an error
//     } else {
//       // Log unexpected errors (e.g., 500, network issues)
//       console.error(`Failed to fetch quiz results for chapter ${params.chapterId}:`, error);
//       isQuizPassed = false;
//     }
//   }

//   // Define serviceType based on your business logic or configuration
//   const serviceType = 3854; // Example: Assuming this is the correct service type for this course

//   return (
//     <div>
//       {userProgress?.isCompleted && (
//         <Banner variant="success" label="You already completed this chapter." />
//       )}
//       {isLocked && (
//         <Banner
//           variant="warning"
//           label="You need to purchase this course to watch this chapter."
//         />
//       )}
//       <div
//         className="flex flex-col max-w-4xl mx-auto pb-20"
//         style={{ paddingTop: "20px" }}
//       >
//         <div className="p-2">
//           <VideoPlayer
//             chapterId={params.chapterId}
//             title={chapter.title}
//             courseId={params.courseId}
//             nextChapterId={nextChapter?.id}
//             playbackId={muxData?.playbackId!}
//             isLocked={isLocked}
//             completeOnEnd={completeOnEnd}
//           />
//         </div>
//         <div>
//           <div className="px-6 py-2 flex flex-col md:flex-row items-center justify-end bg-white dark:bg-gray-800 rounded-lg shadow-md">
//             {purchase ? (
//               <CourseProgressButton
//                 chapterId={params.chapterId}
//                 courseId={params.courseId}
//                 nextChapterId={nextChapter?.id}
//                 isCompleted={!!userProgress?.isCompleted}
//                 isQuizPassed={isQuizPassed} // Pass quiz status to CourseProgressButton
//               />
//             ) : (
//               <CourseEnrollButton
//                 courseId={params.courseId}
//                 price={course.price!}
//                 serviceType={serviceType} // Pass serviceType to CourseEnrollButton
//               />
//             )}
//           </div>
//           <Separator />
//           {!!attachments.length && (
//             <>
//               <Separator />
//               <div className="p-4">
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChapterIdPage;

















// import { auth } from "@clerk/nextjs/server";
// import { redirect } from "next/navigation";
// import { File } from "lucide-react";
// import axios from "axios";

// import { getChapter } from "@/actions/get-chapter";
// import { Banner } from "@/components/banner";
// import { Separator } from "@/components/ui/separator";
// import { Preview } from "@/components/preview";

// import { VideoPlayer } from "./_components/video-player";
// import { CourseEnrollButton } from "./_components/course-enroll-button";
// import { CourseProgressButton } from "./_components/course-progress-button";

// const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// const ChapterIdPage = async ({
//   params,
// }: {
//   params: { courseId: string; chapterId: string };
// }) => {
//   const { userId, getToken } = auth();

//   // Redirect if user is not authenticated
//   if (!userId) {
//     return redirect("/");
//   }

//   // Fetch chapter data
//   const {
//     chapter,
//     course,
//     muxData,
//     attachments,
//     nextChapter,
//     userProgress,
//     purchase,
//   } = await getChapter({
//     userId,
//     chapterId: params.chapterId,
//     courseId: params.courseId,
//   });

//   // Redirect if chapter or course is not found
//   if (!chapter || !course) {
//     return redirect("/");
//   }

//   const isLocked = !chapter.isFree && !purchase;
//   const completeOnEnd = !!purchase && !userProgress?.isCompleted;

//   // Fetch quiz pass status for the current chapter
//   const token = await getToken();
//   let isQuizPassed = false;
//   try {
//     const resultsResponse = await axios.get(
//       `${BASE_URL}/api/courses/${params.courseId}/chapters/${params.chapterId}/chapterquizzes/results`,
//       {
//         headers: {
//           "user-id": userId,
//           Authorization: token ? `Bearer ${token}` : "",
//         },
//       }
//     );
//     const { score, totalQuestions } = resultsResponse.data;
//     const scorePercentage = (score / totalQuestions) * 100;
//     isQuizPassed = scorePercentage >= 60; // Pass threshold matches CourseSidebar
//   } catch (error: any) {
//     if (error.response?.status === 404) {
//       // 404 means no quiz results exist (quiz not taken), treat as not passed
//       isQuizPassed = false; // No need to log this as an error
//     } else {
//       // Log unexpected errors (e.g., 500, network issues)
//       console.error(`Failed to fetch quiz results for chapter ${params.chapterId}:`, error);
//       isQuizPassed = false;
//     }
//   }

//   // Define serviceType based on your business logic or configuration
//   const serviceType = 3854; // Example: Assuming this is the correct service type for this course

//   return (
//     <div>
//       {userProgress?.isCompleted && (
//         <Banner variant="success" label="You already completed this chapter." />
//       )}
//       {isLocked && (
//         <Banner
//           variant="warning"
//           label="You need to purchase this course to watch this chapter."
//         />
//       )}
//       <div
//         className="flex flex-col max-w-4xl mx-auto pb-20"
//         style={{ paddingTop: "20px" }}
//       >
//         <div className="p-2">
//           <VideoPlayer
//             chapterId={params.chapterId}
//             title={chapter.title}
//             courseId={params.courseId}
//             nextChapterId={nextChapter?.id}
//             playbackId={muxData?.playbackId!}
//             isLocked={isLocked}
//             completeOnEnd={completeOnEnd}
//           />
//         </div>
//         <div>
//           <div className="px-6 py-2 flex flex-col md:flex-row items-center justify-end bg-white dark:bg-gray-800 rounded-lg shadow-md">
//             {purchase ? (
//               <CourseProgressButton
//                 chapterId={params.chapterId}
//                 courseId={params.courseId}
//                 nextChapterId={nextChapter?.id}
//                 isCompleted={!!userProgress?.isCompleted}
//                 isQuizPassed={isQuizPassed} // Pass quiz status to CourseProgressButton
//               />
//             ) : (
//               <CourseEnrollButton
//                 courseId={params.courseId}
//                 chapterId={params.chapterId} // Pass chapterId to CourseEnrollButton
//                 price={course.price!}
//                 serviceType={serviceType} // Pass serviceType to CourseEnrollButton
//               />
//             )}
//           </div>
//           <Separator />
//           {!!attachments.length && (
//             <>
//               <Separator />
//               <div className="p-4">
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChapterIdPage;







// import { auth } from "@clerk/nextjs/server";
// import { redirect } from "next/navigation";
// import { File } from "lucide-react";
// import axios from "axios";

// import { getChapter } from "@/actions/get-chapter";
// import { Banner } from "@/components/banner";
// import { Separator } from "@/components/ui/separator";
// import { Preview } from "@/components/preview";

// import { VideoPlayer } from "./_components/video-player";
// import { CourseEnrollButton } from "./_components/course-enroll-button";
// import { CourseProgressButton } from "./_components/course-progress-button";

// const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// const ChapterIdPage = async ({
//   params,
// }: {
//   params: { courseId: string; chapterId: string };
// }) => {
//   const { userId, getToken } = auth();

//   // Redirect if user is not authenticated
//   if (!userId) {
//     return redirect("/");
//   }

//   // Fetch chapter data
//   const {
//     chapter,
//     course,
//     muxData,
//     attachments,
//     nextChapter,
//     userProgress,
//     purchase,
//   } = await getChapter({
//     userId,
//     chapterId: params.chapterId,
//     courseId: params.courseId,
//   });

//   // Redirect if chapter or course is not found
//   if (!chapter || !course) {
//     return redirect("/");
//   }

//   // Check if the user has purchased the course
//   const isLocked = !chapter.isFree && !purchase; // Ensure that the purchase is checked
//   const completeOnEnd = !!purchase && !userProgress?.isCompleted;

//   // Fetch quiz pass status for the current chapter
//   const token = await getToken();
//   let isQuizPassed = false;
//   try {
//     const resultsResponse = await axios.get(
//       `${BASE_URL}/api/courses/${params.courseId}/chapters/${params.chapterId}/chapterquizzes/results`,
//       {
//         headers: {
//           "user-id": userId,
//           Authorization: token ? `Bearer ${token}` : "",
//         },
//       }
//     );
//     const { score, totalQuestions } = resultsResponse.data;
//     const scorePercentage = (score / totalQuestions) * 100;
//     isQuizPassed = scorePercentage >= 60; // Pass threshold matches CourseSidebar
//   } catch (error: any) {
//     if (error.response?.status === 404) {
//       // 404 means no quiz results exist (quiz not taken), treat as not passed
//       isQuizPassed = false; // No need to log this as an error
//     } else {
//       // Log unexpected errors (e.g., 500, network issues)
//       console.error(`Failed to fetch quiz results for chapter ${params.chapterId}:`, error);
//       isQuizPassed = false;
//     }
//   }

//   // Define serviceType based on your business logic or configuration
//   const serviceType = 3854; // Example: Assuming this is the correct service type for this course

//   return (
//     <div>
//       {userProgress?.isCompleted && (
//         <Banner variant="success" label="You already completed this chapter." />
//       )}
//       {isLocked && (
//         <Banner
//           variant="warning"
//           label="You need to purchase this course to watch this chapter."
//         />
//       )}
//       <div
//         className="flex flex-col max-w-4xl mx-auto pb-20"
//         style={{ paddingTop: "20px" }}
//       >
//         <div className="p-2">
//           <VideoPlayer
//             chapterId={params.chapterId}
//             title={chapter.title}
//             courseId={params.courseId}
//             nextChapterId={nextChapter?.id}
//             playbackId={muxData?.playbackId!}
//             isLocked={isLocked}
//             completeOnEnd={completeOnEnd}
//           />
//         </div>
//         <div>
//           <div className="px-6 py-2 flex flex-col md:flex-row items-center justify-end bg-white dark:bg-gray-800 rounded-lg shadow-md">
//             {purchase ? (
//               <CourseProgressButton
//                 chapterId={params.chapterId}
//                 courseId={params.courseId}
//                 nextChapterId={nextChapter?.id}
//                 isCompleted={!!userProgress?.isCompleted}
//                 isQuizPassed={isQuizPassed} // Pass quiz status to CourseProgressButton
//               />
//             ) : (
//               <CourseEnrollButton
//                 courseId={params.courseId}
//                 chapterId={params.chapterId} // Pass chapterId to CourseEnrollButton
//                 price={course.price!}
//                 serviceType={serviceType} // Pass serviceType to CourseEnrollButton
//               />
//             )}
//           </div>
//           <Separator />
//           {!!attachments.length && (
//             <>
//               <Separator />
//               <div className="p-4">
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChapterIdPage;










// import { auth } from "@clerk/nextjs/server";
// import { redirect } from "next/navigation";
// import { File } from "lucide-react";
// import axios from "axios";

// import { getChapter } from "@/actions/get-chapter";
// import { Banner } from "@/components/banner";
// import { Separator } from "@/components/ui/separator";
// import { Preview } from "@/components/preview";

// import { VideoPlayer } from "./_components/video-player";
// import { CourseEnrollButton } from "./_components/course-enroll-button";
// import { CourseProgressButton } from "./_components/course-progress-button";
// import { db } from "@/lib/db";


// const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// const ChapterIdPage = async ({
//   params,
// }: {
//   params: { courseId: string; chapterId: string };
// }) => {
//   const { userId, getToken } = auth();

//   if (!userId) {
//     return redirect("/");
//   }

//   const {
//     chapter,
//     course,
//     muxData,
//     attachments,
//     nextChapter,
//     userProgress,
//     purchase,
//   } = await getChapter({
//     userId,
//     chapterId: params.chapterId,
//     courseId: params.courseId,
//   });

//   if (!chapter || !course) {
//     return redirect("/");
//   }

//   let isLocked = !chapter.isFree;
//   if (purchase) {
//     const transaction = await db.transaction.findUnique({
//       where: { id: purchase.transactionId },
//     });
//     isLocked = !transaction || transaction.status !== 'COMPLETED';
//   }

//   const completeOnEnd = !isLocked && !userProgress?.isCompleted;

//   // Fetch quiz pass status
//   const token = await getToken();
//   let isQuizPassed = false;
//   try {
//     const resultsResponse = await axios.get(
//       `${BASE_URL}/api/courses/${params.courseId}/chapters/${params.chapterId}/chapterquizzes/results`,
//       {
//         headers: {
//           "user-id": userId,
//           Authorization: token ? `Bearer ${token}` : "",
//         },
//       }
//     );
//     const { score, totalQuestions } = resultsResponse.data;
//     isQuizPassed = (score / totalQuestions) * 100 >= 60;
//   } catch (error: any) {
//     if (error.response?.status !== 404) {
//       console.error(`Failed to fetch quiz results for chapter ${params.chapterId}:`, error);
//     }
//     isQuizPassed = false;
//   }

//   const serviceType = 3854; // Example service type

//   return (
//     <div>
//       {userProgress?.isCompleted && (
//         <Banner variant="success" label="You already completed this chapter." />
//       )}
//       {isLocked && (
//         <Banner
//           variant="warning"
//           label="You need to purchase this course to watch this chapter."
//         />
//       )}
//       <div className="flex flex-col max-w-4xl mx-auto pb-20" style={{ paddingTop: "20px" }}>
//         <div className="p-2">
//           <VideoPlayer
//             chapterId={params.chapterId}
//             title={chapter.title}
//             courseId={params.courseId}
//             nextChapterId={nextChapter?.id}
//             playbackId={muxData?.playbackId!}
//             isLocked={isLocked}
//             completeOnEnd={completeOnEnd}
//           />
//         </div>
//         <div>
//           <div className="px-6 py-2 flex flex-col md:flex-row items-center justify-end bg-white dark:bg-gray-800 rounded-lg shadow-md">
//             {purchase && (await db.transaction.findUnique({ where: { id: purchase.transactionId } }))?.status === 'COMPLETED' ? (
//               <CourseProgressButton
//                 chapterId={params.chapterId}
//                 courseId={params.courseId}
//                 nextChapterId={nextChapter?.id}
//                 isCompleted={!!userProgress?.isCompleted}
//                 isQuizPassed={isQuizPassed}
//               />
//             ) : (
//               <CourseEnrollButton
//                 courseId={params.courseId}
//                 chapterId={params.chapterId}
//                 price={course.price!}
//                 serviceType={serviceType}
//               />
//             )}
//           </div>
//           <Separator />
//           {!!attachments.length && (
//             <>
//               <Separator />
//               <div className="p-4">
//                 {/* Attachments rendering */}
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChapterIdPage;








// import { auth } from "@clerk/nextjs/server";
// import { redirect } from "next/navigation";
// import { File } from "lucide-react";
// import axios from "axios";

// import { getChapter } from "@/actions/get-chapter";
// import { Banner } from "@/components/banner";
// import { Separator } from "@/components/ui/separator";
// import { Preview } from "@/components/preview";

// import { VideoPlayer } from "./_components/video-player";
// import { CourseEnrollButton } from "./_components/course-enroll-button";
// import { CourseProgressButton } from "./_components/course-progress-button";
// import { db } from "@/lib/db";

// const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// const ChapterIdPage = async ({
//   params,
// }: {
//   params: { courseId: string; chapterId: string };
// }) => {
//   const { userId, getToken } = auth();

//   // Redirect if user is not authenticated
//   if (!userId) {
//     return redirect("/");
//   }

//   // Fetch chapter data
//   const {
//     chapter,
//     course,
//     muxData,
//     attachments,
//     nextChapter,
//     userProgress,
//     purchase,
//   } = await getChapter({
//     userId,
//     chapterId: params.chapterId,
//     courseId: params.courseId,
//   });

//   // Redirect if chapter or course is not found
//   if (!chapter || !course) {
//     return redirect("/");
//   }

//   const isLocked = !chapter.isFree && !purchase;
//   const completeOnEnd = !!purchase && !userProgress?.isCompleted;

//   // Fetch quiz pass status for the current chapter
//   const token = await getToken();
//   let isQuizPassed = false;
//   try {
//     const resultsResponse = await axios.get(
//       `${BASE_URL}/api/courses/${params.courseId}/chapters/${params.chapterId}/chapterquizzes/results`,
//       {
//         headers: {
//           "user-id": userId,
//           Authorization: token ? `Bearer ${token}` : undefined,
//         },
//       }
//     );
//     const { score, totalQuestions } = resultsResponse.data;
//     const scorePercentage = (score / totalQuestions) * 100;
//     isQuizPassed = scorePercentage >= 60; // Pass threshold matches CourseSidebar
//   } catch (error: any) {
//     if (error.response?.status === 404) {
//       // 404 means no quiz results exist (quiz not taken), treat as not passed
//       isQuizPassed = false; // No need to log this as an error
//     } else {
//       // Log unexpected errors (e.g., 500, network issues)
//       console.error(`Failed to fetch quiz results for chapter ${params.chapterId}:`, error);
//       isQuizPassed = false;
//     }
//   }

//   // Define serviceType based on your business logic or configuration
//   const serviceType = 3854; // Example: Assuming this is the correct service type for this course

//   return (
//     <div>
//       {userProgress?.isCompleted && (
//         <Banner variant="success" label="You already completed this chapter." />
//       )}
//       {isLocked && (
//         <Banner
//           variant="warning"
//           label="You need to purchase this course to watch this chapter."
//         />
//       )}
//       <div
//         className="flex flex-col max-w-4xl mx-auto pb-20"
//         style={{ paddingTop: "20px" }}
//       >
//         <div className="p-2">
//           <VideoPlayer
//             chapterId={params.chapterId}
//             title={chapter.title}
//             courseId={params.courseId}
//             nextChapterId={nextChapter?.id}
//             playbackId={muxData?.playbackId!}
//             isLocked={isLocked}
//             completeOnEnd={completeOnEnd}
//           />
//         </div>
//         <div>
//           {/* <div className="px-6 py-2 flex flex-col md:flex-row items-center justify-end bg-white dark:bg-gray-800 rounded-lg shadow-md">
//             {purchase ? (
//               <CourseProgressButton
//                 chapterId={params.chapterId}
//                 courseId={params.courseId}
//                 nextChapterId={nextChapter?.id}
//                 isCompleted={!!userProgress?.isCompleted}
//                 isQuizPassed={isQuizPassed} // Pass quiz status to CourseProgressButton
//               />
//             ) : (
//               <CourseEnrollButton
//                 courseId={params.courseId}
//                 price={course.price!}
//                 serviceType={serviceType} // Pass serviceType to CourseEnrollButton
//               />
//             )} 
//           </div>  */}



//           <div className="px-6 py-2 flex flex-col md:flex-row items-center justify-end bg-white dark:bg-gray-800 rounded-lg shadow-md">
//           {purchase && (await db.transaction.findUnique({ where: { id: purchase.transactionId } }))?.status === 'SUCCESS' ? (
//               <CourseProgressButton
//                 chapterId={params.chapterId}
//                 courseId={params.courseId}
//                 nextChapterId={nextChapter?.id}
//                 isCompleted={!!userProgress?.isCompleted}
//                 isQuizPassed={isQuizPassed}
//               />
//             ) : (
//               <CourseEnrollButton
//                 courseId={params.courseId}
//                // chapterId={params.chapterId}
//                 price={course.price!}
//                 serviceType={serviceType}
//               />
//             )}
//           </div>
//           <Separator />
//           {/* {!!attachments.length && (
//             <>
//               <Separator />
//               <div className="p-4">
//               </div>
//             </>
//           )} */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChapterIdPage;









// import { auth } from "@clerk/nextjs/server";
// import { redirect } from "next/navigation";
// import { File } from "lucide-react";
// import axios from "axios";

// import { getChapter } from "@/actions/get-chapter";
// import { Banner } from "@/components/banner";
// import { Separator } from "@/components/ui/separator";
// import { Preview } from "@/components/preview";

// import { VideoPlayer } from "./_components/video-player";
// import { CourseEnrollButton } from "./_components/course-enroll-button";
// import { CourseProgressButton } from "./_components/course-progress-button";
// import { db } from "@/lib/db";

// const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// const ChapterIdPage = async ({
//   params,
// }: {
//   params: { courseId: string; chapterId: string };
// }) => {
//   const { userId, getToken } = auth();

//   if (!userId) {
//     return redirect("/");
//   }

//   const {
//     chapter,
//     course,
//     muxData,
//     attachments,
//     nextChapter,
//     userProgress,
//     purchase,
//   } = await getChapter({
//     userId,
//     chapterId: params.chapterId,
//     courseId: params.courseId,
//   });

//   if (!chapter || !course) {
//     return redirect("/");
//   }

//   const isLocked = !chapter.isFree && (!purchase || purchase.transaction?.status !== 'COMPLETED');
//   const completeOnEnd = !!purchase && purchase.transaction?.status === 'COMPLETED' && !userProgress?.isCompleted;

//   const token = await getToken();
//   let isQuizPassed = false;
//   try {
//     const resultsResponse = await axios.get(
//       `${BASE_URL}/api/courses/${params.courseId}/chapters/${params.chapterId}/chapterquizzes/results`,
//       {
//         headers: {
//           "user-id": userId,
//           Authorization: token ? `Bearer ${token}` : undefined,
//         },
//       }
//     );
//     const { score, totalQuestions } = resultsResponse.data;
//     const scorePercentage = (score / totalQuestions) * 100;
//     isQuizPassed = scorePercentage >= 60;
//   } catch (error: any) {
//     if (error.response?.status === 404) {
//       isQuizPassed = false;
//     } else {
//       console.error(`Failed to fetch quiz results for chapter ${params.chapterId}:`, error);
//       isQuizPassed = false;
//     }
//   }

//   const serviceType = 3854; // Example service type

//   return (
//     <div>
//       {userProgress?.isCompleted && (
//         <Banner variant="success" label="You already completed this chapter." />
//       )}
//       {isLocked && (
//         <Banner
//           variant="warning"
//           label="You need to purchase this course to watch this chapter."
//         />
//       )}
//       <div className="flex flex-col max-w-4xl mx-auto pb-20" style={{ paddingTop: "20px" }}>
//         <div className="p-2">
//           <VideoPlayer
//             chapterId={params.chapterId}
//             title={chapter.title}
//             courseId={params.courseId}
//             nextChapterId={nextChapter?.id}
//             playbackId={muxData?.playbackId!}
//             isLocked={isLocked}
//             completeOnEnd={completeOnEnd}
//           />
//         </div>
//         <div>
//           <div className="px-6 py-2 flex flex-col md:flex-row items-center justify-end bg-white dark:bg-gray-800 rounded-lg shadow-md">
//             {purchase && purchase.transaction?.status === 'COMPLETED' ? (
//               <CourseProgressButton
//                 chapterId={params.chapterId}
//                 courseId={params.courseId}
//                 nextChapterId={nextChapter?.id}
//                 isCompleted={!!userProgress?.isCompleted}
//                 isQuizPassed={isQuizPassed}
//               />
//             ) : (
//               <CourseEnrollButton
//                 courseId={params.courseId}
//                 price={course.price!}
//                 serviceType={serviceType}
//               />
//             )}
//           </div>
//           <Separator />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChapterIdPage;





// import { auth } from "@clerk/nextjs/server";
// import { redirect } from "next/navigation";
// import { File } from "lucide-react";
// import axios from "axios";

// import { getChapter } from "@/actions/get-chapter";
// import { Banner } from "@/components/banner";
// import { Separator } from "@/components/ui/separator";
// import { Preview } from "@/components/preview";

// import { VideoPlayer } from "./_components/video-player";
// import { CourseEnrollButton } from "./_components/course-enroll-button";
// import { CourseProgressButton } from "./_components/course-progress-button";

// const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// const ChapterIdPage = async ({
//   params,
// }: {
//   params: { courseId: string; chapterId: string };
// }) => {
//   const { userId, getToken } = auth();

//   // Redirect if user is not authenticated
//   if (!userId) {
//     return redirect("/");
//   }

//   // Fetch chapter data
//   const {
//     chapter,
//     course,
//     muxData,
//     attachments,
//     nextChapter,
//     userProgress,
//     purchase,
//   } = await getChapter({
//     userId,
//     chapterId: params.chapterId,
//     courseId: params.courseId,
//   });

//   // Redirect if chapter or course is not found
//   if (!chapter || !course) {
//     return redirect("/");
//   }

//   const isLocked = !chapter.isFree && !purchase;
//   const completeOnEnd = !!purchase && !userProgress?.isCompleted;

//   // Fetch quiz pass status for the current chapter
//   const token = await getToken();
//   let isQuizPassed = false;
//   try {
//     const resultsResponse = await axios.get(
//       `${BASE_URL}/api/courses/${params.courseId}/chapters/${params.chapterId}/chapterquizzes/results`,
//       {
//         headers: {
//           "user-id": userId,
//           Authorization: token ? `Bearer ${token}` : undefined,
//         },
//       }
//     );
//     const { score, totalQuestions } = resultsResponse.data;
//     const scorePercentage = (score / totalQuestions) * 100;
//     isQuizPassed = scorePercentage >= 60; // Pass threshold matches CourseSidebar
//   } catch (error: any) {
//     if (error.response?.status === 404) {
//       // 404 means no quiz results exist (quiz not taken), treat as not passed
//       isQuizPassed = false; // No need to log this as an error
//     } else {
//       // Log unexpected errors (e.g., 500, network issues)
//       console.error(`Failed to fetch quiz results for chapter ${params.chapterId}:`, error);
//       isQuizPassed = false;
//     }
//   }

//   // Define serviceType based on your business logic or configuration
//   const serviceType = 3854; // Example: Assuming this is the correct service type for this course

//   return (
//     <div>
//       {userProgress?.isCompleted && (
//         <Banner variant="success" label="You already completed this chapter." />
//       )}
//       {isLocked && (
//         <Banner
//           variant="warning"
//           label="You need to purchase this course to watch this chapter."
//         />
//       )}
//       <div
//         className="flex flex-col max-w-4xl mx-auto pb-20"
//         style={{ paddingTop: "20px" }}
//       >
//         <div className="p-2">
//           <VideoPlayer
//             chapterId={params.chapterId}
//             title={chapter.title}
//             courseId={params.courseId}
//             nextChapterId={nextChapter?.id}
//             playbackId={muxData?.playbackId!}
//             isLocked={isLocked}
//             completeOnEnd={completeOnEnd}
//           />
//         </div>
//         <div>
//           <div className="px-6 py-2 flex flex-col md:flex-row items-center justify-end bg-white dark:bg-gray-800 rounded-lg shadow-md">
//             {purchase ? (
//               <CourseProgressButton
//                 chapterId={params.chapterId}
//                 courseId={params.courseId}
//                 nextChapterId={nextChapter?.id}
//                 isCompleted={!!userProgress?.isCompleted}
//                 isQuizPassed={isQuizPassed} // Pass quiz status to CourseProgressButton
//               />
//             ) : (
//               <CourseEnrollButton
//                 courseId={params.courseId}
//                 price={course.price!}
//                 serviceType={serviceType} // Pass serviceType to CourseEnrollButton
//               />
//             )}
//           </div>
//           <Separator />
//           {/* {!!attachments.length && (
//             <>
//               <Separator />
//               <div className="p-4">
//               </div>
//             </>
//           )} */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChapterIdPage;









// import { auth } from "@clerk/nextjs/server";
// import { redirect } from "next/navigation";
// import { File } from "lucide-react";
// import axios from "axios";

// import { getChapter } from "@/actions/get-chapter";
// import { Banner } from "@/components/banner";
// import { Separator } from "@/components/ui/separator";
// import { Preview } from "@/components/preview";

// import { VideoPlayer } from "./_components/video-player";
// import { CourseEnrollButton } from "./_components/course-enroll-button";
// import { CourseProgressButton } from "./_components/course-progress-button";

// const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// const ChapterIdPage = async ({
//   params,
// }: {
//   params: { courseId: string; chapterId: string };
// }) => {
//   const { userId, getToken } = auth();

//   // Redirect if user is not authenticated
//   if (!userId) {
//     return redirect("/");
//   }

//   // Fetch chapter data
//   const {
//     chapter,
//     course,
//     muxData,
//     attachments,
//     nextChapter,
//     userProgress,
//     purchase,
//   } = await getChapter({
//     userId,
//     chapterId: params.chapterId,
//     courseId: params.courseId,
//   });

//   // Redirect if chapter or course is not found
//   if (!chapter || !course) {
//     return redirect("/");
//   }

//   const isLocked = !chapter.isFree && !purchase;
//   const completeOnEnd = !!purchase && !userProgress?.isCompleted;

//   // Fetch quiz pass status for the current chapter
//   const token = await getToken();
//   let isQuizPassed = false;
//   try {
//     const resultsResponse = await axios.get(
//       `${BASE_URL}/api/courses/${params.courseId}/chapters/${params.chapterId}/chapterquizzes/results`,
//       {
//         headers: {
//           "user-id": userId,
//           Authorization: token ? `Bearer ${token}` : undefined,
//         },
//       }
//     );
//     const { score, totalQuestions } = resultsResponse.data;
//     const scorePercentage = (score / totalQuestions) * 100;
//     isQuizPassed = scorePercentage >= 60; // Pass threshold matches CourseSidebar
//   } catch (error: any) {
//     if (error.response?.status === 404) {
//       // 404 means no quiz results exist (quiz not taken), treat as not passed
//       isQuizPassed = false; // No need to log this as an error
//     } else {
//       // Log unexpected errors (e.g., 500, network issues)
//       console.error(`Failed to fetch quiz results for chapter ${params.chapterId}:`, error);
//       isQuizPassed = false;
//     }
//   }

//   // Define serviceType based on your business logic or configuration
//   const serviceType = 3854; // Example: Assuming this is the correct service type for this course

//   return (
//     <div>
//       {userProgress?.isCompleted && (
//         <Banner variant="success" label="You already completed this chapter." />
//       )}
//       {isLocked && (
//         <Banner
//           variant="warning"
//           label="You need to purchase this course to watch this chapter."
//         />
//       )}
//       <div
//         className="flex flex-col max-w-4xl mx-auto pb-20"
//         style={{ paddingTop: "20px" }}
//       >
//         <div className="p-2">
//           <VideoPlayer
//             chapterId={params.chapterId}
//             title={chapter.title}
//             courseId={params.courseId}
//             nextChapterId={nextChapter?.id}
//             playbackId={muxData?.playbackId!}
//             isLocked={isLocked}
//             completeOnEnd={completeOnEnd}
//           />
//         </div>
//         <div>
//           <div className="px-6 py-2 flex flex-col md:flex-row items-center justify-end bg-white dark:bg-gray-800 rounded-lg shadow-md">
//             {/* Uncomment if you want to display chapter title */}
//             {/* <h2
//               className="text-2xl font-semibold mb-2"
//               style={{
//                 color: "#FFFF", // Gold light color
//                 backgroundColor: "#6b4fbb", // Soft off-white background for navy blue
//                 padding: "10px", // Add some padding for better readability
//                 borderRadius: "5px", // Optional: rounded corners for a softer look
//               }}
//             >
//               {chapter.title}
//             </h2> */}
//             {purchase ? (
//               <CourseProgressButton
//                 chapterId={params.chapterId}
//                 courseId={params.courseId}
//                 nextChapterId={nextChapter?.id}
//                 isCompleted={!!userProgress?.isCompleted}
//                 isQuizPassed={isQuizPassed} // Pass quiz status to CourseProgressButton
//               />
//             ) : (
//               <CourseEnrollButton
//                 courseId={params.courseId}
//                 price={course.price!}
//                 serviceType={serviceType} // Pass serviceType to CourseEnrollButton
//               />
//             )}
//           </div>
//           <Separator />
//           {/* Uncomment and style chapter description if needed */}
//           {/* <div
//             style={{
//               color: "green", // Gold light color for text
//               backgroundColor: "#6b4fbb", // Soft off-white background for navy blue
//               padding: "10px", // Add some padding for better readability
//               borderRadius: "5px", // Optional: rounded corners for a softer look
//             }}
//           >
//             <Preview value={chapter.description!} />
//           </div> */}
//           {!!attachments.length && (
//             <>
//               <Separator />
//               <div className="p-4">
//                 {/* Uncomment if attachments rendering is needed */}
//                 {/* {attachments.map((attachment) => (
//                   <a
//                     href={attachment.url}
//                     target="_blank"
//                     key={attachment.id}
//                     className="flex items-center p-3 w-full bg-sky-200 dark:bg-sky-800 text-sky-700 dark:text-sky-300 hover:underline"
//                   >
//                     <File />
//                     <p className="line-clamp-1">{attachment.name}</p>
//                   </a>
//                 ))} */}
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChapterIdPage;








// import { auth } from "@clerk/nextjs/server";
// import { redirect } from "next/navigation";
// import { File } from "lucide-react";
// import axios from "axios";

// import { getChapter } from "@/actions/get-chapter";
// import { Banner } from "@/components/banner";
// import { Separator } from "@/components/ui/separator";
// import { Preview } from "@/components/preview";
// import { VideoPlayer } from "./_components/video-player";
// import { CourseEnrollButton } from "./_components/course-enroll-button";
// import { CourseProgressButton } from "./_components/course-progress-button";
// import { db } from "@/lib/db"; // Assuming you have a db instance for Prisma or similar

// const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// const ChapterIdPage = async ({
//   params,
// }: {
//   params: { courseId: string; chapterId: string };
// }) => {
//   const { userId, getToken } = auth();

//   // Redirect if user is not authenticated
//   if (!userId) {
//     return redirect("/");
//   }

//   // Fetch chapter data
//   const {
//     chapter,
//     course,
//     muxData,
//     attachments,
//     nextChapter,
//     userProgress,
//     purchase,
//   } = await getChapter({
//     userId,
//     chapterId: params.chapterId,
//     courseId: params.courseId,
//   });

//   // Redirect if chapter or course is not found
//   if (!chapter || !course) {
//     return redirect("/");
//   }

//   // Validate purchase status: Check if there's a COMPLETED transaction
//   let isPurchased = false;
//   if (purchase) {
//     const transaction = await db.transaction.findFirst({
//       where: {
//         userId,
//         courseId: params.courseId,
//         status: "COMPLETED",
//       },
//     });
//     isPurchased = !!transaction;
//   }

//   const isLocked = !chapter.isFree && !isPurchased;
//   const completeOnEnd = isPurchased && !userProgress?.isCompleted;

//   // Fetch quiz pass status for the current chapter
//   const token = await getToken();
//   let isQuizPassed = false;
//   try {
//     const resultsResponse = await axios.get(
//       `${BASE_URL}/api/courses/${params.courseId}/chapters/${params.chapterId}/chapterquizzes/results`,
//       {
//         headers: {
//           "user-id": userId,
//           Authorization: token ? `Bearer ${token}` : undefined,
//         },
//       }
//     );
//     const { score, totalQuestions } = resultsResponse.data;
//     const scorePercentage = (score / totalQuestions) * 100;
//     isQuizPassed = scorePercentage >= 60; // Pass threshold matches CourseSidebar
//   } catch (error: any) {
//     if (error.response?.status === 404) {
//       isQuizPassed = false; // Quiz not taken
//     } else {
//       console.error(`Failed to fetch quiz results for chapter ${params.chapterId}:`, error);
//       isQuizPassed = false;
//     }
//   }

//   // Define serviceType for payment
//   const serviceType = 3854; // Adjust based on your configuration

//   return (
//     <div>
//       {userProgress?.isCompleted && (
//         <Banner variant="success" label="You already completed this chapter." />
//       )}
//       {isLocked && (
//         <Banner
//           variant="warning"
//           label="You need to purchase this course to watch this chapter."
//         />
//       )}
//       <div
//         className="flex flex-col max-w-4xl mx-auto pb-20"
//         style={{ paddingTop: "20px" }}
//       >
//         <div className="p-2">
//           <VideoPlayer
//             chapterId={params.chapterId}
//             title={chapter.title}
//             courseId={params.courseId}
//             nextChapterId={nextChapter?.id}
//             playbackId={muxData?.playbackId!}
//             isLocked={isLocked}
//             completeOnEnd={completeOnEnd}
//           />
//         </div>
//         <div>
//           <div className="px-6 py-2 flex flex-col md:flex-row items-center justify-end bg-white dark:bg-gray-800 rounded-lg shadow-md">
//             {isPurchased ? (
//               <CourseProgressButton
//                 chapterId={params.chapterId}
//                 courseId={params.courseId}
//                 nextChapterId={nextChapter?.id}
//                 isCompleted={!!userProgress?.isCompleted}
//                 isQuizPassed={isQuizPassed}
//               />
//             ) : (
//               <CourseEnrollButton
//                 courseId={params.courseId}
//                 chapterId={params.chapterId} // Passing chapterId to CourseEnrollButton
//                 price={course.price!}
//                 serviceType={serviceType}
//               />
//             )}
//           </div>
//           <Separator />
//           {!!attachments.length && (
//             <>
//               <Separator />
//               <div className="p-4">
//                 {/* Uncomment if attachments rendering is needed */}
//                 {/* {attachments.map((attachment) => (
//                   <a
//                     href={attachment.url}
//                     target="_blank"
//                     key={attachment.id}
//                     className="flex items-center p-3 w-full bg-sky-200 dark:bg-sky-800 text-sky-700 dark:text-sky-300 hover:underline"
//                   >
//                     <File />
//                     <p className="line-clamp-1">{attachment.name}</p>
//                   </a>
//                 ))} */}
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChapterIdPage;







// import { auth } from "@clerk/nextjs/server";
// import { redirect } from "next/navigation";
// import { File } from "lucide-react";
// import axios from "axios";

// import { getChapter } from "@/actions/get-chapter";
// import { Banner } from "@/components/banner";
// import { Separator } from "@/components/ui/separator";
// import { Preview } from "@/components/preview";

// import { VideoPlayer } from "./_components/video-player";
// import { CourseEnrollButton } from "./_components/course-enroll-button";
// import { CourseProgressButton } from "./_components/course-progress-button";

// const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// const ChapterIdPage = async ({
//   params,
// }: {
//   params: { courseId: string; chapterId: string };
// }) => {
//   const { userId, getToken } = auth();

//   // Redirect if user is not authenticated
//   if (!userId) {
//     return redirect("/");
//   }

//   // Fetch chapter data
//   const {
//     chapter,
//     course,
//     muxData,
//     attachments,
//     nextChapter,
//     userProgress,
//     purchase,
//   } = await getChapter({
//     userId,
//     chapterId: params.chapterId,
//     courseId: params.courseId,
//   });

//   // Redirect if chapter or course is not found
//   if (!chapter || !course) {
//     return redirect("/");
//   }

//   const isLocked = !chapter.isFree && !purchase;
//   const completeOnEnd = !!purchase && !userProgress?.isCompleted;

//   // Fetch quiz pass status for the current chapter
//   const token = await getToken();
//   // let isQuizPassed = false;
//   // try {
//   //   const resultsResponse = await axios.get(
//   //     `${BASE_URL}/api/courses/${params.courseId}/chapters/${params.chapterId}/chapterquizzes/results`,
//   //     {
//   //       headers: {
//   //         "user-id": userId,
//   //         Authorization: token ? `Bearer ${token}` : undefined,
//   //       },
//   //     }
//   //   );
//   //   const { score, totalQuestions } = resultsResponse.data;
//   //   const scorePercentage = (score / totalQuestions) * 100;
//   //   isQuizPassed = scorePercentage >= 60; // Pass threshold matches CourseSidebar
//   // } catch (error: any) {
//   //   if (error.response?.status === 404) {
//   //     // 404 means no quiz results exist (quiz not taken), treat as not passed
//   //     isQuizPassed = false; // No need to log this as an error
//   //   } else {
//   //     // Log unexpected errors (e.g., 500, network issues)
//   //     console.error(`Failed to fetch quiz results for chapter ${params.chapterId}:`, error);
//   //     isQuizPassed = false;
//   //   }
//   // }


//   let isQuizPassed: boolean | undefined = undefined;

//   try {
//     const resultsResponse = await axios.get(
//       `${BASE_URL}/api/courses/${params.courseId}/chapters/${params.chapterId}/chapterquizzes/results`,
//       {
//         headers: {
//           "user-id": userId,
//           Authorization: token ? `Bearer ${token}` : undefined,
//         },
//       }
//     );
  
//     const { score, totalQuestions } = resultsResponse.data;
//     const scorePercentage = (score / totalQuestions) * 100;
//     isQuizPassed = scorePercentage >= 60;
//   } catch (error: any) {
//     if (error.response?.status === 404) {
//       // No quiz exists, leave isQuizPassed as undefined
//       isQuizPassed = undefined;
//     } else {
//       console.error("Error fetching quiz results:", error);
//       isQuizPassed = false; // Fallback: block progress
//     }
//   }
  


//   // Define serviceType based on your business logic or configuration
//   const serviceType = 3854; // Example: Assuming this is the correct service type for this course

//   return (
//     <div>
//       {userProgress?.isCompleted && (
//         <Banner variant="success" label="You already completed this chapter." />
//       )}
//       {isLocked && (
//         <Banner
//           variant="warning"
//           label="You need to purchase this course to watch this chapter."
//         />
//       )}
//       <div
//         className="flex flex-col max-w-4xl mx-auto pb-20"
//         style={{ paddingTop: "20px" }}
//       >
//         <div className="p-2">
//           <VideoPlayer
//             chapterId={params.chapterId}
//             title={chapter.title}
//             courseId={params.courseId}
//             nextChapterId={nextChapter?.id}
//             playbackId={muxData?.playbackId!}
//             isLocked={isLocked}
//             completeOnEnd={completeOnEnd}
//           />
//         </div>
//         <div>
//           <div className="px-6 py-2 flex flex-col md:flex-row items-center justify-end bg-white dark:bg-gray-800 rounded-lg shadow-md">
//             {/* Uncomment if you want to display chapter title */}
//             {/* <h2
//               className="text-2xl font-semibold mb-2"
//               style={{
//                 color: "#FFFF", // Gold light color
//                 backgroundColor: "#6b4fbb", // Soft off-white background for navy blue
//                 padding: "10px", // Add some padding for better readability
//                 borderRadius: "5px", // Optional: rounded corners for a softer look
//               }}
//             >
//               {chapter.title}
//             </h2> */}
//             {purchase ? (
//               <CourseProgressButton
//                 chapterId={params.chapterId}
//                 courseId={params.courseId}
//                 nextChapterId={nextChapter?.id}
//                 isCompleted={!!userProgress?.isCompleted}
//                 isQuizPassed={isQuizPassed} // Pass quiz status to CourseProgressButton
//               />
//             ) : (
//               <CourseEnrollButton
//                 courseId={params.courseId}
//                 chapterId={params.chapterId}
//                 price={course.price!}
//                 serviceType={serviceType} // Pass serviceType to CourseEnrollButton
//               />
//             )}
//           </div>
//           <Separator />
//           {/* Uncomment and style chapter description if needed */}
//           {/* <div
//             style={{
//               color: "green", // Gold light color for text
//               backgroundColor: "#6b4fbb", // Soft off-white background for navy blue
//               padding: "10px", // Add some padding for better readability
//               borderRadius: "5px", // Optional: rounded corners for a softer look
//             }}
//           >
//             <Preview value={chapter.description!} />
//           </div> */}
//           {!!attachments.length && (
//             <>
//               <Separator />
//               <div className="p-4">
//                 {/* Uncomment if attachments rendering is needed */}
//                 {/* {attachments.map((attachment) => (
//                   <a
//                     href={attachment.url}
//                     target="_blank"
//                     key={attachment.id}
//                     className="flex items-center p-3 w-full bg-sky-200 dark:bg-sky-800 text-sky-700 dark:text-sky-300 hover:underline"
//                   >
//                     <File />
//                     <p className="line-clamp-1">{attachment.name}</p>
//                   </a>
//                 ))} */}
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChapterIdPage;







// import { auth } from "@clerk/nextjs/server";
// import { redirect } from "next/navigation";
// import { File } from "lucide-react";
// import axios from "axios";

// import { getChapter } from "@/actions/get-chapter";
// import { Banner } from "@/components/banner";
// import { Separator } from "@/components/ui/separator";
// import { Preview } from "@/components/preview";

// import { VideoPlayer } from "./_components/video-player";
// import { CourseEnrollButton } from "./_components/course-enroll-button";
// import { CourseProgressButton } from "./_components/course-progress-button";

// const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// const ChapterIdPage = async ({
//   params,
// }: {
//   params: { courseId: string; chapterId: string };
// }) => {
//   const { userId, getToken } = auth();

//   // Redirect if user is not authenticated
//   if (!userId) {
//     return redirect("/");
//   }

//   // Fetch chapter data
//   const {
//     chapter,
//     course,
//     muxData,
//     attachments,
//     nextChapter,
//     userProgress,
//     purchase,
//   } = await getChapter({
//     userId,
//     chapterId: params.chapterId,
//     courseId: params.courseId,
//   });

//   // Redirect if chapter or course is not found
//   if (!chapter || !course) {
//     return redirect("/");
//   }

//   const isLocked = !chapter.isFree && !purchase;
//   const completeOnEnd = !!purchase && !userProgress?.isCompleted;

//   // Fetch quiz pass status for the current chapter
//   let isQuizPassed: boolean | undefined = undefined;
//   const token = await getToken();

//   try {
//     const resultsResponse = await axios.get(
//       `${BASE_URL}/api/courses/${params.courseId}/chapters/${params.chapterId}/chapterquizzes/results`,
//       {
//         headers: {
//           "user-id": userId,
//           Authorization: token ? `Bearer ${token}` : undefined,
//         },
//       }
//     );

//     const { score, totalQuestions } = resultsResponse.data;
//     const scorePercentage = (score / totalQuestions) * 100;
//     isQuizPassed = scorePercentage >= 60; // Pass threshold
//   } catch (error: any) {
//     if (error.response?.status === 404) {
//       // No quiz exists or no results, leave isQuizPassed as undefined
//       isQuizPassed = undefined;
//     } else {
//       // Log unexpected errors and block progress
//       console.error("Error fetching quiz results:", error);
//       isQuizPassed = false;
//     }
//   }

//   // Define serviceType for enrollment (based on business logic)
//   const serviceType = 3854; // Example service type for this course

//   return (
//     <div>
//       {userProgress?.isCompleted && (
//         <Banner variant="success" label="You already completed this chapter." />
//       )}
//       {isLocked && (
//         <Banner
//           variant="warning"
//           label="You need to purchase this course to watch this chapter."
//         />
//       )}
//       <div className="flex flex-col max-w-4xl mx-auto pb-20" style={{ paddingTop: "20px" }}>
//         <div className="p-2">
//           <VideoPlayer
//             chapterId={params.chapterId}
//             title={chapter.title}
//             courseId={params.courseId}
//             nextChapterId={nextChapter?.id}
//             playbackId={muxData?.playbackId!}
//             isLocked={isLocked}
//             completeOnEnd={completeOnEnd}
//           />
//         </div>
//         <div>
//           <div className="px-6 py-2 flex flex-col md:flex-row items-center justify-end bg-white dark:bg-gray-800 rounded-lg shadow-md">
//             {purchase ? (
//               <CourseProgressButton
//                 chapterId={params.chapterId}
//                 courseId={params.courseId}
//                 nextChapterId={nextChapter?.id}
//                 isCompleted={!!userProgress?.isCompleted}
//                 isQuizPassed={isQuizPassed}
//               />
//             ) : (
//               <CourseEnrollButton
//                 courseId={params.courseId}
//                 chapterId={params.chapterId}
//                 price={course.price!}
//                 serviceType={serviceType}
//               />
//             )}
//           </div>
//           <Separator />
//           {!!attachments.length && (
//             <>
//               <Separator />
//               <div className="p-4">
//                 {attachments.map((attachment) => (
//                   <a
//                     href={attachment.url}
//                     target="_blank"
//                     key={attachment.id}
//                     className="flex items-center p-3 w-full bg-sky-200 dark:bg-sky-800 text-sky-700 dark:text-sky-300 hover:underline"
//                   >
//                     <File />
//                     <p className="line-clamp-1">{attachment.name}</p>
//                   </a>
//                 ))}
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChapterIdPage;





import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { File } from "lucide-react";
import axios from "axios";

import { getChapter } from "@/actions/get-chapter";
import { Banner } from "@/components/banner";
import { Separator } from "@/components/ui/separator";
import { Preview } from "@/components/preview";

import { VideoPlayer } from "./_components/video-player";
import { CourseEnrollButton } from "./_components/course-enroll-button";
import { CourseProgressButton } from "./_components/course-progress-button";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

const ChapterIdPage = async ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  const { userId, getToken } = auth();

  // Redirect if user is not authenticated
  if (!userId) {
    return redirect("/");
  }

  // Fetch chapter data
  const {
    chapter,
    course,
    muxData,
    attachments,
    nextChapter,
    userProgress,
    purchase,
  } = await getChapter({
    userId,
    chapterId: params.chapterId,
    courseId: params.courseId,
  });

  // Redirect if chapter or course is not found
  if (!chapter || !course) {
    return redirect("/");
  }

  const isLocked = !chapter.isFree && !purchase;
  const completeOnEnd = !!purchase && !userProgress?.isCompleted;

  // Fetch quiz pass status for the current chapter
  const token = await getToken();
  let isQuizPassed = false;
  try {
    const resultsResponse = await axios.get(
      `${BASE_URL}/api/courses/${params.courseId}/chapters/${params.chapterId}/chapterquizzes/results`,
      {
        headers: {
          "user-id": userId,
          Authorization: token ? `Bearer ${token}` : undefined,
        },
      }
    );
    const { score, totalQuestions } = resultsResponse.data;
    const scorePercentage = (score / totalQuestions) * 100;
    isQuizPassed = scorePercentage >= 60; // Pass threshold matches CourseSidebar
  } catch (error: any) {
    if (error.response?.status === 404) {
      // 404 means no quiz results exist (quiz not taken), treat as not passed
      isQuizPassed = false; // No need to log this as an error
    } else {
      // Log unexpected errors (e.g., 500, network issues)
      console.error(`Failed to fetch quiz results for chapter ${params.chapterId}:`, error);
      isQuizPassed = false;
    }
  }

  // Define serviceType based on your business logic or configuration
  const serviceType = 3854; // Example: Assuming this is the correct service type for this course

  return (
    <div>
      {userProgress?.isCompleted && (
        <Banner variant="success" label="You already completed this chapter." />
      )}
      {isLocked && (
        <Banner
          variant="warning"
          label="You need to purchase this course to watch this chapter."
        />
      )}
      <div
        className="flex flex-col max-w-4xl mx-auto pb-20"
        style={{ paddingTop: "20px" }}
      >
        <div className="p-2">
          <VideoPlayer
            chapterId={params.chapterId}
            title={chapter.title}
            courseId={params.courseId}
            nextChapterId={nextChapter?.id}
            playbackId={muxData?.playbackId!}
            isLocked={isLocked}
            completeOnEnd={completeOnEnd}
            videoUrl={chapter.videoUrl}
            googleDriveUrl={chapter.googleDriveUrl}
          />
        </div>
        <div>
          <div className="px-6 py-2 flex flex-col md:flex-row items-center justify-end bg-white dark:bg-gray-800 rounded-lg shadow-md">
            {/* Uncomment if you want to display chapter title */}
            {/* <h2
              className="text-2xl font-semibold mb-2"
              style={{
                color: "#FFFF", // Gold light color
                backgroundColor: "#6b4fbb", // Soft off-white background for navy blue
                padding: "10px", // Add some padding for better readability
                borderRadius: "5px", // Optional: rounded corners for a softer look
              }}
            >
              {chapter.title}
            </h2> */}
            {purchase ? (
              <CourseProgressButton
                chapterId={params.chapterId}
                courseId={params.courseId}
                nextChapterId={nextChapter?.id}
                isCompleted={!!userProgress?.isCompleted}
                isQuizPassed={isQuizPassed} // Pass quiz status to CourseProgressButton
              />
            ) : (
              <CourseEnrollButton
                courseId={params.courseId}
                chapterId={params.chapterId}
                price={course.price!}
                serviceType={serviceType} // Pass serviceType to CourseEnrollButton
              />
            )}
          </div>
          <Separator />
          {/* Uncomment and style chapter description if needed */}
          {/* <div
            style={{
              color: "green", // Gold light color for text
              backgroundColor: "#6b4fbb", // Soft off-white background for navy blue
              padding: "10px", // Add some padding for better readability
              borderRadius: "5px", // Optional: rounded corners for a softer look
            }}
          >
            <Preview value={chapter.description!} />
          </div> */}
          {!!attachments.length && (
            <>
              <Separator />
              <div className="p-4">
                {/* Uncomment if attachments rendering is needed */}
                {/* {attachments.map((attachment) => (
                  <a
                    href={attachment.url}
                    target="_blank"
                    key={attachment.id}
                    className="flex items-center p-3 w-full bg-sky-200 dark:bg-sky-800 text-sky-700 dark:text-sky-300 hover:underline"
                  >
                    <File />
                    <p className="line-clamp-1">{attachment.name}</p>
                  </a>
                ))} */}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChapterIdPage;






// import { auth } from "@clerk/nextjs/server";
// import { redirect } from "next/navigation";
// import { File } from "lucide-react";
// import axios from "axios";

// import { getChapter } from "@/actions/get-chapter";
// import { Banner } from "@/components/banner";
// import { Separator } from "@/components/ui/separator";
// import { Preview } from "@/components/preview";

// import { VideoPlayer } from "./_components/video-player";
// import { CourseEnrollButton } from "./_components/course-enroll-button";
// import { CourseProgressButton } from "./_components/course-progress-button";

// const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// const ChapterIdPage = async ({
//   params,
// }: {
//   params: { courseId: string; chapterId: string };
// }) => {
//   const { userId, getToken } = auth();

//   // Redirect if user is not authenticated
//   if (!userId) {
//     return redirect("/");
//   }

//   // Fetch chapter data
//   const {
//     chapter,
//     course,
//     muxData,
//     attachments,
//     nextChapter,
//     userProgress,
//     purchase,
//   } = await getChapter({
//     userId,
//     chapterId: params.chapterId,
//     courseId: params.courseId,
//   });

//   // Redirect if chapter or course is not found
//   if (!chapter || !course) {
//     return redirect("/");
//   }

//   const isLocked = !chapter.isFree && !purchase;
//   const completeOnEnd = !!purchase && !userProgress?.isCompleted;

//   // Fetch quiz pass status for the current chapter
//   const token = await getToken();
//   let isQuizPassed = false;
//   try {
//     const resultsResponse = await axios.get(
//       `${BASE_URL}/api/courses/${params.courseId}/chapters/${params.chapterId}/chapterquizzes/results`,
//       {
//         headers: {
//           "user-id": userId,
//           Authorization: token ? `Bearer ${token}` : undefined,
//         },
//       }
//     );
//     const { score, totalQuestions } = resultsResponse.data;
//     const scorePercentage = (score / totalQuestions) * 100;
//     isQuizPassed = scorePercentage >= 60;
//   } catch (error: any) {
//     if (error.response?.status === 404) {
//       isQuizPassed = false;
//     } else {
//       console.error(`Failed to fetch quiz results for chapter ${params.chapterId}:`, error);
//       isQuizPassed = false;
//     }
//   }

//   const serviceType = 3854;

//   return (
//     <div>
//       {userProgress?.isCompleted && (
//         <Banner variant="success" label="You already completed this chapter." />
//       )}
//       {isLocked && (
//         <Banner
//           variant="warning"
//           label="You need to purchase this course to watch this chapter."
//         />
//       )}
//       <div
//         className="flex flex-col max-w-4xl mx-auto pb-20"
//         style={{ paddingTop: "20px" }}
//       >
//         <div className="p-2">
//           <VideoPlayer
//             chapterId={params.chapterId}
//             title={chapter.title}
//             courseId={params.courseId}
//             nextChapterId={nextChapter?.id}
//             playbackId={muxData?.playbackId || undefined}
//             isLocked={isLocked}
//             completeOnEnd={completeOnEnd}
//             videoUrl={chapter.videoUrl || undefined}
//             googleDriveUrl={chapter.googleDriveUrl || undefined}
//           />
//         </div>
//         <div>
//           <div className="px-6 py-2 flex flex-col md:flex-row items-center justify-end bg-white dark:bg-gray-800 rounded-lg shadow-md">
//             {purchase ? (
//               <CourseProgressButton
//                 chapterId={params.chapterId}
//                 courseId={params.courseId}
//                 nextChapterId={nextChapter?.id}
//                 isCompleted={!!userProgress?.isCompleted}
//                 isQuizPassed={isQuizPassed}
//               />
//             ) : (
//               <CourseEnrollButton
//                 courseId={params.courseId}
//                 chapterId={params.chapterId}
//                 price={course.price!}
//                 serviceType={serviceType}
//               />
//             )}
//           </div>
//           <Separator />
//           {!!attachments.length && (
//             <>
//               <Separator />
//               <div className="p-4">
//                 {/* Attachments rendering if needed */}
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChapterIdPage;