// import { NextResponse, NextRequest } from "next/server";
// import prisma from "@/lib/prisma";
// import { getAuth } from "@clerk/nextjs/server";

// export async function GET(request: NextRequest, { params }: { params: { courseId: string; chapterQuizId: string } }) {
//   const { courseId, chapterQuizId } = params;

//   const { userId } = getAuth(request);

//   if (!userId) {
//     return NextResponse.json({ message: "User not authenticated" }, { status: 401 });
//   }

//   try {
//     // Fetch the quiz attempt results for the specific student
//     const quizAttempt = await prisma.chapterQuizAttempt.findFirst({
//       where: {
//         chapterQuizId,
//         studentId: userId,
//       },
//       select: {
//         score: true,
//         totalQuestions: true,
//       },
//     });

//     if (!quizAttempt) {
//       return NextResponse.json({ message: "No results found for this student" }, { status: 404 });
//     }

//     // Return the quiz attempt results
//     return NextResponse.json(quizAttempt, { status: 200 });
//   } catch (error) {
//     console.error("Failed to fetch quiz results:", error);
//     return NextResponse.json({ message: "Failed to fetch quiz results" }, { status: 500 });
//   }
// }




// import { NextResponse, NextRequest } from "next/server";
// import prisma from "@/lib/prisma";
// import { getAuth } from "@clerk/nextjs/server";

// export async function GET(request: NextRequest, { params }: { params: { courseId: string; chapterQuizId: string } }) {
//   const { courseId, chapterQuizId } = params;

//   const { userId } = getAuth(request);

//   if (!userId) {
//     return NextResponse.json({ message: "User not authenticated" }, { status: 401 });
//   }

//   try {
//     // Fetch the most recent quiz attempt results for the specific student and chapter quiz
//     const quizAttempt = await prisma.chapterQuizAttempt.findFirst({
//       where: {
//         chapterQuizId,
//         studentId: userId,
//       },
//       orderBy: {
//         createdAt: 'desc', // Order by creation time to get the latest attempt
//       },
//       select: {
//         score: true,
//         totalQuestions: true,
//       },
//     });

//     if (!quizAttempt) {
//       return NextResponse.json({ message: "No results found for this student" }, { status: 404 });
//     }

//     // Return the quiz attempt results
//     return NextResponse.json(quizAttempt, { status: 200 });
//   } catch (error) {
//     console.error("Failed to fetch quiz results:", error);
//     return NextResponse.json({ message: "Failed to fetch quiz results" }, { status: 500 });
//   }
// }







// import { NextResponse, NextRequest } from "next/server";
// import prisma from "@/lib/prisma";
// import { getAuth } from "@clerk/nextjs/server";

// export async function GET(request: NextRequest, { params }: { params: { courseId: string; chapterId: string } }) {
//   const { courseId, chapterId } = params;

//   const { userId } = getAuth(request);

//   if (!userId) {
//     return NextResponse.json({ message: "User not authenticated" }, { status: 401 });
//   }

//   try {
//     // Fetch the most recent quiz attempt results for the specific student and chapter quiz
//     const quizAttempt = await prisma.chapterQuizAttempt.findFirst({
//       where: {
//         chapterId,
//         studentId: userId,
//       },
//       orderBy: {
//         createdAt: 'desc', // Order by creation time to get the latest attempt
//       },
//       select: {
//         score: true,
//         totalQuestions: true,
//       },
//     });

//     if (!quizAttempt) {
//       return NextResponse.json({ message: "No results found for this student" }, { status: 404 });
//     }

//     // Return the quiz attempt results
//     return NextResponse.json(quizAttempt, { status: 200 });
//   } catch (error) {
//     console.error("Failed to fetch quiz results:", error);
//     return NextResponse.json({ message: "Failed to fetch quiz results" }, { status: 500 });
//   }
// }







// import { NextResponse, NextRequest } from "next/server";
// import prisma from "@/lib/prisma";
// import { getAuth } from "@clerk/nextjs/server";

