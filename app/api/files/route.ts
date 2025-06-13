// import { NextResponse } from 'next/server';
// import prisma from '@/lib/prisma';

// export async function GET(request: Request, { params }: { params: { id: string } }) {
//   try {
//     const fileId = params.id;

//     if (!fileId) {
//       console.error('No file ID provided');
//       return NextResponse.json({ error: 'File ID is required' }, { status: 400 });
//     }

//    // Fetch file from MongoDB
//     const file = await prisma.file.findUnique({
//       where: { id: fileId },
//     });

//     if (!file) {
//       console.error(`File not found: ${fileId}`);
//       return NextResponse.json({ error: 'File not found' }, { status: 404 });
//     }

//     // Set appropriate headers
//     const headers = new Headers();
//     headers.set('Content-Type', file.type);
//     headers.set('Content-Length', file.size.toString());
//     headers.set('Cache-Control', 'public, max-age=31536000'); // Cache for 1 year

//     // Convert Buffer to ArrayBuffer for response
//     const arrayBuffer = file.data.buffer;

//     console.log('Serving file:', { fileId, name: file.name, type: file.type });

//     return new NextResponse(arrayBuffer, {
//       status: 200,
//       headers,
//     });
//   } catch (error) {
//     console.error('Error serving file:', error);
//     return NextResponse.json(
//       { error: 'Failed to serve file', details: error instanceof Error ? error.message : 'Unknown error' },
//       { status: 500 }
//     );
//   }
// }



// import { NextResponse } from 'next/server';
// import prisma from '@/lib/prisma';

// export async function GET(request: Request, { params }: { params: { id: string } }) {
//   try {
//     const fileId = params.id;

//     if (!fileId) {
//       console.error('No file ID provided');
//       return NextResponse.json({ error: 'File ID is required' }, { status: 400 });
//     }

//     // Fetch file from MongoDB
//     const file = await prisma.file.findUnique({
//       where: { id: fileId },
//     });

//     if (!file) {
//       console.error(`File not found: ${fileId}`);
//       return NextResponse.json({ error: 'File not found' }, { status: 404 });
//     }

//     // Set appropriate headers
//     const headers = new Headers();
//     headers.set('Content-Type', file.type);
//     headers.set('Content-Length', file.size.toString());
//     headers.set('Cache-Control', 'public, max-age=31536000'); // Cache for 1 year

//     // Use file.data directly (Buffer is valid for BodyInit) or convert to Uint8Array
//     const body = file.data; // Buffer is compatible with BodyInit

//     console.log('Serving file:', { fileId, name: file.name, type: file.type });

//     return new NextResponse(body, {
//       status: 200,
//       headers,
//     });
//   } catch (error) {
//     console.error('Error serving file:', error);
//     return NextResponse.json(
//       { error: 'Failed to serve file', details: error instanceof Error ? error.message : 'Unknown error' },
//       { status: 500 }
//     );
//   }
// }


// app/api/files/[id]/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const fileId = params.id;

    if (!fileId) {
      console.error('No file ID provided');
      return NextResponse.json({ error: 'File ID is required' }, { status: 400 });
    }

    // Fetch file from MongoDB
    const file = await prisma.file.findUnique({
      where: { id: fileId },
    });

    if (!file) {
      console.error(`File not found: ${fileId}`);
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    // Set appropriate headers
    const headers = new Headers();
    headers.set('Content-Type', file.type);
    headers.set('Content-Length', file.size.toString());
    headers.set('Cache-Control', 'public, max-age=31536000'); // Cache for 1 year

    // Use file.data directly (Buffer is valid for BodyInit)
    const body = file.data; // Buffer is compatible with BodyInit

    console.log('Serving file:', { fileId, name: file.name, type: file.type });

    return new NextResponse(body, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error('Error serving file:', error);
    return NextResponse.json(
      { error: 'Failed to serve file', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}