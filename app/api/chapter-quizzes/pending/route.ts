// app/api/chapter-quizzes/pending/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  const courseIds = searchParams.get("courseIds")?.split(",") || [];

  if (!userId || !courseIds.length) {
    return NextResponse.json({ error: "Missing userId or courseIds" }, { status: 400 });
  }

  try {
    // Fetch all quizzes for the enrolled courses
    const allQuizzes = await prisma.chapterQuiz.findMany({
      where: { courseId: { in: courseIds } },
      include: {
        course: { select: { title: true } },
      },
    });

    // Fetch quiz attempts for the user
    const quizAttempts = await prisma.chapterQuizAttempt.findMany({
      where: { studentId: userId },
      select: { chapterQuizId: true },
    });
    const attemptedQuizIds = new Set(quizAttempts.map((attempt: any) => attempt.quizId));

    // Filter out quizzes that have been attempted
    const pendingQuizzes = allQuizzes.filter((quiz: any) => !attemptedQuizIds.has(quiz.id));

    return NextResponse.json(pendingQuizzes, { status: 200 });
  } catch (error) {
    console.error("Error fetching pending quizzes:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}