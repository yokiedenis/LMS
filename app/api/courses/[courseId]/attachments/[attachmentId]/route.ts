import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { isTeacher } from "@/lib/teacher";

export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string; attachmentId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: userId,
      },
    });

    if (!course) {
      return new NextResponse("Course Not Found", { status: 404 });
    }

    const attachment = await db.attachment.findUnique({
      where: {
        id: params.attachmentId, // Correct condition
      },
    });

    if (!attachment || attachment.courseId !== params.courseId) {
      return new NextResponse("Attachment Not Found", { status: 404 });
    }

    await db.attachment.delete({
      where: {
        id: params.attachmentId, // Deletion by the attachment ID
      },
    });

    return new NextResponse("Attachment Deleted", { status: 200 });
  } catch (error) {
    console.log("ATTACHMENT_ID", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
