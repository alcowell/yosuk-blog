/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{ts,tsx}", "./lib/component/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        noto: ["Noto Sans JP", "sans-serif"],
      },
    },
    backgroundImage: (theme) => ({
      "back-img": "url(/background.jpg)",
    }),
  },
  plugins: [],
};
