//app/api/analytics/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const studentId = searchParams.get('studentId');

  if (!studentId) {
    return NextResponse.json({ error: 'Student ID is required' }, { status: 400 });
  }

  try {
    // Fetch user data
    const user = await prisma.user.findUnique({
      where: { id: studentId },
      include: {
        purchases: {
          include: {
            course: true,
          },
        },
        userProgress: {
          include: {
            chapter: true,
          },
        },
        profile: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const timeSpent = user.userProgress.reduce((acc, progress) => acc + (progress.points || 0), 0);
    const coursesEnrolled = user.purchases.length;
    const lastLogin = user.profile?.updatedAt || new Date();
    const enrollmentDates = user.purchases.map((purchase) => ({
      courseTitle: purchase.course.title,
      date: purchase.createdAt.toLocaleString(),
      amount: purchase.course.price || 0,
    }));
    const amountPaid = user.purchases.reduce((acc, purchase) => acc + (purchase.course.price || 0), 0);
    const currentChapters = user.userProgress.map((progress) => ({
      courseId: progress.chapter.courseId,
      courseTitle: progress.chapter.createdAt,
      chapterTitle: progress.chapter.title,
    }));
    const studentLevel = user.level;
    const certificatesEarned = user.profile?.certificatesEarned || 0;

    // Return analytics data
    return NextResponse.json({
      timeSpent,
      coursesEnrolled,
      lastLogin,
      enrollmentDates,
      amountPaid,
      currentChapters,
      studentLevel,
      certificatesEarned,
    });
  } catch (error) {
    console.error('Failed to fetch student analytics:', error);
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

