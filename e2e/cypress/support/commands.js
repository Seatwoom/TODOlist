/// <reference types="cypress" />;

Cypress.Commands.add("login", (username, password) => {
  cy.request({
    method: "POST",
    url: `${Cypress.env("apiUrl")}/login`,
    body: {
      username,
      password,
    },
  }).then((response) => {
    window.localStorage.setItem("token", response.body.token);
  });
});

Cypress.Commands.add("register", (username, password) => {
  cy.request({
    method: "POST",
    url: `${Cypress.env("apiUrl")}/register`,
    body: {
      username,
      password,
    },
    failOnStatusCode: false,
  });
});

Cypress.Commands.add("cleanDatabase", () => {
  cy.request("POST", `${Cypress.env("apiUrl")}/test/cleanup`);
});

Cypress.Commands.add("createTask", (text) => {
  cy.get('[data-testid="new-task-input"]').type(`${text}{enter}`);
});

Cypress.Commands.add("toggleTask", (index) => {
  cy.get(`[data-testid="task-${index}"] [data-testid="task-checkbox"]`).click();
});
Cypress.Commands.add("cleanupDatabase", () => {
  cy.request({
    method: "POST",
    url: `${Cypress.env("apiUrl")}/test/cleanup`,
    failOnStatusCode: false,
  });
});
Cypress.Commands.add("createTask", (taskText) => {
  cy.intercept("POST", "/tasks").as("createTaskRequest");

  cy.get('[data-testid="new-task-input"]')
    .should("be.visible")
    .clear()
    .type(taskText);

  cy.get('[data-testid="add-task-button"]').should("be.visible").click();

  cy.wait("@createTaskRequest").its("response.statusCode").should("eq", 200);

  cy.contains('[data-testid="task-text-0"]', taskText).should("be.visible");
});
Cypress.Commands.add("clickSvgButton", (testId) => {
  cy.get(`[data-testid="${testId}"]`)
    .should("be.visible")
    .parent()
    .click({ force: true });
});

Cypress.Commands.add("waitForTaskOperation", (alias) => {
  cy.wait(alias).then((interception) => {
    expect(interception.response.statusCode).to.eq(200);
  });
});
Cypress.Commands.add("waitForTaskSave", () => {
  cy.wait("@saveTasks");
});

Cypress.Commands.add("clickTaskIcon", (testId) => {
  cy.get(`[data-testid="${testId}"]`)
    .should("exist")
    .parent()
    .click({ force: true });
});
