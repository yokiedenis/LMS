import { NextResponse } from 'next/server';
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const certificateId = searchParams.get('certificateId');
    const userId = searchParams.get('userId');

    if (!certificateId || !userId) {
      return new NextResponse('Missing parameters', { status: 400 });
    }

    // In a real implementation, you would:
    // 1. Verify the certificate ID matches the user
    // 2. Fetch the course completion details
    // 3. Return all relevant data

    // Mock implementation - replace with your actual database query
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        profile: true,
        chapterQuizResults: {
          where: {
            chapterQuiz: {
              course: {
                purchases: {
                  some: { userId }
                }
              }
            }
          },
          orderBy: { createdAt: 'desc' },
          take: 1,
          include: {
            chapterQuiz: {
              include: {
                course: true
              }
            }
          }
        }
      }
    });

    if (!user) {
      return new NextResponse('User not found', { status: 404 });
    }

    // Find the most recent quiz result for verification
    const latestResult = user.chapterQuizResults[0];

    return NextResponse.json({
      user: {
        id: user.id,
        fullName: user.profile?.name || user.name,
        email: user.email
      },
      course: latestResult?.chapterQuiz.course || null,
      score: latestResult ? Math.round((latestResult.score / latestResult.total) * 100) : 0,
      createdAt: latestResult?.createdAt || new Date()
    });

  } catch (error) {
    console.error('[VERIFY_CERTIFICATE_ERROR]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}