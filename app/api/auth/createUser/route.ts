// import { NextRequest, NextResponse } from 'next/server';
// import { getAuth, clerkClient } from '@clerk/nextjs/server';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export async function POST(req: NextRequest) {
//   try {
//     const { userId } = getAuth(req);

//     if (!userId) {
//       return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
//     }

//     // Fetch user details from Clerk
//     const user = await clerkClient.users.getUser(userId);
//     const email = user.emailAddresses[0]?.emailAddress;
//     const username = user.username || user.firstName || 'Anonymous';
//     const phoneNumber = user.phoneNumbers[0]?.phoneNumber || null; // Fetch phone number if available

//     // Save user details to Prisma
//     const newUser = await prisma.user.create({
//       data: {
//         name: username,
//         email,
//         number: phoneNumber, // Save the phone number
        
//       },
//     });

//     return NextResponse.json(newUser, { status: 201 });
//   } catch (error) {
//     console.error('Error saving user:', error);
//     return NextResponse.json({ message: 'An error occurred while saving user data' }, { status: 500 });
//   }
// }



import { NextRequest, NextResponse } from 'next/server';
import { getAuth, clerkClient } from '@clerk/nextjs/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Fetch user details from Clerk
    const user = await clerkClient.users.getUser(userId);
    const email = user.emailAddresses[0]?.emailAddress;
    const username = user.username || user.firstName || 'Anonymous';
    const phoneNumber = user.phoneNumbers[0]?.phoneNumber || null; // Fetch phone number if available

    // Save user details to Prisma
    const newUser = await prisma.user.create({
      data: {
        name: username,
        email,
        number: phoneNumber, // Save the phone number
      },
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error('Error saving user:', error);
    return NextResponse.json({ message: 'An error occurred while saving user data' }, { status: 500 });
  }
}











//using firebase 

// import { NextRequest, NextResponse } from 'next/server';
// import { getAuth } from 'firebase-admin/auth';
// import { initializeApp, cert } from 'firebase-admin/app';
// import { PrismaClient } from '@prisma/client';

// // Initialize Firebase Admin SDK
// const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_SDK || '{}');
// if (!serviceAccount) {
//   throw new Error('FIREBASE_ADMIN_SDK is not defined in environment variables');
// }
// initializeApp({
//   credential: cert(serviceAccount),
// });

// const prisma = new PrismaClient();

// export async function POST(req: NextRequest) {
//   try {
//     // Get Firebase ID token from Authorization header
//     const authHeader = req.headers.get('Authorization');
//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//       return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
//     }

//     const idToken = authHeader.split(' ')[1];

//     // Verify the Firebase ID token
//     const decodedToken = await getAuth().verifyIdToken(idToken);
//     const { uid, email, name } = decodedToken;

//     if (!uid || !email) {
//       return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
//     }

//     // Save user details to Prisma
//     const newUser = await prisma.user.create({
//       data: {
//         name: name || 'Anonymous',
//         email,
//       },
//     });

//     return NextResponse.json(newUser, { status: 201 });
//   } catch (error) {
//     console.error('Error saving user:', error);
//     return NextResponse.json({ message: 'An error occurred while saving user data' }, { status: 500 });
//   }
// }
