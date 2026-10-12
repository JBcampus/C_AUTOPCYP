export class PaginaCarritoIntegrador {
  private readonly botonCheckout = '[data-test="checkout"]';

  iniciarCheckout(): void {
    cy.get(this.botonCheckout).click();
  }
}