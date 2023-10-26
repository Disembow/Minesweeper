import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 6600,
    open: true,
  },
  preview: {
    port: 6606,
    open: true,
  },
});
