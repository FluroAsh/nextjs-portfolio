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
        xs: { max: '400px' }
      },
      colors: {
        dark: {
          background: {
            primary: '#2d373c'
          }
        }
      },
      spacing: {
        'navbar-height': 'var(--navbar-height)',
        'logo-spacing': 'calc(50vw - 80px)'
      },
      height: {
        '100vh-minus-navbar': 'calc(100vh - var(--navbar-height))'
        
      },
      /** Used mainly for the blog/[slug] prose CSS */
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            a: {
              transition: '150ms',
              textDecoration: 'none',
              color: theme('colors.orange.300'),
              '&:hover': {
                color: theme('colors.amber.500')
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
      }),
      keyframes: {
        'back-and-forth': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-8px)' }
        }
      },
      animation: {
        'back-and-forth': 'back-and-forth 1s ease-in-out infinite alternate'
      }
    }
  },
  variants: {
    extend: { typography: ['dark'] }
  },
  plugins: [require('@tailwindcss/typography')]
}
