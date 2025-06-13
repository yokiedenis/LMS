// // lib/getCourseData.ts

// import { db } from "@/lib/db";
// import { auth } from "@clerk/nextjs/server";

// export const getCourseData = async (courseId: string) => {
//   const { userId } = auth();

//   if (!userId) {
//     return { redirect: true };
//   }

//   const course = await db.course.findUnique({
//     where: { id: courseId },
//     include: {
//       chapters: {
//         include: {
//           userProgress: true,
//         },
//       },
//     },
//   });

//   const purchase = await db.purchase.findUnique({
//     where: {
//       userId_courseId: {
//         userId,
//         courseId: courseId,
//       },
//     },
//   });

//   return {
//     course,
//     purchase,
//   };
// };
