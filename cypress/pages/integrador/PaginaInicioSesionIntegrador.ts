export class PaginaInicioSesionIntegrador {
  private readonly urlInicioSesion = "https://www.saucedemo.com/";

  visitar(): void {
    cy.visit(this.urlInicioSesion);
  }

  iniciarSesion(usuario: string, contrasena: string): void {
    cy.getByDataTesting("username").clear().type(usuario);
    // Evita que la contraseña aparezca en los registros de Cypress.
    cy.getByDataTesting("password").clear().type(contrasena, { log: false });
    cy.getByDataTesting("login-button").click();
  }
}
