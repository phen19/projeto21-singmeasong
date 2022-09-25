beforeEach(async () => {
    await cy.request('POST', 'http://localhost:5000/e2e/reset', {});
});

describe(`Test redirect links`, () => {
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

})