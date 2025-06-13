// app/api/admin/courses/[courseId]/route.ts
import { NextResponse } from "next/server";
import  prisma  from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server"; // Use Clerk's currentUser
import { isSuperAdmin } from "@/lib/isSuperAdmin";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const user = await currentUser();
    if (!user || !isSuperAdmin(user.id)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { title, description, price, categoryId, mode, instructorIds } = body;

    // Update course details
    const course = await prisma.course.update({
      where: { id: params.courseId },
      data: {
        title,
        description,
        price,
        categoryId,
        mode,
      },
    });

    // Update instructors
    if (instructorIds) {
      await prisma.instructorAssignment.deleteMany({
        where: { courseId: params.courseId },
      });

      await prisma.instructorAssignment.createMany({
        data: instructorIds.map((userId: string) => ({
          courseId: params.courseId,
          userId,
        })),
      });
    }

    return NextResponse.json(course);
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const user = await currentUser();
    if (!user || !isSuperAdmin(user.id)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await prisma.course.delete({
      where: { id: params.courseId },
    });

    return NextResponse.json({ message: "Course deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}