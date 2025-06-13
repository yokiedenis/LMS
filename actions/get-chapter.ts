// import { AttachmentForm } from "@/app/(dashboard)/(routes)/teacher/courses/[courseId]/_components/attachment-form";
// import { db } from "@/lib/db";
// import { Attachment, Chapter } from "@prisma/client";


// interface getChapterProps {
//     userId: string;
//     courseId: string;
//     chapterId: string;
// };

// export const getChapter = async ({ 
//     userId, 
//     courseId, 
//     chapterId 
// }: getChapterProps) => {
//     try {

//         const purchase = await db.purchase.findUnique({
//             where: {
//                 userId_courseId: { 
//                     userId,
//                     courseId,
//                 },
//             }
//         });

//         const course = await db.course.findUnique({
//             where: {
//                 isPublished: true,
//                 id: courseId,
//             },
//             select: {
//                 price: true,
//             }
//         });

//         const chapter = await db.chapter.findUnique({
//             where: {
//                 id: chapterId,
//                 isPublished: true,
//             },
//         });

//         if (!chapter || !course) {
//             throw new Error("Chapter or course not found");
//         } 

//         let muxData = null;
//         let attachments: Attachment[] = [];
//         let nextChapter: Chapter | null = null;

//         if (purchase) {
//             attachments = await db.attachment.findMany({
//                 where: {
//                     courseId: courseId,
//                 },
//             });
//         }

//         if (chapter.isFree || purchase) {
//             muxData = await db.muxData.findUnique({
//                 where: {
//                     chapterId: chapterId,
//                 },
//             });

//             nextChapter = await db.chapter.findFirst({
//                 where: {
//                     courseId: courseId,
//                     isPublished: true,
//                     position: {
//                         gt: chapter?.position,
//                     },
//                 },
//                 orderBy: {
//                     position: "asc",
//                 },
//             });
//         }

//         const userProgress = await db.userProgress.findUnique({
//             where: {
//                 userId_chapterId: {
//                     userId,
//                     chapterId,
//                 },
//             },
//         });

//         return {
//             chapter,
//             course,
//             muxData,
//             attachments,
//             nextChapter,
//             userProgress,
//             purchase,
//         };

//     } catch (error) {
//         console.log(error);
//         return {
//             chapter: null,
//             course: null,
//             muxData: null,
//             attachments: null,
//             nextChapter: null,
//             userProgress: null,
//             purchase: null,
//         }
//     }
// }











// import { db } from "@/lib/db";
// import { Attachment, Chapter, Recording } from "@prisma/client";

// interface GetChapterProps {
//   userId: string;
//   courseId: string;
//   chapterId: string;
// }

// export const getChapter = async ({ userId, courseId, chapterId }: GetChapterProps) => {
//   try {
//     const purchase = await db.purchase.findUnique({
//       where: {
//         userId_courseId: {
//           userId,
//           courseId,
//         },
//       },
//     });

//     const course = await db.course.findUnique({
//       where: {
//         isPublished: true,
//         id: courseId,
//       },
//       select: {
//         price: true,
//       },
//     });

//     const chapter = await db.chapter.findUnique({
//       where: {
//         id: chapterId,
//         isPublished: true,
//       },
//     });

//     if (!chapter || !course) {
//       throw new Error("Chapter or course not found");
//     }

//     let muxData = null;
//     let attachments: Attachment[] = [];
//     let nextChapter: Chapter | null = null;

//     if (purchase) {
//       attachments = await db.attachment.findMany({
//         where: {
//           courseId: courseId,
//         },
//       });
//     }

//     if (chapter.isFree || purchase) {
//       // Fetch recordings for the chapter
//       const recordings = await db.recording.findMany({
//         where: {
//           chapterId,
//           isActive: true, // Ensure only active recordings are fetched
//         },
//         orderBy: {
//           createdAt: "desc", // Optional: Order by most recent
//         },
//       });

//       // Assume we want the first active recording's URL as the video source
//       const videoRecording = recordings.find((r) => r.url); // Find the first recording with a URL
//       if (videoRecording) {
//         muxData = {
//           playbackId: extractGoogleDriveFileId(videoRecording.url), // Extract the file ID from the URL
//         };
//       }

