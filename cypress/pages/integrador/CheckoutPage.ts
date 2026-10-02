export class CheckoutPage {
  private readonly firstNameInput = '[data-test="firstName"]';
  private readonly lastNameInput = '[data-test="lastName"]';
  private readonly postalCodeInput = '[data-test="postalCode"]';
  private readonly continueButton = '[data-test="continue"]';
  private readonly finishButton = '[data-test="finish"]';
  private readonly completeHeader = '[data-test="complete-header"]';

  fillInformation(firstName: string, lastName: string, postalCode: string): void {
    cy.get(this.firstNameInput).type(firstName);
    cy.get(this.lastNameInput).type(lastName);
    cy.get(this.postalCodeInput).type(postalCode);
  }

  continue(): void {
    cy.get(this.continueButton).click();
  }

  finish(): void {
    cy.get(this.finishButton).click();
  }

  assertPurchaseSuccessful(): void {
    cy.url().should("include", "/checkout-complete.html");
    cy.get(this.completeHeader)
      .should("be.visible")
      .and("have.text", "Thank you for your order!");
  }
}
