import { base, defineConfig } from '@hyperse/eslint-config-hyperse';

export default defineConfig([
  // ...typescript
  ...base,
  {
    rules: {
      'prefer-rest-params': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/ban-types': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
    },
  },
]);
