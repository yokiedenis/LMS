import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { chapterId: string } }
) {
  try {
    const { userId } = auth(); // Retrieve the userId from Clerk authentication
    const { url, name } = await req.json(); // Expect both URL and name in the request body

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Check if the user is the owner of the chapter
    const chapterOwner = await db.chapter.findUnique({
      where: {
        id: params.chapterId,
        userId: userId,
      },
    });

    if (!chapterOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Fetch the courseId associated with the chapter
    const chapter = await db.chapter.findUnique({
      where: { id: params.chapterId },
      select: { courseId: true }
    });

    if (!chapter) {
      return new NextResponse("Chapter not found", { status: 404 });
    }

    // Create a new attachment entry in the database with URL, name, chapterId, and courseId
    const attachment = await db.chapterAttachment.create({
      data: {
        url,
        name, // Store the original filename received from the client
        chapterId: params.chapterId,
       // courseId: chapter.courseId, // Assuming chapter has a courseId
      },
    });

    // Return the created attachment as a JSON response
    return NextResponse.json(attachment);

  } catch (error) {
    console.log("CHAPTER_ID_ATTACHMENTS", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}