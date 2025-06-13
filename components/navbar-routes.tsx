// "use client";

// import { UserButton, useAuth } from "@clerk/nextjs";
// import { usePathname } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { LogOut, Bell, Book } from "lucide-react"; // Added Book icon for Course Materials
// import Link from "next/link";
// import { SearchInput } from "./search-input";
// import { isTeacher as checkIfTeacher } from "@/lib/teacher"; // Renamed import
// import { useState, useEffect } from "react"; // Add useState and useEffect

// interface NavbarRoutesProps {}

// export const NavbarRoutes: React.FC<NavbarRoutesProps> = () => {
//   const { userId } = useAuth();
//   const pathname = usePathname();

//   const isTeacherPage = pathname?.startsWith("/teacher");
//   const isPlayerPage = pathname?.includes("/chapters");
//   const isSearchPage = pathname === "/search";

//   // Quotes for AI and LMS systems
//   const quotes = [
   
//     "Tech is revolutionizing education",
   
//   ];

//   const [currentQuote, setCurrentQuote] = useState<string>(quotes[0]);

//   useEffect(() => {
//     const quoteInterval = setInterval(() => {
//       setCurrentQuote((prevQuote) => {
//         const currentIndex = quotes.indexOf(prevQuote);
//         return quotes[(currentIndex + 1) % quotes.length];
//       });
//     }, 5000); // Change quote every 5 seconds

//     return () => clearInterval(quoteInterval);
//   }, []);

//   // Condition to render the quote only on the Dashboard and other specific pages
//   const showQuote = pathname === "/"; // Add more pages if necessary

//   // Extract chapterId if it exists in the pathname
//   const chapterIdMatch = pathname?.match(/\/chapters\/(\d+)/); // Assuming chapterId is numeric
//   const chapterId = chapterIdMatch ? chapterIdMatch[1] : null;

//   return (
//     <>
//       {isSearchPage && (
//         <div className="hidden md:block">
//           <SearchInput />
//         </div>
//       )}

//       <div className="flex gap-x-4 items-center ml-auto">
//         {/* Animated Quote */}
//         {showQuote && (
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               padding: "10px 20px",
//               fontSize: "15px",
//             }}
//           >
//             <span className="center animated-text">{currentQuote}</span>
//           </div>
//         )}

//         {/* Notifications */}
//         <Link href="/notifications">
//           <div className="flex items-center gap-2 cursor-pointer">
//             <Bell className="h-5 w-5 text-blue-500" /> {/* Notification Icon */}
//             <span className="hidden md:block text-sm text-custom-yellow">
//               Notifications
//             </span>
//           </div>
//         </Link>

//         {/* Course Materials icon only for chapter pages */}
//         {chapterId && (
//           <Link href="/coursematerials">
//             <div className="flex items-center gap-2 cursor-pointer">
//               <Book className="h-5 w-5 text-green-500" /> {/* Course Materials Icon */}
//               <span className="hidden md:block text-sm text-green-500">
//                 Materials
//               </span>
//             </div>
//           </Link>
//         )}

//         {isTeacherPage || isPlayerPage ? (
//           <Link href="/">
//             <Button size="sm" variant="destructive">
//               <LogOut className="h-4 w-4 mr-2" />
//               DashBoard
//             </Button>
//           </Link>
//         ) : checkIfTeacher(userId) ? (
//           <Link href="/teacher/courses">
//             <Button size="sm" variant="success">
//               Admin Mode
//             </Button>
//           </Link>
//         ) : null}

//         <UserButton afterSignOutUrl="/sign-in" />
//       </div>
//     </>
//   );
// };








// "use client";

// import { UserButton, useAuth } from "@clerk/nextjs";
// import { usePathname } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { LogOut, Bell, Book } from "lucide-react";
// import Link from "next/link";
// import { SearchInput } from "./search-input";
// import { isTeacher as checkIfTeacher } from "@/lib/teacher";
// import { useState } from "react";

// interface NavbarRoutesProps {}

// export const NavbarRoutes: React.FC<NavbarRoutesProps> = () => {
//   const { userId } = useAuth();
//   const pathname = usePathname();

//   const isTeacherPage = pathname?.startsWith("/teacher");
//   const isPlayerPage = pathname?.includes("/chapters");
//   const isSearchPage = pathname === "/search";

//   // Quotes for AI and LMS systems
//   const quotes = [
//     "TECH IS REVOLUTIONIZING EDUCATION",
//   ];

//   const [currentQuote] = useState<string>(quotes[0]);

//   // Condition to render the quote only on the Dashboard and other specific pages
//   //const showQuote = pathname === "/"; // Add more pages if necessary

