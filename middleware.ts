// import { authMiddleware } from "@clerk/nextjs/server";
// import { isTeacher } from "@/lib/teacher";
// import { isSuperAdmin } from "@/lib/isSuperAdmin";  // Import the new function

// export default authMiddleware({
//   debug: false,
//   publicRoutes: [
//     "/api/webhook",
//     "/api/uploadthing",
//     "/",
//     "/search",
//     /^\/api\/courses\/[^/]+\/quizzes\/[^/]+\/get$/, // Matches /api/courses/{courseId}/quizzes/{quizId}/get
//     /^\/api\/courses\/[^/]+\/chapterquizzes\/[^/]+\/get$/, // Matches /api/courses/{courseId}/chapterquizzes/{chapterQuizId}/get
//   ],
//   afterAuth: async (auth, req) => {
//     const { userId } = auth;

//     // Route accessible only by teachers and super admins
//     if (req.nextUrl.pathname.startsWith("/teacher/feedback")) {
//       if (!userId || (!isTeacher(userId) && !isSuperAdmin(userId))) {
//         // Redirect unauthorized users
//         return new Response(null, { status: 302, headers: { Location: "/" } });
//       }
//     }

//     // Route accessible only by super admins
//     if (req.nextUrl.pathname.startsWith("/admin")) {
//       if (!userId || !isSuperAdmin(userId)) {
//         // Redirect unauthorized users
//         return new Response(null, { status: 302, headers: { Location: "/" } });
//       }
//     }
//   },
// });

// export const config = {
//   matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
// };



import { authMiddleware } from "@clerk/nextjs/server";
import { isTeacher } from "@/lib/teacher";
import { isSuperAdmin } from "@/lib/isSuperAdmin";

export default authMiddleware({
  //debug: true, // Enable debug mode for more detailed logs
  publicRoutes: [
    "/api/webhook",
    "/api/uploadthing",
    "/",
    "/search",
    /^\/api\/courses\/[^/]+\/quizzes\/[^/]+\/get$/,
    /^\/api\/courses\/[^/]+\/chapterquizzes\/[^/]+\/get$/,
  ],
  afterAuth: async (auth, req) => {
   // console.log("Incoming Request:", req); // Log the incoming request

    const { userId } = auth;

    if (req.nextUrl.pathname.startsWith("/teacher/feedback")) {
      if (!userId || (!isTeacher(userId) && !isSuperAdmin(userId))) {
        return new Response(null, { status: 302, headers: { Location: "/" } });
      }
    }

    if (req.nextUrl.pathname.startsWith("/admin")) {
      if (!userId || !isSuperAdmin(userId)) {
        return new Response(null, { status: 302, headers: { Location: "/" } });
      }
    }
  },
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};



// import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
// import { isTeacher } from '@/lib/teacher';
// import { isSuperAdmin } from '@/lib/isSuperAdmin';

// // Define public routes that don't require authentication
// const isPublicRoute = createRouteMatcher([
//   '/api/webhook',
//   '/api/uploadthing',
//   '/',
//   '/search',
//   /^\/api\/courses\/[^/]+\/quizzes\/[^/]+\/get$/,
//   /^\/api\/courses\/[^/]+\/chapterquizzes\/[^/]+\/get$/,
// ]);

// // Define protected routes for specific roles
// const isTeacherFeedbackRoute = createRouteMatcher(['/teacher/feedback(.*)']);
// const isAdminRoute = createRouteMatcher(['/admin(.*)']);

// // Explicitly match course routes
// const isCourseRoute = createRouteMatcher(['/courses/:path*']);

// export default clerkMiddleware(async (auth, req) => {
//   // Log the request to confirm middleware execution
//  // console.log('Middleware - Request Path:', req.nextUrl.pathname);

//   // Skip authentication for public routes
//   if (isPublicRoute(req)) {
//    // console.log('Middleware - Public route, skipping auth:', req.nextUrl.pathname);
//     return;
//   }

//   // Protect course routes explicitly
//   if (isCourseRoute(req)) {
//    // console.log('Middleware - Protecting course route:', req.nextUrl.pathname);
//     const { userId } = auth();
//     if (!userId) {
//    //   console.log('Middleware - No userId, redirecting to sign-in');
//       auth().protect(); // Redirects to sign-in if not authenticated
//     }
//   }

//   // Protect other non-public routes
//   const { userId } = auth();
//   if (!userId) {
//    // console.log('Middleware - No userId for non-public route, redirecting');
//     auth().protect();
//   }

//   // Handle teacher/feedback routes
//   if (isTeacherFeedbackRoute(req)) {
//    // console.log('Middleware - Checking teacher feedback route:', req.nextUrl.pathname);
//     if (!userId || (!isTeacher(userId) && !isSuperAdmin(userId))) {
//      // console.log('Middleware - Unauthorized for teacher feedback, redirecting');
//       return new Response(null, { status: 302, headers: { Location: '/' } });
//     }
//   }

//   // Handle admin routes
//   if (isAdminRoute(req)) {
//    // console.log('Middleware - Checking admin route:', req.nextUrl.pathname);
//     if (!userId || !isSuperAdmin(userId)) {
//      // console.log('Middleware - Unauthorized for admin, redirect  redirecting');
//       return new Response(null, { status: 302, headers: { Location: '/' } });
//     }
//   }

//  // console.log('Middleware - Request processed successfully:', req.nextUrl.pathname);
// }, { debug: true }); // Enable debug mode for detailed logs

// export const config = {
//   matcher: [
//     // Explicitly include course routes
//     '/courses/:path*',
//     // Include all other routes except static files and Next.js internals
//     '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
//     // Include API and TRPC routes
//     '/(api|trpc)(.*)',
//   ],
// };