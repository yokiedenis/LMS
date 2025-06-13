// app/api/chapter-quiz-attempts/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) return NextResponse.json({ error: "Missing userId" }, { status: 400 });

  try {
    const attempts = await prisma.chapterQuizAttempt.findMany({
      where: { studentId: userId },
      select: { id: true },
    });
    return NextResponse.json(attempts, { status: 200 });
  } catch (error) {
    console.error("Error fetching quiz attempts:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}