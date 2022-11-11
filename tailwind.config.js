/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./scr/**/*.{js,jsx}",
    // "./components/**/*.{js,ts,jsx,tsx}",
    // "./scenes/**/*.{js,ts,jsx,tsx}",
    // "./modules/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#BC0063',
        black_light:'#A4A6B3',
      },

    },
  },
  plugins: [],
}

