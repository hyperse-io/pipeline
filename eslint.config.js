import { base, defineConfig } from '@hyperse/eslint-config-hyperse';

export default defineConfig([
  // ...typescript
  ...base,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/ban-types': 'off',
      '@eslint/prefer-rest-params': 'off',
      '@typescript-eslint/no-empty-object-type': 'warn',
    },
  },
]);
