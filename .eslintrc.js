module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "prettier/@typescript-eslint",
    "prettier",
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    project: "./tsconfig.json",
  },
  env: {
    es6: true,
    node: true,
  },
  rules: {
    "@typescript-eslint/interface-name-prefix": ["error", "always"],
    "@typescript-eslint/no-use-before-define": [
      "error",
      { functions: false, variables: false },
    ],
  },
}
