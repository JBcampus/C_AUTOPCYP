it("debería abrir la página de Web Inputs", () => {
  cy.visit("/inputs");
  cy.contains("h1", "Web inputs page for Automation Testing Practice").should(
    "be.visible",
  );
});

it("debería mostrar los botones principales de la página", () => {
  //Navegar
  cy.visit("/inputs");
  //obtener elemento con contains
  cy.contains("button", "Display Inputs").should("be.visible");
  cy.contains("button", "Clear Inputs").should("be.visible");
});

it("debería completar campos básicos de entrada", () => {
  //Navegar
  cy.visit("/inputs");

  //Almacenar variables con alias
  cy.get('input[type="number"]').as("numberInput");
  cy.get('input[type="text"]').as("textInput");
  cy.get('input[type="password"]').as("passwordInput");
  cy.get('input[type="date"]').as("dateInput");

  //Completar inputs de tipo texto
  cy.get("@numberInput").type("25");
  cy.get("@textInput").type("Carlos QA");
  cy.get("@passwordInput").type("secret123");
  cy.get("@dateInput").type("2026-06-17");

  //Validar elementos por su alias
  cy.get("@numberInput").should("have.value", "25");
  cy.get("@textInput").should("have.value", "Carlos QA");
  cy.get("@passwordInput").should("have.value", "secret123");
  cy.get("@dateInput").should("have.value", "2026-06-17");
});

it("debería limpiar los campos usando el botón Clear Inputs", () => {
  cy.addTestContext("Contexto: Taller6")
  cy.addTestContext("Ejecución con error")
  
  cy.visit("/inputs");

  cy.get('input[type="number"]').as("numberInput");
  cy.get('input[type="text"]').as("textInput");
  cy.get('input[type="password"]').as("passwordInput");
  //cy.get('input[type="date"]').as("dateInput");
  const dateInput = cy.get('input[type="date"]')

  cy.get("@numberInput").type("30");
  cy.get("@textInput").type("Curso Cypress");
  cy.get("@passwordInput").type("abc12345");
  dateInput.type("2026-06-17");

  //Acción de click
  cy.contains("button", "Clear Inputs").click();

  cy.get("@numberInput").should("have.value", "");
  cy.get("@textInput").should("have.value", "");
  cy.get("@passwordInput").should("have.value", "");
  dateInput.should("have.value", "123");

});
