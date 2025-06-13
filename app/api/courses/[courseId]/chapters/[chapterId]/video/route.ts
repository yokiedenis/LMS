import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  const { courseId, chapterId } = params;
  const userId = request.headers.get("user-id"); // Assuming user-id is passed in headers

  try {
    if (!userId) {
      return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
    }

    // Fetch the chapter and its googleDriveUrl
    const chapter = await prisma.chapter.findUnique({
      where: {
        id: chapterId,
        courseId: courseId,
      },
      select: {
        googleDriveUrl: true, // Fetch the googleDriveUrl field
      },
    });

    if (!chapter || !chapter.googleDriveUrl) {
      return NextResponse.json({ error: "Video URL not found for this chapter" }, { status: 404 });
    }

    return NextResponse.json({ googleDriveUrl: chapter.googleDriveUrl }, { status: 200 });
  } catch (error) {
    console.error("Error fetching video URL:", error);
    return NextResponse.json(
      { error: "Failed to fetch video URL" },
      { status: 500 }
    );
  }
}