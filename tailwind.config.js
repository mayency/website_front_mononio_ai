/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class', // אפשר גם 'media' אם תרצה לפי מערכת ההפעלה
    content: [
      "./app/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  }
  