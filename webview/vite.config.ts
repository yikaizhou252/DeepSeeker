import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'


export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: './', // Ensure relative paths for VS Code Webview
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: 'index.html', // Ensures correct entry point
      },
      output: {
        format: 'es',  // Ensures that output is in module format
        entryFileNames: 'assets/index.js',  
        chunkFileNames: 'chunks/[name].js', 
        // assetFileNames: 'assets/[name][extname]' 
      },
      watch: {
        exclude: ['**/dist/chunks/*'] // Exclude certain paths (like static assets) from triggering rebuilds
      }
    },
  },
});