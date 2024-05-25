/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './screen/**/*.{js,jsx,ts,tsx}',
    './Navigator/**/*.{js,jsx,ts,tsx}',
    './screens/**/**/*.{js,jsx,ts,tsx}',
    './components/**/**/*.{js,jsx,ts,tsx}',
  ],

  theme: {
    colors: {
      primary: '#1B1A1C',
      secondary: '#FFFFFF',
      background: '#1B1A1C',
      text: '#FFFFFF',
      lightText: '#D3D3D3',
      accent: '#e74c3c',
      darkaccent: '#52221d',
      green: '#1ED760',
      grey: '#777777',
      btnDeactivated: '#535353',
      lightgrey: '#D3D3D3',
      darkgrey: '#393e46',
      tagsbtn1: '#1B1A1C80',
      tagsbtn2: '#1B1A1C90',
      tagsbtn3: '#1B1A1C95',
      darkgrey: '#282828',
      darkgrey: '#282828',
      tagsbtn1: '#1B1A1C80',
      tagsbtn2: '#1B1A1C90',
      tagsbtn3: '#1B1A1C95',

      // Add more colors as needed
    },

    extend: {},
  },
  plugins: [],
};
