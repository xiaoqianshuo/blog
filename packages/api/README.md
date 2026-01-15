## example:

### 定义用户模块 API 客户端

```typescript
import z from 'zod';
import { BaseApi } from '@xiaoqianshuo/api';
import { ApiModule } from '@xiaoqianshuo/api';
import { Injectable } from '@xiaoqianshuo/api';

export const UserId = z.uuid().brand<'UserId'>();
export type UserId = z.infer<typeof UserId>;

export const User = z.object({
  id: UserId,
  email: z.email(),
  name: z.string().min(1),
  detail: z.object({
    age: z.number().int().min(0).optional(),
    gender: z.enum(['male', 'female']).optional(),
  }),
});
export type User = z.infer<typeof User>;

export const CreateUser = User.pick({
  email: true,
  name: true,
  detail: true,
});
export type CreateUser = z.infer<typeof CreateUser>;

interface IUserApi {
  listUsers(): Promise<User[]>;
  getUser(userId: string): Promise<User>;
  createUser(user: CreateUser): Promise<User>;
}

/**
 * 用户模块 API 客户端
 */
@Injectable()
@ApiModule('/user')
export class UserApi extends BaseApi implements IUserApi {
  async listUsers() {
    return await this.get('', {}, z.array(User));
  }

  async getUser(userId: string) {
    return await this.get(`/${userId}`, {}, User);
  }

  async createUser(user: CreateUser) {
    return await this.post('', user, User);
  }
}
```

### 生成 API 客户端实例

```typescript
import { generateApiClient } from '@xiaoqianshuo/api';
import { UserApi } from './user.api';

export const requestApi = generateApiClient({
  baseUrl: 'http://localhost:3000/api',
  apis: {
    user: UserApi,
  },
});
```

### 使用 API 客户端实例

```typescript
import { requestApi } from './api.client';

// 列出所有用户
requestApi.user.listUsers().then(console.log);

// 创建新用户
requestApi.user.createUser({ name: 'XiaoQianShuo' }).then(console.log);
```
