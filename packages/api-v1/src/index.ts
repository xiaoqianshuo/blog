import { generateApiClient } from '@xiaoqianshuo/api-core';
import { PostApi } from './modules/post.api';

export const { post: postApi } = generateApiClient({
  baseUrl: process.env.BASE_URL,
  apis: {
    post: PostApi,
  },
});
