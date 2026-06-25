export class LoginPage {
  private readonly url = "/login";
  private readonly selectors = {
    usernameInput: "username",
    passwordInput: "password",
    loginButton: "submit-login",
    errorMessage: ".alert-danger",
  } as const;
  
  visit(): void {
    cy.visit(this.url)
  }

  errorMessage() {
    return cy.get(this.selectors.errorMessage)
  }

  login(username: string, password: string): void {
    cy.getById(this.selectors.usernameInput).clear().type(username)
    cy.getById(this.selectors.passwordInput).clear().type(password)
    cy.getById(this.selectors.loginButton).click()
  }
}