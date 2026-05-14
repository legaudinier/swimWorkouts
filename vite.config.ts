import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/swimWorkouts/',
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://localhost:3001'
    }
  }
})

