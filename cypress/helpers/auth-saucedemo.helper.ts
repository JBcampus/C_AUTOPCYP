import { LoginPageSauceDemo } from "../pages/integrador/LoginPageSauceDemo"
import * as allure from "allure-js-commons"

const loginPage = new LoginPageSauceDemo()

export const loginToSauceDemo = (): void => {
  allure.logStep("Navegando a SauceDemo")
  loginPage.visit()
  allure.logStep("Realizando login")
  loginPage.login("standard_user", "secret_sauce")
  allure.logStep("Validando login exitoso")
  cy.url().should("include", "/inventory.html")
  cy.contains("span", "Products").should("be.visible")
}