//       nextChapter = await db.chapter.findFirst({
//         where: {
//           courseId: courseId,
//           isPublished: true,
//           position: {
//             gt: chapter?.position,
//           },
//         },
//         orderBy: {
//           position: "asc",
//         },
//       });
//     }

//     const userProgress = await db.userProgress.findUnique({
//       where: {
//         userId_chapterId: {
//           userId,
//           chapterId,
//         },
//       },
//     });

//     return {
//       chapter,
//       course,
//       muxData, // Now contains the Google Drive file ID or null if no recording exists
//       attachments,
//       nextChapter,
//       userProgress,
//       purchase,
//     };
//   } catch (error) {
//     console.log(error);
//     return {
//       chapter: null,
//       course: null,
//       muxData: null,
//       attachments: null,
//       nextChapter: null,
//       userProgress: null,
//       purchase: null,
//     };
//   }
// };

// // Helper function to extract Google Drive file ID from a URL
// function extractGoogleDriveFileId(url: string): string {
//   // Example: Extract file ID from "https://drive.google.com/file/d/1QD_HjP7fhHApMySxYsUZlRRYiACjbp_g/view?usp=sharing"
//   const match = url.match(/\/d\/([^/]+)(?:\/|$)/);
//   return match ? match[1] : url; // Return the file ID or the full URL if no match
// }





import { db } from "@/lib/db";
import { Attachment, Chapter, Recording } from "@prisma/client";

interface GetChapterProps {
  userId: string;
  courseId: string;
  chapterId: string;
}

export const getChapter = async ({ userId, courseId, chapterId }: GetChapterProps) => {
  try {
    const purchase = await db.purchase.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
    });

    const course = await db.course.findUnique({
      where: {
        isPublished: true,
        id: courseId,
      },
      select: {
        price: true,
      },
    });

    const chapter = await db.chapter.findUnique({
      where: {
        id: chapterId,
        isPublished: true,
      },
    });

    if (!chapter || !course) {
      throw new Error("Chapter or course not found");
    }

    let muxData = null;
    let attachments: Attachment[] = [];
    let nextChapter: Chapter | null = null;

    if (purchase) {
      attachments = await db.attachment.findMany({
        where: {
          courseId: courseId,
        },
      });
    }

    if (chapter.isFree || purchase) {
      // Fetch recordings for the chapter
      const recordings = await db.recording.findMany({
        where: {
          chapterId,
          isActive: true, // Ensure only active recordings are fetched
        },
        orderBy: {
          createdAt: "desc", // Optional: Order by most recent
        },
      });

      // Assume we want the first active recording's URL as the video source
      const videoRecording = recordings.find((r) => r.url); // Find the first recording with a URL
      if (videoRecording) {
        muxData = {
          playbackId: extractGoogleDriveFileId(videoRecording.url), // Extract the file ID from the URL
        };
      }

      nextChapter = await db.chapter.findFirst({
        where: {
          courseId: courseId,
          isPublished: true,
          position: {
            gt: chapter?.position,
          },
        },
        orderBy: {
          position: "asc",
        },
      });
    }

    const userProgress = await db.userProgress.findUnique({
      where: {
        userId_chapterId: {
          userId,
          chapterId,
        },
      },
    });

    return {
      chapter,
      course,
      muxData, // Now contains the Google Drive file ID or null if no recording exists
      attachments,
      nextChapter,
      userProgress,
      purchase,
    };
  } catch (error) {
    console.log(error);
    return {
      chapter: null,
      course: null,
      muxData: null,
      attachments: null,
      nextChapter: null,
      userProgress: null,
      purchase: null,
    };
  }
};

// Helper function to extract Google Drive file ID from a URL
function extractGoogleDriveFileId(url: string): string {
  // Example: Extract file ID from "https://drive.google.com/file/d/1QD_HjP7fhHApMySxYsUZlRRYiACjbp_g/view?usp=sharing"
  const match = url.match(/\/d\/([^/]+)(?:\/|$)/);
  return match ? match[1] : url; // Return the file ID or the full URL if no match
}