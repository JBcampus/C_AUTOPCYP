import { CartPage } from "../../pages/tarea2/CartPage";
import { CheckoutPage } from "../../pages/tarea2/CheckoutPage";
import { InventoryPage } from "../../pages/tarea2/InventoryPage";
import { LoginPage } from "../../pages/tarea2/LoginPage";

interface ProductData {
  orden: string;
  indice_producto: number;
  producto_esperado: string;
  cantidad_esperada: string | number;
}

describe("Test 1 - Tarea 2 - compra de producto", () => {
  const loginPage = new LoginPage();
  const inventoryPage = new InventoryPage();
  const cartPage = new CartPage();
  const checkoutPage = new CheckoutPage();
  let productData: ProductData;

  beforeEach(() => {
    cy.fixture<ProductData>("tarea2/productos-data").then((data) => {
      productData = data;
    });
    loginPage.visit();
  });

  afterEach(() => {
    cy.screenshot("compra-finalizada");
  });

  it("ordena, agrega el producto y finaliza la compra", () => {
    loginPage.login("standard_user", "secret_sauce");
    inventoryPage.assertLoaded();
    inventoryPage.sort(productData.orden);
    inventoryPage.addProductByIndex(productData.indice_producto);
    inventoryPage.assertCartQuantity(productData.cantidad_esperada);
    inventoryPage.assertProductExists(productData.producto_esperado);

    inventoryPage.openCart();
    cartPage.checkout();
    checkoutPage.fillInformation("NombreTest", "Barrera", "110111");
    checkoutPage.continue();
    checkoutPage.finish();
    checkoutPage.assertPurchaseSuccessful();
  });
});
