describe("Deletes tasks", () => {
  it("hides when holding r", () => {
    cy.prepareDb()
    const resp = cy.createTask(0, "First task").then((resp: any) => {
      const taskOneId = resp.body.task.id
      cy.createTask(0, "Second Task")
      cy.createTask(taskOneId, "Child task 1")
      cy.createTask(taskOneId, "Child task 2")
      cy.visitApp()
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
      cy.visitApp()

      cy.get(".task-container").eq(0).trigger("mouseover")
      cy.contains("Delete").click()
      // cy.get(".task-container").eq(0).contains("Second Task")
      cy.get(".task-container").eq(0).contains("Second Task")
    })
  })

  it("displays alert when server is down", () => {
    cy.prepareDb()
    cy.createTask(0, "First task")
    cy.visitApp()

    cy.intercept({url: '/tasks/delete', method: "POST"}, {
      statusCode: 404,
      body: '404 Not Found!',
      headers: {
        'x-not-found': 'true',
      },
    })

    const stub = cy.stub()
    cy.on("window:alert", stub)

    cy.contains("First task").trigger("mouseover")
    cy.contains("Delete").click().then(() => {
      expect(stub.getCall(0)).to.be.calledWith("We couldn't connect to the server! Try again.\n\nAxiosError: Request failed with status code 404")
    })
  })
})