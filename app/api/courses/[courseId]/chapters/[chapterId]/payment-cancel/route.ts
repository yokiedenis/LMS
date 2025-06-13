// import { NextResponse } from "next/server";
// import { auth } from "@clerk/nextjs/server";
// import { db } from "@/lib/db";

// const baseURL = process.env.NEXT_PUBLIC_API_URL || "https://eduskill-mu.vercel.app/";

// export async function GET(
//   req: Request,
//   { params }: { params: { courseId: string; chapterId: string } }
// ) {
//   console.log("Payment Cancel Request:", {
//     url: req.url,
//     courseId: params.courseId,
//     chapterId: params.chapterId,
//   });

//   try {
//     const { userId } = auth();
//     if (!userId) {
//       return NextResponse.redirect(
//         `${baseURL}/login?redirect=/payment-cancel?courseId=${params.courseId}&chapterId=${params.chapterId}`
//       );
//     }

//     // Mark pending transactions as cancelled
//     await db.transaction.updateMany({
//       where: {
//         userId,
//         courseId: params.courseId,
//         status: "PENDING",
//       },
//       data: {
//         status: "CANCELLED",
//       },
//     });

//     return NextResponse.redirect(
//       `${baseURL}/payment-cancel?courseId=${params.courseId}&chapterId=${params.chapterId}&reason=cancelled`
//     );
//   } catch (error) {
//     console.error("[PAYMENT_CANCEL]", {
//       error: error instanceof Error ? error.message : "Unknown error",
//       stack: error instanceof Error ? error.stack : undefined,
//       courseId: params.courseId,
//       chapterId: params.chapterId,
//     });
//     return NextResponse.redirect(
//       `${baseURL}/payment-cancel?courseId=${params.courseId}&chapterId=${params.chapterId}&reason=server_error`
//     );
//   }
// }





// import { NextResponse } from "next/server";
// import { auth } from "@clerk/nextjs/server";
// import { db } from "@/lib/db";

// const baseURL = process.env.NEXT_PUBLIC_APP_URL || "https://eduskill-mu.vercel.app/";

// export async function GET(
//   req: Request,
//   { params }: { params: { courseId: string; chapterId: string } }
// ) {
//   const url = new URL(req.url);
//   const token = url.searchParams.get("token") || url.searchParams.get("ID");

//   console.log("Payment Cancel Request:", {
//     url: req.url,
//     token,
//     courseId: params.courseId,
//     chapterId: params.chapterId,
//   });

//   try {
//     const { userId } = auth();
//     if (!userId) {
//       return NextResponse.redirect(
//         `${baseURL}/login?redirect=/payment-cancel?courseId=${params.courseId}&chapterId=${params.chapterId}`
//       );
//     }

//     // Mark pending transactions as cancelled
//     if (token) {
//       // If we have a token, find the specific transaction to cancel
//       await db.transaction.updateMany({
//         where: {
//           OR: [
//             { dpoToken: token },
//             { id: token }
//           ],
//           userId,
//           status: "PENDING",
//         },
//         data: {
//           status: "CANCELLED",
//         },
//       });
//     } else {
//       // Otherwise cancel all pending transactions for this course
//       await db.transaction.updateMany({
//         where: {
//           userId,
//           courseId: params.courseId,
//           status: "PENDING",
//         },
//         data: {
//           status: "CANCELLED",
//         },
//       });
//     }

//     return NextResponse.redirect(
//       `${baseURL}/courses/${params.courseId}/chapters/${params.chapterId}?purchase=cancelled`
//     );
//   } catch (error) {
//     console.error("[PAYMENT_CANCEL]", {
//       error: error instanceof Error ? error.message : "Unknown error",
//       stack: error instanceof Error ? error.stack : undefined,
//       courseId: params.courseId,
//       chapterId: params.chapterId,
//     });
//     return NextResponse.redirect(
//       `${baseURL}/courses/${params.courseId}/chapters/${params.chapterId}?purchase=error`
//     );
//   }
// }





// import { NextResponse } from "next/server";
// import { auth } from "@clerk/nextjs/server";
// import { db } from "@/lib/db";

