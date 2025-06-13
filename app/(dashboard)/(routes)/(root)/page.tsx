// import { auth } from "@clerk/nextjs/server";
// import { redirect } from "next/navigation";
// import { CheckCircle, Clock, InfoIcon } from "lucide-react";

// import { getDashboardCourses } from "@/actions/get-dashboard-courses";
// import { CoursesList } from "@/components/courses-list";

// import { InfoCard } from "./_components/info-card";
// import { BannerCard } from "./_components/banner-card";

// export default async function Dashboard() {
//   const { userId } = await auth();

//   if (!userId) {
//     return redirect("/sign-in");
//   }

//   try {
//     const { completedCourses, coursesInProgress } = await getDashboardCourses(userId);

//     return (
//       <div className="p-6 space-y-4">
//         <div className="grid grid-cols-1 gap-4">
//           <BannerCard
//             icon={InfoIcon}
//             label="Welcome to the Eduskill Student Dashboard"
//             description={`This is where you can see your progress and continue your courses. This is a LMS and as such, some courses are free, and Stripe is in test mode. To enroll in a course, enter dummy data in the Stripe form. Admin access is only limited to Edu skill team.`}
//           />
//         </div>
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <InfoCard
//             icon={Clock}
//             label="In Progress"
//             numberOfItems={coursesInProgress.length}
//           />
//           <InfoCard
//             icon={CheckCircle}
//             label="Completed"
//             numberOfItems={completedCourses.length}
//             variant="success"
//           />
//         </div>
//         <CoursesList items={[...coursesInProgress, ...completedCourses]} />
//       </div>
//     );
//   } catch (error) {
//     console.error("[DASHBOARD_ERROR]:", error);
//     return redirect("/error");
//   }
// }



// import { auth } from "@clerk/nextjs/server";
// import { redirect } from "next/navigation";
// import { CheckCircle, Clock, InfoIcon } from "lucide-react";

// import { getDashboardCourses } from "@/actions/get-dashboard-courses";
// import { CoursesList } from "@/components/courses-list";

// import { InfoCard } from "./_components/info-card";
// import { BannerCard } from "./_components/banner-card";

// export default async function Dashboard() {
//   const { userId } = await auth();

//   if (!userId) {
//     return redirect("/sign-in");
//   }

//   const {
//     completedCourses,
//     coursesInProgress
//   } = await getDashboardCourses(userId);

//   return (
//     <div className="p-6 space-y-4">
//       <div className="grid grid-cols-1 gap-4">
//         <BannerCard
//           icon={InfoIcon}
//           label="Welcome to the dashboard"
//           description={`This is where you can see your progress 
//             and continue your courses. This is a demonstration LMS and as such, all courses are free and Stripe is in test
//              mode. To enroll in a course, enter dummy data in the Stripe form.  `}
//         />
//       </div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//         <InfoCard
//           icon={Clock}
//           label="In Progress"
//           numberOfItems={coursesInProgress.length}
//         />
//         <InfoCard
//           icon={CheckCircle}
//           label="Completed"
//           numberOfItems={completedCourses.length}
//           variant="success"
//         />
//       </div>
//       <CoursesList
//         items={[...coursesInProgress, ...completedCourses]}
//       />
//     </div>
//   )
// }









// import { auth } from "@clerk/nextjs/server";
// import { redirect } from "next/navigation";
// import { CheckCircle, Clock, InfoIcon } from "lucide-react";

// import { getDashboardCourses } from "@/actions/get-dashboard-courses";
// import { CoursesList } from "@/components/courses-list";

// import { InfoCard } from "./_components/info-card";
// import { BannerCard } from "./_components/banner-card";

// export default async function Dashboard() {
//   const { userId } = await auth();

//   if (!userId) {
//     return redirect("/sign-in");
//   }

//   const {
//     completedCourses,
//     coursesInProgress
//   } = await getDashboardCourses(userId);

