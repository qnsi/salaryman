describe('Create category', () => {
  it('Fills form and validates', () => {
    // cy.exec("cd ../back-salaryman && npx prisma migrate reset dev")
    cy.request('GET', 'localhost:3001/dangerous/only_in_dev/clear_database')
    cy.visit("localhost:3000/?tab=things")

    cy.get('#categoryName')
      .type('Books')
      .should('have.value', 'Books')
    cy.contains("Submit").click()
    cy.contains("Books")
  })
})