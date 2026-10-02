import { LoginPage } from "../pages/integrador/LoginPage";

const loginPage = new LoginPage();

export const createSauceDemoUserSession = (): void => {
  cy.session(
    "saucedemo-standard-user",
    () => {
      loginPage.visit();
      loginPage.login("standard_user", "secret_sauce");
      cy.url().should("include", "/inventory.html");
      cy.get('[data-test="title"]').should("have.text", "Products");
    },
    {
      validate: () => {
        cy.request("https://www.saucedemo.com/").its("status").should("eq", 200);
      },
      cacheAcrossSpecs: true,
    },
  );
};
