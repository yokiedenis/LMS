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



// import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma"; // Correct import for Prisma client

// export async function GET(
//   request: Request,
//   { params }: { params: { courseId: string; chapterId: string } }
// ) {
//   const { courseId, chapterId } = params;

//   try {
//     // Fetch the quiz with related questions and options
//     const quiz = await prisma.chapterQuiz.findUnique({
//       where: {
//         courseId_chapterId: {
//           courseId,
//           chapterId,
//         },
//       },
//       include: {
//         questions: {
//           include: {
//             chapterOptions: true, // Fetch related options
//           },
//         },
//       },
//     });

//     // If no quiz is found, return a 404 response
//     if (!quiz) {
//       return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
//     }

//     // Map the questions to include options in a proper format
//     const formattedQuestions = quiz.questions.map((question) => ({
//       id: question.id,
//       questionText: question.questionText,
//       correctAnswer: question.correctAnswer,
//       options: question.chapterOptions.map((option) => ({
//         id: option.id,
//         text: option.text,
//       })),
//     }));

//     return NextResponse.json({ questions: formattedQuestions });
//   } catch (error) {
//     console.error("Error fetching quiz:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch quiz data" },
//       { status: 500 }
//     );
//   }
// }





import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { z } from "zod";

// Zod schema for validating the quiz creation request
const quizSchema = z.object({
  title: z.string().min(1, "ChapterQuiz title is required"),
  chapterId: z.string().min(1, "Chapter ID is required"), // Validate chapterId
  questions: z
    .array(
      z.object({
        text: z.string().min(1, "Chapter Question text is required"),
        options: z.array(z.string()).min(4, "At least four Chapter options are required"),
        correctAnswer: z.string().min(1, "Chapter Correct answer is required"),
      })
    )
    .min(1, "At least one question is required"),
});

// API route handler for chapter quizzes
export async function POST(request: Request, { params }: { params: { courseId: string } }) {
  const { courseId } = params;

  // Parse the request body
  let body;
  try {
    body = await request.json();
  } catch (error) {
    return NextResponse.json(
      { message: "Invalid JSON in request body" },
      { status: 400 }
    );
  }

  // Validate the request body against the schema
  const result = quizSchema.safeParse(body);

  if (!result.success) {
    // Log the validation errors to the console for debugging
    console.error("Validation failed:", result.error.errors);
    return NextResponse.json(
      { message: "Validation failed", errors: result.error.errors },
      { status: 400 }
    );
  }

  const { title, chapterId, questions } = result.data;

  try {
    // Create the chapter quiz and its associated questions
    const chapterQuiz = await prisma.chapterQuiz.create({
      data: {
        title,
        courseId, // Associate with the course
        chapterId, // Associate with the chapter
        questions: {
          create: questions.map((question) => ({
            questionText: question.text,
            correctAnswer: question.correctAnswer,
            chapterOptions: {
              create: question.options.map((option) => ({
                text: option,
                isCorrect: option === question.correctAnswer, // Flag for the correct option
                optionId: undefined, // Prisma will auto-generate this due to the schema's default value
              })),
            },
          })),
        },
      },
    });

    return NextResponse.json(chapterQuiz, { status: 201 });
  } catch (error: unknown) {
    // Handle errors properly
    if (error instanceof Error) {
      console.error("Error creating chapter quiz:", error.message); // Log the error message
      return NextResponse.json(
        { message: "Failed to create chapter quiz", error: error.message },
        { status: 500 }
      );
    } else {
      console.error("Unknown error:", error); // Log unknown errors
      return NextResponse.json(
        { message: "Failed to create chapter quiz", error: "An unknown error occurred" },
        { status: 500 }
      );
    }
  }
}
