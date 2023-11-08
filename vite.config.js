import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import checker from 'vite-plugin-checker';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), checker()],
  server: {
    host: '0.0.0.0',
  },
  build: {
    rollupOptions: {
      input: {
        main: 'data.js',
        index: 'public/index.html',
      },
    },
  },
  optimizeDeps: {
    include: ['vite-plugin-checker'],
  },
  checker: {
    errorScreen: {
      // 404 hata durumu için yönlendirme
      404: 'dist/error-page/404.html',
      // Diğer hata durumları için yönlendirme eklemek için buraya ekleyebilirsiniz
    },
  },
});
