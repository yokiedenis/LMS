import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";

export async function GET(request: NextRequest, { params }: { params: { courseId: string; quizId: string } }) {
  const { courseId, quizId } = params;

  const { userId } = getAuth(request);

  if (!userId) {
    return NextResponse.json({ message: "User not authenticated" }, { status: 401 });
  }

  try {
    // Fetch the quiz attempt results for the specific student
    const quizAttempt = await prisma.quizAttempt.findFirst({
      where: {
        quizId,
        studentId: userId,
      },
      select: {
        score: true,
        totalQuestions: true,
      },
    });

    if (!quizAttempt) {
      return NextResponse.json({ message: "No results found for this student" }, { status: 404 });
    }

    // Return the quiz attempt results
    return NextResponse.json(quizAttempt, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch quiz results:", error);
    return NextResponse.json({ message: "Failed to fetch quiz results" }, { status: 500 });
  }
}
