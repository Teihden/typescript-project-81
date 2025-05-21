import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import stylistic from "@stylistic/eslint-plugin";

// Группа: Стили массивов
const arrayRules = {
  "@stylistic/array-bracket-spacing": [ "error", "always" ],
};

// Группа: Стили строк
const stringRules = {
  "@stylistic/quotes": [
    "error",
    "double",
    {
      avoidEscape: true,
      allowTemplateLiterals: true,
    },
  ],
};

// Группа: Разделители и пунктуация
const delimiterRules = {
  "@stylistic/member-delimiter-style": [ "error", {
    "multiline": {
      "delimiter": "semi",
      "requireLast": true,
    },
    "singleline": {
      "delimiter": "semi",
      "requireLast": true,
    },
    "multilineDetection": "brackets",
  } ],
  "@stylistic/semi": [ "error", "always" ],
};

// Группа: Типы и функции TypeScript
const typescriptRules = {
  "@typescript-eslint/consistent-indexed-object-style": "off",
  "@typescript-eslint/prefer-function-type": "off",
  "@typescript-eslint/no-unused-vars": "off",
  "@typescript-eslint/no-empty-function": [
    "error",
    { allow: [ "arrowFunctions" ] },
  ],
};

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
      ...arrayRules,
      ...stringRules,
      ...delimiterRules,
      ...typescriptRules,
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
  },
];
