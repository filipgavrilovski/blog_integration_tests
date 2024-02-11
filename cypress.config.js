const { defineConfig } = require('cypress');
const { env } = require('./env/env');
const {
  beforeRunHook,
  afterRunHook
} = require('cypress-mochawesome-reporter/lib');
const { commonConfig } = require('./cy.config-common');
module.exports = defineConfig({
  env,
  ...commonConfig,
  e2e: {
    baseUrl: 'https://ancient-escarpment-00115-8b8977df9a1a.herokuapp.com/',
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
