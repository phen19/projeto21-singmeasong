import { faker } from "@faker-js/faker";
import { prisma } from "../../src/database";

export function allRecommendation() {
  let recommendations = [];
  for (let i = 0; i < 10; i++) {
    const recommendation = {
      id: i + 1,
      name: faker.music.songName(),
      youtubeLink: `https://www.youtube.com/watch?v=${faker.random.alphaNumeric(
        10
      )}`,
      score: faker.datatype.number(500),
    };

    recommendations.push(recommendation);
  }

  return recommendations;
}

export function orderedRecommendation() {
  const recommendation = allRecommendation();

  const ordered = recommendation.sort((a, b) => b.score - a.score);

  return ordered;
}

export async function validRecommendationData() {
  const recommendation = {
    name: faker.music.songName(),
    youtubeLink: `https://www.youtube.com/watch?v=${faker.random.alphaNumeric(
      10
    )}`,
  };
  return recommendation;
}

export async function insertRecommendation() {
  const recommendation = await validRecommendationData();
  const insertedRecommendation = await prisma.recommendation.create({
    data: recommendation,
  });

  return { recommendation, insertedRecommendation };
}

export async function uptateToDeleteRecommendation() {
  const { insertedRecommendation } = await insertRecommendation();

  const recommendationToDelete = await prisma.recommendation.update({
    where: { id: insertedRecommendation.id },
    data: { score: -6 },
  });

  return recommendationToDelete;
}
export async function emptyFields() {
  return {
    name: "",
    youtubeLink: "",
  };
}

export async function invalidJoi() {
  return {
    name: 1,
    youtubeLink: "www.youtube.com",
  };
}

export async function insertAllRecommendation() {
  const recommendations = allRecommendation();
  const insertedRecommendations = await prisma.$transaction(
    recommendations.map((cur, index) =>
      prisma.recommendation.upsert({
        where: { id: cur.id },
        update: {},
        create: {
          name: cur.name,
          youtubeLink: cur.youtubeLink,
          score: cur.score,
        },
      })
    )
  );
  const orderedRecommendation = recommendations.sort((a, b) => b.id - a.id);
  return { insertedRecommendations, orderedRecommendation, recommendations };
}
