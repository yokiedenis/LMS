// import Mux from "@mux/mux-node"
// import  {db} from "@/lib/db";
// //import { auth } from "@clerk/nextjs";
// import { NextResponse } from "next/server";
// import { auth } from "@clerk/nextjs/server";
// import { isTeacher } from "@/lib/teacher";


// const{Video} = new Mux(
//   process.env.MUX_TOKEN!,
//   process.env.MUX_TOKEN_SECRET!,
// );

// export async function DELETE(
//   req: Request,
//   { params }:   {params: {courseId: string}}
// ){
//   try{
//       const {userId} = auth();
//       console.log("User ID:", userId);

//       if(!userId || isTeacher(userId)){
//         console.log("Unauthorized access attempt by user:", userId);
//         return new NextResponse("Unauthorized", { status: 401 });
//       }

      

//       const course = await db.course.findUnique({
//         where: { 
//           id: params.courseId,
//           userId:userId
//         },
//         include: {
//          chapters:{
//             include:{
//               muxData:true
//             }
//          },
//         },
//       });

//       if(!course){
//         return new NextResponse("Not Found", {status: 404});
//       }

//       for(const chapter of course.chapters){
//         if(chapter.muxData?.assetId){
//           await Video.Assets.del(chapter.muxData.assetId);
//         }
//       }

//      const deletedCourse = await db.course.delete({
//       where:{
//         id: params.courseId, 
//           }
//      });

//      return  NextResponse.json(deletedCourse);

//   }catch(error){
//     console.log("[COURSE_ID_DELETE]", error);
//     return new NextResponse("Internal Error",{status:500})

//   }
// }


// export async function PATCH(
//     req: Request,
//     { params }:   {params: {courseId: string}}
// ) {
//   try {
//     const { userId } = auth();
//     const {courseId} = params;
//     const values = await req.json();

//     if (!userId) {
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     const course = await db.course.update({
//       where: { 
//         id: courseId,
//         userId
//        },
//       data: {
//         ...values,
//       }
//     });

//     return NextResponse.json(course);

//     // Additional logic here...

//   } catch (error) {
//     console.log("[COURSE_ID]", error);
//     return new NextResponse("Internal Error", { status: 500 });
//   }
// }









// import Mux from "@mux/mux-node";
// import { db } from "@/lib/db";
// import { NextResponse } from "next/server";
// import { auth } from "@clerk/nextjs/server";

// const { Video } = new Mux(
//   process.env.MUX_TOKEN!,
//   process.env.MUX_TOKEN_SECRET!,
// );

// export async function DELETE(
//   req: Request,
//   { params }: { params: { courseId: string } }
// ) {
//   try {
//     const { userId } = auth();
//     console.log("User ID:", userId);

//     // Check if the user is authenticated and is the owner of the course
//     if (!userId) {
//       console.log("Unauthorized access attempt by user:", userId);
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     const course = await db.course.findUnique({
//       where: {
//         id: params.courseId,
//         userId: userId, // Ensure the course belongs to the authenticated user
//       },
//       include: {
//         chapters: {
//           include: {
//             muxData: true,
//           },
//         },
//       },
//     });

//     if (!course) {
//       return new NextResponse("Not Found", { status: 404 });
//     }

//     // Delete associated Mux assets
//     for (const chapter of course.chapters) {
//       if (chapter.muxData?.assetId) {
//         await Video.Assets.del(chapter.muxData.assetId);
//       }
//     }

//     // Delete the course
//     const deletedCourse = await db.course.delete({
//       where: {
//         id: params.courseId,
//       },
//     });

//     return NextResponse.json(deletedCourse);
//   } catch (error) {
//     console.log("[COURSE_ID_DELETE]", error);
//     return new NextResponse("Internal Error", { status: 500 });
//   }
// }

// export async function PATCH(
//   req: Request,
//   { params }: { params: { courseId: string } }
// ) {
//   try {
//     const { userId } = auth();
//     const { courseId } = params;
//     const values = await req.json();

//     if (!userId) {
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     const course = await db.course.update({
//       where: {
//         id: courseId,
//         userId, // Ensure the course belongs to the authenticated user
//       },
//       data: {
//         ...values,
//       },
//     });

//     return NextResponse.json(course);
//   } catch (error) {
//     console.log("[COURSE_ID]", error);
//     return new NextResponse("Internal Error", { status: 500 });
//   }
// }

 


import Mux from "@mux/mux-node";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

const { Video } = new Mux(
  process.env.MUX_TOKEN!,
  process.env.MUX_TOKEN_SECRET!,
);

export async function GET(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      console.log("Unauthorized access attempt by user:", userId);
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
      },
      select: {
        id: true,
        title: true,
      },
    });

    if (!course) {
      console.log("Course not found for courseId:", params.courseId);
      return new NextResponse("Not Found", { status: 404 });
    }

    return NextResponse.json(course);
  } catch (error) {
    console.log("[COURSE_ID_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();
    console.log("User ID:", userId);

    if (!userId) {
      console.log("Unauthorized access attempt by user:", userId);
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: userId,
      },
      include: {
        chapters: {
          include: {
            muxData: true,
          },
        },
      },
    });

    if (!course) {
      return new NextResponse("Not Found", { status: 404 });
    }

    for (const chapter of course.chapters) {
      if (chapter.muxData?.assetId) {
        await Video.Assets.del(chapter.muxData.assetId);
      }
    }

    const deletedCourse = await db.course.delete({
      where: {
        id: params.courseId,
      },
    });

    return NextResponse.json(deletedCourse);
  } catch (error) {
    console.log("[COURSE_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();
    const { courseId } = params;
    const values = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await db.course.update({
      where: {
        id: courseId,
        userId,
      },
      data: {
        ...values,
      },
    });

    return NextResponse.json(course);
  } catch (error) {
    console.log("[COURSE_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}