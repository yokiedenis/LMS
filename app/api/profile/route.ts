// import { NextRequest, NextResponse } from 'next/server';
// import prisma from '@/lib/prisma'; // Assuming you have this set up to import your Prisma client

// // GET method to fetch a user's profile
// export async function GET(req: NextRequest) {
//   const url = new URL(req.url);
//   const userId = url.searchParams.get('userId');

//   if (!userId) {
//     return NextResponse.json({ error: "Missing userId" }, { status: 400 });
//   }

//   try {
//     const profile = await prisma.profile.findUnique({
//       where: { userId },
//     });

//     if (!profile) {
//       return NextResponse.json({ error: "Profile not found" }, { status: 404 });
//     }

//     return NextResponse.json(profile, { status: 200 });
//   } catch (error) {
//     console.error("Error fetching profile:", error);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }

// // POST method to create or update a user's profile
// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json();
//     const { 
//       userId, 
//       name, 
//       dob, 
//       occupation, 
//       bio, 
//       imageUrl, 
//       email, 
//       role, 
//       gender, 
//       country, 
//       contactNo, 
//       address, 
//       highestQualification, 
//       employeeStatus, 
//       industry, 
//       paymentOption 
//     } = body;

//     if (!userId || !name || !email) {
//       return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
//     }

//     let profile = await prisma.profile.findUnique({
//       where: { userId },
//     });

//     if (profile) {
//       // Update existing profile
//       profile = await prisma.profile.update({
//         where: { userId },
//         data: {
//           name,
//           dob: dob ? new Date(dob) : undefined,
//           occupation,
//           bio,
//           imageUrl,
//           email,
//           role,
//           gender,
//           country,
//           contactNo,
//           address,
//           highestQualification,
//           employeeStatus,
//           industry,
//           paymentOption,
//         },
//       });
//     } else {
//       // Create new profile
//       profile = await prisma.profile.create({
//         data: {
//           userId,
//           name,
//           dob: new Date(dob),
//           occupation,
//           bio,
//           imageUrl,
//           email,
//           role,
//           gender,
//           country,
//           contactNo,
//           address,
//           highestQualification,
//           employeeStatus,
//           industry,
//           paymentOption,
//         },
//       });
//     }

//     return NextResponse.json(profile, { status: 201 });
//   } catch (error) {
//     console.error("Error creating/updating profile:", error);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }

// // PUT method (optional) if you want to separate update from create
// export async function PUT(req: NextRequest) {
//   const url = new URL(req.url);
//   const userId = url.searchParams.get('userId');

//   if (!userId) {
//     return NextResponse.json({ error: "Missing userId" }, { status: 400 });
//   }

//   try {
//     const body = await req.json();
//     const { 
//       name, 
//       dob, 
//       occupation, 
//       bio, 
//       imageUrl, 
//       email, 
//       role, 
//       gender, 
//       country, 
//       contactNo, 
//       address, 
//       highestQualification, 
//       employeeStatus, 
//       industry, 
//       paymentOption 
//     } = body;

//     const updatedProfile = await prisma.profile.update({
//       where: { userId },
//       data: {
//         name,
//         dob: dob ? new Date(dob) : undefined,
//         occupation,
//         bio,
//         imageUrl,
//         email,
//         role,
//         gender,
//         country,
//         contactNo,
//         address,
//         highestQualification,
//         employeeStatus,
//         industry,
//         paymentOption,
//       },
//     });

//     return NextResponse.json(updatedProfile, { status: 200 });
//   } catch (error) {
//     console.error("Error updating profile:", error);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }

// // DELETE method to remove a user's profile
// export async function DELETE(req: NextRequest) {
//   const url = new URL(req.url);
//   const userId = url.searchParams.get('userId');

//   if (!userId) {
//     return NextResponse.json({ error: "Missing userId" }, { status: 400 });
//   }

//   try {
//     await prisma.profile.delete({
//       where: { userId },
//     });

//     return new NextResponse(null, { status: 204 });
//   } catch (error) {
//     console.error("Error deleting profile:", error);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }





import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { currentUser } from "@clerk/nextjs/server";

// GET method to fetch a user's profile
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const userId = url.searchParams.get('userId');

  const authenticatedUser = await currentUser();
  if (!authenticatedUser || !authenticatedUser.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  if (userId !== authenticatedUser.id) {
    return NextResponse.json({ error: "Forbidden: You can only access your own profile" }, { status: 403 });
  }

  try {
    const profile = await prisma.profile.findUnique({
      where: { userId },
    });

    if (!profile) {
      return NextResponse.json({ message: "Profile not found, create one using POST" }, { status: 200 });
    }

    return NextResponse.json(profile, { status: 200 });
  } catch (error: unknown) { // Use unknown as the catch type
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    console.error("Error fetching profile:", errorMessage);
    return NextResponse.json({ error: "Internal Server Error", details: errorMessage }, { status: 500 });
  }
}