//   // Condition to render the quote on the Dashboard and other specific pages
//    const showQuote = ["/", "/leaderboard", "/help", "/livestream", "/profile"].includes(pathname);

//   // Extract chapterId if it exists in the pathname
//   const chapterIdMatch = pathname?.match(/\/chapters\/(\d+)/);
//   const chapterId = chapterIdMatch ? chapterIdMatch[1] : null;

//   return (
//     <>
//       {isSearchPage && (
//         <div className="hidden md:block">
//           <SearchInput />
//         </div>
//       )}

//       <div className="flex gap-x-4 items-center ml-auto">
//         {/* Static Quote with specific styling */}
//         {showQuote && (
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               padding: "10px 20px",
//               fontSize: "15px",
//               textAlign: "center",
//             }}
//           >
//             <span 
//               style={{
//                 color: "#001F3F", // Light blue color matching the image
//                 fontSize: "30px", // Adjust to match the size in the image
//                 fontWeight: "bold",
//                 textShadow: "0 0 10px #00BFFF, 0 0 20px #00BFFF, 0 0 30px #00BFFF", // Adds glow effect
//                 textAlign: "center"

//               }}
//             >
//               {currentQuote}
//             </span>
//           </div>
//         )}

//         {/* Notifications */}
//         <Link href="/notifications">
//           <div className="flex items-center gap-2 cursor-pointer">
//             <Bell className="h-5 w-5 text-blue-500" />
//             <span className="hidden md:block text-sm text-custom-yellow">
//               Notifications
//             </span>
//           </div>
//         </Link>

//         {/* Course Materials icon only for chapter pages */}
//         {chapterId && (
//           <Link href="/coursematerials">
//             {/* <div className="flex items-center gap-2 cursor-pointer">
//               <Book className="h-5 w-5 text-green-500" />
//               <span className="hidden md:block text-sm text-green-500">
//                 Materials
//               </span>
//             </div> */}
//           </Link>
//         )}

//         {isTeacherPage || isPlayerPage ? (
//           <Link href="/">
//             <Button size="sm" variant="destructive">
//               <LogOut className="h-4 w-4 mr-2" />
//               DashBoard
//             </Button>
//           </Link>
//         ) : checkIfTeacher(userId) ? (
//           <Link href="/teacher/courses">
//             <Button size="sm" variant="success">
//               Admin Mode
//             </Button>
//           </Link>
//         ) : null}

//         <UserButton afterSignOutUrl="/sign-in" />
//       </div>
//     </>
//   );
// };


// "use client";

// import { UserButton, useAuth } from "@clerk/nextjs";
// import { usePathname } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { LogOut, Bell, Book, CalendarPlus, X } from "lucide-react";
// import Link from "next/link";
// import { SearchInput } from "./search-input";
// import { isTeacher as checkIfTeacher } from "@/lib/teacher";
// import { useState } from "react";
// import AdminCalendar from "@/components/AdminCalendar"; // Import the AdminCalendar component

// interface NavbarRoutesProps {}

// export const NavbarRoutes: React.FC<NavbarRoutesProps> = () => {
//   const { userId } = useAuth();
//   const pathname = usePathname();

//   const isTeacherPage = pathname?.startsWith("/teacher");
//   const isPlayerPage = pathname?.includes("/chapters");
//   const isSearchPage = pathname === "/search";

//   // Quotes for AI and LMS systems
//   const quotes = [
//     "REVOLUTIONIZING EDUCATION",
//   ];

//   const [currentQuote] = useState<string>(quotes[0]);

//   const showQuote = ["/", "/leaderboard", "/help", "/livestream", "/profile"].includes(pathname);

//   // Extract chapterId if it exists in the pathname
//   const chapterIdMatch = pathname?.match(/\/chapters\/(\d+)/);
//   const chapterId = chapterIdMatch ? chapterIdMatch[1] : null;

//   // State to control the visibility of the Admin Calendar
//   const [showAdminCalendar, setShowAdminCalendar] = useState(false);

//   return (
//     <>
//       {isSearchPage && (
//         <div className="hidden md:block">
//           <SearchInput />
//         </div>
//       )}

//       <div className="flex gap-x-4 items-center ml-auto">
//         {showQuote && (
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               padding: "10px 20px",
//               fontSize: "15px",
//               textAlign: "center",
//             }}
//           >
//             <span 
//               style={{
//                 color: "#001F3F",
//                 fontSize: "30px",
//                 fontWeight: "bold",
//                 textShadow: "0 0 10px #00BFFF, 0 0 20px #00BFFF, 0 0 30px #00BFFF",
//                 textAlign: "center"
//               }}
//             >
//               {currentQuote}
//             </span>
//           </div>
//         )}

