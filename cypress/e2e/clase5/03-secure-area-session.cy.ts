import * as allure from "allure-js-commons";
import { createPracticeUserSession } from "../../helpers/auth-session.helper";
import { attachScreenshotOnError } from "../../helpers/allure-evidence.helper";

describe("Clase 5- Secure Area con cy.session", () => {
  afterEach(function () {
    if (this.currentTest?.state === "failed") {
      attachScreenshotOnError(this.currentTest.title);
    }
  });
  beforeEach(() => {
    createPracticeUserSession();
    cy.visit("/secure");
  });

  it("debería mostrar el área segura con sesión autenticada", () => {
    allure.feature("Sesiones");
    allure.story("Acceso autenticado con cy.session");
    allure.parameter("sessionId", "practice-user");
    allure.owner("JB Taller");
    allure.logStep("Validar que el usuario accede al área segura");
    cy.url().should("include", "/secure");
    cy.contains("h1", "Secure Area").should("be.visible");
  });
  
  it("debería mostrar el botón logout en el área segura", () => {
    allure.feature("Sesiones");
    allure.story("Reutilización de sesión autenticada");
    allure.parameter("sessionId", "practice-user");
    allure.logStep("Validar botón de cierre de sesión");
    cy.contains("a", "Logout").should("be.visible");
  });
});