//   return (
//     <div className="p-6 space-y-4">
//       <div className="grid grid-cols-1 gap-4">
//         <BannerCard
//           icon={InfoIcon}
//           label="Welcome to the dashboard"
//           description={`This is where you can see your progress 
//             and continue your courses. This is a demonstration LMS and as such, all courses are free and Stripe is in test
//              mode. To enroll in a course, enter dummy data in the Stripe form.`}
//         />
//       </div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//         <InfoCard
//           icon={Clock}
//           label="In Progress"
//           numberOfItems={coursesInProgress.length}
//         />
//         <InfoCard
//           icon={CheckCircle}
//           label="Completed"
//           numberOfItems={completedCourses.length}
//           variant="success"
//         />
//       </div>
//       <CoursesList
//         items={[...coursesInProgress, ...completedCourses]}
//       />
//       {/* Check if there are no courses to display */}
//       {coursesInProgress.length === 0 && completedCourses.length === 0 && (
//         <div className="text-center text-sm text-muted-foreground mt-10">
//           No courses available
//         </div>
//       )}
//     </div>
//   );
// }



// import { auth } from "@clerk/nextjs/server";
// import { redirect } from "next/navigation";
// import { CheckCircle, Clock, InfoIcon } from "lucide-react";

// import { getDashboardCourses } from "@/actions/get-dashboard-courses";
// import { CoursesList } from "@/components/courses-list";

// import { InfoCard } from "./_components/info-card";
// import { BannerCard } from "./_components/banner-card";

// export default async function Dashboard() {
//   const { userId } = await auth();

//   if (!userId) {
//     return redirect("/sign-in");
//   }

//   const {
//     completedCourses,
//     coursesInProgress
//   } = await getDashboardCourses(userId);

//   return (
//     <div className="p-6 space-y-4">
//       <div className="grid grid-cols-1 gap-4">
//         <BannerCard
//           icon={InfoIcon}
//           label="Welcome to the dashboard"
//           description={`Eduskill is a comprehensive online learning environment that
//              caters to a broad spectrum of learners, from students aiming for academic
//               excellence to professionals seeking to upskill or reskill. The platform is 
//               accessible across multiple devices, ensuring that education is not confined by
//                location or time. It supports learners from all over the world, offering
//                 courses and providing a rich, diverse curriculum.`}
//         />
//       </div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//         <InfoCard
//           icon={Clock}
//           label="In Progress"
//           numberOfItems={coursesInProgress.length}
//         />
//         <InfoCard
//           icon={CheckCircle}
//           label="Completed"
//           numberOfItems={completedCourses.length}
//           variant="success"
//         />
//       </div>
//       <CoursesList
//         items={[...coursesInProgress, ...completedCourses]}
//       />
//     </div>
//   )
// }




// import { auth } from "@clerk/nextjs/server";
// import { redirect } from "next/navigation";
// import { CheckCircle, Clock } from "lucide-react";
// import { getDashboardCourses } from "@/actions/get-dashboard-courses";
// import { CoursesList } from "@/components/courses-list";
// import Slider from "react-slick";
// import { InfoCard } from "./_components/info-card";
// import { BannerCard } from "./_components/banner-card";
// import { getCourses } from "@/actions/get-courses";
// import { clerkClient } from "@clerk/nextjs/server";
// import { getUpcomingCourses } from "@/actions/get-upcoming-courses";
 


// async function getUserDetails() {
//   const { userId } = await auth();
//   if (!userId) return null;
//   const user = await clerkClient.users.getUser(userId);
//   return user;
// }

// export default async function Dashboard() {
//   const user = await getUserDetails();

//   if (!user) {
//     return redirect("/sign-in");
//   }

//   const { completedCourses, coursesInProgress } = await getDashboardCourses(user.id);
//   const upcomingCourses = await getUpcomingCourses();

 

//   return (
//     <div className="p-6 space-y-4">
//  {/* Welcome Section */}
//  <div className="flex items-center mb-4">
//  <div className="flex-shrink-0">
//    <div className="bg-black text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold">
//      {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
//    </div>
//  </div>
//  <div className="ml-3">
//    <h1 className="text-xl font-bold">Welcome back, {user.firstName}</h1>
//    <a href="https://eduskill.me/" className="text-sm text-purple-600">
//     Skill Today Lead Tommorrow
//    </a>
//  </div>
// </div>

