export class PaginaFinalizarCompraTarea2 {
  private readonly botonIniciarCheckout = '[data-test="checkout"]';
  private readonly selectorTituloPagina = '[data-test="title"]';
  private readonly campoNombre = '[data-test="firstName"]';
  private readonly campoApellido = '[data-test="lastName"]';
  private readonly campoCodigoPostal = '[data-test="postalCode"]';
  private readonly botonContinuar = '[data-test="continue"]';
  private readonly selectorNombreProducto = '[data-test="inventory-item-name"]';
  private readonly botonFinalizarCompra = '[data-test="finish"]';
  private readonly selectorMensajeCompraCompletada =
    '[data-test="complete-header"]';

  confirmarCheckout(): void {
    cy.get(this.botonIniciarCheckout).click();
    cy.get(this.selectorTituloPagina).should(
      "contain.text",
      "Checkout: Your Information",
    );
  }

  completarDatosCliente(
    nombre: string,
    apellido: string,
    codigoPostal: string,
  ): void {
    cy.get(this.campoNombre).type(nombre);
    cy.get(this.campoApellido).type(apellido);
    cy.get(this.campoCodigoPostal).type(codigoPostal);
  }

  finalizarCompra(productoEsperado: string): void {
    cy.get(this.botonContinuar).click();
    cy.get(this.selectorNombreProducto)
      .should("be.visible")
      .and("contain.text", productoEsperado);
    cy.get(this.botonFinalizarCompra).should("be.visible").click();
    cy.get(this.selectorMensajeCompraCompletada).should(
      "contain.text",
      "Thank you for your order!",
    );
  }
}
