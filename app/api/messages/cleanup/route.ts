import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { threshold } = await req.json();
    
    const result = await prisma.message.deleteMany({
      where: {
        createdAt: {
          lt: new Date(threshold)
        }
      }
    });
    
    return NextResponse.json({
      success: true,
      deletedCount: result.count
    });
  } catch (error) {
    console.error('Error cleaning up messages:', error);
    return NextResponse.json(
      { error: 'Failed to clean up messages' },
      { status: 500 }
    );
  }
}