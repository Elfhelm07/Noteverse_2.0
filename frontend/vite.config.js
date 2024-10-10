import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Remove or comment out these sections:
  // resolve: {
  //   alias: {
  //     'pdfjs-dist': path.resolve(__dirname, './node_modules/pdfjs-dist/build/pdf.js'),
  //   },
  // },
  // optimizeDeps: {
  //   include: ['react-pdf'],
  // },
  // build: {
  //   commonjsOptions: {
  //     include: [/node_modules/],
  //   },
  // },
});