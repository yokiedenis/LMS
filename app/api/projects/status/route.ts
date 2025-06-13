// app/api/projects/status/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  const courseId = searchParams.get('courseId');

  if (!userId || !courseId) {
    return NextResponse.json({ error: 'Missing userId or courseId' }, { status: 400 });
  }

  try {
    const submission = await prisma.projectSubmission.findFirst({
      where: { userId, courseId },
    });

    return NextResponse.json(
      { submission: submission ? {
        id: submission.id,
        marks: submission.marks,
        comments: submission.comments,
        isMarked: submission.isMarked,
      } : null },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error('Error fetching submission status:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}