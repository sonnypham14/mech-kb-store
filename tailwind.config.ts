import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/modules/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'glass-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
        'hero-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'dark-hero-gradient': 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'waveform-1': 'waveform 1.2s ease-in-out infinite',
        'waveform-2': 'waveform 1.2s ease-in-out 0.1s infinite',
        'waveform-3': 'waveform 1.2s ease-in-out 0.2s infinite',
        'waveform-4': 'waveform 1.2s ease-in-out 0.3s infinite',
        'waveform-5': 'waveform 1.2s ease-in-out 0.4s infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        shimmer: 'shimmer 2s linear infinite',
      },
      keyframes: {
        waveform: {
          '0%, 100%': { transform: 'scaleY(0.3)' },
          '50%': { transform: 'scaleY(1)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      boxShadow: {
        glass: '0 8px 32px rgba(31, 38, 135, 0.37)',
        'glass-sm': '0 4px 16px rgba(31, 38, 135, 0.2)',
        'glass-lg': '0 16px 48px rgba(31, 38, 135, 0.5)',
        neon: '0 0 20px rgba(102, 126, 234, 0.5)',
        'neon-purple': '0 0 20px rgba(118, 75, 162, 0.5)',
      },
    },
  },
  plugins: [],
};

export default config;
