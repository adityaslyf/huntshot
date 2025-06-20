/** @type {import('tailwindcss').Config} */
import tailwindcssAnimate from "tailwindcss-animate";

export default {
    darkMode: ["class"],
    content: [
        './pages/**/*.{ts,tsx}',
        './components/**/*.{ts,tsx}',
        './app/**/*.{ts,tsx}',
        './src/**/*.{ts,tsx}',
    ],
    prefix: "",
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        fontFamily: {
            'sans': ['Urbanist', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
            'display': ['Urbanist', 'system-ui', '-apple-system', 'sans-serif'],
            'heading': ['Urbanist', 'system-ui', '-apple-system', 'sans-serif'],
            'mono': ['Urbanist', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        },
        extend: {
            colors: {
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
                "2xl": "1rem",
                "3xl": "1.5rem",
                "4xl": "2rem",
            },
            scale: {
                '102': '1.02',
                '103': '1.03',
                '105': '1.05',
            },
            keyframes: {
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
                wave: {
                    '0%, 100%': { transform: 'scaleY(1)' },
                    '50%': { transform: 'scaleY(0.5)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                pulse: {
                    '0%, 100%': { opacity: 1 },
                    '50%': { opacity: 0.5 },
                },
                'pulse-slow': {
                    '0%, 100%': { opacity: 0.8 },
                    '50%': { opacity: 0.4 },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-1000px 0' },
                    '100%': { backgroundPosition: '1000px 0' },
                },
                'shine-slow': {
                    '100%': { 
                        transform: 'translateX(100%)',
                    },
                },
                'float-slow': {
                    '0%, 100%': { transform: 'translateY(0) scale(1)' },
                    '50%': { transform: 'translateY(-15px) scale(1.05)' },
                },
                morphBlob: {
                    '0%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
                    '50%': { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' },
                    '100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
                }
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
                'wave': 'wave 1.2s linear infinite',
                'bounce-delay': 'bounce 1s infinite',
                'float': 'float 3s ease-in-out infinite',
                'float-slow': 'float-slow 8s ease-in-out infinite',
                'pulse-slow': 'pulse-slow 6s ease-in-out infinite',
                'shimmer': 'shimmer 2s linear infinite',
                'shine-slow': 'shine-slow 6s ease-in-out infinite',
                'morph': 'morphBlob 8s ease-in-out infinite',
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from var(--angle), var(--tw-gradient-stops))',
                'gradient-mesh': 'linear-gradient(to right top, #051937, #004d7a, #008793, #00bf72, #a8eb12)',
            },
            boxShadow: {
                'neon': '0 0 5px theme(colors.primary.DEFAULT), 0 0 20px theme(colors.primary.DEFAULT)',
                'neon-lg': '0 0 10px theme(colors.primary.DEFAULT), 0 0 30px theme(colors.primary.DEFAULT)',
                'inner-glow': 'inset 0 0 20px rgba(255,255,255,0.5)',
            },
        },
    },
    plugins: [
        tailwindcssAnimate,
        function ({ addUtilities, matchUtilities, theme }) {
            const newUtilities = {}
            for (let i = 1; i <= 10; i++) {
                newUtilities[`.animation-delay-${i * 100}`] = {
                    'animation-delay': `${i * 0.1}s`,
                }
            }
            addUtilities(newUtilities)
            
            // Add a plugin for variable properties
            matchUtilities(
                {
                    'bg-gradient-to': (value) => ({
                        'background-image': `linear-gradient(to ${value}, var(--tw-gradient-stops))`,
                    }),
                },
                { values: theme('bgGradientDirections', {}) }
            )
            
            // Add CSS variables for custom properties
            addUtilities({
                ':root': {
                    '--angle': '0deg',
                }
            })
        },
    ],
}
