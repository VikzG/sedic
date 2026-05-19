/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'corpo-blue': '#223078',
        'grey-blue':  '#B3C2E9',
        'beige':      '#E4E4E0',
      },
    },
  },
  plugins: [],
};
