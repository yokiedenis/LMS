// import { db } from "@/lib/db";
// import { redirect } from "next/navigation";

// const CourseIdPage = async ({
//   params
// }: {
//   params: { courseId: string; }
// }) => {
//   const course = await db.course.findUnique({
//     where: {
//       id: params.courseId,
//     },
//     include: {
//       chapters: {
//         where: {
//           isPublished: true,
//         },
//         orderBy: {
//           position: "asc"
//         }
//       },
      
//     }
//   });

//   if (!course) {
//     return redirect("/");
//   }

//   return redirect(`/courses/${course.id}/chapters/${course.chapters[0].id}`);
// }
 
// export default CourseIdPage;





import { db } from "@/lib/db";
import { redirect } from "next/navigation";

const CourseIdPage = async ({
  params
}: {
  params: { courseId: string; }
}) => {
  // Log params to check if courseId is being passed correctly
  console.log("Course ID Params:", params);

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      chapters: {
        where: {
          isPublished: true,
        },
        orderBy: {
          position: "asc"
        }
      },
    }
  });

  if (!course) {
    return redirect("/");
  }

  // Redirect to the first chapter of the course
  return redirect(`/courses/${course.id}/chapters/${course.chapters[0].id}`);
}

export default CourseIdPage;











