/** @type {import('tailwindcss').Config} */
const tailwindConfig = require("@dmrk/config/tailwind.config")
const colors = require("tailwindcss/colors")

module.exports = module.exports = {
  ...tailwindConfig,
  theme: {
    ...tailwindConfig.theme,
    extend: {
      ...tailwindConfig.theme.extend,
      keyframes: {
        slideDownAndFade: {
          "0%": { opacity: 0, transform: "translateY(-4px) scale(0.9)" },
          "100%": { opacity: 1, transform: "translateY(0) scale(1)" },
        },
      },
      animation: {
        slideDownAndFade: "slideDownAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
      },
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
}
