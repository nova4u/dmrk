/** @type {import('tailwindcss').Config} */
const tailwindConfig = require("@dmrk/config/tailwind.config");
const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  ...tailwindConfig,
  theme: {
    ...tailwindConfig.theme,
    extend: {
      ...tailwindConfig.theme.extend,
      colors: {
        primary: {
          superlight: "#F0FEFF",
          light: "#CFFAFE",
          DEFAULT: "#16BDE6",
          dark: "#0891B2",
          darker: "#07394C",
          darkest: "#021B24",
        },
      },
      fontFamily: {
        sans: ["Manrope var", ...fontFamily.sans],
        mono: ["Fira Code", ...fontFamily.mono],
      },
    },
  },
};
