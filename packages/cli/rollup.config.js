import { defineConfig } from 'rollup';
import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';

export default defineConfig({
  input: 'src/index.ts',
  output: [
    {
      dir: './dist',
      format: 'cjs',
      preserveModules: true, // 保留模块结构
      preserveModulesRoot: 'src', // 把 src 作为根目录
      sourcemap: true,
    },
  ],
  plugins: [
    nodeResolve(),
    commonjs(),
    typescript({ tsconfig: './tsconfig.json' }),
    // 代码压缩
    terser(),
  ],
});
