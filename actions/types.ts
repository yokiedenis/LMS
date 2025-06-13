// types.ts

// Keep your existing AnalyticsData interface
export interface AnalyticsData {
    data: { name: string; total: number; }[];
    totalCourses: number;
    quizScores: number;
    usageInLast24Hours: number;
    studentProgress: number;
    dailyUsage: { hour: string; users: number; }[];
}

// Define User model interface to match your Prisma model
export interface User {
    id: string;
    name: string;
    email: string;
    quizAttempts: any[]; // Adjust this to a more specific type if necessary
    chapterQuizAttempts: any[];
    chapterQuizResults: any[];
    purchases: any[];
    points: number;
    level: number;
    userProgress: any[];
    number?: string;
}

// Extend the Session interface from next-auth
declare module "next-auth" {
    interface Session {
        user?: User;
    }

    interface User {
        id: string;
        name?: string | null;
        email?: string | null;
        image?: string | null;
    }
}

// Optionally, if you need to work with the User type elsewhere
export type UserType = User;