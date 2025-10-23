import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    watch: {
      usePolling: true, // Enable polling for WSL
      interval: 300,    // Check every 300ms
    },
    hmr: {
      overlay: true, // Show errors as overlay
    },
  },
})
