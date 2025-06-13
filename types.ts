import { Category, Course, Profile } from "@prisma/client";

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


// Define the Metadata type
type Metadata = {
  purchaseStatus: string | null; // Can be 'completed', 'pending', or null
  // Add other properties relevant to your use case
  chapterId?: string; // Optional chapter identifier
  userId?: string; // Optional user identifier
  [key: string]: any; // To allow additional properties if needed
};
