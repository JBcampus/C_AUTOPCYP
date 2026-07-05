import { LoginPageSauceDemo } from "../pages/integrador/LoginPageSauceDemo"
import * as allure from "allure-js-commons"

const loginPage = new LoginPageSauceDemo()

export const loginToSauceDemo = (): void => {
  // cy.session necesita un ID único (ej. 'sauce-session') y una función callback
  cy.session('sauce-session', () => {
    allure.logStep("Navegando a SauceDemo")
    loginPage.visit()
    
    allure.logStep("Realizando login")
    loginPage.login("standard_user", "secret_sauce")
    
    allure.logStep("Validando login exitoso dentro de la sesión")
    cy.url().should("include", "/inventory.html")
  })

  // FUERA de cy.session, visitas la página de inicio para que cada test empiece ahí
  allure.logStep("Cargando estado de la sesión e ingresando al inventario")
  loginPage.visit() 
}
