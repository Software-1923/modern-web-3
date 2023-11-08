import { defineConfig } from 'rollup';
import html from '@rollup/plugin-html';

export default defineConfig({
  input: 'src/main.js', // Ana giriş dosyanızı burada belirtin
  // Diğer yapılandırma ayarları...
  plugins: [html()],
});
