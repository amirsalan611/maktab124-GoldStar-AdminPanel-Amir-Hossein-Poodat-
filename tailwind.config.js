/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#56021F",
        secondPrimary: "#ffb9d1",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
