import { coverageConfigDefaults, defineConfig } from 'vitest/config';
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
      provider: 'playwright',
      instances: [
        {
          browser: 'chromium',
          context: {
            hasTouch: true,
          },
        },
        {
          browser: 'firefox',
          context: {
            hasTouch: true,
          },
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
