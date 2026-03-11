/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'crypto-bg': '#050508',
        'crypto-card': 'rgba(20, 20, 26, 0.7)',
        'crypto-card-solid': '#14141a',
        'crypto-green': '#00ff88',
        'crypto-green-glow': '#00ff88aa',
        'crypto-red': '#ff0055',
        'crypto-red-glow': '#ff0055aa',
        'crypto-primary': '#00d4ff',
        'crypto-primary-glow': '#00d4ffaa',
        'crypto-purple': '#b026ff',
        'crypto-purple-glow': '#b026ffaa',
        'crypto-yellow': '#ffea00',
        'crypto-yellow-glow': '#ffea00aa',
      },
      animation: {
        'marquee': 'marquee 120s linear infinite',
        'pulse-neon': 'pulse-neon 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'pulse-neon': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: .7 },
        }
      }
    },
  },
  plugins: [],
}
