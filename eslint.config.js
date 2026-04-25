import globals from "globals";

export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2022,
        L: "readonly",
        lucide: "readonly",
        state: "readonly"
      }
    },
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "off"
    }
  }
];