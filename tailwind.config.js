/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    colors: {
      mainBg: "#F3F6F9"
    },
    extend: {},
  },
  plugins: [],
  presets: [require("@material-tailwind/react/tailwind")], // Thêm dòng này
};
