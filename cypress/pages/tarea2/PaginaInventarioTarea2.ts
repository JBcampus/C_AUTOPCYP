export class PaginaInventarioTarea2 {
  private readonly selectorOrdenProductos =
    '[data-test="product-sort-container"]';
  private readonly botonAgregarAlCarrito =
    ".btn.btn_primary.btn_small.btn_inventory";
  private readonly indicadorCantidadCarrito =
    '[data-test="shopping-cart-badge"]';
  private readonly enlaceCarrito = '[data-test="shopping-cart-link"]';
  private readonly selectorNombreProducto = '[data-test="inventory-item-name"]';

  ordenarProductos(orden: string): void {
    cy.get(this.selectorOrdenProductos)
      .select(orden)
      .should("have.value", orden);
  }

  agregarProducto(indiceProducto: number, cantidadEsperada: string): void {
    // Cypress eq() utiliza índices que comienzan en cero.
    cy.get(this.botonAgregarAlCarrito).eq(indiceProducto).click();
    cy.get(this.indicadorCantidadCarrito).should(
      "contain.text",
      cantidadEsperada,
    );
  }

  abrirCarritoYValidarProducto(productoEsperado: string): void {
    cy.get(this.enlaceCarrito).click();
    cy.get(this.selectorNombreProducto).should(
      "contain.text",
      productoEsperado,
    );
  }
}
