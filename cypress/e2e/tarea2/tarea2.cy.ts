import { PaginaInicioSesionTarea2 } from "../../pages/tarea2/PaginaInicioSesionTarea2";
import { PaginaInventarioTarea2 } from "../../pages/tarea2/PaginaInventarioTarea2";
import { PaginaFinalizarCompraTarea2 } from "../../pages/tarea2/PaginaFinalizarCompraTarea2";

const paginaInicioSesion = new PaginaInicioSesionTarea2();
const paginaInventario = new PaginaInventarioTarea2();
const paginaFinalizarCompra = new PaginaFinalizarCompraTarea2();

describe("Tarea 2: compra en SauceDemo", () => {
  before(() => {
    cy.log("Inicio de la suite de compra en SauceDemo.");
    cy.fixture("tarea2/caso_compra.json").as("casoCompra");
    cy.fixture("tarea2/datos_cliente.json").as("datosCliente");
  });
  beforeEach(() => {
    cy.log("Inicio del caso de prueba.");
    cy.visit(Cypress.expose("baseUrl_SD"));
    cy.url().should("include", "saucedemo.com");
  });
  afterEach(() => {
    cy.log("Fin del caso de prueba.");
  });
  after(() => {
    cy.screenshot("Tarea2_Compra_Exitosa");
    cy.log("Fin de la suite de compra en SauceDemo.");
  });

  // La sintaxis function de Mocha permite acceder a los fixtures mediante this.
  it("Completa correctamente la compra de un producto", function () {
    paginaInicioSesion.iniciarSesion(
      this.datosCliente.usuario,
      this.datosCliente.contrasena,
    );
    paginaInicioSesion.validarPaginaDeProductos();

    paginaInventario.ordenarProductos(this.casoCompra.ordenProductos);
    paginaInventario.agregarProducto(
      this.casoCompra.indiceProducto,
      this.casoCompra.cantidadEsperada,
    );
    paginaInventario.abrirCarritoYValidarProducto(
      this.casoCompra.productoEsperado,
    );

    paginaFinalizarCompra.confirmarCheckout();
    paginaFinalizarCompra.completarDatosCliente(
      this.datosCliente.nombre,
      this.datosCliente.apellido,
      this.datosCliente.codigoPostal,
    );
    paginaFinalizarCompra.finalizarCompra(this.casoCompra.productoEsperado);
  });
});
