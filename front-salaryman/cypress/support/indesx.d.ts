declare namespace Cypress {
  interface Chainable<Subject = any> {
      /**
       * Custom command to ... add your description here
       * @example cy.clickOnMyJourneyInCandidateCabinet()
       */
      prepareDb(): Chainable<null>;
      createTask(parentId: number, text: string): Chainable<null>;
      visitApp(): Chainable<null>;
  }
}