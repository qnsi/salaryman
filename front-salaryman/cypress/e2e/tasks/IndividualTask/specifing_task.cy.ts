describe("going into specific task mode", () => {
  it("opens new window with ?tab=task&id=1 and displays a task", () => {
    cy.prepareDb()
    cy.createTask(0, "Parent").then((resp: any) => {
      const taskOneId = resp.body.task.id
      cy.createTask(taskOneId, "Child").then((resp: any) => {
        cy.createTask(resp.body.task.id, "Ancestor 1")
      })
      cy.createTask(taskOneId, "Child 2")
      cy.createTask(0, "Other task")

      cy.visit("localhost:3000")
      
      cy.get(".newTaskInput").type('{esc}')
      cy.get("body").type("kkkkkf")
      
      cy.url().should('include', `?tab=task&id=${taskOneId}`)
      cy.get(".task-container").eq(0).contains("Parent")
      cy.get(".task-container").eq(1).contains("Child")
    })
  })

  it("works when adding subtask with parentId !=null but not in state", () => {
    cy.prepareDb()
    cy.createTask(0, "Parent").then((resp: any) => {
      cy.createTask(resp.body.task.id, "Child").then((resp: any) => {
        cy.createTask(resp.body.task.id, "Ancestor 1")
      })
    })
    cy.visit("localhost:3000")
    cy.get(".newTaskInput").type('{esc}')
    cy.get("body").type("kkf")
    cy.wait(200)
    cy.get(".newTaskInput").type('{esc}')
    cy.get("body").type("kks")
    cy.get(".newTaskInput").eq(0).type("Ancestor 2")
    cy.get(".tasks-form").contains("Add").click()

    cy.url().should('include', `?tab=task&id=`)
    cy.get(".task-container").eq(2).should("contain", "Ancestor 2")

  })
})