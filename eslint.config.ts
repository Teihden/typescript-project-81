import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import stylistic from "@stylistic/eslint-plugin";
// import { Linter } from 'eslint'

export default [
  stylistic.configs.recommended,
  pluginJs.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    files: [
      "**/*.{js,ts}",
    ],
    rules: {
      "@stylistic/array-bracket-spacing": [ 2, "always" ],
      "@stylistic/semi": [ "error", "always" ],
      "@stylistic/quotes": [ "error", "double", { avoidEscape: true, allowTemplateLiterals: true },
      ],
    },
  },
  {
    ignores: [ "dist/" ],
  },
  {
    languageOptions: {
      globals: globals.node,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    // rules: {
    //   '@typescript-eslint/no-unused-vars': 'off',
    // },
  },
]; // satisfies Linter.Config[]