//         {/* Notifications */}
//         <Link href="/notifications">
//           <div className="flex items-center gap-2 cursor-pointer">
//             <Bell className="h-5 w-5 text-blue-500" />
//             <span className="hidden md:block text-sm text-custom-yellow">
//               Notifications
//             </span>
//           </div>
//         </Link>

//         {/* Course Materials icon only for chapter pages */}
//         {chapterId && (
//           <Link href="/coursematerials">
//             {/* 
//             <div className="flex items-center gap-2 cursor-pointer">
//               <Book className="h-5 w-5 text-green-500" />
//               <span className="hidden md:block text-sm text-green-500">
//                 Materials
//               </span>
//             </div> 
//             */}
//           </Link>
//         )}

//         {isTeacherPage || isPlayerPage ? (
//           <Link href="/">
//             <Button size="sm" variant="destructive">
//               <LogOut className="h-4 w-4 mr-2" />
//               DashBoard
//             </Button>
//           </Link>
//         ) : checkIfTeacher(userId) ? (
//           <>
//             <Link href="/teacher/courses">
//               <Button size="sm" variant="success">
//                 Admin Mode
//               </Button>
//             </Link>
//             <Button 
//               size="sm" 
//               variant="secondary"
//               onClick={() => setShowAdminCalendar(!showAdminCalendar)}
//             >
//               <CalendarPlus className="h-4 w-4 mr-2" />
//               Calendar
//             </Button>
//           </>
//         ) : null}

//         <UserButton afterSignOutUrl="/sign-in" />
//       </div>

//       {/* Admin Calendar Modal */}
//       {showAdminCalendar && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white p-4 rounded-lg shadow-lg max-w-lg w-full">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-lg font-bold">Admin Calendar</h2>
//               <button onClick={() => setShowAdminCalendar(false)}><X /></button>
//             </div>
//             <AdminCalendar setShowAdminCalendar={setShowAdminCalendar} />
//           </div>
//         </div>
//       )}
//     </>
//   );
// };








// "use client";

// import { UserButton, useAuth } from "@clerk/nextjs";
// import { usePathname } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { LogOut, Bell, Book, CalendarPlus, X } from "lucide-react";
// import Link from "next/link";
// import { SearchInput } from "./search-input";
// import { isTeacher as checkIfTeacher } from "@/lib/teacher";
// import { useState } from "react";
// import AdminCalendar from "@/components/AdminCalendar";

// // Define Event interface here since it's not exported from AdminCalendar.tsx
// interface Event {
//   title: string;
//   start: Date;
//   end: Date;
//   allDay?: boolean;
// }

// interface NavbarRoutesProps {}

// export const NavbarRoutes: React.FC<NavbarRoutesProps> = () => {
//   const { userId } = useAuth();
//   const pathname = usePathname();

//   const isTeacherPage = pathname?.startsWith("/teacher");
//   const isPlayerPage = pathname?.includes("/chapters");
//   const isSearchPage = pathname === "/search";

//   // Quotes for AI and LMS systems
//   const quotes = [
//     "REVOLUTIONIZING EDUCATION",
//   ];

//   const [currentQuote] = useState<string>(quotes[0]);

//   const showQuote = ["/", "/leaderboard", "/help", "/livestream", "/profile"].includes(pathname);

//   // Extract chapterId if it exists in the pathname
//   const chapterIdMatch = pathname?.match(/\/chapters\/(\d+)/);
//   const chapterId = chapterIdMatch ? chapterIdMatch[1] : null;

//   // State to control the visibility of the Admin Calendar
//   const [showAdminCalendar, setShowAdminCalendar] = useState(false);
//   // State for managing events
//   const [events, setEvents] = useState<Event[]>([]);

//   const handleEventChange = (updatedEvents: Event[]) => {
//     setEvents(updatedEvents);
//   };

//   return (
//     <>
//       {isSearchPage && (
//         <div className="hidden md:block">
//           <SearchInput />
//         </div>
//       )}

//       <div className="flex gap-x-4 items-center ml-auto">
//         {showQuote && (
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               padding: "10px 20px",
//               fontSize: "15px",
//               textAlign: "center",
//             }}
//           >
//             <span 
//               style={{
//                 color: "#001F3F",
//                 fontSize: "30px",
//                 fontWeight: "bold",
//                 textShadow: "0 0 10px #00BFFF, 0 0 20px #00BFFF, 0 0 30px #00BFFF",
//                 textAlign: "center"
//               }}
//             >
//               {currentQuote}
//             </span>
             
//           </div>
//         )}

   

