// import { NextApiRequest, NextApiResponse } from 'next';
// import { getSession } from 'next-auth/react';
// import { db } from "@/lib/db"; // Adjust the path as necessary

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const { courseId } = req.query;
//   const session = await getSession({ req });

//   if (req.method === 'GET') {
//     if (!session || !session.user) {
//       return res.status(401).json({ error: 'Unauthorized' });
//     }

//     const userId = session.user.id;

//     try {
//       const purchase = await db.transaction.findFirst({
//         where: {
//           userId,
//           courseId: courseId as string,
//         },
//       });

//       return res.status(200).json({ hasPurchased: !!purchase });
//     } catch (error) {
//       console.error('Database error:', error);
//       return res.status(500).json({ error: 'Internal Server Error' });
//     }
//   } else {
//     res.setHeader('Allow', ['GET']);
//     return res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }


import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next'; // Use getServerSession for server-side session retrieval
import { db } from "@/lib/db"; // Adjust the path as necessary

export async function GET(req: Request, { params }: { params: { courseId: string; statusId: string } }) {
  const { courseId } = params;
  const session = await getServerSession(); // Get session on the server side

  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userId = session.user.id;

  try {
    const purchase = await db.transaction.findFirst({
      where: {
        userId,
        courseId: courseId as string,
      },
    });

    return NextResponse.json({ hasPurchased: !!purchase });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}