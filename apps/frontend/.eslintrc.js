module.exports = {
  extends: ["plugin:react-hooks/recommended", "next/core-web-vitals"],
  parser: "@typescript-eslint/parser",
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "plugin:react-hooks/recommended",
        "next/core-web-vitals",
      ],
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: ["./tsconfig.json"],
      },
    },
  ],
  plugins: ["@typescript-eslint"],
  settings: {
    next: {
      rootDir: "apps/frontend",
    },
  },
  rules: {
    "@next/next/no-html-link-for-pages": ["error", "src/pages"],
  },
};
