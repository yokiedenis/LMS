// import { db } from "@/lib/db";
// import { Course, Purchase, Profile, UserProgress, Transaction, Logging } from "@prisma/client";

// type PurchaseWithCourseAndTransaction = Purchase & {
//   course: Course;
//   transaction: Transaction | null;
// };

// type UserDetails = {
//   name: string;
//   imageUrl: string;
//   coursesEnrolled: number;
//   lastLogin: Date;
//   dateOfEnrollment: Date;
//   studentLevel: number;
//   certificatesEarned: number;
//   enrolledCourses: {
//     courseTitle: string;
//     amountPaid: number;
//   }[];
//   timeSpent: number; // In seconds
// };

// const groupByCourse = (purchases: PurchaseWithCourseAndTransaction[]) => {
//   const grouped: { [courseTitle: string]: number } = {};
  
//   purchases.forEach((purchase) => {
//     const courseTitle = purchase.course.title;
//     if (!grouped[courseTitle]) {
//       grouped[courseTitle] = 0;
//     }
//     grouped[courseTitle] += purchase.transaction?.amount || 0; 
//   });

//   return grouped;
// };

// export const getAnalytics = async (userId: string) => {
//   try {
//     const purchases = await db.purchase.findMany({
//       where: {
//         course: {
//           userId: userId
//         }
//       },
//       include: {
//         course: true,
//         transaction: true 
//       }
//     });

//     const users = await db.user.findMany({
//       include: {
//         profile: true,
//         purchases: {
//           include: {
//             course: true,
//             transaction: true
//           }
//         },
//         userProgress: true,
//       }
//     });

//     const groupedEarnings = groupByCourse(purchases as PurchaseWithCourseAndTransaction[]);
//     const data = Object.entries(groupedEarnings).map(([courseTitle, total]) => ({
//       name: courseTitle,
//       total: total,
//     }));

//     const totalRevenue = data.reduce((acc, curr) => acc + curr.total, 0);
//     const totalSales = purchases.length;
//     const totalUsers = users.length;

//     const userDetails: UserDetails[] = await Promise.all(users.map(async (user) => {
//       // Calculate time spent from login to logout events
//       const userLogs = await db.logging.findMany({
//         where: {
//           userId: user.id,
//           url: { in: ["/login", "/logout"] } // Assuming login and logout are logged this way
//         },
//         orderBy: { createdAt: 'asc' }
//       });

//       let totalTimeSpent = 0;
//       let lastLogin: Date | null = null;

//       for (let i = 0; i < userLogs.length; i++) {
//         if (userLogs[i].url === "/login") {
//           lastLogin = userLogs[i].createdAt;
//         } else if (lastLogin && userLogs[i].url === "/logout") {
//           totalTimeSpent += (userLogs[i].createdAt.getTime() - lastLogin.getTime()) / 1000; // Convert milliseconds to seconds
//           lastLogin = null; // Reset for next login
//         }
//       }

//       return {
//         name: user.name,
//         imageUrl: user.profile?.imageUrl || '',
//         coursesEnrolled: user.purchases.length,
//         lastLogin: user.profile?.updatedAt || new Date(),
//         dateOfEnrollment: user.profile?.createdAt || new Date(),
//         studentLevel: user.userProgress[0]?.level || 1,
//         certificatesEarned: user.profile?.certificatesEarned || 0,
//         enrolledCourses: user.purchases.map(purchase => ({
//           courseTitle: purchase.course.title,
//           amountPaid: purchase.transaction?.amount || 0
//         })),
//         timeSpent: totalTimeSpent
//       };
//     }));

//     return {
//       data,
//       totalRevenue,
//       totalSales,
//       totalUsers,
//       totalEnrolledCourses, // New field added
//       userDetails,
//     }
//   } catch (error) {
//     console.log("[GET_ANALYTICS]", error);
//     return {
//       data: [],
//       totalRevenue: 0,
//       totalSales: 0,
//       totalUsers: 0,
//       totalEnrolledCourses: 0, // Default value in case of error
//       userDetails: [],
//     }
//   }
// }





// import { db } from "@/lib/db";
// import { Course, Purchase, Profile, UserProgress, Transaction, Logging } from "@prisma/client";

// type PurchaseWithCourseAndTransaction = Purchase & {
//   course: Course;
//   transaction: Transaction | null;
// };

// type UserDetails = {
//   name: string;
//   imageUrl: string;
//   coursesEnrolled: number;
//   lastLogin: Date;
//   dateOfEnrollment: Date;
//   studentLevel: number;
//   certificatesEarned: number;
//   enrolledCourses: {
//     courseTitle: string;
//     amountPaid: number;
//   }[];
//   timeSpent: number; // In seconds
// };

// // Define the return type for getAnalytics
// type AnalyticsData = {
//   data: { name: string; total: number }[];
//   totalRevenue: number;
//   totalSales: number;
//   totalUsers: number;
//   totalEnrolledCourses: number; // Add the new field to the type
//   userDetails: UserDetails[];
// };

// const groupByCourse = (purchases: PurchaseWithCourseAndTransaction[]) => {
//   const grouped: { [courseTitle: string]: number } = {};
  
//   purchases.forEach((purchase) => {
//     const courseTitle = purchase.course.title;
//     if (!grouped[courseTitle]) {
//       grouped[courseTitle] = 0;
//     }
//     grouped[courseTitle] += purchase.transaction?.amount || 0; 
//   });

//   return grouped;
// };

// // Explicitly type the return value of the function
// export const getAnalytics = async (userId: string): Promise<AnalyticsData> => {
//   try {
//     const purchases = await db.purchase.findMany({
//       where: {
//         course: {
//           userId: userId
//         }
//       },
//       include: {
//         course: true,
//         transaction: true 
//       }
//     });

//     const users = await db.user.findMany({
//       include: {
//         profile: true,
//         purchases: {
//           include: {
//             course: true,
//             transaction: true
//           }
//         },
//         userProgress: true,
//       }
//     });

//     const groupedEarnings = groupByCourse(purchases as PurchaseWithCourseAndTransaction[]);
//     const data = Object.entries(groupedEarnings).map(([courseTitle, total]) => ({
//       name: courseTitle,
//       total: total,
//     }));

//     const totalRevenue = data.reduce((acc, curr) => acc + curr.total, 0);
//     const totalSales = purchases.length;
//     const totalUsers = users.length;

//     // Calculate total enrolled courses (unique courseIds from purchases)
//     const uniqueCourseIds = new Set(purchases.map((purchase) => purchase.courseId));
//     const totalEnrolledCourses = uniqueCourseIds.size;

//     const userDetails: UserDetails[] = await Promise.all(users.map(async (user) => {
//       const userLogs = await db.logging.findMany({
//         where: {
//           userId: user.id,
//           url: { in: ["/login", "/logout"] }
//         },
//         orderBy: { createdAt: 'asc' }
//       });

//       let totalTimeSpent = 0;
//       let lastLogin: Date | null = null;

//       for (let i = 0; i < userLogs.length; i++) {
//         if (userLogs[i].url === "/login") {
//           lastLogin = userLogs[i].createdAt;
//         } else if (lastLogin && userLogs[i].url === "/logout") {
//           totalTimeSpent += (userLogs[i].createdAt.getTime() - lastLogin.getTime()) / 1000;
//           lastLogin = null;
//         }
//       }

//       return {
//         name: user.name,
//         imageUrl: user.profile?.imageUrl || '',
//         coursesEnrolled: user.purchases.length,
//         lastLogin: user.profile?.updatedAt || new Date(),
//         dateOfEnrollment: user.profile?.createdAt || new Date(),
//         studentLevel: user.userProgress[0]?.level || 1,
//         certificatesEarned: user.profile?.certificatesEarned || 0,
//         enrolledCourses: user.purchases.map(purchase => ({
//           courseTitle: purchase.course.title,
//           amountPaid: purchase.transaction?.amount || 0
//         })),
//         timeSpent: totalTimeSpent
//       };
//     }));

