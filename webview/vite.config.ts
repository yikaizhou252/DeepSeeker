import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // Ensure relative paths for VS Code Webview
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: 'index.html', // Ensures correct entry point
      },
      output: {
        entryFileNames: 'assets/index.js',  
        chunkFileNames: 'assets/[name].js', 
        assetFileNames: 'assets/[name][extname]' 
      },
    },
  },
});