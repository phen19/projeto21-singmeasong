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
        let score
        cy.get('[data-test-id=score]').eq(0).invoke('text').then((text)=> {
            score =Number(text);})
        cy.get('[data-test-id=upvote]').click()
        cy.get('[data-test-id=score]').eq(0).invoke('text').then((text)=> {
            expect(Number(text)).to.be.equal(score+1)})

    })

    it('should upvote recommendation in top page', ()=> {
        cy.visit('http://localhost:3000/top');
        cy.createRecommendation()
        let score
        cy.get('[data-test-id=score]').eq(0).invoke('text').then((text)=> {
            score =Number(text);})
        cy.get('[data-test-id=upvote]').click()
        cy.get('[data-test-id=score]').eq(0).invoke('text').then((text)=> {
            expect(Number(text)).to.be.equal(score+1)})

    })

    it('should upvote recommendation in random page', ()=> {
        cy.visit('http://localhost:3000/random');
        cy.createRecommendation()
        let score
        cy.get('[data-test-id=score]').eq(0).invoke('text').then((text)=> {
            score =Number(text);})
        cy.get('[data-test-id=upvote]').click()
        cy.wait(2000)
        cy.get('[data-test-id=score]').eq(0).invoke('text').then((text)=> {
            expect(Number(text)).to.be.equal(score+1)})

    })
})