// import { NextResponse } from 'next/server';
// import { currentUser } from '@clerk/nextjs/server';
// import { db } from '@/lib/db';

// export async function POST(
//   req: Request,
//   { params }: { params: { courseId: string } }
// ) {
//   try {
//     // 1. Verify authentication
//     const user = await currentUser();
//     if (!user || !user.id) {
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     // 2. Check if course exists and is free
//     const course = await db.course.findUnique({
//       where: {
//         id: params.courseId,
//         isPublished: true,
//         price: 0, // Only allow enrollment if price is 0
//       },
//     });

//     if (!course) {
//       return new NextResponse("Course not found or not free", { status: 404 });
//     }

//     // 3. Check if user already enrolled
//     const existingPurchase = await db.purchase.findUnique({
//       where: {
//         userId_courseId: {
//           userId: user.id,
//           courseId: params.courseId,
//         },
//       },
//     });

//     if (existingPurchase) {
//       return new NextResponse("Already enrolled", { status: 400 });
//     }

//     // 4. Create a purchase record (with null transactionId for free courses)
//     const purchase = await db.purchase.create({
//       data: {
//         userId: user.id,
//         courseId: params.courseId,
//         transactionId: null, // Explicit null for free enrollments
//       },
//       include: {
//         course: true,
//       },
//     });

//     return NextResponse.json({
//       success: true,
//       course: purchase.course,
//     });

//   } catch (error) {
//     console.error('[COURSE_ENROLL_ERROR]', error);
//     return new NextResponse("Internal Error", { status: 500 });
//   }
// }




import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { validate } from 'uuid';

export const dynamic = 'force-dynamic';

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  console.log("ENDPOINT HIT");
  console.log("Processing enrollment for course:", params.courseId);

  try {
    const user = await currentUser();
    if (!user) return new NextResponse("Unauthorized", { status: 401 });

    if (!validate(params.courseId)) {
      console.log("Invalid courseId:", params.courseId);
      return new NextResponse("Invalid course ID", { status: 400 });
    }

    const course = await db.course.findUnique({
      where: { id: params.courseId, isPublished: true, price: 0 }, // Keep original query
    });

    console.log("Course query result:", course);

    if (!course) {
      const existingCourse = await db.course.findUnique({ where: { id: params.courseId } });
      if (!existingCourse) {
        console.log("Course not found for ID:", params.courseId);
        return new NextResponse("Course does not exist", { status: 404 });
      }
      if (!existingCourse.isPublished) {
        console.log("Course is not published");
        return new NextResponse("Course is not published", { status: 404 });
      }
      if (existingCourse.price !== 0 && existingCourse.price !== null) {
        console.log("Course is not free, price:", existingCourse.price);
        return new NextResponse("Course is not free", { status: 404 });
      }
    }

    const purchase = await db.purchase.create({
      data: {
        userId: user.id,
        courseId: params.courseId,
        transactionId: null,
      },
    });

    return NextResponse.json({ success: true });

  } catch (error: unknown) {
    console.error('Enrollment error:', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}