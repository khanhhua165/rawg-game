module.exports = {
  purge: ["./public/**/*.html", "./src/**/*.tsx"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: [
        "Open Sans",
        "ui-sans-serif",
        "system-ui",
        "-apple-system",
        "BlinkMacSystemFont",
        "Segoe UI",
        "Roboto",
        "Helvetica Neue",
        "Arial",
        "Noto Sans",
        "sans-serif",
        "Apple Color Emoji",
        "Segoe UI Emoji",
        "Segoe UI Symbol",
        "Noto Color Emoji",
      ],
      serif: [
        "Open Sans",
        "ui-serif",
        "Georgia",
        "Cambria",
        "Times New Roman",
        "Times",
        "serif",
      ],
    },
    screens: {
      sm: "689px",
      md: "1010px",
      lg: "1388px",
    },

    extend: {},
  },
  variants: {
    extend: {
      textColor: ["active"],
      borderWidth: ["dark"],
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
