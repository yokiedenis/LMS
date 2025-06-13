// // app/api/leaderboard/route.ts
// import { NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// export async function GET() {
//   try {
//     // Fetch all users and calculate points and levels
//     const users = await prisma.user.findMany({
//       include: {
//         profile: true,
//         userProgress: {
//           include: {
//             chapter: {
//               select: { courseId: true },
//             },
//           },
//         },
//       },
//     });

//     // Calculate total points and level for each user
//     const leaderboard = users.map((user) => {
//       const completedChapters = user.userProgress.filter((p) => p.isCompleted);
//       const totalPoints = completedChapters.reduce(
//         (sum, progress) => sum + progress.points,
//         0
//       );
//       const uniqueCourses = new Set(
//         completedChapters.map((p) => p.chapter.courseId)
//       );
//       const level = uniqueCourses.size;

//       return {
//         name: user.profile?.name || "Anonymous",
//         points: totalPoints,
//         level,
//       };
//     });

//     // Sort by points descending and return the data
//     leaderboard.sort((a, b) => b.points - a.points);

//     return NextResponse.json(leaderboard);
//   } catch (error) {
//     console.error("Error fetching leaderboard data:", error);
//     return NextResponse.json(
//       { message: "Failed to fetch leaderboard data" },
//       { status: 500 }
//     );
//   }
// }


// import { NextResponse } from 'next/server';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export async function GET() {
//   try {
//     // Fetch users with their profiles
//     const users = await prisma.user.findMany({
//       include: {
//         profile: true,
//         userProgress: true,
//         quizAttempts: true,
//         chapterQuizAttempts: true,
//       },
//     });

//     const leaderboardData = users.map((user) => {
//       // Calculate points from quiz and chapter quiz attempts
//       const totalQuizPoints = user.quizAttempts.reduce(
//         (total, attempt) => total + attempt.score,
//         0
//       );

//       const totalChapterQuizPoints = user.chapterQuizAttempts.reduce(
//         (total, attempt) => total + attempt.score,
//         0
//       );

//       // Points for completed courses
//       const completedCourses = user.userProgress.filter(progress => progress.isCompleted);
//       const coursePoints = completedCourses.length * 100; // 100 points per completed course

//       const totalPoints = totalQuizPoints + totalChapterQuizPoints + coursePoints;

//       // Determine level based on course completions
//       const level = completedCourses.length; // Level is equal to number of courses completed

//       // Use the name from the profile if it exists, otherwise fall back to the user's name
//       const name = user.profile?.name || user.name;

//       return {
//         id: user.id,
//         name,
//         level,
//         points: totalPoints,
//       };
//     });

//     // Sort by points in descending order
//     leaderboardData.sort((a, b) => b.points - a.points);

//     return NextResponse.json(leaderboardData);
//   } catch (error) {
//     console.error('Error fetching leaderboard data:', error);
//     return NextResponse.json(
//       { message: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }





// import { NextResponse } from 'next/server';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export async function GET() {
//   try {
//     // Fetch users with their profiles
//     const users = await prisma.user.findMany({
//       include: {
//         profile: true,
//         userProgress: true,
//         quizAttempts: true,
//         chapterQuizAttempts: true,
//       },
//     });

//     // Filter out users with null courseId
//     const filteredUsers = users.filter(user => user.courseId !== null);

//     const leaderboardData = filteredUsers.map((user) => {
//       // Calculate points from quiz and chapter quiz attempts
//       const totalQuizPoints = user.quizAttempts.reduce(
//         (total, attempt) => total + attempt.score,
//         0
//       );

//       const totalChapterQuizPoints = user.chapterQuizAttempts.reduce(
//         (total, attempt) => total + attempt.score,
//         0
//       );

//       // Points for completed courses
//       const completedCourses = user.userProgress.filter(progress => progress.isCompleted);
//       const coursePoints = completedCourses.length * 100; // 100 points per completed course

//       const totalPoints = totalQuizPoints + totalChapterQuizPoints + coursePoints;

//       // Determine level based on course completions
//       const level = completedCourses.length; // Level is equal to number of courses completed

//       // Use the name from the profile if it exists, otherwise fall back to the user's name
//       const name = user.profile?.name || user.name;

//       return {
//         id: user.id,
//         name,
//         level,
//         points: totalPoints,
//       };
//     });

//     // Sort by points in descending order
//     leaderboardData.sort((a, b) => b.points - a.points);

//     return NextResponse.json(leaderboardData);
//   } catch (error) {
//     console.error('Error fetching leaderboard data:', error);
//     return NextResponse.json(
//       { message: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }








