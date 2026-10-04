import * as allure from "allure-js-commons";
import integradorCasesJson from "../../fixtures/integrador/dataproductos.json";
import { createSauceDemoUserSession } from "../../helpers/saucedemo-session.helper";
import { CartPage } from "../../pages/integrador/CartPage";
import { CheckoutPage } from "../../pages/integrador/CheckoutPage";
import { InventoryPage } from "../../pages/integrador/InventoryPage";

interface IntegradorCase {
  name: string;
  sort: string;
  pick: number[];
  expectedBadge: string;
}

const integradorCases = integradorCasesJson as IntegradorCase[];
const inventoryPage = new InventoryPage();
const cartPage = new CartPage();
const checkoutPage = new CheckoutPage();

describe("Integrador - compra en SauceDemo", () => {
  beforeEach(() => {
    createSauceDemoUserSession();
    cy.visit("https://www.saucedemo.com/inventory.html", {
      failOnStatusCode: false,
    });
  });

  afterEach(function () {
    const testName = this.currentTest?.title ?? "test";
    const screenshotName = testName
      .replace(/[<>:"/\\|?*\x00-\x1f]/g, "-")
      .replace(/\s+/g, "-");

    cy.screenshot(`integrador/${screenshotName}`);
  });

  it("Test 1 - inicia sesión y valida inventario vacío", () => {
    allure.feature("Integrador");
    allure.story("Login tradicional con sesión");
    allure.parameter("username", "standard_user");
    allure.parameter("password", "masked", { mode: "masked" });

    allure.logStep("Validar URL y título de inventario");
    inventoryPage.assertLoaded();

    allure.logStep("Validar que no hay productos en el carrito");
    inventoryPage.assertCartEmpty();
  });

  integradorCases.forEach((testCase) => {
    it(`Test 2 - ${testCase.name}`, () => {
      allure.feature("Integrador");
      allure.story("Ordenar productos y completar compra");
      allure.parameter("sort", testCase.sort);
      allure.parameter("pick", JSON.stringify(testCase.pick));
      allure.parameter("expectedBadge", testCase.expectedBadge);

      allure.logStep("Validar inventario");
      inventoryPage.assertLoaded();

      allure.logStep(`Ordenar productos: ${testCase.sort}`);
      inventoryPage.sort(testCase.sort);

      allure.logStep(`Agregar productos seleccionados: ${testCase.pick.join(", ")}`);
      testCase.pick.forEach((index) => inventoryPage.addProductByIndex(index));
      inventoryPage.assertCartQuantity(testCase.expectedBadge);

      allure.logStep("Abrir carrito e iniciar checkout");
      inventoryPage.openCart();
      cartPage.checkout();

      allure.logStep("Completar información ficticia");
      checkoutPage.fillInformation("Adelina", "Prueba", "110111");
      checkoutPage.continue();
      checkoutPage.finish();

      allure.logStep("Validar compra exitosa");
      checkoutPage.assertPurchaseSuccessful();
    });
  });
});
