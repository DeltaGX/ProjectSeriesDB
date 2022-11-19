module.exports = {
  // 
  // content: [
  //   '.src/**/*.{js,jsx,ts,tsx}', './public/index.html'
  // ],
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors:{
        Pgreen: "#B8DFD8",
        PYellow: "#FFB319",
        Lightblue: "#ADD8E6"
      },
      backgroundImage: {
        'hero-pattern': "url('./Img/Jumanji.png')", 
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
