import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import type { ConfigArray } from 'typescript-eslint';
import { config } from 'typescript-eslint';

// TODO is not tested
export function reactConfig({ typescript = false }: { typescript?: boolean }): ConfigArray {
  return config({
    files: ['**/*.jsx', ...(typescript ? ['**/*.tsx'] : [])],
    plugins: {
      'react': pluginReact,
      'react-hooks': pluginReactHooks,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...pluginReact.configs.recommended.rules,
      ...pluginReactHooks.configs.recommended.rules,
    },
  });
}
