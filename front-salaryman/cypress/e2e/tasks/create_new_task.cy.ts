describe("Creates a new task", () => {
  it("Displays the new task", () => {
    cy.prepareDb()
    cy.visit("localhost:3000")

    // add the task
    const taskName = "Clean the dishes"
    cy.get(".newTaskInput").type(taskName).should("have.value", taskName)
    cy.contains("Add").click()

    cy.get(".newTaskInput").should("have.value", "")
    cy.contains(taskName)

    cy.get(".task-container").should("have.length", 1)

  })

  it("displays alert when server is down", () => {
    cy.prepareDb()
    cy.visit("localhost:3000")

    cy.intercept({url: '/tasks/new', method: "POST"}, {
      statusCode: 404,
      body: '404 Not Found!',
      headers: {
        'x-not-found': 'true',
      },
    })

    const stub = cy.stub()
    cy.on("window:alert", stub)
    
    const taskName = "Clean the dishes"
    cy.get(".newTaskInput").type(taskName).should("have.value", taskName)
    cy.contains("Add").click().then(() => {
      expect(stub.getCall(0)).to.be.calledWith("We couldn't connect to the server! Try again.\n\nAxiosError: Request failed with status code 404")
    })
  })
})