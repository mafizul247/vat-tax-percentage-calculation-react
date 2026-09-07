/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Space Grotesk"', '"Hind Siliguri"', "system-ui", "sans-serif"],
        bn: ['"Hind Siliguri"', '"Space Grotesk"', "system-ui", "sans-serif"],
        mono: ['"IBM Plex Mono"', "ui-monospace", "monospace"],
      },
    },
  },
  daisyui: {
    themes: [
      {
        calcdark: {
          primary: "#38C98C",
          "primary-content": "#08130E",
          secondary: "#D9B15C",
          "secondary-content": "#1A1305",
          accent: "#38C98C",
          "accent-content": "#08130E",
          neutral: "#16211C",
          "neutral-content": "#EAF2ED",
          "base-100": "#0B1310",
          "base-200": "#121B17",
          "base-300": "#16211C",
          "base-content": "#EAF2ED",
          info: "#5AA9E6",
          success: "#38C98C",
          warning: "#D9B15C",
          error: "#E2685C",
        },
      },
      {
        calclight: {
          primary: "#0F9660",
          "primary-content": "#F4FBF7",
          secondary: "#A9781F",
          "secondary-content": "#FFFBF0",
          accent: "#0F9660",
          "accent-content": "#F4FBF7",
          neutral: "#E7ECE9",
          "neutral-content": "#152019",
          "base-100": "#FFFFFF",
          "base-200": "#F4F7F5",
          "base-300": "#E7ECE9",
          "base-content": "#152019",
          info: "#2F7DC0",
          success: "#0F9660",
          warning: "#A9781F",
          error: "#C1443A",
        },
      },
    ],
    darkTheme: "calcdark",
  },
  plugins: [require("daisyui")],
};