//       {/* Info Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//         <InfoCard icon={Clock} label="In Progress" numberOfItems={coursesInProgress.length} />
//         <InfoCard icon={CheckCircle} label="Completed" numberOfItems={completedCourses.length} variant="success" />
//       </div>

//       {/* Learning Section with Carousel */}
//        <div className="mt-6">
//           {/* Background Carousel */}
//       </div>

//      {/* Courses List */}
//       <CoursesList items={[...coursesInProgress, ...completedCourses]} />

//      {/* Banner Section */}
//       <div className="grid grid-cols-1 gap-4">
//         <div className="relative">
//           <div className="flex items-center justify-between p-6 bg-white shadow rounded-lg">
//             <div>
//               <h2 className="text-2xl font-semibold">Go Further Into Our Current And Upcoming New Courses</h2>
//               <p className="mt-2 text-gray-600">
//                 Subscribe to a collection of our top courses in various fields, and more with Personal Plan.
//               </p>
//               <button className="mt-4 px-4 py-2 bg-purple-600 text-white rounded">
//               <a href="/search">
//                  Try it 
//                     </a>
//                 </button>
//             </div>             <div className="flex-shrink-0">
//                <img src="./imgu.jpg" alt="Student with laptop" className="w-48 h-auto rounded-lg" />
//              </div>
//           </div>
//           <div className="absolute inset-y-0 right-0 flex items-center">
//             <button className="p-2 text-gray-600">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-6 w-6"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




// import { auth } from "@clerk/nextjs/server";
// import { redirect } from "next/navigation";
// import { CheckCircle, Clock } from "lucide-react";
// import { getDashboardCourses } from "@/actions/get-dashboard-courses";
// import { CoursesList } from "@/components/courses-list";
// import dynamic from "next/dynamic";
// import { InfoCard } from "./_components/info-card";
// import { BannerCard } from "./_components/banner-card";
// import { getCourses } from "@/actions/get-courses";
// import { clerkClient } from "@clerk/nextjs/server";
// import { getUpcomingCourses } from "@/actions/get-upcoming-courses";
// import  {Carousel} from "@/components/carousel";

 
// async function getUserDetails() {
//   const { userId } = await auth();
//   if (!userId) return null;
//   const user = await clerkClient.users.getUser(userId);
//   return user;
// }

// export default async function Dashboard() {
//   const user = await getUserDetails();

//   if (!user) {
//     return redirect("/sign-in");
//   }

//   const { completedCourses, coursesInProgress } = await getDashboardCourses(user.id);
//   const upcomingCourses = await getUpcomingCourses();

//   return (
//     <div className="p-6 space-y-4">
//       {/* Welcome Section */}
//       <div className="flex items-center mb-4">
//         <div className="flex-shrink-0">
//           <div className="bg-black text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold">
//             {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
//           </div>
//         </div>
//         <div className="ml-3">
//           <h1 className="text-xl font-bold">Welcome back, {user.firstName}</h1>
//           <a href="https://eduskill.me/" className="text-sm text-purple-600">
//             Skill Today Lead Tommorrow
//           </a>
//         </div>
//       </div>

//       {/* Info Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//         <InfoCard icon={Clock} label="In Progress" numberOfItems={coursesInProgress.length} />
//         <InfoCard icon={CheckCircle} label="Completed" numberOfItems={completedCourses.length} variant="success" />
//       </div>

//       {/* Courses List */}
//       <CoursesList items={[...coursesInProgress, ...completedCourses]} />

//       {/* Learning Section with Carousel */}
//       {/* <Carousel courses={[...coursesInProgress, ...completedCourses]} /> */}

      






//       {/* Banner Section */}
//       <div className="grid grid-cols-1 gap-4">
//         <div className="relative">
//           <div className="flex items-center justify-between p-6 bg-white shadow rounded-lg">
//             <div>
//               <h2 className="text-2xl font-semibold">Go Further Into Our Current And Upcoming New Courses</h2>
//               <p className="mt-2 text-gray-600">
//                 Subscribe to a collection of our top courses in various fields, and more with Personal Plan.
//               </p>
//               <button className="mt-4 px-4 py-2 bg-purple-600 text-white rounded">
//                 <a href="/search">Try it</a>
//               </button>
//             </div>
//             <div className="flex-shrink-0">
//               <img src="./imgu.jpg" alt="Student with laptop" className="w-48 h-auto rounded-lg" />
//             </div>
//           </div>
//           <div className="absolute inset-y-0 right-0 flex items-center">
//             <button className="p-2 text-gray-600">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-6 w-6"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }











