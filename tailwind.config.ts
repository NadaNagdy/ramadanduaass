import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        cairo: ['Cairo', 'sans-serif'],
        amiri: ['Amiri', 'serif'],
      },
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
        gold: {
          DEFAULT: "hsl(var(--gold))",
          light: "hsl(var(--gold-light))",
          dark: "hsl(var(--gold-dark))",
        },
        cream: "hsl(var(--cream))",
        navy: "hsl(var(--navy))",
        'purple-deep': "hsl(var(--purple-deep))",
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      backgroundImage: {
        'hero-gradient': 'var(--gradient-hero)',
        'card-gradient': 'var(--gradient-card)',
      },
      // ✅ إضافة تخصيص المقالات (Typography)
      typography: ({ theme }: any) => ({
        yellow: {
          css: {
            '--tw-prose-links': theme('colors.gold.DEFAULT'),
            '--tw-prose-invert-links': theme('colors.gold.light'),
          },
        },
        invert: {
          css: {
            '--tw-prose-body': theme('colors.slate.200'),
            '--tw-prose-headings': theme('colors.white'),
            '--tw-prose-links': theme('colors.gold.DEFAULT'),
            '--tw-prose-bold': theme('colors.gold.light'),
            '--tw-prose-bullets': theme('colors.gold.DEFAULT'),
          },
        },
        DEFAULT: {
          css: {
            textAlign: 'justify',
            lineHeight: '1.8',
            fontFamily: theme('fontFamily.cairo'),
            h1: {
              fontFamily: theme('fontFamily.amiri'),
              fontWeight: '700',
            },
            h2: {
              fontFamily: theme('fontFamily.amiri'),
              color: theme('colors.gold.DEFAULT'),
              borderRightWidth: '4px',
              borderRightColor: theme('colors.gold.DEFAULT'),
              paddingRight: '1rem',
              marginTop: '2rem',
              marginBottom: '1rem',
            },
            blockquote: {
              borderRightWidth: '4px',
              borderLeftWidth: '0',
              borderRightColor: theme('colors.gold.DEFAULT'),
              backgroundColor: 'hsla(var(--gold) / 0.05)',
              fontFamily: theme('fontFamily.amiri'),
              fontSize: '1.4rem',
              padding: '1rem 1.5rem',
              borderRadius: '0.5rem',
            },
          },
        },
      }),
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '1' },
        },
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'subtle-glow': {
          '0%, 100%': { filter: 'drop-shadow(0 0 5px hsl(var(--gold) / 0.3))' },
          '50%': { filter: 'drop-shadow(0 0 15px hsl(var(--gold) / 0.5))' },
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'twinkle': 'twinkle 3s ease-in-out infinite',
        'fade-in': 'fade-in 0.7s ease-out forwards',
        'subtle-glow': 'subtle-glow 4s ease-in-out infinite'
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/typography'), // ✅ تأكد من تشغيل هذا الـ Plugin
  ],
};

export default config;