// import { NextResponse } from 'next/server';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export async function GET() {
//   try {
//     // Fetch users with their profiles and related data
//     const users = await prisma.user.findMany({
//       include: {
//         profile: true,
//         userProgress: true,
//         quizAttempts: true,
//         chapterQuizAttempts: true,
//       },
//     });

//     // Calculate points and level for each user
//     const leaderboardData = users.map((user) => {
//       // Calculate points from quiz and chapter quiz attempts
//       const totalQuizPoints = user.quizAttempts.reduce(
//         (total, attempt) => total + attempt.score,
//         0
//       );

//       const totalChapterQuizPoints = user.chapterQuizAttempts.reduce(
//         (total, attempt) => total + attempt.score,
//         0
//       );

//       // Points for completed courses
//       const completedCourses = user.userProgress.filter(
//         (progress) => progress.isCompleted
//       );
//       const coursePoints = completedCourses.length * 100; // 100 points per completed course

//       const totalPoints = totalQuizPoints + totalChapterQuizPoints + coursePoints;

//       // Determine level based on course completions
//       const level = completedCourses.length; // Level is equal to number of courses completed

//       // Use the name from the profile if it exists, otherwise fall back to the user's name
//       const name = user.profile?.name || user.name;

//       return {
//         id: user.id,
//         name,
//         level,
//         points: totalPoints,
//       };
//     });

//     // Sort by points in descending order
//     leaderboardData.sort((a, b) => b.points - a.points);

//     return NextResponse.json(leaderboardData);
//   } catch (error) {
//     console.error('Error fetching leaderboard data:', error);
//     return NextResponse.json(
//       { message: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }








// // pages/api/leaderboard.ts
// import { NextApiRequest, NextApiResponse } from 'next';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'GET') {
//     return res.status(405).json({ message: 'Method not allowed' });
//   }

//   try {
//     // Fetch all users with their course enrollment status and points
//     const users = await prisma.user.findMany({
//       select: {
//         id: true,
//         name: true,
//         points: true,
//         level: true,
//         purchases: {
//           select: {
//             course: {
//               select: {
//                 id: true,
//                 title: true
//               }
//             }
//           }
//         }
//       },
//       orderBy: {
//         points: 'desc'
//       }
//     });

//     // Transform the data
//     const leaderboardData = users.map(user => ({
//       id: user.id,
//       name: user.name || 'Anonymous',
//       points: user.points,
//       level: user.level,
//       enrolledCourses: user.purchases.length,
//       courseTitles: user.purchases.map(p => p.course.title)
//     }));

//     res.status(200).json(leaderboardData);
//   } catch (error) {
//     console.error('Error fetching leaderboard:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   } finally {
//     await prisma.$disconnect();
//   }
// }




// app/api/leaderboard/route.ts
// import { NextResponse } from 'next/server';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export async function GET() {
//   try {
//     // Fetch all users with relevant fields
//     const users = await prisma.user.findMany({
//       select: {
//         id: true,
//         name: true,
//         points: true,
//         level: true,
//         purchases: {
//           select: {
//             course: {
//               select: {
//                 id: true,
//                 title: true,
//               },
//             },
//           },
//         },
//       },
//       orderBy: {
//         points: 'desc',
//       },
//     });

//     console.log('Fetched users:', users); // Debugging log

//     if (!users || users.length === 0) {
//       return NextResponse.json(
//         { message: 'No users found in the database' },
//         { status: 404 }
//       );
//     }

//     // Transform the data
//     const leaderboardData = users.map((user) => ({
//       id: user.id,
//       name: user.name || 'Anonymous', // Fallback if name is null
//       points: user.points ?? 0, // Fallback if points is null
//       level: user.level ?? 1, // Fallback if level is null
//       enrolledCourses: user.purchases.length,
//       courseTitles: user.purchases.map((p) => p.course.title),
//     }));

//     return NextResponse.json(leaderboardData, { status: 200 });
//   } catch (error: unknown) {
//     // Type the error as unknown and narrow it
//     console.error('Error fetching leaderboard:', error);

//     // Safely handle the error message
//     let errorMessage = 'Unknown error occurred';
//     if (error instanceof Error) {
//       errorMessage = error.message;
//     }

//     return NextResponse.json(
//       { message: 'Internal server error', error: errorMessage },
//       { status: 500 }
//     );
//   } finally {
//     await prisma.$disconnect();
//   }
// }







// import { NextResponse } from 'next/server';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export async function GET() {
//   try {
//     // Fetch all users with relevant fields
//     const users = await prisma.user.findMany({
//       select: {
//         id: true,
//         name: true,
//         points: true,
//         level: true,
//         purchases: {
//           select: {
//             course: {
//               select: {
//                 id: true,
//                 title: true,
//               },
//             },
//           },
//         },
//       },
//       orderBy: {
//         points: 'desc',
//       },
//     });

