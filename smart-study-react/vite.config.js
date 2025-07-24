import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path" // Importa o 'path' do Node.js

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Adicione este bloco 'resolve' para o apelido funcionar
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})