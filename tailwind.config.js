module.exports = {
   content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
   darkMode: "class",
   theme: {
      screens: {
         md: "768px",
         lg: "1050px",
      },
      fontSize: {
         f11: ".687rem",
         f12: ".75rem",
         f13: ".812rem",
         f15: ".937rem",
         f18: "1.125rem",
         f24: "1.50rem",
         f32: "2.0rem",
      },
      extend: {
         fontFamily: {
            jakarta: "Plus Jakarta Sans",
         },
         boxShadow: {
            board_menu: "0px 10px 20px rgba(54, 78, 126, 0.25)",
            card: "0px 4px 6px rgba(54, 78, 126, 0.10)",
         },
         colors: {
            kb_main_purple: "#635FC7",
            kb_main_purple_hover: "#A8A4FF",
            kb_black: "#000112",
            kb_very_dark_grey: "#20212C",
            kb_dark_grey: "#2B2C37",
            kb_medium_grey: "#828FA3",
            kb_light_grey: "#F4F7FD",
            kb_red: "#EA5555",
            kb_red_hover: "#FF9898",
            kb_main_purple_o25: "rgba(99,95,199,0.25)",
            kb_main_purple_o10: "rgba(99, 95, 199, 0.1)",
         },
      },
   },
   plugins: [
      //  require('@tailwindcss/forms')({
      //    strategy: 'base', // only generate global styles
      //  }),
      // require('@tailwindcss/typography'),
      // require('@tailwindcss/line-clamp'),
      // require('@tailwindcss/aspect-ratio')
   ],
}
