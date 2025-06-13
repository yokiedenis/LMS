// // app/(course)/courses/[courseId]/_components/course-sidebar-server.tsx
// import { redirect } from "next/navigation";
// import { auth } from "@clerk/nextjs/server";
// import { db } from "@/lib/db";
// import { Course, UserProgress } from "@prisma/client";
// import {CourseSidebar} from "./course-sidebar"; // Client Component

// interface CourseSidebarServerProps {
//   course: Course & {
//     chapters: {
//       userProgress: UserProgress[] | null;
//     }[];
//   };
//   progressCount: number;
// }

// const CourseSidebarServer = async ({
//   course,
//   progressCount,
// }: CourseSidebarServerProps) => {
//   const { userId } = auth(); // Server-side authentication

//   if (!userId) {
//     return redirect("/"); // Redirect if not authenticated
//   }

//   const purchase = await db.purchase.findUnique({
//     where: {
//       userId_courseId: {
//         userId,
//         courseId: course.id,
//       },
//     },
//   });

//   // Pass all the necessary data to the client component
//   const allChaptersCompleted = course.chapters.every(
//     (chapter) => !!chapter.userProgress?.[0]?.isCompleted
//   );

//   return (
//     <CourseSidebar
//       course={course}
//       progressCount={progressCount}
//       purchase={purchase}
//       allChaptersCompleted={allChaptersCompleted}
//     />
//   );
// };

// export default CourseSidebarServer;
