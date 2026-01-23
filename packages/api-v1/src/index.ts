import { generateApiClient } from '@xiaoqianshuo/api-core';
import { UserApi } from './modules/user.api';

export const { user: userApi } = generateApiClient({
  baseUrl: process.env.BASE_URL,
  apis: {
    user: UserApi,
  },
});
