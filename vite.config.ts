import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // Подключаем поддержку React и Tailwind.
  plugins: [react(), tailwindcss()],
})