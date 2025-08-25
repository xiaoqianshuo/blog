# @xiaoqianshuo/utils

一个支持浏览器和 Node.js 的 TypeScript 工具库，提供任务队列、事件系统、节流函数等常用工具。

## 目录

- [安装](#安装)
- [特性](#特性)
- [快速开始](#快速开始)
  - [TaskQueue 任务队列](#taskqueue-任务队列)
  - [eventEmitter 事件系统](#eventemitter-事件系统)
  - [throttle 节流函数](#throttle-节流函数)
- [开发指南](#开发指南)
- [目录结构](#目录结构)
- [贡献](#贡献)

## 安装

```bash
npm install @xiaoqianshuo/utils
# 或
yarn add @xiaoqianshuo/utils
# 或
pnpm add @xiaoqianshuo/utils
```

## 特性

### 🌟 核心优势

- **双环境支持**：无缝运行于浏览器和 Node.js 环境
- **类型安全**：使用 TypeScript 开发，提供完整类型定义
- **模块化设计**：支持 Tree Shaking，减小打包体积
- **多种模块格式**：同时提供 ESM、CommonJS 和 UMD 格式

### 🔧 开发特性

- **代码质量**：使用 ESLint + Prettier 保证代码风格一致性
- **现代构建**：基于 Rollup 打包，输出优化后的代码
- **最新依赖**：所有依赖保持最新稳定版本

## 快速开始

### TaskQueue 任务队列

**适用场景**：需要控制任务执行顺序（串行/并行）的场景，如批量API请求、分步数据处理等。

```js
import { TaskQueue } from '@xiaoqianshuo/utils';

// 初始化任务队列，支持错误日志回调
const queue = new TaskQueue({
  error: (...args) => console.error('[TaskQueue Error]', ...args),
});

// 事件监听
queue.onTaskCompleted(result => {
  console.log('任务完成:', result);
});
queue.onTaskSuccess(result => {
  console.log('任务成功:', result);
});
queue.onTaskFailed(result => {
  console.log('任务失败:', result);
});

// 添加串行任务（同一key的任务按顺序执行）
queue.enqueue('user', async () => {
  await new Promise(res => setTimeout(res, 1000));
  return '用户数据1';
});
queue.enqueue('user', async () => {
  await new Promise(res => setTimeout(res, 1000));
  return '用户数据2';
});

// 添加并行任务（不同key的任务同时执行）
queue.enqueue('order', async () => {
  await new Promise(res => setTimeout(res, 1500));
  return '订单数据1';
});
```

**输出结果**：

```sh
任务成功: { key: 'user', returnValue: '用户数据1', success: true }
任务成功: { key: 'order', returnValue: '订单数据1', success: true }
任务成功: { key: 'user', returnValue: '用户数据2', success: true }
```

### eventEmitter 事件系统

**适用场景**：组件通信、状态管理、自定义事件处理等场景。

```js
import { eventEmitter } from '@xiaoqianshuo/utils';

// 定义事件监听器
const handleEvent = data => {
  console.log('事件触发:', data);
};

// 订阅事件
eventEmitter.on('userLogin', handleEvent);

// 发布事件
eventEmitter.emit('userLogin', {
  username: 'xiaoqianshuo',
  timestamp: Date.now(),
});

// 取消订阅
eventEmitter.off('userLogin', handleEvent);

// 订阅一次性事件（触发后自动取消）
eventEmitter.once('dataLoaded', () => {
  console.log('数据已加载');
});
```

### throttle 节流函数

**适用场景**：限制高频触发事件（如滚动、 resize、按钮点击）的执行频率。

#### 基础同步节流 throttle

```js
import { throttle } from '@xiaoqianshuo/utils';

// 创建节流函数（2秒内最多执行一次）
const logMessage = throttle(
  message => {
    console.log('执行:', message);
  },
  2000, // 节流间隔（毫秒）
  {
    leading: false, // 首次触发时是否立即执行（默认true）
    trailing: true, // 间隔结束后是否执行最后一次（默认true）
  },
);

// 连续调用
logMessage('消息1'); // 被节流
logMessage('消息2'); // 被节流
logMessage('消息3'); // 2秒后执行
```

#### 基础异步节流 throttleAsync

```js
import { throttleAsync } from '@xiaoqianshuo/utils';

// 创建异步节流函数
const fetchData = throttleAsync(
  async userId => {
    const response = await fetch(`/api/user/${userId}`);
    return response.json();
  },
  3000, // 节流间隔
);

// 连续调用
fetchData(1).then(data => console.log('用户数据:', data));
fetchData(2); // 被节流
```

#### 分组同步节流 groupThrottle

**适用场景**：需要按key分别节流的场景（如多用户操作、多资源请求）。

```js
import { groupThrottle } from '@xiaoqianshuo/utils';

// 按用户ID分组的操作节流
const userAction = groupThrottle(
  (userId, action) => {
    console.log(`用户${userId}执行了${action}`);
  },
  2000, // 节流间隔
  { leading: false, trailing: true },
  5 * 60 * 1000, // 闲置key自动清理时间（默认5分钟）
);

// 不同用户独立节流
userAction('user1', '点赞');
userAction('user1', '评论'); // 被节流
userAction('user2', '关注'); // 独立执行
```

#### 分组异步节流 groupThrottleAsync

```js
import { groupThrottleAsync } from '@xiaoqianshuo/utils';

// 按资源类型分组的请求节流
const fetchResource = groupThrottleAsync(async (resourceType, id) => {
  return await fetch(`/api/${resourceType}/${id}`);
}, 3000);

// 不同资源类型独立节流
fetchResource('post', 1);
fetchResource('post', 2); // 被节流
fetchResource('comment', 1); // 独立执行
```

## 开发指南

### 环境准备

```bash
# 克隆仓库
git clone https://github.com/xiaoqianshuo/utils.git
cd utils

# 安装依赖
npm install
```

### 开发命令

```bash
# 构建生产版本
npm run build

# 代码风格检查
npm run lint

# 自动修复代码风格
npm run lint:fix

# 格式化代码
npm run format
```

## 目录结构

- `src/` 源码目录
- `dist/` 打包输出目录
  - `index.js` 打包后的 JS 文件
  - `types/` 类型定义目录
    - `index.d.ts` 类型定义文件

## 贡献

欢迎 PR 和 issue！