//     return {
//       data,
//       totalRevenue,
//       totalSales,
//       totalUsers,
//       totalEnrolledCourses, // Now properly declared and initialized
//       userDetails,
//     };
//   } catch (error) {
//     console.log("[GET_ANALYTICS]", error);
//     return {
//       data: [],
//       totalRevenue: 0,
//       totalSales: 0,
//       totalUsers: 0,
//       totalEnrolledCourses: 0, // Default value in case of error
//       userDetails: [],
//     };
//   }
// };





// import { db } from "@/lib/db";
// import { Course, Purchase, Profile, UserProgress, Transaction, Logging } from "@prisma/client";

// type PurchaseWithCourseAndTransaction = Purchase & {
//   course: Course;
//   transaction: Transaction | null;
// };

// type UserDetails = {
//   name: string;
//   imageUrl: string;
//   coursesEnrolled: number;
//   lastLogin: Date;
//   dateOfEnrollment: Date;
//   studentLevel: number;
//   certificatesEarned: number;
//   enrolledCourses: {
//     courseTitle: string;
//     amountPaid: number;
//   }[];
//   timeSpent: number; // In seconds
// };

// type AnalyticsData = {
//   data: { name: string; total: number }[];
//   totalRevenue: number;
//   totalSales: number;
//   totalUsers: number;
//   totalEnrolledCourses: number;
//   userDetails: UserDetails[];
// };

// const groupByCourse = (purchases: PurchaseWithCourseAndTransaction[]) => {
//   const grouped: { [courseTitle: string]: number } = {};

//   purchases.forEach((purchase) => {
//     const courseTitle = purchase.course.title;
//     // Initialize the course in grouped if not already present
//     if (!grouped[courseTitle]) {
//       grouped[courseTitle] = 0;
//     }
//     // Only include transactions that exist and have a valid amount
//     if (purchase.transaction && typeof purchase.transaction.amount === 'number' && purchase.transaction.amount > 0) {
//       grouped[courseTitle] += purchase.transaction.amount;
//     } else {
//       // Log cases where transaction is missing or amount is invalid
//       console.log(`[GROUP_BY_COURSE] Skipping purchase for course "${courseTitle}": transaction is ${purchase.transaction ? 'present but invalid amount' : 'null'}`);
//     }
//   });

//   return grouped;
// };

// export const getAnalytics = async (userId: string): Promise<AnalyticsData> => {
//   try {
//     const purchases = await db.purchase.findMany({
//       where: {
//         course: {
//           userId: userId,
//         },
//       },
//       include: {
//         course: true,
//         transaction: true,
//       },
//     });

//     const users = await db.user.findMany({
//       include: {
//         profile: true,
//         purchases: {
//           include: {
//             course: true,
//             transaction: true,
//           },
//         },
//         userProgress: true,
//       },
//     });

//     const groupedEarnings = groupByCourse(purchases as PurchaseWithCourseAndTransaction[]);
//     const data = Object.entries(groupedEarnings).map(([courseTitle, total]) => ({
//       name: courseTitle,
//       total: total,
//     }));

//     // Calculate totalRevenue from valid transactions
//     const totalRevenue = data.reduce((acc, curr) => acc + curr.total, 0);
//     const totalSales = purchases.length;
//     const totalUsers = users.length;

//     // Calculate total enrolled courses (unique courseIds from purchases)
//     const uniqueCourseIds = new Set(purchases.map((purchase) => purchase.courseId));
//     const totalEnrolledCourses = uniqueCourseIds.size;

//     const userDetails: UserDetails[] = await Promise.all(
//       users.map(async (user) => {
//         const userLogs = await db.logging.findMany({
//           where: {
//             userId: user.id,
//             url: { in: ["/login", "/logout"] },
//           },
//           orderBy: { createdAt: "asc" },
//         });

//         let totalTimeSpent = 0;
//         let lastLogin: Date | null = null;

//         for (let i = 0; i < userLogs.length; i++) {
//           if (userLogs[i].url === "/login") {
//             lastLogin = userLogs[i].createdAt;
//           } else if (lastLogin && userLogs[i].url === "/logout") {
//             totalTimeSpent += (userLogs[i].createdAt.getTime() - lastLogin.getTime()) / 1000;
//             lastLogin = null;
//           }
//         }

//         return {
//           name: user.name || "Unknown User",
//           imageUrl: user.profile?.imageUrl || "",
//           coursesEnrolled: user.purchases.length,
//           lastLogin: user.profile?.updatedAt || new Date(),
//           dateOfEnrollment: user.profile?.createdAt || new Date(),
//           studentLevel: user.userProgress[0]?.level || 1,
//           certificatesEarned: user.profile?.certificatesEarned || 0,
//           enrolledCourses: user.purchases.map((purchase) => ({
//             courseTitle: purchase.course.title,
//             amountPaid: purchase.transaction?.amount || 0,
//           })),
//           timeSpent: totalTimeSpent,
//         };
//       })
//     );

//     // Log the final analytics data for debugging
//     console.log("[GET_ANALYTICS] Analytics data:", {
//       totalRevenue,
//       totalSales,
//       totalUsers,
//       totalEnrolledCourses,
//       data,
//     });

//     return {
//       data,
//       totalRevenue,
//       totalSales,
//       totalUsers,
//       totalEnrolledCourses,
//       userDetails,
//     };
//   } catch (error) {
//     console.log("[GET_ANALYTICS] Error:", error);
//     return {
//       data: [],
//       totalRevenue: 0,
//       totalSales: 0,
//       totalUsers: 0,
//       totalEnrolledCourses: 0,
//       userDetails: [],
//     };
//   }
// };



















// import { db } from "@/lib/db";
// import { Course, Purchase, Profile, UserProgress, Transaction, Logging, Chapter } from "@prisma/client";

// type PurchaseWithCourseAndTransaction = Purchase & {
//   course: Course & { chapters: Chapter[] }; // Include chapters in the course type
//   transaction: Transaction | null;
// };

// type UserDetails = {
//   id: string;
//   name: string;
//   email: string;
//   imageUrl: string;
//   coursesEnrolled: number;
//   lastLogin: Date;
//   dateOfEnrollment: Date;
//   studentLevel: number;
//   certificatesEarned: number;
//   enrolledCourses: {
//     courseTitle: string;
//     amountPaid: number;
//     progress: number;
//   }[];
//   timeSpent: number;
//   totalSpent: number;
// };

// type RecentActivity = {
//   id: string;
//   userId: string;
//   userName: string;
//   action: string;
//   courseTitle?: string;
//   timestamp: Date;
// };

// type CourseProgressData = {
//   name: string;
//   value: number;
// }[];

// type RevenueTrendData = {
//   month: string;
//   revenue: number;
// }[];

// type TopCourse = {
//   id: string;
//   title: string;
//   enrollments: number;
//   revenue: number;
// };

// type AnalyticsData = {
//   data: { name: string; total: number }[];
//   totalRevenue: number;
//   totalSales: number;
//   totalUsers: number;
//   totalEnrolledCourses: number;
//   userDetails: UserDetails[];
//   recentActivity: RecentActivity[];
//   courseProgressData: CourseProgressData;
//   revenueTrendData: RevenueTrendData;
//   topCourses: TopCourse[];
// };

// const groupByCourse = (purchases: PurchaseWithCourseAndTransaction[]) => {
//   const grouped: { [courseTitle: string]: number } = {};

//   purchases.forEach((purchase) => {
//     const courseTitle = purchase.course.title;
//     if (!grouped[courseTitle]) {
//       grouped[courseTitle] = 0;
//     }
//     if (purchase.transaction && typeof purchase.transaction.amount === 'number' && purchase.transaction.amount > 0) {
//       grouped[courseTitle] += purchase.transaction.amount;
//     }
//   });

//   return grouped;
// };

// const getLast12MonthsRevenue = (purchases: PurchaseWithCourseAndTransaction[]) => {
//   const months = [
//     'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
//     'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
//   ];
  
