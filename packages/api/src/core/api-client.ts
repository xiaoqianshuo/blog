import { RequestAdapter } from '../adapters/request.adapter';
import { Constructor } from '../types';
import { BaseApi } from './base-api';

// 定义“递归 API 树”类型
type ApiCtor = Constructor<BaseApi, [string?, RequestAdapter?]>;
type ApiTree = ApiCtor | { [key: string]: ApiTree };

// 递归把 ApiTree 映射为实例树
type ApiClientTree<T> = T extends ApiCtor
  ? InstanceType<T>
  : { [K in keyof T]: ApiClientTree<T[K]> };

/**
 * 生成 API 客户端实例（支持多模块 API）
 * @param config API 客户端配置
 * @returns 实例化后的 API 客户端对象
 */
export function generateApiClient<T extends ApiTree>(config: {
  /**
   * API 树结构，定义了 API 模块和对应的 API 类
   */
  apis: T;
  /**
   * 基础 URL，用于所有 API 请求的前缀
   */
  baseUrl?: string;
  /**
   * 请求适配器，用于自定义请求逻辑（如添加认证头）
   */
  requestAdapter?: RequestAdapter;
}): ApiClientTree<T> {
  const build = (apis: ApiTree): any => {
    if (typeof apis === 'function') {
      // 检查是否为 API 类
      if (apis.prototype instanceof BaseApi) {
        return new apis(config.baseUrl, config.requestAdapter);
      } else {
        throw new Error(`Invalid API class: ${apis.name}, it must extend \`BaseApi\``);
      }
    }

    // 递归处理对象类型的 API 树
    if (typeof apis === 'object' && apis !== null) {
      const obj: Record<string, any> = {};
      for (const key in apis) {
        obj[key] = build(apis[key]);
      }
      return obj;
    }

    throw new Error(`Invalid API tree structure: ${JSON.stringify(apis)}`);
  };

  return build(config.apis);
}
