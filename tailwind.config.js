const colors = require('tailwindcss/colors');
 
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './resources/scripts/**/*.{ts,tsx}',
        './resources/views/**/*.blade.php',
    ],
    darkMode: 'class',
    theme: {
        extend: {
            // ── FONT ─────────────────────────────────────────
            fontFamily: {
                sans: ['Plus Jakarta Sans', 'ui-sans-serif', 'system-ui'],
                mono: ['JetBrains Mono', 'ui-monospace'],
            },
 
            // ── BRAND COLORS ─────────────────────────────────
            colors: {
                primary: {
                    50:  '#f0f0ff',
                    100: '#e2e1ff',
                    200: '#cac8ff',
                    300: '#a8a4fe',
                    400: '#8b80fb',
                    500: '#7c6ef7',
                    600: '#6b4ef0',
                    700: '#5b3dd4',
                    800: '#4c34ae',
                    900: '#40308a',
                    950: '#261d54',
                },
                neutral: {
                    50:  '#f8f8fc',
                    100: '#f0f0f8',
                    200: '#e2e2f0',
                    300: '#c8c8de',
                    400: '#9494b0',
                    500: '#6e6e90',
                    600: '#505074',
                    700: '#3a3a58',
                    800: '#252540',
                    850: '#1a1a32',
                    900: '#10101e',
                    950: '#08080f',
                },
                green:  colors.emerald,
                yellow: colors.amber,
                red:    colors.rose,
                blue:   colors.sky,
            },
 
            // ── BORDER RADIUS ─────────────────────────────────
            borderRadius: {
                'none': '0',
                'sm':   '0.375rem',
                DEFAULT:'0.625rem',
                'md':   '0.75rem',
                'lg':   '1rem',
                'xl':   '1.25rem',
                '2xl':  '1.5rem',
                '3xl':  '2rem',
                'full': '9999px',
            },
 
            // ── SHADOWS ────────────────────────────────────────
            boxShadow: {
                'glow-sm':    '0 0 12px 0 rgba(124,110,247,0.25)',
                'glow':       '0 0 24px 0 rgba(124,110,247,0.35)',
                'glow-lg':    '0 0 48px 0 rgba(124,110,247,0.45)',
                'inner-glow': 'inset 0 1px 0 0 rgba(255,255,255,0.06)',
                'card':       '0 4px 24px 0 rgba(0,0,0,0.35)',
                'card-hover': '0 8px 40px 0 rgba(0,0,0,0.5)',
            },
 
            // ── ANIMATIONS ────────────────────────────────────
            animation: {
                'fade-in':    'fadeIn 0.3s ease-out',
                'slide-up':   'slideUp 0.4s ease-out',
                'pulse-slow': 'pulse 3s cubic-bezier(0.4,0,0.6,1) infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%':   { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%':   { opacity: '0', transform: 'translateY(12px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
            },
 
            // ── BACKDROP BLUR ─────────────────────────────────
            backdropBlur: {
                xs:      '2px',
                sm:      '4px',
                DEFAULT: '8px',
                md:      '12px',
                lg:      '16px',
                xl:      '24px',
            },
        },
    },
    plugins: [],
};
