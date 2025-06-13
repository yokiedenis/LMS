import {NextResponse} from "next/server";
import { auth } from "@clerk/nextjs/server";
import {db} from '@/lib/db';
import { isTeacher } from "@/lib/teacher";


export async function POST(
    req:Request
){
    try{
        const {userId} = auth();
        const {title} = await req.json();

        if(!userId){
            return new NextResponse("Unauthorised", {status: 401})
        }

        const course =  await db.course.create({
            data: {
                userId,
                title
            }
        });
        return new NextResponse(JSON.stringify(course), {status:201});

    }catch(error){
       console.log("[COURSES]",error)
       return new NextResponse("Internal Error",{status:500});
    }
}