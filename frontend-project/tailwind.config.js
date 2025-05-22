/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", // Include the index.html file in the root
    "./src/**/*.{js,ts,jsx,tsx}", // Include all JS/TS/JSX/TSX files in src
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1D4ED8', // Blue for buttons and headers
        secondary: '#F3F4F6', // Light gray for backgrounds
        accent: '#10B981', // Green for success messages
        danger: '#EF4444', // Red for delete buttons and errors
        textPrimary: '#1F2937', // Dark gray for text
        textSecondary: '#6B7280', // Lighter gray for secondary text
      },
    },
  },
  plugins: [],
};