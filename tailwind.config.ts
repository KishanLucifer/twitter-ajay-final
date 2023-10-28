import type { Config } from 'tailwindcss'

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./utils/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
    './index.html',
  ],
  theme: {
    extend: {
      colors: {
        twitter: "#00ADED",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
} satisfies Config