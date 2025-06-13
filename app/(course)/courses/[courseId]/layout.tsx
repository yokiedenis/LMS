

// import { auth } from "@clerk/nextjs/server";
// import { redirect } from "next/navigation";
// import { db } from "@/lib/db";
// import { getProgress } from "@/actions/get-progress";
// import { CourseSidebar } from "./_components/course-sidebar";
// import { CourseNavbar } from "./_components/course-navbar";
// import { NextRequest } from "next/server";

// const CourseLayout = async ({
//   children,
//   params,
//   req
// }: {
//   children: React.ReactNode;
//   params: { courseId: string };
//   req: NextRequest;
// }) => {
//   const { userId } = auth();
//   if (!userId) {
//     return redirect("/");
//   }

//   const course = await db.course.findUnique({
//     where: {
//       id: params.courseId,
//     },
//     include: {
//       chapters: {
//         where: {
//           isPublished: true,
//         },
//         include: {
//           userProgress: {
//             where: {
//               userId,
//             }
//           },
//           chapterattachments: true, // Added this to include chapter attachments
//         },
//         orderBy: {
//           position: "asc"
//         }
//       },
//       quizzes: true, // Already included, no change needed here
//     },
//   });

//   if (!course) {
//     return redirect("/");
//   }

//   // @ts-ignore
//   const progressCount: number = await getProgress(userId, course.id);

//   // Extract quizId
//   const quizId = course.quizzes?.[0]?.id; // Get the first quizId or set a default value

//   return (
//     <div className="h-full">
//       <div className="h-[80px] md:pl-80 fixed inset-y-0 w-full z-50">
//         <CourseNavbar
//           course={course}
//           progressCount={progressCount}
//           quizId={quizId} // Pass quizId to CourseNavbar
//         />
//       </div>
//       <div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50">
//         <CourseSidebar
//           course={course}
//           progressCount={progressCount}
//           quizId={quizId} 
//         />
//       </div>
//       <main className="md:pl-80 pt-[80px] h-full">
//         {children}
//       </main>
//     </div>
//   );
// }

// export default CourseLayout;



// // app/(course)/courses/[courseId]/layout.tsx
// import { auth } from "@clerk/nextjs/server";
// import { redirect } from "next/navigation";
// import { db } from "@/lib/db";
// import { getProgress } from "@/actions/get-progress";
// import { CourseSidebar } from "./_components/course-sidebar";
// import { CourseNavbar } from "./_components/course-navbar";
// import { NextRequest } from "next/server";

// const CourseLayout = async ({
//   children,
//   params,
//   req
// }: {
//   children: React.ReactNode;
//   params: { courseId: string };
//   req: NextRequest;
// }) => {
//   const { userId } = auth();
//   if (!userId) {
//     return redirect("/");
//   }

//   // Log params to check if courseId is being passed correctly
//   console.log("Params:", params);

//   // Check if courseId is defined
//   if (!params.courseId) {
//     console.error("courseId is not defined");
//     return redirect("/"); // Redirect if courseId is not available
//   }

//   const course = await db.course.findUnique({
//     where: {
//       id: params.courseId,
//     },
//     include: {
//       chapters: {
//         where: {
//           isPublished: true,
//         },
//         include: {
//           userProgress: {
//             where: {
//               userId,
//             }
//           },
//           chapterattachments: true, // Added this to include chapter attachments
//         },
//         orderBy: {
//           position: "asc"
//         }
//       },
//       quizzes: true, // Already included, no change needed here
//     },
//   });

//   if (!course) {
//     return redirect("/");
//   }

//   // @ts-ignore
//   const progressCount: number = await getProgress(userId, course.id);

//   // Extract quizId
//   const quizId = course.quizzes?.[0]?.id; // Get the first quizId or set a default value

//   return (
//     <div className="h-full">
//       <div className="h-[80px] md:pl-80 fixed inset-y-0 w-full z-50">
//         <CourseNavbar
//           course={course}
//           progressCount={progressCount}
//           quizId={quizId} // Pass quizId to CourseNavbar
//         />
//       </div>
//       <div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50">
//         <CourseSidebar
//           course={course}
//           progressCount={progressCount}
//           quizId={quizId} 
//         />
//       </div>
//       <main className="md:pl-80 pt-[80px] h-full">
//         {children}
//       </main>
//     </div>
//   );
// }

// export default CourseLayout;











