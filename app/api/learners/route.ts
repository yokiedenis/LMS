// app/api/learners/route.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Handle GET requests
export async function GET(req: Request) {
  try {
    const learners = await prisma.learner.findMany();
    return new Response(JSON.stringify(learners), { status: 200 });
  } catch (error) {
    console.error('Error fetching learners:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch learners' }), { status: 500 });
  }
}