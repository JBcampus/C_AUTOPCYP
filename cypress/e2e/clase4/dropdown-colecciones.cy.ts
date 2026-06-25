describe("Dropdown- selectores avanzados y colecciones", () => {

  beforeEach(() => {
    cy.visit("/dropdown");
  });

  it("debería seleccionar una opción por texto visible", () => {
    cy.get("#dropdown").should("be.visible");
    cy.get("#dropdown").select("Option 1");
    cy.get("#dropdown").should("have.value", "1");
  });

  it("debería validar opciones usando colecciones", () => {

    cy.get("#dropdown option").should("have.length.at.least", 3);  //Retorna una colección de listas porque cumplen las condiciones
    
    cy.get("#dropdown option").eq(1).should("have.value", "1").and("contain.text", "Option 1");
    
    cy.get("#dropdown option").each(($option, index) => {

      cy.log(`Validando opción ${index}`);

      cy.wrap($option).should("exist");
      cy.wrap($option).should("not.be.empty");

    });

  });

});
