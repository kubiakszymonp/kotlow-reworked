import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Wyłącz ostrzeżenia o nieużywanych eslint-disable
      "eslint-comments/no-unused-disable": "off",
      
      // Wyłącz ostrzeżenia o nieużywanych wyrażeniach
      "@typescript-eslint/no-unused-expressions": "off",
    
      "no-console": "warn", // Zmień z error na warn jeśli używasz console.log
    },
  },
];

export default eslintConfig;
