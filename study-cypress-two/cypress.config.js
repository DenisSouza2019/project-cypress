const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "xoijyt",
  env: {
    token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMTY0M2NkNi03MTEyLTQxNWItOTVkMi0wNzkwNGIwZDFhMWMiLCJhZG9wdGVyTmFtZSI6IkFuYSBkZSBKZXN1cyIsImlhdCI6MTcyMTU5MTUxMiwiZXhwIjoxNzIxODUwNzEyfQ.OTN9SzFaFuZ_ao_T9NSswSSv7CioQqWqBi50fhI9QAk'
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    reporter:'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/reports',
      reportFilename: 'results-test-reports',
      quiet: true,
      overwrite: false,
      html: true,
      json: true,
      timestamp: 'dd-mm-yyyy',
    },

  },
});