//   const currentDate = new Date();
//   const revenueByMonth: { [key: string]: number } = {};

//   // Initialize all months with 0 revenue
//   for (let i = 11; i >= 0; i--) {
//     const date = new Date(currentDate);
//     date.setMonth(date.getMonth() - i);
//     const monthKey = `${months[date.getMonth()]} ${date.getFullYear()}`;
//     revenueByMonth[monthKey] = 0;
//   }

//   // Populate with actual revenue data
//   purchases.forEach((purchase) => {
//     if (purchase.transaction && purchase.transaction.amount > 0) {
//       const purchaseDate = purchase.transaction.createdAt;
//       const monthKey = `${months[purchaseDate.getMonth()]} ${purchaseDate.getFullYear()}`;
      
//       // Only include if within the last 12 months
//       const twelveMonthsAgo = new Date(currentDate);
//       twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);
      
//       if (purchaseDate >= twelveMonthsAgo) {
//         revenueByMonth[monthKey] = (revenueByMonth[monthKey] || 0) + purchase.transaction.amount;
//       }
//     }
//   });

//   return Object.entries(revenueByMonth).map(([month, revenue]) => ({
//     month,
//     revenue
//   }));
// };

// export const getAnalytics = async (userId: string): Promise<AnalyticsData> => {
//   try {
//     const purchases = await db.purchase.findMany({
//       where: {
//         course: {
//           userId: userId,
//         },
//       },
//       include: {
//         course: {
//           include: {
//             chapters: true, // Include chapters in the course query
//           },
//         },
//         transaction: true,
//       },
//     });

//     const users = await db.user.findMany({
//       include: {
//         profile: true,
//         purchases: {
//           include: {
//             course: {
//               include: {
//                 chapters: true, // Include chapters in user purchases as well
//               },
//             },
//             transaction: true,
//           },
//         },
//         userProgress: true,
//         transactions: true,
//       },
//     });

//     const groupedEarnings = groupByCourse(purchases as PurchaseWithCourseAndTransaction[]);
//     const data = Object.entries(groupedEarnings).map(([courseTitle, total]) => ({
//       name: courseTitle,
//       total: total,
//     }));

//     const totalRevenue = data.reduce((acc, curr) => acc + curr.total, 0);
//     const totalSales = purchases.length;
//     const totalUsers = users.length;
//     const uniqueCourseIds = new Set(purchases.map((purchase) => purchase.courseId));
//     const totalEnrolledCourses = uniqueCourseIds.size;

//     // Calculate course progress distribution
//     const progressCounts = {
//       '0-25%': 0,
//       '26-50%': 0,
//       '51-75%': 0,
//       '76-99%': 0,
//       'Completed': 0
//     };

//     users.forEach(user => {
//       const completedCount = user.userProgress.filter(up => up.isCompleted).length;
//       const totalCount = user.userProgress.length;
//       const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

//       if (progressPercentage === 100) {
//         progressCounts['Completed']++;
//       } else if (progressPercentage >= 76) {
//         progressCounts['76-99%']++;
//       } else if (progressPercentage >= 51) {
//         progressCounts['51-75%']++;
//       } else if (progressPercentage >= 26) {
//         progressCounts['26-50%']++;
//       } else {
//         progressCounts['0-25%']++;
//       }
//     });

//     const courseProgressData = Object.entries(progressCounts).map(([name, value]) => ({
//       name,
//       value
//     }));

//     // Get revenue trend data for last 12 months
//     const revenueTrendData = getLast12MonthsRevenue(purchases as PurchaseWithCourseAndTransaction[]);

//     // Get top courses by enrollment and revenue
//     const courseEnrollmentMap = new Map<string, { enrollments: number, revenue: number }>();
    
//     purchases.forEach(purchase => {
//       const courseId = purchase.courseId;
//       const current = courseEnrollmentMap.get(courseId) || { enrollments: 0, revenue: 0 };
      
//       current.enrollments += 1;
//       if (purchase.transaction) {
//         current.revenue += purchase.transaction.amount;
//       }
      
//       courseEnrollmentMap.set(courseId, current);
//     });

//     const topCourses = Array.from(courseEnrollmentMap.entries())
//       .map(([courseId, data]) => {
//         const course = purchases.find(p => p.courseId === courseId)?.course;
//         return {
//           id: courseId,
//           title: course?.title || 'Unknown Course',
//           enrollments: data.enrollments,
//           revenue: data.revenue
//         };
//       })
//       .sort((a, b) => b.enrollments - a.enrollments)
//       .slice(0, 5);

//     // Get recent activity (last 10 purchases)
//     const recentActivity: RecentActivity[] = purchases
//       .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
//       .slice(0, 10)
//       .map(purchase => ({
//         id: purchase.id,
//         userId: purchase.userId,
//         userName: users.find(u => u.id === purchase.userId)?.name || 'Unknown User',
//         action: 'Enrolled in course',
//         courseTitle: purchase.course.title,
//         timestamp: purchase.createdAt
//       }));

//     const userDetails: UserDetails[] = await Promise.all(
//       users.map(async (user) => {
//         const userLogs = await db.logging.findMany({
//           where: {
//             userId: user.id,
//             url: { in: ["/login", "/logout"] },
//           },
//           orderBy: { createdAt: "asc" },
//         });

//         let totalTimeSpent = 0;
//         let lastLogin: Date | null = null;

//         for (let i = 0; i < userLogs.length; i++) {
//           if (userLogs[i].url === "/login") {
//             lastLogin = userLogs[i].createdAt;
//           } else if (lastLogin && userLogs[i].url === "/logout") {
//             totalTimeSpent += (userLogs[i].createdAt.getTime() - lastLogin.getTime()) / 1000;
//             lastLogin = null;
//           }
//         }

//         // Calculate course progress for each enrolled course
//         const enrolledCourses = user.purchases.map(purchase => {
//           const progress = user.userProgress
//             .filter(up => up.courseId === purchase.courseId)
//             .reduce((acc, curr) => acc + (curr.isCompleted ? 1 : 0), 0);
          
//           const totalChapters = purchase.course.chapters.length || 1;
//           const progressPercentage = Math.round((progress / totalChapters) * 100);

//           return {
//             courseTitle: purchase.course.title,
//             amountPaid: purchase.transaction?.amount || 0,
//             progress: progressPercentage
//           };
//         });

//         const totalSpent = user.transactions.reduce((sum, txn) => sum + txn.amount, 0);

//         return {
//           id: user.id,
//           name: user.name || "Unknown User",
//           email: user.email,
//           imageUrl: user.profile?.imageUrl || "/default-avatar.png",
//           coursesEnrolled: user.purchases.length,
//           lastLogin: lastLogin || user.profile?.updatedAt || new Date(),
//           dateOfEnrollment: user.profile?.createdAt || new Date(),
//           studentLevel: user.userProgress[0]?.level || 1,
//           certificatesEarned: user.profile?.certificatesEarned || 0,
//           enrolledCourses,
//           timeSpent: totalTimeSpent,
//           totalSpent
//         };
//       })
//     );

//     return {
//       data,
//       totalRevenue,
//       totalSales,
//       totalUsers,
//       totalEnrolledCourses,
//       userDetails,
//       recentActivity,
//       courseProgressData,
//       revenueTrendData,
//       topCourses
//     };
//   } catch (error) {
//     console.error("[GET_ANALYTICS] Error:", error);
//     return {
//       data: [],
//       totalRevenue: 0,
//       totalSales: 0,
//       totalUsers: 0,
//       totalEnrolledCourses: 0,
//       userDetails: [],
//       recentActivity: [],
//       courseProgressData: [],
//       revenueTrendData: [],
//       topCourses: []
//     };
//   }
// };








// get-analytics.ts
// import { db } from "@/lib/db";
// import { Course, Purchase, Profile, UserProgress, Transaction, Logging, Chapter } from "@prisma/client";

