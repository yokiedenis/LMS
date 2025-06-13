import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getLeaderboardData() {
  // Aggregate points for each student by summing their UserProgress points
  const leaderboard = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      userProgress: {
        select: {
          points: true,
        },
      },
    },
  });

  // Transform the data to calculate total points for each user
  const formattedLeaderboard = leaderboard.map((user) => ({
    id: user.id,
    name: user.name,
    totalPoints: user.userProgress.reduce((sum, progress) => sum + progress.points, 0),
  }));

  // Sort the leaderboard by total points in descending order
  return formattedLeaderboard.sort((a, b) => b.totalPoints - a.totalPoints);
}
