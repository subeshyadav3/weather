import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';

export default defineConfig({
  plugins: [preact()],
  base: '/weather-app/',  // Corrected this line
  css: {
    postcss: './postcss.config.js',
  },
  build: {
    outDir: 'build',  // This specifies the output directory as 'build'
  },
});
