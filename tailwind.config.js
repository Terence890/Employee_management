/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#7F56D9',
        secondary: '#F2F4F7',
        accent: '#475467',
        'base-100': '#FFFFFF',
        'base-200': '#F2F4F7',
        'base-300': '#E4E7EC',
        'base-content': '#101828',
      },
      blur: {
        '4xl': '120px',
      }
    },
  },
  plugins: [],
}
