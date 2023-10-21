// vite.config.js
import { resolve } from 'path';
import { defineConfig } from 'vite'

export default defineConfig({
  // ...
  // base: '',
  // root: 'src',
  build: {
    minify: true,
    rollupOptions: {
        input: {
            main: resolve(__dirname, 'index.html'),
            trailing: resolve(__dirname, 'src/pages/trailing/index.html'),
            fireworks: resolve(__dirname, 'src/pages/fireworks/index.html'),
            shooter: resolve(__dirname, 'src/pages/shooter/index.html'),
            physics: resolve(__dirname, 'src/pages/physics/index.html'),
        },
    }
  },
})