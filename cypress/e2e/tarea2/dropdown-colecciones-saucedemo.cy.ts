import { LoginPageSauceDemo } from "../../pages/tarea2/LoginPageSauceDemo"
import * as allure from "allure-js-commons"

const loginPage = new LoginPageSauceDemo()

describe("Dropdown - selectores avanzados y colecciones", () => {
  
  beforeEach(() => {
    loginPage.visit()
    // Login silencioso (sin assertions)
    loginPage.login("standard_user", "secret_sauce")
  })

  it("debería ordenar productos, agregar al carrito y validar - Data Driven", function() {
    cy.fixture("tarea2/productos-orden").then((testData) => {
      allure.logStep(`Ejecutando caso: ${testData.caso}`)
      
      // Esperar a que cargue la página de inventario
      cy.url().should("include", "/inventory.html")
      cy.contains("span", "Products").should("be.visible")

      // 1. Ordenar el filtro según el "orden" indicado
      allure.logStep(`Step 1: Ordenando productos por orden: ${testData.orden}`)
      cy.get(".product_sort_container").should("be.visible").select(testData.orden)

      // 2. Agregar al carrito según los índices definidos en "indice_producto"
      allure.logStep(`Step 2: Agregando producto en índice ${testData.indice_producto} al carrito`)
      cy.get(".inventory_item").should("have.length.at.least", 3)
      cy.get(".inventory_item").eq(testData.indice_producto).find("button").click()

      // 3. Validar que exista el elemento que coincida con "producto_esperado"
      allure.logStep(`Step 3: Validando que existe el producto: ${testData.producto_esperado}`)
      cy.get(".inventory_item").each(($item, index) => {
        cy.log(`Validando producto ${index}`)
        cy.wrap($item).should("exist")
        if (index === testData.indice_producto) {
          cy.wrap($item).should("contain.text", testData.producto_esperado)
        }
      })

      // 4. Validar numero de productos en carrito de acuerdo al parámetro "cantidad_esperada"
      allure.logStep(`Step 4: Validando cantidad de productos en carrito: ${testData.cantidad_esperada}`)
      cy.get(".shopping_cart_badge").should("contain.text", testData.cantidad_esperada)

      // 5. Hacer click en el carrito para ir al carrito
      allure.logStep("Step 5: Accediendo al carrito de compras")
      cy.get(".shopping_cart_link").click()
      cy.url().should("include", "/cart.html")

      // 6. Hacer click en Checkout
      allure.logStep("Step 6: Iniciando proceso de checkout")
      cy.contains(".inventory_item_name", "Sauce Labs Bolt T-Shirt").should("be.visible")
      cy.contains(".inventory_item_desc", "Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.").should("be.visible")
      cy.get("#checkout").click()
      cy.url().should("include", "/checkout-step-one.html")

      // 7. Llenar formulario con información ficticia
      allure.logStep("Step 7: Rellenando información del cliente")
      cy.contains(".title", "Checkout: Your Information").should("be.visible")
      cy.getById("first-name").clear().type("Pedri")
      cy.getById("last-name").clear().type("Guimaraes")
      cy.getById("postal-code").clear().type("15329")

      // 8. Hacer click en Continue
      allure.logStep("Step 8: Continuando a resumen de compra")
      cy.get("#continue").click()
      cy.url().should("include", "/checkout-step-two.html")

      // 9. Validar que está en la página de resumen
      allure.logStep("Step 9: Validando resumen de compra")
      cy.contains(".title", "Checkout: Overview").should("be.visible")
      cy.contains("Payment Information").should("be.visible")
      cy.contains("Shipping Information").should("be.visible")
      cy.contains("Price Total").should("be.visible")
      cy.contains(testData.producto_esperado).should("be.visible")

      // 10. Hacer click en Finish para finalizar la compra
      allure.logStep("Step 10: Finalizando compra")
      cy.get("#finish").click()
      cy.url().should("include", "/checkout-complete.html")

      // 11. Validar compra exitosa
      allure.logStep("Step 11: Validando compra exitosa")
      cy.contains(".title", "Checkout: Complete!").should("be.visible")
      cy.contains("Thank you for your order").should("be.visible")
      cy.get(".complete-header").should("contain.text", "Thank you for your order!")
      cy.get(".complete-text").should("contain.text", "Your order has been dispatched, and will arrive just as fast as the pony can get there!")

      // 12. Capturar screenshot al finalizar
      allure.logStep("Step 12: Capturando screenshot de compra exitosa")
      cy.screenshot("compra-exitosa")

      allure.logStep("Test completado exitosamente")
    })
  })
})