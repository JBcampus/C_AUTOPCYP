export class LoginPage {
  private readonly url = "https://www.saucedemo.com/";
  private readonly selectors = {
    usernameInput: "username",
    passwordInput: "password",
    loginButton: "login-button",
    errorMessage: "error",
  } as const;

  visit(): void {
    cy.visit(this.url);
  }

  getErrorMessage() {
    return cy.getByDataTest(this.selectors.errorMessage);
  }

  login(username: string, password: string): void {
    cy.getByDataTest(this.selectors.usernameInput).clear().type(username);
    cy.getByDataTest(this.selectors.passwordInput)
      .clear()
      .type(password, { log: false });
    cy.getByDataTest(this.selectors.loginButton).click();
  }
}
