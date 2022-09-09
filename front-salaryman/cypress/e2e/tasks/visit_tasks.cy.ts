
describe('Visits tasks', () => {
  it('Displays empty TaskView with form', () => {
    cy.visitApp()
    cy.contains("Add")
  })

  it("displays alert when server is down", () => {
    cy.prepareDb()

    cy.intercept({url: '/tasks', method: "GET"}, {
      statusCode: 404,
      body: '404 Not Found!',
      headers: {
        'x-not-found': 'true',
      },
    })

    const stub = cy.stub()
    cy.on("window:alert", stub)
    cy.visitApp()
    
    cy.wait(100).then(() => {
      expect(stub.getCall(0)).to.be.calledWith("We couldn't connect to the server! Try again.\n\nAxiosError: Request failed with status code 404")
    })
  })

  it("keeps tasks collapsed after refresh", () => {
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
    cy.visitApp()

    cy.get(".task-container").eq(1).should("contain", "Child")
    cy.get(".task-container").should("have.length", 4)
  })
})