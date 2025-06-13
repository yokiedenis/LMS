// "use client";

// import { cn } from "@/lib/utils";
// import { LucideIcon } from "lucide-react";
// import { useRouter, usePathname } from "next/navigation";

// interface SidebarItemProps {
//     icon: LucideIcon;
//     label: string;
//     href: string;
// };

// const SidebarItem = ({
//     icon: Icon,   
//     label,
//     href,
// }: SidebarItemProps) => {

//     const pathname = usePathname();
//     const router = useRouter();

//     // Determine if the current route is active
//     const isActive = 
//         (pathname === "/" && href === "/") ||
//         pathname === href ||
//         pathname?.startsWith(`${href}/`);

//     const onClick = () => {
//         router.push(href);
//     }
    
//     return ( 
//         <button
//             onClick={onClick}
//             type="button"
//             className={cn(
//                 "flex items-center gap-x-2 text-sm font-[500] pl-6 transition-all hover:text-white hover:bg-slate-300/20",
//                 isActive ? `bg-gray-200/20 text-gray-900` : `text-[#fcb61a]`
//             )}
//         >
//             <div className="flex items-center gap-x-2 py-4">
//                 <Icon 
//                     size={22}   
//                     className={cn(
//                         isActive ? "text-white" : "text-[#fcb61a]" // Set icon color to #fcb61a when not active
//                     )}
//                 />
//                 <span className={cn(
//                     isActive ? "text-white" : "text-[#fcb61a]" // Set text color to #fcb61a when not active
//                 )}>
//                     {label}
//                 </span>
//             </div>
//             <div 
//                 className={cn(
//                     "ml-auto opacity-0 border-2",
//                     isActive && `dark:border-sky-700 border-gray-900 bg-gray-200/20 dark:bg-sky-200/20 h-full transition-all opacity-100`
//                 )}
//             />
//         </button> 
//      );
// }

// export default SidebarItem;


"use client";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
  disabled?: boolean; // Add disabled prop
}

const SidebarItem = ({
  icon: Icon,
  label,
  href,
  disabled, // Destructure disabled prop
}: SidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();

  // Determine if the current route is active
  const isActive =
    (pathname === "/" && href === "/") ||
    pathname === href ||
    pathname?.startsWith(`${href}/`);

  const onClick = () => {
    if (!disabled) {
      router.push(href);
    }
  };

  return (
    <button
      onClick={onClick}
      type="button"
      disabled={disabled} // Disable the button if the link is disabled
      className={cn(
        "flex items-center gap-x-2 text-sm font-[500] pl-6 transition-all hover:text-white hover:bg-slate-300/20",
        isActive
          ? "bg-gray-200/20 text-gray-900"
          : "text-[#fcb61a]",
        disabled && "opacity-50 cursor-not-allowed" // Apply styles for disabled state
      )}
    >
      <div className="flex items-center gap-x-2 py-4">
        <Icon
          size={22}
          className={cn(
            isActive ? "text-white" : "text-[#fcb61a]",
            disabled && "opacity-50" // Apply opacity to icon when disabled
          )}
        />
        <span
          className={cn(
            isActive ?   "text-[#fcb61a]":"text-white",
            disabled && "opacity-50" // Apply opacity to text when disabled
          )}
        >
          {label}
        </span>
      </div>
      <div
        className={cn(
          "ml-auto opacity-0 border-2",
          isActive &&
            "dark:border-sky-700 border-gray-900 bg-gray-200/20 dark:bg-sky-200/20 h-full transition-all opacity-100"
        )}
      />
    </button>
  );
};

export default SidebarItem;
