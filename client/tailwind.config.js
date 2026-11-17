/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        krem: '#F4EDE3',
        tinta: '#2E1F14',
        redup: '#6B5644',
        kayu: { DEFAULT: '#8A4B2A', gelap: '#6F3B20' },
        pasir: '#C9A66B',
        gading: '#E6D5BC',
        garis: '#DACBB4',
      },
      fontFamily: {
        display: ['"Young Serif"', 'Georgia', 'serif'],
        sans: ['"Instrument Sans"', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        up: { from: { opacity: 0, transform: 'translateY(16px)' } },
        pop: { '40%': { transform: 'scale(1.04)' } },
        marquee: { to: { transform: 'translateX(-50%)' } },
        'marquee-rev': { from: { transform: 'translateX(-50%)' }, to: { transform: 'translateX(0)' } },
      },
      animation: {
        up: 'up .6s both',
        pop: 'pop .35s',
        marquee: 'marquee 50s linear infinite',
        'marquee-rev': 'marquee-rev 58s linear infinite',
      },
    },
  },
};
