import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import { db } from '@/lib/db';

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    // 1. Verify authentication
    const user = await currentUser();
    if (!user || !user.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // 2. Check if course exists and is free
    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
        isPublished: true,
        price: 0, // Only allow enrollment if price is 0
      },
    });

    if (!course) {
      return new NextResponse("Course not found or not free", { status: 404 });
    }

    // 3. Check if user already enrolled
    const existingPurchase = await db.purchase.findUnique({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId: params.courseId,
        },
      },
    });

    if (existingPurchase) {
      return new NextResponse("Already enrolled", { status: 400 });
    }

    // 4. Create a purchase record with price 0
    const purchase = await db.purchase.create({
      data: {
        userId: user.id,
        courseId: params.courseId,
        // No transaction ID since it's free
      },
      include: {
        course: true, // Include course details in response
      },
    });

    // 5. Return success response
    return NextResponse.json({
      success: true,
      course: purchase.course,
    });

  } catch (error) {
    console.error('[COURSE_ENROLL_ERROR]', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}