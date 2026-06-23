import { defineConfig } from "cypress";

export default defineConfig({
  allowCypressEnv: false,

  screenshotsFolder: "artifacts/screenshots",
  videosFolder: "artifacts/videos",
  downloadsFolder: "artifacts/downloads",
  screenshotOnRunFailure: true,
  video: false,
  trashAssetsBeforeRuns: true,

  e2e: {
    baseUrl: "https://practice.expandtesting.com",
    //baseUrl: "https://www.saucedemo.com",
    viewportWidth: 1280,
    setupNodeEvents(on, config) {
      // implement node event listener here
    },
  },
});
