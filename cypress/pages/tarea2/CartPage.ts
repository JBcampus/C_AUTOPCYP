export class CartPage {
  private readonly checkoutButton = '[data-test="checkout"]';

  checkout() {
    cy.get(this.checkoutButton).click();
  }
}
