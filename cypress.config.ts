import { defineConfig } from "cypress";

export default defineConfig({
  viewportWidth: 1680,
  viewportHeight: 1050,
  e2e: {
    baseUrl: "http://localhost:3000",
    supportFile: "cypress/support/index.ts",
    setupNodeEvents(on, _) {
      on("task", {
        log({ message, optional }) {
          if (optional) {
            console.log(message, optional);
          } else {
            console.log(message);
          }

          return null;
        },
      });
    },
  },
});
