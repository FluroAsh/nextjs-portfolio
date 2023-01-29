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
      },
      typography: ({ theme }) => ({
        // NOTE: Used mainly for the blog/[slug] page
        DEFAULT: {
          css: {
            a: {
              transition: '150ms',
              textDecoration: 'none',
              color: theme('colors.orange.300'),
              '&:hover': {
                color: theme('colors.orange.500')
              }
            },
            h1: {
              marginBottom: theme('spacing.4')
            },
            pre: {
              marginTop: theme('spacing.2')
            }
          }
        },
        dark: {
          css: {
            a: {
              color: theme('colors.sky.500'),
              '&:hover': {
                color: theme('colors.sky.600')
              }
            }
          }
        }
      })
    }
  },
  variants: {
    extend: { typography: ['dark'] }
  },
  plugins: [require('@tailwindcss/typography')]
}
