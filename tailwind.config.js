/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryColor: "#edf2f8",   /* Tailwind: bg-blue-50 */
        secondaryColor: "#313bac", /* Tailwind: bg-indigo-600 */
        blackColor: "#030303",     /* Tailwind: bg-black */
        lightGrayColor: "#e4e4e4", /* Tailwind: bg-gray-200 */
        grayColor: "#6b7688",      /* Tailwind: bg-gray-600 */
        brownColor: "#46364a",     /* Tailwind: bg-gray-800 */
        whiteColor: "#ffffff",     /* Tailwind: bg-white */
      }
    },
  },
  plugins: [],
}