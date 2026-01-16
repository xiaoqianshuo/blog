# API 请求核心模块

提供轻量级、灵活的 API 请求框架，具有以下特性：

- ✨ **类型安全**：完全的 TypeScript 支持，基于 [Zod](https://zod.dev) 进行运行时数据验证
- 🔌 **适配器模式**：支持任意 HTTP 客户端（内置 Fetch 适配器，可扩展自定义）
- 🏗️ **装饰器驱动**：使用 TypeScript 装饰器实现依赖注入和模块化管理
- 📦 **模块化设计**：自动 URL 拼接、请求头管理、错误处理等统一管理
- 🎯 **零配置**：默认使用 Fetch API，无需额外配置即可使用

## 核心概念

### 1. RequestAdapter（请求适配器）

请求适配器是框架的核心抽象层，所有 HTTP 库都需继承 `RequestAdapter` 并实现 `request()` 方法。

**内置适配器：**

- `FetchRequestAdapter`：基于 Fetch API（浏览器和 Node.js ≥18 原生支持）

**自定义适配器示例：**

```typescript
import axios from 'axios';
import { RequestAdapter, RequestConfig } from '@xiaoqianshuo/api-core';

export class AxiosAdapter extends RequestAdapter {
  async request<T>(config: RequestConfig<T>): Promise<T> {
    const response = await axios({
      url: config.url,
      method: config.method,
      params: config.params,
      data: config.data,
      headers: config.headers,
    });
    return response.data;
  }
}
```

### 2. BaseApi（基础 API 类）

`BaseApi` 提供通用的 HTTP 请求方法（GET、POST、PUT、PATCH、DELETE），所有业务 API 类需继承它。

**提供的方法签名：**

```typescript
protected get<T>(path: string, params: Record<string, string>, schema: z.ZodType<T>, headers?: Record<string, string>): Promise<T>
protected post<T>(path: string, body: Record<string, unknown>, schema: z.ZodType<T>, headers?: Record<string, string>): Promise<T>
protected put<T>(path: string, body: Record<string, unknown>, schema: z.ZodType<T>, headers?: Record<string, string>): Promise<T>
protected patch<T>(path: string, body: Record<string, unknown>, schema: z.ZodType<T>, headers?: Record<string, string>): Promise<T>
protected delete<T>(path: string, schema: z.ZodType<T>, headers?: Record<string, string>): Promise<T>
```

### 3. 装饰器

- **@Injectable()** （可选）：自动注入默认的 Fetch 适配器。如果不使用此装饰器，需在生成客户端实例时手动指定 `requestAdapter`
- **@ApiModule(baseUrl)** （可选）：指定 API 模块的基础路径，自动拼接到所有请求 URL。如果不使用此装饰器，则模块基础路径默认为空字符串

## 完整使用示例

### 第一步：定义数据模型和验证 Schema

```typescript
import z from 'zod';

// 定义用户 ID 类型
export const UserId = z.string().uuid().brand<'UserId'>();
export type UserId = z.infer<typeof UserId>;

// 定义用户对象的完整 schema
export const User = z.object({
  id: UserId,
  email: z.string().email(),
  name: z.string().min(1).max(100),
  detail: z
    .object({
      age: z.number().int().min(0).max(150).optional(),
      gender: z.enum(['male', 'female']).optional(),
    })
    .optional(),
  createdAt: z.string().datetime(),
});
export type User = z.infer<typeof User>;

// 定义创建用户请求的 schema
export const CreateUserRequest = User.pick({
  email: true,
  name: true,
  detail: true,
});
export type CreateUserRequest = z.infer<typeof CreateUserRequest>;

// 定义用户列表响应的 schema
export const UserListResponse = z.object({
  data: z.array(User),
  total: z.number(),
});
export type UserListResponse = z.infer<typeof UserListResponse>;
```

### 第二步：定义 API 客户端

```typescript
import { BaseApi, Injectable, ApiModule } from '@xiaoqianshuo/api-core';

/**
 * 用户模块 API 客户端
 * @Injectable() - 可选：自动注入 Fetch 适配器（如不使用，需在创建实例时手动传入）
 * @ApiModule('/api/v1/users') - 可选：指定模块基础路径（如不使用，默认为空）
 */
@Injectable()
@ApiModule('/api/v1/users')
export class UserApi extends BaseApi {
  /**
   * 获取用户列表
   * @param params 查询参数（如分页、排序等）
   */
  async listUsers(params?: Record<string, string>) {
    return await this.get('', params || {}, UserListResponse);
  }

  /**
   * 获取单个用户
   * @param userId 用户 ID
   */
  async getUser(userId: string) {
    return await this.get(`/${userId}`, {}, User);
  }

  /**
   * 创建新用户
   * @param data 用户信息
   */
  async createUser(data: CreateUserRequest) {
    return await this.post('', data, User);
  }

  /**
   * 更新用户信息
   * @param userId 用户 ID
   * @param data 更新数据
   */
  async updateUser(userId: string, data: Partial<CreateUserRequest>) {
    return await this.put(`/${userId}`, data, User);
  }

  /**
   * 删除用户
   * @param userId 用户 ID
   */
  async deleteUser(userId: string) {
    return await this.delete(`/${userId}`, User);
  }
}
```

**不使用装饰器的方式：**

```typescript
import { BaseApi } from '@xiaoqianshuo/api-core';

/**
 * 用户模块 API 客户端（不使用装饰器）
 */
export class UserApi extends BaseApi {
  async listUsers(params?: Record<string, string>) {
    return await this.get('', params || {}, UserListResponse);
  }

  async getUser(userId: string) {
    return await this.get(`/${userId}`, {}, User);
  }

  async createUser(data: CreateUserRequest) {
    return await this.post('', data, User);
  }

  async updateUser(userId: string, data: Partial<CreateUserRequest>) {
    return await this.put(`/${userId}`, data, User);
  }

  async deleteUser(userId: string) {
    return await this.delete(`/${userId}`, User);
  }
}
```

### 第三步：生成 API 客户端实例

**方式一：使用 @Injectable() 装饰器（推荐）**

```typescript
import { generateApiClient } from '@xiaoqianshuo/api-core';
import { UserApi } from './apis/user.api';

/**
 * 创建 API 客户端实例
 *
 * 支持多模块 API 结构：
 * - 扁平结构：{ user: UserApi, post: PostApi }
 * - 嵌套结构：{ v1: { user: UserApi }, v2: { user: UserApi } }
 */
export const api = generateApiClient({
  // 全局基础 URL
  baseUrl: 'http://localhost:3000',

  // API 模块树（使用 @Injectable() 装饰器无需指定 requestAdapter）
  apis: {
    user: UserApi,
    // post: PostApi,
  },
});
```

**方式二：不使用 @Injectable() 装饰器（手动传入适配器）**

```typescript
import { generateApiClient, FetchRequestAdapter } from '@xiaoqianshuo/api-core';
import { UserApi } from './apis/user.api';

export const api = generateApiClient({
  baseUrl: 'http://localhost:3000',

  // 不使用 @Injectable() 装饰器时，必须手动指定请求适配器
  requestAdapter: FetchRequestAdapter.getInstance(),

  apis: {
    user: UserApi,
  },
});
```

**方式三：同时不使用 @Injectable() 和 @ApiModule() 装饰器**

```typescript
import { generateApiClient, FetchRequestAdapter } from '@xiaoqianshuo/api-core';

export const api = generateApiClient({
  // 需要在这里指定完整的基础 URL（包括模块路径）
  baseUrl: 'http://localhost:3000/api/v1/users',

  requestAdapter: FetchRequestAdapter.getInstance(),

  apis: {
    user: UserApi,
  },
});
```

### 第四步：在应用中使用

```typescript
// 列出所有用户
const userList = await api.user.listUsers();
console.log(userList.data);

// 获取单个用户
const user = await api.user.getUser('550e8400-e29b-41d4-a716-446655440000');
console.log(user.name);

// 创建新用户
const newUser = await api.user.createUser({
  email: 'xiaoqianshuo@example.com',
  name: 'XiaoQianShuo',
  detail: {
    age: 25,
    gender: 'male',
  },
});
console.log(`Created user: ${newUser.id}`);

// 更新用户
const updated = await api.user.updateUser(newUser.id, {
  name: 'XiaoQianShuo Updated',
});

// 删除用户
await api.user.deleteUser(newUser.id);
```

## 高级用法

### 自定义请求适配器

```typescript
import { RequestAdapter, RequestConfig } from '@xiaoqianshuo/api-core';

export class CustomAdapter extends RequestAdapter {
  async request<T>(config: RequestConfig<T>): Promise<T> {
    // 自定义请求逻辑：添加认证、日志、拦截器等
    const token = localStorage.getItem('auth_token');

    const response = await fetch(config.url, {
      method: config.method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...config.headers,
      },
      body: config.data ? JSON.stringify(config.data) : undefined,
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return response.json();
  }
}

// 使用自定义适配器
export const api = generateApiClient({
  baseUrl: 'http://localhost:3000',
  requestAdapter: CustomAdapter.getInstance(),
  apis: {
    user: UserApi,
  },
});
```

### 嵌套 API 模块结构

```typescript
import { generateApiClient } from '@xiaoqianshuo/api-core';

export const api = generateApiClient({
  baseUrl: 'http://localhost:3000',
  apis: {
    v1: {
      user: UserApiV1,
      post: PostApiV1,
    },
    v2: {
      user: UserApiV2,
      post: PostApiV2,
    },
  },
});

// 使用嵌套结构
await api.v1.user.listUsers();
await api.v2.user.listUsers();
```

### 处理请求错误

由于所有 API 方法返回 Promise，可使用标准的错误处理：

```typescript
try {
  const user = await api.user.getUser('invalid-id');
} catch (error) {
  if (error instanceof Error) {
    console.error('Request failed:', error.message);
    // 可在这里添加错误恢复逻辑
  }
}
```

## API 配置选项

### generateApiClient 配置对象

```typescript
interface ApiClientConfig<T> {
  /**
   * API 树结构，定义了 API 模块和对应的 API 类
   */
  apis: T;

  /**
   * 基础 URL，用于所有 API 请求的前缀
   * @example 'http://localhost:3000'
   */
  baseUrl?: string;

  /**
   * 请求适配器，用于自定义请求逻辑（如添加认证头、请求日志等）
   * @default FetchRequestAdapter
   */
  requestAdapter?: RequestAdapter;
}
```

### RequestConfig 配置对象

```typescript
interface RequestConfig<T = unknown> {
  /** 请求 URL（相对路径） */
  url: string;

  /** HTTP 方法 */
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

  /** 响应数据验证 schema（Zod） */
  schema: z.ZodType<T>;

  /** URL 查询参数 */
  params?: Record<string, string>;

  /** 请求体数据 */
  data?: Record<string, unknown>;

  /** 请求头 */
  headers?: Record<string, string>;

  /** 兼容其他自定义配置字段 */
  [key: string]: unknown;
}
```

## 最佳实践

1. **始终定义 Schema**：为所有响应定义 Zod schema，确保类型安全
2. **模块化组织**：为不同的业务模块创建独立的 API 类
3. **单例适配器**：使用 `RequestAdapter.getInstance()` 获取单例实例
4. **类型推导**：充分利用 TypeScript 类型推导，无需手动标注类型
5. **错误处理**：统一处理请求错误和数据验证失败

## 依赖

- `zod`：^4.3.5 - 数据验证
- `reflect-metadata`：0.2.2 - 装饰器元数据支持

## 许可证

MIT
