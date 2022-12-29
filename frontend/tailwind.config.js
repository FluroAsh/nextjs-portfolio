/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: 'class',
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      screens: {
        mobile: { max: '479px' },
        tablet: { min: '480px', max: '1023px' },
        laptop: { min: '1024px', max: '1279px' },
        desktop: { min: '1280px' }
      },
      colors: {
        dark: {
          background: {
            primary: '#2d373c'
          }
        }
      }
    }
  },
  plugins: [require('@tailwindcss/typography')]
}
