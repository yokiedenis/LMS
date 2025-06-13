// import { NextRequest, NextResponse } from "next/server";
// import { auth } from "@clerk/nextjs/server";
// import { db } from "@/lib/db";

// export async function POST(req: NextRequest, { params }: { params: { courseId: string; chapterId: string } }) {
//   try {
//     const { userId } = await auth();

//     if (!userId) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const { courseId, chapterId } = params;
//     const body = await req.json();
//     const { title, url, duration } = body;

//     if (!courseId || !chapterId) {
//       return NextResponse.json({ error: "Course ID and Chapter ID are required" }, { status: 400 });
//     }

//     // Verify the chapter exists
//     const chapter = await db.chapter.findUnique({
//       where: { id: chapterId },
//     });

//     if (!chapter) {
//       return NextResponse.json({ error: "Chapter not found" }, { status: 404 });
//     }

//     // Create a new recording
//     const recording = await db.recording.create({
//       data: {
//         title,
//         url,
//         duration: duration ? parseInt(duration) : null,
//         chapterId,
//         isActive: true,
//       },
//     });

//     return NextResponse.json(recording, { status: 201 });
//   } catch (error) {
//     console.error("Error creating recording:", error);
//     return NextResponse.json({ error: "Internal server error" }, { status: 500 });
//   }
// }

// export async function PATCH(req: NextRequest, { params }: { params: { courseId: string; chapterId: string } }) {
//   try {
//     const { userId } = await auth();

//     if (!userId) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const { courseId, chapterId } = params;
//     const body = await req.json();
//     const { title, url, duration, recordingId } = body;

//     if (!courseId || !chapterId) {
//       return NextResponse.json({ error: "Course ID and Chapter ID are required" }, { status: 400 });
//     }

//     if (!recordingId) {
//       return NextResponse.json({ error: "Recording ID is required for updates" }, { status: 400 });
//     }

//     // Verify the chapter exists (optional)
//     const chapter = await db.chapter.findUnique({
//       where: { id: chapterId },
//     });

//     if (!chapter) {
//       return NextResponse.json({ error: "Chapter not found" }, { status: 404 });
//     }

//     // Update an existing recording
//     const updatedRecording = await db.recording.update({
//       where: { id: recordingId },
//       data: {
//         title,
//         url,
//         duration: duration ? parseInt(duration) : undefined,
//         isActive: true,
//         updatedAt: new Date(),
//       },
//     });

//     return NextResponse.json(updatedRecording, { status: 200 });
//   } catch (error) {
//     console.error("Error updating recording:", error);
//     return NextResponse.json({ error: "Internal server error" }, { status: 500 });
//   }
// }




import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { Recording } from "@prisma/client"; // Import Recording type for type safety

export async function POST(req: NextRequest, { params }: { params: { courseId: string; chapterId: string } }) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { courseId, chapterId } = params;
    const body = await req.json();
    const { title, url, duration } = body;

    if (!courseId || !chapterId) {
      return NextResponse.json({ error: "Course ID and Chapter ID are required" }, { status: 400 });
    }

    // Verify the chapter exists
    const chapter = await db.chapter.findUnique({
      where: { id: chapterId },
    });

    if (!chapter) {
      return NextResponse.json({ error: "Chapter not found" }, { status: 404 });
    }

    // Create a new recording
    const recording = await db.recording.create({
      data: {
        title,
        url,
        duration: duration ? parseInt(duration) : null,
        chapterId,
        isActive: true,
      },
    });

    return NextResponse.json(recording, { status: 201 });
  } catch (error) {
    console.error("Error creating recording:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { courseId: string; chapterId: string } }) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { courseId, chapterId } = params;
    const body = await req.json();
    const { title, url, duration, recordingId } = body;

    if (!courseId || !chapterId) {
      return NextResponse.json({ error: "Course ID and Chapter ID are required" }, { status: 400 });
    }

    if (!recordingId) {
      return NextResponse.json({ error: "Recording ID is required for updates" }, { status: 400 });
    }

    // Verify the chapter exists (optional)
    const chapter = await db.chapter.findUnique({
      where: { id: chapterId },
    });

    if (!chapter) {
      return NextResponse.json({ error: "Chapter not found" }, { status: 404 });
    }

    // Update an existing recording
    const updatedRecording = await db.recording.update({
      where: { id: recordingId },
      data: {
        title,
        url,
        duration: duration ? parseInt(duration) : undefined,
        isActive: true,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(updatedRecording, { status: 200 });
  } catch (error) {
    console.error("Error updating recording:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { courseId: string; chapterId: string } }) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { courseId, chapterId } = params;
    const body = await req.json();
    const { recordingId } = body; // Expect recordingId in the body

    if (!courseId || !chapterId || !recordingId) {
      return NextResponse.json({ error: "Course ID, Chapter ID, and Recording ID are required" }, { status: 400 });
    }

    // Verify the chapter exists
    const chapter = await db.chapter.findUnique({
      where: { id: chapterId },
    });

    if (!chapter) {
      return NextResponse.json({ error: "Chapter not found" }, { status: 404 });
    }

    // Delete the recording
    await db.recording.delete({
      where: { id: recordingId },
    });

    return NextResponse.json({ message: "Recording deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting recording:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest, { params }: { params: { courseId: string; chapterId: string } }) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { courseId, chapterId } = params;

    if (!courseId || !chapterId) {
      return NextResponse.json({ error: "Course ID and Chapter ID are required" }, { status: 400 });
    }

    // Verify the chapter exists and get its recordings
    const chapter = await db.chapter.findUnique({
      where: { id: chapterId },
      include: {
        recordings: true, // Include all recordings for this chapter
      },
    });

    if (!chapter) {
      return NextResponse.json({ error: "Chapter not found" }, { status: 404 });
    }

    return NextResponse.json(chapter.recordings, { status: 200 });
  } catch (error) {
    console.error("Error fetching recordings:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}