//         {/* Notifications */}
//         <Link href="/notifications">
//           <div className="flex items-center gap-2 cursor-pointer">
//             <Bell className="h-5 w-5 text-blue-500" />
//             <span className="hidden md:block text-sm text-custom-yellow">
//               Notifications
//             </span>
//           </div>
//         </Link>

//         {/* Course Materials icon only for chapter pages */}
//         {chapterId && (
//           <Link href="/coursematerials">
//             {/* 
//             <div className="flex items-center gap-2 cursor-pointer">
//               <Book className="h-5 w-5 text-green-500" />
//               <span className="hidden md:block text-sm text-green-500">
//                 Materials
//               </span>
//             </div> 
//             */}
//           </Link>
//         )}

//         {isTeacherPage || isPlayerPage ? (
//           <Link href="/">
//             <Button size="sm" variant="destructive">
//               <LogOut className="h-4 w-4 mr-2" />
//               DashBoard
//             </Button>
//           </Link>
//         ) : checkIfTeacher(userId) ? (
//           <>
//             <Link href="/teacher/courses">
//               <Button size="sm" variant="success">
//                 Admin Mode
//               </Button>
//             </Link>
//             <Button 
//               size="sm" 
//               variant="secondary"
//               onClick={() => setShowAdminCalendar(!showAdminCalendar)}
//             >
//               <CalendarPlus className="h-4 w-4 mr-2" />
//               Calendar
//             </Button>
//           </>
//         ) : null}

//         <UserButton afterSignOutUrl="/sign-in" />
//       </div>

//       {/* Admin Calendar Modal */}
//       {showAdminCalendar && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white p-4 rounded-lg shadow-lg max-w-lg w-full">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-lg font-bold">Admin Calendar</h2>
//               <button onClick={() => setShowAdminCalendar(false)}><X /></button>
//             </div>
//             <AdminCalendar 
//               setShowAdminCalendar={setShowAdminCalendar} 
//               events={events} 
//               onEventChange={handleEventChange}
//             />
//           </div>
//         </div>
//       )}
//     </>
//   );
// };







// "use client";

// import { UserButton, useAuth } from "@clerk/nextjs";
// import { usePathname } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { LogOut, Bell, Book, Calendar, X } from "lucide-react";
// import Link from "next/link";
// import { SearchInput } from "./search-input";
// import { isTeacher as checkIfTeacher } from "@/lib/teacher";
// import { useState } from "react";
// import AdminCalendar from "@/components/AdminCalendar";

// // Define Event interface here since it's not exported from AdminCalendar.tsx
// interface Event {
//   title: string;
//   start: Date;
//   end: Date;
//   allDay?: boolean;
// }

// interface NavbarRoutesProps {}

// export const NavbarRoutes: React.FC<NavbarRoutesProps> = () => {
//   const { userId } = useAuth();
//   const pathname = usePathname();

//   const isTeacherPage = pathname?.startsWith("/teacher");
//   const isPlayerPage = pathname?.includes("/chapters");
//   const isSearchPage = pathname === "/search";

//   // Quotes for AI and LMS systems
//   const quotes = [
//     "REVOLUTIONIZING EDUCATION",
//   ];

//   const [currentQuote] = useState<string>(quotes[0]);

//   const showQuote = ["/", "/leaderboard", "/help", "/livestream", "/profile"].includes(pathname);

//   // Extract chapterId if it exists in the pathname
//   const chapterIdMatch = pathname?.match(/\/chapters\/(\d+)/);
//   const chapterId = chapterIdMatch ? chapterIdMatch[1] : null;

//   // State to control the visibility of the Admin Calendar (both for Admin and Navbar)
//   const [showAdminCalendar, setShowAdminCalendar] = useState(false);
//   // State for managing events
//   const [events, setEvents] = useState<Event[]>([]);

//   const handleEventChange = (updatedEvents: Event[]) => {
//     setEvents(updatedEvents);
//   };

//   return (
//     <>
//       {isSearchPage && (
//         <div className="hidden md:block">
//           <SearchInput />
//         </div>
//       )}

//       <div className="flex gap-x-4 items-center ml-auto">
//         {showQuote && (
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               padding: "10px 20px",
//               fontSize: "15px",
//               textAlign: "center",
//             }}
//           >
//             <span 
//               style={{
//                 color: "#001F3F",
//                 fontSize: "30px",
//                 fontWeight: "bold",
//                 textShadow: "0 0 10px #00BFFF, 0 0 20px #00BFFF, 0 0 30px #00BFFF",
//                 textAlign: "center"
//               }}
//             >
//               {currentQuote}
//             </span>
             
//           </div>
//         )}

