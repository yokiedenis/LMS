// app/api/projects/upload/route.ts
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

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const courseId = formData.get('courseId') as string;

    if (!file || !courseId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Simulate file upload (e.g., to a storage service like S3 or local filesystem)
    const fileName = file.name;
    const fileUrl = `/uploads/${Date.now()}-${fileName}`; // Replace with actual storage logic

    const submission = await prisma.projectSubmission.create({
      data: {
        userId,
        courseId,
        fileName,
        fileUrl,
        submittedAt: new Date(),
      },
    });

    return NextResponse.json(
      { submissionId: submission.id, message: 'Project submitted successfully' },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error('Error uploading project:', error);
    let errorMessage = 'Failed to upload project';
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
