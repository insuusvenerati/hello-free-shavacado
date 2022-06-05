module.exports = {
  settings: {
    next: {
      rootDir: ["apps/*/", "packages/*/"],
    },
  },
  extends: ["next/core-web-vitals"],
  plugins: ["unused-imports"],
  rules: {
    "unused-imports/no-unused-imports": "error",
    "react/jsx-no-bind": 2,
    "react/destructuring-assignment": 2,
    "react/hook-use-state": 1,
    quotes: ["error", "double"],
    "object-curly-newline": 0,
    "react/react-in-jsx-scope": 0,
    "react/function-component-definition": [
      "error",
      {
        namedComponents: "arrow-function",
        unnamedComponents: "arrow-function",
      },
    ],
  },
};