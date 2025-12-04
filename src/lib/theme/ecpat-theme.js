// ECPAT update start - Travel & Tourism Theme Configuration
export const ecpatTheme = {
  colors: {
    primary: {
      DEFAULT: '#0F62FE', // Deep azure
      50: '#E6F0FF',
      100: '#CCE0FF',
      200: '#99C2FF',
      300: '#66A3FF',
      400: '#3385FF',
      500: '#0F62FE',
      600: '#0B4ED1',
      700: '#083BA0',
      800: '#05286F',
      900: '#031A45',
    },
    secondary: {
      DEFAULT: '#F5F7FB', // Soft white-blue
      50: '#FFFFFF',
      100: '#F9FBFF',
      200: '#F0F4FF',
      300: '#E2EBFF',
      400: '#CEDCF5',
      500: '#B7C6DE',
      600: '#96A4BA',
      700: '#707C90',
      800: '#4B5563',
      900: '#1F2937',
    },
    accent: {
      DEFAULT: '#1D9BF0', // Bright sky blue
      50: '#EAF6FF',
      100: '#D5EDFF',
      200: '#ABDAFF',
      300: '#82C6FF',
      400: '#58B3FF',
      500: '#1D9BF0',
      600: '#0E7CC3',
      700: '#0A5C92',
      800: '#073D61',
      900: '#031F31',
    },
    background: {
      DEFAULT: '#FFFFFF',
      subtle: '#F7F9FA',
    },
    foreground: {
      DEFAULT: '#1A1A1A',
      subtle: '#666666',
    },
  },
  
  fonts: {
    sans: ['Inter', 'sans-serif'],
    serif: ['Merriweather', 'serif'],
  },
  
  spacing: {
    container: {
      center: true,
      padding: '2rem',
      maxWidth: '1440px',
    },
  },
  
  borderRadius: {
    DEFAULT: '0.5rem',
    sm: '0.25rem',
    lg: '1rem',
    xl: '1.5rem',
  },
  
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    DEFAULT: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    md: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    lg: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },
  
  typography: {
    h1: {
      fontSize: '2.5rem',
      lineHeight: '3rem',
      fontWeight: '700',
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: '2rem',
      lineHeight: '2.5rem',
      fontWeight: '600',
      letterSpacing: '-0.01em',
    },
    h3: {
      fontSize: '1.5rem',
      lineHeight: '2rem',
      fontWeight: '600',
    },
    body: {
      fontSize: '1rem',
      lineHeight: '1.5rem',
    },
    small: {
      fontSize: '0.875rem',
      lineHeight: '1.25rem',
    },
  },
  
  // Component-specific styles
  components: {
    card: {
      background: 'white',
      border: '1px solid',
      borderColor: 'rgba(0, 0, 0, 0.1)',
      borderRadius: '1rem',
      padding: '1.5rem',
      shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    },
    button: {
      primary: {
        background: '#2C7DA0',
        color: 'white',
        hover: '#235E79',
        active: '#1A4557',
      },
      secondary: {
        background: '#73A580',
        color: 'white',
        hover: '#567D61',
        active: '#405E48',
      },
      accent: {
        background: '#E6B655',
        color: 'white',
        hover: '#D99B24',
        active: '#A3741B',
      },
    },
    input: {
      background: 'white',
      border: '1px solid',
      borderColor: 'rgba(0, 0, 0, 0.2)',
      borderRadius: '0.5rem',
      padding: '0.5rem 1rem',
      focus: {
        borderColor: '#2C7DA0',
        shadow: '0 0 0 2px rgba(44, 125, 160, 0.2)',
      },
    },
  },
  
  // Animation presets
  animation: {
    default: {
      duration: '150ms',
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
    smooth: {
      duration: '300ms',
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
    bounce: {
      duration: '500ms',
      easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
  },
};

// CSS Variables for use in components
export const cssVariables = {
  '--color-primary': ecpatTheme.colors.primary.DEFAULT,
  '--color-primary-50': ecpatTheme.colors.primary[50],
  '--color-primary-100': ecpatTheme.colors.primary[100],
  '--color-primary-200': ecpatTheme.colors.primary[200],
  '--color-primary-300': ecpatTheme.colors.primary[300],
  '--color-primary-400': ecpatTheme.colors.primary[400],
  '--color-primary-500': ecpatTheme.colors.primary[500],
  '--color-primary-600': ecpatTheme.colors.primary[600],
  '--color-primary-700': ecpatTheme.colors.primary[700],
  '--color-primary-800': ecpatTheme.colors.primary[800],
  '--color-primary-900': ecpatTheme.colors.primary[900],
  
  '--color-secondary': ecpatTheme.colors.secondary.DEFAULT,
  '--color-accent': ecpatTheme.colors.accent.DEFAULT,
  
  '--background': ecpatTheme.colors.background.DEFAULT,
  '--background-subtle': ecpatTheme.colors.background.subtle,
  '--foreground': ecpatTheme.colors.foreground.DEFAULT,
  '--foreground-subtle': ecpatTheme.colors.foreground.subtle,
  
  '--font-sans': ecpatTheme.fonts.sans.join(', '),
  '--font-serif': ecpatTheme.fonts.serif.join(', '),
  
  '--radius-default': ecpatTheme.borderRadius.DEFAULT,
  '--radius-sm': ecpatTheme.borderRadius.sm,
  '--radius-lg': ecpatTheme.borderRadius.lg,
  '--radius-xl': ecpatTheme.borderRadius.xl,
  
  '--shadow-sm': ecpatTheme.shadows.sm,
  '--shadow': ecpatTheme.shadows.DEFAULT,
  '--shadow-md': ecpatTheme.shadows.md,
  '--shadow-lg': ecpatTheme.shadows.lg,
};
// ECPAT update end
