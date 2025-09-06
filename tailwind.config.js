/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
          950: '#2e1065',
        },
        royal: {
          purple: '#6B46C1',
          'purple-light': '#8B5CF6',
          'purple-dark': '#553C9A',
        },
        glass: {
          'white-10': 'rgba(255, 255, 255, 0.1)',
          'white-25': 'rgba(255, 255, 255, 0.25)',
          'white-90': 'rgba(255, 255, 255, 0.9)',
          'black-10': 'rgba(0, 0, 0, 0.1)',
          'purple-10': 'rgba(107, 70, 193, 0.1)',
        }
      },
      backgroundImage: {
        'gradient-purple': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'gradient-royal': 'linear-gradient(135deg, #6B46C1 0%, #8B5CF6 100%)',
        'gradient-subtle': 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      },
      boxShadow: {
        'glass': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(255, 255, 255, 0.05)',
        'glass-hover': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(255, 255, 255, 0.05)',
        'royal-glow': '0 4px 15px rgba(107, 70, 193, 0.3)',
        'royal-glow-lg': '0 8px 25px rgba(107, 70, 193, 0.4)',
      },
      backdropBlur: {
        '20': '20px',
      },
      borderRadius: {
        '24': '24px',
      },
      fontFamily: {
        'sf-pro': ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        'pulse-purple': 'pulse-purple 2s infinite',
        'shimmer': 'shimmer 2s infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-purple': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(107, 70, 193, 0.4)' },
          '50%': { boxShadow: '0 0 0 10px rgba(107, 70, 193, 0)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' },
        },
      },
    },
  },
  plugins: [],
}