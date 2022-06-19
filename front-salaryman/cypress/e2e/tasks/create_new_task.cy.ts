describe("Creates a new task", () => {
  it("Displays the new task", () => {
    cy.prepareDb()
    cy.visit("localhost:3000")

    // add the task
    const taskName = "Clean the dishes"
    cy.get(".newTaskInput").type(taskName).should("have.value", taskName)
    cy.contains("Add").click()

    cy.get(".newTaskInput").should("have.value", "")
    cy.contains(taskName)

    cy.get(".task-container").should("have.length", 1)

  })
})