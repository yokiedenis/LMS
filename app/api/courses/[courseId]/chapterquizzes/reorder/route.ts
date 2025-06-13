import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PUT(
    req: Request,
    { params }: { params: { courseId: string } }
) {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { list } = await req.json();

        // Ensure the user owns the course
        const ownCourse = await db.course.findUnique({
            where: {
                id: params.courseId,
                userId: userId
            }
        });

        if (!ownCourse) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // Update the position of quizzes instead of chapters
        for (let item of list) {
            await db.quiz.update({
                where: {
                    id: item.id
                },
                data: {
                    position: item.position
                }
            });
        }

        return new NextResponse("Success", { status: 200 });

    } catch (error) {
        console.log("[REORDER]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
