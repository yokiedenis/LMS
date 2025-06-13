import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GET() {
  const { userId } = auth();
  console.log("Authenticated User ID:", userId); // Log user ID

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const supportQueries = await prisma.supportQuery.findMany({
      where: { studentId: userId }, // Ensure studentId is set correctly
      orderBy: { createdAt: "desc" },
    });

    console.log("Fetched Support Queries:", supportQueries); // Log fetched data
    return NextResponse.json(supportQueries);
  } catch (error) {
    console.error("Error fetching support queries:", error); // Log error details
    return NextResponse.json({ error: "Failed to fetch support queries" }, { status: 500 });
  }
}
