export interface DatosClienteCheckout {
  nombre: string;
  apellido: string;
  codigoPostal: string;
}

export class PaginaCheckoutIntegrador {
  private readonly selectorCampoNombre = '[data-test="firstName"]';
  private readonly selectorCampoApellido = '[data-test="lastName"]';
  private readonly selectorCampoCodigoPostal = '[data-test="postalCode"]';
  private readonly botonContinuar = '[data-test="continue"]';
  private readonly botonFinalizar = '[data-test="finish"]';
  private readonly selectorMensajeCompraCompletada =
    '[data-test="complete-header"]';

  completarInformacion(datosCliente: DatosClienteCheckout): void {
    cy.get(this.selectorCampoNombre).type(datosCliente.nombre);
    cy.get(this.selectorCampoApellido).type(datosCliente.apellido);
    cy.get(this.selectorCampoCodigoPostal).type(datosCliente.codigoPostal);
  }

  continuarCheckout(): void {
    cy.get(this.botonContinuar).click();
  }

  finalizarCompra(): void {
    cy.get(this.botonFinalizar).click();
  }

  validarCompraExitosa(): void {
    cy.url().should("include", "/checkout-complete.html");
    cy.get(this.selectorMensajeCompraCompletada)
      .should("be.visible")
      .and("have.text", "Thank you for your order!");
  }
}
