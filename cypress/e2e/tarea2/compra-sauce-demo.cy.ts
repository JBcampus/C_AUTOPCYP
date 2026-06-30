import { SauceDemoPage } from "../../pages/tarea2/SauceDemoPage";

const sauceDemoPage = new SauceDemoPage();

describe("Tarea 2 - Flujo de compra en SauceDemo", () => {
  beforeEach(() => {
    cy.fixture("tarea2/compra-data.json").as("compraData");
  });

  it("debería completar el flujo de compra con POM, fixture y hooks", () => {
    cy.get("@compraData").then((fixture: any) => {
      sauceDemoPage.visit();
      sauceDemoPage.login("standard_user", "secret_sauce");
      sauceDemoPage.validateInventoryPage();
      sauceDemoPage.validateInventoryCollection();
      sauceDemoPage.sortProductsBy(fixture.orden);
      sauceDemoPage.addProductByIndex(fixture.indice_producto);
      sauceDemoPage.validateCartBadge(fixture.cantidad_esperada);
      sauceDemoPage.validateProductVisible(fixture.producto_esperado);
      sauceDemoPage.openCart();
      sauceDemoPage.checkout("Carlos", "QA", "110111");
      sauceDemoPage.validateSuccessMessage();

      cy.screenshot("flujo-compra-sauce-demo");
    });
  });
});
