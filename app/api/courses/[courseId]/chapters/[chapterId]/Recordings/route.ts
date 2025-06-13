// import { NextRequest, NextResponse } from "next/server";
// import { auth } from "@clerk/nextjs/server";
// import { db } from "@/lib/db";

// export async function GET(req: NextRequest, { params }: { params: { courseId: string; chapterId: string } }) {
//   try {
//     const authData = auth();
//     const userId = authData?.userId;

//     if (!userId) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const { courseId, chapterId } = params;

//     if (!courseId || courseId === "default-course-id" || !chapterId || chapterId === "default-chapter-id") {
//       return NextResponse.json({ error: "Course ID and Chapter ID are required" }, { status: 400 });
//     }

//     // Verify the chapter exists and fetch its recordings
//     const chapter = await db.chapter.findUnique({
//       where: { id: chapterId, courseId: courseId },
//       include: { recordings: true },
//     });

//     if (!chapter) {
//       return NextResponse.json({ error: "Chapter not found" }, { status: 404 });
//     }

//     return NextResponse.json(chapter.recordings, { status: 200 });
//   } catch (error) {
//     console.error("Error fetching recordings:", error);
//     return NextResponse.json({ error: "Internal server error" }, { status: 500 });
//   }
// }



// import { NextRequest, NextResponse } from "next/server";
// import { db } from "@/lib/db";

// export async function GET(
//   req: NextRequest,
//   { params }: { params: { courseId: string; chapterId: string } }
// ) {
//   try {
//     const { courseId, chapterId } = params;

//     if (!courseId || !chapterId) {
//       return NextResponse.json(
//         { error: "Missing courseId or chapterId" },
//         { status: 400 }
//       );
//     }

//     const recordings = await db.recording.findMany({
//       where: { chapterId },
//       orderBy: { uploadedAt: "desc" },
//     });

//     return NextResponse.json(recordings);
//   } catch (error) {
//     console.error("Error fetching recordings:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch recordings" },
//       { status: 500 }
//     );
//   }
// }



import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const recordings = await db.recording.findMany({
      orderBy: { uploadedAt: "desc" }, // Fetch all recordings ordered by upload date
    });

    return NextResponse.json(recordings);
  } catch (error) {
    console.error("Error fetching recordings:", error);
    return NextResponse.json(
      { error: "Failed to fetch recordings" },
      { status: 500 }
    );
  }
}
