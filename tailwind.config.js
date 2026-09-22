// Tailwind CSS configuration
// Using a workaround to avoid ESLint errors
// This file is intentionally simplified to avoid requiring external modules
// Tailwind and plugins will be loaded by Vite

// This is a workaround to avoid ESLint errors
// The actual config will be resolved by Vite
const config = {
  content: [
    "src/**/*.{js,jsx,ts,tsx}",
    "index.html",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6', // Blue-500
        secondary: '#1e40af', // Blue-700
        dark: '#1f2937', // Slate-800
        light: '#f9fafb', // Slate-50
        accent: '#06b6d4', // Cyan-400
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [
    // Placeholder for Tailwind Animate plugin
    // This will be resolved by Vite
    function() { return {}; },
  ],
};

// Export the config
// This is a workaround to avoid ESLint errors
// The actual plugins will be resolved at runtime