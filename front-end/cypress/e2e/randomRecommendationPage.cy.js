beforeEach(async () => {
    await cy.request('POST', 'http://localhost:5000/e2e/reset', {});
});

after(async () => {
    await cy.request('POST', 'http://localhost:5000/e2e/reset', {});
});

describe(`Test random recommendation page`, () => {
    it("should go to home page", () => {
        cy.visit('http://localhost:3000/random')
        cy.contains('Home').click();
        cy.url().should('equal', 'http://localhost:3000/');
    })

    it("should go to top page", () => {
        cy.visit('http://localhost:3000/random')
        cy.contains('Top').click();
        cy.url().should('equal', 'http://localhost:3000/top');
    })

    it("should go to random page", () => {
        cy.visit('http://localhost:3000/random')
        cy.contains('Random').click();
        cy.url().should('equal', 'http://localhost:3000/random');
    })

    it("should get a random recommendation", () => {
        cy.request('POST', 'http://localhost:5000/e2e/populate', {}); // create 15 recommendations in db
        cy.visit('http://localhost:3000/random')
        cy.intercept("GET", "http://localhost:5000/recommendations/random").as("getRandom")
        cy.wait('@getRandom')
        cy.get('[data-test-id=recommendation]').should("have.length", 1)
    })

})