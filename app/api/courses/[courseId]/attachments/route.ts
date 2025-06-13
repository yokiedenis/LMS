import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth(); // Retrieve the userId from Clerk authentication
    const { url, name } = await req.json(); // Expect both URL and name in the request body

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Check if the user is the owner of the course
    const courseOwner = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: userId,
      },
    });

    if (!courseOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Create a new attachment entry in the database with URL and name
    const attachment = await db.attachment.create({
      data: {
        url,
        name, // Store the original filename received from the client
        courseId: params.courseId,
      },
    });

    // Return the created attachment as a JSON response
    return NextResponse.json(attachment);

  } catch (error) {
    console.log("COURSE_ID_ATTACHMENTS", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}