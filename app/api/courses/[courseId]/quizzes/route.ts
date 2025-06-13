import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { z } from "zod";

// Zod schema for validating the quiz creation request
const quizSchema = z.object({
  title: z.string().min(1, "Quiz title is required"),
  questions: z
    .array(
      z.object({
        text: z.string().min(1, "Question text is required"),
        options: z.array(z.string()).min(4, "At least four options are required"),
        correctAnswer: z.string().min(1, "Correct answer is required"),
      })
    )
    .min(1, "At least one question is required"),
});

// API route handler for quizzes
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

  const { title, questions } = result.data;

  try {
    // Create the quiz and its associated questions
    const quiz = await prisma.quiz.create({
      data: {
        title,
        courseId, // Associate with the course
        position: 0, // Default position value (modify if needed)
        questions: {
          create: questions.map((question) => ({
            questionText: question.text,
            correctAnswer: question.correctAnswer,
            options: {
              create: question.options.map((option) => ({
                text: option,
              })),
            },
          })),
        },
      },
    });

    return NextResponse.json(quiz, { status: 201 });
  } catch (error: unknown) {
    // Cast the error to an Error object for TypeScript type safety
    if (error instanceof Error) {
      console.error("Error creating quiz:", error.message); // Log the error message
      return NextResponse.json(
        { message: "Failed to create quiz", error: error.message },
        { status: 500 }
      );
    } else {
      console.error("Unknown error:", error); // Log unknown errors
      return NextResponse.json(
        { message: "Failed to create quiz", error: "An unknown error occurred" },
        { status: 500 }
      );
    }
  }
}
