
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    allowedHosts: ['f1ef3b17-3503-40cb-ab9b-5bcbb0289879-00-aifof8whiu4f.pike.replit.dev']
  }
})
