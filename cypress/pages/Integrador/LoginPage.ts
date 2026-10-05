export class LoginPage {
  private readonly url = "https://www.saucedemo.com/";

  visit(): void {
    cy.visit(this.url);
  }

  login(username: string, password: string): void {
    cy.getByDataTesting("username").clear().type(username);
    cy.getByDataTesting("password").clear().type(password, { log: false });
    cy.getByDataTesting("login-button").click();
  }
}
