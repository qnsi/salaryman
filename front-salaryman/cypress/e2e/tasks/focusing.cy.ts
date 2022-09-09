describe("Focusing an element works", () => {
  it("Focuses when hovered", () => {
    cy.prepareDb()
    cy.createTask(0, "Test Task") 
    cy.visitApp()
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
    cy.createTask(0, "Task 1") 
    cy.createTask(0, "Task 2") 
    cy.visitApp()
    cy.contains("Done").should("not.exist")
    cy.get(".newTaskInput").type('{esc}')
    cy.get("body").type("kkkjj")
    cy.contains("Done")
    cy.get(".task-container").eq(1).get(".task").should("have.class", "task-focused")
  })

  it("focuses on first task when clicking j", () => {
    cy.prepareDb()
    cy.createTask(0, "Task 1") 
    cy.createTask(0, "Task 2") 
    cy.visitApp()
    cy.contains("Done").should("not.exist")
    cy.get(".newTaskInput").type('{esc}')
    cy.get("body").type("j")
    cy.get(".task-container").eq(0).get(".task").should("have.class", "task-focused")
  })

  it("focuses correctly with hidden tasks", () => {
    cy.prepareDb()
    cy.createTask(0, "Task 1") 
    cy.createTask(0, "Task 2").then((resp: any) => {
      const taskOneId = resp.body.task.id
      cy.createTask(taskOneId, "Child").then((respTwo: any) => {
        const taskTwoId = respTwo.body.task.id
        cy.createTask(taskTwoId, "Grandchild")
      })
    })
    cy.createTask(0, "Parent").then((resp: any) => {
      const taskOneId = resp.body.task.id
      cy.createTask(taskOneId, "Child").then((respTwo: any) => {
        const taskTwoId = respTwo.body.task.id
        cy.createTask(taskTwoId, "Grandchild")
      })
    })
    cy.visitApp()

    cy.contains("Child").trigger("mouseover")
    cy.get(".task-collapse-button").eq(1).click()
    cy.get(".task-collapse-button").eq(3).click()
    cy.get(".newTaskInput").type('{esc}')
    cy.get("body").type("k")
    cy.get(".task-container").eq(3).get(".task").should("have.class", "task-focused")
    cy.get("body").type("kkkkjjjjkkkk")
    cy.get(".task-container").eq(3).get(".task").should("have.class", "task-focused")
  })
})