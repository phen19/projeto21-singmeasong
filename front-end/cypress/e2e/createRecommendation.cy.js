import { faker } from "@faker-js/faker"

beforeEach(async () => {
  await cy.request('POST', 'http://localhost:5000/e2e/reset', {});
});

after(async () => {
  await cy.request('POST', 'http://localhost:5000/e2e/reset', {});
});

describe('Test create recommendation', () => {
  it('Test if create a recommendtation', () => {
    const recommendation = {
      name: faker.music.songName(),
      youtubeLink: `https://www.youtube.com/watch?v=${faker.random.alphaNumeric(
        10
      )}`
    }
    cy.visit('http://localhost:3000/');
    cy.get('[data-test-id=name]').type(recommendation.name);
    cy.get('[data-test-id=youtubeLink]').type(recommendation.youtubeLink);
    cy.intercept("POST", "http://localhost:5000/recommendations").as("createRecommendation");
    cy.get('[data-test-id=create]').click();
    cy.wait("@createRecommendation");
    cy.get('[data-test-id=recommendation').should('contain.text',recommendation.name);
  })

  it('should return error with conflict names', () => {
    cy.createRecommendation().then(recommendation => {
      cy.get('[data-test-id=name]').type(recommendation.name);
      cy.get('[data-test-id=youtubeLink]').type(recommendation.youtubeLink);
    })
    cy.intercept("POST", "http://localhost:5000/recommendations").as("createRecommendation");
    cy.get('[data-test-id=create]').click();
    cy.wait("@createRecommendation");
    cy.on("window:alert", (str) => {
      expect(str).to.equal(`Error creating recommendation!`);
    });
  })

  it('should return error with invalid youtubelink', () => {
    cy.visit('http://localhost:3000/');
    const recommendation = {
      name: faker.music.songName(),
      youtubeLink: "wwww.youtube.com"
    }
    cy.get('[data-test-id=name]').type(recommendation.name);
    cy.get('[data-test-id=youtubeLink]').type(recommendation.youtubeLink);
    cy.intercept("POST", "http://localhost:5000/recommendations").as("createRecommendation");
    cy.get('[data-test-id=create]').click();
    cy.wait("@createRecommendation");
    cy.on("window:alert", (str) => {
      expect(str).to.equal(`Error creating recommendation!`);
    });

  })
})
