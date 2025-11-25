/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        work: '#3b82f6',      // blue
        break: '#10b981',     // green
      },
    },
  },
  plugins: [],
}
