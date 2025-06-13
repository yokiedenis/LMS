// import { PrismaClient } from '@prisma/client';
// import { getUserIdFromClerk } from '../app/api/clerk-utils';  // Assume this is where we fetch Clerk's userId

// const prisma = new PrismaClient();

// // Get user progress from Prisma
// export const getUserProgress = async (req) => {
//   try {
//     // Fetch the userId from Clerk
//     const userId = await getUserIdFromClerk(req);
    
//     if (!userId) {
//       throw new Error('User is not authenticated');
//     }

//     // Fetch the user's progress data from Prisma
//     const userProgress = await prisma.userProgress.findMany({
//       where: { userId: userId },
//     });

//     if (userProgress.length === 0) {
//       return { message: 'No progress found for this user.' };
//     }

//     return userProgress;
//   } catch (error) {
//     console.error('Error fetching user progress:', error);
//     throw new Error('Unable to fetch user progress');
//   }
// };
