import { Login_Page } from "../../pages/SauceDemo/integrador/Login_Page";
import Data_User_Json from "../../fixtures/integrador/data_user.json";
const loginPage = new Login_Page();

export const createPracticeUserSession = (): void => {
  cy.session(
    ["practice-user", "standard_user"],
    () => {
      loginPage.visit();
      loginPage.iniciarSesion(Data_User_Json.usuario, Data_User_Json.password);
      loginPage.abrirPaginaInventarioProductos();
    },
    {
      validate: () => {
        cy.url().should("include", "/inventory.html");
        cy.get('[data-test="title"]').should("have.text","Products");
      },
      cacheAcrossSpecs: true,
    },
  );
};
