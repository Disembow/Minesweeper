/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { configDefaults } from 'vitest/dist/config.js';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/app/testing/setupTests.ts',
    css: {
      modules: {
        classNameStrategy: 'non-scoped',
      },
    },
    coverage: {
      provider: 'v8',
      all: true,
      reporter: ['text'],
      exclude: [
        ...configDefaults.coverage.exclude,
        'src/main.tsx',
        '**/.storybook/**',
        '**/db/**/*',
        '**/providers/store/**/*',
      ],
      reportsDirectory: './src/app/testing/unit/coverage',
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
