import { LoginPage } from "../pages/clase4/LoginPage";

const loginPage = new LoginPage();
export const createPracticeUserSession = (): void => {
  cy.session(
    "practice-user",
    () => {
      loginPage.visit();
      loginPage.login("practice", "SuperSecretPassword!");
      cy.url().should("include", "/secure");
      cy.contains("h1", "Secure Area").should("be.visible");
    },
    {
      validate: () => {
        cy.visit("/secure");
        cy.contains("h1", "Secure Area").should("be.visible");
      },
      cacheAcrossSpecs: true,
    },
  );
};
