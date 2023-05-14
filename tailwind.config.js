const { join } = require("path");

module.exports = {
  content: [
    join(
      __dirname,
      "{src,pages,components}/**/*!(*.stories|*.spec).{ts,tsx,html}"
    ),
  ],
  theme: {
    screens: {
      'xs': {'max': '575.98px'},
      'sm': {'min': '576px', 'max': '767.98px'},
      'md': {'min': '768px', 'max': '991.98px'},
      'lg': {'min': '992px', 'max': '1199.98px'},
      'xl': {'min': '1200px'},
      '2xl': {'min': '1400px'},
      '3xl': {'min': '1600px'},
    },
    extend: {
      fontSize: {
        'sm': '0.875rem', // 14px
        'base': '1rem',   // 16px
        'lg': '1.125rem', // 18px
        'xl': '1.25rem',  // 20px
        '2xl': '1.5rem',  // 24px
        '3xl': '1.875rem', // 30px
        '4xl': '2.25rem', // 36px
        '5xl': '3rem',    // 48px
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