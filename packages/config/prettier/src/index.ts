import type { Config } from 'prettier';

export const config: Config = {
  semi: true,
  trailingComma: 'all',
  singleQuote: true,
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  bracketSpacing: true,
  arrowParens: 'avoid',
  quoteProps: 'consistent',
  htmlWhitespaceSensitivity: 'strict',
  vueIndentScriptAndStyle: true,
  singleAttributePerLine: true,
};
