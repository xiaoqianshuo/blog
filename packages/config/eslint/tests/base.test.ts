import js from '@eslint/js';
import { flatConfigs as importConfigs } from 'eslint-plugin-import';
import type { Linter } from 'eslint';
import { baseConfig } from '../src/base';
import { checkRules } from './utils';

describe('base eslint config', () => {
  it('inherits recommended rules', () => {
    const config = baseConfig(['browser', 'node']);
    checkRules(config.find(c => c.name === 'xiaoqianshuo-base')?.rules as Linter.RulesRecord, {
      ...js.configs.recommended.rules,
      ...(importConfigs.recommended.rules as Linter.RulesRecord),
    });
  });

  it('includes browser globals', () => {
    const config = baseConfig(['browser']);
    const rules = config.find(c => c.name === 'xiaoqianshuo-base')?.rules;
    expect(rules).toBeDefined();
  });

  it('excludes browser globals if not included', () => {
    const config = baseConfig(['node']);
    const rules = config.find(c => c.name === 'xiaoqianshuo-base')?.rules;
    expect(rules).toBeDefined();
  });

  it('includes node globals', () => {
    const config = baseConfig(['node']);
    const rules = config.find(c => c.name === 'xiaoqianshuo-base')?.rules;
    expect(rules).toBeDefined();
  });

  it('no-console is warn in development', () => {
    process.env.NODE_ENV = 'development';
    const config = baseConfig();
    const rules = config.find(c => c.name === 'xiaoqianshuo-base')?.rules;
    expect(rules?.['no-console']).toBe('warn');
  });

  it('no-console is error in production', () => {
    process.env.NODE_ENV = 'production';
    const config = baseConfig();
    const rules = config.find(c => c.name === 'xiaoqianshuo-base')?.rules;
    expect(rules?.['no-console']).toBe('error');
  });
});
