import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  const { courseId, chapterId } = params;

  try {
    // Find the current chapter's position
    const currentChapter = await prisma.chapter.findUnique({
      where: { id: chapterId, courseId: courseId },
      select: { position: true },
    });

    if (!currentChapter) {
      return NextResponse.json({ error: "Chapter not found" }, { status: 404 });
    }

    // Find the next chapter by position
    const nextChapter = await prisma.chapter.findFirst({
      where: {
        courseId: courseId,
        position: { gt: currentChapter.position },
      },
      orderBy: { position: "asc" },
      select: { id: true },
    });

    return NextResponse.json({ nextChapterId: nextChapter?.id || null }, { status: 200 });
  } catch (error) {
    console.error("Error fetching next chapter:", error);
    return NextResponse.json(
      { error: "Failed to fetch next chapter" },
      { status: 500 }
    );
  }
}