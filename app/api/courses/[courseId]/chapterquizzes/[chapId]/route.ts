// // app/api/quizzes/[courseId]/[chapterId]/route.ts

// import { NextResponse } from 'next/server';
// import prisma from "@/lib/prisma";  // Correct import for Prisma client

// export async function GET(request: Request, { params }: { params: { courseId: string; chapterId: string } }) {
//   const { courseId, chapterId } = params;

//   // Fetch the quiz data from your database using Prisma client
//   const quiz = await prisma.chapterQuiz.findUnique({
//     where: {
//       // Use the correct composite unique constraint
//       courseId_chapterId: {
//         courseId,
//         chapterId
//       }
//     },
//     include: {
//       questions: true  // Include the related questions
//     }
//   });

//   if (!quiz) {
//     return NextResponse.json({ error: 'Quiz not found' }, { status: 404 });
//   }

//   return NextResponse.json({ questions: quiz.questions });
// }




import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function GET(
  request: Request,
  { params }: { params: { courseId: string; chapId: string } }
) {
  const { courseId, chapId } = params;

  try {
    // Fetch the quiz data using the quiz ID (chapId)
    const quiz = await prisma.chapterQuiz.findUnique({
      where: {
        id: chapId, // Use the quiz ID directly
      },
      include: {
        questions: {
          select: {
            id: true,
            questionText: true,
            chapterOptions: {
              select: {
                id: true,
                text: true,
                optionId: true,
              },
            },
            correctAnswer: true,
          },
        },
      },
    });

    if (!quiz) {
      return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
    }

    // Ensure the quiz belongs to the specified course
    if (quiz.courseId !== courseId) {
      return NextResponse.json(
        { error: "Quiz does not belong to this course" },
        { status: 403 }
      );
    }

    return NextResponse.json({
      id: quiz.id,
      title: quiz.title,
      questions: quiz.questions.map((q) => ({
        id: q.id,
        questionText: q.questionText,
        options: q.chapterOptions.map((opt) => ({
          id: opt.optionId, // Use optionId for consistency
          text: opt.text,
        })),
        correctAnswer: q.correctAnswer,
      })),
    }, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch quiz:", error);
    return NextResponse.json({ error: "Failed to fetch quiz" }, { status: 500 });
  }
}