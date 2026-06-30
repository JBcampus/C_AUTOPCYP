import { defineConfig } from "cypress";
import { allureCypress } from "allure-cypress/reporter";

export default defineConfig({
  allowCypressEnv: true,
  screenshotsFolder: "artifacts/tarea2",
  videosFolder: "artifacts/videos",
  downloadsFolder: "artifacts/downloads",
  screenshotOnRunFailure: true,
  video: false,
  trashAssetsBeforeRuns: false,
  e2e: {
    baseUrl: "https://practice.expandtesting.com",
    viewportWidth: 1280,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      allureCypress(on, config, {
        resultsDir: "artifacts/allure-results",
      });
      return config;
    },
  },
});
