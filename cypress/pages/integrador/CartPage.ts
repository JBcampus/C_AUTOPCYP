export class CartPage {
  private readonly checkoutButton = '[data-test="checkout"]';

  checkout(): void {
    cy.get(this.checkoutButton).click();
  }
}
