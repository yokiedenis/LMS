// // pages/api/auth/getClerkUsers.ts
// import { NextApiRequest, NextApiResponse } from 'next';
// import { clerkClient } from '@clerk/nextjs/server';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'GET') {
//     try {
//       const clerkUsers = await clerkClient.users.getUser List();
//       const formattedUsers = clerkUsers.map(user => ({
//         id: user.id,
//         email: user.emailAddresses[0]?.emailAddress || 'No email',
//         username: user.username || user.emailAddresses[0]?.emailAddress.split('@')[0], // Extract username
//       }));
//       res.status(200).json(formattedUsers);
//     } catch (error) {
//       console.error('Error fetching users from Clerk:', error);
//       res.status(500).json({ error: 'Failed to fetch users from Clerk' });
//     }
//   } else {
//     res.setHeader('Allow', ['GET']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }