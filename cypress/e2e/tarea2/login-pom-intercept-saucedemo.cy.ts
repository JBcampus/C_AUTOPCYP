import { LoginPageSauceDemo } from "../../pages/tarea2/LoginPageSauceDemo"

const loginPage = new LoginPageSauceDemo()

describe("Login - POM, commands e intercept - Saucedemo", () => {
    
  beforeEach(() => {
    loginPage.visit()
  })

  it("debería iniciar sesión con credenciales válidas", () => {
    
    //cy.intercept("POST", "**/authenticate").as("loginRequest")

    loginPage.login("standard_user", "secret_sauce")

    //cy.wait("@loginRequest").its("response.statusCode").should("be.oneOf", [200, 302, 303])
    cy.url().should("include", "/inventory.html")
    cy.contains("span", "Products").should("be.visible")
  })

  it("debería mostrar error con credenciales inválidas", () => {
    
    loginPage.login("locked_out_user", "secret_sauce")
    loginPage.errorMessage().should("be.visible").and("contain.text", "Epic sadface: Sorry, this user has been locked out.")

  })
})