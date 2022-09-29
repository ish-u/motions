/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        pulse: "pulse 2s ease-in-out infinite",
      },
      keyframes: {
        pulse: {
          "0%": {
            transform: "scale(0.5)",
          },
          "50%": {
            transform: "scale(1)",
          },
          "100%": {
            transform: "scale(0.5)",
          },
        },
      },
    },
  },
  plugins: [],
};
