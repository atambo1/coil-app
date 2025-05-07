import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    // This ensures Vercel uses SPA fallback correctly
    rollupOptions: {
      input: '/index.html'
    }
  }
});
