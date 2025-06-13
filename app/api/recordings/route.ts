import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const recordings = await db.recording.findMany({
      orderBy: { uploadedAt: "desc" },
    });

    console.log("Fetched recordings:", recordings); // Debugging log

    return NextResponse.json(recordings);
  } catch (error) {
    console.error("Error fetching recordings:", error);
    return NextResponse.json(
      { error: "Failed to fetch recordings" },
      { status: 500 }
    );
  }
}