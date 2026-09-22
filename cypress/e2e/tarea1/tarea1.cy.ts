it("Test 01: Iniciar Sesion Sauce Demo con usuario válido", () => {
  
  //PASO 1: Navega a la pagina SauceDemo.com
  cy.visit("/");
  cy.url().should("include", "saucedemo.com");

  //PASO 2: Autenticarse con credenciales válidas
  //Almacenar variables con alias
  cy.get('input[type="text"]').as("Campo_Usuario");
  cy.get('input[type="password"]').as("Campo_Password");
  cy.get('input[type="submit"]').as("boton_Login");

  //Completar inputs de tipo texto
  cy.get("@Campo_Usuario").type("standard_user");
  cy.get("@Campo_Password").type("secret_sauce");

  //Validar elementos por su alias
  cy.get("@Campo_Usuario").should("have.value", "standard_user");
  cy.get("@Campo_Password").should("have.value", "secret_sauce");

  //Presionar Login
  cy.get("@boton_Login").click();

  //PASO 3: Validar url ‘/inventory.html’ y título secundario ‘Products’
  cy.url().should("include", "/inventory.html");
  cy.get('[data-test="title"]').should('be.visible');
});

it("Test 02: Iniciar Sesion Sauce Demo con usuario bloqueado", () => {
  
  //PASO 1: Navega a la pagina SauceDemo.com
  cy.visit("/");
  cy.url().should("include", "saucedemo.com");

  //PASO 2: Autenticarse con credenciales válidas
  //Almacenar variables con alias
  cy.get('input[type="text"]').as("Campo_Usuario");
  cy.get('input[type="password"]').as("Campo_Password");
  cy.get('input[type="submit"]').as("boton_Login");

  //Completar inputs de tipo texto
  cy.get("@Campo_Usuario").type("locked_out_user");
  cy.get("@Campo_Password").type("secret_sauce");

  //Validar elementos por su alias
  cy.get("@Campo_Usuario").should("have.value", "locked_out_user");
  cy.get("@Campo_Password").should("have.value", "secret_sauce");

  //Presionar Login
  cy.get("@boton_Login").click();

  //PASO 3: Validar url ‘/inventory.html’ y título secundario ‘Products’
  cy.url().should("include", "saucedemo.com");
  cy.get('[data-test="error"]').should('be.visible').contains("Epic sadface: Sorry, this user has been locked out.");
});