// export async function GET(
//   request: NextRequest,
//   { params }: { params: { courseId: string; chapterId: string } }
// ) {
//   const { courseId, chapterId } = params;

//   const { userId } = getAuth(request);

//   if (!userId) {
//     return NextResponse.json({ message: "User not authenticated" }, { status: 401 });
//   }

//   try {
//     // Fetch the ChapterQuiz associated with this chapterId to get chapterQuizId
//     const chapterQuiz = await prisma.chapterQuiz.findUnique({
//       where: { chapterId },
//       select: { id: true },
//     });

//     // If no ChapterQuiz exists, return default values
//     if (!chapterQuiz) {
//       return NextResponse.json(
//         {
//           score: 0,
//           totalQuestions: 0,
//           message: "No quiz found for this chapter",
//         },
//         { status: 200 }
//       );
//     }

//     const chapterQuizId = chapterQuiz.id;

//     // Fetch the most recent quiz attempt results for the specific student and chapterQuizId
//     const quizAttempt = await prisma.chapterQuizAttempt.findFirst({
//       where: {
//         chapterQuizId, // Use chapterQuizId instead of chapterId for consistency
//         studentId: userId,
//       },
//       orderBy: {
//         createdAt: "desc", // Order by creation time to get the latest attempt
//       },
//       select: {
//         score: true,
//         totalQuestions: true,
//       },
//     });

//     // If no quiz attempt exists, return default values instead of 404
//     if (!quizAttempt) {
//       return NextResponse.json(
//         {
//           score: 0,
//           totalQuestions: 0,
//           message: "No results found for this student",
//         },
//         { status: 200 }
//       );
//     }

//     // Return the quiz attempt results
//     return NextResponse.json(quizAttempt, { status: 200 });
//   } catch (error) {
//     console.error("Failed to fetch quiz results:", error);
//     return NextResponse.json(
//       { message: "Failed to fetch quiz results" },
//       { status: 500 }
//     );
//   }
// }





// import { NextResponse, NextRequest } from "next/server";
// import prisma from "@/lib/prisma";
// import { getAuth } from "@clerk/nextjs/server";

// export async function GET(
//   request: NextRequest,
//   { params }: { params: { courseId: string; chapterId: string } }
// ) {
//   const { courseId, chapterId } = params;

//   const { userId } = getAuth(request);

//   if (!userId) {
//     return NextResponse.json({ message: "User not authenticated" }, { status: 401 });
//   }

//   try {
//     // Fetch the ChapterQuiz associated with this chapterId to get chapterQuizId
//     const chapterQuiz = await prisma.chapterQuiz.findFirst({
//       where: { 
//         courseId,
//         chapterId 
//       },
//       select: { id: true },
//     });

//     // If no ChapterQuiz exists, return default values
//     if (!chapterQuiz) {
//       return NextResponse.json(
//         {
//           score: 0,
//           totalQuestions: 0,
//           message: "No quiz found for this chapter",
//         },
//         { status: 200 }
//       );
//     }

//     const chapterQuizId = chapterQuiz.id;

//     // Fetch the most recent quiz attempt results for the specific student and chapterQuizId
//     const quizAttempt = await prisma.chapterQuizAttempt.findFirst({
//       where: {
//         chapterQuizId,
//         studentId: userId,
//       },
//       orderBy: {
//         createdAt: "desc",
//       },
//       select: {
//         score: true,
//         totalQuestions: true,
//       },
//     });

//     // If no quiz attempt exists, return default values instead of 404
//     if (!quizAttempt) {
//       return NextResponse.json(
//         {
//           score: 0,
//           totalQuestions: 0,
//           message: "No results found for this student",
//         },
//         { status: 200 }
//       );
//     }

//     // Return the quiz attempt results
//     return NextResponse.json(quizAttempt, { status: 200 });
//   } catch (error) {
//     console.error("Failed to fetch quiz results:", error);
//     return NextResponse.json(
//       { message: "Failed to fetch quiz results" },
//       { status: 500 }
//     );
//   }
// }





// import { NextResponse, NextRequest } from "next/server";
// import prisma from "@/lib/prisma";
// import { getAuth } from "@clerk/nextjs/server";

