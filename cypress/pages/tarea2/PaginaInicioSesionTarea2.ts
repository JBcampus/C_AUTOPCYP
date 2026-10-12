export class PaginaInicioSesionTarea2 {
  private readonly campoUsuario = "username";
  private readonly campoContrasena = "password";
  private readonly botonIniciarSesion = "login-button";

  iniciarSesion(usuario: string, contrasena: string): void {
    cy.getByDataTesting(this.campoUsuario)
      .clear()
      .type(usuario)
      .should("have.value", usuario);
    cy.getByDataTesting(this.campoContrasena)
      .clear()
      .type(contrasena)
      .should("have.value", contrasena);
    cy.getByDataTesting(this.botonIniciarSesion).click();
  }

  validarPaginaDeProductos(): void {
    cy.url().should("include", "/inventory.html");
    cy.get('[data-test="title"]').should("have.text", "Products");
  }
}