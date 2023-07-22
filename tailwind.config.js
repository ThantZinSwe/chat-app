/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        raleway: ["Raleway"],
      },
      colors: {
        "primary-50": "#eef2ff",
        "primary-100": "#e0e7ff",
        "primary-200": "#c7d2fe",
        "primary-300": "#a5b4fc",
        "primary-400": "#818cf8",
        "primary-500": "#6366f1",
        "primary-600": "#4f46e5",
        "primary-700": "#4338ca",
        "primary-800": "#3730a3",
        "primary-900": "#312e81",
        "primary-950": "#1e1b4b",
      },
    },
  },
  plugins: [],
};
