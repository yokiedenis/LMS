// import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma";

// export async function PUT(
//   request: Request,
//   { params }: { params: { courseId: string; chapterId: string } }
// ) {
//   const { courseId, chapterId } = params;
//   const userId = request.headers.get("user-id"); // Assuming user-id is passed in headers

//   try {
//     if (!userId) {
//       return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
//     }

//     // Check if the user has a purchase for the course
//     const purchase = await prisma.purchase.findUnique({
//       where: {
//         userId_courseId: {
//           userId: userId,
//           courseId: courseId,
//         },
//       },
//     });

//     if (!purchase) {
//       return NextResponse.json({ error: "Course not purchased" }, { status: 403 });
//     }

//     // Check if the user has progress for this chapter
//     const userProgress = await prisma.userProgress.findUnique({
//       where: {
//         userId_chapterId: {
//           userId: userId,
//           chapterId: chapterId,
//         },
//       },
//     });

//     if (!userProgress) {
//       // If no progress exists, create it and mark it as not completed (accessible but not finished)
//       await prisma.userProgress.create({
//         data: {
//           userId: userId,
//           chapterId: chapterId,
//           isCompleted: false, // Chapter is accessible but not completed
//           score: 0, // Reset or maintain score as default
//           level: 1, // Maintain default level
//           points: 0, // Maintain default points
//         },
//       });
//     } else {
//       // If progress exists, ensure the chapter is accessible (no lock needed, just update if necessary)
//       // We can update isCompleted to false if it was true, or leave it as is if already accessible
//       await prisma.userProgress.update({
//         where: {
//           userId_chapterId: {
//             userId: userId,
//             chapterId: chapterId,
//           },
//         },
//         data: {
//           isCompleted: false, // Ensure the chapter is marked as not completed but accessible
//         },
//       });
//     }

//     return NextResponse.json({ message: "Chapter unlocked successfully" }, { status: 200 });
//   } catch (error) {
//     console.error("Error unlocking chapter:", error);
//     return NextResponse.json(
//       { error: "Failed to unlock chapter" },
//       { status: 500 }
//     );
//   }
// }





import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(
  request: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  const { courseId, chapterId } = params;
  const userId = request.headers.get("user-id"); // Assuming user-id is passed in headers

  try {
    if (!userId) {
      return NextResponse.json({ error: "User  not authenticated" }, { status: 401 });
    }

    // Check if the user has a purchase for the course
    const purchase = await prisma.purchase.findUnique({
      where: {
        userId_courseId: {
          userId: userId,
          courseId: courseId,
        },
      },
    });

    if (!purchase) {
      return NextResponse.json({ error: "Course not purchased" }, { status: 403 });
    }

    // Check if the user has progress for this chapter
    const userProgress = await prisma.userProgress.findUnique({
      where: {
        userId_chapterId: {
          userId: userId,
          chapterId: chapterId,
        },
      },
    });

    if (!userProgress) {
      // If no progress exists, create it and mark it as not completed (accessible but not finished)
      await prisma.userProgress.create({
        data: {
          userId: userId,
          chapterId: chapterId,
          courseId: courseId, // Include courseId here
          isCompleted: false, // Chapter is accessible but not completed
          score: 0, // Reset or maintain score as default
          level: 1, // Maintain default level
          points: 0, // Maintain default points
        },
      });
    } else {
      // If progress exists, ensure the chapter is accessible (no lock needed, just update if necessary)
      // We can update isCompleted to false if it was true, or leave it as is if already accessible
      await prisma.userProgress.update({
        where: {
          userId_chapterId: {
            userId: userId,
            chapterId: chapterId,
          },
        },
        data: {
          isCompleted: false, // Ensure the chapter is marked as not completed but accessible
        },
      });
    }

    return NextResponse.json({ message: "Chapter unlocked successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error unlocking chapter:", error);
    return NextResponse.json(
      { error: "Failed to unlock chapter" },
      { status: 500 }
    );
  }
}