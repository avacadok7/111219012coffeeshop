import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vite.dev/config/
export default defineConfig({
   base: '/',
  plugins: [
    tailwindcss(),
    react(),
    basicSsl(),],
  
    server: {
      https: true, // 👈 This turns on HTTPS locally
      port: 3000,  // optional: sets your port
    },

})
