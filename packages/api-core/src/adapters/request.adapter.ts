import z from 'zod';

/**
 * 通用请求配置接口（对齐 Axios 核心配置，适配大部分场景）
 */
export interface RequestConfig<T = unknown> {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  schema: z.ZodType<T>;
  params?: Record<string, string>; // URL 参数
  data?: Record<string, unknown>; // 请求体
  headers?: Record<string, string>; // 请求头
  [key: string]: unknown; // 兼容其他自定义配置
}

/**
 * 请求适配器基类（核心抽象，所有请求库都要继承这个类）
 */
export abstract class RequestAdapter {
  private static _instances: Map<any, RequestAdapter> = new Map();

  /**
   * 获取单例实例
   * @returns 单例实例
   */
  public static getInstance<T extends RequestAdapter>(this: { new (): T }): T {
    if (!RequestAdapter._instances.has(this)) {
      RequestAdapter._instances.set(this, new this());
    }
    return RequestAdapter._instances.get(this)! as T;
  }

  /**
   * 请求方法：所有具体请求库的实现都要提供这个方法
   * @param config 通用请求配置
   * @returns 解析后的响应数据
   */
  abstract request<R>(config: RequestConfig<R>): Promise<R>;
}
