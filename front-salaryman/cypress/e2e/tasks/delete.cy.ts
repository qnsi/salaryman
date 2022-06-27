describe("Deletes tasks", () => {
  it("hides when holding r", () => {
    cy.prepareDb()
    const resp = cy.createTask(0, "First task").then((resp: any) => {
      const taskOneId = resp.body.task.id
      cy.createTask(0, "Second Task")
      cy.createTask(taskOneId, "Child task 1")
      cy.createTask(taskOneId, "Child task 2")
      cy.visit("localhost:3000")
      cy.get(".newTaskInput").type('{esc}')
      cy.get("body").type("kkkk")

      cy.get('body').trigger('keydown', { key: "r"})
      cy.wait(3000)
      cy.get('body').trigger('keyup', { key: "r" })

      cy.get(".task-container").eq(0).contains("Second Task")
    });
  })

  it("hides when clicking delete", () => {
    cy.prepareDb()
    const resp = cy.createTask(0, "First task").then((resp: any) => {
      const taskOneId = resp.body.task.id
      cy.createTask(0, "Second Task")
      cy.createTask(taskOneId, "Child task 1")
      cy.createTask(taskOneId, "Child task 2")
      cy.visit("localhost:3000")

      cy.get(".task-container").eq(0).trigger("mouseover")
      cy.contains("Delete").click()
      // cy.get(".task-container").eq(0).contains("Second Task")
      cy.get(".task-container").eq(0).contains("Second Task")
    })
  })
})