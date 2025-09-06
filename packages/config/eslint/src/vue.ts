import pluginVue from 'eslint-plugin-vue';
import vueParser from 'vue-eslint-parser';
import type { ConfigArray } from 'typescript-eslint';
import { config, parser as tsParser } from 'typescript-eslint';

// TODO is not tested
export function vueConfig({
  jsx = false,
  typescript = false,
}: {
  jsx?: boolean;
  typescript?: boolean;
}): ConfigArray {
  return config(...pluginVue.configs['flat/essential'], {
    files: ['**/*.vue', ...(jsx ? ['**/*.jsx'] : []), ...(typescript && jsx ? ['**/*.tsx'] : [])],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        ...(typescript ? { parser: tsParser } : {}),
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx },
        project: ['./tsconfig.eslint.json', './tsconfig.json'], // 使用 TypeScript 配置文件
        tsconfigRootDir: process.cwd(),
        extraFileExtensions: ['.vue'],
      },
    },
    rules: {},
  });
}
