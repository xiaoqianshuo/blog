import { ApiModule, BaseApi, Injectable } from '@xiaoqianshuo/api-core';
import { Post } from '@xiaoqianshuo/types';
import z from 'zod';

interface IPostApi {
  listPosts(): Promise<Post[]>;
  getPost(slug: string): Promise<Post>;
  getFeaturedPosts(): Promise<Post[]>;
  getRecentPosts(n?: number): Promise<Post[]>;
  getAllTags(): Promise<string[]>;
}

/**
 * 文章模块 API 客户端
 *
 * 基础路径由 @ApiModule 装饰器注入，最终 URL 为 `{BASE_URL}/posts`
 */
@Injectable()
@ApiModule('/posts')
export class PostApi extends BaseApi implements IPostApi {
  /** 获取所有文章列表 */
  async listPosts() {
    return await this.get('', z.array(Post));
  }

  /** 根据 slug 获取单篇文章 */
  async getPost(slug: string) {
    return await this.get(`/${slug}`, Post);
  }

  /** 获取精选文章列表（featured: true） */
  async getFeaturedPosts() {
    return await this.get('/featured', z.array(Post));
  }

  /**
   * 获取最近文章列表
   * @param n 返回篇数，默认 4
   */
  async getRecentPosts(n = 4) {
    return await this.get({ path: '/recent', schema: z.array(Post), params: { n: String(n) } });
  }

  /** 获取所有文章标签（去重） */
  async getAllTags() {
    return await this.get('/tags', z.array(z.string()));
  }
}
