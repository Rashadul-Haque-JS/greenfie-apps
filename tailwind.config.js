const { join } = require('path');
module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
   
  ],
  theme: {
    screen:{
      
    },
    extend: {
      
    },
  },
  plugins: [],
};