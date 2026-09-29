export class InventoryPage {
  private readonly title = '[data-test="title"]';
  private readonly sortDropdown = '[data-test="product-sort-container"]';
  private readonly productCards = '[data-test="inventory-item"]';
  private readonly cartBadge = '[data-test="shopping-cart-badge"]';
  private readonly cartLink = '[data-test="shopping-cart-link"]';

  assertLoaded() {
    cy.url().should("include", "/inventory.html");
    cy.get(this.title).should("have.text", "Products");
  }

  sort(order: string) {
    const sortValues: Record<string, string> = {
      az: "az",
      za: "za",
      lohi: "lohi",
      hilo: "hilo",
    };

    expect(sortValues[order], `orden de productos: ${order}`).to.exist;
    cy.get(this.sortDropdown).select(sortValues[order]);
  }

  addProductByIndex(index: number) {
    cy.get(this.productCards)
      .eq(index)
      .find('button[data-test^="add-to-cart"]')
      .click();
  }

  assertCartQuantity(quantity: string | number) {
    cy.get(this.cartBadge).should("have.text", String(quantity));
  }

  assertProductExists(productName: string) {
    cy.get(this.productCards).should("contain.text", productName);
  }

  openCart() {
    cy.get(this.cartLink).click();
  }
}
