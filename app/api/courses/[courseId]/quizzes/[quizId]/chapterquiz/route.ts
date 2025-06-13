import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request, { params }: { params: { courseId: string; quizId: string } }) {
  const { courseId, quizId } = params;

  // Log the received parameters for debugging
  console.log("Received courseId:", courseId);
  console.log("Received quizId:", quizId);

  // Check if courseId or quizId are missing and return a 400 error if so
  if (!courseId || !quizId) {
    return NextResponse.json(
      { message: "Course ID and Quiz ID are required" },
      { status: 400 }
    );
  }

  try {
    console.log("Fetching quiz with ID:", quizId);

    // Fetch the quiz from the database
    const quiz = await prisma.chapterQuiz.findUnique({
      where: { id: quizId },
      include: {
        questions: {
          include: {
            chapterOptions: true,
          },
        },
      },
    });

    // If the quiz is not found, return a 404 error
    if (!quiz) {
      console.error("Quiz not found:", quizId);
      return NextResponse.json({ message: "Quiz not found" }, { status: 404 });
    }

    // If the quiz is found, return it with a 200 status
    return NextResponse.json(quiz, { status: 200 });
  } catch (error) {
    // Log the error and return a 500 status in case of failure
    console.error("Failed to fetch quiz:", error);
    return NextResponse.json({ message: "Failed to fetch quiz" }, { status: 500 });
  }
}
