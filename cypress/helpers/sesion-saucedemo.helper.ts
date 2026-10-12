import * as allure from "allure-js-commons";
import { PaginaInicioSesionIntegrador } from "../pages/integrador/PaginaInicioSesionIntegrador";

const paginaInicioSesion = new PaginaInicioSesionIntegrador();

export const crearSesionUsuarioSauceDemo = (): void => {
  let configuracionEjecutada = false;
  let validacionEjecutada = false;

  // Cypress restaura esta sesión entre pruebas y valida que siga autenticada.
  cy.session(
    "saucedemo-standard-user",
    () => {
      allure.logStep(
        validacionEjecutada
          ? "3. Regenerar la sesión tras fallar la validación"
          : "1. Crear la sesión por primera vez",
      );
      configuracionEjecutada = true;
      paginaInicioSesion.visitar();
      paginaInicioSesion.iniciarSesion("standard_user", "secret_sauce");
      cy.url().should("include", "/inventory.html");
      cy.get('[data-test="title"]').should("have.text", "Products");
    },
    {
      validate: () => {
        if (!configuracionEjecutada) {
          allure.logStep("1. Restaurar la sesión guardada");
          allure.logStep("2. Validar la sesión restaurada");
        } else if (validacionEjecutada) {
          allure.logStep("4. Validar la sesión regenerada");
        } else {
          allure.logStep("2. Validar la sesión recién creada");
        }
        validacionEjecutada = true;

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
