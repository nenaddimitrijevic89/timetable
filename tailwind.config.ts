import type { Config } from 'tailwindcss'
import tailwindScrollbarHide from 'tailwind-scrollbar-hide'

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        black: '#000',
        foreground: 'var(--foreground)',
        orange: '#FECF3B',
      },
      backgroundImage: {
        'white-logo': "url('../assets/logo-white.svg')",
        'orange-logo': "url('../assets/logo-orange.svg')",
      },
      boxShadow: {
        custom: '0 0 9px rgba(0, 0, 0, 0.5)',
      },
      fontFamily: {
        sans: ['Helvetica-Extended', 'sans-serif'],
      },
    },
  },
  plugins: [tailwindScrollbarHide],
} satisfies Config
