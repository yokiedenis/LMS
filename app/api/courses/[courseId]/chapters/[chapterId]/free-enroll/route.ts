// import { NextResponse } from "next/server";
// import { currentUser } from "@clerk/nextjs/server";
// import { db } from "@/lib/db";

// const baseURL = process.env.NEXT_PUBLIC_API_URL || "https://eduskill-mu.vercel.app/";

// export async function POST(
//   req: Request,
//   { params }: { params: { courseId: string; chapterId: string } }
// ) {
//   try {
//     // User Authentication
//     const user = await currentUser();
//     if (!user || !user.id) {
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     // Check if course exists and is published
//     const course = await db.course.findUnique({
//       where: {
//         id: params.courseId,
//         isPublished: true,
//       },
//     });

//     if (!course) {
//       return new NextResponse("Course not found", { status: 404 });
//     }

//     // Verify course price is 0
//     if (course.price !== 0) {
//       return new NextResponse("Course is not free", { status: 400 });
//     }

//     // Check if the user has already purchased this course
//     const existingPurchase = await db.purchase.findUnique({
//       where: {
//         userId_courseId: {
//           userId: user.id,
//           courseId: params.courseId,
//         },
//       },
//     });

//     if (existingPurchase) {
//       return new NextResponse("Already Purchased", { status: 400 });
//     }

//     // Create transaction with status SUCCESS (no DPO token)
//     const transaction = await db.transaction
//       .create({
//         data: {
//           userId: user.id,
//           courseId: params.courseId,
//           chapterId: params.chapterId,
//           amount: 0,
//           status: "SUCCESS",
//         },
//       })
//       .catch((error) => {
//         console.error("Failed to create transaction:", error);
//         throw error;
//       });

//     console.log("Transaction created:", transaction);

//     // Create purchase
//     const purchase = await db.purchase
//       .create({
//         data: {
//           userId: user.id,
//           courseId: params.courseId,
//           transactionId: transaction.id,
//         },
//       })
//       .catch((error) => {
//         console.error("Failed to create purchase:", error);
//         throw error;
//       });

//     console.log("Purchase created:", purchase);

//     // Unlock chapters
//     const chapters = await db.chapter.findMany({
//       where: {
//         courseId: params.courseId,
//         isPublished: true,
//       },
//     });

//     for (const chapter of chapters) {
//       await db.userProgress.upsert({
//         where: {
//           userId_chapterId: {
//             userId: user.id,
//             chapterId: chapter.id,
//           },
//         },
//         update: {
//           isCompleted: false,
//         },
//         create: {
//           userId: user.id,
//           chapterId: chapter.id,
//           courseId: params.courseId,
//           isCompleted: false,
//         },
//       });
//     }

//     // Return success URL
//     return NextResponse.json({
//       url: `${baseURL}/payment-success?courseId=${params.courseId}&chapterId=${params.chapterId}`,
//     });
//   } catch (error) {
//     if (error instanceof Error) {
//       console.error("Error in free enrollment:", error);
//       return NextResponse.json({ error: error.message }, { status: 500 });
//     } else {
//       console.error("Unexpected error:", error);
//       return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
//     }
//   }
// }







import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { v4 as uuidv4 } from "uuid"; // Import UUID for generating unique tokens

const baseURL = process.env.NEXT_PUBLIC_API_URL || "https://eduskill-mu.vercel.app/";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    // User Authentication
    const user = await currentUser();
    if (!user || !user.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Check if course exists and is published
    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
        isPublished: true,
      },
    });

    if (!course) {
      return new NextResponse("Course not found", { status: 404 });
    }

    // Verify course price is 0
    if (course.price !== 0) {
      return new NextResponse("Course is not free", { status: 400 });
    }

    // Check if the user has already purchased this course
    const existingPurchase = await db.purchase.findUnique({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId: params.courseId,
        },
      },
    });

    if (existingPurchase) {
      return new NextResponse("Already Purchased", { status: 400 });
    }

    // Create transaction with status SUCCESS and a unique dummy dpoToken
    const transaction = await db.transaction
      .create({
        data: {
          userId: user.id,
          courseId: params.courseId,
          chapterId: params.chapterId,
          amount: 0,
          dpoToken: `FREE-${uuidv4()}`, // Generate unique dummy token for free courses
          status: "SUCCESS",
        },
      })
      .catch((error) => {
        console.error("Failed to create transaction:", error);
        throw error;
      });

    console.log("Transaction created:", transaction);

    // Create purchase
    const purchase = await db.purchase
      .create({
        data: {
          userId: user.id,
          courseId: params.courseId,
          transactionId: transaction.id,
        },
      })
      .catch((error) => {
        console.error("Failed to create purchase:", error);
        throw error;
      });

    console.log("Purchase created:", purchase);

    // Unlock chapters
    const chapters = await db.chapter.findMany({
      where: {
        courseId: params.courseId,
        isPublished: true,
      },
    });

    for (const chapter of chapters) {
      await db.userProgress.upsert({
        where: {
          userId_chapterId: {
            userId: user.id,
            chapterId: chapter.id,
          },
        },
        update: {
          isCompleted: false,
        },
        create: {
          userId: user.id,
          chapterId: chapter.id,
          courseId: params.courseId,
          isCompleted: false,
        },
      });
    }

    // Return success URL
    return NextResponse.json({
      url: `${baseURL}/payment-success?courseId=${params.courseId}&chapterId=${params.chapterId}`,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error in free enrollment:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      console.error("Unexpected error:", error);
      return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
    }
  }
}