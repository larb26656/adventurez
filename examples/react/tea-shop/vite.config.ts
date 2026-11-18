import tailwindcss from '@tailwindcss/vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: false,
      quoteStyle: 'single',
      semicolons: false,
    }),
    react(),
    tailwindcss(),
  ],
  test: {
    environment: 'jsdom',
    include: ['src/**/*.test.tsx'],
  },
})
