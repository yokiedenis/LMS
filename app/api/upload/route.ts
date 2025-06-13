// // app/api/upload/route.ts
// import { NextResponse } from "next/server";
// import { v2 as cloudinary } from "cloudinary";

// // Configure Cloudinary (replace with your credentials)
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// export async function POST(request: Request) {
//   try {
//     const formData = await request.formData();
//     const file = formData.get("file") as File;

//     if (!file) {
//       return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
//     }

//     // Convert file to buffer
//     const bytes = await file.arrayBuffer();
//     const buffer = Buffer.from(bytes);

//     // Upload to Cloudinary
//     const result = await new Promise((resolve, reject) => {
//       const uploadStream = cloudinary.uploader.upload_stream(
//         {
//           resource_type: "auto", // Detects file type (image, pdf, etc.)
//           folder: "chat_uploads", // Optional: organize files in a folder
//         },
//         (error, result) => {
//           if (error) reject(error);
//           else resolve(result);
//         }
//       );
//       uploadStream.end(buffer);
//     });

//     // Extract URL and file type from Cloudinary response
//     const { secure_url, resource_type, format } = result as any;
//     const fileType = `${resource_type}/${format}`; // e.g., "image/jpeg" or "raw/pdf"

//     return NextResponse.json({
//       url: secure_url,
//       type: fileType,
//     });
//   } catch (error) {
//     console.error("Upload error:", error);
//     return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
//   }
// }







// app/api/upload/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { randomUUID } from 'crypto';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'File size exceeds 5MB limit' }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain',
    ];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Unsupported file type. Allowed: images, PDF, DOC, DOCX, TXT' },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Save file to Prisma
    const savedFile = await prisma.file.create({
      data: {
        id: randomUUID(),
        name: file.name,
        type: file.type, // Store MIME type (e.g., image/jpeg)
        data: buffer,
        size: file.size,
      },
    });

    console.log('File uploaded:', { fileId: savedFile.id, name: file.name, type: file.type });

    return NextResponse.json({
      fileId: savedFile.id,
      type: savedFile.type, // Return MIME type
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { error: 'Failed to upload file', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}