// import { auth } from "@clerk/nextjs/server";
// import { redirect } from "next/navigation";
// import { CheckCircle, Clock } from "lucide-react";
// import { getDashboardCourses } from "@/actions/get-dashboard-courses";
// import { CoursesList } from "@/components/courses-list";
// import dynamic from "next/dynamic";
// import { InfoCard } from "./_components/info-card";
// import { BannerCard } from "./_components/banner-card";
// import { getCourses } from "@/actions/get-courses";
// import { clerkClient } from "@clerk/nextjs/server";
// import { getUpcomingCourses } from "@/actions/get-upcoming-courses";
// import { Carousel } from "@/components/carousel";

// async function getUserDetails() {
//   const { userId } = await auth();
//   if (!userId) return null;
//   const user = await clerkClient.users.getUser(userId);
//   return user;
// }

// export default async function Dashboard() {
//   const user = await getUserDetails();

//   if (!user) {
//     return redirect("/sign-in");
//   }

//   const { completedCourses, coursesInProgress } = await getDashboardCourses(user.id);
//   const upcomingCourses = await getUpcomingCourses();

//   return (
//     <div className="p-6 space-y-4">
//       {/* Welcome Section */}
      // <div className="flex items-center mb-4">
      //   <div className="flex-shrink-0">
      //     <div className="bg-black text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold">
      //       {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
      //     </div>
      //   </div>
//         <div className="ml-3">
//           <h1 className="text-xl font-bold">Welcome back, {user.firstName}</h1>
//           <a href="https://eduskill.me/" className="text-sm text-purple-600">
//             Skill Today Lead Tommorrow
//           </a>
//         </div>
//       </div>

//       {/* Info Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//         <InfoCard icon={Clock} label="In Progress" numberOfItems={coursesInProgress.length} />
//         <InfoCard icon={CheckCircle} label="Completed" numberOfItems={completedCourses.length} variant="success" />
//       </div>

//       {/* Courses List */}
//       <CoursesList items={[...coursesInProgress, ...completedCourses]} />

//       {/* Integrating and Running Multiple Learning Solutions Section */}
//       <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
//         <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">From rookie to expert
// Onboard your new joiners to success in no time.</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <div className="bg-white p-4 rounded-lg shadow flex flex-col items-center text-center">
//             <div className="mb-2">
//               <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//               </svg>
//             </div>
//             <h3 className="text-lg font-medium text-gray-900">100% Pratical Courses</h3>
//             <p className="text-sm text-gray-600 mt-2">100% Practical Courses is a dynamic learning initiative focused on hands-on, real-world training that equips learners with actionable skills.
//                Designed for immediate application, these courses emphasize practical exercises, simulations, and projects over theoretical content, ensuring participants gain confidence and competence in their chosen fields.

// </p>
//             <a href="#" className="mt-2 text-sm text-purple-600">→</a>
//           </div>
//           <div className="bg-white p-4 rounded-lg shadow flex flex-col items-center text-center">
//             <div className="mb-2">
//               <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10m-5 4h4m-4 4h4m-4-8h4" />
//               </svg>
//             </div>
//             <h3 className="text-lg font-medium text-gray-900">Worldclass Skills Training</h3>
//             <p className="text-sm text-gray-600 mt-2"> We deliver high-quality, industry-relevant skills development programs.
//                We offer comprehensive training solutions tailored to professionals and organizations,
//                emphasizing practical expertise, innovative teaching methods, and accessible learning resources to empower individuals and teams for success in a competitive global market.

//              </p>
//             <a href="#" className="mt-2 text-sm text-purple-600">→</a>
//           </div>
           
//           <div className="bg-white p-4 rounded-lg shadow flex flex-col items-center text-center">
//             <div className="mb-2">
//               <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
//               </svg>
//             </div>
//             <h3 className="text-lg font-medium text-gray-900">All Time Support Online Sessions

