export class SauceDemoPage {
  private readonly selectors = {
    usernameInput: '[data-test="username"]',
    passwordInput: '[data-test="password"]',
    loginButton: '[data-test="login-button"]',
    productsTitle: ".title",
    sortDropdown: '[data-test="product_sort_container"]',
    inventoryItems: ".inventory_item",
    cartBadge: ".shopping_cart_badge",
    cartButton: ".shopping_cart_link",
    checkoutButton: '[data-test="checkout"]',
    firstNameInput: '[data-test="firstName"]',
    lastNameInput: '[data-test="lastName"]',
    postalCodeInput: '[data-test="postalCode"]',
    continueButton: '[data-test="continue"]',
    finishButton: '[data-test="finish"]',
    successMessage: ".complete-header",
  } as const;

  visit(): void {
    cy.visit("https://www.saucedemo.com/");
  }

  login(username: string, password: string): void {
    cy.get(this.selectors.usernameInput)
      .should("be.visible")
      .clear()
      .type(username);
    cy.get(this.selectors.passwordInput)
      .should("be.visible")
      .clear()
      .type(password);
    cy.get(this.selectors.loginButton).should("be.visible").click();
  }

  validateInventoryPage(): void {
    cy.url().should("include", "/inventory.html");
    cy.get(this.selectors.productsTitle).should("contain.text", "Products");
  }

  validateInventoryCollection(): void {
    cy.get(this.selectors.inventoryItems).should("have.length.at.least", 1);
    cy.get(this.selectors.inventoryItems).each(($item) => {
      cy.wrap($item).find(".inventory_item_name").should("be.visible");
      cy.wrap($item).find("button").should("be.visible");
    });
  }

  sortProductsBy(order: string): void {
    cy.get("select").should("be.visible").first().select(order);
    cy.get("select").should("be.visible").first().should("have.value", order);
  }

  addProductByIndex(index: number): void {
    cy.get(this.selectors.inventoryItems)
      .eq(index)
      .should("be.visible")
      .within(() => {
        cy.contains("button", "Add to cart").click();
      });
  }

  validateCartBadge(expectedCount: string): void {
    cy.get(this.selectors.cartBadge).should("have.text", expectedCount);
  }

  validateProductVisible(productName: string): void {
    cy.contains(".inventory_item_name", productName).should("be.visible");
  }

  openCart(): void {
    cy.get(this.selectors.cartButton).should("be.visible").click();
  }

  checkout(firstName: string, lastName: string, postalCode: string): void {
    cy.get(this.selectors.checkoutButton).should("be.visible").click();
    cy.get(this.selectors.firstNameInput)
      .should("be.visible")
      .clear()
      .type(firstName);
    cy.get(this.selectors.lastNameInput)
      .should("be.visible")
      .clear()
      .type(lastName);
    cy.get(this.selectors.postalCodeInput)
      .should("be.visible")
      .clear()
      .type(postalCode);
    cy.get(this.selectors.continueButton).should("be.visible").click();
    cy.get(this.selectors.finishButton).should("be.visible").click();
  }

  validateSuccessMessage(): void {
    cy.get(this.selectors.successMessage).should(
      "contain.text",
      "Thank you for your order",
    );
  }
}
