/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./template/**/*.html",
    "./scripts/*.ts",
    "./style/*.scss",
  ],
  theme: {
    extend: {
      colors: {
        'bg': '#0f0d0e',
        'bg-light': '#191617',
        'hl': '#fcba28',
      },
    },
  },
}
