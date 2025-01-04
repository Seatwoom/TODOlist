/// <reference types="cypress" />

describe('Tasks Management', () => {
  beforeEach(() => {
    cy.cleanupDatabase();
    cy.clearLocalStorage();

    cy.register('testuser', 'testpass123');
    cy.login('testuser', 'testpass123');

    cy.intercept('GET', '**/tasks').as('getTasks');
    cy.intercept('POST', '**/tasks').as('saveTasks');

    cy.visit('/tasks');
    cy.wait('@getTasks');
  });

  const createAndVerifyTask = (taskText) => {
    cy.get('[data-testid="new-task-input"]')
      .should('be.visible')
      .clear()
      .type(taskText);

    cy.get('[data-testid="add-task-button"]').should('be.visible').click();

    cy.wait('@saveTasks').its('response.statusCode').should('eq', 200);

    cy.contains('[data-testid="task-text-0"]', taskText).should('be.visible');
  };

  it('should create a new task', () => {
    createAndVerifyTask('New Test Task');
  });

  it('should toggle task completion', () => {
    createAndVerifyTask('Toggle Test Task');

    cy.get('[data-testid="task-checkbox-0"]')
      .should('exist')
      .click({ force: true });

    cy.wait('@saveTasks').its('response.statusCode').should('eq', 200);

    cy.get('[data-testid="task-0"]').should('have.class', 'completed');
  });

  it('should edit a task', () => {
    createAndVerifyTask('Edit Test Task');

    cy.get('[data-testid="edit-button-0"]')
      .should('exist')
      .click({ force: true });

    cy.get('[data-testid="task-edit-input-0"]')
      .should('be.visible')
      .clear()
      .type('Edited Task{enter}');

    cy.wait('@saveTasks').its('response.statusCode').should('eq', 200);

    cy.contains('[data-testid="task-text-0"]', 'Edited Task').should(
      'be.visible'
    );
  });

  it('should delete a task', () => {
    createAndVerifyTask('Delete Test Task');

    cy.get('[data-testid="delete-button-0"]')
      .should('exist')
      .click({ force: true });

    cy.wait('@saveTasks').its('response.statusCode').should('eq', 200);

    cy.contains('Delete Test Task').should('not.exist');
  });
});
