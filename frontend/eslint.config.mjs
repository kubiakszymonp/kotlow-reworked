import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores(["src/api/generated/**", ".next/**", "node_modules/**"]),
  {
    rules: {
      "no-console": "warn",
    },
  },
]);

export default eslintConfig;
