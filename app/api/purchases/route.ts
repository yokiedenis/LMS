 

// import { auth } from '@clerk/nextjs/server'; // Correct import
// import { NextResponse } from 'next/server';
// import { db } from '@/lib/db';

// export async function GET(req: Request) {
//   try {
//     const { userId } = auth(); // Correct usage of auth()
//     const { searchParams } = new URL(req.url);
//     const courseId = searchParams.get('courseId'); // Get the courseId from query params

//     if (!userId || !courseId) {
//       return new NextResponse('Unauthorized or missing courseId', { status: 401 });
//     }

//     // Check for a successful transaction
//     const transaction = await db.transaction.findFirst({
//       where: {
//         userId,
//         courseId,
//         status: 'SUCCESS', // Ensure the transaction is successful
//       },
//     });

//     console.log('Transaction:', transaction); // Log the transaction

//     // Return the purchase status
//     return NextResponse.json({ hasPurchased: !!transaction });
//   } catch (error) {
//     console.error('[PURCHASE_STATUS_ERROR]', error);
//     return new NextResponse('Internal Server Error', { status: 500 });
//   }
// }






// import { getAuth } from '@clerk/nextjs/server'; // Use getAuth instead of auth
// import { NextResponse, NextRequest } from 'next/server'; // Import NextRequest
// import { db } from '@/lib/db';

// export async function GET(req: NextRequest) { // Use NextRequest instead of Request
//   try {
//     // Use getAuth to retrieve userId from the request
//     const { userId } = getAuth(req); // Pass the NextRequest object to getAuth()
//     const { searchParams } = new URL(req.url);
//     const courseId = searchParams.get('courseId'); // Get the courseId from query params

//     if (!userId || !courseId) {
//       return new NextResponse('Unauthorized or missing courseId', { status: 401 });
//     }

//     // Check for a successful transaction
//     const transaction = await db.transaction.findFirst({
//       where: {
//         userId,
//         courseId,
//         status: 'SUCCESS', // Ensure the transaction is successful
//       },
//     });

//     console.log('Transaction:', transaction); // Log the transaction

//     // Return the purchase status
//     return NextResponse.json({ hasPurchased: !!transaction });
//   } catch (error) {
//     console.error('[PURCHASE_STATUS_ERROR]', error);
//     return new NextResponse('Internal Server Error', { status: 500 });
//   }
// }






import { getAuth } from '@clerk/nextjs/server'; // Use getAuth instead of auth
import { NextResponse, NextRequest } from 'next/server'; // Import NextRequest
import { db } from '@/lib/db';

export async function GET(req: NextRequest) { // Use NextRequest instead of Request
  try {
    // Use getAuth to retrieve userId from the request
    const { userId } = getAuth(req); // Pass the NextRequest object to getAuth()
    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get('courseId'); // Get the courseId from query params

    if (!userId || !courseId) {
      return new NextResponse('Unauthorized or missing courseId', { status: 401 });
    }

    // Check for a successful transaction
    const transaction = await db.transaction.findFirst({
      where: {
        userId,
        courseId,
        status: 'SUCCESS', // Ensure the transaction is successful
      },
    });

    console.log('Transaction:', transaction); // Log the transaction

    // Return the purchase status
    return NextResponse.json({ hasPurchased: !!transaction });
  } catch (error) {
    console.error('[PURCHASE_STATUS_ERROR]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}