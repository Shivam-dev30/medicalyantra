/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0ea5a4",
        accent: "#7c3aed"
      }
    }
  },
  plugins: []
};
