describe("Collapses correctly", () => {
  it("hides when using keyboard shortcut", () => {
    cy.prepareDb()
    const resp = cy.createTask(0, "First task").then((resp: any) => {
      const taskOneId = resp.body.task.id
      cy.createTask(0, "Second Task")
      cy.createTask(taskOneId, "Child task 1")
      cy.createTask(taskOneId, "Child task 2")
      cy.visit("localhost:3000")
      cy.get(".newTaskInput").type('{esc}')
      cy.get("body").type("kkkk")
      cy.get("body").type("h")
      cy.get(".task-container").eq(1).contains("Second Task")
    });
  })

  it("hides when clicking button", () => {
    cy.prepareDb()
    const resp = cy.createTask(0, "First task").then((resp: any) => {
      const taskOneId = resp.body.task.id
      cy.createTask(0, "Second Task")
      cy.createTask(taskOneId, "Child task 1")
      cy.createTask(taskOneId, "Child task 2")
      cy.visit("localhost:3000")

      cy.contains("First task").trigger("mouseover")
      cy.get(".task-container").get("span").eq(0).click()

      cy.get(".task-container").eq(1).contains("Second Task")
    });

  })
})