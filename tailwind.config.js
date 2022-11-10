/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Mona Sans", "Mona Sans Fallback", "sans-serif"],
      },
    },
  },
  daisyui: {
    styled: true,
    themes: [
      {
        cream: {
          primary: "#006771",
          secondary: "#FFA700",
          accent: "#FFCA69",
          neutral: "#FFFDD3",
          "base-100": "#FEEEB4",
        },
      },
      "halloween",
      "dark",
      "light",
    ],
  },
  plugins: [require("daisyui")],
};
