// app/api/member/route.ts

import { NextRequest, NextResponse } from 'next/server';  // Import NextRequest and NextResponse for the App Router
import prisma from '@/lib/prisma'; // Adjust the import based on your folder structure

// Handle PATCH request to update the member's role
export async function PATCH(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get('userId');  // Get userId from query params using .get()
  const { role } = await req.json();  // Get the new role from the request body

  // Check if userId is provided
  if (!userId) {
    return NextResponse.json({ error: 'UserId is required' }, { status: 400 }); // If userId is missing, return 400 error
  }

  try {
    // Update the user's role in the database
    const updatedUsers = await prisma.profile.updateMany({
      where: { userId: String(userId) }, // Ensure userId is properly converted to a string
      data: {
        role: role,
      },
    });

    // Check if any profile was updated
    if (updatedUsers.count === 0) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 }); // Return 404 if no profile is found
    }

    // Return success response
    return NextResponse.json({ message: "Role updated successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error updating user role:", error);
    // Return error response
    return NextResponse.json({ error: "Unable to update role" }, { status: 500 });
  }
}
