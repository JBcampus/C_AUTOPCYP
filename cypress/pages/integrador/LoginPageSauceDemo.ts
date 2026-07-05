import * as allure from "allure-js-commons"

export class LoginPageSauceDemo {
  private readonly url = "/";
  private readonly selectors = {
    usernameInput: "user-name",
    passwordInput: "password",
    loginButton: "login-button",
    errorMessage: ".error-message-container",
  } as const;
  
  visit(): void {
    cy.visit(this.url)
  }

  errorMessage() {
    return cy.get(this.selectors.errorMessage)
  }

  login(username: string, password: string): void {
    allure.logStep("Step desde POM: Iniciando sesión a SauceDemo")
    cy.getById(this.selectors.usernameInput).clear().type(username)
    cy.getById(this.selectors.passwordInput).clear().type(password)
    cy.getById(this.selectors.loginButton).click()
  }
}