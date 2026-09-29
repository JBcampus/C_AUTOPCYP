import { defineConfig } from "cypress";
import { allureCypress } from "allure-cypress/reporter";

export default defineConfig({
  //allowCypressEnd: true, //allowCypressEnd dejó de existir oficialmente a partir de Cypress 16.0.0 (septiembre de 2026).
  //configuracion comportamiento de la herramienta
  screenshotsFolder: "artifacts/screenshots",
  videosFolder: "artifacts/videos",
  downloadsFolder: "artifacts/downloads",
  screenshotOnRunFailure: true,
  video: true,
  trashAssetsBeforeRuns: false,

  //configuracion comportamiento de las pruebas
  e2e: {
    baseUrl: "https://practice.expandtesting.com",
    // Valores públicos disponibles mediante Cypress.expose().
    expose: {
      baseUrl_SD: "https://www.saucedemo.com",
      baseUrl_TIH: "https://the-internet.herokuapp.com/",
    },
    viewportWidth: 1280,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      allureCypress(on, config, {
        resultsDir: "artifacts/allure-results", //Ruta de salida de reportes
      });
      return config;
    },
  },
});
