/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin")
const { fontFamily } = require("tailwindcss/defaultTheme")

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "../../packages/ui/icons/**/*.{ts,tsx}",
    "../../packages/ui/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Manrope var", ...fontFamily.sans],
        mono: ["JetBrains Mono", ...fontFamily.mono],
      },

      animation: {
        bottomBorderFade: "bottomBorderFade 4s linear infinite alternate",
      },
      keyframes: {
        bottomBorderFade: {
          "0%": {
            transform: "translate3d(-40%, 0, 0) scaleX(120%)",
            transformOrigin: "left",
          },

          "50%": {
            transform: "translate3d(0%, 0, 0) scaleX(100%)",
          },
          "100%": {
            transform: "translate3d(40%, 0, 0) scaleX(140%)",
            transformOrigin: "right",
          },
        },
      },
    },
  },
  plugins: [
    plugin(({ addVariant }) => {
      addVariant("hocus", ["&:hover", "&:focus"])
    }),
  ],
}
