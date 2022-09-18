import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "tvczyw",
  e2e: {
    experimentalStudio: true,
    setupNodeEvents(on, config) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-var-requires
      require("@cypress/code-coverage/task")(on, config);
      return config;
    },
    baseUrl: "http://localhost:3000",
  },
});
