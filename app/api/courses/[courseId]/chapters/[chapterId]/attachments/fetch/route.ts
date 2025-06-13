// api/courses/[courseId]/chapters/[chapterId]/attachments/route.ts

import { NextResponse } from 'next/server';
import { db } from "@/lib/db";

export async function GET(req: Request, { params }: { params: { chapterId: string } }) {
  const { chapterId } = params;

  try {
    const attachments = await db.chapterAttachment.findMany({
      where: {
        chapterId: chapterId,
      },
    });

    if (!attachments || attachments.length === 0) {
      return NextResponse.json({ message: 'No attachments found for this chapter' }, { status: 404 });
    }

    return NextResponse.json(attachments);
  } catch (error) {
    console.error('Error fetching chapter attachments:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}