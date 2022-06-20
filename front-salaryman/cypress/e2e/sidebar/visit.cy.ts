describe("Clicking around", () => {
  it("clicking things and again tasks switches content", () => {
    cy.visit("localhost:3000")
    cy.contains("Add")
    cy.contains("Things").click()
    cy.contains("ThingView")
    cy.contains("Tasks").click()
    cy.contains("Add")
  })
})