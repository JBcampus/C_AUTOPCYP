export class CheckOut_Page {
    
    //confirmar checkout
    private readonly btn_checkout= '[data-test="checkout"]';
    private readonly msg_title = '[data-test="title"]';

    //completar datos de usuario
    private readonly txt_firstName = '[data-test="firstName"]';
    private readonly txt_lastName = '[data-test="lastName"]';
    private readonly txt_postalCode = '[data-test="postalCode"]';

    //continuar checkout y finalizar compra
    private readonly btn_continue = '[data-test="continue"]';
    private readonly msg_inventory_item_name = '[data-test="inventory-item-name"]';
    private readonly btn_finish = '[data-test="finish"]';
    private readonly msg_complete = '[data-test="complete-header"]';
    
    confirmarCheckout(): void {
        cy.get(this.btn_checkout).click();
        cy.get(this.msg_title).should("contain.text","Checkout: Your Information");
    }

    completarDatosUsuario(firstName: string, lastName: string, postalCode: string): void {
        cy.get(this.txt_firstName).type(firstName);
        cy.get(this.txt_lastName).type(lastName);
        cy.get(this.txt_postalCode).type(postalCode);
    }

    finalizarCompra(producto_esperado: string): void {
        cy.get(this.btn_continue).click();
        cy.get(this.msg_inventory_item_name).should("be.visible").and("contain.text",producto_esperado);
        cy.get(this.btn_finish).should("be.visible").click();
        cy.get(this.msg_complete).should("contain.text","Thank you for your order!");
    }
}   