// </h3>
//             <p className="text-sm text-gray-600 mt-2">Online Sessions offers round-the-clock access to live, expert-led training and assistance, ensuring learners receive continuous guidance and support. 
//               Available anytime, these sessions provide interactive problem-solving, personalized feedback, and real-time collaboration, making skill development seamless and accessible worldwide.

// </p>
//             <a href="#" className="mt-2 text-sm text-purple-600">→</a>
//           </div>
//         </div>
//       </div>

//       {/* Learning Section with Carousel */}
//       {/* <Carousel courses={[...coursesInProgress, ...completedCourses]} /> */}

//       {/* Banner Section */}
//       <div className="grid grid-cols-1 gap-4">
//         <div className="relative">
//           <div className="flex items-center justify-between p-6 bg-white shadow rounded-lg">
//             <div>
//               <h2 className="text-2xl font-semibold">Go Further Into Our Current And Upcoming New Courses</h2>
//               <p className="mt-2 text-gray-600">
//                 Subscribe to a collection of our top courses in various fields, and more with Personal Plan.
//               </p>
//               <button className="mt-4 px-4 py-2 bg-purple-600 text-white rounded">
//                 <a href="/search">Try it</a>
//               </button>
//             </div>
//             <div className="flex-shrink-0">
//               <img src="./imgu.jpg" alt="Student with laptop" className="w-48 h-auto rounded-lg" />
//             </div>
//           </div>
//           <div className="absolute inset-y-0 right-0 flex items-center">
//             <button className="p-2 text-gray-600">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-6 w-6"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }






// import { auth } from "@clerk/nextjs/server";
// import { redirect } from "next/navigation";
// import { CheckCircle, Clock } from "lucide-react";
// import { getDashboardCourses } from "@/actions/get-dashboard-courses";
// import { CoursesList } from "@/components/courses-list";
// import dynamic from "next/dynamic";
// import { InfoCard } from "./_components/info-card";
// import { BannerCard } from "./_components/banner-card";
// import { getCourses } from "@/actions/get-courses";
// import { clerkClient } from "@clerk/nextjs/server";
// import { getUpcomingCourses } from "@/actions/get-upcoming-courses";
// import { Carousel } from "@/components/carousel";

// async function getUserDetails() {
//   const { userId } = await auth();
//   if (!userId) return null;
//   const user = await clerkClient.users.getUser(userId);
//   return user;
// }

// export default async function Dashboard() {
//   const user = await getUserDetails();

//   if (!user) {
//     return redirect("/sign-in");
//   }

//   const { completedCourses, coursesInProgress } = await getDashboardCourses(user.id);
//   const upcomingCourses = await getUpcomingCourses();

//   return (
//     <div className="p-6 space-y-4">
//       {/* Welcome Section */}
//       <div className="space-y-4">
//         <div>
       
//         <div className="bg-black text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold">
//             {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
//           </div>
//         </div>
       
//         <div className="relative bg-green-100 p-4 rounded-lg shadow-md flex items-center justify-between">
//           <div>
//             <h3 className="text-xl font-semibold text-yellow-600">Welcome to a World of Continuous Learning!</h3>
//             <p className="text-sm text-gray-700 mt-1">
//               Embark on your journey to success today with Eduskill. Stay updated with all course announcements here.
//             </p>
//           </div>
//           <div className="flex-shrink-0 ml-4">
//             <div className="bg-black text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold">
//               {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
//             </div>
//           </div>
//           {/* Chevron cutout effect using pseudo-element */}
//           <div className="absolute right-0 top-0 h-full w-4 bg-green-100 clip-path-polygon(100% 0, 75% 50%, 100% 100%)"></div>
//         </div>
//       </div>

//       {/* Info Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//         <InfoCard icon={Clock} label="In Progress" numberOfItems={coursesInProgress.length} />
//         <InfoCard icon={CheckCircle} label="Completed" numberOfItems={completedCourses.length} variant="success" />
//       </div>

//       {/* Courses List */}
//       <CoursesList items={[...coursesInProgress, ...completedCourses]} />

