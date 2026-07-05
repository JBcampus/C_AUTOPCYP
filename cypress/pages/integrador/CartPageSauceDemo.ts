import * as allure from "allure-js-commons"

export class CartPageSauceDemo {
  private readonly selectors = {
    cartLink: ".shopping_cart_link",
    cartBadge: ".shopping_cart_badge",
    checkoutButton: "#checkout",
    continueButton: "#continue",
    finishButton: "#finish",
    firstNameInput: "[data-test='firstName']",
    lastNameInput: "[data-test='lastName']",
    postalCodeInput: "[data-test='postalCode']",
    productSortContainer: ".product_sort_container",  // ← Cambiar a selector correcto
    inventoryItem: ".inventory_item",
    completeHeader: ".complete-header",
  } as const;

  goToCart(): void {
    allure.logStep("Accediendo al carrito de compras")
    cy.get(this.selectors.cartLink).click()
    cy.url().should("include", "/cart.html")
  }

  getCartBadge(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(this.selectors.cartBadge)
  }

  sortProducts(sortOption: string): void {
    allure.logStep(`Ordenando productos por: ${sortOption}`)
    cy.get(this.selectors.productSortContainer).select(sortOption)
  }

  addProductToCart(index: number): void {
    allure.logStep(`Agregando producto en índice ${index} al carrito`)
    cy.get(this.selectors.inventoryItem).eq(index).find("button").click()
  }

  checkout(): void {
    allure.logStep("Iniciando proceso de checkout")
    cy.get(this.selectors.checkoutButton).click()
    cy.url().should("include", "/checkout-step-one.html")
  }

  fillCheckoutInfo(firstName: string, lastName: string, postalCode: string): void {
    allure.logStep("Rellenando información del cliente")
    cy.get(this.selectors.firstNameInput).clear().type(firstName)
    cy.get(this.selectors.lastNameInput).clear().type(lastName)
    cy.get(this.selectors.postalCodeInput).clear().type(postalCode)
  }

  continueCheckout(): void {
    allure.logStep("Continuando a resumen de compra")
    cy.get(this.selectors.continueButton).click()
    cy.url().should("include", "/checkout-step-two.html")
  }

  finishCheckout(): void {
    allure.logStep("Finalizando compra")
    cy.get(this.selectors.finishButton).click()
    cy.url().should("include", "/checkout-complete.html")
  }

  validateSuccessfulOrder(): void {
    allure.logStep("Validando compra exitosa")
    cy.get(this.selectors.completeHeader).should("contain.text", "Thank you for your order!")
  }
}