// const baseURL = process.env.NEXT_PUBLIC_APP_URL || "https://eduskill-mu.vercel.app/";

// export async function GET(
//   req: Request,
//   { params }: { params: { courseId: string; chapterId: string } }
// ) {
//   const url = new URL(req.url);
//   const token =
//     url.searchParams.get("TransToken") ||
//     url.searchParams.get("TransactionToken") ||
//     url.searchParams.get("token") ||
//     url.searchParams.get("ID") ||
//     url.searchParams.get("Token") ||
//     url.searchParams.get("transactionToken");
//   const reason = url.searchParams.get("reason") || "unknown";

//   console.log("Payment Cancel Request:", {
//     url: req.url,
//     queryParams: Object.fromEntries(url.searchParams), // Log all query parameters
//     token,
//     courseId: params.courseId,
//     chapterId: params.chapterId,
//     reason,
//   });

//   try {
//     const { userId } = auth();
//     if (!userId) {
//       return NextResponse.redirect(
//         `${baseURL}/login?redirect=/payment-cancel?courseId=${params.courseId}&chapterId=${params.chapterId}&reason=unauthorized`
//       );
//     }

//     // Mark pending transactions as cancelled
//     if (token) {
//       await db.transaction.updateMany({
//         where: {
//           dpoToken: token,
//           userId,
//           status: "PENDING",
//         },
//         data: {
//           status: "CANCELLED",
//         },
//       });
//     } else {
//       await db.transaction.updateMany({
//         where: {
//           userId,
//           courseId: params.courseId,
//           status: "PENDING",
//         },
//         data: {
//           status: "CANCELLED",
//         },
//       });
//     }

//     return NextResponse.redirect(
//       `${baseURL}/courses/${params.courseId}/chapters/${params.chapterId}?purchase=cancelled&reason=${reason}`
//     );
//   } catch (error) {
//     console.error("[PAYMENT_CANCEL]", {
//       error: error instanceof Error ? error.message : "Unknown error",
//       stack: error instanceof Error ? error.stack : undefined,
//       courseId: params.courseId,
//       chapterId: params.chapterId,
//       reason,
//     });
//     return NextResponse.redirect(
//       `${baseURL}/courses/${params.courseId}/chapters/${params.chapterId}?purchase=error&reason=server_error`
//     );
//   }
// }








import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

const baseURL = process.env.NEXT_PUBLIC_APP_URL || "https://eduskill-mu.vercel.app/";

export async function GET(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  const url = new URL(req.url);
  const token =
    url.searchParams.get("TransToken") ||
    url.searchParams.get("TransactionToken") ||
    url.searchParams.get("token") ||
    url.searchParams.get("ID") ||
    url.searchParams.get("Token") ||
    url.searchParams.get("transactionToken");
  const reason = url.searchParams.get("reason") || "user_cancelled";

  console.log("Payment Cancel Request:", {
    url: req.url,
    queryParams: Object.fromEntries(url.searchParams),
    token,
    courseId: params.courseId,
    chapterId: params.chapterId,
    reason,
  });

  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.redirect(
        `${baseURL}/login?redirect=/courses/${params.courseId}/chapters/${params.chapterId}?purchase=cancelled&reason=unauthorized`
      );
    }

    // Mark pending transactions as cancelled
    if (token) {
      await db.transaction.updateMany({
        where: {
          dpoToken: token,
          userId,
          status: "PENDING",
        },
        data: {
          status: "CANCELLED",
        },
      });
    } else {
      await db.transaction.updateMany({
        where: {
          userId,
          courseId: params.courseId,
          status: "PENDING",
        },
        data: {
          status: "CANCELLED",
        },
      });
    }

    return NextResponse.redirect(
      `${baseURL}/courses/${params.courseId}/chapters/${params.chapterId}?purchase=cancelled&reason=${reason}`
    );
  } catch (error) {
    console.error("[PAYMENT_CANCEL]", {
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
      courseId: params.courseId,
      chapterId: params.chapterId,
      reason,
    });
    return NextResponse.redirect(
      `${baseURL}/courses/${params.courseId}/chapters/${params.chapterId}?purchase=error&reason=server_error`
    );
  }
}