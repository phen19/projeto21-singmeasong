import { faker } from "@faker-js/faker";

export function allRecommendation() {
  let recommendations = [];
  for (let i = 0; i < 10; i++) {
    const recommendation = {
      id: i + 1,
      name: faker.music.songName(),
      youtubeLink: `https://www.youtube.com/watch?v=${faker.random.alphaNumeric(
        10
      )}`,
      score: faker.datatype.number(3),
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
