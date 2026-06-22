describe("Tarea 1: Login Flow - SauceDemo", () => {
  it("debe loguearse con credenciales válidas y validar la página de inventario", () => {
    // Navegar a SauceDemo
    cy.visit("https://www.saucedemo.com/");

    // Validar que la página de login se cargó
    cy.get('input[data-test="username"]').should("be.visible");
    cy.get('input[data-test="password"]').should("be.visible");

    // Ingresa credenciales válidas
    cy.get('input[data-test="username"]').type("standard_user");
    cy.get('input[data-test="password"]').type("secret_sauce");

    // Hacer click en el botón de login
    cy.get('input[data-test="login-button"]').click();
 
    // Validar que navegó a la página de inventory
    cy.url().should("include", "/inventory.html");

    // Validar que el título secundario "Products" está visible
    cy.get('[class*="title"]').should("contain", "Products");
  });
  
  it("debe mostrar mensaje de error para usuario bloqueado y permanecer en la página de login", () => {
    // Navegar a SauceDemo
    cy.visit("https://www.saucedemo.com/");

    // Validar que la página de login se cargó
    cy.get('input[data-test="username"]').should("be.visible");
    cy.get('input[data-test="password"]').should("be.visible");

    // Ingresa credenciales de usuario bloqueado
    cy.get('input[data-test="username"]').type("locked_out_user");
    cy.get('input[data-test="password"]').type("secret_sauce");

    // Hacer click en el botón de login
    cy.get('input[data-test="login-button"]').click();

    // ASSERT 1: Validar que se mantiene en la URL /login (no redirige)
    cy.url().should("include", "/");

    // ASSERT 2: Validar que el contenedor de error existe
    cy.get('[data-test="error"]').should("exist");

    // ASSERT 3: Validar que el mensaje de error es visible
    cy.get('[data-test="error"]').should("be.visible");

    // ASSERT 4: Validar el mensaje de error exacto
    cy.get('[data-test="error"]').should("contain.text", "Epic sadface: Sorry, this user has been locked out.");
  });
});
