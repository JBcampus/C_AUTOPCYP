import { defineConfig } from "cypress";
import { allureCypress } from "allure-cypress/reporter";
import mochawesomeReporter from 'cypress-mochawesome-reporter/plugin'

export default defineConfig({
  allowCypressEnv: true,

  screenshotsFolder: "artifacts/screenshots",
  videosFolder: "artifacts/videos",
  downloadsFolder: "artifacts/downloads",
  screenshotOnRunFailure: true,
  video: false,
  trashAssetsBeforeRuns: true,

  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'artifacts/mochawesome-report',
    charts: true,
    reportPageTitle: 'JB Reporte Cypress E2E',
    embeddedScreenshots: true,
    overwrite:false
  },

  e2e: {
    baseUrl: "https://practice.expandtesting.com",
    viewportWidth: 1280,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      allureCypress(on, config, {
        resultsDir: "artifacts/allure-results",
      });
      mochawesomeReporter(on)
      return config;
    },
  },
});
