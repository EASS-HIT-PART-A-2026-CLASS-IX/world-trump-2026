/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        usa: { red: '#B31942', blue: '#0A3161', white: '#FFFFFF' },
        trump: { gold: '#C5A333', red: '#BF0A30', navy: '#041E42' },
        vegas: { green: '#1B5E20', gold: '#FFD700', neon: '#00FF41', dark: '#0D1117' },
        pitch: '#1a472a',
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'monospace'],
        display: ['Georgia', 'serif'],
      },
      animation: {
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
        'marquee': 'marquee 30s linear infinite',
        'fade-in': 'fadeIn 0.5s ease-out',
      },
      keyframes: {
        pulseGold: {
          '0%, 100%': { borderColor: '#C5A333' },
          '50%': { borderColor: '#FFD700' },
        },
        marquee: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
