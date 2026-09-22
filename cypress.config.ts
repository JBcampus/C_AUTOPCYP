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
    //baseUrl: "https://www.saucedemo.com",
    /*env: {
      urls: {
        saucedemo: "https://www.saucedemo.com/",
        staging: "https://staging.example.com",
        production: "https://example.com",
      },
    },*/
    viewportWidth: 1280,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
