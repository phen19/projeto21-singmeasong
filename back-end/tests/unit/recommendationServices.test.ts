import { jest } from "@jest/globals";

import { recommendationService } from "../../src/services/recommendationsService";
import { recommendationRepository } from "../../src/repositories/recommendationRepository";
import {
  orderedRecommendation,
  allRecommendation,
} from "../factories/recommendationFactory";

jest.mock("../../src/repositories/recommendationRepository");

beforeEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
});

describe("GET: all recommendations", () => {
  it("get all recommendation", async () => {
    const recommendation = allRecommendation();
    jest
      .spyOn(recommendationRepository, "findAll")
      .mockResolvedValue(recommendation);

    const result = await recommendationService.get();
    expect(result.length).toBe(recommendation.length);
    expect(result).toEqual(recommendation);
  });
});

describe("GET: top recommendations", () => {
  it("get top recommendation", async () => {
    const recommendation = orderedRecommendation();
    const amount = 10;
    jest
      .spyOn(recommendationRepository, "getAmountByScore")
      .mockResolvedValue(recommendation);

    const result = await recommendationService.getTop(amount);
    expect(result.length).toBe(recommendation.length);
    expect(result).toEqual(recommendation);
  });
});
describe("POST: create recommendation", () => {
  it("should create recommendation", async () => {
    jest
      .spyOn(recommendationRepository, "create")
      .mockImplementationOnce((): any => {});
    jest
      .spyOn(recommendationRepository, "findByName")
      .mockImplementationOnce((): any => {});

    await expect(
      recommendationService.insert({
        name: "Teste",
        youtubeLink: "https://youtu.be/IW0xruff7Hc?list=RDIW0xruff7Hc",
      })
    ).resolves.not.toThrow();
    expect(recommendationRepository.create).toBeCalled();
  });

  it("should return conflict error", async () => {
    jest
      .spyOn(recommendationRepository, "findByName")
      .mockImplementationOnce((): any => {
        return {
          name: "Teste",
          youtubeLint: "https://youtu.be/IW0xruff7Hc?list=RDIW0xruff7Hc",
        };
      });

    const result = recommendationService.insert({
      name: "Teste",
      youtubeLink: "https://youtu.be/IW0xruff7Hc?list=RDIW0xruff7Hc",
    });
    expect(result).rejects.toEqual({
      message: "Recommendations names must be unique",
      type: "conflict",
    });
    expect(recommendationRepository.create).not.toBeCalled();
  });
});

describe("POST: upvote recommendations ", () => {
  it("should call repository to increase recommendation score", async () => {
    const recommendation = {
      id: 1,
      name: "Teste",
      youtubeLink: "https://youtu.be/IW0xruff7Hc?list=RDIW0xruff7Hc",
      score: 0,
    };

    const upvoteRec = {
      id: 1,
      name: "Teste",
      youtubeLink: "https://youtu.be/IW0xruff7Hc?list=RDIW0xruff7Hc",
      score: 1,
    };
    jest
      .spyOn(recommendationRepository, "find")
      .mockResolvedValue(recommendation);

    jest
      .spyOn(recommendationRepository, "updateScore")
      .mockResolvedValue(upvoteRec);

    await recommendationService.upvote(recommendation.id);
    expect(recommendationRepository.updateScore).toBeCalledWith(
      recommendation.id,
      "increment"
    );
  });
  it("should return not_found error when attempting to increase recommendation score for invalid ID", async () => {
    jest
      .spyOn(recommendationRepository, "find")
      .mockImplementationOnce((): any => {
        return undefined;
      });
    const result = recommendationService.upvote(1);
    expect(result).rejects.toEqual({
      message: "",
      type: "not_found",
    });
  });
});

