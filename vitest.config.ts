import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      reporter: ['lcov', 'text-summary'],
      reportsDirectory: './coverage', // путь для отчета
    },
  },
});