//       {/* Integrating and Running Multiple Learning Solutions Section */}
//       <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
//       <h2 className="text-2xl font-bold text-gray-600 text-center mb-6">From rookie to expert
// Onboard your new joiners to success in no time.</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <div className="bg-white p-4 rounded-lg shadow flex flex-col items-center text-center">
//             <div className="mb-2">
//               <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//               </svg>
//             </div>
//             <h3 className="text-lg font-medium text-yellow-600">100% Pratical Courses</h3>
//             <p className="text-sm text-gray-600 mt-2">100% Practical Courses is a dynamic learning initiative focused on hands-on, real-world training that equips learners with actionable skills.
//                Designed for immediate application, these courses emphasize practical exercises, simulations, and projects over theoretical content, ensuring participants gain confidence and competence in their chosen fields.
// </p>
//             <a href="#" className="mt-2 text-sm text-purple-600">→</a>
//           </div>
//           <div className="bg-white p-4 rounded-lg shadow flex flex-col items-center text-center">
//             <div className="mb-2">
//               <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10m-5 4h4m-4 4h4m-4-8h4" />
//               </svg>
//             </div>
//             <h3 className="text-lg font-medium text-yellow-600">Worldclass Skills Training</h3>
//             <p className="text-sm text-gray-600 mt-2">We deliver high-quality, industry-relevant skills development programs.
//                We offer comprehensive training solutions tailored to professionals and organizations,
//                emphasizing practical expertise, innovative teaching methods, and accessible learning resources to empower individuals and teams for success in a competitive global market.
//              </p>
//             <a href="#" className="mt-2 text-sm text-purple-600">→</a>
//           </div>
           
//           <div className="bg-white p-4 rounded-lg shadow flex flex-col items-center text-center">
//             <div className="mb-2">
//               <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
//               </svg>
//             </div>
//             <h3 className="text-lg font-medium text-yellow-600">All Time Support Online Sessions</h3>
//             <p className="text-sm text-gray-600 mt-2">Online Sessions offers round-the-clock access to live, expert-led training and assistance, ensuring learners receive continuous guidance and support. 
//               Available anytime, these sessions provide interactive problem-solving, personalized feedback, and real-time collaboration, making skill development seamless and accessible worldwide.
// </p>
//             <a href="#" className="mt-2 text-sm text-purple-600">→</a>
//           </div>
//         </div>
//       </div>

//       {/* Learning Section with Carousel */}
//       {/* <Carousel courses={[...coursesInProgress, ...completedCourses]} /> */}

//       {/* Banner Section */}
//       <div className="grid grid-cols-1 gap-4">
//         <div className="relative">
//           <div className="flex items-center justify-between p-6 bg-white shadow rounded-lg">
//             <div>
//               <h2 className="text-2xl font-semibold">Go Further Into Our Current And Upcoming New Courses</h2>
//               <p className="mt-2 text-gray-600">
//                 Subscribe to a collection of our top courses in various fields, and more with Personal Plan.
//               </p>
//               <button className="mt-4 px-4 py-2 bg-purple-600 text-white rounded">
//                 <a href="/search">Try it</a>
//               </button>
//             </div>
//             <div className="flex-shrink-0">
//               <img src="./imgu.jpg" alt="Student with laptop" className="w-48 h-auto rounded-lg" />
//             </div>
//           </div>
//           <div className="absolute inset-y-0 right-0 flex items-center">
//             <button className="p-2 text-gray-600">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-6 w-6"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }










// // app/(dashboard)/(routes)/(root)/page.tsx
// import { redirect } from "next/navigation";
// import { CheckCircle, Clock } from "lucide-react";
// import { getDashboardCourses } from "@/actions/get-dashboard-courses";
// import { CoursesList } from "@/components/courses-list";
// import { InfoCard } from "./_components/info-card";
// import { BannerCard } from "./_components/banner-card";
// import { getUpcomingCourses } from "@/actions/get-upcoming-courses";
// import { auth } from "@clerk/nextjs/server";
// import { clerkClient } from "@clerk/nextjs/server";
// import CarouselSection from "./_components/carousel-section"; // New client component

// // Server-side data fetching
// async function getUserDetails() {
//   const { userId } = await auth();
//   if (!userId) return null;
//   const user = await clerkClient.users.getUser(userId);
//   return user;
// }

// // Server Component
// export default async function Dashboard() {
//   const user = await getUserDetails();

