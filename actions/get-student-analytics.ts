// import { db } from "@/lib/db";
// import { Course, Purchase, QuizAttempt, UserProgress } from "@prisma/client";

// type PurchaseWithCourse = Purchase & {
//   course: Course;
// };

// // Group purchases by course to calculate the number of purchases per course
// const groupPurchasesByCourse = (purchases: PurchaseWithCourse[]) => {
//   const grouped: { [courseTitle: string]: number } = {};

//   purchases.forEach((purchase) => {
//     const courseTitle = purchase.course.title;
//     if (!grouped[courseTitle]) {
//       grouped[courseTitle] = 0;
//     }
//     grouped[courseTitle] += 1; // Increment the count of purchases per course
//   });

//   return grouped;
// };

// export const getAnalytics = async (userId: string) => {
//   try {
//     // Fetch purchases related to the student's courses
//     const purchases = await db.purchase.findMany({
//       where: {
//         userId: userId,
//       },
//       include: {
//         course: true,
//       },
//     });

//     // Calculate the purchase count per course
//     const groupedPurchases = groupPurchasesByCourse(purchases);
//     const data = Object.entries(groupedPurchases).map(([courseTitle, purchaseCount]) => ({
//       name: courseTitle,
//       purchaseCount: purchaseCount, // Use purchaseCount for chart data
//     }));

//     // Total courses purchased by the user
//     const totalCourses = await db.course.count({
//       where: { id: { in: purchases.map((purchase) => purchase.courseId) } },
//     });

//     // Calculate average quiz scores for the user
//     const quizAttempts = await db.quizAttempt.findMany({
//       where: { studentId: userId },
//     });

//     const quizScores = quizAttempts.length > 0 
//       ? quizAttempts.reduce((acc, curr) => acc + curr.score, 0) / quizAttempts.length 
//       : 0;

//     // Usage in the last 24 hours
//     const usageInLast24Hours = await db.message.count({
//       where: {
//         createdAt: {
//           gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
//         },
//         userId: userId,
//       },
//     });

//     // Calculate student progress
//     const userProgressRecords = await db.userProgress.findMany({
//       where: { userId: userId },
//       include: {
//         chapter: true,
//       },
//     });

//     const totalChapters = userProgressRecords.length;
//     const completedChapters = userProgressRecords.filter(record => record.isCompleted).length;

//     const studentProgress = totalChapters > 0 
//       ? (completedChapters / totalChapters) * 100 
//       : 0;

//     // Generate mock daily usage data
//     const dailyUsage = Array.from({ length: 24 }, (_, hour) => ({
//       hour: `${hour.toString().padStart(2, '0')}:00`,
//       users: Math.floor(Math.random() * 100),
//     }));

//     return {
//       data,
//       totalCourses,
//       quizScores,
//       usageInLast24Hours,
//       studentProgress,
//       dailyUsage,
//     };
//   } catch (error) {
//     console.log("[GET_ANALYTICS]", error);
//     return {
//       data: [],
//       totalCourses: 0,
//       quizScores: 0,
//       usageInLast24Hours: 0,
//       studentProgress: 0,
//       dailyUsage: [],
//     };
//   }
// };



// import { db } from "@/lib/db";
// import { User, Profile, Purchase, QuizAttempt, ChapterQuizAttempt, UserProgress, Course, Chapter } from "@prisma/client";

// // Define types to handle optional fields
// type PurchaseWithCourse = Purchase & {
//   course?: Course; // Changed to optional
// };

// type UserProgressWithChapter = UserProgress & {
//   chapter: Chapter;
// };

// type UserWithRelations = User & {
//   profile?: Profile;
//   purchases?: PurchaseWithCourse[];
//   quizAttempts?: QuizAttempt[];
//   chapterQuizAttempts?: ChapterQuizAttempt[];
//   userProgress?: UserProgressWithChapter[];
// };

// const groupPurchasesByCourse = (purchases: PurchaseWithCourse[]) => {
//   const grouped: { [courseTitle: string]: number } = {};

//   purchases.forEach((purchase) => {
//     if (purchase.course) { // Only process if course exists
//       const courseTitle = purchase.course.title;
//       if (!grouped[courseTitle]) {
//         grouped[courseTitle] = 0;
//       }
//       grouped[courseTitle] += 1;
//     }
//   });

//   return grouped;
// };

// export const getAnalytics = async (userId: string) => {
//   try {
//     const user = await db.user.findUnique({
//       where: { id: userId },
//       include: {
//         profile: true,
//         purchases: {
//           include: {
//             course: true, // Make sure to handle null course
//           },
//         },
//         quizAttempts: true,
//         chapterQuizAttempts: true,
//         userProgress: {
//           include: {
//             chapter: true,
//           }
//         }
//       }
//     }) as UserWithRelations | null;

//     if (!user) {
//       throw new Error('User not found');
//     }

//     const purchases: PurchaseWithCourse[] = user.purchases ?? [];
//     const userProgress = user.userProgress ?? [];

//     // Filter out purchases with null courses
//     const validPurchases = purchases.filter(purchase => purchase.course !== null);

//     // Group purchases by course
//     const groupedPurchases = groupPurchasesByCourse(validPurchases);

//     // Time spent - ensure quizAttempts exists
//     const timeSpent = (user.quizAttempts?.length ?? 0) + (user.chapterQuizAttempts?.length ?? 0);

//     // Courses Enrolled
//     const coursesEnrolled = validPurchases.length;

//     // Last Login - ensure quizAttempts exists before accessing
//     const lastLogin = user.quizAttempts && user.quizAttempts.length > 0 
//       ? user.quizAttempts.reduce((latest: QuizAttempt, current: QuizAttempt) => latest.createdAt > current.createdAt ? latest : current).createdAt
//       : null;

//     // Student Level
//     const studentLevel = user.level;

//     // Certificates Earned
//     const certificatesEarned = userProgress.filter(progress => progress.isCompleted).length;

//     // Total Amount Paid
//     const amountPaid = validPurchases.reduce((sum, purchase) => sum + (purchase.course?.price ?? 0), 0);

//     // Current Chapters for Course Progress
//     const currentChapters = userProgress.map(progress => ({
//       courseId: progress.chapter.courseId,
//       chapterTitle: progress.chapter.title,
//     }));

//     // Enrollment Dates for payments view
//     const enrollmentDates = validPurchases.map(purchase => ({
//       courseTitle: purchase.course?.title ?? 'Unknown Course',
//       date: purchase.createdAt,
//       amount: purchase.course?.price ?? 0,
//     }));

//     return {
//       profile: user.profile,
//       timeSpent,
//       coursesEnrolled,
//       lastLogin,
//       studentLevel,
//       certificatesEarned,
//       amountPaid,
//       currentChapters,
//       enrollmentDates
//     };
//   } catch (error) {
//     console.log("[GET_ANALYTICS]", error);
//     return {
//       profile: null,
//       timeSpent: 0,
//       coursesEnrolled: 0,
//       lastLogin: null,
//       studentLevel: 0,
//       certificatesEarned: 0,
//       amountPaid: 0,
//       currentChapters: [],
//       enrollmentDates: [],
//     };
//   }
// };