export class InventoryPage {
  private readonly title = '[data-test="title"]';
  private readonly sortDropdown = '[data-test="product-sort-container"]';
  private readonly productCards = '[data-test="inventory-item"]';
  private readonly cartBadge = '[data-test="shopping-cart-badge"]';
  private readonly cartLink = '[data-test="shopping-cart-link"]';

  assertLoaded(): void {
    cy.url().should("include", "/inventory.html");
    cy.get(this.title).should("have.text", "Products");
  }

  assertCartEmpty(): void {
    cy.get(this.cartBadge).should("not.exist");
  }

  sort(order: string): void {
    const sortValues: Record<string, string> = {
      az: "az",
      za: "za",
      lohi: "lohi",
      hilo: "hilo",
    };

    expect(sortValues[order], `orden de productos: ${order}`).to.exist;
    cy.get(this.sortDropdown).select(sortValues[order]);
  }

  addProductByIndex(index: number): void {
    cy.get(this.productCards)
      .eq(index)
      .find('button[data-test^="add-to-cart"]')
      .click();
  }

  assertCartQuantity(quantity: string): void {
    cy.get(this.cartBadge).should("have.text", quantity);
  }

  openCart(): void {
    cy.get(this.cartLink).click();
  }
}
