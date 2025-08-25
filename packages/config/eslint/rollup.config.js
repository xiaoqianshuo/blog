import { defineConfig } from 'rollup';
import json from '@rollup/plugin-json';
import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import pkg from './package.json' with { type: 'json' };

/**
 * @type {import('rollup').InputPluginOption}
 */
const basePlugins = [
  nodeResolve(),
  commonjs(),
  typescript({ tsconfig: './tsconfig.json' }),
  json(),
];

/**
 * @type {import('rollup').InputPluginOption}
 */
const prodPlugins = [...basePlugins, terser()];

export default defineConfig({
  input: './src/index.ts',
  output: [
    {
      file: pkg.module ?? './dist/index.esm.js',
      format: 'esm',
    },
    {
      file: pkg.main ?? './dist/index.cjs.js',
      format: 'cjs',
      exports: 'named',
    },
  ],
  plugins: process.env.NODE_ENV === 'production' ? prodPlugins : basePlugins,
  external: [...Object.keys(pkg.dependencies || {})],
});
