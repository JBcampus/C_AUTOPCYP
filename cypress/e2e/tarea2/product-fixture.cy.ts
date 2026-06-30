export class ProductFixtureReader{

    static loadProduct(){
        return cy.fixture("tarea2/input-product.json").as("productData");
    }
}