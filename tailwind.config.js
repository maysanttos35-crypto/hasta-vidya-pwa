/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'hv-bg': '#162b3a',
        'hv-surface': '#1a2f3f',
        'hv-card': '#1e3448',
        'hv-mid': '#243d52',
        'hv-rim': '#2e5070',
        'hv-light': '#304e68',
        'hv-gold': '#c9a84c',
        'hv-gold-hi': '#e2c97e',
        'hv-gold-lo': '#8a6a28',
        'hv-text': '#c8dde8',
        'hv-text-hi': '#eaf4f9',
        'hv-muted': '#7fa8be',
        'hv-faint': '#3a6070',
      },
      fontFamily: {
        playfair: ['Playfair Display', 'serif'],
        lato: ['Lato', 'sans-serif'],
      },
      animation: {
        twk: 'twk var(--d, 3s) ease-in-out infinite var(--dl, 0s)',
      },
    },
  },
  plugins: [],
}
