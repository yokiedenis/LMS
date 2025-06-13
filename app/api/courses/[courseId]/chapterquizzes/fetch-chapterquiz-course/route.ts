// import { NextApiRequest, NextApiResponse } from "next";
// import prisma from "@/lib/prisma";

// // Named export for GET request
// export async function GET(req: NextApiRequest, { params }: { params: { courseId: string } }) {
//   try {
//     // Fetch ChapterQuizzes by courseId, including the _count field for questions
//     const chapterQuizzes = await prisma.chapterQuiz.findMany({
//       where: {
//         courseId: params.courseId,
//       },
//       select: {
//         id: true,         // Include the ID of the ChapterQuiz
//         title: true,      // Include the title
//         _count: {
//           select: { questions: true },  // Include the count of questions related to each ChapterQuiz
//         },
//         chapterId: true,  // Include the chapterId if needed
//       },
//     });

//     return new Response(JSON.stringify(chapterQuizzes), { status: 200 }); // Send ChapterQuizzes as response
//   } catch (error) {
//     console.error("Error fetching ChapterQuizzes:", error);
//     return new Response(
//       JSON.stringify({ error: "Error fetching ChapterQuizzes" }),
//       { status: 500 }
//     );
//   }
// }




import { NextRequest, NextResponse } from 'next/server';
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest, { params }: { params: { courseId: string } }) {
  const searchParams = request.nextUrl.searchParams;
  const chapterId = searchParams.get('chapterId');

  if (!chapterId) {
    return NextResponse.json({ error: "Chapter ID is required" }, { status: 400 });
  }

  try {
    const chapterQuizzes = await prisma.chapterQuiz.findMany({
      where: {
        courseId: params.courseId,
        chapterId: chapterId,
      },
      select: {
        id: true,
        title: true,
        _count: {
          select: { questions: true },
        },
        chapterId: true,
      },
    });

    return NextResponse.json(chapterQuizzes, { status: 200 });
  } catch (error) {
    console.error("Error fetching ChapterQuizzes:", error);
    return NextResponse.json({ error: "Error fetching ChapterQuizzes" }, { status: 500 });
  }
}