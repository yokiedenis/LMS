// import { NextApiRequest, NextApiResponse } from 'next';
// import { db } from "@/lib/db";
// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const { courseId, recordId } = req.query;

//   if (req.method === 'GET') {
//     try {
//       const recording = await db.recording.findUnique({
//         where: {
//           id: recordId as string,
//           courseId: courseId as string,
//         },
//       });

//       if (recording) {
//         return res.status(200).json(recording);
//       } else {
//         return res.status(404).json({ error: 'Recording not found' });
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
import { db } from "@/lib/db"; // Adjust the path as necessary

export async function GET(req: Request, { params }: { params: { courseId: string } }) {
  const { courseId } = params;

  try {
    const recordings = await db.recording.findMany({
      where: {
        courseId: courseId,
      },
    });

    if (recordings.length > 0) {
      return NextResponse.json(recordings);
    } else {
      return NextResponse.json({ error: 'No recordings found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}