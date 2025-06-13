// "use server";

// import { auth } from "@clerk/nextjs/server";
// import { redirect } from "next/navigation";

// export const Auth = async ({ children }: { children: React.ReactNode }) => {
//   const { userId } = await auth();
//   if (!userId) {
//     return redirect("/");
//   }

//   return children;
// };



// "use server";

// import { auth } from "@clerk/nextjs/server";
// import { redirect } from "next/navigation";

// export const Auth = async ({ children }: { children: React.ReactNode }) => {
//   const authResult = await auth();
//   console.log("Auth Result in Auth component:", authResult);
//   const { userId } = authResult;
//   if (!userId) {
//     return redirect("/");
//   }

//   return children;
// };



"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { User } from "@prisma/client";
import { redirect } from "next/navigation";

// Get the current user from Clerk and fetch their details from Prisma
export async function getCurrentUser(): Promise<User | null> {
  try {
    const { userId } = auth();
    if (!userId) {
      return null; // No user is authenticated
    }

    // Fetch the user from Prisma, including their profile
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { profile: true },
    });

    return user || null; // Return user or null if not found
  } catch (error) {
    console.error("Error fetching current user:", error);
    return null;
  }
}

// Optional: Keep the Auth component if it's used elsewhere
export const Auth = async ({ children }: { children: React.ReactNode }) => {
  const authResult = await auth();
  console.log("Auth Result in Auth component:", authResult);
  const { userId } = authResult;
  if (!userId) {
     return redirect("/");
  }

  return children;
};