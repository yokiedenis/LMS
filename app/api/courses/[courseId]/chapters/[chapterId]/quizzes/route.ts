import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  const { courseId, chapterId } = params;
  const { title, questions } = await req.json();

  try {
    // Ensure questions are properly structured
    const quiz = await prisma.chapterQuiz.create({
      data: {
        title,
        courseId,
        chapterId,
        questions: {
          create: questions.map(
            (q: {
              questionText: string;
              options: { text: string; isCorrect: boolean }[];
              correctAnswer: string;
            }) => ({
              questionText: q.questionText,
              correctAnswer: q.correctAnswer,
              chapterOptions: {
                create: q.options.map((option) => ({
                  text: option.text,
                  isCorrect: option.isCorrect,
                })),
              },
            })
          ),
        },
      },
    });

    return NextResponse.json(quiz);
  } catch (error) {
    console.error("Error creating quiz:", error);
    return NextResponse.json({ error: "Failed to create quiz" }, { status: 500 });
  }
}
