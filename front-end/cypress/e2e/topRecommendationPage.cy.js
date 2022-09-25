beforeEach(async () => {
    await cy.request('POST', 'http://localhost:5000/e2e/reset', {});
});

describe(`Test redirect links`, () => {
    it("should go to home page", () => {
        cy.visit('http://localhost:3000/top')
        cy.contains('Home').click();
        cy.url().should('equal', 'http://localhost:3000/');
    })

    it("should go to top page", () => {
        cy.visit('http://localhost:3000/top')
        cy.contains('Top').click();
        cy.url().should('equal', 'http://localhost:3000/top');
    })

    it("should go to random page", () => {
        cy.visit('http://localhost:3000/top')
        cy.contains('Random').click();
        cy.url().should('equal', 'http://localhost:3000/random');
    })

    it("should go to top page", () => {
        cy.visit('http://localhost:3000/top')
        cy.intercept("GET", "http://localhost:5000/recommendations/top/10").as("getTop10")
        cy.wait('@getTop10')
        cy.contains("No recommendations yet! Create your own :)").should("be.visible")
    })
})