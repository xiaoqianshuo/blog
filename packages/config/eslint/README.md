# @xiaoqianshuo/eslint-config

一个 ESLint 配置包，包含了 TypeScript 项目的统一代码风格配置。

## 安装

```bash
npm install @xiaoqianshuo/eslint-config
```

## 配置

前置依赖

```sh
npm install -D eslint
```

在项目的根目录下创建 `eslint.config.js` 文件，内容如下：

```js
import { eslintConfig } from '@xiaoqianshuo/eslint-config';

export default eslintConfig({
  envs: ['node', 'browser'],
  typescript: true,
  vue: false,
  react: false,
});
```