// POST method to create or update a user's profile
export async function POST(req: NextRequest) {
  const authenticatedUser = await currentUser();
  if (!authenticatedUser || !authenticatedUser.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    console.log("POST request body:", body);

    const { 
      userId, 
      name, 
      dob, 
      occupation, 
      bio, 
      imageUrl, 
      email, 
      role, 
      gender, 
      country, 
      contactNo, 
      address, 
      highestQualification, 
      employeeStatus, 
      industry, 
      paymentOption 
    } = body;

    if (!userId || !name) {
      return NextResponse.json({ 
        error: "Missing required fields", 
        missing: { userId: !userId, name: !name, email: !email } 
      }, { status: 400 });
    }

    if (userId !== authenticatedUser.id) {
      return NextResponse.json({ error: "Forbidden: You can only modify your own profile" }, { status: 403 });
    }

    // Use Clerk email if none provided or if empty
    const effectiveEmail = email || authenticatedUser.emailAddresses[0].emailAddress;
    if (!effectiveEmail) {
      return NextResponse.json({ error: "Email is required and could not be retrieved from authentication" }, { status: 400 });
    }

    let profile = await prisma.profile.findUnique({
      where: { userId },
    });

    if (profile) {
      // Update existing profile
      profile = await prisma.profile.update({
        where: { userId },
        data: {
          name,
          dob: dob ? new Date(dob) : undefined,
          occupation,
          bio,
          imageUrl,
          email: effectiveEmail,
          role,
          gender,
          country,
          contactNo,
          address,
          highestQualification,
          employeeStatus,
          industry,
          paymentOption,
        },
      });
      return NextResponse.json(profile, { status: 200 });
    } else {
      // Create new profile
      profile = await prisma.profile.create({
        data: {
          userId,
          name,
          dob: dob ? new Date(dob) : new Date(),
          occupation: occupation || "Unknown",
          bio,
          imageUrl,
          email: effectiveEmail,
          role: role || "STUDENT",
          gender,
          country,
          contactNo,
          address,
          highestQualification,
          employeeStatus,
          industry,
          paymentOption,
        },
      });
      return NextResponse.json(profile, { status: 201 });
    }
  } catch (error: unknown) { // Use unknown as the catch type
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    console.error("Error creating/updating profile:", errorMessage);
    return NextResponse.json({ error: "Internal Server Error", details: errorMessage }, { status: 500 });
  }
}

// PUT method to update a user's profile
export async function PUT(req: NextRequest) {
  const authenticatedUser = await currentUser();
  if (!authenticatedUser || !authenticatedUser.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(req.url);
  const userId = url.searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  if (userId !== authenticatedUser.id) {
    return NextResponse.json({ error: "Forbidden: You can only modify your own profile" }, { status: 403 });
  }

  try {
    const body = await req.json();
    console.log("PUT request body:", body);

    const { 
      name, 
      dob, 
      occupation, 
      bio, 
      imageUrl, 
      email, 
      role, 
      gender, 
      country, 
      contactNo, 
      address, 
      highestQualification, 
      employeeStatus, 
      industry, 
      paymentOption 
    } = body;

    const effectiveEmail = email || authenticatedUser.emailAddresses[0].emailAddress;
    if (!effectiveEmail) {
      return NextResponse.json({ error: "Email is required and could not be retrieved from authentication" }, { status: 400 });
    }

    const updatedProfile = await prisma.profile.update({
      where: { userId },
      data: {
        name,
        dob: dob ? new Date(dob) : undefined,
        occupation,
        bio,
        imageUrl,
        email: effectiveEmail,
        role,
        gender,
        country,
        contactNo,
        address,
        highestQualification,
        employeeStatus,
        industry,
        paymentOption,
      },
    });

    return NextResponse.json(updatedProfile, { status: 200 });
  } catch (error: unknown) { // Use unknown as the catch type
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    console.error("Error updating profile:", errorMessage);
    return NextResponse.json({ error: "Internal Server Error", details: errorMessage }, { status: 500 });
  }
}

// DELETE method to remove a user's profile
export async function DELETE(req: NextRequest) {
  const authenticatedUser = await currentUser();
  if (!authenticatedUser || !authenticatedUser.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(req.url);
  const userId = url.searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  if (userId !== authenticatedUser.id) {
    return NextResponse.json({ error: "Forbidden: You can only delete your own profile" }, { status: 403 });
  }

  try {
    await prisma.profile.delete({
      where: { userId },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error: unknown) { // Use unknown as the catch type
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    console.error("Error deleting profile:", errorMessage);
    return NextResponse.json({ error: "Internal Server Error", details: errorMessage }, { status: 500 });
  }
}