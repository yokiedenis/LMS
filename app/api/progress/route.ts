import { NextResponse } from "next/server";
import { getProgress } from "@/actions/get-progress";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export async function GET(request: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const url = new URL(request.url);
    const courseId = url.searchParams.get("courseId");

    if (!courseId) {
      return NextResponse.json({ error: "Course ID is required" }, { status: 400 });
    }

    // Fetch progress using the existing getProgress function
    const progress = await getProgress(userId, courseId);

    // Fetch total and completed chapters
    const totalChapters = await db.chapter.count({
      where: { courseId, isPublished: true },
    });

    const publishedChapters = await db.chapter.findMany({
      where: { courseId, isPublished: true },
      select: { id: true },
    });
    const publishedChapterIds = publishedChapters.map((chapter) => chapter.id);

    const completedChapters = await db.userProgress.count({
      where: {
        userId,
        chapterId: { in: publishedChapterIds },
        isCompleted: true,
      },
    });

    return NextResponse.json({
      completionPercentage: progress || 0,
      totalChapters,
      completedChapters,
    });
  } catch (error) {
    console.error("[API_PROGRESS]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}