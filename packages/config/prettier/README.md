# @xiaoqianshuo/prettier-config

一个 Prettier 配置包，包含了 TypeScript 项目的统一代码风格配置。

## 安装

```bash
npm install @xiaoqianshuo/prettier-config
```

## 配置

前置依赖

```sh
npm install -D prettier
```

在项目的根目录下创建 `prettier.config.js` 文件，内容如下：

```js
import { config } from '@xiaoqianshuo/prettier-config';

export default config;
```