//         {/* Notifications */}
//         <Link href="/notifications">
//           <div className="flex items-center gap-2 cursor-pointer">
//             <Bell className="h-5 w-5 text-blue-500" />
//             <span className="hidden md:block text-sm text-custom-yellow">
//               Notifications
//             </span>
//           </div>
//         </Link>

//         {/* Course Materials icon only for chapter pages */}
//         {chapterId && (
//           <Link href="/coursematerials">
//             {/* 
//             <div className="flex items-center gap-2 cursor-pointer">
//               <Book className="h-5 w-5 text-green-500" />
//               <span className="hidden md:block text-sm text-green-500">
//                 Materials
//               </span>
//             </div> 
//             */}
//           </Link>
//         )}

//         {/* Calendar Icon (triggers modal instead of linking to /calendar) */}
//         <div className="flex items-center gap-2 cursor-pointer" onClick={() => setShowAdminCalendar(true)}>
//           <Calendar className="h-5 w-5 text-purple-500" />
//           <span className="hidden md:block text-sm text-purple-500">
//             Calendar
//           </span>
//         </div>

//         {isTeacherPage || isPlayerPage ? (
//           <Link href="/">
//             <Button size="sm" variant="destructive">
//               <LogOut className="h-4 w-4 mr-2" />
//               DashBoard
//             </Button>
//           </Link>
//         ) : checkIfTeacher(userId) ? (
//           <>
//             <Link href="/teacher/courses">
//               <Button size="sm" variant="success">
//                 Admin Mode
//               </Button>
//             </Link>
//             {/* <Button 
//               size="sm" 
//               variant="secondary"
//               onClick={() => setShowAdminCalendar(true)}
//             >
//               <Calendar className="h-4 w-4 mr-2" />
//               Calendar
//             </Button> */}
//           </>
//         ) : null}

//         <UserButton afterSignOutUrl="/sign-in" />
//       </div>

//       {/* Admin Calendar Modal (now used for both Admin and Navbar calendar) */}
//       {showAdminCalendar && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white p-4 rounded-lg shadow-lg max-w-lg w-full">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-lg font-bold">Admin Calendar</h2>
//               <button onClick={() => setShowAdminCalendar(false)}><X /></button>
//             </div>
//             <AdminCalendar 
//               setShowAdminCalendar={setShowAdminCalendar} 
//               events={events} 
//               onEventChange={handleEventChange}
//             />
//           </div>
//         </div>
//       )}
//     </>
//   );
// };











// "use client";

// import { UserButton, useAuth } from "@clerk/nextjs";
// import { usePathname } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { LogOut, Bell, Book, Calendar, X } from "lucide-react";
// import Link from "next/link";
// import { SearchInput } from "./search-input";
// import { isTeacher as checkIfTeacher } from "@/lib/teacher";
// import { useState, useEffect } from "react";
// import AdminCalendar from "@/components/AdminCalendar";

// // Define Event interface here since it's not exported from AdminCalendar.tsx
// interface Event {
//   title: string;
//   start: Date;
//   end: Date;
//   allDay?: boolean;
// }

// interface NavbarRoutesProps {}

// export const NavbarRoutes: React.FC<NavbarRoutesProps> = () => {
//   const { userId } = useAuth();
//   const pathname = usePathname();

//   const isTeacherPage = pathname?.startsWith("/teacher");
//   const isPlayerPage = pathname?.includes("/chapters");
//   const isSearchPage = pathname === "/search";

//   // State for hydration safety
//   const [isClient, setIsClient] = useState(false);
//   const [currentQuote, setCurrentQuote] = useState<string>("REVOLUTIONIZING EDUCATION"); // Default quote for server-side
//   const [showAdminCalendar, setShowAdminCalendar] = useState(false);
//   const [events, setEvents] = useState<Event[]>([]);

//   // Quotes for AI and LMS systems
//   const quotes = ["REVOLUTIONIZING EDUCATION"];

//   // Run client-side logic after hydration
//   useEffect(() => {
//     setIsClient(true);
//     // Set quote after hydration (optional, if you want dynamic quotes)
//     setCurrentQuote(quotes[0]);
//   }, []);

//   const handleEventChange = (updatedEvents: Event[]) => {
//     setEvents(updatedEvents);
//   };

//   // Extract chapterId if it exists in the pathname
//   const chapterIdMatch = pathname?.match(/\/chapters\/(\d+)/);
//   const chapterId = isClient ? (chapterIdMatch ? chapterIdMatch[1] : null) : null; // Defer on server

//   const showQuote = isClient && ["/", "/leaderboard", "/help", "/livestream", "/profile"].includes(pathname);

