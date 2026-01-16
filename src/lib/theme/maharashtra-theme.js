// MAHARASHTRA GOVERNMENT THEME CONFIGURATION
export const maharashtraTheme = {
  colors: {
    primary: {
      DEFAULT: '#FF9933', // Saffron orange (राष्ट्रध्वजाचा रंग)
      50: '#FFF8F0',
      100: '#FFE8D1',
      200: '#FFD1A3',
      300: '#FFBA75',
      400: '#FF9933',
      500: '#E67E00',
      600: '#B36200',
      700: '#804600',
      800: '#4D2A00',
      900: '#1A0E00',
    },
    secondary: {
      DEFAULT: '#138808', // Green (राष्ट्रध्वजाचा रंग)
      50: '#F0F9EF',
      100: '#D1ECD0',
      200: '#A3D9A1',
      300: '#75C672',
      400: '#47B343',
      500: '#138808',
      600: '#0F6D06',
      700: '#0B5205',
      800: '#073703',
      900: '#031C01',
    },
    accent: {
      DEFAULT: '#0055A4', // Blue (राष्ट्रध्वजाचा रंग)
      50: '#F0F5FB',
      100: '#D1E0F2',
      200: '#A3C1E4',
      300: '#75A2D6',
      400: '#4783C8',
      500: '#1964BA',
      600: '#0055A4',
      700: '#00417D',
      800: '#002D56',
      900: '#00192F',
    },
    background: {
      DEFAULT: '#FFFFFF',
      subtle: '#F8FAFC', // Clean off-white background
      card: '#FFFFFF',
      header: '#FFFFFF',
      sidebar: '#F9FAFB',
    },
    foreground: {
      DEFAULT: '#1F2937', // Dark gray for readability
      subtle: '#6B7280',   // Medium gray for secondary text
      muted: '#9CA3AF',    // Light gray for muted text
    },
    border: {
      DEFAULT: '#E5E7EB',  // Light gray border
      subtle: '#F3F4F6',   // Very light gray border
    },
    success: {
      DEFAULT: '#10B981',   // Emerald green
      50: '#ECFDF5',
      100: '#D1FAE5',
      200: '#A7F3D0',
      300: '#6EE7B7',
      400: '#34D399',
      500: '#10B981',
      600: '#059669',
      700: '#047857',
      800: '#065F46',
      900: '#064E3B',
    },
    warning: {
      DEFAULT: '#F59E0B',   // Amber
      50: '#FFFBEB',
      100: '#FEF3C7',
      200: '#FDE68A',
      300: '#FCD34D',
      400: '#FBBF24',
      500: '#F59E0B',
      600: '#D97706',
      700: '#B45309',
      800: '#92400E',
      900: '#78350F',
    },
    error: {
      DEFAULT: '#EF4444',   // Red
      50: '#FEF2F2',
      100: '#FEE2E2',
      200: '#FECACA',
      300: '#FCA5A5',
      400: '#F87171',
      500: '#EF4444',
      600: '#DC2626',
      700: '#B91C1C',
      800: '#991B1B',
      900: '#7F1D1D',
    },
  },
  
  fonts: {
    sans: ['"Noto Sans Devanagari"', 'Inter', 'system-ui', 'sans-serif'],
    serif: ['"Noto Serif Devanagari"', 'Merriweather', 'serif'],
    heading: ['"Noto Sans Devanagari"', 'Inter', 'system-ui', 'sans-serif'],
  },
  
  spacing: {
    container: {
      center: true,
      padding: '1rem',
      maxWidth: '1440px',
    },
  },
  
  borderRadius: {
    DEFAULT: '0.375rem', // 6px - more traditional government style
    sm: '0.25rem',       // 4px
    md: '0.5rem',        // 8px
    lg: '0.75rem',       // 12px
    xl: '1rem',          // 16px
  },
  
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
  },
  
  typography: {
    h1: {
      fontSize: '2.25rem', // 36px
      lineHeight: '2.5rem', // 40px
      fontWeight: '700',
      letterSpacing: '-0.025em',
    },
    h2: {
      fontSize: '1.875rem', // 30px
      lineHeight: '2.25rem', // 36px
      fontWeight: '600',
      letterSpacing: '-0.015em',
    },
    h3: {
      fontSize: '1.5rem', // 24px
      lineHeight: '2rem', // 32px
      fontWeight: '600',
    },
    body: {
      fontSize: '1rem', // 16px
      lineHeight: '1.75rem', // 28px - Better readability for Marathi
    },
    small: {
      fontSize: '0.875rem', // 14px
      lineHeight: '1.25rem', // 20px
    },
  },
  
  // Component-specific styles
  components: {
    card: {
      background: '#FFFFFF',
      border: '1px solid',
      borderColor: 'rgba(0, 0, 0, 0.1)',
      borderRadius: '0.5rem',
      padding: '1.5rem',
      shadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
    },
    button: {
      primary: {
        background: '#FF9933',
        color: '#FFFFFF',
        hover: '#E67E00',
        active: '#B36200',
        disabled: '#F3F4F6',
        disabledColor: '#9CA3AF',
      },
      secondary: {
        background: '#138808',
        color: '#FFFFFF',
        hover: '#0F6D06',
        active: '#0B5205',
        disabled: '#F3F4F6',
        disabledColor: '#9CA3AF',
      },
      accent: {
        background: '#0055A4',
        color: '#FFFFFF',
        hover: '#00417D',
        active: '#002D56',
        disabled: '#F3F4F6',
        disabledColor: '#9CA3AF',
      },
      outline: {
        background: 'transparent',
        color: '#1F2937',
        border: '1px solid #E5E7EB',
        hover: '#F9FAFB',
        active: '#F3F4F6',
      },
    },
    input: {
      background: '#FFFFFF',
      border: '1px solid',
      borderColor: '#E5E7EB',
      borderRadius: '0.375rem',
      padding: '0.625rem 1rem', // 10px 16px
      focus: {
        borderColor: '#FF9933',
        shadow: '0 0 0 3px rgba(255, 153, 51, 0.1)',
      },
    },
    header: {
      background: '#FFFFFF',
      borderBottom: '1px solid #E5E7EB',
      padding: '1rem 1.5rem',
      minHeight: '4rem',
    },
    sidebar: {
      background: '#F9FAFB',
      borderRight: '1px solid #E5E7EB',
      width: '16rem',
      padding: '1rem 0',
    },
  },
};