//     console.log('Fetched users:', users); // Debugging log

//     if (!users || users.length === 0) {
//       return NextResponse.json(
//         { message: 'No users found in the database' },
//         { status: 404 }
//       );
//     }

//     // For each user, fetch scores from ChapterQuizAttempt, QuizAttempt, and QuizResult
//     const leaderboardData = await Promise.all(
//       users.map(async (user) => {
//         const chapterQuizAttempts = await prisma.chapterQuizAttempt.findMany({
//           where: { studentId: user.id },
//           select: { score: true },
//         });

//         const quizAttempts = await prisma.quizAttempt.findMany({
//           where: { studentId: user.id },
//           select: { score: true },
//         });

//         const quizResults = await prisma.quizResult.findMany({
//           where: { studentId: user.id },
//           select: { score: true },
//         });

//         // Sum up all scores
//         const totalChapterQuizScore = chapterQuizAttempts.reduce((acc, cur) => acc + cur.score, 0);
//         const totalQuizAttemptScore = quizAttempts.reduce((acc, cur) => acc + cur.score, 0);
//         const totalQuizResultScore = quizResults.reduce((acc, cur) => acc + cur.score, 0);

//         const totalScore =
//           (user.points ?? 0) + totalChapterQuizScore + totalQuizAttemptScore + totalQuizResultScore;

//         return {
//           id: user.id,
//           name: user.name || 'Anonymous',
//           points: user.points ?? 0,
//           level: user.level ?? 1,
//           enrolledCourses: user.purchases.length,
//           courseTitles: user.purchases.map((p) => p.course.title),
//           totalScore, // Add total score to leaderboard
//         };
//       })
//     );

//     return NextResponse.json(leaderboardData, { status: 200 });
//   } catch (error: unknown) {
//     console.error('Error fetching leaderboard:', error);

//     let errorMessage = 'Unknown error occurred';
//     if (error instanceof Error) {
//       errorMessage = error.message;
//     }

//     return NextResponse.json(
//       { message: 'Internal server error', error: errorMessage },
//       { status: 500 }
//     );
//   } finally {
//     await prisma.$disconnect();
//   }
// }







import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    console.log('Starting leaderboard fetch');
    
    // Fetch all users with relevant fields
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        points: true, // Keep this for reference, but we'll override with totalScore
        level: true,
        purchases: {
          select: {
            course: {
              select: {
                id: true,
                title: true,
              },
            },
          },
        },
      },
      orderBy: {
        points: 'desc', // Optional: you might want to order by totalScore later
      },
    });

    console.log('Fetched raw users:', users);

    if (!users || users.length === 0) {
      return NextResponse.json(
        { message: 'No users found in the database' },
        { status: 404 }
      );
    }

    // Calculate total scores for each user
    const leaderboardData = await Promise.all(
      users.map(async (user) => {
        const chapterQuizAttempts = await prisma.chapterQuizAttempt.findMany({
          where: { studentId: user.id },
          select: { score: true },
        });

        const quizAttempts = await prisma.quizAttempt.findMany({
          where: { studentId: user.id },
          select: { score: true },
        });

        const quizResults = await prisma.quizResult.findMany({
          where: { studentId: user.id },
          select: { score: true },
        });

        // Sum up all scores
        const totalChapterQuizScore = chapterQuizAttempts.reduce((acc, cur) => acc + (cur.score || 0), 0);
        const totalQuizAttemptScore = quizAttempts.reduce((acc, cur) => acc + (cur.score || 0), 0);
        const totalQuizResultScore = quizResults.reduce((acc, cur) => acc + (cur.score || 0), 0);

        const totalScore = (user.points || 0) + totalChapterQuizScore + totalQuizAttemptScore + totalQuizResultScore;

        console.log('Calculated scores for user', user.id, {
          chapter: totalChapterQuizScore,
          quiz: totalQuizAttemptScore,
          result: totalQuizResultScore,
          total: totalScore,
        });

        return {
          id: user.id,
          name: user.name || 'Anonymous',
          totalScore: totalScore, // Use totalScore instead of points
          level: user.level ?? 1,
          enrolledCourses: user.purchases.length,
          courseTitles: user.purchases.map((p) => p.course.title),
        };
      })
    );

    // Sort by totalScore for final ordering
    leaderboardData.sort((a, b) => b.totalScore - a.totalScore);

    console.log('Final leaderboard data:', leaderboardData);
    return NextResponse.json(leaderboardData, { status: 200 });
  } catch (error: unknown) {
    console.error('Error fetching leaderboard:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    });

    let errorMessage = 'Internal server error';
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json(
      { message: errorMessage },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}