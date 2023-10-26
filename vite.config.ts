import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 6600,
    open: true,
  },
  preview: {
    port: 6606,
    open: true,
  },
});
