import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest, { params }: { params: { courseId: string } }) {
  try {
    // Fetch quizzes by courseId, including the _count field for questions
    const quizzes = await prisma.quiz.findMany({
      where: {
        courseId: params.courseId,
      },
      select: {
        id: true,         // Include the ID of the quiz
        title: true,      // Include the title
        _count: {
          select: { questions: true },  // Include the count of questions related to each quiz
        },
        chapterId: true,  // Include the chapterId if needed
      },
    });

    return NextResponse.json(quizzes, { status: 200 }); // Send quizzes as response
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    return NextResponse.json(
      { error: "Error fetching quizzes" },
      { status: 500 }
    );
  }
}