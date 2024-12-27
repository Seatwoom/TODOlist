describe("Authentication Flow", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit("/login");
  });

  it("should register a new user", () => {
    cy.request({
      method: "POST",
      url: `${Cypress.env("apiUrl")}/test/cleanup`,
      failOnStatusCode: false,
    });

    cy.intercept("POST", "/register").as("registerRequest");

    cy.visit("/register");
    cy.get('[data-testid="username-input"]').type("testuser");
    cy.get('[data-testid="password-input"]').type("testpass123");
    cy.get('[data-testid="register-button"]').click();

    cy.wait("@registerRequest").then((interception) => {
      expect(interception.response.statusCode).to.be.oneOf([200, 201]);
    });

    cy.url().should("include", "/login");
  });

  it("should handle duplicate registration", () => {
    cy.intercept("POST", "/register").as("registerRequest");

    cy.visit("/register");
    cy.get('[data-testid="username-input"]').type("testuser");
    cy.get('[data-testid="password-input"]').type("testpass123");
    cy.get('[data-testid="register-button"]').click();

    cy.wait("@registerRequest");
  });

  it("should login successfully", () => {
    cy.intercept("POST", "/login").as("loginRequest");

    cy.get('[data-testid="username-input"]').type("testuser");
    cy.get('[data-testid="password-input"]').type("testpass123");
    cy.get('[data-testid="login-button"]').click();

    cy.wait("@loginRequest").then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
      expect(interception.response.body).to.have.property("token");
    });

    cy.window().then((win) => {
      expect(win.localStorage.getItem("token")).to.exist;
    });
    cy.url().should("include", "/tasks");
  });

  it("should handle invalid login", () => {
    cy.intercept("POST", "/login").as("loginRequest");

    cy.get('[data-testid="username-input"]').type("wronguser");
    cy.get('[data-testid="password-input"]').type("wrongpass");
    cy.get('[data-testid="login-button"]').click();

    cy.wait("@loginRequest");
    cy.get('[data-testid="error-message"]').should("be.visible");
  });

  it("should handle logout", () => {
    cy.request({
      method: "POST",
      url: `${Cypress.env("apiUrl")}/login`,
      body: {
        username: "testuser",
        password: "testpass123",
      },
    }).then((response) => {
      window.localStorage.setItem("token", response.body.token);
    });

    cy.visit("/tasks");
    cy.get('[data-testid="logout-button"]').click();
    cy.url().should("include", "/login");
  });
});
