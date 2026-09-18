import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({

  base: '/supreme/',

  plugins: [react()],

  server: {
    proxy: {
      '/wp-json': {
        target: 'https://vanticosmeticos.com.br',
        changeOrigin: true,
        secure: true,
      },
    },
  },

})