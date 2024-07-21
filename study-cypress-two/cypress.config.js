const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "xoijyt",
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    video:true,
    reporter:'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/reports',
      reportFilename: 'results-test-reports',
      quiet: true,
      overwrite: false,
      html: true,
      json: false,
      timestamp: 'dd-mm-yyyy',
    },

  },
});
