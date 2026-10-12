export class PaginaInventarioIntegrador {
  private readonly selectorTituloPagina = '[data-test="title"]';
  private readonly selectorOrdenProductos =
    '[data-test="product-sort-container"]';
  private readonly selectorTarjetasProducto = '[data-test="inventory-item"]';
  private readonly selectorIndicadorCarrito =
    '[data-test="shopping-cart-badge"]';
  private readonly enlaceCarrito = '[data-test="shopping-cart-link"]';

  validarCarga(): void {
    cy.url().should("include", "/inventory.html");
    cy.get(this.selectorTituloPagina).should("have.text", "Products");
  }

  validarCarritoVacio(): void {
    cy.get(this.selectorIndicadorCarrito).should("not.exist");
  }

  ordenarProductos(criterioOrden: string): void {
    // Estos valores deben coincidir con las opciones del selector de SauceDemo.
    const valoresOrdenamiento: Record<string, string> = {
      az: "az",
      za: "za",
      lohi: "lohi",
      hilo: "hilo",
    };

    expect(
      valoresOrdenamiento[criterioOrden],
      `criterio de orden: ${criterioOrden}`,
    ).to.exist;
    cy.get(this.selectorOrdenProductos).select(
      valoresOrdenamiento[criterioOrden],
    );
  }

  agregarProductoPorIndice(indiceProducto: number): void {
    cy.get(this.selectorTarjetasProducto)
      .eq(indiceProducto)
      .find('button[data-test^="add-to-cart"]')
      .click();
  }

  validarCantidadEnCarrito(cantidadEsperada: string): void {
    cy.get(this.selectorIndicadorCarrito).should("have.text", cantidadEsperada);
  }

  abrirCarrito(): void {
    cy.get(this.enlaceCarrito).click();
  }
}
