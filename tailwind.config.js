module.exports = {
  mode: "jit",
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        appText: {
          DEFAULT: "#3F3F3F",
        },
        appRed: {
          DEFAULT: "#F66F65",
        },
        appRoundRed: {
          DEFAULT: "#FA554A",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
