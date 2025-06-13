// studentAnalyticsService.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Function to calculate total time spent based on UserProgress
function calculateTimeSpent(userProgress: any[]): number {
  // Assuming time spent is tracked in some way in userProgress
  // This is a placeholder logic, adjust based on your actual data structure
  return userProgress.reduce((total, progress) => {
    // Example: if 'timeSpent' is a field in UserProgress
    return total + (progress.timeSpent || 0);
  }, 0);
}

// Function to get the last login time
async function getLastLogin(studentId: string): Promise<Date | null> {
    const lastLogin = await prisma.logging.findFirst({
      where: { userId: studentId },
      orderBy: { createdAt: 'desc' }
    });
    return lastLogin ? lastLogin.createdAt : null;
  }

// Function to calculate total amount paid
function calculateTotalPaid(purchases: any[]): number {
  // Summing up the price of all courses purchased
  return purchases.reduce((total, purchase) => {
    // Assuming 'price' is a field in the Course model
    return total + (purchase.course.price || 0);
  }, 0);
}

// Function to get current chapters in enrolled courses
function getCurrentChapters(userProgress: any[], purchases: any[]): { courseTitle: string, courseId: string, chapterTitle: string }[] {
  const currentChapters = [];
  for (const purchase of purchases) {
    const progress = userProgress.find(prog => prog.chapter.courseId === purchase.courseId);
    if (progress) {
      currentChapters.push({
        courseTitle: purchase.course.title,
        courseId: purchase.courseId,
        chapterTitle: progress.chapter.title
      });
    }
  }
  return currentChapters;
}

// Function to calculate certificates earned
function calculateCertificatesEarned(quizAttempts: any[]): number {
  // Assuming a certificate is earned if a student scores above a certain threshold
  const threshold = 80; // Example threshold, adjust as needed
  return quizAttempts.filter(attempt => attempt.score / attempt.totalQuestions * 100 >= threshold).length;
}

export async function getStudentAnalytics(studentId: string) {
  const student = await prisma.user.findUnique({
    where: { id: studentId },
    include: {
      purchases: {
        include: {
          course: {
            include: {
              chapters: true
            }
          }
        }
      },
      userProgress: true,
      profile: true,
      quizAttempts: true
    }
  });

  if (!student) {
    throw new Error('Student not found');
  }

  // Calculating analytics
  const analytics = {
    timeSpent: calculateTimeSpent(student.userProgress),
    coursesEnrolled: student.purchases.length,
    lastLogin: await getLastLogin(studentId),
    enrollmentDates: student.purchases.map(p => ({
      courseTitle: p.course.title,
      date: p.createdAt
    })),
    amountPaid: calculateTotalPaid(student.purchases),
    currentChapters: getCurrentChapters(student.userProgress, student.purchases),
    certificatesEarned: calculateCertificatesEarned(student.quizAttempts),
    studentLevel: student.level
  };

  return analytics;
}