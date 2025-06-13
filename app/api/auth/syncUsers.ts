// // pages/api/auth/syncUsers.ts
// import { NextApiRequest, NextApiResponse } from 'next';
// import { clerkClient } from '@clerk/nextjs/server';
// import prisma from '@/lib/prisma'; // Adjust the import path as necessary

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'POST') {
//     try {
//       const clerkUsers = await clerkClient.users.getUser List();
//       const userPromises = clerkUsers.map(async (clerkUser ) => {
//         const email = clerkUser .emailAddresses[0]?.emailAddress;
//         const name = clerkUser .username || email?.split('@')[0]; // Use username or extract from email

//         if (email) {
//           // Check if the user already exists in the database
//           const existingUser  = await prisma.user.findUnique({
//             where: { email },
//           });

//           // If the user does not exist, create a new one
//           if (!existingUser ) {
//             await prisma.user.create({
//               data: {
//                 email,
//                 name,
//               },
//             });
//           }
//         }
//       });

//       await Promise.all(userPromises);
//       res.status(200).json({ message: 'Users synced successfully' });
//     } catch (error) {
//       console.error('Error syncing users:', error);
//       res.status(500).json({ error: 'Failed to sync users' });
//     }
//   } else {
//     res.setHeader('Allow', ['POST']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }