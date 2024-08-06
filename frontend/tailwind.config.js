/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      keyframes: {
        cardAnimation: {
          '0%': { transform: 'scale(0.4)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      animation: {
        card: 'cardAnimation 0.9s ease 0.9s forwards',
      },
    },
  },
  plugins: [],
}

