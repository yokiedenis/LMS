// app/api/leaderboard/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Fetch all users with relevant fields
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        points: true,
        level: true,
        purchases: {
          select: {
            course: {
              select: {
                id: true,
                title: true,
              },
            },
          },
        },
      },
      orderBy: {
        points: 'desc',
      },
    });

    console.log('Fetched users:', users); // Debugging log

    if (!users || users.length === 0) {
      return NextResponse.json(
        { message: 'No users found in the database' },
        { status: 404 }
      );
    }

    // Transform the data
    const leaderboardData = users.map((user) => ({
      id: user.id,
      name: user.name || 'Anonymous', // Fallback if name is null
      points: user.points ?? 0, // Fallback if points is null
      level: user.level ?? 1, // Fallback if level is null
      enrolledCourses: user.purchases.length,
      courseTitles: user.purchases.map((p) => p.course.title),
    }));

    return NextResponse.json(leaderboardData, { status: 200 });
  } catch (error: unknown) {
    // Type the error as unknown and narrow it
    console.error('Error fetching leaderboard:', error);

    // Safely handle the error message
    let errorMessage = 'Unknown error occurred';
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json(
      { message: 'Internal server error', error: errorMessage },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}