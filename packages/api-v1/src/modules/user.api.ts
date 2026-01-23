import z from 'zod';
import { CreateUser, User } from '@xiaoqianshuo/types';
import { ApiModule, BaseApi, Injectable } from '@xiaoqianshuo/api-core';

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
    return await this.get('', z.array(User));
  }

  async getUser(userId: string) {
    return await this.get(`/${userId}`, User);
  }

  async createUser(user: CreateUser) {
    return await this.post({
      path: '',
      schema: User,
      body: user,
    });
  }
}

export const userApi = new UserApi('http://localhost:3000/api');
