// app/api/courses/admin/route.ts
import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server"; // Use Clerk's currentUser
import prisma from "@/lib/prisma";
import { isSuperAdmin } from "@/lib/isSuperAdmin";

export async function GET(req: Request) {
  try {
    const user = await currentUser();
    if (!user || !isSuperAdmin(user.id)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const courses = await prisma.course.findMany({
      include: {
        instructors: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
        liveSessions: true,
        category: true,
      },
    });

    return NextResponse.json(courses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await currentUser();
    if (!user || !isSuperAdmin(user.id)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const {
      title,
      description,
      price,
      categoryId,
      mode,
      instructorIds,
    } = body;

    const course = await prisma.course.create({
      data: {
        userId: user.id,
        title,
        description,
        price: price ? parseFloat(price) : null, // Ensure price is a float or null
        categoryId,
        mode: mode as "LIVE" | "HYBRID" | "ONDEMAND", // Ensure mode is correctly typed
        instructors: {
          create: instructorIds.map((userId: string) => ({
            userId,
          })),
        },
      },
      include: {
        instructors: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(course);
  } catch (error) {
    console.error("Error creating course:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}