describe("POST: downvote recommendations", () => {
  it("deveria retornar erro de recomendação não encontrada para downvote", async () => {
    jest
      .spyOn(recommendationRepository, "find")
      .mockImplementationOnce((): any => {
        return undefined;
      });
    const result = recommendationService.downvote(1);
    expect(result).rejects.toEqual({
      message: "",
      type: "not_found",
    });
  });

  it("downvote", async () => {
    const recommendation = {
      id: 1,
      name: "Teste",
      youtubeLink: "https://youtu.be/IW0xruff7Hc?list=RDIW0xruff7Hc",
      score: 1,
    };

    const downvoteRec = {
      id: 1,
      name: "Teste",
      youtubeLink: "https://youtu.be/IW0xruff7Hc?list=RDIW0xruff7Hc",
      score: 0,
    };
    jest
      .spyOn(recommendationRepository, "find")
      .mockResolvedValue(recommendation);

    jest
      .spyOn(recommendationRepository, "updateScore")
      .mockResolvedValue(downvoteRec);

    await recommendationService.downvote(recommendation.id);
    expect(recommendationRepository.updateScore).toBeCalledWith(
      recommendation.id,
      "decrement"
    );
  });

  it("remove if downvote and score < -5", async () => {
    const recommendation = {
      id: 1,
      name: "Teste",
      youtubeLink: "https://youtu.be/IW0xruff7Hc?list=RDIW0xruff7Hc",
      score: -6,
    };

    const downvoteRec = {
      id: 1,
      name: "Teste",
      youtubeLink: "https://youtu.be/IW0xruff7Hc?list=RDIW0xruff7Hc",
      score: -7,
    };
    jest
      .spyOn(recommendationRepository, "find")
      .mockResolvedValue(recommendation);

    jest
      .spyOn(recommendationRepository, "updateScore")
      .mockResolvedValue(downvoteRec);

    jest.spyOn(recommendationRepository, "remove").mockResolvedValue(undefined);

    await recommendationService.downvote(recommendation.id);
    expect(recommendationRepository.updateScore).toBeCalledWith(
      recommendation.id,
      "decrement"
    );

    expect(recommendationRepository.remove).toBeCalledWith(recommendation.id);
    expect(recommendationRepository.remove).toBeCalledTimes(1);
  });
});

describe("GET: recommendation with id", () => {
  it("should return especific recommendation", async () => {
    const recommendation = {
      id: 1,
      name: "Teste",
      youtubeLink: "https://youtu.be/IW0xruff7Hc?list=RDIW0xruff7Hc",
      score: 1,
    };
    jest
      .spyOn(recommendationRepository, "find")
      .mockResolvedValue(recommendation);

    const result = await recommendationService.getById(recommendation.id);

    expect(result).toEqual(recommendation);
    expect(recommendationRepository.find).toBeCalledWith(recommendation.id);
  });

  it("should return error for recommendation with invalid id", async () => {
    const recommendation = {
      id: -1,
      name: "Teste",
      youtubeLink: "https://youtu.be/IW0xruff7Hc?list=RDIW0xruff7Hc",
      score: 1,
    };
    jest.spyOn(recommendationRepository, "find").mockResolvedValue(null);

    await expect(
      recommendationService.getById(recommendation.id)
    ).rejects.toEqual({ message: "", type: "not_found" });
    expect(recommendationRepository.find).toBeCalledWith(recommendation.id);
  });
});

describe("GET: random recommendation", () => {
  it("should get random recommendation (score greater than 10)", async () => {
    const recommendation = allRecommendation();

    jest
      .spyOn(recommendationRepository, "findAll")
      .mockResolvedValue(recommendation);

    jest.spyOn(global.Math, "random").mockReturnValue(0.6);
    const result = await recommendationService.getRandom();
    expect(result).toBeInstanceOf(Object);
    expect(recommendation).toContain(result);
    expect(recommendationRepository.findAll).toBeCalledWith({
      score: 10,
      scoreFilter: "gt",
    });
  });

  it("should get random recommendation (score less than or equal 10)", async () => {
    const recommendation = allRecommendation();

    jest
      .spyOn(recommendationRepository, "findAll")
      .mockResolvedValue(recommendation);

    jest.spyOn(global.Math, "random").mockReturnValue(0.8);
    const result = await recommendationService.getRandom();
    expect(result).toBeInstanceOf(Object);
    expect(recommendation).toContain(result);
    expect(recommendationRepository.findAll).toBeCalledWith({
      score: 10,
      scoreFilter: "lte",
    });
  });

  it("should return not found if there are no recommendations", async () => {
    jest.spyOn(recommendationRepository, "findAll").mockResolvedValue([]);
    expect(async () => {
      await recommendationService.getRandom();
    }).rejects.toEqual({
      message: "",
      type: "not_found",
    });
    expect(recommendationRepository.findAll).toBeCalled();
  });
});
