// import { clerkClient } from '@clerk/clerk-sdk-node';

// // Get userId from Clerk's session
// export const getUserIdFromClerk = async (req) => {
//   try {
//     const { userId } = await clerkClient.users.getSession({ apiKey: process.env.CLERK_API_KEY });
//     return userId;
//   } catch (error) {
//     console.error('Error getting Clerk session:', error);
//     throw new Error('Unable to fetch userId');
//   }
// };
