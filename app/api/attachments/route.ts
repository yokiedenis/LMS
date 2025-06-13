import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db"; // Ensure correct import path

export async function GET(req: NextRequest) {
  try {
    console.log("[API] GET /api/attachments - Fetching all course and chapter attachments.");

    // Fetch all course attachments
    const courseAttachments = await db.attachment.findMany({
      include: {
        Course: true, // Fetch associated course details
      },
      orderBy: { createdAt: "desc" },
    });

    // Fetch all chapter attachments
    const chapterAttachments = await db.chapterAttachment.findMany({
      include: {
        Chapter: true, // Fetch associated chapter details
      },
      orderBy: { createdAt: "desc" },
    });

    console.log(`[API] Retrieved ${courseAttachments.length} course attachments.`);
    console.log(`[API] Retrieved ${chapterAttachments.length} chapter attachments.`);

    return NextResponse.json({
      success: true,
      courseAttachments,
      chapterAttachments,
    });
  } catch (error) {
    console.error("[API] Error fetching attachments:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch attachments" },
      { status: 500 }
    );
  }
}