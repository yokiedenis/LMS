// pages/api/courses/[courseId]/quizzes/create-get.ts
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma'; // Adjust the import path based on your setup

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { title, questions, position } = req.body; // Ensure 'position' is included in the request body
    console.log("Course ID:", req.query.courseId); // Log course ID for debugging

    try {
      // Validate that 'position' is provided and is a number
      if (typeof position !== 'number') {
        return res.status(400).json({ error: "'position' is required and must be a number." });
      }

      const quiz = await prisma.quiz.create({
        data: {
          title,
          courseId: req.query.courseId as string,
          position, // Include the required 'position' field
          questions: {
            create: questions.map((question: any) => ({
              questionText: question.text,
              options: question.options,
              correctAnswer: question.correctAnswer,
            })),
          },
        },
      });

      res.status(201).json(quiz);
    } catch (error) {
      console.error("Error details:", error); // Log the error for debugging
      res.status(500).json({ error: 'Failed to create quiz', details: error });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
