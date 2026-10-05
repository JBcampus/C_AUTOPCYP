export class LoginPage {
  private readonly url = "https://www.saucedemo.com/";

  visit(): void {
    cy.visit(this.url);
  }

  login(username: string, password: string): void {
    cy.getByDataTest("username").clear().type(username);
    cy.getByDataTest("password").clear().type(password, { log: false });
    cy.getByDataTest("login-button").click();
  }
}
