describe("Inputs - estabilidad básica", () => {

  beforeEach(() => {
    cy.visit("/inputs")
  })

  it.skip("debería completar campos sin usar esperas fijas", () => {

    cy.contains("h1", "Web inputs").should("be.visible")

    cy.get('input[type="number"]').should("be.visible").type("25").should("have.value", "25")
    cy.get('input[type="text"]').should("be.visible").type("Curso Cypress").should("have.value", "Curso Cypress")
    cy.get('input[type="password"]').should("be.visible").type("secret123").should("have.value", "secret123")
  
})

  it("debería limpiar los campos usando Clear Inputs", () => {

    cy.get('input[type="text"]').type("Texto temporal")
    cy.contains("button", "Clear Inputs").click()

    cy.get('input[type="text"]').should("have.value", "")
  })
})