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
        main: '#f5d047',
      },
      backgroundColor: {
        main: '#f5d047',
      },
      borderColor: {
        main: '#f5d047',
      },
    },
  },
  plugins: [],
};