// type PurchaseWithCourseAndTransaction = Purchase & {
//   course: Course & { chapters: Chapter[] };
//   transaction: Transaction | null;
// };

// type UserDetails = {
//   id: string;
//   name: string;
//   email: string;
//   imageUrl: string;
//   coursesEnrolled: number;
//   lastLogin: Date;
//   dateOfEnrollment: Date;
//   studentLevel: number;
//   certificatesEarned: number;
//   enrolledCourses: {
//     courseTitle: string;
//     amountPaid: number;
//     progress: number;
//   }[];
//   timeSpent: number;
//   totalSpent: number;
// };

// type RecentActivity = {
//   id: string;
//   userId: string;
//   userName: string;
//   action: string;
//   courseTitle?: string;
//   timestamp: Date;
// };

// type CourseProgressData = {
//   name: string;
//   value: number;
// }[];

// type RevenueTrendData = {
//   month: string;
//   revenue: number;
// }[];

// type TopCourse = {
//   id: string;
//   title: string;
//   enrollments: number;
//   revenue: number;
// };

// type AnalyticsData = {
//   data: { name: string; total: number }[];
//   totalRevenue: number;
//   totalSales: number;
//   totalUsers: number;
//   totalEnrolledCourses: number;
//   userDetails: UserDetails[];
//   recentActivity: RecentActivity[];
//   courseProgressData: CourseProgressData;
//   revenueTrendData: RevenueTrendData;
//   topCourses: TopCourse[];
// };

// const groupByCourse = (purchases: PurchaseWithCourseAndTransaction[]) => {
//   const grouped: { [courseTitle: string]: number } = {};

//   purchases.forEach((purchase) => {
//     const courseTitle = purchase.course.title;
//     if (!grouped[courseTitle]) {
//       grouped[courseTitle] = 0;
//     }
//     if (purchase.transaction && purchase.transaction.amount > 0) {
//       grouped[courseTitle] += purchase.transaction.amount;
//     }
//   });

//   return grouped;
// };

// const getLast12MonthsRevenue = (purchases: PurchaseWithCourseAndTransaction[]) => {
//   const months = [
//     'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
//     'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
//   ];
  
//   const currentDate = new Date();
//   const revenueByMonth: { [key: string]: number } = {};

//   // Initialize all months with 0 revenue
//   for (let i = 11; i >= 0; i--) {
//     const date = new Date(currentDate);
//     date.setMonth(date.getMonth() - i);
//     const monthKey = `${months[date.getMonth()]} ${date.getFullYear()}`;
//     revenueByMonth[monthKey] = 0;
//   }

//   // Populate with actual revenue data
//   purchases.forEach((purchase) => {
//     if (purchase.transaction && purchase.transaction.amount > 0) {
//       const purchaseDate = purchase.transaction.createdAt;
//       const monthKey = `${months[purchaseDate.getMonth()]} ${purchaseDate.getFullYear()}`;
      
//       // Only include if within the last 12 months
//       const twelveMonthsAgo = new Date(currentDate);
//       twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);
      
//       if (purchaseDate >= twelveMonthsAgo) {
//         revenueByMonth[monthKey] = (revenueByMonth[monthKey] || 0) + purchase.transaction.amount;
//       }
//     }
//   });

//   return Object.entries(revenueByMonth).map(([month, revenue]) => ({
//     month,
//     revenue
//   }));
// };

// export const getAnalytics = async (userId: string): Promise<AnalyticsData> => {
//   try {
//     const purchases = await db.purchase.findMany({
//       where: {
//         course: {
//           userId: userId,
//         },
//       },
//       include: {
//         course: {
//           include: {
//             chapters: true,
//           },
//         },
//         transaction: true,
//       },
//     });

//     const users = await db.user.findMany({
//       include: {
//         profile: true,
//         purchases: {
//           include: {
//             course: {
//               include: {
//                 chapters: true,
//               },
//             },
//             transaction: true,
//           },
//         },
//         userProgress: true,
//         transactions: true,
//       },
//     });

//     // Calculate total revenue from all transactions
//     const totalRevenue = purchases.reduce((sum, purchase) => {
//       return sum + (purchase.transaction?.amount || 0);
//     }, 0);

//     const groupedEarnings = groupByCourse(purchases as PurchaseWithCourseAndTransaction[]);
//     const data = Object.entries(groupedEarnings).map(([courseTitle, total]) => ({
//       name: courseTitle,
//       total: total,
//     }));

//     const totalSales = purchases.length;
//     const totalUsers = users.length;
//     const uniqueCourseIds = new Set(purchases.map((purchase) => purchase.courseId));
//     const totalEnrolledCourses = uniqueCourseIds.size;

//     // Calculate course progress distribution
//     const progressCounts = {
//       '0-25%': 0,
//       '26-50%': 0,
//       '51-75%': 0,
//       '76-99%': 0,
//       'Completed': 0
//     };

//     users.forEach(user => {
//       const completedCount = user.userProgress.filter(up => up.isCompleted).length;
//       const totalCount = user.userProgress.length;
//       const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

//       if (progressPercentage === 100) {
//         progressCounts['Completed']++;
//       } else if (progressPercentage >= 76) {
//         progressCounts['76-99%']++;
//       } else if (progressPercentage >= 51) {
//         progressCounts['51-75%']++;
//       } else if (progressPercentage >= 26) {
//         progressCounts['26-50%']++;
//       } else {
//         progressCounts['0-25%']++;
//       }
//     });

//     const courseProgressData = Object.entries(progressCounts).map(([name, value]) => ({
//       name,
//       value
//     }));

//     // Get revenue trend data for last 12 months
//     const revenueTrendData = getLast12MonthsRevenue(purchases as PurchaseWithCourseAndTransaction[]);

//     // Get top courses by enrollment and revenue
//     const courseEnrollmentMap = new Map<string, { enrollments: number, revenue: number }>();
    
//     purchases.forEach(purchase => {
//       const courseId = purchase.courseId;
//       const current = courseEnrollmentMap.get(courseId) || { enrollments: 0, revenue: 0 };
      
//       current.enrollments += 1;
//       if (purchase.transaction) {
//         current.revenue += purchase.transaction.amount;
//       }
      
//       courseEnrollmentMap.set(courseId, current);
//     });

//     const topCourses = Array.from(courseEnrollmentMap.entries())
//       .map(([courseId, data]) => {
//         const course = purchases.find(p => p.courseId === courseId)?.course;
//         return {
//           id: courseId,
//           title: course?.title || 'Unknown Course',
//           enrollments: data.enrollments,
//           revenue: data.revenue
//         };
//       })
//       .sort((a, b) => b.enrollments - a.enrollments)
//       .slice(0, 5);

//     // Get recent activity (last 10 purchases)
//     const recentActivity: RecentActivity[] = purchases
//       .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
//       .slice(0, 10)
//       .map(purchase => ({
//         id: purchase.id,
//         userId: purchase.userId,
//         userName: users.find(u => u.id === purchase.userId)?.name || 'Unknown User',
//         action: 'Enrolled in course',
//         courseTitle: purchase.course.title,
//         timestamp: purchase.createdAt
//       }));

//     const userDetails: UserDetails[] = await Promise.all(
//       users.map(async (user) => {
//         const userLogs = await db.logging.findMany({
//           where: {
//             userId: user.id,
//             url: { in: ["/login", "/logout"] },
//           },
//           orderBy: { createdAt: "asc" },
//         });

//         let totalTimeSpent = 0;
//         let lastLogin: Date | null = null;

//         for (let i = 0; i < userLogs.length; i++) {
//           if (userLogs[i].url === "/login") {
//             lastLogin = userLogs[i].createdAt;
//           } else if (lastLogin && userLogs[i].url === "/logout") {
//             totalTimeSpent += (userLogs[i].createdAt.getTime() - lastLogin.getTime()) / 1000;
//             lastLogin = null;
//           }
//         }

