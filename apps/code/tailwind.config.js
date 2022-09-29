/** @type {import('tailwindcss').Config} */
const tailwindConfig = require("@dmrk/config/tailwind.config");
const colors = require("tailwindcss/colors");

module.exports = module.exports = {
  ...tailwindConfig,
  theme: {
    ...tailwindConfig.theme,
    extend: {
      ...tailwindConfig.theme.extends,
      colors: {
        primary: {
          superlight: colors.emerald[100],
          light: colors.emerald[200],
          DEFAULT: colors.emerald[500],
          dark: colors.emerald[600],
          darker: colors.emerald[800],
          darkest: colors.emerald[900],
        },
      },
    },
  },
};
