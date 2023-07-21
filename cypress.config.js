import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "o2o1yo",
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "http://localhost:4173/",
  },
});
