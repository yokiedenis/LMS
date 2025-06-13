// import { auth } from "@clerk/nextjs/server"; // Correct import
// import { NextResponse } from "next/server";
// import db from "@/lib/prisma";

// export async function GET() { // No req parameter needed
//   try {
//     const { userId } = auth(); // Call auth() without arguments

//     if (!userId) {
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     // Get user purchases with course details
//     const purchases = await db.purchase.findMany({
//       where: { userId },
//       include: {
//         course: {
//           include: {
//             chapters: {
//               include: {
//                 recordings: true,
//               },
//             },
//           },
//         },
//       },
//     });

//     // Get user progress with chapter details
//     const userProgress = await db.userProgress.findMany({
//       where: { userId, isCompleted: true },
//       include: {
//         chapter: {
//           include: {
//             recordings: true,
//           },
//         },
//       },
//     });

//     // Calculate core metrics
//     const totalCourses = purchases.length;
//     const completedChapters = userProgress.length;
    
//     // Calculate total chapters across all enrolled courses
//     const totalChapters = purchases.reduce((acc, purchase) => 
//       acc + purchase.course.chapters.length, 0);

//     // Calculate completion percentage
//     const completionPercentage = totalChapters > 0 
//       ? Math.round((completedChapters / totalChapters) * 10)
//       : 0;

//     // Calculate courses completed
//     const coursesCompleted = purchases.filter(purchase => {
//       const courseChapters = purchase.course.chapters;
//       const completed = userProgress.filter(up => 
//         up.chapter.courseId === purchase.courseId
//       ).length;
//       return completed === courseChapters.length;
//     }).length;

//     // Calculate hours spent from recordings
//     const totalMinutes = userProgress.reduce((acc, up) => 
//       acc + up.chapter.recordings.reduce((sum, r) => sum + (r.duration || 0), 0), 0);
//     const hoursSpent = (totalMinutes / 60).toFixed(1);

//     // Get quiz attempts count
//     const quizzesPracticed = await db.chapterQuizAttempt.count({
//       where: { studentId: userId },
//     });

//     return NextResponse.json({
//       completionPercentage,
//       totalCourses,
//       coursesCompleted,
//       liveClassesAttended: completedChapters, // Assuming 1 chapter = 1 class
//       hoursSpent,
//       quizzesPracticed,
//     });
    
//   } catch (error) {
//     console.error("[PROGRESS_STATS]", error);
//     return new NextResponse("Internal Error", { status: 500 });
//   }
// }






















// api/progress-stats/route.ts
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import db from "@/lib/prisma";

export async function GET() {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Get user purchases with course details
    const purchases = await db.purchase.findMany({
      where: { userId },
      include: {
        course: {
          include: {
            chapters: {
              include: {
                recordings: true,
              },
            },
          },
        },
      },
    });

    // Get user progress with chapter details
    const userProgress = await db.userProgress.findMany({
      where: { userId, isCompleted: true },
      include: {
        chapter: {
          include: {
            recordings: true,
          },
        },
      },
    });

    // Calculate core metrics
    const totalCourses = purchases.length;
    const completedChapters = userProgress.length;
    
    // Calculate total chapters across all enrolled courses
    const totalChapters = purchases.reduce((acc, purchase) => 
      acc + purchase.course.chapters.length, 0);

    // Calculate completion percentage
    const completionPercentage = totalChapters > 0 
      ? Math.round((completedChapters / totalChapters) * 10)
      : 0;

    // Calculate courses completed
    const coursesCompleted = purchases.filter(purchase => {
      const courseChapters = purchase.course.chapters;
      const completed = userProgress.filter(up => 
        up.chapter.courseId === purchase.courseId
      ).length;
      return completed === courseChapters.length;
    }).length;

    // Calculate hours spent from recordings
    const totalMinutes = userProgress.reduce((acc, up) => 
      acc + up.chapter.recordings.reduce((sum, r) => sum + (r.duration || 0), 0), 0);
    const hoursSpent = (totalMinutes / 60).toFixed(1);

    // Get quiz attempts count (quizzes practiced)
    const quizzesPracticed = await db.chapterQuizAttempt.count({
      where: { studentId: userId },
    });

    // Get total assignments (quizzes) done from ChapterQuizAttempt
    const assignmentsDone = await db.chapterQuizAttempt.count({
      where: { studentId: userId },
    });

    return NextResponse.json({
      completionPercentage,
      totalCourses,
      coursesCompleted,
      liveClassesAttended: completedChapters,
      hoursSpent,
      quizzesPracticed,
      assignmentsDone, // Add this new field
    });
    
  } catch (error) {
    console.error("[PROGRESS_STATS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}















// import { auth } from "@clerk/nextjs/server"; // Correct import
// import { NextResponse } from "next/server";
// import db from "@/lib/prisma";

// export async function GET() {
//   try {
//     const { userId } = auth(); // Call auth() without arguments

//     if (!userId) {
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     // Get user purchases with course details
//     const purchases = await db.purchase.findMany({
//       where: { userId },
//       include: {
//         course: {
//           include: {
//             chapters: {
//               include: {
//                 recordings: true,
//               },
//             },
//           },
//         },
//       },
//     });

//     // Get user progress with chapter details
//     const userProgress = await db.userProgress.findMany({
//       where: { userId, isCompleted: true },
//       include: {
//         chapter: {
//           include: {
//             recordings: true,
//           },
//         },
//       },
//     });

//     // Calculate core metrics
//     const totalCourses = purchases.length;
//     const completedChapters = userProgress.length;

//     // Calculate courses completed
//     const coursesCompleted = purchases.filter(purchase => {
//       const courseChapters = purchase.course.chapters;
//       const completed = userProgress.filter(up => 
//         up.chapter.courseId === purchase.courseId
//       ).length;
//       return completed === courseChapters.length;
//     }).length;

//     // Calculate completion percentage (10% per completed course)
//     const completionPercentage = coursesCompleted * 10;

//     // Calculate hours spent from recordings
//     const totalMinutes = userProgress.reduce((acc, up) => 
//       acc + up.chapter.recordings.reduce((sum, r) => sum + (r.duration || 0), 0), 0);
//     const hoursSpent = (totalMinutes / 60).toFixed(1);

//     // Get quiz attempts count
//     const quizzesPracticed = await db.chapterQuizAttempt.count({
//       where: { studentId: userId },
//     });

//     return NextResponse.json({
//       completionPercentage, // Now based on courses completed (10% each)
//       totalCourses,
//       coursesCompleted,
//       liveClassesAttended: completedChapters, // Still assuming 1 chapter = 1 class
//       hoursSpent,
//       quizzesPracticed,
//     });
    
//   } catch (error) {
//     console.error("[PROGRESS_STATS]", error);
//     return new NextResponse("Internal Error", { status: 500 });
//   }
// }