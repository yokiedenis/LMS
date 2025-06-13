// import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma";

// export async function POST(
//   request: Request,
//   { params }: { params: { courseId: string; chapterId: string } }
// ) {
//   const { courseId, chapterId } = params;
//   const userId = request.headers.get("user-id"); // Assuming user-id is passed in headers

//   try {
//     if (!userId) {
//       return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
//     }

//     // Delete all existing attempts for this user and chapter to reset them
//     await prisma.chapterQuizAttempt.deleteMany({
//       where: {
//         chapterQuizId: chapterId,
//         studentId: userId,
//       },
//     });

//     return NextResponse.json({ message: "Attempts reset successfully" }, { status: 200 });
//   } catch (error) {
//     console.error("Error resetting attempts:", error);
//     return NextResponse.json(
//       { error: "Failed to reset attempts" },
//       { status: 500 }
//     );
//   }
// }



// import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma";

// export async function POST(
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

//     // Delete all existing attempts for this user and chapter quiz
//     const deleteResult = await prisma.chapterQuizAttempt.deleteMany({
//       where: {
//         chapterQuizId: chapterQuiz.id,
//         studentId: userId,
//       },
//     });

//     // Also reset the user's progress if needed (optional)
//     await prisma.userProgress.updateMany({
//       where: {
//         userId: userId,
//         chapterId: chapterId,
//       },
//       data: {
//         isCompleted: false,
//       },
//     });

//     return NextResponse.json(
//       { 
//         message: "Attempts reset successfully",
//         attempts: 0,
//         maxAttempts: 3 // Return the max attempts so frontend can update
//       }, 
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error resetting attempts:", error);
//     return NextResponse.json(
//       { error: "Failed to reset attempts" },
//       { status: 500 }
//     );
//   }
// }






import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(
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
        chapterId: chapterId,
        courseId: courseId,
      },
    });

    if (!chapterQuiz) {
      return NextResponse.json({ error: "Chapter quiz not found" }, { status: 404 });
    }

    // Delete all existing attempts for this user and chapter quiz
    const deleteResult = await prisma.chapterQuizAttempt.deleteMany({
      where: {
        chapterQuizId: chapterQuiz.id,
        studentId: userId,
      },
    });

    console.log(`Deleted ${deleteResult.count} attempts for user ${userId} on quiz ${chapterQuiz.id}`);

    // Reset the user's progress (optional)
    await prisma.userProgress.updateMany({
      where: {
        userId: userId,
        chapterId: chapterId,
      },
      data: {
        isCompleted: false,
      },
    });

    return NextResponse.json(
      {
        message: "Attempts reset successfully",
        attempts: 0, // Indicate that attempts are now 0
        maxAttempts: 3, // Confirm max attempts
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error resetting attempts:", error);
    return NextResponse.json(
      { error: "Failed to reset attempts" },
      { status: 500 }
    );
  }
}