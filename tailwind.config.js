/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        neon: {
          blue: '#031B59',
        },
        base: '#0b1220',
        card: '#0f172a',
      },
      boxShadow: {
        glow: '0 0 40px rgba(3,27,89,0.6)',
      },
      backgroundImage: {
        'radial-fade': 'radial-gradient(1000px 600px at var(--x,50%) var(--y,50%), rgba(3,27,89,0.25), transparent 60%)',
        'glass': 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
      },
    },
  },
  plugins: [],
}


