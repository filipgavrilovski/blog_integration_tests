exports.commonConfig = {
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
    }
  }
  