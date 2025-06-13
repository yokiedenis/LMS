// checkQuestions.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkQuestions() {
  const questionsWithEmptyText = await prisma.question.findMany({
    where: {
      questionText: { 
        equals: ''  // Find all questions with an empty questionText
      },
    },
  });

  console.log('Questions with empty questionText:', questionsWithEmptyText);
}

checkQuestions().finally(() => prisma.$disconnect());
