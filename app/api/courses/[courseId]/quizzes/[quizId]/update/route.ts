import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest, { params }: { params: { quizId: string } }) {
    const { quizId } = params;

    try {
        const body = await req.json();
        const { title } = body;

        // Validate required fields
        if (!title) {
            return NextResponse.json({ error: 'Title is required.' }, { status: 400 });
        }

        // Update the quiz in the database
        const updatedQuiz = await prisma.quiz.update({
            where: { id: quizId },
            data: { title },
        });

        return NextResponse.json({ message: 'Quiz updated successfully.', quiz: updatedQuiz });
    } catch (error) {
        console.error('Error updating quiz:', error);
        return NextResponse.json({ error: 'An error occurred while updating the quiz.' }, { status: 500 });
    }
}
