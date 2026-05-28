/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['Fira Code', 'monospace'],
      },
      boxShadow: {
        'glow-cyan': '0 0 15px rgba(6, 182, 212, 0.15)',
        'glow-green': '0 0 15px rgba(34, 197, 94, 0.15)',
        'glow-amber': '0 0 15px rgba(245, 158, 11, 0.15)',
      }
    },
  },
  plugins: [],
}