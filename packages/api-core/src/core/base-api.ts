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

    // 拼接模块基础 URL + 接口路径
    let finalUrl = joinMultiplePaths(this.baseUrl, config.url);

    // 构建最终请求配置
    const finalConfig: RequestConfig<T> = {
      ...config,
      url: finalUrl,
    };

    // 调用适配器发起请求
    const r = await this.requestAdapter.request<T>(finalConfig);
    return dataParse(r, config.schema);
  }

  /**
   * 通用 GET 请求方法
   * @param path 接口路径（会自动拼接模块基础 URL）
   * @param params 查询参数
   * @param schema 响应数据校验 schema
   * @param headers 请求头
   * @returns 解析后的响应数据
   */
  protected get<T>(
    path: string,
    params: Record<string, string>,
    schema: z.ZodType<T>,
    headers?: Headers,
  ) {
    return this.request({ url: path, method: 'GET', params, schema, headers });
  }

  /**
   * 通用 POST 请求方法
   * @param path 接口路径（会自动拼接模块基础 URL）
   * @param body 请求体数据
   * @param schema 响应数据校验 schema
   * @param headers 请求头
   * @returns 解析后的响应数据
   */
  protected post<T>(
    path: string,
    body: Record<string, unknown>,
    schema: z.ZodType<T>,
    headers?: Headers,
  ) {
    return this.request({ url: path, method: 'POST', schema, data: body, headers });
  }

  /**
   * 通用 PUT 请求方法
   * @param path 接口路径（会自动拼接模块基础 URL）
   * @param body 请求体数据
   * @param schema 响应数据校验 schema
   * @param headers 请求头
   * @returns 解析后的响应数据
   */
  protected put<T>(
    path: string,
    body: Record<string, unknown>,
    schema: z.ZodType<T>,
    headers?: Headers,
  ) {
    return this.request({ url: path, method: 'PUT', schema, data: body, headers });
  }

  /**
   * 通用 PATCH 请求方法
   * @param path 接口路径（会自动拼接模块基础 URL）
   * @param body 请求体数据
   * @param schema 响应数据校验 schema
   * @param headers 请求头
   * @returns 解析后的响应数据
   */
  protected patch<T>(
    path: string,
    body: Record<string, unknown>,
    schema: z.ZodType<T>,
    headers?: Headers,
  ) {
    return this.request({ url: path, method: 'PATCH', schema, data: body, headers });
  }

  /**
   * 通用 DELETE 请求方法
   * @param path 接口路径（会自动拼接模块基础 URL）
   * @param schema 响应数据校验 schema
   * @param headers 请求头
   * @returns 解析后的响应数据
   */
  protected delete<T>(path: string, schema: z.ZodType<T>, headers?: Headers) {
    return this.request({ url: path, method: 'DELETE', schema, headers });
  }
}
