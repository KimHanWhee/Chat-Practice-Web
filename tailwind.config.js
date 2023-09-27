/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: [
    "./src/**/*.{html,js,jsx}",
    "path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      minWidth: {
        10: "10rem",
        12: "12rem",
        15: "15rem",
        20: "20rem",
        30: "30rem",
        40: "40rem",
        65: "65rem",
      },
      minHeight: {
        10: "10rem",
        12: "12rem",
        30: "30rem",
        40: "40rem",
      },
      keyframes: {
        puff: {
          "0%": {
            transform: "scale(1.2)",
            filter: "blur(4px)",
            opacity: 0,
          },
          "100%": {
            transform: "scale(1)",
            filter: "blur(0px)",
            opacity: 1,
          },
        },
      },
      animation: {
        "puff-in": "puff 0.7s cubic-bezier(0.470, 0.000, 0.745, 0.715)",
      },
    },
  },
  plugins: [require("daisyui")],
});
