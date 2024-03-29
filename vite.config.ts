// vite.config.js
import { resolve } from 'path';
import { defineConfig } from 'vite'

const root = resolve(__dirname, 'src');
const outDir = resolve(__dirname, 'dist');
export default defineConfig({
  // ...
  // base: '',
  // root: 'src',
  root,
  build: {
    minify: true,
    outDir,
    emptyOutDir: true,
    rollupOptions: {
        input: {
            main: resolve(root, 'index.html'),
            trailing: resolve(root, 'pages', 'trailing', 'index.html'),
            fireworks: resolve(root, 'pages', 'fireworks', 'index.html'),
            shooter: resolve(root, 'pages', 'shooter', 'index.html'),
            physics: resolve(root, 'pages', 'physics', 'index.html'),
        },
    }
  },
})