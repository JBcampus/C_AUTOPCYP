it("Test1: Login Exitoso", function () {
  cy.visit("https://www.saucedemo.com/");

  cy.get('[data-test="username"]').click();
  cy.get('[data-test="username"]').type("standard_user");
  cy.get('[data-test="password"]').click();
  cy.get('[data-test="password"]').type("secret_sauce");
  cy.get('[data-test="login-button"]').click();

  cy.url().should("include", "/inventory.html");
  cy.get('[data-test="title"]').should("have.text", "Products");
});

it("Test2: Login Fallido", function () {
  cy.visit("https://www.saucedemo.com/");

  cy.get('[data-test="username"]').click();
  cy.get('[data-test="username"]').type("locked_out_user");
  cy.get('[data-test="password"]').click();
  cy.get('[data-test="password"]').type("secret_sauce");
  cy.get('[data-test="login-button"]').click();

  cy.url().should("eq", "https://www.saucedemo.com/");
  cy.get('[data-test="error"]').should(
    "have.text",
    "Epic sadface: Sorry, this user has been locked out.",
  );
});
