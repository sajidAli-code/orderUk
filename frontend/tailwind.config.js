/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        sunYellow: '#FFD700', // A bright yellow similar to the sun
        darkBlueShade: '#001f3f', // A dark blue with blackish shading
      },
      textStroke: {
        DEFAULT: '1px', // Default stroke width
        '2': '2px',
        '4': '4px',
      },
    },
  },
  plugins: [
    require('daisyui'),
    function ({ addUtilities }) {
      const newUtilities = {
        '.text-stroke': {
          '-webkit-text-stroke': '1px black',
          'color': 'transparent'
        },
        '.text-stroke-2': {
          '-webkit-text-stroke': '2px black',
          'color': 'transparent'
        },
        '.text-stroke-4': {
          '-webkit-text-stroke': '4px black',
          'color': 'transparent'
        },
      }
      addUtilities(newUtilities, ['responsive', 'hover'])
    },
  ],
}
