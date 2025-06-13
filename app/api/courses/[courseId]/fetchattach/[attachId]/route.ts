// import { NextApiRequest, NextApiResponse } from 'next';
// import { db } from "@/lib/db";
// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const { courseId, attachId } = req.query;

//   if (req.method === 'GET') {
//     try {
//       const attachment = await db.attachment.findUnique({
//         where: {
//           id: attachId as string,
//           courseId: courseId as string,
//         },
//       });

//       if (attachment) {
//         return res.status(200).json(attachment);
//       } else {
//         return res.status(404).json({ error: 'Attachment not found' });
//       }
//     } catch (error) {
//       return res.status(500).json({ error: 'Internal Server Error' });
//     }
//   } else {
//     res.setHeader('Allow', ['GET']);
//     return res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }





import { NextResponse } from 'next/server';
import { db } from "@/lib/db";

export async function GET(req: Request, { params }: { params: { courseId: string; attachId: string } }) {
  const { courseId, attachId } = params;

  try {
    const attachment = await db.attachment.findUnique({
      where: {
        id: attachId,
        courseId: courseId,
      },
    });

    if (attachment) {
      return NextResponse.json(attachment);
    } else {
      return NextResponse.json({ error: 'Attachment not found' }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}