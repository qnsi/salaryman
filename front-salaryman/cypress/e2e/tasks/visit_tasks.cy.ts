
describe('Visits tasks', () => {
  it('Displays empty TaskView with form', () => {
    cy.visit("localhost:3000")
    cy.contains("Add")
  })
})