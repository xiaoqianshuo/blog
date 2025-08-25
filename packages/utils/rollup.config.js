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
  typescript({ tsconfig: './tsconfig.json', outDir: undefined }),
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
      dir: './dist/esm',
      format: 'esm',
      preserveModules: true,
      preserveModulesRoot: 'src',
      sourcemap: true,
    },
    {
      dir: './dist/cjs',
      format: 'cjs',
      exports: 'named',
      preserveModules: true,
      preserveModulesRoot: 'src',
      sourcemap: true,
    },
    {
      dir: './dist/umd',
      format: 'umd',
      name: 'XiaoqianshuoUtils',
      sourcemap: true,
    },
  ],
  plugins: process.env.NODE_ENV === 'production' ? prodPlugins : basePlugins,
  external: [...Object.keys(pkg.dependencies || {})],
});
