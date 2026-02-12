import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  // [重要] 請確保 '/kprompt-v2/' 與您未來的 GitHub 倉庫名稱完全一致
  base: '/kprompt-v2/', 
})