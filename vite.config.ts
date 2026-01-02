import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  server: {
    host: true,
    port: 5173,
  },

  preview: {
    host: true,
    port: 4173,
    allowedHosts: [
      'trmmc.az',
      'www.trmmc.az'
    ],
  },

  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'animation': ['framer-motion'],
          'swiper': ['swiper'],
          'i18n': ['i18next', 'react-i18next'],
          'icons': ['react-icons'],
        },
      },
    },
  },
})
