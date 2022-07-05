describe("going into specific task mode", () => {
  it.only("opens new window with ?tab=task&id=1 and displays a task", () => {
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
      cy.get("body").type("kkkkf")
      
      cy.url().should('include', `?tab=task&id=${taskOneId}`)
    })
  })
})