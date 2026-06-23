import { defineConfig } from "cypress";
export default defineConfig({
  allowCypressEnv: false,
  screenshotsFolder: "artifacts/screenshots",
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
    },
  },
});