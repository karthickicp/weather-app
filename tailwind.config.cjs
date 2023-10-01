/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      minHeight: {
        '1/2': '50',
      },
      height: {
        'half-screen': '50vh',
      }
    },

  },
  plugins: [],
};
