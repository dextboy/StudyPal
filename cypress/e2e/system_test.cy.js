describe("StudyPal End-to-End Test", () => {
  beforeEach(() => {
    Cypress.on("uncaught:exception", (err, runnable) => {
      return false;
    });
    cy.visit("/"); // Assuming the application is hosted at the root URL "/"
    cy.contains("Login").click();
    cy.url().should("include", "/login");

    // Type a new valid email and password and click "Register"
    const email = `testuser_${Math.random()}@example.com`;
    cy.get('input[type="email"]').type("test@test.com");
    cy.get('input[type="password"]').type("test");
    cy.get('button[type="submit"]').click();
  });

  afterEach(() => {
    Cypress.on("uncaught:exception", (err, runnable) => {
      return false;
    });
  });

  it("Should login to StudyPal", () => {
    // Verify that the user is redirected to the dashboard after verification
    cy.url().should("include", "/");
  });

  it("Should navigate to Calendar", () => {
    cy.contains("Calendar").click();
    // You can add more assertions specific to the Analytics page
  });

  it("should navigate to Pomodoro Timer", () => {
    cy.contains("Pomodoro Timer").click();
    // You can add more assertions specific to the Pomodoro Timer page
  });

  it("Should navigate to Analytics", () => {
    cy.contains("Analytics").click();
    // You can add more assertions specific to the Analytics page
  });

  it("Should navigate to About page", () => {
    cy.contains("About").click();
    // You can add more assertions specific to the Analytics page
    cy.url().should("include", "/about");
  });

  it("Should logout of StudyPal", () => {
    cy.contains("LogOut").click();
    cy.url().should("include", "/login");
  });
});
