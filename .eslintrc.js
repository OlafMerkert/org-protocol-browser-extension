module.exports = {
  env: {
    browser: true,
    es2020: true,
    webextensions: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jest/recommended",
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: "module",
  },
  settings: { react: { version: "detect" } },
  plugins: ["react"],
  rules: {
    "react/prop-types": "off",
  },
};
