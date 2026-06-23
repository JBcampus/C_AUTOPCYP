interface InputsFixture {
  validInput: {
    number: string
    text: string
    password: string
    date: string
  }
  expected: {
    titleContains: string
  }
}

describe("Web Inputs con fixture", () => {
  beforeEach(() => {
    cy.visit("/inputs")
    cy.fixture("clase3/inputs-data.json").as("inputsData")
  })

  it("debería completar los campos usando datos externos", () => {
    cy.get("@inputsData").then((fixture) => {

      const data: InputsFixture = fixture

      expect(data.validInput.text).to.equal("Daniel V. QA")
      expect(data.expected.titleContains).to.include("Web")

      cy.contains("h1", data.expected.titleContains).should("be.visible")

      cy.get('input[type="number"]').type(data.validInput.number)
      cy.get('input[type="text"]').type(data.validInput.text)
      cy.get('input[type="password"]').type(data.validInput.password)
      cy.get('input[type="date"]').type(data.validInput.date)

      cy.get('input[type="number"]').should("have.value", data.validInput.number)
      cy.get('input[type="text"]').should("have.value", data.validInput.text)
      cy.get('input[type="password"]').should("have.value", data.validInput.password)
      cy.get('input[type="date"]').should("have.value", data.validInput.date)
    })
  })
})