//         // Calculate course progress for each enrolled course
//         const enrolledCourses = user.purchases.map(purchase => {
//           const progress = user.userProgress
//             .filter(up => up.courseId === purchase.courseId)
//             .reduce((acc, curr) => acc + (curr.isCompleted ? 1 : 0), 0);
          
//           const totalChapters = purchase.course.chapters.length || 1;
//           const progressPercentage = Math.round((progress / totalChapters) * 100);

//           return {
//             courseTitle: purchase.course.title,
//             amountPaid: purchase.transaction?.amount || 0,
//             progress: progressPercentage
//           };
//         });

//         const totalSpent = user.transactions.reduce((sum, txn) => sum + txn.amount, 0);

//         return {
//           id: user.id,
//           name: user.name || "Unknown User",
//           email: user.email,
//           imageUrl: user.profile?.imageUrl || "/default-avatar.png",
//           coursesEnrolled: user.purchases.length,
//           lastLogin: lastLogin || user.profile?.updatedAt || new Date(),
//           dateOfEnrollment: user.profile?.createdAt || new Date(),
//           studentLevel: user.userProgress[0]?.level || 1,
//           certificatesEarned: user.profile?.certificatesEarned || 0,
//           enrolledCourses,
//           timeSpent: totalTimeSpent,
//           totalSpent
//         };
//       })
//     );

//     return {
//       data,
//       totalRevenue,
//       totalSales,
//       totalUsers,
//       totalEnrolledCourses,
//       userDetails,
//       recentActivity,
//       courseProgressData,
//       revenueTrendData,
//       topCourses
//     };
//   } catch (error) {
//     console.error("[GET_ANALYTICS] Error:", error);
//     return {
//       data: [],
//       totalRevenue: 0,
//       totalSales: 0,
//       totalUsers: 0,
//       totalEnrolledCourses: 0,
//       userDetails: [],
//       recentActivity: [],
//       courseProgressData: [],
//       revenueTrendData: [],
//       topCourses: []
//     };
//   }
// };









// import { db } from "@/lib/db";
// import { Course, Purchase, Profile, UserProgress, Transaction, Logging, Chapter } from "@prisma/client";

// type PurchaseWithCourseAndTransaction = Purchase & {
//   course: Course & { chapters: Chapter[] };
//   transaction: Transaction | null;
// };

// type UserDetails = {
//   id: string;
//   name: string;
//   email: string;
//   imageUrl: string;
//   coursesEnrolled: number;
//   lastLogin: Date;
//   dateOfEnrollment: Date;
//   studentLevel: number;
//   certificatesEarned: number;
//   enrolledCourses: {
//     courseTitle: string;
//     amountPaid: number;
//     progress: number;
//   }[];
//   timeSpent: number;
//   totalSpent: number;
// };

// type RecentActivity = {
//   id: string;
//   userId: string;
//   userName: string;
//   action: string;
//   courseTitle?: string;
//   timestamp: Date;
// };

// type CourseProgressData = {
//   name: string;
//   value: number;
// }[];

// type RevenueTrendData = {
//   month: string;
//   revenue: number;
// }[];

// type TopCourse = {
//   id: string;
//   title: string;
//   enrollments: number;
//   revenue: number;
// };

// type AnalyticsData = {
//   data: { name: string; total: number }[];
//   totalRevenue: number;
//   totalSales: number;
//   totalUsers: number;
//   totalEnrolledCourses: number;
//   userDetails: UserDetails[];
//   recentActivity: RecentActivity[];
//   courseProgressData: CourseProgressData;
//   revenueTrendData: RevenueTrendData;
//   topCourses: TopCourse[];
// };

// const groupByCourse = (purchases: PurchaseWithCourseAndTransaction[]) => {
//   const grouped: { [courseTitle: string]: number } = {};

//   purchases.forEach((purchase) => {
//     const courseTitle = purchase.course.title;
//     if (!grouped[courseTitle]) {
//       grouped[courseTitle] = 0;
//     }
//     if (purchase.transaction && purchase.transaction.amount > 0) {
//       grouped[courseTitle] += purchase.transaction.amount;
//     }
//   });

//   return grouped;
// };

// const getLast12MonthsRevenue = (purchases: PurchaseWithCourseAndTransaction[]) => {
//   const months = [
//     'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
//     'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
//   ];
  
//   const currentDate = new Date();
//   const revenueByMonth: { [key: string]: number } = {};

//   // Initialize all months with 0 revenue
//   for (let i = 11; i >= 0; i--) {
//     const date = new Date(currentDate);
//     date.setMonth(date.getMonth() - i);
//     const monthKey = `${months[date.getMonth()]} ${date.getFullYear()}`;
//     revenueByMonth[monthKey] = 0;
//   }

//   // Populate with actual revenue data
//   purchases.forEach((purchase) => {
//     if (purchase.transaction && purchase.transaction.amount > 0) {
//       const purchaseDate = purchase.transaction.createdAt;
//       const monthKey = `${months[purchaseDate.getMonth()]} ${purchaseDate.getFullYear()}`;
      
//       // Only include if within the last 12 months
//       const twelveMonthsAgo = new Date(currentDate);
//       twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);
      
//       if (purchaseDate >= twelveMonthsAgo) {
//         revenueByMonth[monthKey] = (revenueByMonth[monthKey] || 0) + purchase.transaction.amount;
//       }
//     }
//   });

//   return Object.entries(revenueByMonth).map(([month, revenue]) => ({
//     month,
//     revenue
//   }));
// };

// export const getAnalytics = async (userId: string): Promise<AnalyticsData> => {
//   try {
//     const purchases = await db.purchase.findMany({
//       where: {
//         course: {
//           userId: userId,
//         },
//       },
//       include: {
//         course: {
//           include: {
//             chapters: true,
//           },
//         },
//         transaction: true,
//       },
//     });

//     const users = await db.user.findMany({
//       include: {
//         profile: true,
//         purchases: {
//           include: {
//             course: {
//               include: {
//                 chapters: true,
//               },
//             },
//             transaction: true,
//           },
//         },
//         userProgress: true,
//         transactions: true,
//       },
//     });

//     // Calculate total revenue from all transactions
//     const totalRevenue = purchases.reduce((sum, purchase) => {
//       return sum + (purchase.transaction?.amount || 0);
//     }, 0);

//     const groupedEarnings = groupByCourse(purchases as PurchaseWithCourseAndTransaction[]);
//     const data = Object.entries(groupedEarnings).map(([courseTitle, total]) => ({
//       name: courseTitle,
//       total: total,
//     }));

//     const totalSales = purchases.length;
//     const totalUsers = users.length;
//     const uniqueCourseIds = new Set(purchases.map((purchase) => purchase.courseId));
//     const totalEnrolledCourses = uniqueCourseIds.size;

//     // Calculate course progress distribution
//     const progressCounts = {
//       '0-25%': 0,
//       '26-50%': 0,
//       '51-75%': 0,
//       '76-99%': 0,
//       'Completed': 0
//     };

//     users.forEach(user => {
//       const completedCount = user.userProgress.filter(up => up.isCompleted).length;
//       const totalCount = user.userProgress.length;
//       const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

//       if (progressPercentage === 100) {
//         progressCounts['Completed']++;
//       } else if (progressPercentage >= 76) {
//         progressCounts['76-99%']++;
//       } else if (progressPercentage >= 51) {
//         progressCounts['51-75%']++;
//       } else if (progressPercentage >= 26) {
//         progressCounts['26-50%']++;
//       } else {
//         progressCounts['0-25%']++;
//       }
//     });

//     const courseProgressData = Object.entries(progressCounts).map(([name, value]) => ({
//       name,
//       value
//     }));

//     // Get revenue trend data for last 12 months
//     const revenueTrendData = getLast12MonthsRevenue(purchases as PurchaseWithCourseAndTransaction[]);

//     // Get top courses by enrollment and revenue
//     const courseEnrollmentMap = new Map<string, { enrollments: number, revenue: number }>();
    
