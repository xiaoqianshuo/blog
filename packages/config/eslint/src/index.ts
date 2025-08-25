import type { ConfigArray } from 'typescript-eslint';
import { config } from 'typescript-eslint';
import { baseConfig } from './base';
import { tsConfig } from './typescript';
import { vueConfig } from './vue';
import { reactConfig } from './react';

export interface ESLintConfigOptions {
  envs?: ('node' | 'browser')[];
  typescript?: boolean;
  vue?: boolean | { jsx?: boolean };
  react?: boolean;
}

/**
 * @description 创建 eslint 配置
 * @param {ESLintConfigOptions} options
 * @returns {ConfigArray}
 */
export function createConfig({
  envs = ['browser', 'node'],
  typescript = false,
  vue = false,
  react = false,
}: ESLintConfigOptions = {}): ConfigArray {
  return config(
    ...baseConfig(envs),
    ...(typescript ? tsConfig() : []),
    ...(vue
      ? typeof vue === 'boolean'
        ? vueConfig({ typescript })
        : vueConfig({ jsx: vue.jsx, typescript })
      : []),
    ...(react ? reactConfig({ typescript }) : []),
  );
}
