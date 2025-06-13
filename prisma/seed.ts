import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create a new quiz with questions and options
  await prisma.quiz.create({
    data: {
      title: "Cybersecurity Basics",
      courseId: "fde6af28-8836-4359-a8f0-cc104fa355cf", // Replace with a valid courseId
      position: 1, // Add a valid position value
      questions: {
        create: [
          {
            questionText: "What is Two-Factor Authentication (2FA)?",
            correctAnswer: "B. Two-Factor Authentication (2FA)",
            options: {
              create: [
                { text: "A. Single-factor authentication" },
                { text: "B. Two-Factor Authentication (2FA)" },
                { text: "C. Password-only authentication" },
              ],
            },
          },
          {
            questionText: "What is a DDoS attack?",
            correctAnswer: "B. Distributed Denial of Service",
            options: {
              create: [
                { text: "A. Denial of Service" },
                { text: "B. Distributed Denial of Service" },
                { text: "C. Direct Denial of Service" },
              ],
            },
          },
        ],
      },
    },
  });

  console.log('Quiz and questions seeded');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
