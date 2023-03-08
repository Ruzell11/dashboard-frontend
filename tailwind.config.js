/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./modules/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          100: "#cce0f5",
          200: "#99c2eb",
          300: "#66a3e0",
          400: "#3385d6",
          500: "#0072c6",
          600: "#005aae",
          700: "#00438b",
          800: "#002c63",
          900: "#1A202C",
        },
        green: {
          100: "#e6f5cc",
          200: "#cce99a",
          300: "#b3de66",
          400: "#99d233",
          500: "#77b900",
          600: "#5c9700",
          700: "#446e00",
          800: "#2c4600",
          900: "#142300",
        },
      },
    },
  },
  variants: {},
  plugins: [],
};
