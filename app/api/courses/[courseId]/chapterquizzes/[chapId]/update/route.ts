// import prisma from '@/lib/prisma';
// import { NextRequest, NextResponse } from 'next/server';

// export async function PUT(req: NextRequest, { params }: { params: { chapterQuizId: string } }) {
//     const { chapterQuizId } = params;

//     try {
//         const body = await req.json();
//         const { title } = body;

//         // Validate required fields
//         if (!title) {
//             return NextResponse.json({ error: 'Title is required.' }, { status: 400 });
//         }

//         // Update the ChapterQuiz in the database
//         const updatedChapterQuiz = await prisma.chapterQuiz.update({
//             where: { id: chapterQuizId },
//             data: { title },
//         });

//         return NextResponse.json({ message: 'Chapter Quiz updated successfully.', quiz: updatedChapterQuiz });
//     } catch (error) {
//         console.error('Error updating Chapter Quiz:', error);
//         return NextResponse.json({ error: 'An error occurred while updating the Chapter Quiz.' }, { status: 500 });
//     }
// }




import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest, { params }: { params: { courseId: string; chapId: string } }) {
  const { courseId, chapId } = params;

  console.log('Received params:', { courseId, chapId }); // Debug log

  try {
    const body = await req.json();
    const { title, questions } = body;

    console.log('Request body:', { title, questions }); // Debug log

    // Validate required fields
    if (!title || typeof title !== 'string' || title.trim() === '') {
      console.log('Validation failed: Title is invalid:', title);
      return NextResponse.json({ error: 'Title is required and must be a non-empty string.' }, { status: 400 });
    }
    if (!chapId) {
      console.log('Validation failed: Chapter Quiz ID is missing:', chapId);
      return NextResponse.json({ error: 'Chapter Quiz ID is required.' }, { status: 400 });
    }
    if (!questions || !Array.isArray(questions) || questions.length === 0) {
      console.log('Validation failed: Questions are invalid:', questions);
      return NextResponse.json({ error: 'At least one question is required as a non-empty array.' }, { status: 400 });
    }

    // Validate each question
    for (const q of questions) {
      if (!q.text || typeof q.text !== 'string' || q.text.trim() === '') {
        console.log('Validation failed: Question text is invalid:', q.text);
        return NextResponse.json({ error: 'Each question must have a non-empty text.' }, { status: 400 });
      }
      if (!q.correctAnswer || typeof q.correctAnswer !== 'string' || q.correctAnswer.trim() === '') {
        console.log('Validation failed: Correct answer is invalid:', q.correctAnswer);
        return NextResponse.json({ error: 'Each question must have a non-empty correct answer.' }, { status: 400 });
      }
      if (!q.options || !Array.isArray(q.options) || q.options.length < 4) {
        console.log('Validation failed: Options are invalid:', q.options);
        return NextResponse.json({ error: 'Each question must have at least 4 options.' }, { status: 400 });
      }
      for (const opt of q.options) {
        if (typeof opt !== 'string' || opt.trim() === '') {
          console.log('Validation failed: Option is invalid:', opt);
          return NextResponse.json({ error: 'Each option must be a non-empty string.' }, { status: 400 });
        }
      }
    }

    // Update the ChapterQuiz and its questions
    const updatedChapterQuiz = await prisma.chapterQuiz.update({
      where: { id: chapId },
      data: {
        title,
        questions: {
          // Delete existing questions to replace with new ones
          deleteMany: {},
          create: questions.map((q: any) => ({
            questionText: q.text,
            correctAnswer: q.correctAnswer,
            options: {
              create: q.options.map((opt: string) => ({ text: opt })),
            },
          })),
        },
      },
      include: {
        questions: {
          include: {
            chapterOptions: true, // Corrected from chapterOptions to options
          },
        },
      },
    });

    console.log('Updated Chapter Quiz:', updatedChapterQuiz); // Debug log
    return NextResponse.json({ message: 'Chapter Quiz updated successfully.', quiz: updatedChapterQuiz });
  } catch (error: any) {
    console.error('Error updating Chapter Quiz:', error.message, error.stack);
    return NextResponse.json({ error: 'An error occurred while updating the Chapter Quiz.', details: error.message }, { status: 500 });
  }
}