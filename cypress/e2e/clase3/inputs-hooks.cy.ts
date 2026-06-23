describe("Web Inputs", () => {
  before(() => {
    cy.log("Inicio de suite: Web Inputs")
  })

  beforeEach(() => {
    cy.visit("/inputs")
  })

  afterEach(() => {
    cy.log("Caso de prueba finalizado")
  })

  after(() => {
    cy.screenshot("clase3-web-inputs-title")
  })

  it("debería mostrar el título principal", () => {
    cy.contains("h1", "Web inputs").should("be.visible")
  })

  it("debería mostrar los botones principales", () => {
    cy.contains("button", "Display Inputs").should("be.visible")
    cy.contains("button", "Clear Inputs").should("be.visible")
  })
})