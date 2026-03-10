/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: '#E60000', // Master Elevator Red
          hover: '#CC0000',
        },
        secondary: {
          DEFAULT: '#0f172a', // Navy/Steel Blue
          hover: '#1e293b',
        },
        background: '#f8fafc', // Off-white
        'text-main': '#1e293b',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

