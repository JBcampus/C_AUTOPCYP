import { LoginPage } from "../../pages/clase4/LoginPage"
const loginPage = new LoginPage()

describe("Login - POM, commands e intercept", () => {
    
  beforeEach(() => {
    loginPage.visit()
  })

  it("debería iniciar sesión con credenciales válidas", () => {
    
    cy.intercept("POST", "**/authenticate").as("loginRequest")

    loginPage.login("practice", "SuperSecretPassword!")

    cy.wait("@loginRequest").its("response.statusCode").should("be.oneOf", [200, 302, 303])
    cy.url().should("include", "/secure")
    cy.contains("h1", "Secure Area").should("be.visible")
  })

  it("debería mostrar error con credenciales inválidas", () => {
    
    loginPage.login("usuario_invalido", "password_invalido")
    loginPage.errorMessage().should("be.visible").and("contain.text", "invalid")

  })
})