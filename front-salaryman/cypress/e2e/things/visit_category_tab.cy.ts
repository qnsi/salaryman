describe('Visit things tab', () => {
  it('clicks and sees correct info', () => {
    cy.visit("localhost:3000")
    cy.contains("Things").click()
    cy.url().should('include', '?tab=things')
  })
})