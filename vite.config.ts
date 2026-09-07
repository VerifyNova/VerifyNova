import { defineConfig } from 'vite';
import vinext from 'vinext';
import tailwindcss from '@tailwindcss/postcss';

export default defineConfig({
  css: { postcss: { plugins: [tailwindcss()] } },
  server: { host: '127.0.0.1', port: 3015, strictPort: true },
  plugins: [vinext()],
});
