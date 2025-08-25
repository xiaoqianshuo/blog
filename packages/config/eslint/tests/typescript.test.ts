import tseslint from 'typescript-eslint'; // 引入 TypeScript 的 ESLint 配置
import { flatConfigs as importConfigs } from 'eslint-plugin-import'; // 引入 ESLint 的 import 插件，提供更好的 import 语法检查
import type { Linter } from 'eslint';
import { tsConfig } from '../src/typescript';
import { checkRules } from './utils';

describe('typescript eslint config', () => {
  it('inherits typescript recommended rules', () => {
    const config = tsConfig();
    checkRules(
      config.find(c => c.name === 'xiaoqianshuo-typescript')?.rules as Linter.RulesRecord,
      {
        ...tseslint.configs.recommended.reduce<Linter.RulesRecord>((acc, c) => {
          if (c.rules) Object.assign(acc, c.rules);
          return acc;
        }, {}),
        ...tseslint.configs.strict.reduce<Linter.RulesRecord>((acc, c) => {
          if (c.rules) Object.assign(acc, c.rules);
          return acc;
        }, {}),
        ...tseslint.configs.stylistic.reduce<Linter.RulesRecord>((acc, c) => {
          if (c.rules) Object.assign(acc, c.rules);
          return acc;
        }, {}),
        ...(importConfigs.typescript?.rules as Linter.RulesRecord),
      },
    );
  });
});
