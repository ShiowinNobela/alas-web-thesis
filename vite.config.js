import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import flowbiteReact from 'flowbite-react/plugin/vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), flowbiteReact()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000/',
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
    historyApiFallback: true,
  },
  build: {
    assetsInclude: ['**/*.ttf', '**/*.woff', '**/*.woff2'],
    outDir: 'dist',
    rollupOptions: {
      output: {
        // manualChunks: {
        //   // Create vendor bundles
        //   react: ['react', 'react-dom', 'react-router-dom'],
        //   ui: ['flowbite-react', 'framer-motion'],
        //   state: ['zustand'],
        //   utils: ['axios'],
        // },
      },
    },
  },
  base: '/',
});
