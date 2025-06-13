import { NextResponse, NextRequest } from 'next/server'; // Import NextRequest
import prisma from '@/lib/prisma';
import { getAuth } from '@clerk/nextjs/server';

export async function POST(req: NextRequest) { // Change Request to NextRequest
  const { email, subject, message } = await req.json(); // Parse JSON body

  if (!email || !subject || !message) {
    return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
  }

  try {
    // Get the authenticated user ID from Clerk
    const { userId } = getAuth(req); // This will now work correctly

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Create a new support query with the user ID
    const supportQuery = await prisma.supportQuery.create({
      data: {
        studentId: userId,
        email,
        subject,
        message,
      },
    });

    return NextResponse.json({ success: 'Query submitted successfully', supportQuery }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to submit query' }, { status: 500 });
  }
}


