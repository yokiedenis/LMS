// app/api/project-submissions/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) return NextResponse.json({ error: "Missing userId" }, { status: 400 });

  try {
    const submissions = await prisma.projectSubmission.findMany({
      where: { userId },
      select: { id: true },
    });
    return NextResponse.json(submissions, { status: 200 });
  } catch (error) {
    console.error("Error fetching project submissions:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}