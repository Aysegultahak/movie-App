/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.tsx",
    "./app/**/*.{js,jsx,ts,tsx}",      // <-- Bunu ekleyin!
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#0f0D23", // Indigo 600
        secondary: "#151312", // Indigo 200
        accent: "#AB8BFF", // Indigo 400
        light: {
          200: "#D6C6FF", // Light Indigo
          300: "#A8B5DB", // Lighter Indigo
          400: "#9CA4AB", // Lightest Indigo
        },
        dark: {
          200: "#221f3d", // Dark Indigo
          300: "#0f0D23", // Darker Indigo
        }
        
      },
    },
  },
  plugins: [],
}