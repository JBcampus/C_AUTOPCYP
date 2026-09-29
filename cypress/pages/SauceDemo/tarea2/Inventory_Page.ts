export class Inventory_Page {
    
    //ordenarProducto
    private readonly select_ordenamiento = '[data-test="product-sort-container"]';

    //seleccionarProducto
    private readonly btn_add_cart = '.btn.btn_primary.btn_small.btn_inventory';
    private readonly btn_carrito_cantidad = '[data-test="shopping-cart-badge"]';

    //abrirCarrito
    private readonly btn_carrito = '[data-test="shopping-cart-link"]';
    private readonly item_producto = '[data-test="inventory-item-name"]';
    
    ordenarProducto(orden: string): void {
        cy.get(this.select_ordenamiento).select(orden).should("have.value", orden);
    }

    seleccionarProducto(indice_producto: number, cantidad_esperada: string): void {
        cy.get(this.btn_add_cart).eq(indice_producto).click();
        cy.get(this.btn_carrito_cantidad).should("contain.text", cantidad_esperada);        
    }

    abrirCarrito(producto_esperado: string): void {
        cy.get(this.btn_carrito).click();
        cy.get(this.item_producto).should("contain.text", producto_esperado);
    }
}   
