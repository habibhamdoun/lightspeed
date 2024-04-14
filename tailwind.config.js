/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        main: '#ffdc64',
        secondary: '#f88c3c',
      },
      gradientColorStopPositions: {
        36: '120%',
      },
    },
  },
  plugins: [],
};
