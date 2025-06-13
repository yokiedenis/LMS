import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "https://eduskill-mu.vercel.app/";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const courseId = url.searchParams.get("courseId");
  const chapterId = url.searchParams.get("chapterId");

  if (!courseId || !chapterId) {
    return NextResponse.redirect(`${baseURL}/payment-cancel?reason=missing_parameters`);
  }

  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.redirect(`${baseURL}/login?redirect=/payment-cancel?courseId=${courseId}&chapterId=${chapterId}`);
    }

    // Mark pending transactions as cancelled
    await db.transaction.updateMany({
      where: {
        userId,
        courseId,
        status: "PENDING",
      },
      data: {
        status: "CANCELLED",
      },
    });

    return NextResponse.redirect(`${baseURL}/payment-cancel?courseId=${courseId}&chapterId=${chapterId}`);
  } catch (error) {
    console.error("[PAYMENT_CANCEL]", error);
    return NextResponse.redirect(`${baseURL}/payment-cancel?reason=server_error`);
  }
}