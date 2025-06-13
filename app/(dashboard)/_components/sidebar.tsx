// import { Logo } from "./logo"
// import { SidebarRoutes } from "./sidebar-routes"

// export const Sidebar =()=>{
//     return(
//         <div className="h-full border-r flex flex-col overflow-y-auto bg-[#3b2f85] shadow-sm">
//             <div className="p-6 bg-white">
//             <div className=""> 
//              <Logo/> 
//              </div>  
//             </div>
//             <div className="flex flex-col w-full">
//                 <SidebarRoutes  courseId={params.courseId}/>
//             </div>
             
//         </div>
//     )
// }



import { Logo } from "./logo";
import { SidebarRoutes } from "./sidebar-routes";

interface SidebarProps {
  courseId?: string; // Make courseId optional
}

export const Sidebar = ({ courseId }: SidebarProps) => {
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto bg-gradient-to-r from-indigo-600 to-purple-600 shadow-xl">
      <div className="p-6 bg-white">
        <div className="">
          <Logo />
        </div>
      </div>
      <div className="flex flex-col w-full">
        <SidebarRoutes courseId={courseId} /> {/* Pass courseId to SidebarRoutes */}
      </div>
    </div>
  );
};