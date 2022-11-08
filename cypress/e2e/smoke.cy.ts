import { faker } from "@faker-js/faker";

describe("smoke tests", () => {
  afterEach(() => {
    cy.cleanupUser();
  });

  it("should allow you to register and login", () => {
    const loginForm = {
      email: `${faker.internet.userName()}@example.com`,
      password: faker.internet.password(),
    };

    cy.then(() => ({ email: loginForm.email })).as("user");

    cy.visitAndCheck("/login");

    cy.findByRole("link", { name: /sign up/i }).click();

    cy.findByRole("textbox", { name: /email address/i }).type(loginForm.email);
    cy.findByLabelText(/password/i).type(loginForm.password);
    cy.findByRole("button", { name: /create account/i }).click();

    cy.findByAltText("placeholder").click();
    cy.findByRole("menuitem", { name: /favorites/i }).click();
    cy.findByRole("menuitem", { name: /imported/i }).click();
    cy.findByRole("menuitem", { name: /logout/i }).click();
  });

  it("should allow you to favorite and unfavorite a recipe", () => {
    cy.login();

    cy.visitAndCheck("/");

    cy.findByRole("button", { name: /ADD TO FAVORITES/i }).click();
    cy.findByRole("button", { name: /Remove from favorites/i }).click();
  });
});
