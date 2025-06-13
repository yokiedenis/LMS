import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { isTeacher } from "@/lib/teacher";

export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string; attachmentId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Check if the user has access to the chapter within the course
    const chapter = await db.chapter.findUnique({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
        userId: userId,
      },
    });

    if (!chapter) {
      return new NextResponse("Chapter Not Found or Unauthorized", { status: 404 });
    }

    // Find the attachment related to the chapter
    const attachment = await db.chapterAttachment.findUnique({
      where: {
        id: params.attachmentId,
      },
    });

    if (!attachment || attachment.chapterId !== params.chapterId) {
      return new NextResponse("Attachment Not Found or Does Not Belong to This Chapter", { status: 404 });
    }

    // Delete the attachment
    await db.chapterAttachment.delete({
      where: {
        id: params.attachmentId,
      },
    });

    return new NextResponse("Attachment Deleted", { status: 200 });
  } catch (error) {
    console.log("CHAPTER_ATTACHMENT_ID", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}