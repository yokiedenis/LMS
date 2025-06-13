// import { NextResponse, NextRequest } from "next/server";
// import prisma from "@/lib/prisma";
// import { getAuth } from "@clerk/nextjs/server";

// export async function GET(
//   request: NextRequest,
//   { params }: { params: { courseId: string; chapterQuizId: string } }
// ) {
//   const { courseId, chapterQuizId } = params;

//   const { userId } = getAuth(request);

//   if (!userId) {
//     return NextResponse.json(
//       { message: "User not authenticated" },
//       { status: 401 }
//     );
//   }

//   try {
//     // Fetch the quiz attempt results for the specific student and chapterQuizId
//     const quizAttempt = await prisma.chapterQuizAttempt.findFirst({
//       where: {
//         chapterQuizId,
//         studentId: userId,
//       },
//       select: {
//         score: true,
//         totalQuestions: true,
//         answers: true, // Optionally include submitted answers if needed
//       },
//     });

//     if (!quizAttempt) {
//       return NextResponse.json(
//         { message: "No results found for this student" },
//         { status: 404 }
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
//   { params }: { params: { courseId: string; chapterQuizId: string } }
// ) {
//   const { courseId, chapterQuizId } = params;

//   const { userId } = getAuth(request);

//   if (!userId) {
//     return NextResponse.json(
//       { message: "User not authenticated" },
//       { status: 401 }
//     );
//   }

//   try {
//     // Fetch the quiz attempt results for the specific student and chapterQuizId
//     const quizAttempt = await prisma.chapterQuizAttempt.findFirst({
//       where: {
//         chapterQuizId,
//         studentId: userId,
//       },
//       select: {
//         score: true,
//         totalQuestions: true,
//         answers: true, // Optionally include submitted answers if needed
//       },
//     });

//     // If no quiz attempt exists, return a default result instead of 404
//     if (!quizAttempt) {
//       return NextResponse.json(
//         {
//           score: 0,
//           totalQuestions: 0,
//           answers: [], // Or null, depending on your schema
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
  { params }: { params: { courseId: string; chapterId: string } } // Changed to chapterId
) {
  const { courseId, chapterId } = params;

  const { userId } = getAuth(request);

  if (!userId) {
    return NextResponse.json(
      { message: "User not authenticated" },
      { status: 401 }
    );
  }

  try {
    // Fetch the ChapterQuiz associated with this chapterId to get chapterQuizId
    const chapterQuiz = await prisma.chapterQuiz.findUnique({
      where: { chapterId },
      select: { id: true },
    });

    if (!chapterQuiz) {
      return NextResponse.json(
        {
          score: 0,
          totalQuestions: 0,
          answers: [],
          message: "No quiz found for this chapter",
        },
        { status: 200 }
      );
    }

    const chapterQuizId = chapterQuiz.id;

    // Fetch the quiz attempt results for the specific student and chapterQuizId
    const quizAttempt = await prisma.chapterQuizAttempt.findFirst({
      where: {
        chapterQuizId,
        studentId: userId,
      },
      select: {
        score: true,
        totalQuestions: true,
        answers: true, // Optionally include submitted answers if needed
      },
    });

    // If no quiz attempt exists, return a default result
    if (!quizAttempt) {
      return NextResponse.json(
        {
          score: 0,
          totalQuestions: 0,
          answers: [], // Or null, depending on your schema
          message: "No results found for this student",
        },
        { status: 200 }
      );
    }

    // Return the quiz attempt results
    return NextResponse.json(quizAttempt, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch quiz results:", error);
    return NextResponse.json(
      { message: "Failed to fetch quiz results" },
      { status: 500 }
    );
  }
}