//   if (!isClient) {
//     // Server-side fallback: Render a minimal version to match client initial render
//     return (
//       <div className="flex gap-x-4 items-center ml-auto">
//         {isSearchPage && <div className="hidden md:block"><SearchInput /></div>}
//         <div className="flex gap-x-4">
//           <Link href="/notifications">
//             <div className="flex items-center gap-2">
//               <Bell className="h-5 w-5 text-blue-500" />
//             </div>
//           </Link>
//           <div className="flex items-center gap-2">
//             <Calendar className="h-5 w-5 text-purple-500" />
//           </div>
//           {isTeacherPage || isPlayerPage ? (
//             <Link href="/">
//               <Button size="sm" variant="destructive">
//                 <LogOut className="h-4 w-4 mr-2" />
//                 DashBoard
//               </Button>
//             </Link>
//           ) : checkIfTeacher(userId) ? (
//             <Link href="/teacher/courses">
//               <Button size="sm" variant="success">Admin Mode</Button>
//             </Link>
//           ) : null}
//           <div className="user-button-placeholder"></div> {/* Placeholder for UserButton */}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//       {isSearchPage && (
//         <div className="hidden md:block">
//           <SearchInput />
//         </div>
//       )}

//       <div className="flex gap-x-4 items-center ml-auto">
//         {showQuote && (
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               padding: "10px 20px",
//               fontSize: "15px",
//               textAlign: "center",
//             }}
//           >
//             <span 
//               style={{
//                 color: "#1E3A8A",
//                 fontSize: "30px",
//                 fontWeight: "bold",
//                // textShadow: "0 0 10px #00BFFF, 0 0 20px #00BFFF, 0 0 30px #00BFFF",
//                 textAlign: "center"
//               }}
//             >
//               {currentQuote}
//             </span>
//           </div>
//         )}

//         {/* Notifications */}
//         <Link href="/notifications">
//           <div className="flex items-center gap-2 cursor-pointer">
//             <Bell className="h-5 w-5 text-blue-500" />
//             <span className="hidden md:block text-sm text-custom-yellow">
//               Notifications
//             </span>
//           </div>
//         </Link>

//         {/* Course Materials icon only for chapter pages */}
//         {chapterId && (
//           <Link href="/coursematerials">
//             {/* 
//             <div className="flex items-center gap-2 cursor-pointer">
//               <Book className="h-5 w-5 text-green-500" />
//               <span className="hidden md:block text-sm text-green-500">
//                 Materials
//               </span>
//             </div> 
//             */}
//           </Link>
//         )}

//         {/* Calendar Icon (triggers modal instead of linking to /calendar) */}
//         <div className="flex items-center gap-2 cursor-pointer" onClick={() => setShowAdminCalendar(true)}>
//           <Calendar className="h-5 w-5 text-purple-500" />
//           <span className="hidden md:block text-sm text-purple-500">
//             Calendar
//           </span>
//         </div>

//         {isTeacherPage || isPlayerPage ? (
//           <Link href="/">
//             <Button size="sm" variant="destructive">
//               <LogOut className="h-4 w-4 mr-2" />
//               DashBoard
//             </Button>
//           </Link>
//         ) : checkIfTeacher(userId) ? (
//           <>
//             <Link href="/teacher/courses">
//               <Button size="sm" variant="success">
//                 Admin Mode
//               </Button>
//             </Link>
//             {/* <Button 
//               size="sm" 
//               variant="secondary"
//               onClick={() => setShowAdminCalendar(true)}
//             >
//               <Calendar className="h-4 w-4 mr-2" />
//               Calendar
//             </Button> */}
//           </>
//         ) : null}

//         <UserButton afterSignOutUrl="/sign-in" />
//       </div>

//       {/* Admin Calendar Modal (now used for both Admin and Navbar calendar) */}
//       {showAdminCalendar && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white p-4 rounded-lg shadow-lg max-w-lg w-full">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-lg font-bold">Admin Calendar</h2>
//               <button onClick={() => setShowAdminCalendar(false)}><X /></button>
//             </div>
//             <AdminCalendar 
//               setShowAdminCalendar={setShowAdminCalendar} 
//               events={events} 
//               onEventChange={handleEventChange}
//             />
//           </div>
//         </div>
//       )}
//     </>
//   );
// };




'use client';

import { UserButton, useAuth } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { LogOut, Bell, Book, Calendar, X } from 'lucide-react';
import Link from 'next/link';
import { SearchInput } from './search-input';
import { isTeacher as checkIfTeacher } from '@/lib/teacher';
import { useState, useEffect } from 'react';
import AdminCalendar from '@/components/AdminCalendar';
import { useNotifications } from '@/lib/useNotifications';

