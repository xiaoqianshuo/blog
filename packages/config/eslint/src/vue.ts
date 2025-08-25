import pluginVue from 'eslint-plugin-vue';
import vueParser from 'vue-eslint-parser';
import type { ConfigArray } from 'typescript-eslint';
import { config } from 'typescript-eslint';

// TODO is not tested
export function vueConfig({
  jsx = false,
  typescript = false,
}: {
  jsx?: boolean;
  typescript?: boolean;
}): ConfigArray {
  return config(...pluginVue.configs['flat/recommended'], {
    files: ['**/*.vue', ...(jsx ? ['**/*.jsx'] : []), ...(typescript && jsx ? ['**/*.tsx'] : [])],
    languageOptions: {
      parserOptions: {
        parser: vueParser,
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx },
      },
    },
    rules: {},
  });
}
