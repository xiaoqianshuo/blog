import { generateApiClient } from '@xiaoqianshuo/api-core';
import { UserApi } from './modules/user.api';

export const { user: userApi } = generateApiClient({
  baseUrl: 'http://localhost:3000/api',
  apis: {
    user: UserApi,
  },
});
