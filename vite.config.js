import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ⚠️  Замени 'tashkent-guide' на название своего репозитория на GitHub
export default defineConfig({
  plugins: [react()],
  base: '/tashkent-guide/',
})
