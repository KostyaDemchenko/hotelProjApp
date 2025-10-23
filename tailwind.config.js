// tailwind.config.js
const { heroui } = require("@heroui/theme");

module.exports = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"], // здесь подключаем переменную
        // можно убрать mono, если не нужен
      },
      colors: {
        blue: {
          100: "#E3F2FD",
          200: "#BBDEFB",
          300: "#90CAF9",
          400: "#64B5F6",
          500: "#2196F3",
          600: "#1E88E5",
          700: "#1976D2",
          800: "#1565C0",
          900: "#0D47A1",
        },
        yellow: {
          100: "#FFFDE7",
          200: "#FFF9C4",
          300: "#FFF59D",
          400: "#FFF176",
          500: "#FFEB3B",
          600: "#FDD835",
          700: "#FBC02D",
          800: "#F9A825",
          900: "#F57F17",
        },
        black: {
          100: "#FFFFFF",
          200: "#E5E5E5",
          300: "#CCCCCC",
          400: "#999999",
          500: "#666666",
          600: "#444444",
          700: "#333333",
          800: "#222222",
          900: "#000000",
        },
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};