//     purchases.forEach(purchase => {
//       const courseId = purchase.courseId;
//       const current = courseEnrollmentMap.get(courseId) || { enrollments: 0, revenue: 0 };
      
//       current.enrollments += 1;
//       if (purchase.transaction) {
//         current.revenue += purchase.transaction.amount;
//       }
      
//       courseEnrollmentMap.set(courseId, current);
//     });

//     const topCourses = Array.from(courseEnrollmentMap.entries())
//       .map(([courseId, data]) => {
//         const course = purchases.find(p => p.courseId === courseId)?.course;
//         return {
//           id: courseId,
//           title: course?.title || 'Unknown Course',
//           enrollments: data.enrollments,
//           revenue: data.revenue
//         };
//       })
//       .sort((a, b) => b.enrollments - a.enrollments)
//       .slice(0, 5);

//     // Get recent activity (last 10 purchases)
//     const recentActivity: RecentActivity[] = purchases
//       .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
//       .slice(0, 10)
//       .map(purchase => ({
//         id: purchase.id,
//         userId: purchase.userId,
//         userName: users.find(u => u.id === purchase.userId)?.name || 'Unknown User',
//         action: 'Enrolled in course',
//         courseTitle: purchase.course.title,
//         timestamp: purchase.createdAt
//       }));

//     const userDetails: UserDetails[] = await Promise.all(
//       users.map(async (user) => {
//         const userLogs = await db.logging.findMany({
//           where: {
//             userId: user.id,
//             url: { in: ["/login", "/logout"] },
//           },
//           orderBy: { createdAt: "asc" },
//         });

//         let totalTimeSpent = 0;
//         let lastLogin: Date | null = null;

//         for (let i = 0; i < userLogs.length; i++) {
//           if (userLogs[i].url === "/login") {
//             lastLogin = userLogs[i].createdAt;
//           } else if (lastLogin && userLogs[i].url === "/logout") {
//             totalTimeSpent += (userLogs[i].createdAt.getTime() - lastLogin.getTime()) / 1000;
//             lastLogin = null;
//           }
//         }

//         // Calculate course progress for each enrolled course
//         const enrolledCourses = user.purchases.map(purchase => {
//           const progress = user.userProgress
//             .filter(up => up.courseId === purchase.courseId)
//             .reduce((acc, curr) => acc + (curr.isCompleted ? 1 : 0), 0);
          
//           const totalChapters = purchase.course.chapters.length || 1;
//           const progressPercentage = Math.round((progress / totalChapters) * 100);

//           return {
//             courseTitle: purchase.course.title,
//             amountPaid: purchase.transaction?.amount || 0,
//             progress: progressPercentage
//           };
//         });

//         const totalSpent = user.transactions.reduce((sum, txn) => sum + txn.amount, 0);

//         return {
//           id: user.id,
//           name: user.name || "Unknown User",
//           email: user.email,
//           imageUrl: user.profile?.imageUrl || "/default-avatar.png",
//           coursesEnrolled: user.purchases.length,
//           lastLogin: lastLogin || user.profile?.updatedAt || new Date(),
//           dateOfEnrollment: user.profile?.createdAt || new Date(),
//           studentLevel: user.userProgress[0]?.level || 1,
//           certificatesEarned: user.profile?.certificatesEarned || 0,
//           enrolledCourses,
//           timeSpent: totalTimeSpent,
//           totalSpent
//         };
//       })
//     );

//     return {
//       data,
//       totalRevenue,
//       totalSales,
//       totalUsers,
//       totalEnrolledCourses,
//       userDetails,
//       recentActivity,
//       courseProgressData,
//       revenueTrendData,
//       topCourses
//     };
//   } catch (error) {
//     console.error("[GET_ANALYTICS] Error:", error);
//     return {
//       data: [],
//       totalRevenue: 0,
//       totalSales: 0,
//       totalUsers: 0,
//       totalEnrolledCourses: 0,
//       userDetails: [],
//       recentActivity: [],
//       courseProgressData: [],
//       revenueTrendData: [],
//       topCourses: []
//     };
//   }
// };









import { db } from "@/lib/db";
import { Course, Purchase, Profile, UserProgress, Transaction, Logging, Chapter } from "@prisma/client";

type PurchaseWithCourseAndTransaction = Purchase & {
  course: Course & { chapters: Chapter[] };
  transaction: Transaction | null;
};

type UserDetails = {
  id: string;
  name: string;
  email: string;
  imageUrl: string;
  coursesEnrolled: number;
  lastLogin: Date;
  dateOfEnrollment: Date;
  studentLevel: number;
  certificatesEarned: number;
  enrolledCourses: {
    courseTitle: string;
    amountPaid: number;
    progress: number;
  }[];
  timeSpent: number;
  totalSpent: number;
};

type RecentActivity = {
  id: string;
  userId: string;
  userName: string;
  action: string;
  courseTitle?: string;
  timestamp: Date;
};

type CourseProgressData = {
  name: string;
  value: number;
}[];

type RevenueTrendData = {
  month: string;
  revenue: number;
}[];

type TopCourse = {
  id: string;
  title: string;
  enrollments: number;
  revenue: number;
};

type AnalyticsData = {
  data: { name: string; total: number }[];
  totalRevenue: number;
  totalSales: number;
  totalUsers: number;
  totalEnrolledCourses: number;
  userDetails: UserDetails[];
  recentActivity: RecentActivity[];
  courseProgressData: CourseProgressData;
  revenueTrendData: RevenueTrendData;
  topCourses: TopCourse[];
};

const groupByCourse = (purchases: PurchaseWithCourseAndTransaction[]) => {
  const grouped: { [courseTitle: string]: number } = {};

  purchases.forEach((purchase) => {
    const courseTitle = purchase.course.title;
    if (!grouped[courseTitle]) {
      grouped[courseTitle] = 0;
    }
    if (purchase.transaction && purchase.transaction.amount > 0) {
      grouped[courseTitle] += purchase.transaction.amount;
    }
  });

  return grouped;
};

const getLast12MonthsRevenue = (purchases: PurchaseWithCourseAndTransaction[]) => {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  
  const currentDate = new Date();
  const revenueByMonth: { [key: string]: number } = {};

  for (let i = 11; i >= 0; i--) {
    const date = new Date(currentDate);
    date.setMonth(date.getMonth() - i);
    const monthKey = `${months[date.getMonth()]} ${date.getFullYear()}`;
    revenueByMonth[monthKey] = 0;
  }

  purchases.forEach((purchase) => {
    if (purchase.transaction && purchase.transaction.amount > 0) {
      const purchaseDate = purchase.transaction.createdAt;
      const monthKey = `${months[purchaseDate.getMonth()]} ${purchaseDate.getFullYear()}`;
      
      const twelveMonthsAgo = new Date(currentDate);
      twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);
      
      if (purchaseDate >= twelveMonthsAgo) {
        revenueByMonth[monthKey] = (revenueByMonth[monthKey] || 0) + purchase.transaction.amount;
      }
    }
  });

  return Object.entries(revenueByMonth).map(([month, revenue]) => ({
    month,
    revenue
  }));
};

