class InputScenario {

  constructor(
    public readonly numberValue: string,
    public readonly textValue: string,
    public readonly passwordValue: string,
    public readonly dateValue: string,
  ) {}

  getSummary(): string {
    return `${this.textValue} - ${this.numberValue}`;
  }
}

describe("Web Inputs con clase TypeScript", () => {

  beforeEach(() => {
    cy.visit("/inputs");
  });

  it("debería usar una clase para organizar datos del escenario", () => {
    const scenario = new InputScenario(
      "35",
      "Curso Cypress",
      "abc12345",
      "2026-06-18",
    );
    expect(scenario.getSummary()).to.include("Curso Cypress");

    cy.get('input[type="number"]').type(scenario.numberValue);
    cy.get('input[type="text"]').type(scenario.textValue);
    cy.get('input[type="password"]').type(scenario.passwordValue);
    cy.get('input[type="date"]').type(scenario.dateValue);
    cy.get('input[type="number"]').should("have.value", scenario.numberValue);
    cy.get('input[type="text"]').should("have.value", scenario.textValue);
    cy.get('input[type="password"]').should("have.value", scenario.passwordValue);
    cy.get('input[type="date"]').should("have.value", scenario.dateValue);
  });
});
