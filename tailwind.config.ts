import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg1: "#F6EAD7",
          bg2: "#EBDDC6",
          white: "#F8FEFF",
          black: "#3C3C3C",
          gray: "#5C5C5C",
          gray1: "#848484",
          primary1: "#FF9553",
          primary2: "#FA8339",
          primary3: "#E46719",
        },

        background: "var(--background)",
        foreground: "var(--foreground)",
      },

      fontFamily: {
        pretendard: ['Pretendard', 'sans-serif'],
        hakgyo: ['var(--font-hakgyo)'],
      },

      fontSize: {
        'pretendard-s': ['14px', {
          lineHeight: '22px',
          letterSpacing: '-0.02em',
          fontWeight: '500',
        }],
        'pretendard-m': ['18px', {
          lineHeight: '30px',
          letterSpacing: '-0.02em',
          fontWeight: '500',
        }],
        'pretendard-l': ['24px', {
          lineHeight: '38px',
          letterSpacing: '-0.02em',
          fontWeight: '700',
        }],
        'pretendard-xl': ['28px', {
          lineHeight: '40px',
          letterSpacing: '-0.02em',
          fontWeight: '700',
        }],
        'hakgyo-s': ['12px', {
          lineHeight: '22px',
          letterSpacing: '0',
        }],
        'hakgyo-m': ['16px', {
          lineHeight: '22px',
          letterSpacing: '0',
        }],
        'hakgyo-l': ['20px', {
          lineHeight: '28px',
          letterSpacing: '0',
        }],
      }
    },
  },
  plugins: [],
};
export default config;
