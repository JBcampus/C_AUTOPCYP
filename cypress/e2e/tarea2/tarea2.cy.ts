import { LoginPage } from "../../pages/tarea2/LoginPage";
import { ProductPage } from "../../pages/tarea2/ProductPage";
import { ProductFixtureReader } from "./product-fixture.cy";

describe('Tarea 2', () => {

    let loginPage: LoginPage;
    let productPage: ProductPage;

    before(() => {
        loginPage.visit;
        loginPage = new LoginPage;
        productPage = new ProductPage;
    })

    it('debería iniciar sesión con credenciales válidas', () => {
        loginPage.login('standard_user', 'secret_sauce');
    })

    it('debería ordenarse según consideraciones', () => {
        ProductFixtureReader.loadProduct().then((product) => {
            productPage.orderProducts(product.orden);
        });
    });
})