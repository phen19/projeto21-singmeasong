import app from "../../src/app";
import supertest from "supertest";
import { prisma } from "../../src/database";
import {
  emptyFields,
  getRandomInt,
  insertAllRecommendation,
  insertRecommendation,
  invalidJoi,
  uptateToDeleteRecommendation,
  validRecommendationData,
} from "../factories/recommendationFactory";

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE recommendations RESTART IDENTITY`;
});

afterAll(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE recommendations RESTART IDENTITY`;
  await prisma.$disconnect();
});

describe("POST /recommendations", () => {
  it("return 201 for created", async () => {
    const recommendation = await validRecommendationData();
    const result = await supertest(app)
      .post("/recommendations")
      .send(recommendation);
    expect(result.status).toBe(201);
  });

  it("should return 409 for conflict", async () => {
    const recommendation = await validRecommendationData();
    await supertest(app).post("/recommendations").send(recommendation);
    const result = await supertest(app)
      .post("/recommendations")
      .send(recommendation);
    expect(result.status).toBe(409);
    expect(result.text).toBe("Recommendations names must be unique");
  });

  it("should return 422 for empty fields", async () => {
    const recommendation = emptyFields();
    const result = await supertest(app)
      .post("/recommendations")
      .send(recommendation);
    expect(result.status).toBe(422);
    expect(result.text).toBe("");
  });

  it("should return 422 for required fields", async () => {
    const result = await supertest(app).post("/recommendations").send({});
    expect(result.status).toBe(422);
    expect(result.text).toBe("");
  });

  it("should return 422 for joi validation", async () => {
    const recommendation = invalidJoi();
    const result = await supertest(app)
      .post("/recommendations")
      .send(recommendation);
    expect(result.status).toBe(422);
    expect(result.text).toBe("");
  });
});

describe("GET /recommendations", () => {
  it("should return 200 and array with all recommendations", async () => {
    const { orderedRecommendation } = await insertAllRecommendation();
    const result = await supertest(app).get("/recommendations");
    expect(result.status).toBe(200);
    expect(result.body.length).toBeLessThanOrEqual(10);
    expect(result.body).toEqual(orderedRecommendation);
    expect(result.body[0]).toHaveProperty("id");
    expect(result.body[0]).toHaveProperty("name");
    expect(result.body[0]).toHaveProperty("youtubeLink");
    expect(result.body[0]).toHaveProperty("score");
  });
});

describe("GET /recommendations/random", () => {
  it("should return a random recommendation", async () => {
    const { recommendations } = await insertAllRecommendation();
    const result = await supertest(app).get(`/recommendations/random`);

    expect(result.status).toBe(200);
    expect(result.body).toBeInstanceOf(Object);
    expect(result.body).toHaveProperty("id");
    expect(result.body).toHaveProperty("name");
    expect(result.body).toHaveProperty("youtubeLink");
    expect(result.body).toHaveProperty("score");
    expect(recommendations).toContainEqual(result.body);
  });

  it("should return 404 for no recommendations inserted yet", async () => {
    const result = await supertest(app).get(`/recommendations/random`);

    expect(result.status).toBe(404);
    expect(result.text).toBe("");
    expect(result.body).toStrictEqual({});
  });
});

describe("GET /recommendations/top/:amount", () => {
  it("should return 200 with body with top X recommendations", async () => {
    const { recommendations } = await insertAllRecommendation();
    const AMOUNT: number = getRandomInt(
      2,
      10
    ); /* Math.floor(Math.random() * 10) + 1 */
    console.log(AMOUNT);
    const result = await supertest(app).get(`/recommendations/top/${AMOUNT}`);
    expect(result.status).toBe(200);
    expect(result.body.length).toBe(AMOUNT);
    expect(recommendations).toEqual(expect.arrayContaining(result.body));
    expect(result.body[0]).toHaveProperty("id");
    expect(result.body[0]).toHaveProperty("name");
    expect(result.body[0]).toHaveProperty("youtubeLink");
    expect(result.body[0]).toHaveProperty("score");
    expect(result.body[0].score).toBeGreaterThanOrEqual(result.body[1].score);
  });
});

describe("GET /recommendations/:id", () => {
  it("should return 200, with id recommendation", async () => {
    const { recommendations } = await insertAllRecommendation();
    const ID: number = Math.floor(Math.random() * 10) + 1;

    const result = await supertest(app).get(`/recommendations/${ID}`);
    expect(result.status).toBe(200);
    expect(result.body).toBeInstanceOf(Object);
    expect(result.body).toHaveProperty("id");
    expect(result.body).toHaveProperty("name");
    expect(result.body).toHaveProperty("youtubeLink");
    expect(result.body).toHaveProperty("score");
    expect(recommendations).toContainEqual(result.body);
    expect(result.body.id).toBe(ID);
  });

  it("should return 404, with invalid ID", async () => {
    const ID: number = 0;

    const result = await supertest(app).get(`/recommendations/${ID}`);
    expect(result.status).toBe(404);
    expect(result.text).toBe("");
    expect(result.body).toStrictEqual({});
  });
});

describe("POST /recommendations/:id/upvote", () => {
  it("should return 200 and increment recommendation score by one", async () => {
    const { insertedRecommendation } = await insertRecommendation();
    const ID: number = insertedRecommendation.id;
    const result = await supertest(app).post(`/recommendations/${ID}/upvote`);
    const after = await supertest(app).get(`/recommendations/${ID}`);
    expect(result.status).toBe(200);
    expect(after.body.score).toBe(insertedRecommendation.score + 1);
  });

  it("should return 404 if informing a non-existing ID", async () => {
    const ID: number = 0;

    const result = await supertest(app).post(`/recommendations/${ID}/upvote`);
    expect(result.status).toBe(404);
    expect(result.text).toBe("");
    expect(result.body).toStrictEqual({});
  });
});

describe("POST /recommendations/:id/downvote", () => {
  it("should return 200 and decrement recommendation score by one", async () => {
    const { insertedRecommendation } = await insertRecommendation();
    const ID: number = insertedRecommendation.id;
    const result = await supertest(app).post(`/recommendations/${ID}/downvote`);
    const after = await supertest(app).get(`/recommendations/${ID}`);
    expect(result.status).toBe(200);
    expect(after.body.score).toBe(insertedRecommendation.score - 1);
  });

  it("should return 404 if informing a non-existing ID", async () => {
    const ID: number = 0;
    const result = await supertest(app).post(`/recommendations/${ID}/downvote`);
    expect(result.status).toBe(404);
    expect(result.text).toBe("");
    expect(result.body).toStrictEqual({});
  });

  it("should remove recommendation if score reaches bellow -5", async () => {
    const recommendationToDelete = await uptateToDeleteRecommendation();
    const ID: number = recommendationToDelete.id;

    const result = await supertest(app).post(`/recommendations/${ID}/downvote`);
    const after = await supertest(app).get(`/recommendations/${ID}`);

    expect(result.status).toBe(200);
    expect(after.status).toBe(404);
    expect(after.text).toBe("");
    expect(after.body).toStrictEqual({});
  });
});
