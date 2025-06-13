import { NextResponse, NextRequest } from "next/server"; 
import prisma from "@/lib/prisma"; 
import { z } from "zod"; 
import { getAuth } from "@clerk/nextjs/server"; 

// Zod schema for validating the answer submission
const answerSchema = z.object({
  answers: z
    .array(
      z.object({
        questionId: z.string().min(1, "Question ID is required"),
        answer: z.string().min(1, "Answer is required"),
      })
    )
    .min(1, "At least one answer is required"),
});

// API route handler for submitting quiz answers
export async function POST(request: NextRequest, { params }: { params: { courseId: string; quizId: string } }) {
  const { quizId } = params;

  // Parse the request body
  const body = await request.json();

  // Validate the request body against the schema
  const result = answerSchema.safeParse(body);

  if (!result.success) {
    console.error("Validation errors:", result.error.errors);
    return NextResponse.json(
      { message: "Validation failed", errors: result.error.errors },
      { status: 400 }
    );
  }

  const { answers } = result.data;

  // Get user authentication details from the request
  const { userId } = getAuth(request); 

  // Check if the user is authenticated
  if (!userId) {
    return NextResponse.json(
      { message: "User not authenticated" },
      { status: 401 }
    );
  }

  try {
    // Fetch the quiz questions and their correct answers
    const quizQuestions = await prisma.question.findMany({
      where: { quizId },
      select: { id: true, correctAnswer: true },
    });

    console.log("quizQuestions:", quizQuestions);
    console.log("submitted answers:", answers);

    // Calculate score
    let score = 0;
    const totalQuestions = quizQuestions.length;

    // Create a mapping of correct answers for quick lookup
    const correctAnswersMap = Object.fromEntries(
      quizQuestions.map(question => [question.id, question.correctAnswer])
    );

    // Iterate through answers to calculate the score
    answers.forEach(answer => {
      const submittedAnswer = answer.answer.split('.')[0].trim(); // Extract the letter and trim any whitespace
      const correctAnswer = correctAnswersMap[answer.questionId];

      console.log(`Checking: Question ID: ${answer.questionId}, Submitted Answer: ${submittedAnswer}, Correct Answer: ${correctAnswer}`);

      // Compare the submitted answer with the correct answer
      if (correctAnswer && correctAnswer === submittedAnswer) {
        score++;
      }
    });

    // Check if the user has already submitted the quiz before
    const existingAttempt = await prisma.quizAttempt.findFirst({
      where: {
        quizId,
        studentId: userId,
      },
    });

    let quizAttempt;

    if (existingAttempt) {
      // If an attempt exists, update it
      quizAttempt = await prisma.quizAttempt.update({
        where: { id: existingAttempt.id },
        data: {
          score,
          totalQuestions,
          answers: JSON.stringify(answers), // Store the new answers
        },
      });
    } else {
      // If no previous attempt exists, create a new one
      quizAttempt = await prisma.quizAttempt.create({
        data: {
          quizId,
          studentId: userId,
          score,
          totalQuestions,
          answers: JSON.stringify(answers),
        },
      });
    }

    // Return the results with status 201 (Created)
    return NextResponse.json(
      {
        score,
        totalQuestions,
        attemptId: quizAttempt.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to submit answers:", error);
    const errorMessage = (error instanceof Error) ? error.message : "Failed to submit answers";

    return NextResponse.json(
      { message: errorMessage },
      { status: 500 }
    );
  }
}
