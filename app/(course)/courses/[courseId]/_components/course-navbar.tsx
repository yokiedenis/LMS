// CourseNavbar.tsx

// 




import { Prisma } from "@prisma/client";
import { NavbarRoutes } from "@/components/navbar-routes";
import { CourseMobileSidebar } from "./course-mobile-sidebar";

interface CourseNavbarProps {
  course: Prisma.CourseGetPayload<{
    include: {
      chapters: {
        include: {
          userProgress: true;
          chapterattachments?: true;
        };
      };
    };
  }>;
  progressCount: number;
  quizId: string;
}

export const CourseNavbar = ({
  course,
  progressCount,
  quizId,
}: CourseNavbarProps) => {
  return (
    <div className="sticky top-0 p-4 border-b h-full flex items-center shadow-sm bg-white z-10">
      <CourseMobileSidebar
        course={course}
        progressCount={progressCount}
        quizId={quizId}
      />
      <NavbarRoutes />
    </div>
  );
};