const { join } = require("path");
module.exports = {
  content: [
    join(
      __dirname,
      "{src,pages,components}/**/*!(*.stories|*.spec).{ts,tsx,html}"
    ),
  ],
  theme: {
    screen: {},
    extend: {
      colors: {
        prime: "#00ff00",
        brownee: "#8B5E3C",
        main: "#3EB489",
        background: "#FFFFFF",
        txt: "#333333",
        "light-background": "#F5F5F5",
        light: "#E6F9E6",
      },
      fontFamily: {
        sans: ["Open Sans", "sans-serif"],
        serif: ["Montserrat", "serif"],
        mono: ["Raleway", "monospace"],
      },
    },
  },
  plugins: [],
};
