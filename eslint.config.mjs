import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";
import eslintConfigPrettier from "eslint-config-prettier";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [
  {
    ignores: ["**/dist"],
  }, 
  ...compat.extends("eslint:recommended", "plugin:@typescript-eslint/recommended"), 
  eslintConfigPrettier,
  {
    languageOptions: {
        globals: {
            ...globals.node,
        },

        parser: tsParser,
        ecmaVersion: 2024,
        sourceType: "module",

        parserOptions: {
            project: "tsconfig.json",
        },
    },

    rules: {},
  }
];