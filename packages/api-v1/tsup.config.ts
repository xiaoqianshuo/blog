import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/modules/**/*.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  sourcemap: true,
  splitting: false,
  clean: true,
  external: ['zod'],
});
