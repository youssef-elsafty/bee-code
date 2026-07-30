import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        cairo: ['var(--font-cairo)', 'Cairo', 'sans-serif'],
        inter: ['var(--font-inter)', 'Inter', 'sans-serif'],
        sans: ['var(--font-cairo)', 'Cairo', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#2563EB',
          dark: '#1d4ed8',
          light: '#3b82f6',
        },
        secondary: {
          DEFAULT: '#7C3AED',
          dark: '#6d28d9',
        },
        accent: {
          DEFAULT: '#06B6D4',
          dark: '#0891b2',
        },
        success: '#22C55E',
        warning: '#F59E0B',
        danger: '#EF4444',
        background: '#071120',
        card: 'rgba(11, 27, 54, 0.6)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-premium': 'linear-gradient(135deg, #2563EB, #7C3AED)',
        'gradient-aurora': 'linear-gradient(135deg, #2563EB, #7C3AED, #06B6D4)',
        'gradient-dark': 'linear-gradient(180deg, #071120 0%, #0a1628 100%)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'glow-blue':   '0 0 40px rgba(37, 99, 235, 0.35)',
        'glow-purple': '0 0 40px rgba(124, 58, 237, 0.35)',
        'glow-cyan':   '0 0 40px rgba(6, 182, 212, 0.3)',
        'card':        '0 8px 32px rgba(0, 0, 0, 0.4)',
        'card-hover':  '0 16px 48px rgba(0, 0, 0, 0.5)',
      },
      animation: {
        'float':          'float 6s ease-in-out infinite',
        'float-slow':     'float-slow 8s ease-in-out infinite',
        'pulse-glow':     'pulse-glow 3s ease-in-out infinite',
        'gradient':       'gradient-shift 6s ease infinite',
        'shimmer':        'shimmer 2.5s linear infinite',
        'spin-slow':      'spin-slow 20s linear infinite',
        'fade-up':        'fade-up 0.7s ease forwards',
        'scale-in':       'scale-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        'bounce-in':      'bounce-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
      },
      transitionTimingFunction: {
        'premium': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'bounce':  'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
