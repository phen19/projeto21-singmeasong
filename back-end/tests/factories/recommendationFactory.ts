import { faker } from "@faker-js/faker";
import { prisma } from "../../src/database.js";

export function allRecommendation() {
  const recommendations = [
    {
      id: 1,
      name: "BALAZUL",
      youtubeLink: "https://www.youtube.com/watch?v=HVtE2rcJ5yk",
      score: 10,
    },
    {
      id: 2,
      name: "SEM DÓ",
      youtubeLink: "https://www.youtube.com/watch?v=G-zyOLsfEBQ&",
      score: 11,
    },
    {
      id: 3,
      name: "TAVABOM",
      youtubeLink: "https://www.youtube.com/watch?v=Z1WV8Q-wgKQ",
      score: 20,
    },
    {
      id: 4,
      name: "Tiffany",
      youtubeLink: "https://www.youtube.com/watch?v=iOM20kM2gOQ",
      score: 16,
    },
    {
      id: 5,
      name: "Paypal",
      youtubeLink: "https://www.youtube.com/watch?v=DsdjqBfTpaI",
      score: 7,
    },
    {
      id: 6,
      name: "Mustang Preto",
      youtubeLink: "https://www.youtube.com/watch?v=iDJM3HTdjck&",
      score: 3,
    },
    {
      id: 7,
      name: "INDUSTRY BABY",
      youtubeLink: "https://www.youtube.com/watch?v=eg-AwKRUFec",
      score: 5,
    },
    {
      id: 8,
      name: "M4",
      youtubeLink: "https://www.youtube.com/watch?v=DHYd4EyCE9M",
      score: 0,
    },
    {
      id: 9,
      name: "SICKO MODE",
      youtubeLink: "https://www.youtube.com/watch?v=6ONRf7h3Mdk",
      score: -1,
    },
    {
      id: 10,
      name: "Kenny G",
      youtubeLink:
        "https://www.youtube.com/watch?v=b-PhvPKgWjY&list=RDHVtE2rcJ5yk",
      score: 0,
    },
  ];
  return recommendations;
}

export function allRecommendationLargerThan10() {
  const recommendations = [
    {
      id: 1,
      name: "BALAZUL",
      youtubeLink: "https://www.youtube.com/watch?v=HVtE2rcJ5yk",
      score: 10,
    },
    {
      id: 2,
      name: "SEM DÓ",
      youtubeLink: "https://www.youtube.com/watch?v=G-zyOLsfEBQ&",
      score: 11,
    },
    {
      id: 3,
      name: "TAVABOM",
      youtubeLink: "https://www.youtube.com/watch?v=Z1WV8Q-wgKQ",
      score: 20,
    },
    {
      id: 4,
      name: "Tiffany",
      youtubeLink: "https://www.youtube.com/watch?v=iOM20kM2gOQ",
      score: 16,
    },
    {
      id: 5,
      name: "Paypal",
      youtubeLink: "https://www.youtube.com/watch?v=DsdjqBfTpaI",
      score: 7,
    },
    {
      id: 6,
      name: "Mustang Preto",
      youtubeLink: "https://www.youtube.com/watch?v=iDJM3HTdjck&",
      score: 3,
    },
    {
      id: 7,
      name: "INDUSTRY BABY",
      youtubeLink: "https://www.youtube.com/watch?v=eg-AwKRUFec",
      score: 5,
    },
    {
      id: 8,
      name: "M4",
      youtubeLink: "https://www.youtube.com/watch?v=DHYd4EyCE9M",
      score: 0,
    },
    {
      id: 9,
      name: "SICKO MODE",
      youtubeLink: "https://www.youtube.com/watch?v=6ONRf7h3Mdk",
      score: -1,
    },
    {
      id: 10,
      name: "Kenny G",
      youtubeLink: "https://www.youtube.com/watch?v=b-PhvPKgWjY",
      score: 0,
    },
    {
      id: 11,
      name: "FREIO DA BLAZER",
      youtubeLink: "https://www.youtube.com/watch?v=0qYWvuVp-0Q",
      score: 20,
    },
    {
      id: 12,
      name: "Dia Azul",
      youtubeLink: "https://www.youtube.com/watch?v=5kyPzVuiFgU",
      score: 12,
    },
    {
      id: 13,
      name: "Fim de Semana no Rio",
      youtubeLink: "https://www.youtube.com/watch?v=7AlAYttGnAg",
      score: 16,
    },
    {
      id: 14,
      name: "Anos luz",
      youtubeLink: "https://www.youtube.com/watch?v=m226f2reF28&",
      score: 15,
    },
    {
      id: 15,
      name: "Máquina do Tempo",
      youtubeLink: "https://www.youtube.com/watch?v=ZPcG9PCfagM",
      score: 19,
    },
  ];

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
        where: { id: index + 1 },
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

export async function dataForRandomLessThan10() {
  const recommendations = [];
  for (let i = 0; i < 10; i++) {
    const recommendation = {
      id: i + 1,
      name: faker.music.songName(),
      youtubeLink: `https://www.youtube.com/watch?v=${faker.random.alphaNumeric(
        10
      )}`,
      score: faker.datatype.number(10),
    };

    recommendations.push(recommendation);
  }

  return recommendations;
}

export async function dataForRandomGreaterThan10() {
  const recommendations = [];
  for (let i = 0; i < 10; i++) {
    const recommendation = {
      id: i + 1,
      name: faker.music.songName(),
      youtubeLink: `https://www.youtube.com/watch?v=${faker.random.alphaNumeric(
        10
      )}`,
      score: faker.datatype.number({ min: 11 }),
    };

    recommendations.push(recommendation);
  }

  return recommendations;
}
