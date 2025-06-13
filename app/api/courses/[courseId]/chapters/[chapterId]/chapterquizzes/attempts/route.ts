// import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma";

// export async function GET(
//   request: Request,
//   { params }: { params: { courseId: string; chapterId: string } }
// ) {
//   const { courseId, chapterId } = params;
//   const userId = request.headers.get("user-id");

//   try {
//     if (!userId) {
//       return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
//     }

//     // First, find the chapter quiz
//     const chapterQuiz = await prisma.chapterQuiz.findFirst({
//       where: {
//         chapterId: chapterId,
//         courseId: courseId,
//       },
//     });

//     if (!chapterQuiz) {
//       return NextResponse.json({ error: "Chapter quiz not found" }, { status: 404 });
//     }

//     // Count attempts for this user and chapter quiz
//     const attempts = await prisma.chapterQuizAttempt.count({
//       where: {
//         chapterQuizId: chapterQuiz.id,
//         studentId: userId,
//       },
//     });

//     return NextResponse.json(
//       { 
//         attempts,
//         maxAttempts: 3 // You could make this configurable per quiz if needed
//       }, 
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error fetching attempts:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch attempts" },
//       { status: 500 }
//     );
//   }
// }




import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  const { courseId, chapterId } = params;
  const userId = request.headers.get("user-id");

  try {
    if (!userId) {
      return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
    }

    // Find the chapter quiz
    const chapterQuiz = await prisma.chapterQuiz.findFirst({
      where: {
        chapterId,
        courseId,
      },
    });

    if (!chapterQuiz) {
      return NextResponse.json({ error: "Chapter quiz not found" }, { status: 404 });
    }

    // Count attempts for this user and chapter quiz
    const attempts = await prisma.chapterQuizAttempt.count({
      where: {
        chapterQuizId: chapterQuiz.id,
        studentId: userId,
      },
    });

    return NextResponse.json(
      {
        attempts,
        maxAttempts: 3, // Configurable max attempts
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching attempts:", error);
    return NextResponse.json(
      { error: "Failed to fetch attempts" },
      { status: 500 }
    );
  }
}

// Ensure the route is not treated as a page for static generation
export const dynamic = "force-dynamic";