module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        '2xl': {'max': '1535px'},
  
        'xl': {'max': '1280px'},
  
        'lg': {'max': '1000px'},
  
        'md': {'max': '780px'},
  
        'sm': {'max': '640px'},
  
        'xs': {'max': '400px'},
      },
    },
  },
  plugins: [],
}