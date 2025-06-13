// app/api/purchases/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  try {
    const purchases = await prisma.purchase.findMany({
      where: { userId },
      select: { id: true, courseId: true }, // Minimal data to confirm enrollment
    });

    return NextResponse.json(purchases, { status: 200 });
  } catch (error) {
    console.error("Error fetching purchases:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}