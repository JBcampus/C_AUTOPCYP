import { defineConfig } from "cypress";

export default defineConfig({
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
    },
  },
});
