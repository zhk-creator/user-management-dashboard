module.exports = {
  purge: [],
  content: ["./src/**/*.{js,jsx,ts,tsx}"],

  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('autoprefixer'),
    require('tailwindcss'),
  ],
}
