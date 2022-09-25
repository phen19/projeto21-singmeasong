import { faker } from "@faker-js/faker"

describe("Test non existing route", () => {
    it("should return error for non existing page", () => {
        const invalid = faker.lorem.word()
        cy.visit(`http://localhost:3000/${invalid}`)
        cy.contains("Not found!").should("be.visible")
    })
})