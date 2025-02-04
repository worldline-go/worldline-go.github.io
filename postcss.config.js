module.exports = {
  parser: 'postcss-scss',
  plugins: [
    require('postcss-import'),
    require('@tailwindcss/nesting'),
    require('tailwindcss'),
    require('autoprefixer'),
    require('cssnano')({
      preset: 'default',
    }),
  ]
}