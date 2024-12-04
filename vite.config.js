import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';

export default defineConfig({
  plugins: [preact()],
  base: '/weather-app/',  // Ensures correct path handling for GitHub Pages
  css: {
    postcss: './postcss.config.js',  // Uses your custom PostCSS configuration
  },
  build: {
    outDir: 'build',  // Specifies the output directory as 'build'
  },
});
