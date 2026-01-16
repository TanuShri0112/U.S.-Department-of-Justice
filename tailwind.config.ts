// MAHARASHTRA GOVERNMENT UPDATE START - Tailwind Configuration
import type { Config } from 'tailwindcss';
import { maharashtraTheme } from './src/lib/theme/maharashtra-theme';
import tailwindcssAnimate from 'tailwindcss-animate';
import typography from '@tailwindcss/typography';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx,js,jsx}',
    './components/**/*.{ts,tsx,js,jsx}',
    './app/**/*.{ts,tsx,js,jsx}',
    './src/**/*.{ts,tsx,js,jsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '1rem', // Reduced for mobile-first design
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      borderColor: {
        border: 'hsl(var(--border))',
      },
      colors: {
        primary: maharashtraTheme.colors.primary,
        secondary: maharashtraTheme.colors.secondary,
        accent: maharashtraTheme.colors.accent,
        background: maharashtraTheme.colors.background,
        foreground: maharashtraTheme.colors.foreground,
        border: maharashtraTheme.colors.border,
        success: maharashtraTheme.colors.success,
        warning: maharashtraTheme.colors.warning,
        error: maharashtraTheme.colors.error,
      },
      borderRadius: maharashtraTheme.borderRadius,
      fontFamily: maharashtraTheme.fonts,
      boxShadow: maharashtraTheme.shadows,
      typography: maharashtraTheme.typography,
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'fade-out': {
          from: { opacity: '1' },
          to: { opacity: '0' },
        },
        'slide-in': {
          from: { transform: 'translateX(-100%)' },
          to: { transform: 'translateX(0)' },
        },
        'slide-out': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(100%)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.3s ease-out',
        'fade-out': 'fade-out 0.3s ease-out',
        'slide-in': 'slide-in 0.3s ease-out',
        'slide-out': 'slide-out 0.3s ease-out',
      },
    },
  },
  plugins: [
    tailwindcssAnimate,
    typography,
  ],
};

export default config;
// MAHARASHTRA GOVERNMENT UPDATE END