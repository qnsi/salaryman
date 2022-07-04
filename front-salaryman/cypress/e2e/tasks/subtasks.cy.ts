describe("Creates a new task", () => {
  it("works when clicking Subtask button", () => {
    cy.prepareDb()
    cy.createTask(0, "Parent")
    cy.visit("localhost:3000")

    cy.contains("Parent").trigger("mouseover")
    cy.contains("Add Subtask").click()

    cy.get(".newTaskInput").eq(0).type("Child")
    cy.contains("Add").click()

    cy.get(".task-container").eq(1).should("contain", "Child")
  })
})