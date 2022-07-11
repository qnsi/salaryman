describe("Disabling shortcuts works", () => {
  it.only("fills with letters kK, but doesn't move tasks", () => {
    cy.prepareDb()
    cy.createTask(0, "First task")
    cy.createTask(0, "Second Task")
    cy.visit("localhost:3000")

    // move using keyboard shortcut
    cy.get(".crush-editor").focus()
    cy.get(".crush-editor").type("k")
    cy.get(".crush-editor").type("K")

    cy.get(".task-container").eq(0).contains("First task")
    cy.get(".task-container").eq(1).contains("Second Task")
  })
});