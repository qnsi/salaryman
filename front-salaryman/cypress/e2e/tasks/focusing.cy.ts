describe("Focusing an element works", () => {
  it("Focuses when hovered", () => {
    cy.prepareDb()
    cy.createTask(0, "Test Task") 
    cy.visit('localhost:3000')
    cy.contains("Test Task").as("first_task")

    // task is not focused
    cy.contains("Done").should("not.exist")

    // task is focused on hover
    cy.get("@first_task").trigger("mouseover")
    cy.contains("Done")

    // task is defocused on mouseleave
    cy.get("@first_task").trigger("mouseout")
    cy.contains("Done").should("not.exist")
  })

  it("Focuses on keyboard shortcut", () => {
    cy.prepareDb()
    cy.createTask(0, "Test Task") 
    cy.visit('localhost:3000')
    cy.contains("Done").should("not.exist")
    cy.get(".newTaskInput").type('{esc}')
    cy.get("body").type("k")
    cy.contains("Done")
  })
})