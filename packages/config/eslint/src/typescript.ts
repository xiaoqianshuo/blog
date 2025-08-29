import tseslint from 'typescript-eslint'; // 引入 TypeScript 的 ESLint 配置
import type { ConfigArray } from 'typescript-eslint';
import { flatConfigs as importConfigs } from 'eslint-plugin-import'; // 引入 ESLint 的 import 插件，提供更好的 import 语法检查

export function tsConfig(): ConfigArray {
  return tseslint.config({
    name: 'xiaoqianshuo-typescript',
    files: ['**/*.{ts,tsx}'], // 仅针对 TypeScript 文件
    languageOptions: {
      parser: tseslint.parser, // 使用 TypeScript 解析器
      parserOptions: {
        ecmaVersion: 'latest', // 使用最新的 ECMAScript 版本
        sourceType: 'module', // 使用模块化源代码
        project: ['./tsconfig.eslint.json', './tsconfig.json'], // 使用 TypeScript 配置文件
        tsconfigRootDir: process.cwd(),
      },
    },
    extends: [
      tseslint.configs.recommended, // 使用 TypeScript 推荐的 ESLint 配置
      tseslint.configs.strict, // 强制更严格的规则
      tseslint.configs.stylistic, // 强制一致的代码风格
      importConfigs.typescript, // 使用 import 插件针对 TypeScript 的配置
    ],
    rules: {
      '@typescript-eslint/no-unused-vars': 'off', // ./base.ts --> unused-import
      '@typescript-eslint/no-explicit-any': 'warn', // 警告使用 any 类型
      '@typescript-eslint/explicit-function-return-type': 'off', // 允许不显式指定返回类型
      '@typescript-eslint/explicit-module-boundary-types': 'off', // 允许不显式指定模块边界类型
      '@typescript-eslint/no-duplicate-type-constituents': 'error', // 禁止重复的类型组成部分
      '@typescript-eslint/no-useless-constructor': ['error'], // 禁止无用的构造函数
      '@typescript-eslint/no-empty-interface': 'error', // 禁止空接口
      '@typescript-eslint/consistent-type-exports': 'error', // 强制类型导出的一致性
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports', // 优先使用类型导入
          fixStyle: 'separate-type-imports', // 强制分行导入类型
        },
      ],
    },
  });
}
