import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      exclude: ["benchmark/*", "src/index.ts"],
    },
  },
});