export const getAnalytics = async (userId: string): Promise<AnalyticsData> => {
  try {
    console.log("[GET_ANALYTICS] Fetching analytics for userId:", userId);

    // Fetch purchases
    // const purchases = await db.purchase.findMany({
    //   where: {
    //     course: {
    //       userId: userId,
    //     },
    //   },
    //   include: {
    //     course: {
    //       include: {
    //         chapters: true,
    //       },
    //     },
    //     transaction: true,
    //   },
    // });


       const purchases = await db.purchase.findMany({
      where: {
        course: {
          userId: userId
        }
      },
      include: {
        course: true,
        transaction: true 
      }
    });




    console.log("[GET_ANALYTICS] Fetched purchases:", purchases.length, purchases.map(p => ({
      id: p.id,
      courseId: p.courseId,
      userId: p.userId,
      transactionId: p.transactionId,
      transactionAmount: p.transaction?.amount,
    })));

    // Fetch users
    const users = await db.user.findMany({
      include: {
        profile: true,
        purchases: {
          include: {
            course: {
              include: {
                chapters: true,
              },
            },
            transaction: true,
          },
        },
        userProgress: true,
        transactions: true,
      },
    });
    console.log("[GET_ANALYTICS] Fetched users:", users.length, users.map(u => ({ id: u.id, email: u.email })));

    // Group earnings by course (for data)
    const groupedEarnings = groupByCourse(purchases as PurchaseWithCourseAndTransaction[]);
    const data = Object.entries(groupedEarnings).map(([courseTitle, total]) => ({
      name: courseTitle,
      total: total,
    }));
    console.log("[GET_ANALYTICS] Grouped earnings data:", data);

    // Calculate total revenue (borrowed from reference code)
    const totalRevenue = data.reduce((acc, curr) => acc + curr.total, 0);
    console.log("[GET_ANALYTICS] Calculated totalRevenue:", totalRevenue);

    // Calculate total sales
    const totalSales = purchases.length;
    console.log("[GET_ANALYTICS] Calculated totalSales:", totalSales);

    // Calculate total users
    const totalUsers = users.length;
    console.log("[GET_ANALYTICS] Calculated totalUsers:", totalUsers);

    // Calculate total enrolled courses
    const uniqueCourseIds = new Set(purchases.map((purchase) => purchase.courseId));
    const totalEnrolledCourses = uniqueCourseIds.size;
    console.log("[GET_ANALYTICS] Calculated totalEnrolledCourses:", totalEnrolledCourses, "Unique course IDs:", Array.from(uniqueCourseIds));

    // Calculate course progress distribution
    const progressCounts = {
      '0-25%': 0,
      '26-50%': 0,
      '51-75%': 0,
      '76-99%': 0,
      'Completed': 0
    };

    users.forEach(user => {
      const completedCount = user.userProgress.filter(up => up.isCompleted).length;
      const totalCount = user.userProgress.length;
      const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

      if (progressPercentage === 100) {
        progressCounts['Completed']++;
      } else if (progressPercentage >= 76) {
        progressCounts['76-99%']++;
      } else if (progressPercentage >= 51) {
        progressCounts['51-75%']++;
      } else if (progressPercentage >= 26) {
        progressCounts['26-50%']++;
      } else {
        progressCounts['0-25%']++;
      }
    });
    console.log("[GET_ANALYTICS] Course progress distribution:", progressCounts);

    const courseProgressData = Object.entries(progressCounts).map(([name, value]) => ({
      name,
      value
    }));

    // Get revenue trend data for last 12 months
    const revenueTrendData = getLast12MonthsRevenue(purchases as PurchaseWithCourseAndTransaction[]);
    console.log("[GET_ANALYTICS] Revenue trend data:", revenueTrendData);

    // Get top courses by enrollment and revenue
    const courseEnrollmentMap = new Map<string, { enrollments: number, revenue: number }>();
    
    purchases.forEach(purchase => {
      const courseId = purchase.courseId;
      const current = courseEnrollmentMap.get(courseId) || { enrollments: 0, revenue: 0 };
      
      current.enrollments += 1;
      if (purchase.transaction) {
        current.revenue += purchase.transaction.amount;
      }
      
      courseEnrollmentMap.set(courseId, current);
    });

    const topCourses = Array.from(courseEnrollmentMap.entries())
      .map(([courseId, data]) => {
        const course = purchases.find(p => p.courseId === courseId)?.course;
        return {
          id: courseId,
          title: course?.title || 'Unknown Course',
          enrollments: data.enrollments,
          revenue: data.revenue
        };
      })
      .sort((a, b) => b.enrollments - a.enrollments)
      .slice(0, 5);
    console.log("[GET_ANALYTICS] Top courses:", topCourses);

    // Get recent activity (last 10 purchases)
    const recentActivity: RecentActivity[] = purchases
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, 10)
      .map(purchase => ({
        id: purchase.id,
        userId: purchase.userId,
        userName: users.find(u => u.id === purchase.userId)?.name || 'Unknown User',
        action: 'Enrolled in course',
        courseTitle: purchase.course.title,
        timestamp: purchase.createdAt
      }));
    console.log("[GET_ANALYTICS] Recent activity:", recentActivity);

    // Calculate user details
    const userDetails: UserDetails[] = await Promise.all(
      users.map(async (user) => {
        const userLogs = await db.logging.findMany({
          where: {
            userId: user.id,
            url: { in: ["/login", "/logout"] },
          },
          orderBy: { createdAt: "asc" },
        });

        let totalTimeSpent = 0;
        let lastLogin: Date | null = null;

        for (let i = 0; i < userLogs.length; i++) {
          if (userLogs[i].url === "/login") {
            lastLogin = userLogs[i].createdAt;
          } else if (lastLogin && userLogs[i].url === "/logout") {
            totalTimeSpent += (userLogs[i].createdAt.getTime() - lastLogin.getTime()) / 1000;
            lastLogin = null;
          }
        }

        const enrolledCourses = user.purchases.map(purchase => {
          const progress = user.userProgress
            .filter(up => up.courseId === purchase.courseId)
            .reduce((acc, curr) => acc + (curr.isCompleted ? 1 : 0), 0);
          
          const totalChapters = purchase.course.chapters.length || 1;
          const progressPercentage = Math.round((progress / totalChapters) * 100);

          return {
            courseTitle: purchase.course.title,
            amountPaid: purchase.transaction?.amount || 0,
            progress: progressPercentage
          };
        });

        const totalSpent = user.transactions.reduce((sum, txn) => sum + txn.amount, 0);

        return {
          id: user.id,
          name: user.name || "Unknown User",
          email: user.email,
          imageUrl: user.profile?.imageUrl || "/default-avatar.png",
          coursesEnrolled: user.purchases.length,
          lastLogin: lastLogin || user.profile?.updatedAt || new Date(),
          dateOfEnrollment: user.profile?.createdAt || new Date(),
          studentLevel: user.userProgress[0]?.level || 1,
          certificatesEarned: user.profile?.certificatesEarned || 0,
          enrolledCourses,
          timeSpent: totalTimeSpent,
          totalSpent
        };
      })
    );
    console.log("[GET_ANALYTICS] User details:", userDetails.length);

    return {
      data,
      totalRevenue,
      totalSales,
      totalUsers,
      totalEnrolledCourses,
      userDetails,
      recentActivity,
      courseProgressData,
      revenueTrendData,
      topCourses
    };
  } catch (error) {
    console.error("[GET_ANALYTICS] Error:", error);
    return {
      data: [],
      totalRevenue: 0,
      totalSales: 0,
      totalUsers: 0,
      totalEnrolledCourses: 0,
      userDetails: [],
      recentActivity: [],
      courseProgressData: [],
      revenueTrendData: [],
      topCourses: []
    };
  }
};




































// import { db } from "@/lib/db";
// import { Course, Purchase, Profile, UserProgress, Transaction, Logging } from "@prisma/client";

// type PurchaseWithCourseAndTransaction = Purchase & {
//   course: Course;
//   transaction: Transaction | null;
// };

// type UserDetails = {
//   name: string;
//   imageUrl: string;
//   coursesEnrolled: number;
//   lastLogin: Date;
//   dateOfEnrollment: Date;
//   studentLevel: number;
//   certificatesEarned: number;
//   enrolledCourses: {
//     courseTitle: string;
//     amountPaid: number;
//   }[];
//   timeSpent: number;
// };

// type AnalyticsData = {
//   data: { name: string; total: number }[];
//   totalRevenue: number;
//   totalSales: number;
//   totalUsers: number;
//   totalEnrolledCourses: number;
//   userDetails: UserDetails[];
// };

// const groupByCourse = (purchases: PurchaseWithCourseAndTransaction[]) => {
//   const grouped: { [courseTitle: string]: number } = {};

