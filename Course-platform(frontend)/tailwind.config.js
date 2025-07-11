// tailwind.config.js
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        fitzgerald: ['Fitzgerald', 'Arial', 'sans-serif'],
      },
      fontWeight: {
        thin: '100',
      },
      colors: {
        // Primary brand colors
        primary: '#B45B29',
        'primary-dark': '#8B3A1A',
        'primary-light': '#D97E4F',
        cream: '#ECEBE8',
        textColor: '#393128',
        
        // Secondary colors found in the project
        secondary: '#70533E',
        'secondary-light': '#bd6334',
        'secondary-hover': '#a65525',
        
        // UI state colors - using primary colors for consistency
        success: '#B45B29',  // Instead of green
        error: '#B45B29',    // Instead of red
        warning: '#D97E4F',  // Instead of yellow/amber
        info: '#8B3A1A',     // Instead of blue
        
        // Background colors
        'bg-light': '#f7f1e9', // Light cream background used in lessons
        
        // Social media button (if needed)
        google: '#4285F4',
        'google-hover': '#3367d6',
      }
    },
  },
  plugins: []
}
