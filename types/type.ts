import { Category, Course, Profile  } from "@prisma/client";

export type CourseWithProgressWithCategory = Course & {
    category: Category | null;
    chapters: { id: string }[];
    progress: number | null;
};

export type SafeProfile = Omit<
  Profile,
  "createdAt" | "updatedAt" 
> & {
  createdAt: string;
  updatedAt: string;
};


export interface UserProfileProps {
  name: string;
  email: string;
  dob?: string;
  occupation?: string;
  bio?: string;
  imageUrl?: string;
};
