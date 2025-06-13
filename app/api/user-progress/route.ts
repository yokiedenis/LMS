// // app/api/user-progress/route.ts
// import { NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// export async function GET(request: Request) {
//   const { searchParams } = new URL(request.url);
//   const userId = searchParams.get("userId");

//   if (!userId) return NextResponse.json({ error: "Missing userId" }, { status: 400 });

//   try {
//     const progress = await prisma.userProgress.findMany({
//       where: { userId },
//       select: { chapterId: true, isCompleted: true, courseId: true },
//     });
//     return NextResponse.json(progress, { status: 200 });
//   } catch (error) {
//     console.error("Error fetching user progress:", error);
//     return NextResponse.json({ error: "Internal server error" }, { status: 500 });
//   } finally {
//     await prisma.$disconnect();
//   }
// }




// // app/api/user-progress/route.ts
// import { NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";
// import { auth } from "@clerk/nextjs/server";

// const prisma = new PrismaClient();

// export async function GET(request: Request) {
//   const { userId: authUserId } = auth(); // Get authenticated user ID from Clerk
//   const { searchParams } = new URL(request.url);
//   const userId = searchParams.get("userId");

//   // Validate userId and ensure it matches the authenticated user
//   if (!userId) {
//     return NextResponse.json({ error: "Missing userId" }, { status: 400 });
//   }
//   if (!authUserId || authUserId !== userId) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   try {
//     const progress = await prisma.userProgress.findMany({
//       where: { userId },
//       select: {
//         chapterId: true,
//         courseId: true,
//         isCompleted: true,
//         score: true,
//         level: true,
//         points: true,
//         createdAt: true,
//         updatedAt: true,
//       },
//     });

//     return NextResponse.json(progress, { status: 200 });
//   } catch (error: any) {
//     console.error("Error fetching user progress:", error);
//     if (error.message.includes("expected_type")) {
//       return NextResponse.json(
//         { error: "Database schema error: courseId cannot be null" },
//         { status: 500 }
//       );
//     }
//     return NextResponse.json({ error: "Internal server error" }, { status: 500 });
//   } finally {
//     await prisma.$disconnect();
//   }
// }




import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  // Get authenticated user ID from Clerk
  const { userId: authUserId } = auth();

  // Extract userId from query parameters
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  // Validate userId presence
  if (!userId) {
    return NextResponse.json({ error: "Missing userId parameter" }, { status: 400 });
  }

  // Ensure the authenticated user is accessing their own data
  if (!authUserId || authUserId !== userId) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    // Fetch user progress data from the database
    const progress = await prisma.userProgress.findMany({
      where: { userId },
      select: {
        chapterId: true,
        courseId: true,
        isCompleted: true,
        score: true,
        level: true,
        points: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(progress, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching user progress:", error);

    // Handle specific Prisma errors
    if (error.message.includes("expected_type")) {
      return NextResponse.json(
        { error: "Database schema error: courseId cannot be null" },
        { status: 500 }
      );
    }

    // Generic error response
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// Ensure Prisma client is disconnected on process exit
process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await prisma.$disconnect();
  process.exit(0);
});