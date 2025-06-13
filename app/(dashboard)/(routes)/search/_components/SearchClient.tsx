// // app/(dashboard)/(routes)/search/SearchClient.tsx
// "use client";

// import { useState } from "react";
// import { SearchInput } from "@/components/search-input";
// import { CoursesList } from "@/components/courses-list";
// import { Categories } from "./categories";
// import Livestream from "@/components/livestream";
// import { CourseWithProgressWithCategory } from "@/types";
// import { Category } from "@prisma/client";

// interface SearchClientProps {
//   initialCategories: Category[];
//   initialCourses: CourseWithProgressWithCategory[];
//   searchParams: {
//     title: string;
//     categoryId: string;
//   };
// }

// export default function SearchClient({
//   initialCategories,
//   initialCourses,
//   searchParams,
// }: SearchClientProps) {
//   const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

//   const handleCourseSelect = (courseId: string) => {
//     setSelectedCourseId(courseId);
//   };

//   return (
//     <>
//       <div className="px-6 pt-6 md:hidden md:mb-0 block">
//         <SearchInput />
//       </div>
//       <div className="p-6 space-y-4">
//         <Categories items={initialCategories} />
//         <CoursesList
//           items={initialCourses}
//           onCourseSelect={handleCourseSelect}
//           selectedCourseId={selectedCourseId}
//         />
//         {selectedCourseId ? (
//           <Livestream courseId={selectedCourseId} />
//         ) : (
//           <div className="text-center text-gray-500 p-6">
//             <p>Please select a course to view its livestream content.</p>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }