// "use client";

// import { Layout, Compass, List, BarChart, Users, CircleHelp, MessageCircle, Trophy, Video, User } from "lucide-react";
// import SidebarItem from "./sidebar-item";
// import { usePathname } from "next/navigation";
// import { useUser } from "@clerk/nextjs";
// import { isTeacher } from "@/lib/teacher";  // Assuming roles.js or similar file
// import { isSuperAdmin } from "@/lib/isSuperAdmin";

// const studentRoutes = [
//     { icon: Layout, label: "Dashboard", href: "/" },
//     { icon: Compass, label: "Browse", href: "/search" },
//     { icon: CircleHelp, label: "Student Helper", href: "/help" },
//   //  { icon: BarChart, label: "Student Analytics", href: "/analytics" },
//     { icon: Trophy, label: "Leaderboard", href: "/leaderboard" },
//     { icon: Video, label: "Class Live Stream",  href: "/livestream" },
//     { icon: User, label: "User Profile",  href: "/profile" },
// ];

// const teacherRoutes = [
//     { icon: List, label: "Courses", href: "/teacher/courses" },
//   //  { icon: BarChart, label: "Analytics", href: "/teacher/analytics" },
//     { icon: MessageCircle, label: "Student Feedback", href: "/teacher/feedback" },
//     { icon: Trophy, label: "Leaderboard", href: "/leaderboard" },
//     { icon: Video, label: "Class Live Stream", href: "/livestream" },
// ];

// const superAdminRoutes = [
//     { icon: BarChart, label: "Main DashBoard", href: "/teacher/analytics" },
//     ...teacherRoutes,
   
//    // { icon: Users, label: "Manage Users", href: "/teacher/users" },
//     // { icon: Trophy, label: "Student Leaderboard", href: "/leaderboard" },
// ];

// export const SidebarRoutes = () => {
//     const pathname = usePathname();
//     const { user } = useUser();

//     // Determine user role
//     const userId = user?.id;
//     const isSuperAdminUser = userId && isSuperAdmin(userId);
//     const isTeacherUser = userId && isTeacher(userId);

//     // Determine which routes to show based on user role
//     let routes = studentRoutes;
//     if (isSuperAdminUser) {
//         routes = superAdminRoutes;
//     } else if (isTeacherUser) {
//         routes = teacherRoutes;
//     }

//     return (
//         <div className="flex flex-col w-full">
//             {routes.map((route, index) => (
//                 <SidebarItem 
//                     key={index}
//                     icon={route.icon}
//                     label={route.label}
//                     href={route.href}
//                 />
//             ))}
//         </div>
//     );
// };





// "use client";

// import { Layout, Compass, List, BarChart, Users, CircleHelp, MessageCircle, Trophy, Video, User } from "lucide-react";
// import SidebarItem from "./sidebar-item";
// import { usePathname } from "next/navigation";
// import { useUser } from "@clerk/nextjs";
// import { isTeacher } from "@/lib/teacher";
// import { isSuperAdmin } from "@/lib/isSuperAdmin";

// // Define props interface for SidebarRoutes
// interface SidebarRoutesProps {
//   courseId?: string; // Optional courseId to match Sidebar
// }

// // Base routes for different roles (without courseId yet)
// const studentRoutes = [
//   { icon: Layout, label: "Dashboard", href: "/" },
//   { icon: Compass, label: "Browse", href: "/search" },
//   { icon: CircleHelp, label: "Student Helper", href: "/help" },
//   { icon: Trophy, label: "Leaderboard", href: "/leaderboard" },
//   { icon: Video, label: "Class Live Stream", href: "/livestream" }, // Will be dynamic
//   { icon: User, label: "User Profile", href: "/profile" },
// ];

// const teacherRoutes = [
//   { icon: List, label: "Courses", href: "/teacher/courses" },
//   { icon: MessageCircle, label: "Student Feedback", href: "/teacher/feedback" },
//   { icon: Trophy, label: "Leaderboard", href: "/leaderboard" },
//   { icon: Video, label: "Class Live Stream", href: "/livestream" }, // Will be dynamic
// ];

