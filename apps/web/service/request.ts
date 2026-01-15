import { generateApiClient } from '@xiaoqianshuo/api'
import { UserApi } from '@xiaoqianshuo/api/user.api';


export const requestApi = generateApiClient({
  baseUrl: 'http://localhost:3000/api',
  apis: {
    user: UserApi,
  },
});
