declare namespace Cypress {
  interface Chainable {
    logToConsole(message: string, optional?: any): void;
    getBySel(
      dataTestAttribute: string,
      args?: any
    ): Chainable<JQuery<HTMLElement>>;
  }
}
