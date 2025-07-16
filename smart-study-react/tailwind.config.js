/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // garante que Tailwind seja aplicado em todos os arquivos React
  ],
  theme: {
    extend: {
      colors: {
        primary: '#5D3FD3',     // Roxo escuro
        darkblue: '#1E1E2F',    // Azul escuro
      },
    },
  },
  plugins: [],
};
