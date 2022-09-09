describe("Collapses correctly", () => {
  it("hides when using keyboard shortcut", () => {
    cy.prepareDb()
    cy.createTask(0, "First task").then((resp: any) => {
      const taskOneId = resp.body.task.id
      cy.createTask(0, "Second Task")
      cy.createTask(taskOneId, "Child task 1")
      cy.createTask(taskOneId, "Child task 2")
      cy.visitApp()
      cy.get(".newTaskInput").type('{esc}')
      cy.get("body").type("kkkk")
      cy.get("body").type("h")
      cy.get(".task-container").eq(1).contains("Second Task")
    });
  })

  it("hides when clicking button", () => {
    cy.prepareDb()
    cy.createTask(0, "First task").then((resp: any) => {
      const taskOneId = resp.body.task.id
      cy.createTask(0, "Second Task")
      cy.createTask(taskOneId, "Child task 1")
      cy.createTask(taskOneId, "Child task 2")
      cy.visitApp()

      cy.contains("First task").trigger("mouseover")
      cy.get(".task-container").get("i").eq(0).click()

      cy.get(".task-container").eq(1).contains("Second Task")
    });

  })

  it("hides correctly with deep collapsed tasks", () => {
    cy.prepareDb()
    cy.createTask(0, "Parent").then((resp: any) => {
      const taskOneId = resp.body.task.id
      cy.createTask(taskOneId, "Child").then((respTwo: any) => {
        const taskTwoId = respTwo.body.task.id
        cy.createTask(taskTwoId, "Grandchild")
      })

      cy.visitApp()

      cy.contains("Child").trigger("mouseover")
      cy.get(".task-collapse-button").eq(1).click()

      cy.contains("Parent").trigger("mouseover")
      cy.get(".task-collapse-button").eq(0).click()

      cy.get(".task-container").eq(0).should("contain", "Parent")
      cy.get(".task-container").should("have.length", 1)
    });
  })
  
  it("keeps subtree collapsed if descendant is collapsed", () => {
    cy.prepareDb()
    cy.createTask(0, "Parent").then((resp: any) => {
      const taskOneId = resp.body.task.id
      cy.createTask(taskOneId, "Child").then((respTwo: any) => {
        const taskTwoId = respTwo.body.task.id
        cy.createTask(taskTwoId, "Grandchild")
      })
      cy.createTask(taskOneId, "Child 2")
      cy.createTask(0, "Other task")

      cy.visitApp()

      cy.contains("Child").trigger("mouseover")
      cy.get(".task-collapse-button").eq(1).click()

      cy.contains("Parent").trigger("mouseover")
      cy.get(".task-collapse-button").eq(0).click()
      cy.get(".task-collapse-button").eq(0).click()

      cy.get(".task-container").eq(1).should("contain", "Child")
      cy.get(".task-container").should("have.length", 4)
    });
  })
})