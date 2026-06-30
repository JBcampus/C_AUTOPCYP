import * as allure from "allure-js-commons";
import { LoginPage } from "../../pages/clase4/LoginPage";
import type { LoginCase } from "../../types/login";
import loginCasesJson from "../../fixtures/clase5/login-cases.json";
import { attachScreenshotOnError } from "../../helpers/allure-evidence.helper";

const loginPage = new LoginPage();
const loginCases = loginCasesJson as LoginCase[];

describe("Clase 5- Login data-driven con Allure", () => {
  afterEach(function () {
    if (this.currentTest?.state === "failed") {
      attachScreenshotOnError(this.currentTest.title);
    }
  });
  loginCases.forEach((testCase) => {

    it(testCase.caseName, () => {
      allure.feature("Data-driven");
      allure.story("Login parametrizado");

      allure.parameter("caseName", testCase.caseName);
      allure.parameter("type", testCase.type);
      allure.parameter("username", testCase.username);
      allure.parameter("password", "masked", { mode: "masked" });
      allure.parameter("expectedPath", testCase.expectedPath);

      allure.logStep("Abrir página de login");
      loginPage.visit();

      allure.logStep("Ejecutar login");
      loginPage.login(testCase.username, testCase.password);

      allure.logStep("Validar URL esperada");
      cy.url().should("include", testCase.expectedPath);

      allure.logStep("Validar mensaje esperado");
      if (testCase.type === "negative")   //comentar para generar error
        loginPage
          .errorMessage()
          .should("contain.text", testCase.expectedMessage);
    });
  });
});
