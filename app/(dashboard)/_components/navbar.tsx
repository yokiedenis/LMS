import { NavbarRoutes } from "@/components/navbar-routes";
import MobileSidebar from "./mobile-sidebar";

const NavBar = () => {
    return ( 
    <div className="sticky top-0 p-4 border-b h-full flex items-center shadow-sm bg-white z-10">
     <MobileSidebar/>
         <NavbarRoutes/>
        </div>
     );
}
 
export default NavBar;