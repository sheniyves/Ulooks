/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        fashion: ["ModernFashion", "sans-serif"],
        urbanist: ["Urbanist", "sans-serif"],
        manr: ['"Manrope", sans-serif']
      },
      screens: {
        xs: "375px",
        mdl: "888px",
        sms: "410px",
        lgl: "1150px",
        xlx: "1500px",
      },
      backgroundColor: {
        purple: "#6A0DAD",
        gold: "#FEB200",
        light_gold: "#FEF0C7",
        gray: "#F9FAFB",
        error: "#fee4ee",
        form: "#912CDA",
        orange_gold: "#F79009",
        yellow_gold: "#572B04",
        option_background: "#F9F4FC",
        border_purple: "#2F034E",
        light_Purple: "#F4E2FE",
        button_red: "#D92D20",
        light_blue: "#96BAFF",
        buttonGray: "#EAEAEC"
      },

      colors: {
        purple: "#6A0DAD",
        blue: "#5061E2",
        darkerPurple: "#37035C",
        darkPurple: "#2F034E",
        gold: "#FEB200",
        red: "#F04438",
        cencel_red: "#B42318",
        gray: "#98A2B3",
        light_gray: "#667085",
        orange_gold: "#F79009",
        yellow_gold: "#572B04",
        link: "#2E90FA",
        green: "#12B76A",
      },
      borderColor: {
        color: "#D0D5DD",
        error: "#e15771",
      },
      backgroundImage: {
        "purple-gold":
          "linear-gradient(90deg, rgba(107, 14, 174, 1) 0%, rgba(254, 178, 0, 1) 50%)",
        "purple-strong-gold":
          "linear-gradient(90deg, rgba(107, 14, 174, 1) 0%, rgba(254, 178, 0, 1) 88%)",
        "gold-strong":
          "linear-gradient(90deg,rgba(107, 14, 174, 1) 0%, rgba(254, 178, 0, 1) 36%)",
        "gold-purple":
          "linear-gradient(90deg,rgba(107, 14, 174, 1) 0%, rgba(254, 178, 0, 1) 90%)",
        "gold-purple-text":
          "linear-gradient(90deg, rgba(254, 178, 0, 1) 40%, rgba(107, 14, 174, 1) 90%)",
        "gold-purple-textII":
          "linear-gradient(90deg, rgba(254, 178, 0, 1) 0%, rgba(107, 14, 174, 1) 90%)",
      },
      gridTemplateColumns: {
        "fit-120": "repeat(auto-fit, minmax(120px, 1fr))",
      },
      boxShadow: {
        "top-sm": "0 -2px 4px rgba(0, 0, 0, 0.06)",
        "top-md": "0 -4px 6px rgba(0, 0, 0, 0.1)",
        "top-lg": "0 -6px 10px rgba(0, 0, 0, 0.12)",
      },
      keyframes: {
        shine: {
          "0%": { "background-position": "100%" },
          "100%": { "background-position": "-100%" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
      animation: {
        shine: "shine 5s linear infinite",
        marquee: "marquee 30s linear infinite",
      },
    },
  },
  plugins: [],
};

//fcd194
