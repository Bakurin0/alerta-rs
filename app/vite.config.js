import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api-defesa-civil': {
        target: 'https://redehidrometeorologica.defesacivil.rs.gov.br',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-defesa-civil/, ''),
        secure: false,
      },
    },
  },
})
