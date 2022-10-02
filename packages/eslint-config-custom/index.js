module.exports = {
  extends: ["next", "turbo", "prettier", "next/core-web-vitals", "eslint:recommended"],
  globals: {
    React: "readonly",
    JSX: "readonly",
  },
  rules: {
    "@next/next/no-html-link-for-pages": "off",
    "react/jsx-key": "off",
    "no-unused-vars": "off",
    "import/no-anonymous-default-export": "off",
    "no-async-promise-executor": "off",
  },
}
