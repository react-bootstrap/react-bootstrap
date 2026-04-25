import { coverageConfigDefaults, defineConfig } from 'vitest/config';
import { playwright } from '@vitest/browser-playwright';
import react from '@vitejs/plugin-react';

export default defineConfig({
  define: {
    __DEV__: true,
  },
  plugins: [react()],
  test: {
    include: ['test/**/*Spec.ts', 'test/**/*Spec.tsx'],
    setupFiles: ['vitest.setup.ts'],
    browser: {
      enabled: true,
      provider: playwright({
        contextOptions: {
          hasTouch: true,
        },
      }),
      instances: [
        {
          browser: 'chromium',
        },
        {
          browser: 'firefox',
        },
      ],
    },
    coverage: {
      provider: 'istanbul',
      exclude: [
        ...coverageConfigDefaults.exclude,
        'www/**',
        'tools/**',
        '**/*.js',
      ],
    },
  },
});