// const superAdminRoutes = [
//   { icon: BarChart, label: "Main Dashboard", href: "/teacher/analytics" },
//   ...teacherRoutes,
// ];

// export const SidebarRoutes = ({ courseId }: SidebarRoutesProps) => {
//   const pathname = usePathname();
//   const { user } = useUser();

//   // Determine user role
//   const userId = user?.id;
//   const isSuperAdminUser = userId && isSuperAdmin(userId);
//   const isTeacherUser = userId && isTeacher(userId);

//   // Determine base routes based on user role
//   let baseRoutes = studentRoutes;
//   if (isSuperAdminUser) {
//     baseRoutes = superAdminRoutes;
//   } else if (isTeacherUser) {
//     baseRoutes = teacherRoutes;
//   }

//   // Dynamically adjust routes based on courseId
//   const routes = baseRoutes.map((route) => {
//     // If the route is for "Class Live Stream" and courseId exists, append it
//     if (route.label === "Class Live Stream" && courseId) {
//       return {
//         ...route,
//         href: `/livestream/${courseId}`,
//       };
//     }
//     return route;
//   });

//   return (
//     <div className="flex flex-col w-full">
//       {routes.map((route, index) => (
//         <SidebarItem
//           key={index}
//           icon={route.icon}
//           label={route.label}
//           href={route.href}
//         />
//       ))}
//     </div>
//   );
// };













"use client";

