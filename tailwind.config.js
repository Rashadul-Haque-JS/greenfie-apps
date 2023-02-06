const { join } = require("path");

module.exports = {
  content: [
    join(
      __dirname,
      "{src,pages,components}/**/*!(*.stories|*.spec).{ts,tsx,html}"
    ),
  ],
  theme: {
    extend: {
      screens: {
        'xs': {'max': '575.98px'},
        'sm': {'min': '576px', 'max': '767.98px'},
        'md': {'min': '768px', 'max': '991.98px'},
        'lg': {'min': '992px', 'max': '1199.98px'},
        'xl': {'min': '1200px'},
      },
      
      colors: {
        prime: "#00ff00",
        brownee: "#8B5E3C",
        main: "#3EB489",
        background: "#FFFFFF",
        txt: "#333333",
        lightBG: "#F5F5F5",
        light: "#E6F9E6",
      },
      fontFamily: {
        sans: ["Open Sans", "sans-serif"],
        serif: ["Montserrat", "serif"],
        mono: ["Raleway", "monospace"],
      },
    },
  },
  variants: {},
  plugins: [],
}