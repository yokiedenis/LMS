// app/api/chapter-quizzes/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const courseIds = searchParams.get("courseIds")?.split(",") || [];

  if (!courseIds.length) return NextResponse.json({ error: "Missing courseIds" }, { status: 400 });

  try {
    const quizzes = await prisma.chapterQuiz.findMany({
      where: { courseId: { in: courseIds } },
      include: {
        course: { select: { title: true } },
        chapter: { select: { position: true } },
      },
    });
    return NextResponse.json(quizzes, { status: 200 });
  } catch (error) {
    console.error("Error fetching chapter quizzes:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}