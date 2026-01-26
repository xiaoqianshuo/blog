import z from 'zod';
import { RequestAdapter, RequestConfig } from '../adapters/request.adapter';
import { joinMultiplePaths } from '../utils/path';
import { dataParse } from '../utils/data';

/**
 * 基础 API 类：封装通用请求逻辑，所有业务模块继承此类
 */
export class BaseApi {
  protected readonly requestAdapter?: RequestAdapter;
  protected readonly baseUrl: string; // 模块级基础 URL（可选）

  constructor(baseUrl = '', requestAdapter?: RequestAdapter) {
    this.baseUrl = baseUrl;
    this.requestAdapter = requestAdapter;
  }

  /**
   * 通用请求方法：封装公共逻辑（URL 拼接、请求头、错误处理）
   */
  protected async request<T>(config: RequestConfig<T>): Promise<T> {
    // 检查是否配置了请求适配器
    if (!this.requestAdapter) {
      throw new Error('Request adapter is not provided');
    }

    if (!config.schema) {
      throw new Error('Schema is required');
    }

    // 拼接模块基础 URL + 接口路径
    let finalUrl = joinMultiplePaths(this.baseUrl, config.url);

    // 构建最终请求配置
    const finalConfig: RequestConfig<T> = {
      ...config,
      headers: new Headers(config.headers),
      url: finalUrl,
    };

    // 调用适配器发起请求
    const r = await this.requestAdapter.request<T>(finalConfig);
    return dataParse(r, config.schema);
  }

  /**
   * 通用 GET 请求方法
   * @param path 接口路径
   * @param schema 响应数据校验 schema
   */
  protected get<T>(path: string, schema: z.ZodType<T>): Promise<T>;
  /**
   * 通用 GET 请求方法
   * @param config 包含路径、查询参数、校验 schema、请求头的配置对象
   * @param config.path 接口路径
   * @param config.params 查询参数
   * @param config.schema 响应数据校验 schema
   * @param config.headers 请求头
   * @returns 解析后的响应数据
   */
  protected get<T>(config: {
    path: string;
    schema: z.ZodType<T>;
    params?: Record<string, string>;
    headers?: Headers;
  }): Promise<T>;
  protected get<T>(
    config:
      | {
          path: string;
          schema: z.ZodType<T>;
          params?: Record<string, string>;
          headers?: Headers;
        }
      | string,
    schema?: z.ZodType<T>,
  ) {
    if (typeof config === 'string') {
      config = {
        path: config,
        schema: schema!,
      };
    }
    return this.request({
      method: 'GET',
      url: config.path,
      schema: config.schema,
      params: config.params,
      headers: config.headers,
    });
  }

  /**
   * 通用 POST 请求方法
   * @param path 接口路径
   * @param schema 响应数据校验 schema
   */
  protected post<T>(path: string, schema: z.ZodType<T>): Promise<T>;
  /**
   * 通用 POST 请求方法
   * @param config 包含路径、请求体、校验 schema、请求头的配置对象
   * @param config.path 接口路径
   * @param config.body 请求体数据
   * @param config.schema 响应数据校验 schema
   * @param config.headers 请求头
   * @returns 解析后的响应数据
   */
  protected post<T>(config: {
    path: string;
    schema: z.ZodType<T>;
    body?: Record<string, unknown>;
    headers?: Headers;
  }): Promise<T>;
  protected post<T>(
    config:
      | {
          path: string;
          schema: z.ZodType<T>;
          body?: Record<string, unknown>;
          headers?: Headers;
        }
      | string,
    schema?: z.ZodType<T>,
  ) {
    if (typeof config === 'string') {
      config = {
        path: config,
        schema: schema!,
      };
    }
    return this.request({
      method: 'POST',
      url: config.path,
      schema: config.schema,
      data: config.body,
      headers: config.headers,
    });
  }

  /**
   * 通用 PUT 请求方法
   * @param path 接口路径
   * @param schema 响应数据校验 schema
   */
  protected put<T>(path: string, schema: z.ZodType<T>): Promise<T>;
  /**
   * 通用 PUT 请求方法
   * @param config 包含路径、请求体、校验 schema、请求头的配置对象
   * @param config.path 接口路径
   * @param config.body 请求体数据
   * @param config.schema 响应数据校验 schema
   * @param config.headers 请求头
   * @returns 解析后的响应数据
   */
  protected put<T>(config: {
    path: string;
    schema: z.ZodType<T>;
    body?: Record<string, unknown>;
    headers?: Headers;
  }): Promise<T>;
  protected put<T>(
    config:
      | {
          path: string;
          schema: z.ZodType<T>;
          body?: Record<string, unknown>;
          headers?: Headers;
        }
      | string,
    schema?: z.ZodType<T>,
  ) {
    if (typeof config === 'string') {
      config = {
        path: config,
        schema: schema!,
      };
    }
    return this.request({
      method: 'PUT',
      url: config.path,
      schema: config.schema,
      data: config.body,
      headers: config.headers,
    });
  }

  /**
   * 通用 PATCH 请求方法
   * @param path 接口路径
   * @param schema 响应数据校验 schema
   */
  protected patch<T>(path: string, schema: z.ZodType<T>): Promise<T>;
  /**
   * 通用 PATCH 请求方法
   * @param config 包含路径、请求体、校验 schema、请求头的配置对象
   * @param config.path 接口路径
   * @param config.body 请求体数据
   * @param config.schema 响应数据校验 schema
   * @param config.headers 请求头
   * @returns 解析后的响应数据
   */
  protected patch<T>(config: {
    path: string;
    schema: z.ZodType<T>;
    body?: Record<string, unknown>;
    headers?: Headers;
  }): Promise<T>;
  protected patch<T>(
    config:
      | {
          path: string;
          schema: z.ZodType<T>;
          body?: Record<string, unknown>;
          headers?: Headers;
        }
      | string,
    schema?: z.ZodType<T>,
  ) {
    if (typeof config === 'string') {
      config = {
        path: config,
        schema: schema!,
      };
    }
    return this.request({
      method: 'PATCH',
      url: config.path,
      schema: config.schema,
      data: config.body,
      headers: config.headers,
    });
  }

  /**
   * 通用 DELETE 请求方法
   * @param path 接口路径
   * @param schema 响应数据校验 schema
   * @returns 解析后的响应数据
   */
  protected delete<T>(path: string, schema: z.ZodType<T>): Promise<T>;
  /**
   * 通用 DELETE 请求方法
   * @param config 包含路径、校验 schema、请求头的配置对象
   * @param config.path 接口路径
   * @param config.schema 响应数据校验 schema
   * @param config.headers 请求头
   * @returns 解析后的响应数据
   */
  protected delete<T>(config: {
    path: string;
    schema: z.ZodType<T>;
    headers?: Headers;
  }): Promise<T>;
  protected delete<T>(
    config:
      | {
          path: string;
          schema: z.ZodType<T>;
          headers?: Headers;
        }
      | string,
    schema?: z.ZodType<T>,
  ) {
    if (typeof config === 'string') {
      config = {
        path: config,
        schema: schema!,
      };
    }
    return this.request({
      method: 'DELETE',
      url: config.path,
      schema: config.schema,
      headers: config.headers,
    });
  }
}
