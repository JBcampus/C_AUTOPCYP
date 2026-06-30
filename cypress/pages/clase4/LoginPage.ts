import * as allure from "allure-js-commons"
export class LoginPage {
  private readonly url = "/login";
  private readonly selectors = {
    usernameInput: "username",
    passwordInput: "password",
    loginButton: "submit-login",
    errorMessage: ".alert-danger",
  } as const;

  visit(): void {
    cy.visit(this.url);
  }

  errorMessage() {
    return cy.get(this.selectors.errorMessage);
  }

  login(username: string, password: string): void {
    allure.logStep("Step desde POM: Iniciando sesión")
    cy.getById(this.selectors.usernameInput).type(username);
    cy.getById(this.selectors.passwordInput).clear().type(password);
    cy.getById(this.selectors.loginButton).click();
  }
}
