// import { NextResponse } from 'next/server';
// import prisma from '@/lib/prisma'; // Adjust path to your Prisma client

// // Define the GET method to fetch messages
// export async function GET() {
//     try {
//         // Fetch messages from your database
//         const messages = await prisma.message.findMany(); 
//         return NextResponse.json(messages); // Return the messages as JSON
//     } catch (error) {
//         console.error('Error fetching messages:', error);
//         return NextResponse.json({ error: 'Failed to fetch messages.' }, { status: 500 });
//     }
// }

// // Define the POST method to create a new message
// export async function POST(request: Request) {
//     try {
//         // Parse the incoming JSON body
//         const { userName, content } = await request.json(); 

//         // Validate input
//         if (!userName || !content) {
//             return NextResponse.json(
//                 { error: 'Both userName and content are required' },
//                 { status: 400 }
//             );
//         }

//         // Create a new message in the database
//         const newMessage = await prisma.message.create({
//             data: {
//                 userName,
//                 content,
//                 userId: 'defaultUserId', // Adjust based on your user management
//                 userType: 'defaultUserType' // Adjust based on your user management
//             },
//         });

//         return NextResponse.json(newMessage, { status: 201 }); // Return the created message
//     } catch (error) {
//         console.error('Error saving message:', error);
//         return NextResponse.json(
//             { error: 'Failed to save message' },
//             { status: 500 }
//         );
//     }
// }




// import { NextResponse } from 'next/server';
// import prisma from '@/lib/prisma';

// // GET all messages
// export async function GET() {
//   try {
//     // First, delete messages older than 30 days
//     const thirtyDaysAgo = new Date();
//     thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
//     await prisma.message.deleteMany({
//       where: {
//         createdAt: {
//           lt: thirtyDaysAgo
//         }
//       }
//     });
    
//     // Then fetch remaining messages
//     const messages = await prisma.message.findMany({
//       orderBy: {
//         createdAt: 'asc'
//       }
//     });
    
//     return NextResponse.json(messages);
//   } catch (error) {
//     console.error('Error fetching messages:', error);
//     return NextResponse.json(
//       { error: 'Failed to fetch messages' },
//       { status: 500 }
//     );
//   }
// }

// // POST a new message
// export async function POST(req: Request) {
//   try {
//     const { userId, userType, userName, content, fileUrl, fileType } = await req.json();
    
//     const newMessage = await prisma.message.create({
//       data: {
//         userId,
//         userType,
//         userName: userName || 'Anonymous',
//         content,
//         fileUrl,
//         fileType
//         // createdAt is automatically set by @default(now()) in schema
//       }
//     });
    
//     return NextResponse.json(newMessage);
//   } catch (error) {
//     console.error('Error saving message:', error);
//     return NextResponse.json(
//       { error: 'Failed to save message' },
//       { status: 500 }
//     );
//   }
// }






// import { NextResponse } from 'next/server';
// import prisma from '@/lib/prisma';

// // GET all messages
// export async function GET() {
//   try {
//     // Delete messages older than 30 days
//     const thirtyDaysAgo = new Date();
//     thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
//     await prisma.message.deleteMany({
//       where: {
//         createdAt: {
//           lt: thirtyDaysAgo
//         }
//       }
//     });
    
//     // Fetch remaining messages
//     const messages = await prisma.message.findMany({
//       orderBy: {
//         createdAt: 'asc'
//       }
//     });
    
//     console.log('Fetched Messages:', messages.map(m => ({ id: m.id, userName: m.userName, fileUrl: m.fileUrl })));
    
//     return NextResponse.json(messages);
//   } catch (error) {
//     console.error('Error fetching messages:', error);
//     return NextResponse.json(
//       { error: 'Failed to fetch messages' },
//       { status: 500 }
//     );
//   }
// }

// // POST a new message
// export async function POST(req: Request) {
//   try {
//     const { userId, userType, userName, content, fileUrl, fileType } = await req.json();
    
//     // Validate inputs
//     if (!userId || !userType || !content && !fileUrl) {
//       console.error('Missing required fields:', { userId, userType, content, fileUrl });
//       return NextResponse.json(
//         { error: 'User ID, user type, and either content or file are required' },
//         { status: 400 }
//       );
//     }

//     // Validate fileUrl format if provided
//     if (fileUrl && !fileUrl.startsWith('/api/files/')) {
//       console.error('Invalid fileUrl format:', fileUrl);
//       return NextResponse.json(
//         { error: 'Invalid file URL format' },
//         { status: 400 }
//       );
//     }

//     const newMessage = await prisma.message.create({
//       data: {
//         userId,
//         userType,
//         userName: userName || 'Anonymous',
//         content: content || '',
//         fileUrl,
//         fileType
//         // createdAt is automatically set by @default(now()) in schema
//       }
//     });
    
//     console.log('Created Message:', { id: newMessage.id, userName: newMessage.userName, fileUrl: newMessage.fileUrl });
    
//     return NextResponse.json(newMessage);
//   } catch (error) {
//     console.error('Error saving message:', error);
//     return NextResponse.json(
//       { error: 'Failed to save message', details: error instanceof Error ? error.message : 'Unknown error' },
//       { status: 500 }
//     );
//   }
// }








// app/api/messages/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET all messages
export async function GET() {
  try {
    // Delete messages older than 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    await prisma.message.deleteMany({
      where: {
        createdAt: {
          lt: thirtyDaysAgo,
        },
      },
    });

    // Fetch remaining messages
    const messages = await prisma.message.findMany({
      orderBy: {
        createdAt: 'asc',
      },
    });

    console.log('Fetched Messages:', messages.map((m) => ({ id: m.id, userName: m.userName, fileUrl: m.fileUrl })));

    return NextResponse.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
}

// POST a new message
export async function POST(req: Request) {
  try {
    const { userId, userType, userName, content, fileUrl, fileType } = await req.json();

    // Validate inputs
    if (!userId || !userType || (!content && !fileUrl)) {
      console.error('Missing required fields:', { userId, userType, content, fileUrl });
      return NextResponse.json(
        { error: 'User ID, user type, and either content or file are required' },
        { status: 400 }
      );
    }

    // Validate fileUrl format if provided
    if (fileUrl && !fileUrl.startsWith('/api/files/')) {
      console.error('Invalid fileUrl format:', fileUrl);
      return NextResponse.json({ error: 'Invalid file URL format' }, { status: 400 });
    }

    const newMessage = await prisma.message.create({
      data: {
        userId,
        userType,
        userName: userName || 'Anonymous',
        content: content || '',
        fileUrl,
        fileType,
      },
    });

    console.log('Created Message:', { id: newMessage.id, userName: newMessage.userName, fileUrl: newMessage.fileUrl });

    return NextResponse.json(newMessage);
  } catch (error) {
    console.error('Error saving message:', error);
    return NextResponse.json(
      { error: 'Failed to save message', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}