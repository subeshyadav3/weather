import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';


export default defineConfig({
  plugins: [preact()],
  base:/weather-app/,
  css: {
    postcss: './postcss.config.js',
  },
  build: {
    outDir: 'build',  // Change this to 'build' if you want the build folder to be named 'build'
  },
});
