beforeEach(async () => {
    await cy.request('POST', 'http://localhost:5000/e2e/reset', {});
  });

after(async () => {
    await cy.request('POST', 'http://localhost:5000/e2e/reset', {});
});

describe('Test upvote recommendation', () => {
    it('should upvote recommendation', ()=> {
        cy.visit('http://localhost:3000/');
        cy.createRecommendation()
        cy.intercept("GET", "http://localhost:5000/recommendations").as("refreshRecommendations")
        cy.wait("@refreshRecommendations");
        cy.get('[data-test-id=upvote]').click()
        cy.get('[data-test-id=score]').should('contain.text', 1)
    })

    it('should upvote recommendation in top page', ()=> {
        cy.visit('http://localhost:3000/top');
        cy.createRecommendation()
        cy.get('[data-test-id=upvote]').click()
        cy.get('[data-test-id=score]').should('contain.text', 1)
    })

    it('should upvote recommendation in random page', ()=> {
        cy.visit('http://localhost:3000/random');
        cy.createRecommendation()
        cy.get('[data-test-id=upvote]').click()
        cy.get('[data-test-id=score]').should('contain.text', 1)
    })
})