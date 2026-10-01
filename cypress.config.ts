import fs from "node:fs";
import path from "node:path";
import { defineConfig } from "cypress";
import { allureCypress } from "allure-cypress/reporter";
import mochawesomeReporter from "cypress-mochawesome-reporter/plugin";

export default defineConfig({
  allowCypressEnv: true,

  screenshotsFolder: "artifacts",
  videosFolder: "artifacts/videos",
  downloadsFolder: "artifacts/downloads",
  screenshotOnRunFailure: true,
  video: false,
  trashAssetsBeforeRuns: false,

  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    reportDir: "artifacts/mochawesome-report",
    charts: true,
    reportPageTitle: "JB Reporte Cypress E2E",
    embeddedScreenshots: true,
    overwrite: true,
  },

  e2e: {
    baseUrl: "https://practice.expandtesting.com",
    viewportWidth: 1280,
    setupNodeEvents(on, config) {
      on("before:run", async () => {
        await fs.promises.rm(
          path.resolve(config.projectRoot, config.videosFolder),
          { recursive: true, force: true },
        );
      });

      allureCypress(on, config, {
        resultsDir: "artifacts/allure-results",
        videoOnFailOnly: false,
      });

      on("after:screenshot", (details) => {
        if (details.specName !== "tarea2.cy.ts") {
          return;
        }

        const targetDirectory = path.resolve(
          config.projectRoot,
          "artifacts",
          "tarea2",
        );
        const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
        const targetPath = path.join(
          targetDirectory,
          `compra-finalizada-${timestamp}.png`,
        );

        fs.mkdirSync(targetDirectory, { recursive: true });
        fs.copyFileSync(details.path, targetPath);
        fs.rmSync(details.path, { force: true });

        const automaticDirectory = path.dirname(details.path);
        if (automaticDirectory !== targetDirectory) {
          fs.rmSync(automaticDirectory, { recursive: true, force: true });
        }

        return { path: targetPath };
      });

      mochawesomeReporter(on);

      return config;
    },
  },
});
