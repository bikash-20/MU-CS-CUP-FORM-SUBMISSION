import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          50: '#f5f7ff',
          100: '#e6ebff',
          400: '#8a93c7',
          900: '#06070d'
        },
        accent: {
          400: '#7cf7ff',
          500: '#3ad9ff',
          600: '#1aa9ff',
          700: '#7d5cff'
        }
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui']
      },
      backdropBlur: {
        xs: '2px'
      },
      boxShadow: {
        glow: '0 0 40px -10px rgba(124, 247, 255, 0.45)'
      },
      keyframes: {
        floaty: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' }
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' }
        }
      },
      animation: {
        floaty: 'floaty 6s ease-in-out infinite',
        shimmer: 'shimmer 8s linear infinite'
      }
    }
  },
  plugins: []
};

export default config;