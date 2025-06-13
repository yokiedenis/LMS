// import { Category, Course } from "@prisma/client";
// import { CourseCard } from "@/components/course-card";
// import { CourseWithProgressWithCategory } from "@/types";

// interface CoursesListProps {
//   items: CourseWithProgressWithCategory[];
// }

// export const CoursesList = ({ items }: CoursesListProps) => {
//   return (
//     <div>
//       <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
//         {items.map((item) => (
//           <CourseCard
//             key={item.id}
//             id={item.id}
//             title={item.title}
//             imageUrl={item.imageUrl!}
//             chaptersLength={item.chapters.length}
//             price={item.price!}
//             progress={item.progress}
//             category={item?.category?.name!}
//           />
//         ))}
//       </div>
//       {items.length === 0 && (
//         <div className="text-center text-sm text-muted-foreground mt-10">
//           No courses found
//         </div>
//       )}
//     </div>
//   );
// };





// import { Category, Course } from "@prisma/client";
// import { CourseCard } from "@/components/course-card";
// import { CourseWithProgressWithCategory } from "@/types";

// interface CoursesListProps {
//   items: CourseWithProgressWithCategory[];
// }

// export const CoursesList = ({ items }: CoursesListProps) => {
//   return (
//     <div>
//       <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
//         {items.map((item) => (
//           <CourseCard
//             key={item.id}
//             id={item.id}
//             title={item.title}
//             imageUrl={item.imageUrl || ""}
//             chaptersLength={item.chapters.length}
//             price={item.price || 0}
//             progress={item.progress}
//             category={item.category?.name || "Uncategorized"}
//           />
//         ))}
//       </div>
//       {items.length === 0 && (
//         <div className="text-center text-sm text-muted-foreground mt-10">
//           No courses found
//         </div>
//       )}
//     </div>
//   );
// };



// import { Category, Course } from "@prisma/client";

// import { CourseCard } from "@/components/course-card";

// import { CourseWithProgressWithCategory } from "@/types";

// interface CoursesListProps {
//     items: CourseWithProgressWithCategory[];
// }

// export const CoursesList = ({
//     items
// }: CoursesListProps) => {
//     return (
//         <div>
//             <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
//                 {items.map((item) => (
//                     <CourseCard
//                         key={item.id}
//                         id={item.id}
//                         title={item.title}
//                         imageUrl={item.imageUrl!}
//                         chaptersLength={item.chapters.length}
//                         price={item.price!}
//                         progress={item.progress}
//                         category={item?.category?.name!}
//                     />
//                 ))}
//             </div>
//             {items.length === 0 && (
//                 <div className="text-center text-sm text-muted-foreground mt-10">
//                     No courses found
//                 </div>
//             )}
//         </div>
//     )
// }









// Likely in @/components/courses-list.tsx
// import { Category, Course } from "@prisma/client";
// import { CourseCard } from "@/components/course-card";
// import { CourseWithProgressWithCategory } from "@/types";

// interface CoursesListProps {
//   items: CourseWithProgressWithCategory[];
//   className?: string; // Add this line
// }

// export const CoursesList = ({
//   items,
//   className, // Add this to the destructured props
// }: CoursesListProps) => {
//   return (
//     <div className={className}> {/* Apply className here */}
//       <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
//         {items.map((item) => (
//           <CourseCard
//             key={item.id}
//             id={item.id}
//             title={item.title}
//             imageUrl={item.imageUrl!}
//             chaptersLength={item.chapters.length}
//             price={item.price!}
//             progress={item.progress}
//             category={item?.category?.name!}
//           />
//         ))}
//       </div>
//       {items.length === 0 && (
//         <div className="text-center text-sm text-muted-foreground mt-10">
//           No courses found
//         </div>
//       )}
//     </div>
//   );
// };








// @/components/courses-list.tsx
import { CourseWithProgressWithCategory } from "@/types";
import { CourseCard } from "@/components/course-card";

interface CoursesListProps {
  items: CourseWithProgressWithCategory[];
  className?: string;
}

export const CoursesList = ({
  items,
  className,
}: CoursesListProps) => {
  return (
    <div className={className}>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
        {items.map((item) => (
          <CourseCard
            key={item.id}
            id={item.id}
            title={item.title}
            imageUrl={item.imageUrl!}
            chaptersLength={item.chapters.length}
            price={item.price!}
            progress={item.progress}
            category={item?.category?.name!}
            className="w-full min-w-[320px] max-w-[350px] mx-auto" // Set width to match the second image
          />
        ))}
      </div>
      {items.length === 0 && (
        <div className="text-center text-sm text-muted-foreground mt-10">
          No courses found
        </div>
      )}
    </div>
  );
};