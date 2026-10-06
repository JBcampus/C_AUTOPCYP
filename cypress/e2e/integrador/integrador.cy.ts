import * as allure from "allure-js-commons";
import { Login_Page } from "../../pages/SauceDemo/integrador/Login_Page";
import { Inventory_Page } from "../../pages/SauceDemo/integrador/Inventory_Page";
import { CheckOut_Page } from "../../pages/SauceDemo/integrador/CheckOut_Page";
import { Product_Interface } from "../../fixtures/integrador/product_Interface";
import { createPracticeUserSession } from "../../helpers/integrador/auth-session.helper";
import productsCasesJson from "../../fixtures/integrador/products_cases.json";

const login_Page = new Login_Page();
const inventory_Page = new Inventory_Page();
const checkout_Page = new CheckOut_Page();
const productsCases = productsCasesJson as Product_Interface[];

describe("SauceDemo Automatizacion", () => {
  before(() => {
    cy.log("#Inicio de suite: SauceDemo Automatizacion");
  });

  beforeEach(() => {
    allure.feature("Flujo de Compra");
    allure.story("Compra Productos SauceDemo");
    cy.log("##Inicio de Caso de Prueba. Guardar Sesion en Cookies");
    allure.step("✅ Paso 1: Crear Sesión", () => {
      createPracticeUserSession();     //Crear la sesion.
    });
    allure.step(`✅Paso 2: Abrir página "inventory_Page.html" `, () => {  
      cy.visit("/inventory.html", { failOnStatusCode: false }); //El servidor web retorna Cod.Rpta 400 por lo descativamos el "failOnStatusCode" para que no genere error
    });  
    cy.fixture("integrador/data_user.json").as("data_user");
  });

  afterEach(() => {
    cy.log("##Fin de Caso de prueba.");
  });

  after(() => {
    allure.step("✅ Paso Final: Capturar screenshot", () => {
      cy.screenshot("Tarea Integrador_Evidencia");
    });  
    cy.log("#Fin de suite: SauceDemo Automatizacion");
  });

  it("Test 1: Abrir Inventario Productos ", function () {
    allure.parameter("Nombre Caso Prueba", "Validación inicial");
    allure.step("✅Paso 3: Validar URL del inventario y no existan productos seleccionados en el carrito", () => {
      login_Page.abrirPaginaInventarioProductos();
    });  
  });

  productsCases.forEach((testCase) => {
    it("Test 2: Compra Producto Exitosa: "+testCase.name, function () {
      allure.parameter("Nombre Caso Prueba", testCase.name);
      allure.parameter("Ordenamiento", testCase.sort);
      allure.parameter("Productos agregados", testCase.pick.join(", "));
      allure.parameter("Cantidad Esperada", testCase.expectedBadge);
      
      allure.step(`✅Paso 3: Ordenar productos según el "orden" indicado: ${testCase.sort}`, () => {
        inventory_Page.ordenarProducto(testCase.sort);
      });

      for (const product of testCase.pick) {
        allure.step(`✅Paso 4: Seleccionar Producto con "índice": ${product}`, () => {
          inventory_Page.seleccionarProducto(product);
        });
      }
      allure.step(`✅Paso 5: Verificar cantidad "Productos agregados" al Carrito": ${testCase.expectedBadge}`, () => {
        inventory_Page.contarProductosCarrito(testCase.expectedBadge);
      });

      allure.step("✅Paso 6: Abrir carrito de Compras", () => {
        inventory_Page.abrirCarrito();
      });

      allure.step(`✅Paso 7: Seleccionar boton "CheckOut" `, () => {
        checkout_Page.confirmarCheckout();
      });

      allure.step(`✅Paso 8: Completar datos del usuario`, () => {
        checkout_Page.completarDatosUsuario(this.data_user.firstName, this.data_user.lastName, this.data_user.postalCode);
      });

      allure.step("✅Paso 9: Finalizar Compra", () => {
        checkout_Page.finalizarCompra();
      });
    });  
  });
});