// app/api/updatePoints/route.ts
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  // Authenticate user outside try block
  const { userId } = auth();
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    // Parse request body
    const body = await req.json();
    const { score, totalQuestions } = body;

    // Validate input
    if (
      typeof score !== "number" ||
      typeof totalQuestions !== "number" ||
      score < 0 ||
      totalQuestions < 0 ||
      score > totalQuestions
    ) {
      return new NextResponse("Invalid score or totalQuestions", { status: 400 });
    }

    // Calculate points (10 points per correct answer)
    const pointsToAdd = score * 10;

    // Update user's points
    const user = await db.user.update({
      where: { id: userId },
      data: {
        points: {
          increment: pointsToAdd,
        },
      },
    });

    console.log(`Updated points for user ${userId}: +${pointsToAdd} points, new total=${user.points}`);

    return NextResponse.json({ points: user.points }, { status: 200 });
  } catch (error) {
    console.error(`[UPDATE_POINTS_ERROR] userId=${userId || "unknown"}:`, error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}