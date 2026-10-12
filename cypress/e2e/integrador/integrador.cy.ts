import * as allure from "allure-js-commons";
import datosCliente from "../../fixtures/integrador/datos_cliente.json";
import casosProductosJson from "../../fixtures/integrador/casos_productos.json";
import { crearSesionUsuarioSauceDemo } from "../../helpers/sesion-saucedemo.helper";
import { PaginaCarritoIntegrador } from "../../pages/integrador/PaginaCarritoIntegrador";
import { PaginaCheckoutIntegrador } from "../../pages/integrador/PaginaCheckoutIntegrador";
import { PaginaInventarioIntegrador } from "../../pages/integrador/PaginaInventarioIntegrador";

interface CasoIntegrador {
  nombreCaso: string;
  ordenProductos: string;
  indicesProductos: number[];
  cantidadEsperadaCarrito: string;
}

const casosIntegrador = casosProductosJson as CasoIntegrador[];
const paginaInventario = new PaginaInventarioIntegrador();
const paginaCarrito = new PaginaCarritoIntegrador();
const paginaCheckout = new PaginaCheckoutIntegrador();

describe("Integrador: compra en SauceDemo", () => {
  beforeEach(() => {
    crearSesionUsuarioSauceDemo();
    cy.visit("https://www.saucedemo.com/inventory.html", {
      failOnStatusCode: false,
    });
  });

  afterEach(function () {
    const tituloPrueba = this.currentTest?.title ?? "prueba";
    // El título se normaliza para que sea válido como parte de una ruta.
    const nombreCaptura = tituloPrueba
      .replace(/[<>:"/\\|?*\x00-\x1f]/g, "-")
      .replace(/\s+/g, "-");

    cy.screenshot(`integrador/${nombreCaptura}`);
  });

  it("Inicia sesión y valida que el carrito esté vacío", () => {
    allure.feature("Integrador");
    allure.story("Inicio de sesión con usuario estándar");
    allure.parameter("usuario", "standard_user");
    allure.parameter("contraseña", "enmascarada", { mode: "masked" });

    allure.logStep("Validar la URL y el título del inventario");
    paginaInventario.validarCarga();

    allure.logStep("Validar que el carrito esté vacío");
    paginaInventario.validarCarritoVacio();
  });

  casosIntegrador.forEach((casoPrueba) => {
    it(casoPrueba.nombreCaso, () => {
      allure.feature("Integrador");
      allure.story("Ordenar los productos y completar la compra");
      allure.parameter("ordenProductos", casoPrueba.ordenProductos);
      allure.parameter(
        "indicesProductos",
        JSON.stringify(casoPrueba.indicesProductos),
      );
      allure.parameter(
        "cantidadEsperadaCarrito",
        casoPrueba.cantidadEsperadaCarrito,
      );

      allure.logStep("Validar que el inventario esté cargado");
      paginaInventario.validarCarga();

      allure.logStep(`Ordenar productos: ${casoPrueba.ordenProductos}`);
      paginaInventario.ordenarProductos(casoPrueba.ordenProductos);

      allure.logStep(
        `Agregar productos seleccionados: ${casoPrueba.indicesProductos.join(", ")}`,
      );
      casoPrueba.indicesProductos.forEach((indiceProducto) =>
        paginaInventario.agregarProductoPorIndice(indiceProducto),
      );
      paginaInventario.validarCantidadEnCarrito(
        casoPrueba.cantidadEsperadaCarrito,
      );

      allure.logStep("Abrir el carrito e iniciar el proceso de pago");
      paginaInventario.abrirCarrito();
      paginaCarrito.iniciarCheckout();

      allure.logStep("Completar los datos del cliente");
      paginaCheckout.completarInformacion(datosCliente);
      paginaCheckout.continuarCheckout();
      paginaCheckout.finalizarCompra();

      allure.logStep("Validar que la compra se completó correctamente");
      paginaCheckout.validarCompraExitosa();
    });
  });
});
