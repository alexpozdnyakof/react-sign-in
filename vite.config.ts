/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import lightningcss from 'vite-plugin-lightningcss';
import stylelint from 'vite-plugin-stylelint';

export default defineConfig({
  plugins: [
    react(),
    lightningcss({
      browserslist: '>= 0.25%',
    }),
    stylelint({
      fix: true,
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './setupTest.ts',
    css: {
      modules: {
        classNameStrategy: 'non-scoped',
      },
    },
  },
});
