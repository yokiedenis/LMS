// import { LucideIcon } from "lucide-react";
// import { IconBadge } from "@/components/icon-badge";

// interface InfoCardProps {
//   numberOfItems: number;
//   variant?: "default" | "success";
//   label: string;
//   icon: LucideIcon;
// }

// export const InfoCard = ({
//   variant,
//   icon: Icon,
//   numberOfItems,
//   label,
// }: InfoCardProps) => {
//   return (
//     <div 
//       className="border rounded-md flex items-center gap-x-2 p-3" 
//       style={{ backgroundColor: '#3b2f85' }} // Set background color
//     >
//       <IconBadge
//         variant={variant}
//         icon={Icon}
//       />
//       <div>
//         <p style={{color:`#f8b516`}}  className="font-medium">
//           {label}
//         </p>
//         <p className="text-white text-sm">
//           {numberOfItems} {numberOfItems === 1 ? "Course" : "Courses"}
//         </p>
//       </div>
//     </div>
//   );
// };





// app/(dashboard)/(routes)/(root)/_components/info-card.tsx
import { LucideIcon } from "lucide-react";
import { IconBadge } from "@/components/icon-badge";

interface InfoCardProps {
  numberOfItems: number;
  variant?: "default" | "success";
  label: string;
  icon: LucideIcon;
  className?: string; // Add this line
}

export const InfoCard = ({
  variant,
  icon: Icon,
  numberOfItems,
  label,
  className, // Add this to the destructured props
}: InfoCardProps) => {
  return (
    <div 
      className={`border rounded-md flex items-center gap-x-2 p-3 ${className || ''}`} // Apply className here
      style={{ backgroundColor: '#3b2f85' }} // Set background color
    >
      <IconBadge
        variant={variant}
        icon={Icon}
      />
      <div>
        <p style={{ color: '#f8b516' }} className="font-medium">
          {label}
        </p>
        <p className="text-white text-sm">
          {numberOfItems} {numberOfItems === 1 ? "Course" : "Courses"}
        </p>
      </div>
    </div>
  );
};