// export async function GET(
//   request: NextRequest,
//   { params }: { params: { courseId: string; chapterId: string } }
// ) {
//   const { courseId, chapterId } = params;

//   const { userId } = getAuth(request);

//   if (!userId) {
//     return NextResponse.json({ message: "User not authenticated" }, { status: 401 });
//   }

//   try {
//     // Fetch the ChapterQuiz associated with this chapterId to get chapterQuizId
//     const chapterQuiz = await prisma.chapterQuiz.findUnique({
//       where: { chapterId },
//       select: { id: true },
//     });

//     // If no ChapterQuiz exists, return default values
//     if (!chapterQuiz) {
//       return NextResponse.json(
//         {
//           score: 0,
//           totalQuestions: 0,
//           message: "No quiz found for this chapter",
//         },
//         { status: 200 }
//       );
//     }

//     const chapterQuizId = chapterQuiz.id;

//     // Fetch the most recent quiz attempt results for the specific student and chapterQuizId
//     const quizAttempt = await prisma.chapterQuizAttempt.findFirst({
//       where: {
//         chapterQuizId, // Use chapterQuizId instead of chapterId for consistency
//         studentId: userId,
//       },
//       orderBy: {
//         createdAt: "desc", // Order by creation time to get the latest attempt
//       },
//       select: {
//         score: true,
//         totalQuestions: true,
//       },
//     });

//     // If no quiz attempt exists, return default values instead of 404
//     if (!quizAttempt) {
//       return NextResponse.json(
//         {
//           score: 0,
//           totalQuestions: 0,
//           message: "No results found for this student",
//         },
//         { status: 200 }
//       );
//     }

//     // Return the quiz attempt results
//     return NextResponse.json(quizAttempt, { status: 200 });
//   } catch (error) {
//     console.error("Failed to fetch quiz results:", error);
//     return NextResponse.json(
//       { message: "Failed to fetch quiz results" },
//       { status: 500 }
//     );
//   }
// }






import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  const { courseId, chapterId } = params;

  const { userId } = getAuth(request);

  if (!userId) {
    return NextResponse.json({ message: "User not authenticated" }, { status: 401 });
  }

  try {
    // Fetch the ChapterQuiz associated with this chapterId to get chapterQuizId
    const chapterQuiz = await prisma.chapterQuiz.findUnique({
      where: { chapterId },
      select: { id: true },
    });

    // If no ChapterQuiz exists, return default values
    if (!chapterQuiz) {
      console.log(`No chapter quiz found for chapterId: ${chapterId}`);
      return NextResponse.json(
        {
          score: 0,
          totalQuestions: 0,
          message: "No quiz found for this chapter",
        },
        { status: 200 }
      );
    }

    const chapterQuizId = chapterQuiz.id;

    // Fetch the most recent quiz attempt results for the specific student and chapterQuizId
    const quizAttempt = await prisma.chapterQuizAttempt.findFirst({
      where: {
        chapterQuizId,
        studentId: userId,
      },
      orderBy: {
        createdAt: "desc", // Order by creation time to get the latest attempt
      },
      select: {
        score: true,
        totalQuestions: true,
        createdAt: true, // Include for debugging
      },
    });

    // If no quiz attempt exists, return default values
    if (!quizAttempt) {
      console.log(`No quiz attempt found for userId: ${userId}, chapterQuizId: ${chapterQuizId}`);
      return NextResponse.json(
        {
          score: 0,
          totalQuestions: 0,
          message: "No results found for this student",
        },
        { status: 200 }
      );
    }

    console.log(`Quiz attempt found: score=${quizAttempt.score}, totalQuestions=${quizAttempt.totalQuestions}, createdAt=${quizAttempt.createdAt}`);

    // Return the quiz attempt results
    return NextResponse.json(
      {
        score: quizAttempt.score,
        totalQuestions: quizAttempt.totalQuestions,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to fetch quiz results:", error);
    return NextResponse.json(
      { message: "Failed to fetch quiz results" },
      { status: 500 }
    );
  }
}