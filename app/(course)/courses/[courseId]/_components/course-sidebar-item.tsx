// 'use client';

// import { CheckCircle, Lock, PlayCircle } from "lucide-react";
// import { usePathname, useRouter } from "next/navigation";

// import { cn } from "@/lib/utils";

// interface CourseSidebarItemProps {
//   label: string;
//   id: string;
//   isCompleted: boolean;
//   courseId: string;
//   isLocked: boolean;
//   onOpenQuizModal?: () => void; // Add this line
// }

// export const CourseSidebarItem = ({
//   label,
//   id,
//   isCompleted,
//   courseId,
//   isLocked,
//   onOpenQuizModal, // Add this line
// }: CourseSidebarItemProps) => {
//   const pathname = usePathname();
//   const router = useRouter();

//   const Icon = isLocked ? Lock : (isCompleted ? CheckCircle : PlayCircle);
//   const isActive = pathname?.includes(id);

//   const onClick = () => {
//     if (!isLocked) {
//       router.push(`/courses/${courseId}/chapters/${id}`);
//     }
//     if (onOpenQuizModal && !isLocked) {
//       onOpenQuizModal(); // Call the modal function if it exists and the item is not locked
//     }
//   }

//   return (
//     <button
//       onClick={onClick}
//       type="button"
//       className={cn(
//         "flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20",
//         isActive && "text-slate-700 bg-slate-200/20 hover:bg-slate-200/20 hover:text-slate-700 dark:text-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700/20 dark:hover:text-slate-100",
//         isCompleted && "text-emerald-700 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-100",
//         isCompleted && isActive && "bg-emerald-200/20 dark:bg-emerald-300/20",
//       )}
//     >
//       <div className="flex items-center gap-x-2 py-4">
//         <Icon
//           size={25} // Resize the icon
//           className={cn(
//             "text-slate-500", 
//             isActive && "text-slate-700 dark:text-slate-300", 
//             isCompleted ? "text-emerald-500" : "text-slate-500", // Change color based on completion status
//           )}
//         />
//         {label}
//       </div>
//       <div className={cn(
//         "ml-auto opacity-0 border-2 border-slate-700 h-full transition-all",
//         isActive && "opacity-100",
//         isCompleted && "border-emerald-700"
//       )} />
//     </button>
//   );
// }





"use client";

import { CheckCircle, Lock, PlayCircle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface CourseSidebarItemProps {
  label: string;
  id: string;
  isCompleted: boolean;
  courseId: string;
  isLocked: boolean;
  onOpenQuizModal?: () => void;
}

export const CourseSidebarItem = ({
  label,
  id,
  isCompleted,
  courseId,
  isLocked,
  onOpenQuizModal,
}: CourseSidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const Icon = isLocked ? Lock : isCompleted ? CheckCircle : PlayCircle;
  const isActive = pathname?.includes(id);

  const onClick = () => {
    if (!isLocked) {
      router.push(`/courses/${courseId}/chapters/${id}`);
    }
    if (onOpenQuizModal && !isLocked) {
      onOpenQuizModal();
    }
  };

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "flex items-center gap-x-2 text-blue-500 text-sm font-semibold pl-6 transition-all hover:text-blue-600 hover:bg-blue-50",
        isActive &&
          "text-blue-700 bg-blue-100 hover:bg-blue-100 hover:text-blue-700 dark:text-blue-300 dark:bg-blue-900/30 dark:hover:bg-blue-900/40 dark:hover:text-blue-200",
        isCompleted &&
          "text-teal-700 hover:text-teal-700 dark:text-teal-300 dark:hover:text-teal-200",
        isCompleted && isActive && "bg-teal-50 dark:bg-teal-900/30"
      )}
    >
      <div className="flex items-center gap-x-2 py-4">
        <Icon
          size={35}
          className={cn(
            "text-blue-500",
            isActive && "text-blue-600 dark:text-blue-300",
            isCompleted ? "text-teal-600 dark:text-teal-300" : "text-blue-500"
          )}
        />
        <span className="text-blue-600 dark:text-blue-300 font-bold">
          {label}
        </span>
      </div>
      <div
        className={cn(
          "ml-auto opacity-0 border-2 border-blue-600 h-full transition-all",
          isActive && "opacity-100",
          isCompleted && "border-teal-600 dark:border-teal-300"
        )}
      />
    </button>
  );
};







