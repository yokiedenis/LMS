import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  const { courseId, chapterId } = params;

  try {
    // Fetch the ChapterQuiz along with related questions and options
    const quiz = await prisma.chapterQuiz.findUnique({
      where: {
        courseId_chapterId: {
          courseId,
          chapterId,
        },
      },
      include: {
        questions: {
          include: {
            chapterOptions: true,
          },
        },
      },
    });

    // Check if the quiz exists
    if (!quiz) {
      return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
    }

    // Format the questions for the response with numbering and options as A, B, C, D
    const formattedQuestions = quiz.questions.map((question, index) => {
      // Sort the options by their text in alphabetical order
      const sortedOptions = question.chapterOptions.sort((a, b) => a.text.localeCompare(b.text));
      
      const formattedOptions = sortedOptions.map((option, optionIndex) => {
        // Map options to letters starting from A
        const optionLetter = String.fromCharCode(65 + optionIndex); // 65 is the ASCII code for 'A'
        return {
          id: option.id,
          letter: optionLetter, // Add letter (A, B, C, D)
          text: option.text,
          isCorrect: option.isCorrect,
        };
      });

      return {
        id: question.id,
        questionNumber: index + 1, // Numbering questions starting from 1
        questionText: question.questionText, // Ensure this field is correctly populated in the database
        options: formattedOptions,
      };
    });

    // Return the formatted questions
    return NextResponse.json({ questions: formattedQuestions }, { status: 200 });
  } catch (error) {
    console.error("Error fetching quiz:", error);
    return NextResponse.json(
      { error: "Failed to fetch quiz data" },
      { status: 500 }
    );
  }
}