// import { auth } from "@clerk/nextjs/server";
// import { redirect } from "next/navigation";
// import { db } from "@/lib/db";
// import { getProgress } from "@/actions/get-progress";
// import { CourseSidebar } from "./_components/course-sidebar";
// import { CourseNavbar } from "./_components/course-navbar";
// import { NextRequest } from "next/server";

// const CourseLayout = async ({
//   children,
//   params,
//   req
// }: {
//   children: React.ReactNode;
//   params: { courseId: string };
//   req: NextRequest;
// }) => {
//   const { userId } = auth();
//   if (!userId) {
//     return redirect("/");
//   }

//   // Log params to check if courseId is being passed correctly
//   console.log("Layout Params:", params);

//   // Check if courseId is defined
//   if (!params.courseId) {
//     console.error("courseId is not defined");
//     return redirect("/"); // Redirect if courseId is not available
//   }

//   const course = await db.course.findUnique({
//     where: {
//       id: params.courseId,
//     },
//     include: {
//       chapters: {
//         where: {
//           isPublished: true,
//         },
//         include: {
//           userProgress: {
//             where: {
//               userId,
//             }
//           },
//           chapterattachments: true,
//         },
//         orderBy: {
//           position: "asc"
//         }
//       },
//       quizzes: true,
//     },
//   });

//   if (!course) {
//     return redirect("/");
//   }

//   // @ts-ignore
//   const progressCount: number = await getProgress(userId, course.id);

//   // Extract quizId
//   const quizId = course.quizzes?.[0]?.id;

//   return (
//     <div className="h-full">
//       <div className="h-[80px] md:pl-80 fixed inset-y-0 w-full z-50">
//         <CourseNavbar
//           course={course}
//           progressCount={progressCount}
//           quizId={quizId}
//         />
//       </div>
//       <div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50">
//         <CourseSidebar
//           course={course}
//           progressCount={progressCount}
//           quizId={quizId} 
//         />
//       </div>
//       <main className="md:pl-80 pt-[80px] h-full">
//         {children}
//       </main>
//     </div>
//   );
// }

// export default CourseLayout;












// import { auth } from "@clerk/nextjs/server";
// import { redirect } from "next/navigation";
// import { db } from "@/lib/db";
// import { getProgress } from "@/actions/get-progress";
// import { CourseSidebar } from "./_components/course-sidebar";
// import { CourseNavbar } from "./_components/course-navbar";
// import { NextRequest } from "next/server";

// const CourseLayout = async ({
//   children,
//   params,
//   req
// }: {
//   children: React.ReactNode;
//   params: { courseId: string };
//   req: NextRequest;
// }) => {
//   const { userId } = auth();
//   if (!userId) {
//     return redirect("/");
//   }

//   // Log params to check if courseId is being passed correctly
//   console.log("Layout Params:", params);

//   // Check if courseId is defined
//   if (!params.courseId) {
//     console.error("courseId is not defined");
//     return redirect("/"); // Redirect if courseId is not available
//   }

//   // Log the courseId for debugging
//   console.log("Course ID:", params.courseId);

//   // Ensure courseId is a valid string before querying
//   if (typeof params.courseId !== 'string' || params.courseId.trim() === '') {
//     console.error("Invalid courseId:", params.courseId);
//     return redirect("/"); // Redirect if courseId is invalid
//   }

//   // Check if courseId is null or undefined
//   if (params.courseId === null || params.courseId === undefined) {
//     console.error("courseId is null or undefined");
//     return redirect("/"); // Redirect if courseId is null or undefined
//   }

//   // Attempt to find the course
//   const course = await db.course.findUnique({
//     where: {
//       id: params.courseId, // Ensure this is a valid string
//     },
//     include: {
//       chapters: {
//         where: {
//           isPublished: true,
//         },
//         include: {
//           userProgress: {
//             where: {
//               userId,
//             }
//           },
//           chapterattachments: true,
//         },
//         orderBy: {
//           position: "asc"
//         }
//       },
//       quizzes: true,
//     },
//   });

//   if (!course) {
//     console.error("Course not found for ID:", params.courseId);
//     return redirect("/");
//   }

//   // @ts-ignore
//   const progressCount: number = await getProgress(userId, course.id);

//   // Extract quizId
//   const quizId = course.quizzes?.[0]?.id;

//   return (
//     <div className="h-full">
//       <div className="h-[80px] md:pl-80 fixed inset-y-0 w-full z-50">
//         <CourseNavbar
//           course={course}
//           progressCount={progressCount}
//           quizId={quizId}
//         />
//       </div>
//       <div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50">
//         <CourseSidebar
//           course={course}
//           progressCount={progressCount}
//           quizId={quizId} 
//         />
//       </div>
//       <main className="md:pl-80 pt-[80px] h-full">
//         {children}
//       </main>
//     </div>
//   );
// }

