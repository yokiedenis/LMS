import React from "react";
import { useUser } from "@clerk/clerk-react";

type UserProfileProps = {
  name: string;
  email: string;
  dob?: string;
  occupation?: string;
  bio?: string;
  imageUrl?: string;
};

const UserProfile: React.FC<UserProfileProps> = ({
  name,
  email,
  dob,
  occupation,
  bio,
  imageUrl,
}) => {
  return (
    <div className="max-w-4xl mx-auto bg-gray-900 text-white shadow-lg rounded-lg p-8 mt-10">
      <div className="text-center">
        <img
          src={imageUrl || "/default-avatar.png"}
          alt="Profile"
          className="w-32 h-32 mx-auto rounded-full border-4 border-teal-500 shadow-md"
        />
        <h1 className="text-2xl font-bold mt-4">{name}</h1>
        <p className="text-sm text-gray-400">{email}</p>
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {dob && (
          <div className="bg-gray-800 p-4 rounded-md shadow">
            <p className="text-sm text-gray-400">Date of Birth</p>
            <p className="text-lg font-semibold">{dob}</p>
          </div>
        )}
        {occupation && (
          <div className="bg-gray-800 p-4 rounded-md shadow">
            <p className="text-sm text-gray-400">Occupation</p>
            <p className="text-lg font-semibold">{occupation}</p>
          </div>
        )}
        {bio && (
          <div className="bg-gray-800 p-4 rounded-md shadow col-span-full">
            <p className="text-sm text-gray-400">Bio</p>
            <p className="text-lg font-semibold">{bio}</p>
          </div>
        )}
      </div>
    </div>
  );
};

const ProfilePage = () => {
  const { user } = useUser();

  if (!user)
    return <p className="text-center text-gray-500 mt-20">Loading...</p>;

  const userProfile: UserProfileProps = {
    name: user.fullName || "User",
    email: user.primaryEmailAddress?.emailAddress || "No email provided",
    dob:
      typeof user.unsafeMetadata?.dob === "string"
        ? user.unsafeMetadata.dob
        : undefined,
    occupation:
      typeof user.unsafeMetadata?.occupation === "string"
        ? user.unsafeMetadata.occupation
        : undefined,
    bio:
      typeof user.unsafeMetadata?.bio === "string"
        ? user.unsafeMetadata.bio
        : undefined,
    imageUrl: user.imageUrl || "",
  };

  return <UserProfile {...userProfile} />;
};

export default ProfilePage;
