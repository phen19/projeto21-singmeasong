// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
import { faker } from '@faker-js/faker';

    Cypress.Commands.add('createRecommendation', () => {
        const recommendation = {
            name: faker.music.songName(),
            youtubeLink: `https://www.youtube.com/watch?v=${faker.random.alphaNumeric(
              10
            )}`
          }

        cy.request('POST', 'http://localhost:5000/recommendations', recommendation).then(data => {
            return cy.wrap(JSON.parse(data.requestBody))
        })
    })
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })