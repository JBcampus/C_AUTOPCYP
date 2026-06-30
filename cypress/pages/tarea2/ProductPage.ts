export class ProductPage{
    private readonly orderSelect = "product-sort-container";
    private readonly cartSelector: string;

    constructor(){
        this.cartSelector = "shopping-cart-badge"
    }

    orderProducts(order: string){
        cy.getByDataTest(this.orderSelect).select(order);
    }

    addToCart(indexProduct: number, quantity: number){
        //cy.each('.btn_inventory').get(indexProduct).click();
        cy.getByDataTest(this.cartSelector).should('be.visible');
        cy.getByDataTest(this.cartSelector).should('eq', quantity);
        cy.getByDataTest('inventory-item-name').should('eq', '');
        }
    }
