// api/quiz-attempts/route.ts
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import db from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const requestedUserId = searchParams.get("userId");

    if (requestedUserId !== userId) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    // Fetch quiz attempts for the user
    const quizAttempts = await db.quizAttempt.findMany({
      where: { studentId: userId },
      include: {
        quiz : true, // Include quiz details to get courseId
      },
    });

    return NextResponse.json(quizAttempts);
  } catch (error) {
    console.error("[QUIZ_ATTEMPTS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}