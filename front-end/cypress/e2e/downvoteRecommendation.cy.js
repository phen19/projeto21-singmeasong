beforeEach(async () => {
    await cy.request('POST', 'http://localhost:5000/e2e/reset', {});
  });

after(async () => {
    await cy.request('POST', 'http://localhost:5000/e2e/reset', {});
});

describe('Test downvote recommendation', () => {

    it('should downvote recommendation', ()=> {
        cy.visit('http://localhost:3000/');
        cy.createRecommendation()
        cy.intercept("GET", "http://localhost:5000/recommendations").as("refreshRecommendations")
        cy.wait("@refreshRecommendations");
        cy.get('[data-test-id=downvote]').click()
        cy.get('[data-test-id=score]').should('contain.text', -1)
    })

    it('should downvote recommendation in top page', ()=> {
        cy.visit('http://localhost:3000/top');
        cy.createRecommendation()
        cy.get('[data-test-id=downvote]').click()
        cy.get('[data-test-id=score]').should('contain.text', -1)
    })

    it('should downvote recommendation in random page', ()=> {
        cy.visit('http://localhost:3000/random');
        cy.createRecommendation()
        cy.get('[data-test-id=downvote]').click()
        cy.get('[data-test-id=score]').should('contain.text', -1)
    })

    it('should remove recommendation if downvote put score bellow -5', () => {
        cy.visit('http://localhost:3000/');
        cy.createRecommendation()
        for(let i=0; i<6; i++){
            cy.get('[data-test-id=downvote]').click()
        }
        cy.get('[data-test-id=score]').should("not.exist")
    })
})