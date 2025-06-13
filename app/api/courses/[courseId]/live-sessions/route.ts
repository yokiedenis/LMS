// app/api/admin/courses/[courseId]/live-sessions/route.ts
import { NextResponse } from "next/server";
import  prisma  from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server"; // Use Clerk's currentUser
import { isSuperAdmin } from "@/lib/isSuperAdmin";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const user = await currentUser();
    if (!user || !isSuperAdmin(user.id)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title, startTime, endTime, meetingUrl } = await req.json();

    const liveSession = await prisma.liveSession.create({
      data: {
        courseId: params.courseId,
        title,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        meetingUrl,
      },
    });

    return NextResponse.json(liveSession);
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}