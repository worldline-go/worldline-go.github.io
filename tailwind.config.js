const tailwindcss = require('tailwindcss')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./template/**/*.html",
    "./scripts/*.ts",
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

