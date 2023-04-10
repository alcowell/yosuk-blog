/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{ts,tsx}", "./lib/component/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        mplus: ["M PLUS 1p"],
        roboto: ["Roboto"],
        rubik: ["Rubik Pixels"],
      },
    },
    backgroundImage: (theme) => ({
      "back-img": "url(/background.jpg)",
    }),
  },
  plugins: [],
};
