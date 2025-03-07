import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: [
      "projects/**/*",
      "cypress/support/**",
      ".angular/**",
      "www/**",
      "ios/**",
      "android/**",
      "coverage/**",
      "eslint.config.mjs",
      "src/zone-flags.ts",
    ],
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },

      ecmaVersion: "latest",
      sourceType: "module",
    },
    rules: {
      "no-unused-vars": "error",
      "no-useless-assignment": "error",
      "no-dupe-else-if": "error",
      "no-await-in-loop": "error",
      "no-constructor-return": "error",
      "no-duplicate-imports": "error",
      "no-unreachable-loop": "error",
      "no-irregular-whitespace": ["error", { skipComments: true }],
      "no-unmodified-loop-condition": "error",
      "no-unused-private-class-members": "error",
      "no-use-before-define": "error",
      "accessor-pairs": "error",
      "arrow-body-style": ["error", "as-needed"],
      "block-scoped-var": "error",
      camelcase: "error",
      complexity: ["error", 10],
      curly: ["error", "multi-line"],
      "default-case": "error",
      "default-case-last": "error",
      eqeqeq: ["error", "smart"],
      "id-length": ["error", { min: 2 }],
      "logical-assignment-operators": ["error", "always"],
      "max-classes-per-file": ["error", 1],
      "max-nested-callbacks": ["error", 3],
      "max-params": ["error", 6],
      "no-console": [
        "error",
        {
          allow: ["error", "warn"],
        },
      ],
      "no-alert": "error",
      indent: ["error", 2],
      "no-caller": "error",
      "no-continue": "error",
      "no-else-return": "error",
      "no-empty-function": [
        "error",
        {
          allow: [
            "arrowFunctions",
            "functions",
            "generatorFunctions",
            "methods",
            "generatorMethods",
            "getters",
            "setters",
            "constructors",
            "asyncFunctions",
            "asyncMethods",
          ],
        },
      ],
      "no-eq-null": "error",
      "no-extra-boolean-cast": "error",
      "no-lonely-if": "error",
      "no-extra-semi": "error",
      "no-multi-assign": "error",
      "no-return-assign": "error",
      "no-script-url": "error",
      "no-throw-literal": "error",
      "no-undef-init": "error",
      "no-undefined": "error",
      "no-underscore-dangle": "error",
      "no-unneeded-ternary": "error",
      "no-useless-concat": "error",
      "no-useless-rename": "error",
      "no-useless-return": "error",
      "no-warning-comments": "warn",
      "prefer-destructuring": "warn",
      "prefer-template": "error",
      "require-await": "error",
      "sort-imports": [
        "error",
        {
          ignoreCase: false,
          ignoreDeclarationSort: false,
          ignoreMemberSort: false,
          memberSyntaxSortOrder: ["none", "all", "multiple", "single"],
          allowSeparatedGroups: false,
        },
      ],
      yoda: "error",
      "block-spacing": "error",
      "brace-style": "error",
      "comma-spacing": "error",
      "func-call-spacing": ["error", "never"],
      "function-call-argument-newline": ["error", "never"],
      "no-multiple-empty-lines": ["error", { max: 2, maxEOF: 0 }],
      "no-trailing-spaces": "error",
      "space-before-blocks": "error",
      "switch-colon-spacing": "error",
    },
  },
  ...compat
    .extends("plugin:@angular-eslint/recommended", "plugin:@angular-eslint/template/process-inline-templates")
    .map((config) => ({
      ...config,
      files: ["**/*.ts"],
    })),
  {
    files: ["**/*.ts"],

    languageOptions: {
      ecmaVersion: 5,
      sourceType: "script",
    },

    rules: {
      "@angular-eslint/component-class-suffix": [
        "error",
        {
          suffixes: ["Page", "Component"],
        },
      ],

      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          prefix: "gb",
          style: "kebab-case",
        },
      ],

      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: "gb",
          style: "camelCase",
        },
      ],
    },
  },
  ...compat.extends("plugin:@angular-eslint/template/recommended").map((config) => ({
    ...config,
    files: ["**/*.html"],
  })),
  {
    files: ["**/*.html"],
    rules: { indent: "off", "no-trailing-spaces": "off" },
  },
];
