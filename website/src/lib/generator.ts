import { createGenerator } from 'fumadocs-typescript';

/**
 * Shared TypeScript generator used by `<AutoTypeTable />` in MDX.
 *
 * The API tables read the package source through `tsconfig` paths
 * (`@hyperse/pipeline` -> `../src/index.ts`), so the website renders types
 * without depending on a pre-built `dist/` folder.
 */
export const generator = createGenerator({
  tsconfigPath: './tsconfig.json',
});
