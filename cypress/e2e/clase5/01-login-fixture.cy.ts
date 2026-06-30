import * as allure from "allure-js-commons"
import { LoginPage } from "../../pages/clase4/LoginPage"
import type { LoginCase } from "../../types/login"
import { attachScreenshotOnError } from "../../helpers/allure-evidence.helper"

const loginPage = new LoginPage()

describe("Clase 5 - Login con cy.fixture", () => {
  afterEach(function () {
    if (this.currentTest?.state === "failed") {
      attachScreenshotOnError(this.currentTest.title)
    }
  })

  it("debería usar cy.fixture para leer datos de login", () => {
    allure.feature("Fixtures")
    allure.story("Lectura de datos con cy.fixture")
    cy.fixture<LoginCase[]>("clase5/login-cases.json").then((loginCases) => {
      const testCase = loginCases[0]
      allure.parameter("caseName", testCase.caseName)
      allure.parameter("username", testCase.username)
      allure.parameter("password", "masked", { mode: "masked" })
      allure.logStep("Abrir página de login")

      loginPage.visit()

      allure.logStep("Step desde test: Ejecutar login con datos del fixture")
      loginPage.login(testCase.username, testCase.password)
      allure.logStep("Validar resultado esperado")
      cy.url().should("include", testCase.expectedPath)

      if (testCase.type === "negative")
        loginPage
          .errorMessage()
          .should("contain.text", testCase.expectedMessage)
    })
  })
})
