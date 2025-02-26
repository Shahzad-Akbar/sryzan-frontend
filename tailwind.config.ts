import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        'primary-2': 'var(--primary-2)',
        'secondary-1': 'var(--secondary-1)',
        'secondary-2': 'var(--secondary-2)',
        neutral: 'var(--neutral)',
        'neutral-2': 'var(--neutral-2)',
        'neutral-white': 'var(--neutral-white)',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        'open-sans': ['Open Sans', 'sans-serif'],
      },
      fontSize: {
        '10': '10px',
        '48': '48px',
        '80': '80px',
      },
      lineHeight: {
        '105': '90px'
      },
      container: {
        center: true,
        padding: '70px',
        screens: {
          '2xl': '1440px',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
