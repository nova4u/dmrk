/** @type {import('tailwindcss').Config} */
const tailwindConfig = require("@dmrk/config/tailwind.config");
const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  ...tailwindConfig,
  theme: {
    ...tailwindConfig.theme,
    extend: {
      ...tailwindConfig.theme.extend,
      fontFamily: {
        sans: ["Manrope var", ...fontFamily.sans],
        mono: ["JetBrains Mono", ...fontFamily.mono],
      },
    },
  },
};
