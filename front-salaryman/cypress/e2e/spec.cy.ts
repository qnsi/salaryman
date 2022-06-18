
describe('My first test', () => {
  it('Visits the Kitchen Sink', () => {
    cy.visit("https://example.cypress.io")
    cy.contains("type").click()
    cy.url().should('include', '/commands/actions')

    cy.get('[data-testid="action-email"]')
      .type('fake@email.com')
      .should('have.value', 'fake@email.com')
  })
})