import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';


export default defineConfig({
  plugins: [preact()],
  base:"/weather-app/",
  css: {
    postcss: './postcss.config.js',
  },
  build: {
    outDir: 'build',  
  },
});
