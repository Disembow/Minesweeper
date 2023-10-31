/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/app/configs/setupTests.ts',
    css: {
      modules: {
        classNameStrategy: 'non-scoped',
      },
    },
  },
  server: {
    port: 6600,
    open: true,
  },
  preview: {
    port: 6606,
    open: true,
  },
  css: {
    devSourcemap: true,
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/app/styles/global/variables.scss";\n`,
      },
    },
  },
  resolve: {
    alias: {
      app: '/src/app',
      components: '/src/components',
      helpers: '/src/helpers',
    },
  },
});
