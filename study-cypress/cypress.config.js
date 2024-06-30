import { defineConfig } from "cypress";

export default defineConfig({
  chromeWebSecurity: false,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl:"https://erickwendel.github.io/vanilla-js-web-app-example/",
    // não vai limpar o estado da tela entre os testes
    // vai manter o estado da tela, até que um teste mude o estado
    //preserveCookies: true,
    // executa os testes em um ambiente isolado
    // sem interferir no teste a teste
    testIsolation: false
  },
});
