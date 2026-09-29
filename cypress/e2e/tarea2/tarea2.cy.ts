import { Login_Page } from "../../pages/SauceDemo/tarea2/Login_Page";
import { Inventory_Page } from "../../pages/SauceDemo/tarea2/Inventory_Page";
import { CheckOut_Page } from "../../pages/SauceDemo/tarea2/CheckOut_Page";

const login_Page = new Login_Page();
const inventory_Page = new Inventory_Page();
const checkout_Page = new CheckOut_Page();

describe("SauceDemo Automatizacion", () => {
  before(() => {
    cy.log("#Inicio de suite: SauceDemo Automatizacion");
    //cargamos los datos de prueba de productos y usuario
    cy.fixture("tarea2/data_cases.json").as("data_cases");
    cy.fixture("tarea2/data_user.json").as("data_user");
  });
  beforeEach(() => {
    cy.log("##Inicio de Caso de Prueba.");
    //abrir pagina con variable de entorno en "cypress.config.ts": baseUrl_SD: "https://www.saucedemo.com",
    cy.visit(Cypress.expose("baseUrl_SD"));
    cy.url().should("include", "saucedemo.com");
  });
  afterEach(() => {
    cy.log("##Fin de Caso de prueba.");  
  });
  after(() => {
    cy.screenshot("Tarea2_Test01_Compra Producto Exitosa");
    cy.log("#Fin de suite: SauceDemo Automatizacion");
  });

  it("Test 01: Compra Producto Exitosa", function () {
    login_Page.iniciarSesion(this.data_user.usuario,this.data_user.password);
    login_Page.abrirPaginaInventarioProductos();

    inventory_Page.ordenarProducto(this.data_cases.orden);
    inventory_Page.seleccionarProducto(this.data_cases.indice_producto, this.data_cases.cantidad_esperada);    
    inventory_Page.abrirCarrito(this.data_cases.producto_esperado);
    
    checkout_Page.confirmarCheckout();
    checkout_Page.completarDatosUsuario(this.data_user.firstName, this.data_user.lastName, this.data_user.postalCode);
    checkout_Page.finalizarCompra(this.data_cases.producto_esperado);
  });
});
