import { base, defineConfig } from '@hyperse/eslint-config-hyperse';

export default defineConfig(
  [
    // ...typescript
    ...base,
    {
      rules: {
        'prefer-rest-params': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/ban-types': 'off',
        '@typescript-eslint/no-empty-object-type': 'off',
        '@typescript-eslint/no-unnecessary-type-constraint': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/prefer-as-const': 'off',
        '@typescript-eslint/no-unsafe-function-type': 'off',
      },
    },
    {
      files: ['**/*.{test,spec}.?(c|m)[jt]s?(x)'],
      rules: {
        // `expect` assertions inside try/catch + `if` guards are the clearest
        // way to test thrown errors and type-narrowed exit-pipe values.
        'vitest/no-conditional-expect': 'off',
      },
    },
  ],
  ['**/out', '**/website']
);
