describe("Creates new plan block", () => {
  it("works when creating correct plan block", () => {
    cy.prepareDb()
    cy.visitPlanner()

    cy.get(".crush-editor").type("0800,0825,first pomodoro{enter}")
    cy.get(".crush-editor").type("0830,0855,second pomodoro")

    cy.get(".calendar-block").eq(0).should("contain", "first pomodoro")
    cy.get(".calendar-block").eq(1).should("contain", "second pomodoro")
  })

  it("doesn't display plan block when wrong formatting", () => {
    cy.prepareDb()
    cy.visitPlanner()

    cy.get(".crush-editor").type("08000825,first pomodoro{enter}")

    cy.get(".calendar-block").should("have.length", 0)
  })

  it("correctly displays in calendar rows", () => {
    cy.prepareDb()
    cy.visitPlanner()

    cy.get(".crush-editor").type("0800,0825,first pomodoro{enter}")
    cy.get(".crush-editor").type("0805,0820,distracted by twitter")
    cy.get(".calendar-row-2").within(() => {
      cy.get(".calendar-block").eq(0).should("contain", "distracted by twitter")
    })
  })
})
