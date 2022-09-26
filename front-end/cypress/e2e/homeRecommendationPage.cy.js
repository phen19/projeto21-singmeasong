beforeEach(async () => {
    await cy.request('POST', 'http://localhost:5000/e2e/reset', {});
});

after(async () => {
    await cy.request('POST', 'http://localhost:5000/e2e/reset', {});
});

describe(`Test redirect links`, () => {
    it("should go to home page", () => {
        cy.visit('http://localhost:3000/')
        cy.contains('Home').click();
        cy.url().should('equal', 'http://localhost:3000/');
    })

    it("should go to top page", () => {
        cy.visit('http://localhost:3000/')
        cy.contains('Top').click();
        cy.url().should('equal', 'http://localhost:3000/top');
    })

    it("should go to random page", () => {
        cy.visit('http://localhost:3000/')
        cy.contains('Random').click();
        cy.url().should('equal', 'http://localhost:3000/random');
    })

    it("should go to top page", () => {
        cy.visit('http://localhost:3000/')
        cy.intercept("GET", "http://localhost:5000/recommendations").as("getRecommendations")
        cy.wait('@getRecommendations')
        cy.contains("No recommendations yet! Create your own :)").should("be.visible")
    })


    it("should get the last 10 recommendations", () => {
        cy.request('POST', 'http://localhost:5000/e2e/populate', {}); // create 15 recommendations in db
        cy.visit('http://localhost:3000/')
        cy.intercept("GET", "http://localhost:5000/recommendations").as("getRecommendations")
        cy.wait('@getRecommendations')
        cy.get('[data-test-id=recommendation]').should("have.length.lessThan", 11)
    })
})