// CSS Variables for use in components
export const cssVariables = {
  '--color-primary': maharashtraTheme.colors.primary.DEFAULT,
  '--color-primary-50': maharashtraTheme.colors.primary[50],
  '--color-primary-100': maharashtraTheme.colors.primary[100],
  '--color-primary-200': maharashtraTheme.colors.primary[200],
  '--color-primary-300': maharashtraTheme.colors.primary[300],
  '--color-primary-400': maharashtraTheme.colors.primary[400],
  '--color-primary-500': maharashtraTheme.colors.primary[500],
  '--color-primary-600': maharashtraTheme.colors.primary[600],
  '--color-primary-700': maharashtraTheme.colors.primary[700],
  '--color-primary-800': maharashtraTheme.colors.primary[800],
  '--color-primary-900': maharashtraTheme.colors.primary[900],
  
  '--color-secondary': maharashtraTheme.colors.secondary.DEFAULT,
  '--color-accent': maharashtraTheme.colors.accent.DEFAULT,
  
  '--background': maharashtraTheme.colors.background.DEFAULT,
  '--background-subtle': maharashtraTheme.colors.background.subtle,
  '--background-card': maharashtraTheme.colors.background.card,
  '--background-header': maharashtraTheme.colors.background.header,
  '--background-sidebar': maharashtraTheme.colors.background.sidebar,
  
  '--foreground': maharashtraTheme.colors.foreground.DEFAULT,
  '--foreground-subtle': maharashtraTheme.colors.foreground.subtle,
  '--foreground-muted': maharashtraTheme.colors.foreground.muted,
  
  '--border': maharashtraTheme.colors.border.DEFAULT,
  '--border-subtle': maharashtraTheme.colors.border.subtle,
  
  '--success': maharashtraTheme.colors.success.DEFAULT,
  '--warning': maharashtraTheme.colors.warning.DEFAULT,
  '--error': maharashtraTheme.colors.error.DEFAULT,
  
  '--font-sans': maharashtraTheme.fonts.sans.join(', '),
  '--font-serif': maharashtraTheme.fonts.serif.join(', '),
  '--font-heading': maharashtraTheme.fonts.heading.join(', '),
  
  '--radius-default': maharashtraTheme.borderRadius.DEFAULT,
  '--radius-sm': maharashtraTheme.borderRadius.sm,
  '--radius-md': maharashtraTheme.borderRadius.md,
  '--radius-lg': maharashtraTheme.borderRadius.lg,
  '--radius-xl': maharashtraTheme.borderRadius.xl,
  
  '--shadow-sm': maharashtraTheme.shadows.sm,
  '--shadow': maharashtraTheme.shadows.DEFAULT,
  '--shadow-md': maharashtraTheme.shadows.md,
  '--shadow-lg': maharashtraTheme.shadows.lg,
};

// Typography styles for Marathi readability
export const typographyStyles = {
  marathi: {
    fontFamily: '"Noto Sans Devanagari", "Noto Serif Devanagari", Arial, sans-serif',
    lineHeight: '1.75', // Increased line height for better Devanagari readability
    fontSize: '1rem',
    fontWeight: 'normal',
  },
  english: {
    fontFamily: 'Inter, system-ui, sans-serif',
    lineHeight: '1.75',
    fontSize: '1rem',
    fontWeight: 'normal',
  },
};