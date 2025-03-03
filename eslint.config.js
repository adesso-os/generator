import eslint from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: [".yarn/", ".git/", "coverage/", "node_modules/", "output/", "*.config.*"],
  },
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: "error",
    },
  },
  {
    files: ["**/*.cjs"],
    extends: [eslint.configs.recommended],
    languageOptions: {
      parserOptions: {
        sourceType: "commonjs",
      },
    },
  },
  {
    files: ["**/*.js", "**/*.mjs"],
    extends: [eslint.configs.recommended],
    languageOptions: {
      parserOptions: {
        sourceType: "module",
      },
    },
  },
  {
    files: ["**/*.cts", "**/*.mts", "**/*.ts"],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.strictTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
    ],
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      "@typescript-eslint/array-type": ["error", { default: "generic" }],
      "@typescript-eslint/no-explicit-any": [
        "error",
        {
          ignoreRestArgs: true,
        },
      ],
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": ["error", { args: "none" }],
      "@typescript-eslint/no-var-requires": "off",
    },
  },
  {
    rules: {
      "consistent-return": "error",
      "no-else-return": "error",
      "no-unused-expressions": "warn",
      "no-use-before-define": "error",
      eqeqeq: "error",
      strict: ["error", "global"],
    },
  },
);
