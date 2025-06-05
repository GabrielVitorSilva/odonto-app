/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  
  theme: {
    extend: {
      colors: {
        'app-blue': '#38ABE2',
        'app-light-blue': '#C7E3F0',
        'app-red': '#E15050',
        'app-light-red': '#F5C2C2',
        'app-green': '#5DB075',
        'app-light-green': '#DDEEE2',
        'app-yellow': '#C3C028',
        'app-light-yellow': '#F9F8DC',
      },
      fontFamily: {
        'roboto': ['Roboto-Regular'],
        'roboto-medium': ['Roboto-Medium'],
        'roboto-bold': ['Roboto-Bold'],
      },
      padding: {
        'vertical-10': '10%',
      },
    },
  },
  plugins: [],
  presets: [require("nativewind/preset")],
}

