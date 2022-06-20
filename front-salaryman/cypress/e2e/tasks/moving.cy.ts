describe("Moving tasks works", () => {
  it("Moves task up using keyboard shortcuts", () => {
    cy.prepareDb()
    cy.createTask(0, "First task")
    cy.createTask(0, "Second Task")
    cy.visit("localhost:3000")

    cy.get(".task-container").first().contains("First task")
    cy.get(".task-container").eq(1).contains("Second Task")

    // move using keyboard shortcut
    cy.get(".newTaskInput").type('{esc}')
    cy.get("body").type("k")
    cy.get("body").type("K")

    cy.get(".task-container").eq(1).contains("First task")
    cy.get(".task-container").eq(0).contains("Second Task")

    // move task down
    cy.get("body").type("J")
    cy.get(".task-container").first().contains("First task")
    cy.get(".task-container").eq(1).contains("Second Task")
  })

  it("Doesn't crush when there is nowhere to move", () => {
    cy.prepareDb()
    cy.createTask(0, "First task")
    cy.createTask(0, "Second Task")
    cy.visit("localhost:3000")

    cy.get(".newTaskInput").type('{esc}')
    cy.get("body").type("kk")
    cy.get("body").type("K")

    cy.get(".task-container").first().contains("First task")
    cy.get(".task-container").eq(1).contains("Second Task")
  })

  it("Only moves inside parent scope", () => {
    cy.prepareDb()
    const resp = cy.createTask(0, "First task").then((resp: any) => {
      const taskOneId = resp.body.task.id
      cy.createTask(0, "Second Task")
      cy.createTask(taskOneId, "Child task 1")
      cy.createTask(taskOneId, "Child task 2")
      cy.visit("localhost:3000")
      cy.get(".newTaskInput").type('{esc}')
      cy.get("body").type("kk")
      cy.get("body").type("KK")
      cy.get(".task-container").eq(1).contains("Child task 2")
    });

  })
})