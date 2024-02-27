const { defineConfig } = require('cypress');
const { env } = require('../env/env');
const {
  beforeRunHook,
  afterRunHook
} = require('cypress-mochawesome-reporter/lib');
module.exports = defineConfig({
  env,
  watchForFileChanges: false,
    numTestsKeptInMemory: 0,
    chromeWebSecurity: false,
    experimentalMemoryManagement: true,
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      charts: true,
      reportPageTitle: 'Test Report',
      reportFilename: 'Report',
      overwrite: false,
      embeddedScreenshots: true,
      inlineAssets: true,
      saveAllAttempts: false,
      reportDir: 'cypress/reports'
    },
    responseTimeout: 100000,
    defaultCommandTimeout: 30000,
    trashAssetsBeforeRuns: true,
    viewportHeight: 800,
    viewportWidth: 1200,
    screenshotOnRunFailure: true,
    video: false,
    retries: {
      runMode: 2
  },
  e2e: {
    baseUrl: 'http://localhost:3000/',
    setupNodeEvents(on, config) {
      on('before:run', async (details) => {
        await beforeRunHook(details)
      })
      on('after:run', async () => {
        await afterRunHook()
      })
      return config
    },
  },
});
