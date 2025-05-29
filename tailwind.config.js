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
        'app-light-blue': '#77BBDA',
        'app-red': '#E15050',
        'app-green': '#5DB075',
        'app-yellow': '#C3C028',
      },
      fontFamily: {
        'roboto': ['Roboto-Regular'],
        'roboto-medium': ['Roboto-Medium'],
        'roboto-bold': ['Roboto-Bold'],
      },
    },
  },
  plugins: [],
  presets: [require("nativewind/preset")],
}