// export default CourseLayout;




import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { getProgress } from "@/actions/get-progress";
import { CourseSidebar } from "./_components/course-sidebar";
import { CourseNavbar } from "./_components/course-navbar";
import { NextRequest } from "next/server";

const CourseLayout = async ({
  children,
  params,
  req
}: {
  children: React.ReactNode;
  params: { courseId: string };
  req: NextRequest;
}) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }

  // Log params to check if courseId is being passed correctly
  console.log("Layout Params:", params);

  // Check if courseId is defined
  if (!params.courseId) {
    console.error("courseId is not defined");
    return redirect("/"); // Redirect if courseId is not available
  }

  // Log the courseId for debugging
  console.log("Course ID:", params.courseId);

  // Ensure courseId is a valid string before querying
  if (typeof params.courseId !== 'string' || params.courseId.trim() === '') {
    console.error("Invalid courseId:", params.courseId);
    return redirect("/"); // Redirect if courseId is invalid
  }

  // Check if courseId is null or undefined
  if (params.courseId === null || params.courseId === undefined) {
    console.error("courseId is null or undefined");
    return redirect("/"); // Redirect if courseId is null or undefined
  }

  // Attempt to find the course
  const course = await db.course.findUnique({
    where: {
      id: params.courseId, // Ensure this is a valid string
    },
    include: {
      chapters: {
        where: {
          isPublished: true,
        },
        include: {
          userProgress: {
            where: {
              userId,
            }
          },
          chapterattachments: true,
        },
        orderBy: {
          position: "asc"
        }
      },
      quizzes: true,
    },
  });

  if (!course) {
    console.error("Course not found for ID:", params.courseId);
    return redirect("/");
  }

  // @ts-ignore
  const progressCount: number = await getProgress(userId, course.id);

  // Extract quizId
  const quizId = course.quizzes?.[0]?.id;

  return (
    <div className="h-full">
      <div className="h-[80px] md:pl-80 fixed inset-y-0 w-full z-50">
        <CourseNavbar
          course={course}
          progressCount={progressCount}
          quizId={quizId}
        />
      </div>
      <div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50">
        <CourseSidebar
          course={course}
          progressCount={progressCount}
          quizId={quizId} 
        />
      </div>
      <main className="md:pl-80 pt-[80px] h-full">
        {children}
      </main>
    </div>
  );
}

export default CourseLayout;


 



// import { auth } from "@clerk/nextjs/server";
// import { redirect } from "next/navigation";
// import { db } from "@/lib/db";
// import { getProgress } from "@/actions/get-progress";
// import { CourseSidebar } from "./_components/course-sidebar";
// import { CourseNavbar } from "./_components/course-navbar";
// import { NextRequest } from "next/server";

// const CourseLayout = async ({
//   children,
//   params,
//   req
// }: {
//   children: React.ReactNode;
//   params: { courseId: string };
//   req: NextRequest;
// }) => {
//   const { userId } = auth();
//   if (!userId) {
//     return redirect("/");
//   }

//   const course = await db.course.findUnique({
//     where: {
//       id: params.courseId,
//     },
//     include: {
//       chapters: {
//         where: {
//           isPublished: true,
//         },
//         include: {
//           userProgress: {
//             where: {
//               userId,
//             }
//           },
//           chapterattachments: true, // Added this to include chapter attachments
//         },
//         orderBy: {
//           position: "asc"
//         }
//       },
//       quizzes: true, // Already included, no change needed here
//     },
//   });

//   if (!course) {
//     return redirect("/");
//   }

//   // @ts-ignore
//   const progressCount: number = await getProgress(userId, course.id);

//   // Extract quizId
//   const quizId = course.quizzes?.[0]?.id; // Get the first quizId or set a default value

//   return (
//     <div className="h-full">
//       <div className="h-[80px] md:pl-80 fixed inset-y-0 w-full z-50">
//         <CourseNavbar
//           course={course}
//           progressCount={progressCount}
//           quizId={quizId} // Pass quizId to CourseNavbar
//         />
//       </div>
//       <div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50">
//         <CourseSidebar
//           course={course}
//           progressCount={progressCount}
//           quizId={quizId} 
//         />
//       </div>
//       <main className="md:pl-80 pt-[80px] h-full">
//         {children}
//       </main>
//     </div>
//   );
// }

// export default CourseLayout;