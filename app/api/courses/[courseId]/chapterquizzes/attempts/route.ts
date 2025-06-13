// import { auth } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";
// import { db } from "@/lib/db";

// export async function GET(
//   req: Request,
//   { params }: { params: { courseId: string; chapterId: string } }
// ) {
//   try {
//     const { userId } = auth();

//     if (!userId) {
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     // Fetch the number of attempts for this user, course, and chapter
//     const attemptCount = await db.chapterQuizAttempt.count({
//       where: {
//         studentId: userId, // Filter by studentId
//         chapterQuiz: { // Nested filter through the Quiz relation
//           courseId: params.courseId, // Filter by courseId in Quiz
//           chapterId: params.chapterId, // Filter by chapterId in Quiz
//         },
//       },
//     });

//     return NextResponse.json({ attempts: attemptCount });
//   } catch (error) {
//     console.error("[GET_ATTEMPTS]", error);
//     return new NextResponse("Internal Error", { status: 500 });
//   }
// }

// export async function POST(
//   req: Request,
//   { params }: { params: { courseId: string; chapterId: string } }
// ) {
//   try {
//     const { userId } = auth();

//     if (!userId) {
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     // Find a quiz associated with this course and chapter (assuming one exists)
//     const quiz = await db.chapterQuiz.findFirst({
//       where: {
//         courseId: params.courseId,
//         chapterId: params.chapterId,
//       },
//     });

//     if (!quiz) {
//       return new NextResponse("No quiz found for this chapter", { status: 404 });
//     }

//     // Create a new attempt record
//     await db.chapterQuizAttempt.create({
//       data: {
//         studentId: userId,
//         chapterQuizId: quiz.id, // Use the found quiz's ID
//         score: 0, // Default score, update later if needed
//         totalQuestions: 0, // Default, update later if needed
//         answers: JSON.stringify([]), // Default empty answers
//       },
//     });

//     return new NextResponse("Attempt recorded", { status: 201 });
//   } catch (error) {
//     console.error("[POST_ATTEMPTS]", error);
//     return new NextResponse("Internal Error", { status: 500 });
//   }
// }






import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  const { courseId, chapterId } = params;
  const userId = request.headers.get("user-id"); // Assuming user-id is passed in headers

  try {
    if (!userId) {
      return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
    }

    const attempts = await prisma.chapterQuizAttempt.count({
      where: {
        chapterQuizId: chapterId,
        studentId: userId,
      },
    });

    return NextResponse.json({ attempts }, { status: 200 });
  } catch (error) {
    console.error("Error fetching attempts:", error);
    return NextResponse.json(
      { error: "Failed to fetch attempts" },
      { status: 500 }
    );
  }
}