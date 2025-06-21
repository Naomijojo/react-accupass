/** @type {import('tailwindcss').Config} */
export default {
    content: [ // 新增
      "./index.html",
      "./src/**/*.{vue,js,ts,jsx,tsx}", 
    ],
    theme: {
      extend: {},
      screens: {
        'lg': '1080px',
        'lgx': '1080px',        
        // 'xl': '1280px',         
        // '2xl': '1440px',
        // '3xl': '1600px',        
      },
    },
    plugins: [],
  }