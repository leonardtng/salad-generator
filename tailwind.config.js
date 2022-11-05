/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        title: ["major-mono-regular"],
        primary: ["circular-std"],
        primaryBold: ["circular-std-bold"],
      },
    },
  },
  plugins: [],
};
