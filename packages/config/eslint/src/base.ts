import js from '@eslint/js'; // 引入 ESLint 的基础配置
import globals from 'globals'; // 引入常见的全局变量定义，如浏览器和 Node.js
import eslintConfigPrettier from 'eslint-config-prettier'; // 引入 Prettier 的 ESLint 配置，避免与 Prettier 冲突
import { flatConfigs as importConfigs } from 'eslint-plugin-import'; // 引入 ESLint 的 import 插件，提供更好的 import 语法检查
import unusedImports from 'eslint-plugin-unused-imports';
import type { Config } from '@eslint/config-helpers';
import { defineConfig, globalIgnores } from '@eslint/config-helpers';

export function baseConfig(envs: ('browser' | 'node')[] = ['browser', 'node']): Config[] {
  const mergedGlobals = {
    ...(envs.includes('browser') ? globals.browser : {}),
    ...(envs.includes('node') ? globals.node : {}),
  };

  return defineConfig(
    globalIgnores([
      'build/',
      'dist/',
      'node_modules/',
      '**/*.min.js',
      '**/eslint.config.js',
      '**/rollup.config.js',
      '**/prettier.config.js',
      '**/*.d.ts',
    ]),
    {
      languageOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        globals: mergedGlobals,
      },
    },
    {
      name: 'xiaoqianshuo-base',
      extends: [js.configs.recommended, importConfigs.recommended], // 使用 ESLint 推荐的基础配置和 import 插件的推荐配置
      plugins: {
        'unused-imports': unusedImports,
      },
      rules: {
        'no-unused-vars': 'off', // --> unused-import
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn', // 修改: 在生产环境中禁用 console
        'consistent-return': 'error', // 强制所有返回语句都包含返回值
        'prefer-const': 'error', // 优先使用 const 声明变量
        'no-var': 'error', // 禁止使用 var 声明变量
        'arrow-body-style': ['error', 'as-needed'], // 箭头函数体风格：当函数体只有一行时，不需要大括号
        'arrow-parens': ['error', 'as-needed'], // 箭头函数的参数，当只有一个参数时不需要括号
        'no-multi-spaces': 'error', // 禁止多个空格
        'no-trailing-spaces': 'error', // 禁止行尾空格
        'object-curly-spacing': ['error', 'always'], // 强制花括号内始终有空格
        'array-bracket-spacing': ['error', 'never'], // 数组括号内不允许有空格
        'comma-dangle': ['error', 'always-multiline'], // 强制多行逗号前后有换行
        'semi': ['error', 'always'], // 强制使用分号
        'quotes': ['error', 'single', { avoidEscape: true }], // 强制使用单引号，允许字符串中使用双引号
        'indent': ['error', 2, { SwitchCase: 1 }], // 强制 2 个空格缩进
        'linebreak-style': ['error', 'unix'], // 强制使用 Unix 风格的换行
        'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }], // 限制多余的空行
        'eol-last': 'error', // 强制文件结尾有换行
        'space-before-function-paren': ['error', 'never'], // 禁止函数定义时括号前有空格
        'key-spacing': ['error', { beforeColon: false, afterColon: true }], // 强制对象字面量的冒号后有空格
        'space-infix-ops': 'error', // 强制操作符周围有空格
        'no-duplicate-imports': ['error', { allowSeparateTypeImports: true }], // 禁止重复的 import

        'import/enforce-node-protocol-usage': ['error', 'always'], // 强制内置节点导入使用该node:协议
        'import/no-unresolved': 'off', // 允许无法解析的 import
        'import/no-named-as-default': 'error', // 禁止将命名导入作为默认导入
        'import/no-commonjs': 'error', // 强制使用 ES6 模块语法（如果你在使用 ESLint 插件 eslint-plugin-import）
        'import/order': 'error',
        'unused-imports/no-unused-imports': 'error',
        'unused-imports/no-unused-vars': [
          'error',
          {
            vars: 'all',
            varsIgnorePattern: '^_',
            args: 'after-used',
            argsIgnorePattern: '^_',
          },
        ],
      },
    },
    eslintConfigPrettier, // 加载 Prettier 配置，确保 ESLint 和 Prettier 不冲突
  );
}
