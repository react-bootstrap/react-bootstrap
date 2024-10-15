import { coverageConfigDefaults, defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  define: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    __DEV__: true,
  },
  plugins: [react()],
  test: {
    include: ['test/**/*Spec.ts', 'test/**/*Spec.tsx'],
    setupFiles: ['vitest.setup.ts'],
    browser: {
      enabled: true,
      name: 'chromium',
      provider: 'playwright',
      providerOptions: {
        context: {
          hasTouch: true,
        },
      },
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
