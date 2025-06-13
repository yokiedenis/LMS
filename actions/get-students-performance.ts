// import { db } from "@/lib/db";

// export const getStudentsPerformance = async () => {
//   try {
//     // Fetch all quiz attempts with student and score data
//     const quizAttempts = await db.quizAttempt.findMany({
//       include: {
//         student: {
//           select: {
//             name: true, // Only include the student's name
//           },
//         },
//       },
//     });

//     // Group scores by student
//     const scoresByStudent: { [studentId: string]: { name: string; totalScore: number; attempts: number } } = {};

//     quizAttempts.forEach((attempt) => {
//       const studentId = attempt.studentId;
//       if (!studentId) return; // Skip if studentId is null or undefined

//       const studentName = attempt.student?.name || "Unknown"; // Optional chaining in case of null

//       if (!scoresByStudent[studentId]) {
//         scoresByStudent[studentId] = {
//           name: studentName,
//           totalScore: 0,
//           attempts: 0,
//         };
//       }

//       scoresByStudent[studentId].totalScore += attempt.score;
//       scoresByStudent[studentId].attempts += 1;
//     });

//     // Calculate average score for each student
//     const studentScores = Object.entries(scoresByStudent).map(([_, { name, totalScore, attempts }]) => ({
//       name,
//       avgScore: totalScore / attempts,
//     }));

//     return studentScores;
//   } catch (error) {
//     console.log("[GET_STUDENTS_PERFORMANCE]", error);
//     return [];
//   }
// };




import { db } from "@/lib/db";

export interface StudentPerformance {
  name: string;
  avgScore: number;
  totalAttempts: number;
  recentPerformance: { score: number; date: Date }[];
}

export const getStudentsPerformance = async (): Promise<StudentPerformance[]> => {
  try {
    // Fetch all quiz attempts with student details, ordered by date for recent performance
    const quizAttempts = await db.quizAttempt.findMany({
      include: {
        student: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Group scores and track recent performance by student
    const performanceByStudent: { [studentId: string]: { name: string; totalScore: number; attempts: number; recent: { score: number; date: Date }[] } } = {};

    quizAttempts.forEach((attempt) => {
      const studentId = attempt.studentId;
      if (!studentId) return; // Skip if studentId is null or undefined

      const studentName = attempt.student?.name || "Unknown";

      if (!performanceByStudent[studentId]) {
        performanceByStudent[studentId] = {
          name: studentName,
          totalScore: 0,
          attempts: 0,
          recent: [],
        };
      }

      performanceByStudent[studentId].totalScore += attempt.score;
      performanceByStudent[studentId].attempts += 1;

      // Store the last 3 recent attempts for trend analysis
      if (performanceByStudent[studentId].recent.length < 3) {
        performanceByStudent[studentId].recent.push({ score: attempt.score, date: attempt.createdAt });
      }
    });

    // Calculate average score and format response
    const studentPerformance = Object.entries(performanceByStudent).map(([_, { name, totalScore, attempts, recent }]) => ({
      name,
      avgScore: attempts > 0 ? Number((totalScore / attempts).toFixed(2)) : 0,
      totalAttempts: attempts,
      recentPerformance: recent,
    }));

    // Sort by average score in descending order
    return studentPerformance.sort((a, b) => b.avgScore - a.avgScore);
  } catch (error) {
    console.error("[GET_STUDENTS_PERFORMANCE]", error);
    return [];
  }
};