// Define Event interface here since it's not exported from AdminCalendar.tsx
interface Event {
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
}

interface NavbarRoutesProps {}

export const NavbarRoutes: React.FC<NavbarRoutesProps> = () => {
  const { userId } = useAuth();
  const pathname = usePathname();
  const { unreadCount } = useNotifications(); // Get unreadCount from hook

  const isTeacherPage = pathname?.startsWith('/teacher');
  const isPlayerPage = pathname?.includes('/chapters');
  const isSearchPage = pathname === '/search';

  // State for hydration safety
  const [isClient, setIsClient] = useState(false);
  const [currentQuote, setCurrentQuote] = useState<string>('REVOLUTIONIZING EDUCATION'); // Default quote for server-side
  const [showAdminCalendar, setShowAdminCalendar] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);

  // Quotes for AI and LMS systems
  const quotes = ['REVOLUTIONIZING EDUCATION'];

  // Run client-side logic after hydration
  useEffect(() => {
    setIsClient(true);
    setCurrentQuote(quotes[0]);
  }, []);

  const handleEventChange = (updatedEvents: Event[]) => {
    setEvents(updatedEvents);
  };

  // Extract chapterId if it exists in the pathname
  const chapterIdMatch = pathname?.match(/\/chapters\/(\d+)/);
  const chapterId = isClient ? (chapterIdMatch ? chapterIdMatch[1] : null) : null; // Defer on server

  const showQuote = isClient && ['/', '/leaderboard', '/help', '/livestream', '/profile'].includes(pathname);

  if (!isClient) {
    // Server-side fallback: Render a minimal version to match client initial render
    return (
      <div className="flex gap-x-4 items-center ml-auto">
        {isSearchPage && (
          <div className="hidden md:block">
            <SearchInput />
          </div>
        )}
        <div className="flex gap-x-4">
          <Link href="/notifications">
            <div className="flex items-center gap-2 relative">
              <Bell className="h-5 w-5 text-blue-500" />
            </div>
          </Link>
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-purple-500" />
          </div>
          {isTeacherPage || isPlayerPage ? (
            <Link href="/">
              <Button size="sm" variant="destructive">
                <LogOut className="h-4 w-4 mr-2" />
                DashBoard
              </Button>
            </Link>
          ) : checkIfTeacher(userId) ? (
            <Link href="/teacher/courses">
              <Button size="sm" variant="success">Admin Mode</Button>
            </Link>
          ) : null}
          <div className="user-button-placeholder"></div> {/* Placeholder for UserButton */}
        </div>
      </div>
    );
  }

  return (
    <>
      {isSearchPage && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}

      <div className="flex gap-x-4 items-center ml-auto">
        {showQuote && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '10px 20px',
              fontSize: '15px',
              textAlign: 'center',
            }}
          >
            <span
              style={{
                color: '#1E3A8A',
                fontSize: '30px',
                fontWeight: 'bold',
                textAlign: 'center',
              }}
            >
              {currentQuote}
            </span>
          </div>
        )}

        {/* Notifications with Badge */}
        <Link href="/notifications">
          <div className="flex items-center gap-2 cursor-pointer relative">
            <Bell className="h-5 w-5 text-blue-500" />
            {unreadCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
            <span className="hidden md:block text-sm text-custom-yellow">Community Forum</span>
          </div>
        </Link>

        {/* Course Materials icon only for chapter pages */}
        {chapterId && (
          <Link href="/coursematerials">
            {/* Uncomment if needed
            <div className="flex items-center gap-2 cursor-pointer">
              <Book className="h-5 w-5 text-green-500" />
              <span className="hidden md:block text-sm text-green-500">Materials</span>
            </div>
            */}
          </Link>
        )}

        {/* Calendar Icon */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setShowAdminCalendar(true)}
        >
          <Calendar className="h-5 w-5 text-purple-500" />
          <span className="hidden md:block text-sm text-purple-500">Calendar</span>
        </div>

        {isTeacherPage || isPlayerPage ? (
          <Link href="/">
            <Button size="sm" variant="destructive">
              <LogOut className="h-4 w-4 mr-2" />
              DashBoard
            </Button>
          </Link>
        ) : checkIfTeacher(userId) ? (
          <>
            <Link href="/teacher/courses">
              <Button size="sm" variant="success">Admin Mode</Button>
            </Link>
          </>
        ) : null}

        <UserButton afterSignOutUrl="/sign-in" />
      </div>

      {/* Admin Calendar Modal */}
      {showAdminCalendar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg max-w-lg w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Admin Calendar</h2>
              <button onClick={() => setShowAdminCalendar(false)}>
                <X />
              </button>
            </div>
            <AdminCalendar
              setShowAdminCalendar={setShowAdminCalendar}
              events={events}
              onEventChange={handleEventChange}
            />
          </div>
        </div>
      )}
    </>
  );
};




















