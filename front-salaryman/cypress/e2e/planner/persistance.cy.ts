describe("Persistance", () => {
  it("saves in db and pushes on reload", () => {
    cy.prepareDb()
    cy.visitPlanner()

    cy.get(".crush-editor").type("0800,0825,first pomodoro{enter}")
    cy.get(".crush-editor").type("0830,0855,second pomodoro")

    cy.visitPlanner()

    cy.get(".calendar-block").eq(0).should("contain", "first pomodoro")
    cy.get(".calendar-block").eq(1).should("contain", "second pomodoro")
  })
})