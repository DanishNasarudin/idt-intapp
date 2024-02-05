/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    // container: {
    //   center: true,
    //   padding: "0",
    //   margin: "0",
    //   screens: {
    //     "2xl": "1400px",
    //   },
    // },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        bgDark: "hsl(0 0 6)",
        bgLight: "hsl(0 0 97)",
        primary: "#0F0F0F",
        secondary: "#D9D9D9",
        accent: "#009BFF",
        accentHov: "rgb(0 155 255 / 0.8)",
        btnOut: "rgb(82 82 91 / 1)",
        btnOutHov: "rgb(161 161 170 / 1)",
        "btnOut-green": "rgb(22 163 74 / 1)",
        "btnOutHov-green": "rgb(74 222 128 / 1)",
        "btnOut-disable": "rgb(39 39 42 / 1)",
      },
      screens: {
        offer: "620px",
        mobilehover: { raw: "(hover:hover)" },
      },
    },
    screens: {
      xs: "600px",
      sm: "768px",
      md: "900px",
    },
  },
  plugins: [require("tailwindcss-animate")],
};