import { Layout, Compass, List, BarChart, Users, CircleHelp, MessageCircle, Trophy, Video, User,FileText, TrendingUp, Brain,GraduationCap } from "lucide-react";
import SidebarItem from "./sidebar-item";
import { usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { isTeacher } from "@/lib/teacher";
import { isSuperAdmin } from "@/lib/isSuperAdmin";

// Define props interface for SidebarRoutes
interface SidebarRoutesProps {
  courseId?: string; // Optional courseId to match Sidebar
}

// Base routes for different roles
const studentRoutes = [
  { icon: Layout, label: "Dashboard", href: "/" },
  { icon: Compass, label: "Browse", href: "/search" },
  { icon: CircleHelp, label: "Student Helper", href: "/help" },
  { icon: Trophy, label: "Leaderboard", href: "/leaderboard" },
 // { icon: Video, label: "Class Live Stream", href: "/livestream" }, // Base path, will be dynamic
 // { icon: FileText, label: "Recordings & Materials", href: "/CourseMaterials" },
 // { icon: FileText, label: "Recordings", href: "/recordings" }, // New Recordings route
 // { icon: FileText, label: "Attachments", href: "/attachments" }, // New Attachments route
  { icon: TrendingUp, label: "Progress Tracker", href: "/progress" }, // New Progress Tracker item
  { icon: Brain , label: "ChatBot AI", href: "/chatbot" },
  { icon: User, label: "User Profile", href: "/profile" },
 // { icon: GraduationCap, label: "Certificate", href: "/Graduation" },
];

const teacherRoutes = [
  { icon: List, label: "Courses", href: "/teacher/courses" },
  //{ icon: MessageCircle, label: "Student Feedback", href: "/teacher/feedback" },
  { icon: CircleHelp, label: "Student Helper", href: "/help" },
  { icon: Trophy, label: "Leaderboard", href: "/leaderboard" },
 // { icon: FileText, label: "Recordings & Materials", href: "/CourseMaterials" },
  { icon: Brain , label: "ChatBot AI", href: "/chatbot" },
  //{ icon: Video, label: "Class Live Stream", href: "/livestream" }, // Base path, will be dynamic
];

const superAdminRoutes = [
  { icon: BarChart, label: "Main Dashboard", href: "/teacher/analytics" },
 // { icon: List, label: "Course Management", href: "/courses/admin" }, 
  ...teacherRoutes,
];

export const SidebarRoutes = ({ courseId }: SidebarRoutesProps) => {
  const pathname = usePathname();
  const { user } = useUser();

  // Determine user role
  const userId = user?.id;
  const isSuperAdminUser = userId && isSuperAdmin(userId);
  const isTeacherUser = userId && isTeacher(userId);

  // Determine base routes based on user role
  let baseRoutes = studentRoutes;
  if (isSuperAdminUser) {
    baseRoutes = superAdminRoutes;
  } else if (isTeacherUser) {
    baseRoutes = teacherRoutes;
  }

  // Dynamically adjust routes based on courseId
  const routes = baseRoutes.map((route) => {
    if (route.label === "Class Live Stream" && courseId) {
      return {
        ...route,
        href: `/livestream/${courseId}`, // Matches app/(dashboard)/(routes)/livestream/[courseId]/page.tsx
      };
    }
    return route;
  });

  return (
    <div className="flex flex-col w-full">
      {routes.map((route, index) => (
        <SidebarItem
          key={index}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
};


























// "use client";

// import { Layout, Compass, List, BarChart, Users, CircleHelp, MessageCircle, Trophy, Video, User } from "lucide-react";
// import SidebarItem from "./sidebar-item";
// import { usePathname } from "next/navigation";
// import { useUser } from "@clerk/nextjs";
// import { isTeacher } from "@/lib/teacher";  // Assuming roles.js or similar file
// import { isSuperAdmin } from "@/lib/isSuperAdmin";

// interface SidebarRoutesProps {
//   courseId?: string; // Make courseId optional
// }

// const studentRoutes = (courseId?: string) => [
//   { icon: Layout, label: "Dashboard", href: "/" },
//   { icon: Compass, label: "Browse", href: "/search" },
//   { icon: CircleHelp, label: "Student Helper", href: "/help" },
//   // { icon: BarChart, label: "Student Analytics", href: "/analytics" },
//   { icon: Trophy, label: "Leaderboard", href: "/leaderboard" },
//   {
//     icon: Video,
//     label: "Class Live Stream",
//     href: courseId ? `/courses/${courseId}/livestream` : "#", // Use courseId dynamically
//     disabled: !courseId, // Optionally disable the link if courseId is missing
//   },
//   { icon: User, label: "User Profile", href: "/profile" },
// ];

// const teacherRoutes = [
//   { icon: List, label: "Courses", href: "/teacher/courses" },
//   // { icon: BarChart, label: "Analytics", href: "/teacher/analytics" },
//   { icon: MessageCircle, label: "Student Feedback", href: "/teacher/feedback" },
//   { icon: Trophy, label: "Leaderboard", href: "/leaderboard" },
//   { icon: Video, label: "Class Live Stream", href: "/livestream" },
// ];

// const superAdminRoutes = [
//   { icon: BarChart, label: "Main DashBoard", href: "/teacher/analytics" },
//   ...teacherRoutes,
//   // { icon: Users, label: "Manage Users", href: "/teacher/users" },
//   // { icon: Trophy, label: "Student Leaderboard", href: "/leaderboard" },
// ];

// export const SidebarRoutes = ({ courseId }: SidebarRoutesProps) => {
//   const pathname = usePathname();
//   const { user } = useUser();

//   // Determine user role
//   const userId = user?.id;
//   const isSuperAdminUser = userId && isSuperAdmin(userId);
//   const isTeacherUser = userId && isTeacher(userId);

//   // Determine which routes to show based on user role
//   let routes = studentRoutes(courseId); // Pass courseId to studentRoutes
//   if (isSuperAdminUser) {
//     routes = superAdminRoutes;
//   } else if (isTeacherUser) {
//     routes = teacherRoutes;
//   }

//   return (
//     <div className="flex flex-col w-full">
//       {routes.map((route, index) => (
//         <SidebarItem
//           key={index}
//           icon={route.icon}
//           label={route.label}
//           href={route.href}
//           //disabled={route.disabled} // Pass disabled prop to SidebarItem
//         />
//       ))}
//     </div>
//   );
// };