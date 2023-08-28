const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      config.env.REACT_APP_BASEURL = process.env.REACT_APP_BASEURL // 環境変数をCypressに渡す
      return config
    },
  },
})
