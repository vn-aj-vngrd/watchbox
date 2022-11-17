/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        darkerColor: "#242526",
        darkColor: "#3a3b3c",
        grayColor: "#515253",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
  future: {
    hoverOnlyWhenSupported: true,
  },
};
