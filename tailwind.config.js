/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [`./views/*.html`], // all .html files

  plugins: [require("daisyui"), require("@tailwindcss/typography")],

  theme: {
    extend: {},
  },
  plugins: [],
};