//   if (!user) {
//     return redirect("/sign-in");
//   }

//   const { completedCourses, coursesInProgress } = await getDashboardCourses(user.id);
//   const upcomingCourses = await getUpcomingCourses();

//   return (
//     <div className="p-6 space-y-4">
//       {/* Welcome Section */}
//       <div className="space-y-4">
//         <div>
//           <div className="bg-black text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold">
//             {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
//           </div>
//         </div>
//         <div className="relative bg-green-100 p-4 rounded-lg shadow-md flex items-center justify-between">
//           <div>
//             <h3 className="text-xl font-semibold text-yellow-600">Welcome to a World of Continuous Learning!</h3>
//             <p className="text-sm text-gray-700 mt-1">
//               Embark on your journey to success today with Eduskill. Stay updated with all course announcements here.
//             </p>
//           </div>
//           <div className="flex-shrink-0 ml-4">
//             <div className="bg-black text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold">
//               {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
//             </div>
//           </div>
//           <div className="absolute right-0 top-0 h-full w-4 bg-green-100 clip-path-polygon(100% 0, 75% 50%, 100% 100%)"></div>
//         </div>
//       </div>

//       {/* Info Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//         <InfoCard icon={Clock} label="In Progress" numberOfItems={coursesInProgress.length} />
//         <InfoCard icon={CheckCircle} label="Completed" numberOfItems={completedCourses.length} variant="success" />
//       </div>

//       {/* Courses List */}
//       <CoursesList items={[...coursesInProgress,]} />
//        {/* <...completedCourses/> */}

//       {/* Carousel Section */}
//       <CarouselSection />

//       {/* Banner Section */}
//       <div className="grid grid-cols-1 gap-4">
//         <div className="relative">
//           <div className="flex items-center justify-between p-6 bg-white shadow rounded-lg">
//             <div>
//               <h2 className="text-2xl font-semibold">Go Further Into Our Current And Upcoming New Courses</h2>
//               <p className="mt-2 text-gray-600">
//                 Subscribe to a collection of our top courses in various fields, and more with Personal Plan.
//               </p>
//               <button className="mt-4 px-4 py-2 bg-purple-600 text-white rounded">
//                 <a href="/search">Try it</a>
//               </button>
//             </div>
//             <div className="flex-shrink-0">
//               <img src="./imgu.jpg" alt="Student with laptop" className="w-48 h-auto rounded-lg" />
//             </div>
//           </div>
//           <div className="absolute inset-y-0 right-0 flex items-center">
//             <button className="p-2 text-gray-600">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-6 w-6"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }










