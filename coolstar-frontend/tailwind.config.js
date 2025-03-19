/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'media',
    theme: {
      extend: {
        colors: {
          primary: '#00BFFF', // Deep Sky Blue
          secondary: '#121212', // Near Black
          accent: '#f9f9f9', // Off-White
          dark: '#0A0A0A', // Darker Black for contrast
          neon: {
            blue: '#00F0FF', // Neon Blue
            purple: '#9D00FF', // Neon Purple
            pink: '#FF00E4', // Neon Pink
            green: '#00FF8F', // Neon Green
            white: '#FFFFFF', // Neon White
          },
          blue: {
            light: '#00CCFF', // Bright Cyan Blue
            DEFAULT: '#0077FF', // Vibrant Blue
            dark: '#0055CC', // Deeper Blue
            deepDark: '#001133', // Navy Blue
          },
          gray: {
            light: '#E2E8F0', // Light gray with blue tint
            DEFAULT: '#94A3B8', // Medium gray with blue tint
            dark: '#334155', // Dark gray with blue tint
          },
          dark: {
            DEFAULT: '#000814', // Dark Blue-Black
            light: '#101830', // Slightly lighter dark
            lighter: '#1C2840', // Even lighter dark
          },
        },
        backgroundImage: {
          'grid-pattern': "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%230077FF\" fill-opacity=\"0.1\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
          'dots-pattern': "url('data:image/svg+xml,%3Csvg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"%230077FF\" fill-opacity=\"0.1\" fill-rule=\"evenodd\"%3E%3Ccircle cx=\"3\" cy=\"3\" r=\"1\"/%3E%3Ccircle cx=\"13\" cy=\"13\" r=\"1\"/%3E%3C/g%3E%3C/svg%3E')",
          'wave-pattern': "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 1200 120\" xmlns=\"http://www.w3.org/2000/svg\" preserveAspectRatio=\"none\"%3E%3Cpath d=\"M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z\" opacity=\".15\" fill=\"%230077FF\"/%3E%3C/svg%3E')",
          'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
          'blue-black-gradient': 'linear-gradient(to right, #000814, #0055CC, #000814)',
          'cyber-grid': 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%2300BFFF\' fill-opacity=\'0.3\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        },
        boxShadow: {
          'neon-blue': '0 0 5px #00F0FF, 0 0 10px #00F0FF, 0 0 15px #00F0FF',
          'neon-purple': '0 0 5px #9D00FF, 0 0 10px #9D00FF, 0 0 15px #9D00FF',
          'neon-pink': '0 0 5px #FF00E4, 0 0 10px #FF00E4, 0 0 15px #FF00E4',
          'neon-green': '0 0 5px #00FF8F, 0 0 10px #00FF8F, 0 0 15px #00FF8F',
          'neon-white': '0 0 5px #FFFFFF, 0 0 10px #FFFFFF, 0 0 15px #FFFFFF',
          'neon-glow': '0 0 7px rgba(0, 240, 255, 0.7), 0 0 10px rgba(0, 240, 255, 0.5), 0 0 21px rgba(0, 240, 255, 0.3)',
          'neon-text': '0 0 5px rgba(0, 240, 255, 0.8)',
          'card': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          'card-hover': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 15px rgba(0, 119, 255, 0.3)',
          'inner-dark': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.3)',
        },
        dropShadow: {
          'glow': '0 0 6px rgba(0, 240, 255, 0.8)',
          'white-glow': '0 0 6px rgba(255, 255, 255, 0.8)',
        },
        animation: {
          'float': 'float 6s ease-in-out infinite',
          'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          'flicker': 'flicker 3s linear infinite',
          'fade-in': 'fadeIn 0.5s ease-out forwards',
          'slide-up': 'slideUp 0.5s ease-out forwards',
          'slide-right': 'slideRight 0.5s ease-out forwards',
          'zoom-in': 'zoomIn 0.5s ease-out forwards',
          'glow': 'glow 2s ease-in-out infinite alternate',
          'rotate-slow': 'rotate 15s linear infinite',
          'spin-slow': 'spin 20s linear infinite',
          'ripple': 'ripple 3s linear infinite',
          'twinkling': 'twinkling 4s ease-in-out infinite',
          'shooting-star': 'shootingStar 5s ease-out infinite',
          'orbit': 'orbit 20s linear infinite',
          'orbit-reverse': 'orbit 25s linear infinite reverse',
        },
        keyframes: {
          float: {
            '0%, 100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-20px)' },
          },
          pulse: {
            '0%, 100%': { opacity: '1' },
            '50%': { opacity: '0.5' },
          },
          flicker: {
            '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': { opacity: '1' },
            '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': { opacity: '0.5' },
          },
          fadeIn: {
            '0%': { opacity: '0' },
            '100%': { opacity: '1' },
          },
          slideUp: {
            '0%': { transform: 'translateY(20px)', opacity: '0' },
            '100%': { transform: 'translateY(0)', opacity: '1' },
          },
          slideRight: {
            '0%': { transform: 'translateX(-20px)', opacity: '0' },
            '100%': { transform: 'translateX(0)', opacity: '1' },
          },
          zoomIn: {
            '0%': { transform: 'scale(0.9)', opacity: '0' },
            '100%': { transform: 'scale(1)', opacity: '1' },
          },
          glow: {
            '0%': { boxShadow: '0 0 5px rgba(0, 240, 255, 0.5), 0 0 10px rgba(0, 240, 255, 0.3)' },
            '100%': { boxShadow: '0 0 10px rgba(0, 240, 255, 0.8), 0 0 20px rgba(0, 240, 255, 0.6), 0 0 30px rgba(0, 240, 255, 0.4)' },
          },
          rotate: {
            '0%': { transform: 'rotate(0deg)' },
            '100%': { transform: 'rotate(360deg)' },
          },
          ripple: {
            '0%': { transform: 'scale(0.8)', opacity: 1 },
            '100%': { transform: 'scale(1.5)', opacity: 0 },
          },
          twinkling: {
            '0%, 100%': { opacity: 0.3 },
            '50%': { opacity: 1 },
          },
          shootingStar: {
            '0%': { 
              transform: 'translateX(0) translateY(0) rotate(35deg)',
              opacity: 0 
            },
            '15%': { 
              opacity: 1,
            },
            '30%': { 
              transform: 'translateX(200px) translateY(200px) rotate(35deg)',
              opacity: 0 
            },
            '100%': { 
              transform: 'translateX(200px) translateY(200px) rotate(35deg)',
              opacity: 0 
            },
          },
          orbit: {
            '0%': { transform: 'rotate(0deg) translateX(100px) rotate(0deg)' },
            '100%': { transform: 'rotate(360deg) translateX(100px) rotate(-360deg)' },
          },
        },
        fontFamily: {
          sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
          mono: ['JetBrains Mono', 'monospace'],
        },
        borderRadius: {
          'xl': '1rem',
          '2xl': '1.5rem',
          '3xl': '2rem',
        },
        spacing: {
          '72': '18rem',
          '84': '21rem',
          '96': '24rem',
          '128': '32rem',
        },
      },
    },
    plugins: [],
}
  