// "use client";

// import { UserButton, useAuth } from "@clerk/nextjs";
// import { usePathname } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { LogOut, Bell, Book } from "lucide-react"; // Added Book icon for Course Materials
// import Link from "next/link";
// import { SearchInput } from "./search-input";
// import { isTeacher as checkIfTeacher } from "@/lib/teacher"; // Renamed import
// import { useState, useEffect } from "react"; // Add useState and useEffect
// import { getProgress } from "@/actions/get-progress"; // Import the getProgress function

// interface NavbarRoutesProps {}

// export const NavbarRoutes: React.FC<NavbarRoutesProps> = () => {
//   const { userId } = useAuth();
//   const pathname = usePathname();

//   const isTeacherPage = pathname?.startsWith("/teacher");
//   const isPlayerPage = pathname?.includes("/chapters");
//   const isSearchPage = pathname === "/search";

//   // Quotes for AI and LMS systems
//   const quotes = [
//     "Tech is revolutionizing education",
//   ];

//   const [currentQuote, setCurrentQuote] = useState<string>(quotes[0]);
//   const [progress, setProgress] = useState<number | null>(null);

//   useEffect(() => {
//     const quoteInterval = setInterval(() => {
//       setCurrentQuote((prevQuote) => {
//         const currentIndex = quotes.indexOf(prevQuote);
//         return quotes[(currentIndex + 1) % quotes.length];
//       });
//     }, 5000); // Change quote every 5 seconds

//     return () => clearInterval(quoteInterval);
//   }, []);

//   // Fetch progress when userId or pathname changes
//   useEffect(() => {
//     const fetchProgress = async () => {
//       if (userId && pathname?.includes("/chapters")) {
//         const chapterIdMatch = pathname.match(/\/chapters\/(\d+)/);
//         const courseId = chapterIdMatch ? chapterIdMatch[1] : null;
//         if (courseId) {
//           const progressPercentage = await getProgress(userId, courseId);
//           setProgress(progressPercentage);
//         }
//       }
//     };

//     fetchProgress();
//   }, [userId, pathname]);

//   // Condition to render the quote only on the Dashboard and other specific pages
//   const showQuote = pathname === "/"; // Add more pages if necessary

//   // Extract chapterId if it exists in the pathname
//   const chapterIdMatch = pathname?.match(/\/chapters\/(\d+)/); // Assuming chapterId is numeric
//   const chapterId = chapterIdMatch ? chapterIdMatch[1] : null;

//   return (
//     <>
//       {isSearchPage && (
//         <div className="hidden md:block">
//           <SearchInput />
//         </div>
//       )}

//       <div className="flex gap-x-4 items-center ml-auto">
//         {/* Animated Quote */}
//         {showQuote && (
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               padding: "10px 20px",
//               fontSize: "15px",
//             }}
//           >
//             <span className="center animated-text">{currentQuote}</span>
//           </div>
//         )}

//         {/* Notifications */}
//         <Link href="/notifications">
//           <div className="flex items-center gap-2 cursor-pointer">
//             <Bell className="h-5 w-5 text-blue-500" /> {/* Notification Icon */}
//             <span className="hidden md:block text-sm text-custom-yellow">
//               Notifications
//             </span>
//           </div>
//         </Link>

//         {/* Course Materials icon only for chapter pages */}
//         {chapterId && (
//           <Link href="/coursematerials">
//             <div className="flex items-center gap-2 cursor-pointer">
//               <Book className="h-5 w-5 text-green-500" /> {/* Course Materials Icon */}
//               <span className="hidden md:block text-sm text-green-500">
//                 Materials
//               </span>
//             </div>
//           </Link>
//         )}

//         {isTeacherPage || isPlayerPage ? (
//           <Link href="/">
//             <Button size="sm" variant="destructive">
//               <LogOut className="h-4 w-4 mr-2" />
//               Exit
//             </Button>
//           </Link>
//         ) : checkIfTeacher(userId) ? (
//           <Link href="/teacher/courses">
//             <Button size="sm" variant="success">
//               Admin Mode
//             </Button>
//           </Link>
//         ) : null}

//         {/* Custom UserButton with Progress */}
//         <div className="relative">
//           <UserButton afterSignOutUrl="/sign-in" />
//           {progress !== null && (
//             <div className="absolute bottom-0 right-0 bg-black text-white text-xs px-2 py-1 rounded-full shadow-lg">
//               {Math.round(progress)}%
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };





