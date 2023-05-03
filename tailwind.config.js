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
        brownee: "#c70e05",
        main: "#28B335", //used
        background: "#FFFFFF",//used
        txt: "#000000", //used
        lightBG: "#F5F5F5",//used in single product page
        light: "#E6F9E6",
        lightGreen:"#34D399",
        offWhite:"#f7fafc"
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