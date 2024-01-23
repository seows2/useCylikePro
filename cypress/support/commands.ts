Cypress.Commands.add("logToConsole", (message: string, optional?: any) => {
  cy.task("log", {
    message: `(${new Date().toISOString()}) ${message}`,
    optional,
  });
});

// cypress/support/commands.ts

Cypress.Commands.add("getBySel", (selector, ...args) => {
  return cy.get(`[data-testid="${selector}"]`, ...args);
});
