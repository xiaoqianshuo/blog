import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/modules/**/*.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  sourcemap: true,
  splitting: false,
  clean: true,
  external: ['zod'],
  define: {
    'process.env.BASE_URL': JSON.stringify(process.env.BASE_URL),
  },
});
