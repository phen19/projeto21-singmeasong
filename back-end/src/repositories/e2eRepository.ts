import { allRecommendationLargerThan10 } from "../../tests/factories/recommendationFactory.js";
import { prisma } from "../database.js";

export async function truncate() {
  await prisma.$executeRaw`TRUNCATE TABLE recommendations RESTART IDENTITY`;
}

export async function populate() {
  const recommendations = allRecommendationLargerThan10();
  await prisma.recommendation.createMany({ data: recommendations });
}
