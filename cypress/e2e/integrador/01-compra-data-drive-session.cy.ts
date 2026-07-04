import * as allure from "allure-js-commons"
import { LoginPageSauceDemo } from "../../pages/integrador/LoginPageSauceDemo"
import { CartPageSauceDemo } from "../../pages/integrador/CartPageSauceDemo"
import { loginToSauceDemo } from "../../helpers/auth-saucedemo.helper"
import { attachScreenshotOnError } from "../../helpers/allure-evidence.helper"
import type { CompraCase } from "../../types/compra"
import compraDataJson from '../../fixtures/tarea2/compra-data-driven.json'

const loginPage = new LoginPageSauceDemo()
const cartPage = new CartPageSauceDemo()
const compraData = compraDataJson as CompraCase[]

describe("Integrador - Flujo de compra data-driven con sesión", () => {
  
  afterEach(function () {
    if (this.currentTest?.state === "failed") {
      attachScreenshotOnError(this.currentTest.title)
    }
  })

  beforeEach(() => {
    allure.feature("Flujo de Compra")
    allure.story("Compra en SauceDemo")
    loginToSauceDemo()
  })

  it("Test 1 - Validar inventario sin productos seleccionados", () => {
    allure.parameter("testCase", "Validación inicial")
    
    allure.logStep("Validar URL del inventario")
    cy.url().should("include", "/inventory.html")
    
    allure.logStep("Validar que no existen productos en carrito")
    cy.get(".shopping_cart_badge").should("not.exist")
    
    allure.logStep("Validar título de productos")
    cy.contains("span", "Products").should("be.visible")
  })

  compraData.forEach((testCase) => {
    it(`Test 2 - ${testCase.name}`, () => {
      allure.parameter("caseName", testCase.name)
      allure.parameter("sort", testCase.sort)
      allure.parameter("productsToAdd", testCase.pick.join(", "))
      allure.parameter("expectedBadge", testCase.expectedBadge)

      // Step 1: Ordenar productos
      allure.logStep(`Step 1: Ordenar productos según el "orden" indicado: ${testCase.sort}`)
      cartPage.sortProducts(testCase.sort)

      // Step 2: Agregar productos al carrito
      allure.logStep(`Step 2: Agregar al carrito según los índices definidos en "pick"`)
      testCase.pick.forEach((index) => {
        cartPage.addProductToCart(index)
      })

      // Step 3: Validar cantidad en carrito
      allure.logStep(`Step 3: Validar numero de productos en carrito de acuerdo al parámetro "expectedBadge": ${testCase.expectedBadge}`)
      cartPage.getCartBadge().should("contain.text", testCase.expectedBadge)

      // Step 4: Ir al carrito
      allure.logStep("Step 4: Accediendo al carrito de compras")
      cartPage.goToCart()

      // Step 5: Iniciar checkout
      allure.logStep("Step 5: Iniciando proceso de checkout")
      cartPage.checkout()

      // Step 6: Llenar información
      allure.logStep("Step 6: Llenar formulario con información ficticia")
      cartPage.fillCheckoutInfo("Juan", "Pérez", "28001")

      // Step 7: Continuar checkout
      allure.logStep("Step 7: Continuar el flujo de checkout")
      cartPage.continueCheckout()

      // Step 8: Validar resumen
      allure.logStep("Step 8: Validar resumen de compra")
      cy.contains("Payment Information").should("be.visible")
      cy.contains("Shipping Information").should("be.visible")

      // Step 9: Finalizar compra
      allure.logStep("Step 9: Finalizar flujo de compra")
      cartPage.finishCheckout()

      // Step 10: Validar compra exitosa
      allure.logStep("Step 10: Validar compra exitosa")
      cartPage.validateSuccessfulOrder()

      // Step 11: Capturar screenshot
      allure.logStep("Step 11: Al finalizar test capturar screenshot")
      cy.screenshot(`compra-exitosa-${testCase.sort}`)
    })
  })
})