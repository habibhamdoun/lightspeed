/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        spartan: ['League Spartan', 'sans-serif'],
      },
      textColor: {
        main: '#FFDD5E',
      },
      backgroundColor: {
        main: '#FFDD5E',
      },
      borderColor: {
        main: '#FFDD5E',
      },
    },
  },
  plugins: [],
};
