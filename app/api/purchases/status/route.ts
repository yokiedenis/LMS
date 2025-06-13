// /api/purchases/status/route.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  const courseId = searchParams.get("courseId");

  if (!userId || !courseId) {
    return new Response(JSON.stringify({ error: "Missing userId or courseId" }), { status: 400 });
  }

  const purchase = await prisma.purchase.findUnique({
    where: {
      userId_courseId: { userId, courseId },
    },
  });

  if (purchase) {
    return new Response(JSON.stringify({ hasPurchased: true }), { status: 200 });
  }

  const transaction = await prisma.transaction.findFirst({
    where: {
      userId,
      courseId,
      status: "COMPLETED",
    },
  });

  return new Response(JSON.stringify({ hasPurchased: !!transaction }), { status: 200 });
}