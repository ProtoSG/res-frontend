/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        primary: {
          100: '#596E79',
          200: '#788e98',
          300: '#F0F5F9',
        },
        accent: {
          100: '#788189',
          200: '#e1e4e6',
        },
        text: {
          100: '#1E2022',
          200: '#52616B',
        },
        bg: {
          100: '#F0ECE3',
          200: '#DFD3C3',
          300: '#C7B198',
        },
        accept:{
          100: '#FF5733',
        }
      },
    },
  },
  plugins: [],
}

