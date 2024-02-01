const { defineConfig } = require("cypress");
const { env } = require('../blog_integration_tests/env/env')

module.exports = defineConfig({
  env: env,
  e2e: {
    baseUrl: 'http://localhost:3000/',
    // setupNodeEvents(on, config) {
    //   on('before:run', async (details) => {
    //     await beforeRunHook(details)
    //   })

    //   on('after:run', async () => {
    //     await afterRunHook()
    //   })
    //   require('../../cypress/plugins')(on, config)
    //   return config
    // },
  },
  waitForNetworkIdle: 1000,
  watchForFileChanges: false,
  numTestsKeptInMemory: 1,
  chromeWebSecurity: false,
  experimentalMemoryManagement: true,
  // reporter: 'cypress-mochawesome-reporter',
  // reporterOptions: {
  //   charts: true,
  //   reportPageTitle: 'Test Report',
  //   reportFilename: 'Report',
  //   overwrite: false,
  //   embeddedScreenshots: true,
  //   inlineAssets: true,
  //   saveAllAttempts: false,
  //   reportDir: 'cypress/reports'
  // },
  responseTimeout: 100000,
  defaultCommandTimeout: 15000,
  trashAssetsBeforeRuns: true,
  viewportHeight: 800,
  viewportWidth: 1200,
  screenshotOnRunFailure: true,
  video: false,
  retries: {
    runMode: 2
  }
});
