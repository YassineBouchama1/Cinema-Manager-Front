import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        // Using modern `rgb`
        primary: 'rgb(var(--color-primary))',
        secondary: 'rgb(var(--color-secondary))',

      }
      // colors: {
      //   sidebar: {
      //     active: "#4880FF",
      //     background: "#f5f5ff",
      //     iconColor: "#636c80",
      //   },
      //   theme: {
      //     color: "#4880FF",
      //     bodyInputs: "#F5F6FA",
      //   },
      // },

    },
  },
  plugins: [
    require("@xpd/tailwind-3dtransforms")
  ],
};
export default config;
