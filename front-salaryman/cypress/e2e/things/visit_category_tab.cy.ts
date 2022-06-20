describe('Visit things tab', () => {
  it('clicks and sees correct info', () => {
    cy.visit("localhost:3000")
    cy.contains("Things").click()
    cy.url().should('include', '?tab=things')
  })

  it("shows correct tab with things url", () => {
    cy.visit("localhost:3000/?tab=things")
    cy.contains("ThingView")
  })

  it("shows 404 when ?tab=random", () => {
    cy.visit("localhost:3000/?tab=random")
    cy.contains("ThingView").should("not.exist")
    cy.contains("Add").should("not.exist")
    cy.contains("404")
  })
})