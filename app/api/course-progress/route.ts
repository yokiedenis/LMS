import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import db from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Fetch user purchases with course details and chapters
    const purchases = await db.purchase.findMany({
      where: { userId },
      include: {
        course: {
          include: {
            chapters: true,
            chapterQuizzes: true,
          },
        },
      },
    });

    // Fetch user progress for completed chapters
    const userProgress = await db.userProgress.findMany({
      where: { userId, isCompleted: true },
      select: {
        courseId: true,
        chapterId: true,
        isCompleted: true,
      },
    });

    // Fetch chapter quiz attempts
    const quizAttempts = await db.chapterQuizAttempt.findMany({
      where: { studentId: userId },
      select: {
        chapterQuizId: true,
        score: true,
        totalQuestions: true,
        chapterId: true,
      },
    });

    // Process each course to compute progress, score, and status
    const courseProgress = purchases.map((purchase) => {
      const course = purchase.course;
      if (!course) {
        return {
          courseId: purchase.courseId,
          courseTitle: "Unknown Course",
          progressPercentage: 0,
          overallScore: 0,
          status: "In progress",
        };
      }

      // Progress: Calculate based on completed chapters
      const totalChapters = course.chapters.length;
      const completedChapters = userProgress.filter(
        (progress) => progress.courseId === course.id
      ).length;
      const progressPercentage =
        totalChapters > 0 ? Math.round((completedChapters / totalChapters) * 100) : 0;

      // Overall Score: Average score from chapter quiz attempts
      const courseQuizAttempts = quizAttempts.filter((attempt) =>
        course.chapterQuizzes.some((quiz) => quiz.id === attempt.chapterQuizId)
      );
      const overallScore =
        courseQuizAttempts.length > 0
          ? Math.round(
              courseQuizAttempts.reduce(
                (sum, attempt) => sum + (attempt.score / attempt.totalQuestions) * 100,
                0
              ) / courseQuizAttempts.length
            )
          : 0;

      // Status: Completed if all chapters are done and at least one quiz has passing score
      const isCourseCompleted =
        completedChapters === totalChapters &&
        totalChapters > 0 &&
        courseQuizAttempts.some((attempt) => attempt.score / attempt.totalQuestions >= 0.7);

      return {
        courseId: course.id,
        courseTitle: course.title,
        progressPercentage,
        overallScore,
        status: isCourseCompleted ? "Completed" : "In progress",
      };
    });

    return NextResponse.json(courseProgress);
  } catch (error) {
    console.error("[COURSE_PROGRESS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}