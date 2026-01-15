import z from 'zod';
import { User } from '@xiaoqianshuo/types';
import { Injectable, ApiModule, BaseApi } from '@xiaoqianshuo/api'

/**
 * 用户模块 API 客户端
 */
@Injectable()
@ApiModule('/user')
export class UserApi extends BaseApi {
  async listUsers() {
    return await this.get('', {}, z.array(User));
  }

  async getUser(userId: string) {
    return await this.get(`/${userId}`, {}, User);
  }
}
