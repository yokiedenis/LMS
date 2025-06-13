import { redirectToSignIn, getAuth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";
import { db } from "@/lib/db";

export const currentProfile = async (req: NextRequest) => {
    const { userId } = getAuth(req);

    if (!userId) {
        return redirectToSignIn(); 
    }

    let profile = await db.profile.findUnique({
        where: {
            userId: userId,
        },
    });

    if (!profile) {
        const email = req.headers.get("email") || "";
        let firstName = req.headers.get("first-name") || "";
        let lastName = req.headers.get("last-name") || "";

        if (!firstName && !lastName && email) {
            const emailParts = email.split("@");
            firstName = emailParts[0].trim();
            lastName = "";
        }
        
        profile = await db.profile.create({
            data: { 
                userId: userId,
                name: `${firstName} ${lastName}`,
                imageUrl: "", // Default image URL or handle accordingly
                email: email,
                dob: new Date(), // Default date, you should handle this better in production
                occupation: "", // Default occupation, handle this in production
            },
        });
    }

    return profile;
};