import { db } from "@/lib/db";

export interface Logging {
    id?: string;
    url: string;
    method: string;
    userId: string;  // Added userId
    body?: string;
    response?: string;
    statusCode?: number;
    errorMessage?: string;
    createdAt: Date;
}

export async function createLogging(logging: Logging): Promise<void> {
  await db.logging.create({
    data: logging,
  });
}