// app/api/chapters/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const courseIds = searchParams.get("courseIds")?.split(",") || [];

  if (!courseIds.length) return NextResponse.json({ error: "Missing courseIds" }, { status: 400 });

  try {
    const chapters = await prisma.chapter.findMany({
      where: { courseId: { in: courseIds } },
      select: { id: true, courseId: true },
    });
    return NextResponse.json(chapters, { status: 200 });
  } catch (error) {
    console.error("Error fetching chapters:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}