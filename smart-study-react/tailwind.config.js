/** @type {import('tailwindcss').Config} */
export default {
  // ✅ GARANTA QUE ESTA LINHA ESTEJA CORRETA
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Diz para olhar todos os arquivos relevantes dentro de src
  ],
  theme: {
    extend: {
      colors: {
        'brand-purple': '#2A0E46',
        'brand-primary': '#5B21B6',
      },
    },
  },
  plugins: [],
}