// app/api/projects/mark/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { auth } from '@clerk/nextjs/server';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    // Authenticate user using Clerk
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { submissionId, marks, comments } = await request.json();

    // Verify admin role
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { profile: true },
    });

    if (!user || user.profile?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const submission = await prisma.projectSubmission.update({
      where: { id: submissionId },
      data: {
        marks,
        comments, // Optional field for feedback
        isMarked: true,
        updatedAt: new Date(),
      },
    });

    // Optionally send email here (see Step 3)

    return NextResponse.json(
      { message: 'Project marked successfully', submission },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error('Error marking project:', error);
    let errorMessage = 'Failed to mark project';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