// app/(dashboard)/(routes)/(root)/page.tsx
import { redirect } from "next/navigation";
import { CheckCircle, Clock } from "lucide-react";
import { getDashboardCourses } from "@/actions/get-dashboard-courses";
import { CoursesList } from "@/components/courses-list";
import { InfoCard } from "./_components/info-card";
import { auth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs/server";
import "./dashboard.css"; // Import the new CSS file

// Server-side data fetching
async function getUserDetails() {
  const { userId } = await auth();
  if (!userId) return null;
  const user = await clerkClient.users.getUser(userId);
  return user;
}

// Server Component
export default async function Dashboard() {
  const user = await getUserDetails();

  if (!user) {
    return redirect("/sign-in");
  }

  const { completedCourses, coursesInProgress } = await getDashboardCourses(user.id);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6 md:p-8 space-y-8">
      {/* Welcome Section */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 shadow-xl">
        <div className="p-6 md:p-8 flex flex-col md:flex-row items-center justify-between">
          <div className="space-y-3 z-10">
            <div className="flex items-center space-x-4">
              <div className="bg-white/20 backdrop-blur-sm w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold text-white">
                {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
              </div>
              <h1 className="text-2xl md:text-2xl font-bold text-white">
                Welcome back, {user.firstName}!
              </h1>
            </div>
            <p className="text-white/90 text-sm md:text-base max-w-xl">
              Continue your learning journey with our curated courses and track your progress effortlessly.
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex-shrink-0">
            <button className="px-6 py-2 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-indigo-50 transition-all duration-300">
              <a href="/search">Explore Courses</a>
            </button>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mb-16" />
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InfoCard 
          icon={Clock} 
          label="In Progress" 
          numberOfItems={coursesInProgress.length}
          className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300 rounded-xl border border-gray-100"
        />
        <InfoCard 
          icon={CheckCircle} 
          label="Completed" 
          numberOfItems={completedCourses.length} 
          variant="success"
          className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300 rounded-xl border border-gray-100"
        />
      </section>

      {/* Courses Section */}
      <section className="space-y-4">
       <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
                      Your Learning Journey
             </h2>
               <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 w-full max-w-[1400px] mx-auto">
               <CoursesList 
                     items={[...coursesInProgress]} 
                   // className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-6"
                  />
                       </div>
                          </section>

      {/* Advanced Carousel Section */}
      <section className="space-y-6">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
          Upcoming Courses
        </h2>
        <div className="relative">
          <div className="overflow-hidden rounded-xl">
            <div className="flex animate-slide gap-4 pb-4 snap-x snap-mandatory">
              {[
                { title: "Data Science", img: "/blockchain.webp" },
                { title: "Cyber Security", img: "/cyber.webp" },
                { title: "Artificial Intelligence", img: "/Ai.webp" },
              ].map((course, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-[300px] bg-white rounded-lg shadow-lg overflow-hidden snap-start transform hover:scale-105 transition-all duration-300"
                >
                  <img 
                    src={course.img} 
                    alt={course.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800">{course.title}</h3>
                    <button className="mt-2 px-4 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
                      <a href="/search">Learn More</a>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Carousel Navigation */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-4">
            <button className="p-2 bg-white/80 rounded-full shadow-md hover:bg-white transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button className="p-2 bg-white/80 rounded-full shadow-md hover:bg-white transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Banner Section */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl shadow-lg p-6 md:p-8 text-white relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-4 z-10">
            <h2 className="text-2xl md:text-3xl font-bold">
              Unlock Premium Learning
            </h2>
            <p className="text-white/90 max-w-md">
              Get unlimited access to all courses with our Premium Plan and accelerate your growth.
            </p>
            <button className="px-6 py-2 bg-white text-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition-all duration-300">
              <a href="/search">Get Started</a>
            </button>
          </div>
          <div className="flex-shrink-0">
            <img 
              src="./imgu.jpg" 
              alt="Learning illustration" 
              className="w-96 md \md:w-128 h-auto rounded-lg shadow-md"
            />
          </div>
        </div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
      </section>
    </div>
  );
}













// import { auth } from "@clerk/nextjs/server";
// import { redirect } from "next/navigation";
// import { CheckCircle, Clock } from "lucide-react";
// import { getDashboardCourses } from "@/actions/get-dashboard-courses";
// import { CoursesList } from "@/components/courses-list";
// import { InfoCard } from "./_components/info-card";
// import { clerkClient } from "@clerk/nextjs/server";

// // Function to get user details
// async function getUserDetails() {
//   const { userId } = await auth();
//   if (!userId) return null;
//   const user = await clerkClient.users.getUser(userId);
//   return user;
// }

// export default async function Dashboard() {
//   const user = await getUserDetails();

//   if (!user) {
//     return redirect("/sign-in");
//   }

//   const { completedCourses, coursesInProgress } = await getDashboardCourses(user.id);

//   return (
//     <div className="p-6 space-y-4">
//       {/* Welcome Section */}
//       <div className="flex items-center mb-4">
//         <div className="flex-shrink-0">
//           <div className="bg-black text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold">
//             {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
//           </div>
//         </div>
//         <div className="ml-3">
//           <h1 className="text-xl font-bold">Welcome back, {user.firstName}</h1>
//           <a href="#" className="text-sm text-purple-600">
//             Add occupation and interests
//           </a>
//         </div>
//       </div>

//       {/* Info Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//         <InfoCard icon={Clock} label="In Progress" numberOfItems={coursesInProgress.length} />
//         <InfoCard icon={CheckCircle} label="Completed" numberOfItems={completedCourses.length} variant="success" />
//       </div>

//       {/* Courses List */}
//       <CoursesList items={[...coursesInProgress, ...completedCourses]} />
//     </div>
//   );
// }
