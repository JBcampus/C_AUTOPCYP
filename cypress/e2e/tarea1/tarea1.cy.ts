it("debería abrir la página SauceDemo", () => {
  cy.visit("/");
  cy.contains("div", "Swag Labs").should("be.visible");
  cy.screenshot("Validar-pagina-SauceDemo");
});

it("debería mostrar el botón principal de Login", () => {
  //Navegar
  cy.visit("/");
  //obtener elemento con get
  cy.get("#user-name").should("be.visible");
  cy.get("#password").should("be.visible");
  cy.get("#login-button").should("be.visible");
  cy.screenshot("Validar-elementos-login");
});

//Test 1 - Navegar a la página https://www.saucedemo.com y autenticarse con credenciales válidas
it("debería completar campos básicos de entrada válidos y loguearse exitosamente", () => {
  //Navegar
  cy.visit("/");

  //Almacenar variables con alias
  cy.get("#user-name").as("usernameInput");
  cy.get("#password").as("passwordInput");

  //Completar inputs de tipo texto
  cy.get("@usernameInput").type("standard_user");
  cy.get("@passwordInput").type("secret_sauce", { log: false });

  //Validar elementos por su alias
  cy.get("@usernameInput").should("have.value", "standard_user");
  cy.get("@passwordInput").should("have.value", "secret_sauce");
  cy.screenshot("Validar-credenciales-login");

  //Acción de click a Login
  cy.get("#login-button").click();

  //Validar que se redirige a la url '/inventory.html' y que se muestra el título "Products"
  cy.url().should("include", "/inventory.html");
  cy.contains("span", "Products").should("be.visible");
  cy.screenshot("Validar-redireccion-inventory");
});

//Test 2 - Navegar a la página https://www.saucedemo.com y autenticarse con credenciales de usuario bloqueado
it("debería mostrar mensaje de error al intentar iniciar sesión con credenciales de usuario bloqueado", () => {
  //Navegar
  cy.visit("/");
  cy.screenshot("Validar-pagina-SauceDemo");

  //Almacenar variables con alias
  cy.get("#user-name").as("usernameInput");
  cy.get("#password").as("passwordInput");

  //Completar inputs de tipo texto
  cy.get("@usernameInput").type("locked_out_user");
  cy.get("@passwordInput").type("secret_sauce");

  //Validar elementos por su alias
  cy.get("@usernameInput").should("have.value", "locked_out_user");
  cy.get("@passwordInput").should("have.value", "secret_sauce", { log: false });
  cy.screenshot("Validar-credenciales-login-bloqueado");

  //Acción de click a Login
  cy.get("#login-button").click();

  //Validar que se muestra el mensaje de error "Epic sadface: Sorry, this user has been locked out."
  cy.get('[data-test="error"]').should(
    "contain.text",
    "Epic sadface: Sorry, this user has been locked out.",
  );
  cy.screenshot("Validar-mensaje-error");

  //Validar que se siga mostrando la pantalla de Login
  cy.url().should("not.include", "/inventory.html");
  cy.get("#login-button").should("be.visible");
  cy.get('[data-test="error"]').should("be.visible");
  cy.contains("div", "Swag Labs").should("be.visible");
  cy.screenshot("Validar-permanencia-login");
});
