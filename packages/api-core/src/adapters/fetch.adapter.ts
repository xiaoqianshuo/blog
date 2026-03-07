import { singleton } from '@xiaoqianshuo/utils';
import { RequestAdapter, RequestConfig } from './request.adapter';

/**
 * Fetch 适配器：实现通用请求接口，适配 Fetch API
 * @deprecated 建议使用单例模式的 FetchRequestAdapter 实例 {@link singletonFetchRequestAdapter} 或者通过 new {@link SingletonFetchRequestAdapter}() 创建实例，避免直接使用 FetchRequestAdapter 类进行实例化
 */
export class FetchRequestAdapter extends RequestAdapter {
  // 实现通用请求方法，转换配置和响应格式
  async request<T>(config: RequestConfig<T>): Promise<T> {
    const response: Response = await fetch(
      `${config.url}${config.params ? `?${new URLSearchParams(config.params).toString()}` : ''}`,
      {
        method: config.method,
        headers: config.headers,
        body: config.data ? JSON.stringify(config.data) : undefined,
      },
    );
    if (response.ok) {
      const text = await response.text();
      return text ? JSON.parse(text) : (undefined as T);
    }
    const errorText = await response.text().catch(() => response.statusText);
    throw new Error(`${response.status} ${response.statusText}: ${errorText}`);
  }
}

const SingletonFetchRequestAdapter = singleton(FetchRequestAdapter);
export const singletonFetchRequestAdapter = new SingletonFetchRequestAdapter();
