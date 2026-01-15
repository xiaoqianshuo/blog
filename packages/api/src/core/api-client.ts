import { RequestAdapter } from '../adapters/request.adapter';
import { Constructor } from '../types';
import { BaseApi } from './base-api';

type ApiCtor<T extends BaseApi = BaseApi> = new (
  baseUrl?: string,
  requestAdapter?: RequestAdapter,
) => T;

/**
 * 生成 API 客户端实例（支持多模块 API）
 * @param config API 客户端配置
 * @returns 实例化后的 API 客户端对象
 */
export function generateApiClient<T extends Record<string, ApiCtor>>(config: {
  apis: T;
  baseUrl?: string;
  requestAdapter?: RequestAdapter;
}): { [K in keyof T]: InstanceType<T[K]> } {
  const client = {} as { [K in keyof T]: InstanceType<T[K]> };

  const api = config.apis;
  for (const key in api) {
    const ApiClass = api[key];
    client[key] = new ApiClass(config.baseUrl, config.requestAdapter) as InstanceType<
      T[typeof key]
    >;
  }

  return client;
}
