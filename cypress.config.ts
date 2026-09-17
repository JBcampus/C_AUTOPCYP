import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: 'https://practice.expandtesting.com', 
    viewportWidth: 1280, 
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
