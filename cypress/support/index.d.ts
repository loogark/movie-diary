/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Visit a page with `?mock=1` appended.
     */
    visitMock(
      url: string,
      options?: Partial<Cypress.VisitOptions>
    ): Chainable<Cypress.AUTWindow>;
  }
}
