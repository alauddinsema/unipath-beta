
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				sans: ['Inter var', 'sans-serif'],
				display: ['SF Pro Display', 'Inter var', 'sans-serif']
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
                'fade-in': {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' }
                },
                'fade-out': {
                    '0%': { opacity: '1' },
                    '100%': { opacity: '0' }
                },
                'slide-up': {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' }
                },
                'slide-down': {
                    '0%': { transform: 'translateY(-20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' }
                },
                'scale-in': {
                    '0%': { transform: 'scale(0.95)', opacity: '0' },
                    '100%': { transform: 'scale(1)', opacity: '1' }
                },
                'soft-bounce': {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-5px)' }
                },
                'gradient-x': {
                    '0%, 100%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' }
                },
                'shimmer': {
                    '0%': { transform: 'translateX(-100%)' },
                    '100%': { transform: 'translateX(100%)' }
                },
                'pulse-subtle': {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0.8' }
                },
                'border-glow': {
                    '0%': { 
                        borderColor: 'hsl(var(--primary) / 0.2)',
                        boxShadow: '0 0 0 rgba(59, 130, 246, 0)' 
                    },
                    '50%': { 
                        borderColor: 'hsl(var(--primary) / 0.6)',
                        boxShadow: '0 0 10px rgba(59, 130, 246, 0.4)' 
                    },
                    '100%': { 
                        borderColor: 'hsl(var(--primary) / 0.2)',
                        boxShadow: '0 0 0 rgba(59, 130, 246, 0)' 
                    }
                },
                'aurora': {
                    '0%': { backgroundPosition: '0% 0%' },
                    '50%': { backgroundPosition: '100% 100%' },
                    '100%': { backgroundPosition: '0% 0%' }
                },
                'aurora-smooth': {
                    '0%': { backgroundPosition: '0% 0%' },
                    '25%': { backgroundPosition: '50% 25%' },
                    '50%': { backgroundPosition: '100% 50%' },
                    '75%': { backgroundPosition: '50% 75%' },
                    '100%': { backgroundPosition: '0% 0%' }
                },
                'aurora-slow': {
                    '0%': { backgroundPosition: '0% 0%' },
                    '50%': { backgroundPosition: '100% 50%' },
                    '100%': { backgroundPosition: '0% 0%' }
                },
                'aurora-fast': {
                    '0%': { backgroundPosition: '0% 0%' },
                    '25%': { backgroundPosition: '50% 25%' },
                    '50%': { backgroundPosition: '100% 100%' },
                    '75%': { backgroundPosition: '50% 75%' },
                    '100%': { backgroundPosition: '0% 0%' }
                }
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
                'fade-in': 'fade-in 0.5s ease-out forwards',
                'fade-out': 'fade-out 0.5s ease-out forwards',
                'slide-up': 'slide-up 0.5s ease-out forwards',
                'slide-down': 'slide-down 0.5s ease-out forwards',
                'scale-in': 'scale-in 0.3s ease-out forwards',
                'soft-bounce': 'soft-bounce 2s ease-in-out infinite',
                'gradient-x': 'gradient-x 10s ease infinite',
                'shimmer': 'shimmer 1.5s infinite',
                'pulse-subtle': 'pulse-subtle 3s ease-in-out infinite',
                'border-glow': 'border-glow 3s ease-in-out infinite',
                'border': 'gradient-x 3s linear infinite',
                'aurora': 'aurora 15s linear infinite',
                'aurora-smooth': 'aurora-smooth 30s ease infinite',
                'aurora-slow': 'aurora-slow 45s ease infinite',
                'aurora-fast': 'aurora-fast 10s ease infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
