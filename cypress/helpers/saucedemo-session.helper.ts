import * as allure from "allure-js-commons";
import { LoginPage } from "../pages/integrador/LoginPage";

const loginPage = new LoginPage();

export const createSauceDemoUserSession = (): void => {
  let setupHasRun = false;
  let validationHasRun = false;

  cy.session(
    "saucedemo-standard-user",
    () => {
      allure.logStep(
        validationHasRun
          ? "3. Regenerar sesión tras fallar la validación"
          : "1. Crear sesión por primera vez",
      );
      setupHasRun = true;
      loginPage.visit();
      loginPage.login("standard_user", "secret_sauce");
      cy.url().should("include", "/inventory.html");
      cy.get('[data-test="title"]').should("have.text", "Products");
    },
    {
      validate: () => {
        if (!setupHasRun) {
          allure.logStep("1. Restaurar sesión guardada");
          allure.logStep("2. Validar sesión restaurada");
        } else if (validationHasRun) {
          allure.logStep("4. Validar sesión regenerada");
        } else {
          allure.logStep("2. Validar sesión recién creada");
        }
        validationHasRun = true;

        cy.visit("https://www.saucedemo.com/inventory.html", {
          failOnStatusCode: false,
        });
        cy.url().should("include", "/inventory.html");
        cy.get('[data-test="title"]').should("have.text", "Products");
      },
      cacheAcrossSpecs: true,
    },
  );
};
