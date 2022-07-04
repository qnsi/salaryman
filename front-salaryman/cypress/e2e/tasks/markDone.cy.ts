describe("Marks task as done", () => {
  it("hides when task is subtask and displays 'x tasks done'", () => {
    cy.prepareDb()
    const resp = cy.createTask(0, "First task").then((resp: any) => {
      const taskOneId = resp.body.task.id
      cy.createTask(0, "Second Task")
      cy.createTask(taskOneId, "Child task 1")
      cy.createTask(taskOneId, "Child task 2")
      cy.visit("localhost:3000")
      cy.get(".newTaskInput").type('{esc}')
      cy.get("body").type("kkk")

      cy.get('body').trigger('keydown', { key: "d"})
      cy.wait(1200)
      cy.get('body').trigger('keyup', { key: "d" })

      cy.get(".task-container").eq(0).contains("First task (1 subtasks done)")
      cy.get(".task-container").eq(1).contains("Child task 2")
      cy.get(".task-container").eq(2).contains("Second Task")
    });
  })

  it("works when clicking done button", () => {
    cy.prepareDb()
    cy.createTask(0, "First task").then((resp: any) => {
      const taskOneId = resp.body.task.id
      cy.createTask(0, "Second Task")
      cy.createTask(taskOneId, "Child task 1")
      cy.createTask(taskOneId, "Child task 2")
      cy.visit("localhost:3000")
      cy.contains("Child task 1").trigger("mouseover")
      cy.contains("Done").click()

      cy.get(".task-container").eq(0).contains("First task (1 subtasks done)")
      cy.get(".task-container").eq(1).contains("Child task 2")
      cy.get(".task-container").eq(2).contains("Second Task")
    });
  })

  it("works correctly when done task has subtasks", () => {
    cy.prepareDb()
    cy.createTask(0, "First task").then((resp: any) => {
      const taskOneId = resp.body.task.id
      cy.createTask(taskOneId, "Child 1").then((second_resp: any) => {
        const taskTwoId = second_resp.body.task.id
        cy.createTask(taskTwoId, "Child 2")
      })
      cy.visit("localhost:3000")
      cy.contains("Child 1").trigger("mouseover")
      cy.contains("Done").click()

      cy.get(".task-container").eq(0).contains("First task (1 subtasks done)")
      // cy.get(".task-container").eq(1)
      cy.get(".task-container").should("have.length", 1)
    });
  })

  it("hides root task", () => {
    cy.prepareDb()
    cy.createTask(0, "First task")
    cy.createTask(0, "Second task")
    cy.visit("localhost:3000")
    cy.contains("First task").trigger("mouseover")
    cy.contains("Done").click()
    cy.contains("Second task").trigger("mouseover")
    cy.contains("Done").click()
    cy.get(".task-container").should("have.length", 0)
  })

  it("displays alert when server is down", () => {
    cy.prepareDb()
    cy.createTask(0, "First task")
    cy.visit("localhost:3000")

    cy.intercept({url: '/tasks', method: "PUT"}, {
      statusCode: 404,
      body: '404 Not Found!',
      headers: {
        'x-not-found': 'true',
      },
    })

    const stub = cy.stub()
    cy.on("window:alert", stub)

    cy.contains("First task").trigger("mouseover")
    cy.contains("Done").click().then(() => {
      expect(stub.getCall(0)).to.be.calledWith("We couldn't connect to the server! Try again.\n\nAxiosError: Request failed with status code 404")
    })
  })
})