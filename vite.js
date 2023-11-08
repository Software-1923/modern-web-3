import react from '@vitejs/plugin-react';
import legacy from '@vitejs/plugin-legacy';
import compression from 'vite-plugin-compression-v2';
import historyFallback from 'connect-history-api-fallback';
// Ekledik

const app = require('./data.js'); // Express uygulamasını içe aktar

const getConfig = ({ command, mode }) => ({
  server: {
    host: '0.0.0.0',
    hmr: {
      clientPort: 443,
    },
    middleware: [
      // connect-history-api-fallback middleware'i ekleyin
      historyFallback(),
    ],
  },
  plugins: [
    react(),
    legacy(),
    compression({
      verbose: true,
      disable: false,
      threshold: 10240,
      filter: /\.(js|css|html|svg)$/,
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});

app.listen(3000, () => {
  console.log(`Sunucu 3000 portunda çalışıyor.`);
});

export default getConfig;