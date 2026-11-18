/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        forest: {
          900: '#0B2A1E',
          800: '#0F3627',
          700: '#12402E',
          600: '#17543B',
          500: '#1E6B49',
        },
        sage: {
          300: '#A7C3A8',
          200: '#C6D8BF',
          100: '#E3EBDC',
        },
        ivory: '#F4EFE3',
        paper: '#FBF8F1',
        ink: '#122019',
        clay: {
          600: '#C65A24',
          500: '#D96B2B',
          400: '#E89B5E',
        },
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['"Hanken Grotesk"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
}