//   purchases.forEach((purchase) => {
//     const courseTitle = purchase.course.title;
//     if (!grouped[courseTitle]) {
//       grouped[courseTitle] = 0;
//     }
    
//     // Only include completed transactions
//     if (purchase.transaction && purchase.transaction.status === "COMPLETED") {
//       grouped[courseTitle] += purchase.transaction.amount || 0;
//     }
//   });

//   return grouped;
// };

// export const getAnalytics = async (userId: string): Promise<AnalyticsData> => {
//   try {
//     // Get all purchases for the teacher's courses with transactions
//     const purchases = await db.purchase.findMany({
//       where: {
//         course: {
//           userId: userId,
//         },
//         transaction: {
//           status: "COMPLETED" // Only include completed transactions
//         }
//       },
//       include: {
//         course: true,
//         transaction: true,
//       },
//     });

//     // Get all users who have purchased the teacher's courses
//     const users = await db.user.findMany({
//       where: {
//         purchases: {
//           some: {
//             course: {
//               userId: userId,
//             }
//           }
//         }
//       },
//       include: {
//         profile: true,
//         purchases: {
//           where: {
//             course: {
//               userId: userId,
//             }
//           },
//           include: {
//             course: true,
//             transaction: true,
//           },
//         },
//         userProgress: true,
//       },
//     });

//     const groupedEarnings = groupByCourse(purchases as PurchaseWithCourseAndTransaction[]);
//     const data = Object.entries(groupedEarnings).map(([courseTitle, total]) => ({
//       name: courseTitle,
//       total: total,
//     }));

//     // Calculate totals
//     const totalRevenue = purchases.reduce((sum, purchase) => {
//       return sum + (purchase.transaction?.amount || 0);
//     }, 0);

//     const totalSales = purchases.length;
//     const totalUsers = users.length;
//     const totalEnrolledCourses = new Set(purchases.map(p => p.courseId)).size;

//     const userDetails: UserDetails[] = await Promise.all(
//       users.map(async (user) => {
//         const userLogs = await db.logging.findMany({
//           where: {
//             userId: user.id,
//             url: { in: ["/login", "/logout"] },
//           },
//           orderBy: { createdAt: "asc" },
//         });

//         let totalTimeSpent = 0;
//         let lastLogin: Date | null = null;

//         for (let i = 0; i < userLogs.length; i++) {
//           if (userLogs[i].url === "/login") {
//             lastLogin = userLogs[i].createdAt;
//           } else if (lastLogin && userLogs[i].url === "/logout") {
//             totalTimeSpent += (userLogs[i].createdAt.getTime() - lastLogin.getTime()) / 1000;
//             lastLogin = null;
//           }
//         }

//         return {
//           name: user.name || "Unknown User",
//           imageUrl: user.profile?.imageUrl || "",
//           coursesEnrolled: user.purchases.length,
//           lastLogin: user.profile?.updatedAt || new Date(),
//           dateOfEnrollment: user.profile?.createdAt || new Date(),
//           studentLevel: user.userProgress[0]?.level || 1,
//           certificatesEarned: user.profile?.certificatesEarned || 0,
//           enrolledCourses: user.purchases.map((purchase) => ({
//             courseTitle: purchase.course.title,
//             amountPaid: purchase.transaction?.amount || 0,
//           })),
//           timeSpent: totalTimeSpent,
//         };
//       })
//     );

//     return {
//       data,
//       totalRevenue,
//       totalSales,
//       totalUsers,
//       totalEnrolledCourses,
//       userDetails,
//     };
//   } catch (error) {
//     console.error("[GET_ANALYTICS] Error:", error);
//     return {
//       data: [],
//       totalRevenue: 0,
//       totalSales: 0,
//       totalUsers: 0,
//       totalEnrolledCourses: 0,
//       userDetails: [],
//     };
//   }
// };
























// import { db } from "@/lib/db";
// import { Course, Purchase, Profile, UserProgress, Transaction, Chapter } from "@prisma/client";

// // Define types to closely match the data structure from your Prisma schema
// type PurchaseWithCourseAndTransaction = Purchase & {
//   course: Course & {
//     chapters: Chapter[];
//   };
//   transaction: Transaction | null;
// };

// type UserDetails = {
//   name: string;
//   imageUrl: string;
//   coursesEnrolled: number;
//   lastLogin: Date;
//   dateOfEnrollment: Date;
//   studentLevel: number;
//   certificatesEarned: number;
//   enrolledCourses: {
//     courseTitle: string;
//     amountPaid: number;
//     progress: number;
//     thumbnail: string;
//   }[];
//   totalSpent: number;
// };

// // Function to group purchases by course
// const groupByCourse = (purchases: PurchaseWithCourseAndTransaction[]) => {
//   const grouped: { [courseTitle: string]: number } = {};
  
//   purchases.forEach((purchase) => {
//     const courseTitle = purchase.course.title;
//     if (!grouped[courseTitle]) {
//       grouped[courseTitle] = 0;
//     }
//     grouped[courseTitle] += purchase.transaction?.amount || 0; // Use transaction amount or 0 if not available
//   });

//   return grouped;
// };

// export const getAnalytics = async (userId: string) => {
//   try {
//     // Query purchases including course and transaction details
//     const purchases = await db.purchase.findMany({
//       where: {
//         course: {
//           userId: userId
//         }
//       },
//       include: {
//         course: {
//           include: {
//             chapters: true
//           }
//         },
//         transaction: true
//       }
//     });

//     // Query users with their related data
//     const users = await db.user.findMany({
//       include: {
//         profile: true,
//         purchases: {
//           include: {
//             course: true,
//             transaction: true
//           }
//         },
//         userProgress: {
//           include: {
//             chapter: true
//           }
//         }
//       }
//     });

//     // Group earnings by course
//     const groupedEarnings = groupByCourse(purchases as PurchaseWithCourseAndTransaction[]);
//     const data = Object.entries(groupedEarnings).map(([courseTitle, total]) => ({
//       name: courseTitle,
//       total: total,
//     }));

//     // Calculate totals
//     const totalRevenue = data.reduce((acc, curr) => acc + curr.total, 0);
//     const totalSales = purchases.length;
//     const totalUsers = users.length;

//     // Generate user details
//     const userDetails: UserDetails[] = users.map(user => {
//       const enrolledCourses = user.purchases.map(purchase => {
//         // Cast to ensure we're dealing with the correct type structure
//         const courseWithChapters = purchase.course as PurchaseWithCourseAndTransaction["course"];
        
//         const totalChapters = courseWithChapters.chapters.length;
//         const completedChapters = user.userProgress.filter(progress => 
//           progress.chapter.courseId === purchase.course.id && 
//           progress.isCompleted
//         ).length;
        
//         return {
//           courseTitle: purchase.course.title,
//           amountPaid: purchase.transaction?.amount || 0,
//           progress: totalChapters > 0 ? Math.round((completedChapters / totalChapters) * 100) : 0,
//           thumbnail: purchase.course.imageUrl || '/course-placeholder.jpg'
//         };
//       });

//       return {
//         name: user.name,
//         imageUrl: user.profile?.imageUrl || '',
//         coursesEnrolled: user.purchases.length,
//         lastLogin: user.profile?.updatedAt || new Date(),
//         dateOfEnrollment: user.profile?.createdAt || new Date(),
//         studentLevel: user.userProgress[0]?.level || 1,
//         certificatesEarned: user.profile?.certificatesEarned || 0,
//         enrolledCourses,
//         totalSpent: user.purchases.reduce<number>((sum, purchase) => sum + (purchase.transaction?.amount || 0), 0)
//       };
//     });

//     return {
//       data,
//       totalRevenue,
//       totalSales,
//       totalUsers,
//       userDetails,
//     }
//   } catch (error) {
//     console.log("[GET_ANALYTICS]", error);
//     return {
//       data: [],
//       totalRevenue: 0,
//       totalSales: 0,
//       totalUsers: 0,
//       userDetails: [],
//     }
//   }
// };