/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        darkerColor: "#212121",
        darkColor: "#525252",
        grayColor: "#616161",
      },
    },
  },
  plugins: [],
};
